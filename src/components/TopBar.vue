<template>
  <div class="top-bar">
    <div class="logo">
      <span>Vue简历编辑器</span>
    </div>
    <div class="options">
      <span class="welcome">你好:{{user.username}}</span>
      <input type="button" class="minor" value=" 登出" @click="logout">
      <input type="button" class="primary" value="保存" @click="saveResume">
      <input type="button" class="primary" value="预览" @click="preview">
    </div>
  </div>
</template>

<script>
import AV from 'lib/leancloud'
import store from '../store/index'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  store,
  methods: {
    logout() {
      AV.User.logOut()
      this.removeUser()
      this.$router.replace('/')
    },
    preview() {
      this.$router.replace('/preview')
    },
    ...mapMutations(['removeUser']),
    ...mapActions(['saveResume'])
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  min-height: 65px;
  background-color: #09161c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  >span {
    color: #fff;
    font-size: 16px;
    line-height: 65px;
    margin-left: 20px;
  }
}

.options {
  margin-right: 20px;
  font-size: 0;
  .welcome {
    font-size: 16px;
    color: #fff;
    margin-right: 5px;
  }
  .primary {
    border: none;
    background-color: #09161c;
    color: #fff;
    height: 65px;
    padding: 0 15px;
    border-right: 1px solid #3d4a50;
    transition: .75s;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
  .minor {
    border: none;
    background-color: #09161c;
    color: #fff;
    height: 65px;
    padding: 0 15px;
    transition: 0.75s;
    border-right: 1px solid #3d4a50;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #838d97;
    }
  }
}
</style>
