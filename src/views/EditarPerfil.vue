<template>
  <div class="container bg-light border mt-3 pb-2">
        <h3 class="mt-2">Editar perfil</h3>
        <div class="row mt-4">
            <div class="col-12 col-lg-4 d-flex justify-content-center ">
                <img :src="foto" class="img-fluid rounded avatar">
            </div>
            <div class="col-12 col-lg-8 mt-3 mt-lg-0">
                <form @submit.prevent="enviar" enctype="multipart/form-data" id="form" class="mt-sm-3">
                    <label for="file" class="mb-3" >Subir nueva foto (jpg, png)</label><span class="ms-4" style="color:red">{{respuesta}}</span>
                    <input type="file" class="form-control" name="avatar" id="file">
                    <button type="submit" class="btn mt-5 btn-primary">Subir</button>
                    <button type="button" @click="eliminar" class="btn btn-danger mt-5 ms-2">Eliminar foto</button>
                </form>
                
            </div>
        </div>
  </div>
  
</template>

<script>
export default {
    data(){
        return{
            respuesta:'',
            avatar:'',
            src : require('../assets/sinfoto.png')
        }
    },
    methods:{
        enviar(){
            var data = new FormData(document.getElementById("form"))
            //data.append("userid",localStorage.getItem('userid'))
            $.ajax({
                url:"http://localhost:8080/subiravatar",
                type: "POST",
                data:data,
                contentType:false,
                processData:false,
                xhrFields:{withCredentials:true}
            }).done((res)=>{
                if (res == "1"){
                    location.reload()
                }
                else{
                    this.respuesta = res
                }
        })
        },
        cargarFoto(){
            //var userid = localStorage.getItem('userid')
            $.ajax({
                url:"http://localhost:8080/cargarAvatar",
                type:"POST",
                xhrFields:{withCredentials:true}
            }).done((res)=>{
                this.avatar = res
            })
        },
        eliminar(){
            confirm("¿Desea eliminar este avatar?")
            $.ajax({
                url:'http://localhost:8080/eliminarAvatar',
                type:'POST',
                data: {avatar:this.avatar}
            }).done((res)=>{
                if (res == "1"){
                    location.reload()
                }
            })
        }
    },
    computed:{
        foto(){
            return this.avatar == '' ? `${this.src}`: `http://localhost:8080/avatars/${this.avatar}`
        }
    },
    created(){
        this.cargarFoto()
    }
}
</script>

<style>
.avatar{
    max-height: 400px;
}

</style>