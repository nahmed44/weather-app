<template>
  <div >
    <!-- Showing loading spinner on initial load when fetching user cities list from the local storage  -->
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <!-- Displaying the homepage -->
    <div v-if="!loading" class="home-view">
       <header>
        <nav>
          <div class="nav">
            <Toggle v-model="$store.state.toggleValue" v-bind="$store.state.toggleValue" on-label="On" off-label="Off" @change="$store.dispatch('storeUserPreference')" class="toggle" :title="darkModeTitle"/>
            <span @click="showDeleteCity = !showDeleteCity" class="material-icons-outlined" title="Show Delete City">edit</span>
          </div>
        </nav>
      </header>
      <!-- Search Bar -->
      <div class="search-bar">
        <input type="text" v-model="cityToAdd" placeholder="Add a city..."
        @keyup.enter="addCity"
        :style="{'background-color': $store.state.cityBgColor, color: $store.state.textColor  }">
      </div>
      <!-- Add city msg if user has yet to add cities to thier list -->
      <div v-if="userCities.length  === 0" class="no-cities">
        <p>Please add a city to get started.</p>
      </div>
      <!-- List of cities -->
      <div class="grid">
        <div class="city" v-for="(city, index) in userCities" :key="index">
          <City :city="city" :showDeleteCity="showDeleteCity" @deleteCity="deleteCity"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import City from '@/components/City.vue'
import Toggle from '@vueform/toggle'
// @ is an alias to /src
// https://dribbble.com/shots/15292603-Weather-Conceptual-App-Design#
export default {
  name: "HomeView",
  components: {
    City,
    Toggle,
  },
  data(){
    return {
      cityToAdd: "",
      userCities: [],
      loading: true,
      showDeleteCity: false,
    }
  },
  created(){
    try {
      // Upon first load, getting the cities from localStorage
      const storedCities = JSON.parse(localStorage.getItem('cities'));
      if(storedCities){
        this.fetchCities(storedCities);
      }
      else {
        this.loading = false;
      }
     } catch (error) {
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
            alert(`${this.cityToAdd} is already in your list.`);
            this.cityToAdd = "";
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

    async deleteCity(city){
      // Removing the city from the userCities array
      this.userCities = this.userCities.filter(userCity => userCity.name !== city.name);
      localStorage.setItem('cities', JSON.stringify(this.userCities));
    },

    async fetchCities(storedCities){
      try {
        const threeHours = 3 * 60 * 60; // 3 hours in seconds
        const now = Math.floor(Date.now()/1000); // Current time in seconds

        this.userCities = await Promise.all(storedCities.map(async (city) => {
          const lastFetch = city.dt;	
          // If the last fetch was more than 3 hours ago, we fetch the new data
          if(now - lastFetch > threeHours){
            console.log('fetching new data ' + city.name);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city.name}&appid=${process.env.VUE_APP_API_KEY}`)
            const data = await response.data;
            return data;
          }
          else{
            return city;
          }
        }));

        // waiting for the promises to resolve before setting loading to false
        this.interval = setInterval(() => {
          if (this.userCities.length == storedCities.length){
            localStorage.setItem('cities', JSON.stringify(this.userCities));
            this.loading = false;
            clearInterval(this.interval);
            return;
          }
          console.log('resetting interval');
        }, 200);
      } catch (error) {
        alert('Enable to fetch forcast data! ')
        console.log('Enable to fetch forcast data! ', error);
      }
    },
  },
  computed: {
    darkModeTitle(){
      return this.$store.state.darkMode ? 'Disable Dark Mode' : 'Enable Light Mode';
    
    }
  }
};
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style lang="scss" scoped>
.home-view {
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  header{
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .nav{
      display: flex;
      margin-top: 5px;

      .toggle{
        --toggle-bg-on: rgb(13, 40, 54);
        --toggle-bg-off: #d0cdcd92;
        --toggle-border-on: rgb(13, 40, 54);
        --toggle-font-size: 0.85rem;
        --toggle-duration: 400ms;
        --toggle-ring-width: 0rem;
        --toggle-height: 1.35rem;
        --toggle-width: 3.2rem;
        --toggle-border: 0;
      }
    
      span{
        margin-left: 15px;
        cursor: pointer;
        text-align: center;
      }
    }
  }
  
  .search-bar{
    width: 100%;
    padding-top: 20px;
  
    input{
      height: 40px;
      min-width: 97%;
      max-width: 820px;
      border: none;
      border-radius: 20px;
      padding: 0 0 0 20px;
      font-size: 16px;
      outline: none;
      transition: 500ms ease all;

      &:hover {
        outline: none;
        transform: scale(0.98);
      }
      &:focus {
        outline: none;
        border: 1px solid white;
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
  }

}
.grid{
  display: grid;
  padding-top: 30px;
  width: 100%;
  gap: 20px;
  @media(min-width: 340px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 600px){
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>