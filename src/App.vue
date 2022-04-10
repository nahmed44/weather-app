<template>
  <div>
    <Navbar @showDeleteCity="showDeleteCity = !showDeleteCity" :onHome="onHome"/>
    <router-view :showDeleteCity="showDeleteCity"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }, 
  data() {
    return {
      showDeleteCity: false,
      onHome: null,
    }
  },
  watch:{
    $route(){
      this.$route.name === 'home' ? this.onHome = true : this.onHome = false;
    }
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", "sans-serif";
}
#app{
  display: flex;
  flex-direction: column;
  max-width: 820px;
  min-height: 100vh;
  margin: auto;
  color: white;
  // background-color: rgb(10, 28, 39);
  background-color: rgb(2, 20, 32);
}
.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  // background-color: rgb(186, 182, 182);
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
</style>
