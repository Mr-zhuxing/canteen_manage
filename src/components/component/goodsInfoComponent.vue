<template>
  <div class="goods-info" @click="goGoodsPage">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {};
  },
  methods: {
    goGoodsPage() {
      this.$router.push({
        name: "goods",
        query: {
          goodsId: this.goodsId
        }
      });
    }
  },
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.goods-image{
  height: 170px;
  widows: 170px;
}
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>