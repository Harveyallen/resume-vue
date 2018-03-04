import Vuex from 'vuex'
import Vue from 'vue'
import AV from 'lib/leancloud'
import getAVUser from 'lib/getAVUser'
import objectPath from 'object-path'
import getErrorMessage from 'lib/getErrorMessage'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: 'Profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
      {
        field: 'Profile',
        icon: 'id',
        keys: ['name','intention','sex', 'age','degree', 'english','assessment']
      },
      {
        field: 'Work',
        icon: 'work',
        type: 'array',
        keys: ['company', 'time', 'details']
      },
      {
        field: 'Education',
        icon: 'edu',
        keys: ['school', 'time']
      },
      {
        field: 'Projects',
        icon: 'project',
        type: 'array',
        keys: ['project', 'time', 'details']
      },
      {
        field: 'Hobbys',
        icon: 'hobby',
        type: 'array',
        keys: ['hobby']
      },
      {
        field: 'Contacts',
        icon: 'contact',
        keys: ['telephone', 'email', 'github', 'blog','wechat','twitter']
      },
      {
        field: 'Skills',
        icon: 'skill',
        type: 'array',
        keys: ['skill', 'content']
      }
    ],
    resume: {
      id: ''
    }
  },
  mutations: {
    //初始化resume结构
    initState(state, payload) {
      state.resumeConfig.map(item => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, []);
         item.keys.map(key => {
          Vue.set(state.resume[item.field], key, '')
          })
        } else {
          Vue.set(state.resume, item.field, {});
          item.keys.map(key => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
      if (payload) {
        Object.assign(state, payload)
      }

    },
    //tab切换
    switchTab(state, payload) {
      state.selected = payload
    },
    //更新resume展示，并将其保存在localStorage中
    updateResume(state, { path, value }) {
      objectPath.set(state.resume, path, value);
      localStorage.setItem('resume', JSON.stringify(state.resume))
    },
    //设置id与用户{id:..,username:..}
    setUser(state, payload) {
      Object.assign(state.user, payload)
    },
    //移除用户名和id,移除state.resume.id
    removeUser(state) {
      state.user.id = '';
      state.user.username = '';
      state.resume.id = ''
    },
    //设置resume的数据
    setResume(state, payload) {

      // state.resumeConfig.map(({ field }) => {
      //   Vue.set(state.resume, field, payload[field])
      // })
      state.resumeConfig.map(item => {
        if (item.type === 'array') {
        payload[item.field].forEach((obj,i) => {
          state.resume[item.field][i].map(key => {
          Vue.set(state.resume[item.field][i], key, payload[item.field][i][key])
      })
        })
      } else {
        item.keys.map(key => {
          Vue.set(state.resume[item.field], key, payload[item.field][key])
      })
      }
    })
      state.resume.id = payload.id
    },
    setResumeId(state, { id }) {
      state.resume.id = id
    },
    addResumeSubField(state, field) {
      let empty = {};
      state.resume[field].push(empty);
      //过滤出与传入参数field相对应的项，由于过滤出获得的数组所以加上索引
      state.resumeConfig.filter(i => i.field === field)[0].keys.map(key => {
        Vue.set(empty, key, '')
      })
    },
    removeResumeSubField(state, { field, index }) {
      state.resume[field].splice(index, 1)
    }
  },
  actions: {
    saveResume({ state, commit }, payload) {
      //新建一个Resume的类
      let Resume = AV.Object.extend('Resume');
      let resume = new Resume();
      //如果这个id存在，

      if (state.resume.id) {
        resume.id = state.resume.id
      }
      let currentUserId = getAVUser().id;
      resume.set('Profile', state.resume.Profile);
      resume.set('Work', state.resume.Work);
      resume.set('Education', state.resume.Education);
      resume.set('Projects', state.resume.Projects);
      resume.set('Hobbys', state.resume.Hobbys);
      resume.set('Contacts', state.resume.Contacts);
      resume.set('Skills', state.resume.Skills);
      //设置当前用户owner_id
      resume.set('owner_id', currentUserId);

      var acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(AV.User.current(), true);

      resume.setACL(acl);
      resume
        .save()
        .then(function(response) {
          if (!state.resume.id) {
            commit('setResumeId', {
              id: response.id
            })
          }
        })
        .catch(error => {
        console.log(error)
    })
    },

    fetchResume({ commit }, payload) {
      var query = new AV.Query('Resume');
      query.equalTo('owner_id', getAVUser().id);
      query.descending('updatedAt');
      query.first().then(resume => {
      if (resume) {
        console.log(resume)
        commit('setResume', { id: resume.id, ...resume.attributes })
      }
    })
    }
  }
})
