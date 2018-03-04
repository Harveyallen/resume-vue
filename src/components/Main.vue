<template>
  <div class="main-page">
    <header>
      <top-bar></top-bar>
    </header>
    <main>
      <resume-editor></resume-editor>
      <resume-preview></resume-preview>
    </main>
  </div>
</template>

<script>
import TopBar from './TopBar'
import ResumePreview from './ResumePreview'
import ResumeEditor from './ResumeEditor'
import getAVUser from 'lib/getAVUser'
import store from '../store/index'

export default {
  name: 'Main',
  store,
  components: {
    TopBar, ResumeEditor, ResumePreview
  },
  created() {
    //初始化resume的数据结构
    this.$store.commit('initState')
    //获取id与用户名{id:"",username:""}
    let user = getAVUser()
    //将state.user设为当前user
    this.$store.commit('setUser', user)
    //如果user.id存在，即用户登录，从leancloud抓取数据

    if (user.id) {
      this.$store.dispatch('fetchResume').then(() => {
        //新用户注册未保存时先存在localstorage中
//        this.restoreResumeFromLocalStorage()
      })
    } else {
      this.restoreResumeFromLocalStorage()
    }
  },
  methods: {
    restoreResumeFromLocalStorage() {
      //从localStorage获取resume
      let state = localStorage.getItem('state');
      if (state) {
        this.$store.commit('setResume', JSON.parse(state))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  >main {
    display: flex;
    flex-grow: 1;
    min-width: 1024px;
    max-width: 1440px;
    justify-content: space-around;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>
