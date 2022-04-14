<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather">
      <header>
        <nav>
          <router-link class="router-link" :to="{ path: '/' }">
            <span class="material-icons-outlined back-button" :style="{ color: $store.state.textColor }">west</span>
          </router-link>
          <span>
            {{ new Date().toLocaleDateString("en-us", { weekday: "short" }) }},
            {{ new Date().toLocaleDateString("en-us", { month: "short" }) }}
            {{ new Date().toLocaleDateString("en-us", { day: "2-digit" }) }}
          </span>

          <span class="deg">&deg;C</span>
        </nav>
      </header>
      <div class="weather-wrap">
        <CurrentWeather
          v-if="forcast !== null"
          :isNight="true"
          :forcast="forcast"
        />
        <HourlyWeather :forcast="forcast" />
        <WeeklyForcast :forcast="forcast" />
        <AdditionalInfo :forcast="forcast" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CurrentWeather from "@/components/CurrentWeather.vue";
import HourlyWeather from "@/components/HourlyWeather.vue";
import WeeklyForcast from "@/components/WeeklyForcast.vue";
import AdditionalInfo from "@/components/AdditionalInfo.vue";

export default {
  name: "Weather",
  components: {
    CurrentWeather,
    HourlyWeather,
    WeeklyForcast,
    AdditionalInfo,
  },
  data() {
    return {
      lon: null,
      lat: null,
      forcast: null,
      loading: true,
    };
  },
  created() {
    this.lon = this.$route.query.lon;
    this.lat = this.$route.query.lat;
    this.getForcast();
  },
  methods: {
    getForcast() {
      try {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&exclude=minutely,alerts&appid=${process.env.VUE_APP_API_KEY}`
          )
          .then((response) => {
            this.forcast = response.data;
            this.loading = false;
            this.getCurrentTime();
          });
      } catch (error) {
        alert("Enable to get the forcast");
      }
    },

    getCurrentTime() {
      const date = new Date();
      this.currentTime = date.getHours();
      const sunrise = new Date(this.forcast.current.sunrise * 1000).getHours();
      const sunset = new Date(this.forcast.current.sunset * 1000).getHours();
      if (this.currentTime >= sunrise && this.currentTime <= sunset) {
        this.$emit("currentTime", "day");
      } else {
        this.$emit("currentTime", "night");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.weather {
  transition: 500ms ease;
  width: 100%;
  height: 100%;

  nav {
    display: flex;
    justify-content: space-between;
    padding-top: 30px ;
  }
  .back-button{
    font-size: 1.5rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  span{
    font-weight: 600;
  }
  .deg{
    margin-right: 1rem;
  }
  .weather-wrap {
    overflow: hidden;
    max-width: 820px;
    margin: 0 auto;
  }
}
</style>