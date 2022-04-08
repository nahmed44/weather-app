<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
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
</style>
