import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
// 当前用户
    user: {
      name: 'coffce',
      img: 'dist/images/1.jpg'
    },
    // 会话列表
    sessions: [
      {
        id: 1,
        user: {
          name: '示例介绍',
          img: 'dist/images/2.png'
        },
        messages: [
          {
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            date: new Date()
          }, {
            content: '项目地址: https://github.com/coffcer/vue-chat',
            date: new Date()
          }
        ]
      },
      {
        id: 2,
        user: {
          name: 'webpack',
          img: 'dist/images/3.jpg'
        },
        messages: []
      }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  mutations: {

  },
  actions: {

  }
})
