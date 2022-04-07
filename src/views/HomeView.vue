<template>
  <div class="home-view">
    <div class="search-bar">
      <input type="text" v-model="cityName" placeholder="Add a city..."
      @keyup.enter="addCity"
      >
      <!-- <div v-if="cities.length  === 0" class="no-cities">
        <p>Please add a city to get started.</p>
      </div> -->
    </div>
    <div v-if="cities.length  === 0" class="no-cities">
        <p>Please add a city to get started.</p>
      </div>

    <div class="grid">

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// https://dribbble.com/shots/15292603-Weather-Conceptual-App-Design#
export default {
  name: "HomeView",
  props: {
    cities: Array,
    edit: Boolean,
  },
  components: {
    
  },
  data(){
    return {
      cityName: "",
    }
  },
  
  methods: {
    addCity(){
      this.cityName.length <= 0 ? alert("Please enter city name") : null;
      this.$emit("add-city", this.cityName);
      this.cityName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
// .no-cities {
//   position: absolute;
//   min-height: 100vh;
//   max-width: 820px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;

//   button{
//     margin-top: 16px;
//     padding: 8px 24px;
//     border-radius: 8px;
//     border: none;
//     cursor: pointer;
//     transition: 500ms ease all;

//     &:hover {
//     outline: none;
//     transform: scale(0.98);
//     }
    
//     &:focus {
//       outline: none;
//     }
//   }
// }

.home-view {
  margin: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;


  input{
    min-width: 90vw;
    max-width: 820px;
    height: 40px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 16px;
    background-color: rgb(10, 28, 39);
    color: rgb(139, 144, 147);

    &:focus {
      outline: none;
      border: 1px solid white;
    }
  }

  .no-cities {
    // margin: 40px 0;
    // text-align: center;
  // position: absolute;
  min-height: 100vh;
  min-height: calc(100vh - 20vh);
  // max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

}
.grid{
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  // grid-gap: 20px;
  // justify-items: center;
  // align-items: center;
}
</style>