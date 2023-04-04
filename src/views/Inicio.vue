<template>
  <div class="text-center d-flex flex-column align-items-center py-4">
      <div>
        <h3>Últimas publicaciones</h3>
      </div>
      <div class="col-10 col-sm-8 col-lg-4 mt-2">
        <form class="d-flex justify-content-center" @submit.prevent="buscar" id="buscar">
            <input class="form-control me-2" type="text"
             name="busqueda" placeholder="Buscar una publicación" 
             v-model="busqueda" @keyup="cargarDeNuevo">
            <button type="submit" class="btn btn-light border d-flex"><i class="bi-search me-2"></i>Buscar</button>
        </form>
      </div>
  </div>
  <div class="container mt-3 bg-light rounded border px-lg-5">
      <h3>{{respuesta}}</h3>
      <h6 class="mb-3" v-if="respuesta == '' && paginacion == true">Página {{page}}</h6>
      <ul v-if="respuesta == ''" class="list-group list-group-flush">
        <li href="#" class="list-group-item" aria-current="true" 
            v-for="(item,index) in publicaciones" :key="index">
            <div class="d-flex w-100 justify-content-between">
                <router-link :to="`/detalles/${item.id}`" class="mb-1 titulo"><h4>{{item.titulo}}</h4></router-link>
                <small>{{item.fecha_hora.slice(0,10)}}</small>
            </div>
            <p class="mb-3">{{item.resumen}}</p>
            <span 
                class="badge bg-info text-white fs-6 rounded-pill">
                <img v-if="item.avatar != null" class="rounded-circle small me-2" :src="`http://localhost:8080/avatars/${item.avatar}`">
                <i v-else class="bi-person me-2"></i>{{item.nickname}}
            </span>
            <span class="ms-4"><i class="bi-heart-fill me-2" style="color:red"></i>{{item.votos}} votos</span>
        </li>
      </ul>
       <ul v-if="respuesta == '' & paginacion == true" class="pagination justify-content-center mt-5">
                <li class="page-item" :class="disabled"><router-link  @click="reload" class="page-link" :to="`/inicio/${page-1}`">Anterior</router-link></li>
                <li class="page-item" :class="active"><router-link class="page-link" @click="reload" to="/inicio/1">1</router-link></li>
                <li class="page-item active"><a class="page-link" v-if ="page != 1 " href="#">{{page}}</a></li>
                <li class="page-item"><router-link class="page-link" @click="reload" :to="`/inicio/${page+1}`">{{page+1}}</router-link></li>
                <li class="page-item"><router-link class="page-link" @click="reload" :to="`/inicio/${page+2}`">{{page+2}}</router-link></li>
                <li class="page-item"><router-link class="page-link"  @click="reload" :to="`/inicio/${page+1}`">Siguiente</router-link></li>
            </ul>
   </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    data(){
        return{
            paginacion: true,
            page: parseInt(this.$route.params.page),
            busqueda:'',
            respuesta:'',
            publicaciones:[]
        }
    },
    components:{
        Navbar
    },
    methods:{
        reload(){
            location.reload()
        },
        cargarTabla(){
            $.ajax({
                url:'http://localhost:8080/publicaciones',
                type:'POST',
                data : {page:this.page}
            }).done((res)=>{
                this.publicaciones = res
            })
    },
        buscar(){
            var form = $("#buscar")
            var data = form.serialize()
            $.ajax({
                url:'http://localhost:8080/buscar',
                type:"POST",
                data:data
            }).done((res)=>{
                if (res == "0"){
                    this.respuesta = "No se encontraron coincidencias"
                }
                else{
                    this.publicaciones = res 
                    this.respuesta = ''
                    this.paginacion = false
                }
                                
            })
    },
    cargarDeNuevo(){
       if(this.busqueda == ''){
           this.paginacion = true
           this.respuesta = ''
           this.cargarTabla()
       }
       } 
    },
    computed:{
        active(){
            return this.page == 1 ? 'active' : ''
        },
         disabled(){
            return this.page == 1 ? 'disabled' : ''
        }
    },
    created(){
        this.cargarTabla()
    }
}
</script>

<style>
.titulo{
    text-decoration: none;
    color:black
}
.small{
    height: 15px;
    width: 15px;
}
</style>