import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(iView)

router.beforeEach((to, from, next) => {
  let token = Cookies.get('x-access-token');
  if(to.name !== 'login' && !token){
    next('/login');
  }else if(to.name === 'login' && token){
    next('/fileCloud');
  } else{
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
