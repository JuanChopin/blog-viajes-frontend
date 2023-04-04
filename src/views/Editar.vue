<template>
  <div class="container p-4 bg-light border mt-5">
      <h3>Editar publicación</h3>
      <div class="row text-center">
          <form @submit.prevent="guardar" id="form">
              <div :class="alert">{{respuesta}}</div>
              <input class="form-control mt-3 mb-5" type="text" placeholder="Título" name="titulo" v-model="titulo">
              <textarea class="form-control my-5" placeholder="Resumen" name="resumen" v-model="resumen"></textarea>
              <div class="my-5">
                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              </div>
              <div class="text-center">
                  <button class="btn btn-primary" type="submit">Guardar</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
    data() {
            return {
                titulo:'',
                resumen:'',
                contenido:'',
                param: this.$route.params.id,
                respuesta:'',
                alert:'',
                editor: ClassicEditor,
                editorData: '',
                editorConfig:{
                    placeholder:"Escribe aqui el contenido de tu post",
                    toolbar: {
                        items: [
                            'heading',
                            'bold',
                            'italic',
                            'link',
                            'undo',
                            'redo',
                            'numberedList',
                            'bulletedList'
                        ]
                    }
                }
           }
       },
       methods:{
           obtenerDetalle(){
               $.ajax({
                   url:' http://localhost:8080/detalle_publicacion',
                   type: 'POST',
                   data: {id:this.param}
               }).done((res)=>{
                   var detalle = []
                   for (var elem of res){
                        detalle.push(elem)
                   }
                   this.titulo = detalle[0].titulo
                   this.resumen = detalle[0].resumen
                   this.editorData = detalle[0].contenido.replaceAll('%26','&')
                   
               })
           },
           guardar(){
               confirm("¿Desea guardar los cambios realizados?")
               var form = $("#form")
               var nuevo = this.editorData.replaceAll('&','%26')
               var data = form.serialize()+`&contenido=${nuevo}&pubid=${this.param}`
               $.ajax({
                    url:' http://localhost:8080/guardar_editar',
                    type:'PUT',
                    data: data
               }).done((res)=>{
                    if (res == "1"){
                        this.alert="alert alert-danger"
                        this.respuesta= "Completa todos los campos"
                    }
                    else{
                        this.alert = ""
                        this.$router.push({path:'/mis-publicaciones'})
                    }
               })
           }
       },
       created(){
           this.obtenerDetalle()
       }
}
</script>

<style>

</style>