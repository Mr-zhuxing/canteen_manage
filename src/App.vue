<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {},
  created() {
    if (document.cookie) {
      // 每次刷新的时候要重新赋予用户状态和购物车信息
      this.$store.commit("user/setLoginState", true);
      if (localStorage.cartInfo) {
        this.$store.dispatch("cart/init", JSON.parse(localStorage.cartInfo));
      }
    }
  }
};
</script>

<style>
#app {
  background-color: #f0f0f0;

  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
