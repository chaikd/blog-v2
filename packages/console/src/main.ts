import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
const vuetify = createVuetify()

// mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


const app = createApp(App)

app.use(mavonEditor)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
