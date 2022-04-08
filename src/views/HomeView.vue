<template>
  <div class="home-view">
    <div class="search-bar">
      <input type="text" v-model="cityToAdd" placeholder="Add a city..."
      @keyup.enter="addCity">
    </div>
    <div v-if="userCities.length  === 0" class="no-cities">
        <p>Please add a city to get started.</p>
      </div>

    <div class="grid">
      <div class="city" v-for="(city, index) in userCities" :key="index">
        <City :city="city" :showDeleteCity="showDeleteCity"/>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import City from '@/components/City.vue'
// @ is an alias to /src
// https://dribbble.com/shots/15292603-Weather-Conceptual-App-Design#
export default {
  name: "HomeView",
  components: {
    City,
  },
  data(){
    return {
      cityToAdd: "",
      userCities: [],
      showDeleteCity: false,
    }
  },
  created(){
    try {
      // Upon first load, getting the cities from localStorage
      const storedCities = JSON.parse(localStorage.getItem('cities'));
      if(storedCities){
        this.userCities = storedCities;
      }
     } catch (error) {
      console.log('Created APP.vue: in error');
      console.log(error);  
    }
  },
  methods: {
    async addCity(){
      try {
        if (this.cityToAdd.length !== 0){
          // Checking if city is already in the userCities array
          const cityExists = this.userCities.find(city => city.name.toLowerCase() === this.cityToAdd.toLowerCase());
          if(typeof(cityExists) !== 'undefined'){
            this.cityToAdd = "";
            alert(`${this.cityToAdd} is already in your list.`);
            return;
          }
          // Getting the weather data
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.cityToAdd}&appid=${process.env.VUE_APP_API_KEY}`)
          const data = await response.data; 
          
          // Adding the new city to the userCities array
          this.userCities.push(data);
          localStorage.setItem('cities', JSON.stringify(this.userCities));
          this.cityToAdd = "";
        }
        else{ // User didn't enter a city name
          alert("Please enter city name")
        }
      } catch (error) { // User entered a city name that doesn't exist
          alert("Please enter a valid city name");
      }
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

  @media(min-width: 600px){
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>