<template>
  <div class="app">
    <Navbar />
    
    <router-view 
    :cities="userCities"
    :showDeleteCity="showDeleteCity"
    @add-city="addCity"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return{
      userCities: [],
      showDeleteCity: true,
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
    async addCity(cityToAdd){
      try {
        // Checking if city is already in the userCities array
        const cityExists = this.userCities.find(city => city.name.toLowerCase() === cityToAdd.toLowerCase());
        if(typeof(cityExists) !== 'undefined'){
          alert(`${cityToAdd} is already in your list.`);
          return;
        }
        // Getting the weather data
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityToAdd}&appid=${process.env.VUE_APP_API_KEY}`)
        const data = await response.data; 
        
        // Adding the city to the userCities array
        this.userCities.push(data);
        localStorage.setItem('cities', JSON.stringify(this.userCities));
      } catch (error) {
        alert("Please enter a valid city name");
      }
     
    },
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
.app{
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
