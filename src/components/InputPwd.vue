<template>
  <div class="input-group">
        <input :type="type" class="form-control" :placeholder="placeholder" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <span @click="verOcultar" class="input-group-text"><i id="icon" :class="icon"></i></span>
    </div>
</template>

<script>
export default {
    name:"InputPwd",
    props:{
        modelValue: String,
        placeholder: String,
        name:String
    },
    data(){
        return{
            type:"password",
            icon:"bi-eye-fill",
        }
        },
    methods:{
        verOcultar(){
            if (this.type == "password"){
                this.icon = "bi-eye-slash-fill"
                this.type = "text"
                return
            }
            if (this.type == "text"){
                this.icon = "bi-eye-fill"
                this.type = "password"
                return
            }
            
        }
}
}
</script>
<style scoped>
    span:hover{
        cursor:pointer
    }
</style>>
