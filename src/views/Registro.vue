<template>
  <div class="text-center py-4">
      <h3>¡Regístrate!</h3>
  </div>
  <div class="container bg-lightblue rounded">
      <div class="row p-4">
        <div class="col-lg-6 px-lg-5">
            <div :class="alert">{{respuesta}}</div>
            <form @submit.prevent="validar" id="form"> 
                <input placeholder="Email" class="form-control my-3" name="email" v-model.trim="form.email">
                <input placeholder="Nickname" class="form-control my-3" name="nickname" v-model.trim="form.nick">
                <InputPwd class="my-3" placeholder="Contraseña" name="contrasena" v-model.trim="form.contrasena"/>
                <InputPwd class="my-3" placeholder="Confirma tu contraseña" name="confirmacion" v-model.trim="form.confirmar"/>
                <div class="text-center mt-3">
                    <button type="submit" class="btn btn-outline-info text-white">Registrarme</button>
                </div>
            </form>
        </div>
        <div class="col-lg-6 p-lg-5 p-3">
            <h2 class="text-light">¡Sé parte de nuestra comunidad de autores
                 y comparte tus experiencias con el mundo!</h2>
        </div>
        <div class="row mt-2 text-center">
            <span class="text-white">¿Ya tienes una cuenta?<router-link class="text-white ms-2" to="/login">Inicia sesión</router-link></span>
        </div>
    </div>
  </div>
</template>

<script>
import InputPwd from '../components/InputPwd'
import Navbar from '../components/Navbar'
export default {
    data(){
        return{
            respuesta:'',
            alert:'',
            form:{}
        }
    },
    components:{
        InputPwd,Navbar
    },
    methods:{
        validar(){
          if (Object.values(this.form).length < 4){
              this.alert = "alert alert-danger"
              this.respuesta = "Debes llenar todos los campos"
              return false
          }
          else{
              this.alert = ""
              this.respuesta = ""
          }
          if (this.form.contrasena != this.form.confirmar){
              this.alert = "alert alert-danger"
              this.respuesta = "La confirmación y la contraseña no coinciden"
              return false
          }
           else{
              this.alert = ""
              this.respuesta = ""
          }
          if (this.form.contrasena.length < 6){
               this.alert = "alert alert-danger"
              this.respuesta = "La contraseña debe tener mínimo 6 caracteres"
              return false
          }
          else{
              this.alert = ""
              this.respuesta = ""
          }
          var form = $("#form")
          var data = form.serialize()
          var request = $.ajax({
              url:'http://localhost:8080/validar_registro',
              type:"POST",
              data: data
          })
          request.done((res)=>{
                this.respuesta = res
                if (res != "Usuario registrado ¡Bienvenido!"){
                    this.alert="alert alert-danger"
                }
                else {
                    this.alert = "alert alert-success"
                }

            })
        }
    },

}
</script>

<style scoped>

    .bg-lightblue{
        background-color: rgb(55, 68, 247);
    }


</style>