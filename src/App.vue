<template>
  <div id="app" :style="{color: $store.state.textColor, 'background-color': $store.state.bodyBgColor }">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer>
      <div class="footer">
        <div class="social-link">
          <a href="https://www.linkedin.com/in/noman--ahmed/" target="_blank"><img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="linkedin icon"></a>
          <a href="https://github.com/nahmed44/weather-app" target="_blank"><img src="https://img.icons8.com/glyph-neue/64/000000/github.png" alt="github icon" :style="{filter: getFilter}"></a>
        </div>
        <div class="copyright">
          <p>&copy; {{new Date().getFullYear()}} Noman Ahmed</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App', 
  created(){
    this.$store.dispatch('checkDarkMode', true);
  },
  computed: {
    // Color filter for weather icon based on background color
    getFilter() {
      if (this.$store.state.darkMode) {
        return "invert(1)";
      } else {
        return "invert(0)";
      }
    },
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
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 72px;
  border-top: 2px solid white;
  text-align: center;

  .social-link{
    padding: 10px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    img{
      width: 30px;
      height: 30px;
    }
  }

  .copyright{
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    p{
      margin: 4px;
    }
  }

  @media (max-height: 400px) {
    display: none;
  }
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
