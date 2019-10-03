import Vue from 'vue';
import VueRouter from 'vue-router';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

import store from './store';
import App from './App.vue';
import Home from './components/Home/Home.vue';
import PiskelApp from './components/PiskelApp/PiskelApp.vue';

Vue.config.productionTip = false;

Vue.component('v-icon', Icon);

Vue.use(VueRouter);
const routes = [
  { path: '/', component: Home },
  { path: '/piskel-app', component: PiskelApp },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
