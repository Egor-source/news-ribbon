import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/style.scss"

const {worker} = require('./mocks/browser');
worker.start().then(() => {
    createApp(App).use(store).use(router).mount('#app')
});


