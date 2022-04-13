<template>
  <div class="weekly-forcast">
    <div class="container">
      <!-- Rendering a list for next 7 days -->
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
    // Filtering the forcast list to only show the next 7 days
    filterList() {
      return this.forcast.daily.slice(1, 8);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-forcast {
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);

  .daily {
    margin-bottom: 24px;
  }

  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>
