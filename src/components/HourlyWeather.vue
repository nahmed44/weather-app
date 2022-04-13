<template>
  <div class="hourly-weather">
    <div class="container">
      <div class="hourly-temp" v-for="(time, index) in filterList" :key="index">
        <HourlyTemp :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemp from "./HourlyTemp.vue";

export default {
  name: "Hourly-Weather",
  props: {
    forcast: Object,
  },
  components: {
    HourlyTemp,
  },
  computed: {
    filterList() {
      return this.forcast.hourly.slice(0, 23);
    },
  },
};
</script>

<style lang="scss" scoped>
.hourly-weather {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);

  .container {
    display: flex;
    max-width: 100vw;
    overflow: scroll;
    padding: 0;
    margin: 0 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>