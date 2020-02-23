<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>

    <van-tabbar v-model="active" @change="changeTabbar(active)" fixed>
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: ""
    };
  },
  methods: {
    changeTabbar(active) {
      //   console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    },
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/Main/ShoppingMall") {
        this.active = 0;
      } else if (this.nowPath == "/Main/CategoryList") {
        this.active = 1;
      } else if (this.nowPath == "/Main/Cart") {
        this.active = 2;
      } else if (this.nowPath == "/Main/Member") {
        this.active = 3;
      }
    }
  },
  created() {
    this.changeTabBarActive();
  },
  mounted() {
    
  }
};
</script>

<style scoped>
</style>