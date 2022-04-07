<template>
  <h1>Weather View


  {{city}}
  </h1>
</template>

<script>
export default {
    name: "Weather",
    props:{
        city: String,
    },
    created(){
      console.log(`WeatherView: ${this.city}`);
    }
}
</script>

<style lang="scss">



</style>