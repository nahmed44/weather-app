<template>
  <div class="app">
    <!-- <Navbar /> -->
    
    <router-view 
    :cities="cities"
    :edit="edit"
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
      cities: [],
      edit: false,
    }
  },
  created(){
    try {
      const userCities = JSON.parse(localStorage.getItem('cities'));
      if(userCities){
        this.cities = userCities;
      }
     } catch (error) {
       console.log('in error');
      console.log(error);  
    }
  },
  methods: {
    async addCity(city){
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_API_KEY}`)
        const data = await response.data; 
        console.log(data);
        this.cities.push(data);
        localStorage.setItem('cities', JSON.stringify(this.cities));
      } catch (error) {
        alert("City not found");
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
  background-color: rgb(10, 28, 39);
}
</style>
