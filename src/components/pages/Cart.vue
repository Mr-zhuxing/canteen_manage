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
      <van-button size="small" type="info" @click="confirmBuy" plain round>确认购买</van-button>
      <van-button size="small" type="danger" @click="clearCart" plain round>清空购物车</van-button>
    </div>
    <!-- 显示订单 -->
    <div class="totalMoney">我的订单</div>
    <div class="cart-list order-cart-list">
      <div class="pang-row" v-for="(item,index) in orders" :key="index">
        
        <div class="pang-img">
          <img :src="item.IMAGE1" width="100%" />
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.NAME}}</div>
          <div class="pang-control">
            <div>订餐时间{{new Date(item.time).Format('yyyy-MM-dd hh:mm:ss')}}</div>
            <div class="orderState">
              <div>状态:</div>
              <div>{{item.state | stateFilter}}</div>
            </div>
          </div>
        </div>
        <div class="pang-goods-price">
          <!-- <div>￥{{item.goodsPrice | moneyFilter}}</div> -->
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.goodsPrice*item.count | moneyFilter}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Notify } from "vant";
import axios from "axios";
import { toMoney } from "@/filter/moneyFilter.js";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车内的商品
      allGoods: [], // 购物车内所有商品的id
      isEmpty: false, //购物车是否为空，不为空则显示true，为空显示false
      show: false,
      orders: [] //订单数据
    };
  },
  methods: {
    clearCart() {
      this.$store.dispatch("cart/clearCartInfo");
      this.cartInfo = [];
    },
    changeGoodsCount(goodsId, count) {
      this.$store.dispatch("cart/changeGoodsCount", {
        goodsId,
        count
      });
      if (this.cartInfo.length > 0) {
        this.allGoods = []; //重新赋值
        this.cartInfo.forEach((item, index) => {
          this.allGoods.push({
            id: item.goodsId,
            count: item.count
          });
        });
      }
    },
    ws() {
      var ws = new WebSocket(
        `ws://127.0.0.1:3000/${this.$store.getters["user/getUserId"]}`
      );
      ws.onopen = () => {
        console.log("WebSocket onopen");
        ws.send("hello,server");
        // ws.close(1000, "交易完成");
      };
      ws.onmessage = e => {
        //接收消息并处理       
        let newData = JSON.parse(e.data);
        if (newData.orders) {
          newData = newData.orders;
          let nowTime = new Date().getTime();
          this.orders.forEach((item1, index1) => {
            newData.some((item2, index2) => {
              if (item1.ID == item2.ID) {
                if (item1.state != item2.state) {
                   Notify(item2.state)
                  this.orders.splice(index1, 1, item2);
                }
                return true;
              }
            });
          });
        }
      };
    },
    confirmBuy() {
      Dialog.confirm({
        title: "确认购买",
        message: "确认购买"
      })
        .then(() => {
          axios({
            method: "post",
            url: url.confirmBuy,
            withCredentials:true,
            data: {
              userId: this.$store.getters["user/getUserId"],
              allGoods: this.allGoods,
              time: new Date()
            }
          }).then(response => {
            this.$store.dispatch("cart/clearCartInfo");
            // this.$router.go(0);
             window.location.href = response.data.url;
            // console.log(response);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getOrder() {
      axios({
        methods: "get",
        url: url.getOrder + "?userId=" + this.$store.getters["user/getUserId"]
      })
        .then(response => {
          // console.log(response)
          if (response.data.length != 0) {
            this.orders = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    },
    stateFilter(state) {
      if (state == "pending") {
        return "正在等待接单";
      } else if (state == "waiting") {
        return "商家已接单，请等待";
      } else {
        return "订单已完成";
      }
    }
  },
  components: {
    Dialog: Dialog.Component
  },
  created() {
    // this.$store.dispatch("cart/setCartInfo");
    this.cartInfo = this.$store.getters["cart/getCartInfo"];
    this.isEmpty = this.cartInfo.length > 0 ? true : false;
    if (this.cartInfo.length > 0) {
      this.cartInfo.forEach((item, index) => {
        this.allGoods.push({
          id: item.goodsId,
          count: item.count
        });
      });
    }
    // 创建websocket与服务器建立连接
    this.ws();

    // 获取订单数据
    this.getOrder();
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
.van-button--plain.van-button--info {
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
.cart-list.order-cart-list {
  padding-bottom: 50px;
}
.orderState div:nth-child(1) {
  float: left;
}
.orderState div:nth-child(2) {
  float: right;
  border: 1px solid #1989fa;
  border-radius: 10px;
}
</style>