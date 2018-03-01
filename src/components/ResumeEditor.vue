<template>
  <div id="resume-editor">
    <nav>
      <ol>
        <li v-for="(item,index) in resumeConfig" :class="{active:item['field']===selected}" @click="selected=item['field']" :key="index">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
          {{item.field}}
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="(item,index) in resumeConfig" v-show="item.field===selected" :key="index">
        <div v-if="item.type === 'array'" class="array-item">
          <div class="subitem" v-for="(subitem,index) in resume[item.field]" :key="index">
            <button class="remove-btn" @click="removeResumeSubField(item.field,index)">X</button>
            <div class="resumePanels" v-for="(value, key) in subitem" :key="key">
              <label>{{`${key}`}}</label>
              <input type="text" :value="value" @input="changeResumePanels(`${item.field}.${index}.${key}`,$event.target.value)">
            </div>
          </div>
          <button class="add-btn" @click="addResumeSubField(item.field)">增加</button>
        </div>
        <div v-else class="resumePanels" v-for="(value,key) in resume[item.field]" :key="key">
          <label>{{key}}</label>
          <input type="text" :value="value" @input="changeResumePanels(`${item.field}.${key}`,$event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import store from '../store/index'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ResumeEditor',
  store,
  computed: {
    ...mapState(["resume", "resumeConfig"]),
    selected: {
      get() {
        return this.$store.state.selected
      },
      set(value) {
        return this.$store.commit('switchTab', value)
      }
    }
  },
  methods: {
    //移除增加的Field
    removeResumeSubField(field, index) {
      this.$store.commit('removeResumeSubField', { field, index })
    },
    ...mapMutations(['addResumeSubField']),
    //实时更新Panels
    changeResumePanels(path, value) {
      this.$store.commit('updateResume', { path, value })
    }
  }
}
</script>

<style lang="scss" scoped>
#resume-editor {
  background-color: #f5f6f8;
  width: 33%;
  min-width: 380px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .5);
  >nav {
    background-color: #15222a;
    min-width: 100px;
    >ol {
      >li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        min-height: 76px;
        cursor: pointer;
        &.active {
          background-color: #fff;
          color: #000;
          .icon {
            fill: #000;
          }
        }
      }
    }
  }
}

.icon {
  width: 36px;
  height: 36px;
  fill: #fff;
  overflow: hidden;
  display: block;
}

.resumePanels {
  display: flex;
  flex-direction: column;
  width: 230px;
  >label {
    margin: 10px 20px;
  }
  >input {
    margin-left: 20px;
    height: 40px;
    vertical-align: top;
  }
}

.panels {
  margin: 20px 0 0 10px;
  overflow: auto;
}

.subitem {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .remove-btn {
    position: absolute;
    right: 0;
    top: 5px;
    border: none;
    background-color: #15222a;
    color: #fff;
    cursor: pointer;
    border-radius: 50%;
    outline: none;
    &:hover {
      background-color: #ccc;
      color: #000;
    }
  }
}

.array-item {
  width: 230px;
  overflow: hidden;
  .add-btn {
    float: right;
    border: none;
    cursor: pointer;
    background-color: #15222a;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    outline: none;
    &:hover {
      background-color: #ccc;
      color: #000;
    }
  }
}
</style>
