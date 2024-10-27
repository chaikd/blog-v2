<template>
  <v-main>
    <v-container class="py-8">
      <!-- 个人信息 -->
      <v-row class="mb-8">
        <v-col cols="12" md="4">
          <v-avatar size="200" class="mb-4">
            <v-img src="https://picsum.photos/200/200?random=1" alt="个人照片"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="8">
          <h1 class="text-h3 font-weight-bold mb-2" style="color: #EF8080;">柴康舵</h1>
          <p class="text-h5 mb-4">前端工程师</p>
          <v-row>
            <v-col cols="12" sm="6">
              <v-icon color="#EF8080" class="mr-2" icon="mdi-domain">mdi-email</v-icon>
              <span>chaikangduo@163.com</span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon color="#EF8080" class="mr-2">mdi-phone</v-icon>
              <span>17611201200</span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon color="#EF8080" class="mr-2">mdi-map-marker</v-icon>
              <span>北京市朝阳区</span>
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon color="#EF8080" class="mr-2">mdi-github</v-icon>
              <span>github.com/chaikd</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- 简介 -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          个人简介
        </v-card-title>
        <v-card-text class="text-body-1 pa-4">
          7年前端开发经验，热衷于创建高性能、可扩展的 Web 应用。熟练使用现代前端技术栈，具有强烈的用户体验意识和团队协作能力，喜欢读书和爬山。
        </v-card-text>
      </v-card>

      <!-- 技能 -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          专业技能
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6" v-for="(category, index) in skills" :key="index">
              <h3 class="text-h6 mb-3">{{ category.category }}</h3>
              <v-list dense>
                <v-list-item v-for="(skill, skillIndex) in category.items" :key="skillIndex">
                  <v-list-item-content>
                    <v-list-item-title>{{ skill.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-rating
                        :model-value="skill.level"
                        color="#EF8080"
                        background-color="pink lighten-3"
                        dense
                        half-increments
                        readonly
                        small
                      ></v-rating>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 工作经验 -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          工作经历
        </v-card-title>
        <v-card-text class="pa-4">
          <v-timeline align-top dense>
            <v-timeline-item v-for="job in workExperience" :key="job.id" color="#EF8080" small>
              <div class="mb-4">
                <h3 class="text-h6 font-weight-bold mb-1">{{ job.title }}</h3>
                <div class="text-subtitle-1 mb-1">{{ job.company }}</div>
                <div class="text-caption">{{ job.date }}</div>
              </div>
              <div v-for="(responsibility, index) in job.responsibilities" :key="index" class="mb-1">
                • {{ responsibility }}
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>

      <!-- 个人项目 -->
      <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          个人项目
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col v-for="project in personalProjects" :key="project.id" cols="12" md="6">
              <v-card outlined>
                <v-card-title class="text-h6">{{ project.name }}</v-card-title>
                <v-card-text>
                  <p>{{ project.description }}</p>
                  <v-chip-group>
                    <v-chip v-for="tech in project.technologies" :key="tech" small outlined color="#EF8080">
                      {{ tech }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="#EF8080" :href="project.link" target="_blank">
                    查看项目
                    <v-icon right>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 教育背景 -->
      <v-card elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          教育背景
        </v-card-title>
        <v-card-text class="pa-4">
          <v-timeline align-top dense>
            <v-timeline-item v-for="edu in education" :key="edu.id" color="#EF8080" small>
              <div class="mb-4">
                <h3 class="text-h6 font-weight-bold mb-1">{{ edu.degree }}</h3>
                <div class="text-subtitle-1 mb-1">{{ edu.school }}</div>
                <div class="text-caption">{{ edu.date }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref([
  {
    category: '前端技术',
    items: [
      { name: 'HTML5', level: 4 },
      { name: 'CSS3/Sass', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'Vue.js', level: 4 },
      { name: 'Angular', level: 3 },
      { name: 'TypeScript', level: 3 },
    ]
  },
  {
    category: '后端和数据库',
    items: [
      { name: 'Node.js', level: 3 },
      { name: 'Express.js', level: 3 },
      { name: 'MongoDB', level: 3 },
    ]
  },
  {
    category: '工具和框架',
    items: [
      { name: 'Git', level: 3 },
      { name: 'Webpack', level: 2 },
    ]
  },
])

const workExperience = ref([
  {
    id: 1,
    title: '前端开发工程师',
    company: '北京阳光汇点数码科技有限公司',
    date: '2022年11月 - 2024年8月',
    responsibilities: [
      '对复杂需求设计开发方案',
      '梳理开发流程和项目难点',
      '带前端新人帮助推进需求正常开发',
      '与甲方人员进行需求对接并排期',
      '需求开发并按期交付',
    ],
  },
  {
    id: 2,
    title: '前端开发工程师',
    company: '顺为互联科技有限公司（外派北京创新奇智科技有限公司）',
    date: '2021年4月 - 2022年11月',
    responsibilities: [
      '负责 cloud  云平台-数据标注系统的研发',
      '与标注组负责人和后端讨论确认标注系统需求',
      '与产品、UI  确认相关信息并开发',
      '协助其它系统完成标注系统相关功能嵌入',
    ],
  },
  {
    id: 3,
    title: '前端开发工程师',
    company: '通铭教育科技股份有限公司',
    date: '2019年3月 - 2021年4月',
    responsibilities: [
      '在客户现场驻场提供定制化开发',
      '负责产品前端项目的维护和开发，期间完成了多个重要功能开发，比如授课页面增加在线聊天功能等',
      '优化了前端的用户体验',
      '参与开发完成新的定制化产品',
    ],
  },
  {
    id: 4,
    title: '前端开发工程师',
    company: '北京四和创想科技有限公司',
    date: '2017年11月 - 2019年3月',
    responsibilities: [
      '根据产品经理提出的需求进行技术可行性评估并协商技术解决方案',
      '进行项目性能优化比如页面按需加载',
    ],
  },
])

const personalProjects = ref([
  {
    id: 1,
    name: '视频工具',
    description: '基于 Nx、Angular、Nodejs、WebRtc 的在线视频工具平台，支持在线视频录制和下载，支持多人在线会议室。',
    technologies: ['Vue.js', 'Node.js', 'Express', 'Websocket', 'WebRTC'],
    link: 'https://github.com/chaikd/webrtc-learn',
  },
  {
    id: 2,
    name: '个人博客',
    description: '使用 Vue3 和 Nodejs、Express、Mongoos 开发的个人博客平台，支持文章和图集管理。',
    technologies: ['Vue3', 'Nodejs', 'Express', 'Mongoose'],
    link: 'https://github.com/chaikd/blog-v2',
  },
])

const education = ref([
  {
    id: 1,
    degree: '计算机科学与技术',
    school: '北京交通大学',
    date: '2022年9月 - 2024年7月',
  },
])
</script>

<style scoped>
.v-app-bar {
  transition: transform 0.3s ease-in-out;
}

.v-timeline-item__body {
  padding-bottom: 16px;
}
</style>