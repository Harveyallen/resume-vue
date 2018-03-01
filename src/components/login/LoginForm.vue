<template>
  <div>
    <form @submit.prevent="login">
      <div class="row">
        <input type="text" v-model="formData.username" required placeholder="用户名">
      </div>
      <div class="row">
        <input type="password" v-model="formData.password" required placeholder="密码">
      </div>
      <div class="actions">
        <span>{{errorMessage}}</span>
        <input type="submit" value="登录">
        <slot></slot>
      </div>
    </form>
  </div>
</template>

<script>
import AV from 'lib/leancloud'
import getErrorMessage from 'lib/getErrorMessage'
import getAVUser from 'lib/getAVUser'
import store from '../../store/index'
import { mapActions } from 'vuex'

export default {
  name: 'loginForm',
  store,
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    //登录
    login() {
      //解构赋值
      let { username, password } = this.formData
      AV.User.logIn(username, password).then(() => {
        //登录成功后获取leancloud的数据
        let user = getAVUser()
        this.$store.commit('setUser', user)
        //获取数据成功后初始化resume，将数据渲染到页面上
        //此后跳转=>main
        this.$router.replace('/main')
      }, (error) => {
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}
</script>

 <style lang="scss" scoped>
.row {
  margin: 20px;
  >input {
    width: 300px;
    height: 32px;
    border: 1px solid #ebecee;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px;
  >span {
    line-height: 37px;
    font-size: 16px;
    color: red;
  }
  >input {
    &:hover {
      background: #000;
      opacity: .45;
      color: #fff;
    }
    margin: 0 5px;
    cursor: pointer;
    border: none;
    padding: 10px 20px;
  }
}
</style>
