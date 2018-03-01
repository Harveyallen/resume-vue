<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <input type="text" v-model="formData.username" required placeholder="用户名">
      </div>
      <div class="row">
        <input type="password" v-model="formData.password" required placeholder="密码">
      </div>
      <div class="row">
        <input type="email" v-model="formData.email" required placeholder="邮箱">
      </div>
      <div class="actions">
        <span>{{errorMessage}}</span>
        <slot></slot>
        <input type="submit" value="注册">
      </div>
    </form>
  </div>
</template>

<script>
import AV from 'lib/leancloud'
import getErrorMessage from 'lib/getErrorMessage'
import getAVUser from 'lib/getAVUser'

export default {
  name: 'signUpForm',
  data() {
    return {
      formData: {
        username: '',
        passage: '',
        email: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signUp() {
      let { username, password, email } = this.formData
      var user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.setEmail(email)
      user.signUp().then((loginedUser) => {
        //同login此时应从leancloud获取数据
        //注册成功后路由跳转=>Main
        this.$router.replace('/main')
      },
        (error) => {
          //获取错误消息
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
