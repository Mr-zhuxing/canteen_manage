<template>
  <div id="content">
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationImg" alt width="80%" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" v-model="search_val" />
        </van-col>
        <van-col span="5">
          <van-button size="mini" color="round" @click="mohuQuery" round>查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swipe area -->
    <div class="swiper-area" :style="bannerPicWidth" ref="swiperArea">
      <van-swipe class="my-swipe" :autoplay="1500" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swipeAreaPicArray" :key="index">
          <img v-lazy="item.imageUrl" alt width="100%" :height="bannerPicWidth.height" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type bar -->
    

    <!-- Recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item" @click="goGoodsPage(item.ID)">
              <img :src="item.IMAGE1" alt width="80%" />
              <div>{{item.NAME}}</div>
              <div>￥{{item.ORI_PRICE | toMoney}}(￥{{item.PRESENT_PRICE | toMoney}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- floor -->
    <floor-component :floorData="floor1" :floorTitle="floorName[0]"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName[1]"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName[2]"></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info
                :goodsImage="item.IMAGE1"
                :goodsName="item.NAME"
                :goodsPrice="item.PRESENT_PRICE"
                :goodsId="item.ID"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js";
var bannerPicWidth = document.documentElement.clientWidth * 0.5;
export default {
  data() {
    return {
      locationImg: require("../../assets/images/location.png"),
      swipeAreaPicArray: [
        { imageUrl: require("../../assets/images/sy1.jpg") },
        { imageUrl: require("../../assets/images/sy2.jpg") },
        { imageUrl: require("../../assets/images/sy3.jpg") }
      ],
      bannerPicWidth: {
        height: bannerPicWidth + "px"
      },
      category: [],
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [{}, {}, {}],
      floor2: [{}, {}, {}],
      floor3: [{}, {}, {}],
      floorName: {},
      hotGoods: [],
      goodsId: "",
      search_val: ""
    };
  },
  methods: {
    goGoodsPage(ID) {
      this.$router.push({
        name: "goods",
        query: {
          goodsId: ID
        }
      });
    },
    mohuQuery() {
      if (this.search_val == "") {
        return;
      }
      axios({
        method: "get",
        url: url.mohuQuery + "?str=" + this.search_val
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$store.commit('goods/setQueryGoods',response.data.message)
            this.$router.push({
              name: "QueryGoods",
              query: {
                val:this.search_val,
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //进入前判断是否登录
    // document.cookie || this.$router.push("/login");
    axios({
      method: "get",
      url: url.getShoppingMallInfo,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  mounted() {
    // console.log(this.$refs["swiperArea"].style);
    // document.getElementsByClassName('swiper-area')[0].style.height = bannerPicWidth+'px';
    // let tab = document.getElementsByClassName('van-tabbar')[0];
    // console.log(tab)
    // console.log(document.documentElement.clientHeight)
    // tab.style.bottom = 0 + 'px';
    let content = document.getElementById("content");
    content.style.height = document.documentElement.clientHeight + "px";
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    toMoney(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
#content {
  width: 100%;
  overflow: scroll;
}
.search-bar {
  text-align: center;
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff;
  background-color: #e5017d;
  color: #fff;
}
.swiper-area {
  clear: both;
  max-height: 20rem;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  text-align: center;
  background-color: #39a9ed;
  /* width: 100%; */
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>