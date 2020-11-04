import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Row, Col } from 'vant';

createApp(App)
  .use(store)
  .use(router)
  .use(Row)
  .use(Col)
  .mount('#app')
