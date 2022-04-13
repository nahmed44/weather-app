<template>
  <div class="current-weather">
    <div class="container">
      <div class="weather-info">
        <!-- Current city & it's temperature -->
        <span class="city">{{ this.$route.params.city }}</span>
        <span class="current-temperature">{{ Math.round(this.forcast.current.temp) }}</span>
        <!-- Today's high & low temperatures -->
        <div class="high-low-temperatures">
          <div class="high">
            <i class="material-icons-outlined">expand_less</i>
            <span>{{ Math.round(this.forcast.daily[0].temp.max) }}&deg;</span>
          </div>
          <div class="low">
            <i class="material-icons-outlined">expand_more</i>
            <span>{{ Math.round(this.forcast.daily[0].temp.min) }}&deg;</span>
          </div>
        </div>
        <span class="condition">{{ this.forcast.current.weather[0].description }}</span>
        <span class="feels-like">Feels like {{ Math.round(this.forcast.current.feels_like) }}&deg;</span>
      </div>
      <!-- Weather icon on the right -->
      <div class="weather-icon">
        <img v-if="!isNight" src="../../public/sun.png" alt="" />
        <img v-if="isNight" src="../../public/moon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentWeather",
  props: {
      isNight: Boolean, 
      forcast: Object,
  },
};
</script>

<style lang="scss" scoped>
.current-weather {
  margin-top: 90px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);

  .container {
    margin: 30px 20px;
    min-height: 330px;
    position: relative;
    display: flex;
  }

  span {
    display: block;
  }

  .weather-info {

    .city {
      font-size: 24px;
      font-weight: 500;
      text-transform: capitalize;
    }

    .current-temperature {
      margin-top: 30px;
      font-size: 80px;
      font-weight: 600;
    }
  }

  .high-low-temperatures {
    display: flex;
    gap: 16px;

    .high,
    .low {
      display: flex;
      i{
          font-size: 30px;
      }
      span {
          padding-top: 8px;
      }
    }
  }

  .condition {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 500;
    margin: 60px 0 8px 0;
  }

  .feels-like {
    font-size: 14px;
    font-weight: 400;
  }

  .weather-icon {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    img {
      width: 366px;
      height: 366px;
    }
  }
  @media (min-width: 350px) {
    .weather-icon {
      right: -200px;
      right: -70vw;
    }
  }
    @media (min-width: 390px) {
    .weather-icon {
      right: -200px;
    }
  }
    
}
</style>