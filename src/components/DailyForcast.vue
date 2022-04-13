<template>
  <div class="daily-forcast">
    <div>
      <span>{{
        new Date(this.day.dt * 1000).toLocaleString("en-us", {weekday: "long",})}}</span>
    </div>
    <div class="condition">
      <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" :style="{filter: getFilter}" alt="Weather condition icon"/>
    </div>
    <div class="weather">
      <span class="high">{{ Math.round(this.day.temp.max) }}&deg;</span>
      <span class="low">{{ Math.round(this.day.temp.min) }}&deg;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Daily-Forcast",
  props: {
    day: Object,
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
.daily-forcast {
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    flex: 1;
  }

  .condition {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 25px;
    }
  }
  .weather {
    display: flex;
    justify-content: flex-end;

    span {
      min-width: 20px;
    }

    .high {
      font-weight: 500;
      margin-right: 12px;
    }
  }
}
</style>