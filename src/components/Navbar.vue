<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Blog de Viajes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/"><i class="bi-house-door me-2"></i>Inicio</router-link>
        </li>
        <li class="nav-item mx-lg-3">
          <router-link class="nav-link" to="/autores"><i class="bi-person-lines-fill me-2"></i>Autores</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/mis-publicaciones" v-if="estaActivo" aria-current="page" ><i class="bi-filter-right me-2"></i>Mis publicaciones</router-link>
        </li>
          
      </ul>
      <span class=" nav-link me-lg-2" v-if="estaActivo"><i class="bi-person me-lg-2"></i><router-link :to="`/perfil/${infoSesion.nickname}`" class="titulo">{{infoSesion.nickname}}</router-link></span>
      <a to="/login" @click="cerrarSesion" class="me-lg-3  nav-link ms-lg-2" v-if="estaActivo">Cerrar sesión</a>
      <router-link to="/login" class="me-3 nav-link ms-2" v-if="!estaActivo">Iniciar sesión</router-link>
      <router-link to="/registro" class="me-3 nav-link ms-2" v-if="!estaActivo">Registro</router-link> 
    </div>
  </div>
</nav>
</template>

<script>
import {mapGetters,mapState,mapActions} from 'vuex'
export default {
    name:'Navbar',
    computed:{
        ...mapGetters(['estaActivo']),
        ...mapState(['infoSesion'])
      },
      methods:{
        ...mapActions(['cerrarSesion'])
      }
}
</script>

<style>
 a:hover{
   cursor:pointer
 }
 .titulo{
   text-decoration: none;
   color:black
 }
</style>