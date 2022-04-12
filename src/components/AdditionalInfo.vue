<template>
  <div class="additional-info container">
    <div>
      <span>Sunrise</span>
      <span>{{
        new Date(this.forcast.current.sunrise * 1000).toLocaleString("en-us", { timeStyle: "short", })}}
      </span>
    </div>
    <div>
      <span>Sunset</span>
      <span>{{
        new Date(this.forcast.current.sunset * 1000).toLocaleString("en-us", { timeStyle: "short", })}}
      </span>
    </div>
    <div>
      <span>Humidity</span>
      <span>{{ this.forcast.current.humidity }}%</span>
    </div>
    <div>
      <span>Cloudiness</span>
      <span>{{ this.forcast.current.clouds }}%</span>
    </div>
    <div>
      <span>Wind Speed</span>
      <span>{{ Math.round(this.forcast.current.wind_speed) }} m/s</span>
    </div>
    <div>
      <span>Pressure</span>
      <span>{{ this.forcast.current.pressure }} kPa</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Additional-Info",
  props: {
    forcast: Object,
  },
};
</script>

<style lang="scss" scoped>
.additional-info {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  color: white;

  > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    margin-bottom: 20px;

    span:nth-child(1) {
      font-size: 12px;
      margin-bottom: 8px;
    }
    span:nth-child(2) {
      font-weight: 600;
    }
  }

  div:nth-child(5),
  div:nth-child(6) {
    margin-bottom: 0;
  }
}
</style>