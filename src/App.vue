<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar'
import {mapActions} from 'vuex'
export default {
  components:{
    Navbar
  },
  methods:{
    ...mapActions(['mantenerSesion']),
  },
  created(){
    this.mantenerSesion()
  }
}
</script>