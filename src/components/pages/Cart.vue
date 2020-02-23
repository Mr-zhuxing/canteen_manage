<template>
  <div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.Name}}</div>

          <div class="pang-control">
            <van-stepper
              v-model="item.count"
              disabled-input
              integer
              min="0"
              max="8"
              @change="changeGoodsCount(item.goodsId,item.count)"
            />
          </div>
        </div>
        <div class="pang-goods-price">
          <div>￥{{item.price | moneyFilter}}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
        </div>
      </div>
    </div>
    <!--显示总金额-->
    <div class="totalMoney">商品总价：￥ {{totalMoney | moneyFilter}}</div>
    <!--购买和清空购物车-->
    <div class="card-title">
      <van-button size="small" type="info" plain round>确认购买</van-button>
      <van-button size="small" type="danger" @click="clearCart" plain round>清空购物车</van-button>
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车内的商品
      isEmpty: false //购物车是否为空，不为空则显示true，为空显示false
    };
  },
  methods: {
    getCartInfo() {
      console.log(" this.cartInfo:", this.$store.getters["cart/getCartInfo"]);
    },
    clearCart() {
      this.$store.dispatch("cart/clearCartInfo");
      this.cartInfo = [];
    },
    changeGoodsCount(goodsId, count) {
      this.$store.dispatch("cart/changeGoodsCount", {
        goodsId,
        count
      });
    },
    ws() {
      let reg = /^userID/g;
      let userId = document.cookie
        .split(";")
        .filter((item, index) => {
          // console.log(item, reg.test(item));
          return reg.test(item);
        })[0]
        .slice(7);
      var ws = new WebSocket(`ws://127.0.0.1:3000/${userId}`);
      ws.onopen = () => {
        console.log("WebSocket onopen");
        ws.send("hello,server");
        ws.close(1000, "交易完成");
      };
      ws.onmessage = e => {
        //接收消息并处理
        // console.log(JSON.parse(e.data));
      };
    }
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      return allMoney;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    // this.$store.dispatch("cart/setCartInfo");
    this.cartInfo = this.$store.getters["cart/getCartInfo"];
    this.isEmpty = this.cartInfo.length > 0 ? true : false;
    this.getCartInfo();
    // 创建websocket与服务器建立连接
    this.ws();
  }
};
</script>

<style scoped>
.card-title {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 3%;
}
.van-button--plain.van-button--info{
  margin-right: 3px;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>