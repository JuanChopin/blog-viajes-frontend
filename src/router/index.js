import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    redirect:'/inicio/1'
  },
  {
    path: '/inicio/:page',
    name: 'Inicio',
    component:()=> import('../views/Inicio.vue')
  },
  {
    path: '/detalles/:id',
    name: 'Detalles',
    component:()=> import('../views/Detalles.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component:()=> import('../views/Registro.vue'),
    beforeEnter: (to,from,next) =>{
      if(store.state.infoSesion.active){
        next({path:'/'})
      }
      else{
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Iniciar sesión',
    component:()=> import('../views/IniciarSesion.vue'),
    beforeEnter: (to,from,next) =>{
      if(store.state.infoSesion.active == true){
        next({path:'/'})
      }
      else{
        next()
      }
    }
  },
  {
    path: '/mis-publicaciones',
    name: 'Mis publicaciones',
    component:()=> import('../views/Publicaciones.vue'),
    beforeEnter: (to,from,next) =>{
      if(store.state.infoSesion.active){
        next()
      }
      else{
        next({path:'/'})
      }
  }
},
{
  path: '/crear-publicacion',
  name: 'Crear publicacion',
  component:()=> import('../views/AgregarPublicacion.vue'),
  beforeEnter: (to,from,next) =>{
    if(store.state.infoSesion.active){
      next()
    }
    else{
      next({path:'/'})
    }
}
},
{
  path: '/perfil/:nickname',
  name: 'perfil',
  component:()=> import('../views/EditarPerfil.vue'),
  beforeEnter: (to,from,next) =>{
    if(store.state.infoSesion.active){
      next()
    }
    else{
      next({path:'/'})
    }
}
},
{
  path: '/editar/:id',
  name: 'Editar',
  component:()=> import('../views/Editar.vue'),
  beforeEnter: (to,from,next) =>{
    if(store.state.infoSesion.active && from.name == "Mis publicaciones"){
      next()
    }
    else{
      next({path:'/'})
    }
}
},
{
  path: '/autores',
  name: 'Autores',
  component:()=> import('../views/Autores.vue')
},
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
