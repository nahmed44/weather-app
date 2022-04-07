<template>
   <div @click="goToWeather" class="city">
      <i v-show="edit" @click="removeCity" class="fas fa-trash-alt edit" ref="edit"></i>
      <span>{{ this.city.name }}</span>
      <div class="weather">
        <!-- <span>{{ Math.round(this.city.currentWeather.main.temp)}}&deg;</span> -->
        <!-- <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="weather icon"> -->
      </div>
      <!-- <div class="video">
        <video autoplay loop muted :src="require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)"></video>
      </div> -->
      <div class="bg-overlay"></div>
  </div>
</template>

<script>
export default {
    name: "City",
    props: {
        city: Object,
        edit: Boolean,
    },
    // created(){
    //     console.log(this.city);
    //     console.log(`Type of city:${typeof(this.city)}`);
    // }
}
</script>

<style lang="scss" scoped>

.city{
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    min-height: 20vh;
    max-height: 150px;
    color: white;
    border: 1px solid transparent;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    // box-shadow: 0 1px 2px 0 rgba(0,0,0, 0.5);
    background-color: rgb(13, 40, 54);

    @media(min-width: 450px){
        min-height: 25vh;
    }

    .edit {
        border-radius: 0px 15px 0 0;
        border: 10px solid rgb(77, 77, 77);
        background-color: rgb(77, 77, 77);
        z-index: 1;
        font-size: 20px;
        position: absolute;
        bottom: 0px;
        left: 0px;
    }

    span{
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;
    }

    .weather{
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;

        span{
            font-size: 35px;
            margin-right: 8px;
        }

        img{
            height: 20px;
            width: auto;
        }
    }
    .video{
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video{
            height: 100%;
            @media(min-width: 900px){
                height: auto;
                width: 100%;
            }
        }

        .bg-overlay{
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-color: rgba(0,0,0, 0.2);
        }
    }
}

</style>

