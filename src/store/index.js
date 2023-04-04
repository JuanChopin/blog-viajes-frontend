import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
   infoSesion:{
     nickname:'',
     active: false,
   }
  },
  mutations: {
    setInfoSesion( state,payload){
      state.infoSesion.nickname = payload.nickname
      state.infoSesion.active = payload.active
    }
  },
  actions: {
    setInfoSesion({commit},object){
      localStorage.setItem('nickname',object.nickname)
      localStorage.setItem('active',object.active)
      commit('setInfoSesion',object)
    },
    iniciarConexion(){
      var socket = io("http://localhost:8080")
    },
    cerrarSesion({commit}){
      $.ajax('http://localhost:8080/cerrar-sesion').done((res)=>{console.log(res)})
      localStorage.clear()
      commit('setInfoSesion','')
      router.push('/')
    },
    mantenerSesion({commit}){
      var nickname = localStorage.getItem('nickname')
      var active = localStorage.getItem('active')
      var object = {nickname:nickname,active:active}
      commit('setInfoSesion',object)
    }
  },
  getters:{
    estaActivo: state => state.infoSesion.active
  },
  modules: {
  }
})
