import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Cookies from 'js-cookie'
import VueSocketIO from 'vue-socket.io'
import * as config from './config';
import socketio from 'socket.io-client'

Vue.config.productionTip = false
Vue.use(iView)

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio(config.WS_URL,{
      query: {
        token: 'meyer-tools-token'
      }
  })
}))

router.beforeEach((to, from, next) => {
  let token = Cookies.get('x-access-token')
  if(to.name !== 'login' && !token){
    next('/login')
  }else if(to.name === 'login' && token){
    next('/fileCloud')
  } else{
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
