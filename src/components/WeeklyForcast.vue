<template>
  <div class="weekly-forcast">
    <div class="container">
      <div class="daily" v-for="(day, index) in filterList" :key="index">
        <DailyForcast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForcast from "./DailyForcast.vue";

export default {
  name: "Weekly-Forcast",
  props: {
    forcast: Object,
  },
  components: {
    DailyForcast,
  },
  computed: {
    filterList() {
      return this.forcast.daily.slice(1, 8);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-forcast {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);

  .daily {
    margin-bottom: 24px;
  }

  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>
