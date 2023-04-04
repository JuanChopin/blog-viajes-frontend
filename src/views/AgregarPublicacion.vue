<template>
  <div class="container p-4 bg-light border mt-5">
      <h3>Crear publicación</h3>
      <div class="row text-center">
          <form @submit.prevent="publicar" id="form">
              <div :class="alert">{{respuesta}}</div>
              <input class="form-control mt-3 mb-5" type="text" placeholder="Título" name="titulo">
              <textarea class="form-control my-5" placeholder="Resumen" name="resumen"></textarea>
              <div class="my-5">
                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              </div>
              <div class="text-center">
                  <button class="btn btn-primary" type="submit">Publicar</button>
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
                    },
                    fillEmptyBlocks: true
                }
           }
       },
       methods:{
           publicar(){
               var nuevo = this.editorData.replaceAll('&','%26')
               var form = $("#form")
               var data = form.serialize()+`&contenido=${nuevo}` //&userid=${localStorage.getItem('userid')}`
               var request=$.ajax({
                   url:'http://localhost:8080/publicar',
                   type:"POST",
                   data:data,
                   xhrFields:{withCredentials:true}
               })
               request.done((res)=>{
                   this.respuesta = res
                    if (res == "1"){
                        this.alert="alert alert-danger"
                        this.respuesta= "Completa todos los campos"
                    }
                    else{
                        this.alert=""
                        this.$router.push({path:'/mis-publicaciones'})
                    }
               })
           }
       },
}
</script>
