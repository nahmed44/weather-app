<template>
  <div id="app" :style="{color: $store.state.textColor, 'background-color': $store.state.bodyBgColor }">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App', 
  created(){
    this.$store.dispatch('checkDarkMode', true);
  },
}
</script>
<style lang="scss">
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
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
@-moz-document url-prefix() { /* Disable scrollbar Firefox */
  html{
    scrollbar-width: none;
  }
}
body::-webkit-scrollbar { /* Disable scrollbar Chrome/Safari/Webkit */
  width: 0px;
  background: transparent; 
}
</style>
