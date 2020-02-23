<template>
  <div>
    <div class="hot-area">
      <van-nav-bar :title="'搜索结果:'+search_val" left-text="返回" left-arrow @click-left="onClickLeft" fixed="true" />
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <div id="content">
          <van-list>
            <van-row gutter="20">
              <van-col span="12" v-for="(item,index) in goods" :key="index">
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
  </div>
</template>

<script>
import goodsInfo from "@/components/component/goodsInfoComponent.vue";
export default {
  data() {
    return {
      search_val: "",
      goods: []
    };
  },
  props: [],
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "ShoppingMall"
      });
    }
  },
  created() {
    this.goods = this.$store.getters["goods/getQueryGoods"];
    this.search_val = this.$route.query.val;
  },
  components: {
    goodsInfo: goodsInfo
  }
};
</script>

<style scoped>
.hot-goods {
  margin-top: 46px;
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
#content {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>