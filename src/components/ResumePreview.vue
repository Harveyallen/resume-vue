<template>
  <div id="resume-preview">
    <section class="section-left">
      <header class="profile">
        <h2>{{resume.Profile.name}}</h2>
        <h3>应聘岗位:{{resume.Profile.intention}}</h3>
      </header>

      <div class="contacts">
        <h3>Contact. 联系方式</h3>
        <p class="mobilephone">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tel"></use>
          </svg>
          <i>手机号:</i>
          {{resume.Contacts.telephone}}
        </p>

        <p class="mail">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-email"></use>
          </svg>
          <i>邮 箱：</i>
          <a href="mailto:zoulong2008@126.com" target="_blank">{{resume.Contacts.email}}</a>
        </p>
        <p class="wechat">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-email"></use>
          </svg>
          <i>微 信：</i>
          {{resume.Contacts.wechat}}
        </p>
        <p class="twitter">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-email"></use>
          </svg>
          <i>推特：</i>
          {{resume.Contacts.twitter}}
        </p>
      </div>

      <div class="info">
        <h3>Basic info. 基本信息</h3>
        <ul>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-id"></use>
            </svg>
            个人信息：{{resume.Profile.name}}/{{resume.Profile.sex}}/{{resume.Profile.age}}岁
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-edu"></use>
            </svg>
            学位等级：{{resume.Profile.degree}}
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-edu"></use>
            </svg>
            英语水平：{{resume.Profile.english}}
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-edu"></use>
            </svg>
            github：{{resume.Contacts.github}}
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-edu"></use>
            </svg>
            blog：{{resume.Contacts.blog}}
          </li>
        </ul>
      </div>

      <div class="skills">
        <h3>Tech. 技能点</h3>
          <ul class="skillpoint" v-for="(item,index) in resume.Skills" >
            <li class="item-skill">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-edu"></use>
              </svg>
              {{item.skill}}
            </li>
          </ul>
      </div>
      <div class="hobbies">
        <h3>兴趣爱好</h3>
        <ul class="hobby-item">
          <li v-for="(item,key) in resume.Hobbys" :key="key">{{item.hobby}}</li>
        </ul>
      </div>
      <div class="self-assessment">
        <h3>自我评价</h3>
        <p>
          {{resume.Profile.assessment}}
        </p>
      </div>
    </section>


    <section class="section-right">
      <div class="pro-head">
        <h3>Experience. 项目与工作经验</h3>
      </div>
      <div class="work">
        <div class="title">
          <h3>工作经验</h3>
        </div>
        <div class="work-item" v-for="(item,index) in resume.Work" :key="index">
          <ul>
            <li class="item-title">
              <span>{{item.company}}</span>
              <span>{{item.time}}</span>
            </li>
            <li class="content">{{item.details}}</li>
          </ul>
        </div>
      </div>
      <div class="project">
        <div class="title">
          <h3>项目经验</h3>
        </div>
        <div class="project-item" v-for="(item,index) in resume.Projects" :key="index">
          <ul>
            <li class="item-title">
              <span>{{item.project}}</span>
              <span>{{item.time}}</span>
            </li>
            <li class="content">{{item.details}}</li>
          </ul>
        </div>
      </div>
      <div class="skill">
        <div class="title">
          <h3>技能</h3>
        </div>
        <div class="skill-item" v-for="(item,index) in resume.Skills" :key="index">
          <ul>
            <li class="item-title">
              <span>{{item.skill}}</span>
            </li>
            <li class="content">{{item.content}}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from '../store/index'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ResumePreview',
  store,
  computed: {
    ...mapState(['resume'])
  }
}

</script>

<style lang="scss" scoped>
#resume-preview {
  width: 62%;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .5);
  overflow: auto;
  display: flex;
  background-color: #ECECEC;
  >.section-left {
    width: 35%;

    color: #313131;
    text-align: center;
    line-height: 1.8;
    height: auto;
  }
  >.section-right {
    width: 65%;
    color: #313131;
    padding: 1rem;
    line-height: 1.8;
    padding-bottom: 10px;
    >.pro-head {
      >h3 {
        font-size: 2.5rem;
        background-color: #f5f6f7;
        border-bottom: 2px solid #ccc;
        padding:1rem;
      }
    }
  }
}
.icon {
  fill: #000;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
&::before {
   content: '';
   display: block;
   height: 100%;
 }
}

.profile {
  padding-top: 2rem;
  >h2 {
    font-size: 2.5rem;
  }
  >h3 {
     font-size: 2rem;

  }
}

.contacts{
  margin-top: 2rem;
  >h3{
  font-size: 2rem;
  text-align: left;
  margin-left: 2rem;
   }
  >p{
   text-align: left;
   margin-left: 3rem;
    >a{
       text-decoration: none;
       color: #000;
     }
   }
}

.info{
  margin-top: 2rem;
  >h3{
   font-size: 2rem;
   text-align: left;
   margin-left: 2rem;
   }
  >ul>li{
   text-align: left;
   margin-left: 3rem;
  >a{
   text-decoration: none;
   color: #000;
   }
  }
}

.skills{
  margin-top: 2rem;
>h3{
   font-size: 2rem;
   text-align: left;
   margin-left: 2rem;
 }
>ul>li{
   text-align: left;
   margin-left: 3rem;
 }
}

.hobbies {
  margin-top: 15px;
  >h3 {
    font-size: 2rem;
  }
  .hobby-item {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    >li {
      width: 50px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}

.self-assessment {
  h3 {
    font-size: 2rem;
  }
  >p {
    text-align: left;
    padding: 1rem;
  }
}

.work,
.project,
.skill {
  padding: .5rem;
  background-color: #f5f6f7;
  .title {
    border-bottom: 1px solid #ccc;
    >h3 {
      font-size: 2rem;
    }
  }
}

.item-title {
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem;
  color: #0093ff;
}

.content {
  padding: .5rem;
}
</style>
