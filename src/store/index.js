import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)

// 初始化store
const store = new Vuex.Store({
  // state vuex里面的单一状态对象，用一个对象就包含了全部的应用层级状态。（相当于java中的属性）
  state: {
        userInfo: {
            id: 0,
            card: "",//用户身份证号
            username: "",//用户姓名
            permissions: "",//权限 
            islisten: "",//听课节数
            mobile: "",
            wgrole:"",//角色
            schoolName:"",//学校名字
            schoolNameFirst:""//学校名称首字母
        },
        
  },
  /**
    getters vuex的计算属性就像vue的计算属性一样，getter的返回值会根据它的依赖被缓存起来，
    且只有当它的依赖值发生了改变才会被重新计算。（相当于java的get方法）
  */
  getters: {
    userInfo: state => state.userInfo,
  
  },
  /**
  mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，store.commit('setUserInfo')
  mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际
  进行状态更改的地方，并且它会接受 state 作为第一个参数（相当于java中的set方法）
  在 Vuex 中，mutation 都是同步事务
  */
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }    
  },

})

export default store

