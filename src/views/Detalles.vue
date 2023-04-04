<template>
  <div class="container d-flex mt-5  py-4 justify-content-center bg-light border">
    <div class="d-flex bg-white col-10 border flex-column ps-3">
        <div class = "d-flex align-items-lg-center align-items-start mt-3 flex-column flex-lg-row"> 
            <h2 >{{publicacion.titulo}}</h2>
            <span class="ms-lg-4"><i class="bi-heart-fill me-2" style="color:red"></i>{{publicacion.votos}} votos</span>
            <button v-if="active" class="btn btn-success btn-sm ms-lg-4" @click="votar">Votar</button>
        </div>
        <h6 class="my-3">{{publicacion.resumen}}</h6>
        <div id="contenido" class="mt-3 over pe-2"></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            active: localStorage.getItem('active'),
            publicacion:'',
            contenido: ''
        }
    },
    methods:{
        cargarContenido(){
            $.ajax({
                url:"http://localhost:8080/ver_publicacion",
                type: "POST",
                data: {id:this.$route.params.id}
            }).done((res)=>{
                if (res == "0"){
                    this.$router.push({path:'/'})
                }
                else{
                    this.publicacion = res[0]
                    var contenido = res[0].contenido.replaceAll('%26','&')
                    $("#contenido").html(contenido)

                }
            })
        },
        votar(){
            $.ajax({
                url:"http://localhost:8080/votar",
                type: "POST",
                data: {id:this.$route.params.id}
            }).done((res)=>{
                if (res == "1"){
                    location.reload()
                }
            })
        }
    },
    created(){
        this.cargarContenido()
    }
}
</script>
<style>
.over{
    overflow-wrap: break-word;
    text-align: justify;
    
}
</style>