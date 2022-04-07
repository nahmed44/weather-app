<template>
  <div class="home-view">
    <div class="search-bar">
      <input type="text" v-model="cityName" placeholder="Add a city..."
      @keyup.enter="addCity">
    </div>
    <div v-if="cities.length  === 0" class="no-cities">
        <p>Please add a city to get started.</p>
      </div>

    <div class="grid">
      <div class="city" v-for="(city, index) in cities" :key="index">
        <City :city="city" :edit="edit"/>
      </div>
    </div>

  </div>
</template>

<script>
import City from '@/components/City.vue'
// @ is an alias to /src
// https://dribbble.com/shots/15292603-Weather-Conceptual-App-Design#
export default {
  name: "HomeView",
  props: {
    cities: Array,
    edit: Boolean,
  },
  components: {
    City,
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
.home-view {
  margin: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  .search-bar{
    width: 100%;
  
    input{
      height: 40px;
      min-width: 100%;
      max-width: 820px;
      border: none;
      border-radius: 20px;
      padding: 0 20px;
      font-size: 16px;
      color: rgb(139, 144, 147);
      background-color: rgb(10, 28, 39);
      transition: 500ms ease all;

      &:hover {
        outline: none;
        transform: scale(0.98);
        }
      &:focus {
        outline: none;
        border: 1px solid white;
        color: white;
      }
    } 
  }

  .no-cities {
    min-height: 100vh;
    min-height: calc(100vh - 20vh);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }

}
.grid{
  display: grid;
  padding-top: 30px;
  // background-color: #31363d;
  width: 100%;
  gap: 20px;
  // min-height: 100vh;
  @media(min-width: 340px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 520px){
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>