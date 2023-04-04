<template>
  <div class="text-center py-4">
      <h3>Iniciar sesión</h3>
  </div>
  <div class="container " >
      <div class="row justify-content-center ">
          <div class="col-10 col-lg-4 bg-lightblue p-5 rounded">
              <form @submit.prevent="iniciar" id="form"> 
                  <div :class="alert">{{respuesta}}</div>
                  <input placeholder="Email" class="form-control my-3" name="email" >
                  <InputPwd class="my-3" placeholder="Contraseña" name="contrasena" v-model="pwd"/>
                  <div class="text-center mt-5">
                    <button class="btn btn-outline-info text-white" type="submit">Iniciar sesión</button>
                  </div>
              </form>
              <div class="mt-4">
                <span class="text-white">¿No tienes una cuenta?<router-link class="text-white ms-2" to="/registro">!Regístrate!</router-link></span>
              </div>  
          </div>
      </div>                
  </div>

</template>

<script>
import InputPwd from '../components/InputPwd'
import Navbar from '../components/Navbar'
import {mapActions} from 'vuex'
export default {
    components:{
        InputPwd,Navbar
    },
    data(){
        return{
            alert:"",
            pwd :"",
            respuesta:""
        }
    },
    methods:{
         ...mapActions(['setInfoSesion','iniciarConexion']),
         iniciar(){
          var form = $("#form")
          var data = form.serialize()
          alert(data)
          var request = $.ajax({
              url:'http://localhost:8080/validar_inicio',
              type:"POST",
              data: data,
              xhrFields:{withCredentials:true}   
          })
          request.done((res)=>{
                this.respuesta = res
                if (res == "1"){
                    this.alert="alert alert-danger"
                    this.respuesta= "Completa todos los campos"
                }
                else if (res == 2) {
                    this.alert="alert alert-danger"
                    this.respuesta="Usuario y/o contraseña inválidos"
                }
                else{
                    this.alert=""
                    this.respuesta=""
                    this.setInfoSesion(res)
                    this.iniciarConexion()
                    this.$router.push({path:'/'})
                 }
                })
        }
    },
    created(){
        localStorage.clear()
    }
}
</script>

<style>

    .bg-lightblue{
        background-color: rgb(55, 68, 247);
    }


</style>