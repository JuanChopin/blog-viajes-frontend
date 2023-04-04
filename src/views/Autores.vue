<template>
    <div class="d-flex justify-content-center">
        <h1 class="mt-2">Nuestros autores</h1>
    </div>
    <div v-if="autores" class="container border mt-3 p-0">
        <ul class="list-group">
            <li class="list-group-item py-3" v-for="item in autores" :key="item.id">
                <img v-if="item.avatar != null" class="rounded-circle icon me-2" :src="`http://localhost:8080/avatars/${item.avatar}`">
                <i v-else class="bi-person me-2"></i>
                {{item.nickname}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
                autores:null
        }
    },
    methods:{
        cargarAutores(){
            $.ajax('http://localhost:8080/autores').done((res)=>{
                this.autores = res
                console.log(this.autores)
            })
        }
    },
    created(){
        this.cargarAutores()
    }

}
</script>

<style>
.icon{
    height: 25px;
    width: 25px;
}
</style>