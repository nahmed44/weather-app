<template>
  <div @click="goToWeather" class="city" :style="{'background-color': $store.state.cityBgColor }">
    <!-- Current Weather and its Icon -->
    <div class="weather">
      <span>{{ Math.round(this.city.main.temp) }}&deg;</span>
      <img :src="require(`../../public/conditions/${this.city.weather[0].icon}.svg`)" :style="{filter: getFilter}"  alt="weather icon"/>
    </div>
    <!-- City & country Name -->
    <div class="city-country">
      <span>{{ this.city.name }}</span>
      <span>{{ this.city.sys.country }}</span>
    </div>
    <!-- Weather Description -->
    <div class="humidity-speed">
      <div class="humidity">
        <span class="material-icons-outlined icon">water_drop</span>
        <span>{{ this.city.main.humidity }}%</span>
      </div>
      <div class="speed">
        <span class="material-icons-outlined icon">air</span>
        <span>{{ Math.round(this.city.wind.speed) }}km/h</span>
      </div>
    </div>

    <!-- Delete city button -->
    <span
      title="Delete city"
      v-show="showDeleteCity"
      @click="deleteCity"
      class="material-icons-round delete"
      :style="{'background-color': $store.state.bodyBgColor, 'border-color': $store.state.bodyBgColor }"
      ref="delete"
      >delete_forever</span
    >
  </div>
</template>

<script>
export default {
  name: "City",
  emits: ['deleteCity'],
  props: {
    city: Object,
    showDeleteCity: Boolean,
  },
  data() {
    return {
      self: this,
    };
  },
  methods: {
    deleteCity(e){
      console.log(e);
      if (e.target === this.$refs.delete){
        this.$emit('deleteCity', this.city);
      }
    },
    goToWeather(e){
      if (e.target !== this.$refs.delete){
        this.$router.push({
          name: 'weather',
          params: {
            city: this.city.name.toLowerCase(),
          },
          query: {
            lon: this.city.coord.lon,
            lat: this.city.coord.lat,
          }
        });
      }
    },
  },

  computed: {
    // Color filter for weather icon based on background color
    getFilter(){
      if (this.$store.state.darkMode){
        return 'invert(0)';
      }
      else {
        return 'invert(1)';
      }
    },
  }
  
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  flex-basis: 50%;
  max-width: 820px;
  border: 1px solid transparent;
  border-radius: 20px;
  // transition: all 0.3s ease-in-out;
  // color: white;
  // background-color: rgb(13, 40, 54);
  // box-shadow: 0 1px 2px 0 rgba(0,0,0, 0.5);

  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    border: 1px solid white;
    box-shadow: 0 1.5px 2px 0 rgba(23, 23, 23, 0.5);
  }

  @media (min-width: 750px) {
    .city {
      .weather {
        span {
          font-size: 70px;
        }
        img {
          height: 70px;
        }
      }
      .city-country {
        span {
          font-size: 25px;
        }
      }
      .humidity-speed {
        .humidity,
        .speed {
          span {
            font-size: 20px;
          }
          .icon {
            font-size: 25px;
          }
        }
      }
    }
  }

  .delete {
    border-radius: 0px 15px 0 15px;
    // border: 7px solid rgb(68, 99, 115);
    border: 7px solid;
    // border-color: ;
    // background-color:rgb(68, 99, 115);
    z-index: 1;
    font-size: 25px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    cursor: pointer;
  }

  .weather {
    display: flex;
    justify-content: space-between;
    z-index: 1;

    span {
      font-size: 10vw;
    }

    img {
      display: flex;
      align-self: center;
      height: 10vw;
      width: auto;
      // filter: invert(1);

    }
  }
  .city-country {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    font-size: 4vw;
    span:nth-child(2) {
      color: rgb(95, 125, 140);
    }
  }
  .humidity-speed {
    display: flex;
    justify-content: space-between;
    font-size: 3vw;
    padding: 0;
    margin: 0;

    .icon {
      font-size: 4vw;
      color: rgb(95, 125, 140);
    }

    .humidity,
    .speed {
      display: flex;
      span:nth-child(2) {
        margin-left: 3px;
      }
    }
  }
}
</style>

