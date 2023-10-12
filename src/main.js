import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'
import store from './store'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)

app.config.globalProperties.imageUrl = process.env.VUE_APP_IMG_URL

app.mount('#app')
