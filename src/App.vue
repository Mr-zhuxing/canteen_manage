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
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    if (document.cookie) {
      // 每次刷新的时候要重新赋予用户状态、用户ID和购物车信息
      let myCookie = document.cookie.split(";");
      let userIdReg = /(^userID=)/g;
      let userID = myCookie
        .filter((item, index) => {
          if (userIdReg.test(item)) {
            return item;
          }
        })[0]
        .split("=")[1];
      this.$store.commit("user/setUserId", userID);
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
