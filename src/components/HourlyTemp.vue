<template>
  <div class="hour">
    <span>{{ new Date(this.time.dt * 1000).toLocaleString("en-us", { hour: "numeric" }) }}</span>
    <span>
      <img
        :src="require(`../../public/conditions/${this.time.weather[0].icon}.svg`)"
        :style="{ filter: getFilter }"
        alt="current weather condition icon"/>
    </span>
    <span>{{ Math.round(this.time.temp) }}&deg;</span>
  </div>
</template>

<script>
export default {
  name: "Hourly-Temp",
  props: {
    time: Object,
  },
  computed: {
    // Color filter for weather icon based on background color
    getFilter() {
      if (this.$store.state.darkMode) {
        return "invert(0)";
      } else {
        return "invert(1)";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hour {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 45px;
  margin-right: 30px;

  img {
    width: auto;
    height: 22px;
    display: block;
  }
}

span {
  display: block;
  align-self: center;
}

span:nth-child(1) {
  font-weight: 300;
  margin-bottom: 12px;
}
span:nth-child(2) {
  margin-bottom: 12px;
}
span:nth-child(3) {
  font-weight: 500;
}
</style>
