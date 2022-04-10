<template>
  <div class="weather">
    <div class="weather-wrap">
      <CurrentWeather v-if="forcast !== null" :isNight="true" :forcast="forcast"/>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CurrentWeather from '@/components/CurrentWeather.vue';
export default {
  name: "Weather",
  components: {
    CurrentWeather,
  },
  data(){
    return {
      lon: null,
      lat: null,
      forcast: null,
      loading: true,
    }
  },
  created(){
    this.lon = this.$route.query.lon;
    this.lat = this.$route.query.lat;
    this.getForcast();
    console.log('in created');
  },
  methods:{
    getForcast(){
      try {
        axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat
          }&lon=${this.lon}&units=metric&exclude=minutely,alerts&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then(response => {
          this.forcast = response.data;
          this.loading = false;
          this.getCurrentTime();
        });

      } catch (error) {
        alert('Enable to get the forcast');
      }
    },

    getCurrentTime(){
      const date = new Date();
      this.currentTime = date.getHours();
      const sunrise = new Date(this.forcast.current.sunrise * 1000).getHours();
      const sunset = new Date(this.forcast.current.sunset * 1000).getHours();
      if(this.currentTime >= sunrise && this.currentTime <= sunset){
        this.$emit('currentTime', 'day');
      }
      else {
        this.$emit('currentTime', 'night');
      }
    }
  },

}
</script>

<style lang="scss">

.weather {
  transition: 500ms ease;
  // overflow: scroll;
  width: 100%;
  height: 100%;
  .weather-wrap {
    overflow: hidden;
    max-width: 820px;
    margin: 0 auto;
  }
}

</style>