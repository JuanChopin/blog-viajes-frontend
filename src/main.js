import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKeditor from '@ckeditor/ckeditor5-vue'


createApp(App).use(CKeditor).use(store).use(router).mount('#app')


