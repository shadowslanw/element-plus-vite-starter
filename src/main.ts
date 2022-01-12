import { createApp } from 'vue';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import router from '@/router';
import store from '@/store';
import App from './App.vue';

// import '~/styles/element/index.scss';

// import ElementPlus from 'element-plus';
// import all element css, uncommented next line
import 'element-plus/dist/index.css';

// or use cdn, uncomment cdn link in `index.html`

import '~/styles/index.scss';

// If you want to use ElMessage, import it.
// import 'element-plus/theme-chalk/src/message.scss'

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log('[[router]]', to);
    next();
});

const app = createApp(App)
    .use(router)
    .use(store);
// app.use(ElementPlus);
app.mount('#app');
