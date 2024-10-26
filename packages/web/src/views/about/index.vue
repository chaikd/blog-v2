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
      <!-- <v-card class="mb-8" elevation="2">
        <v-card-title class="text-h5 font-weight-bold" style="background-color: #EF8080; color: white;">
          个人简介
        </v-card-title>
        <v-card-text class="text-body-1 pa-4">
          拥有7年前端开发经验的高级工程师，专注于创建高性能、可扩展的 Web 应用。精通现代前端技术栈，具有强烈的用户体验意识和团队协作能力。持续关注前端领域的最新趋势和最佳实践，并积极将其应用于实际项目中。
        </v-card-text>
      </v-card> -->

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
    category: '工具和框架',
    items: [
      { name: 'Git', level: 3 },
      { name: 'Webpack', level: 2 },
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
])

const workExperience = ref([
  {
    id: 1,
    title: '前端开发工程师',
    company: '北京阳光汇点数码科技有限公司',
    date: '2022年11月 - 2024年8月',
    responsibilities: [
      '负责前端项目与甲方的对接工作，期间与甲方公司对接需求评估排期并按期交付，设计复杂需求开发方案，同时就开发流程和项目中的难点形成文档，降低其他前端开发熟悉项目的时间成本，保证前端需求开发的正常推进。',
      '负责公司核心产品的前端架构设计和开发，使用 Vue.js 和 TypeScript',
      '优化前端性能，将页面加载时间减少 40%，显著提升用户体验',
      '引入并推广组件化开发方法，提高了团队开发效率和代码复用率',
      '指导和培训初级开发人员，组织技术分享会，提升团队整体技术水平',
    ],
  },
  {
    id: 2,
    title: '前端开发工程师',
    company: '顺为互联科技有限公司（外派北京创新奇智科技有限公司）',
    date: '2021年4月 - 2022年11月',
    responsibilities: [
      '使用 React 和 Redux 开发和维护多个大型 Web 应用',
      '与后端团队密切合作，设计和实现 RESTful API',
      '实现响应式设计，确保应用在各种设备上的良好表现',
      '参与代码审查，持续改进开发流程和代码质量',
    ],
  },
  {
    id: 3,
    title: '前端开发工程师',
    company: '通铭教育科技股份有限公司',
    date: '2019年3月 - 2021年4月',
    responsibilities: [
      '使用 HTML5、CSS3 和 JavaScript 开发公司网站和内部工具',
      '协助优化网站 SEO，提高搜索引擎排名',
      '参与用户界面设计讨论，提供前端技术可行性建议',
    ],
  },
  {
    id: 4,
    title: '前端开发工程师',
    company: '北京四和创想科技有限公司',
    date: '2017年11月 - 2019年3月',
    responsibilities: [
      '使用 HTML5、CSS3 和 JavaScript 开发公司网站和内部工具',
      '协助优化网站 SEO，提高搜索引擎排名',
      '参与用户界面设计讨论，提供前端技术可行性建议',
    ],
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