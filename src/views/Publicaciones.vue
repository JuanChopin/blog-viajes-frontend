<template>
    <div v-if="mostrar" class=" text-center mt-5 ">
        <h3 >{{respuesta}} </h3>
    </div>
    <div class="text-center mt-4" v-else>
        <h3>Mis publicaciones</h3>
    </div>
    <div class="container mt-5 over" v-if="!mostrar">
        <table class="table">
            <thead>
                <tr class="table-active">
                    <th scope="col">Titulo</th>
                    <th scope="col">Resumen</th>
                    <th scope="col">Votos</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Editar/eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in mispublicaciones" :key="item.id">
                    <td class="py-4"><router-link :to="`/detalles/${item.id}`" class="titulo">{{item.titulo}}</router-link></td>
                    <td class="py-4">{{item.resumen}}</td>
                    <td class="py-4">{{item.votos}}</td>
                    <td class="py-4">{{item.fecha_hora.slice(0,10)}}</td>
                    <td>
                        <router-link :to="`/editar/${item.id}`" tag="button" class="btn btn-success me-2"><i class="bi-pencil"></i></router-link>
                        <button class="btn btn-danger text-white" @click="eliminar(item.id)">X</button>
                    </td>
                </tr> 
            </tbody>           
        </table>
    </div>
    <div class="text-center">
        <router-link to="/crear-publicacion" class="btn mt-3 btn-primary text-white">Agregar publicación</router-link>
    </div>
     
</template>

<script>
export default {
    data(){
        return{
            mostrar: undefined,
            respuesta:'',
            mispublicaciones:[]
        }
    },
    methods:{
       cargarPublicaciones(){
            //var data = {userid:localStorage.getItem('userid')} 
            var request= $.ajax({
                url:' http://localhost:8080/consultar-mis-publicaciones',
                type:'POST',
                xhrFields:{withCredentials:true}
            })
            request.done((res)=>{
                if (res == "0"){
                    this.respuesta = "Aún no has hecho publicaciones"
                    this.mostrar = true
                }
                else{
                    this.mispublicaciones = res
                    this.mostrar = false
                }
            })
        }, 
        eliminar(item){
            confirm("¿Deseas eliminar esta publicación?")
            $.ajax({
                url:'http://localhost:8080/eliminar_pub',
                type:'DELETE',
                data : {pubid:item}
            }).done((res)=>{
                location.reload()
            })
        }
    },
     created(){
        this.cargarPublicaciones()
        
    }
}
</script>

<style>
.over{
    overflow-x:auto;
    
}
.titulo{
    
    text-decoration: none;
    color:black
}
</style>