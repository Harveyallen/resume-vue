# Vue在线简历编辑器

该项目一个通过Vue2.0来构建的一个在线简历编辑器，通过leancloud提供的API实现了登录注册功能，并且数据存储在leancloud。使用Vuex进行状态管理，使用Vue-router2进行路由切换，使用localStorage进行数据的本地存储。
# 技术栈
Vue2.0+Vue-Router+Vuex+webpack+ES6+Sass+leancloud

# 插件介绍
`object-path`: 用来访问和修改对象的深层属性

# 在线预览
[Vue-resume](https://harveyallen.github.io/resume-vue/dist/#/)

> 测试用帐号: admin 密码: admin

使用方法：

``` bash
#clone to your computer
git clone git@github.com:Harveyallen/resume-vue.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
# 项目结构
```
├─build
├─config // webpack相关配置
├─dist // webpack打包后的文件
│  └─static
│      ├─css
│      └─js
├─src //开发环境
│  ├─assets //reset.css
│  ├─components // 组件
│  │  └─login //登录相关组件
│  ├─lib //leancloud相关文件
│  ├─router //路由
│  └─store //Vuex的store
└─static
```

# 数据结构
本项目的数据结构如下，将state保存到`Store`中
```
  state: {
    selected: 'Profile',
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [{
      field: 'Profile',
      icon: 'id',
      keys: ['name', 'city', 'intention', 'sex', 'age', 'assessment']
    }, {
      field: 'Work',
      icon: 'work',
      type: 'array',
      keys: ['company', 'time', 'details']
    }, {
      field: 'Education',
      icon: 'edu',
      keys: ['school', 'time']
    }, {
      field: 'Projects',
      icon: 'project',
      type: 'array',
      keys: ['project', 'time', 'details']
    }, {
      field: 'Hobbys',
      icon: 'hobby',
      type: 'array',
      keys: ['hobby']
    }, {
      field: 'Contacts',
      icon: 'contact',
      keys: ['telephone', 'email', 'github', 'blog']
    }, {
      field: 'Skills',
      icon: 'skill',
      type: 'array',
      keys: ['skill', 'content']
    }],
    resume: {
      id: ''
    }
  }

```

# 总结

## 简单的流程

<div align="center">
  <img src="https://kmac007.b0.upaiyun.com/vue-resume/vue-resume.png" alt="vue-resume"/>
</div>

## 路由跳转
```
this.$router.replace('/main')
```
## localStorage
修改ResumeEditor中的数据实时保存到leancloud并使用localStorage进行本地存储，当页面刷新时，直接从localStorage中获取数据。

## Vuex
> Vuex是一个专门为Vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用所有组件的状态，并且以相应的规则保证以一种可预测的方式发生变化。

当然，本项目其实没有复杂到必须使用Vuex，使用Vuex只是学习的实践。本项目将各组件的状态存放到`store`目录中，

对于Vuex我打算在别的文章中总结出来。
