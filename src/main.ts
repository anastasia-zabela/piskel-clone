import { createApp, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPen,
  faFillDrip,
  faPalette,
  faEyeDropper,
  faEraser,
  faSlash,
  faVectorSquare,
  faAdjust,
  faPlus,
  faTrash,
  faClone,
  faArrowsAlt,
  faLevelUpAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faDelicious } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { store, key } from './store';
import App from './App.vue';
import Home from './components/Home/Home.vue';
import PiskelApp from './components/PiskelApp/PiskelApp.vue';

export const routes = [
  { path: '/', component: Home, title: 'Home' },
  // eslint-disable-next-line
  { path: '/piskel-app', component: PiskelApp, title: 'Create sprite' } as any,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  store,
  router,
  render() {
    // eslint-disable-next-line
    return h(App as any);
  },
});

app.use(store, key);
app.use(router);

library.add(
  faPen,
  faFillDrip,
  faPalette,
  faEyeDropper,
  faEraser,
  faSlash,
  faVectorSquare,
  faAdjust,
  faCircle,
  faDelicious,
  faPlus,
  faTrash,
  faClone,
  faArrowsAlt,
  faLevelUpAlt,
);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
