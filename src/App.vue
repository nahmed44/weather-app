<template>
  <div id="app" :style="{color: $store.state.textColor, 'background-color': $store.state.bodyBgColor }">
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
  created(){
    this.$store.dispatch('checkDarkMode', true);
  },
}
</script>
<style lang="scss">

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #f1f1f1;
  font-family: "Quicksand", "sans-serif";
}

#app{
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 820px;
  width: 100%;
  min-height: 100vh;
  margin: auto;
  transition: all 0.4s ease-in;
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
  position: absolute;

  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 4px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
</style>
