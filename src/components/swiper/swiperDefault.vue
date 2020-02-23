<template>
  <div>
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
          Slide{{item}}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      slide: [1, 2, 3, 4, 5, 6],
    //   swiperOption:{
    //       direction : 'vertical',
    //       pagination:{
    //           el: '.swiper-pagination',
    //           clickable :true
    //       }
    //   },
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.swiper-slide{
    height: 4rem;
    text-align: center;
    padding-top: 3rem;
    border-bottom: 1px solid #ccc;
    line-height: 4rem;
}
.swiper{
    height: 7rem;
    /* text-align: center;
    line-height: 7rem; */
}
</style>