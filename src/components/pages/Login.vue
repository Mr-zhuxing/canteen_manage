<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      @click-right="onClickRight"
    />
    <div class="register-panel">
      <!-- 输入用户名 -->
      <van-field
        v-model="account"
        label="用户号:"
        placeholder="请输入用户号"
        required
        clearable
        :error-message="account_err_message"
      />
      <!-- 输入密码 -->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        :error-message="password_err_message"
      />

      <div class="register-button">
        <van-button type="primary" size="large" @click="login" :loading="openLoading">马上登录</van-button>
        <br />
        <br />
        <van-button type="primary" size="large" @click="logout" :loading="openLoading">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      account: "",
      password: "",
      openLoading: false, //用户注册时的等待标志
      account_err_message: "", //错误提示
      password_err_message: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log("onClickLeft");
    },
    onClickRight() {
      console.log("onClickRight");
    },
    login() {
      this.checkForm() && this.toLogin();
    },
    toLogin() {
      this.openLoading = true;
      axios({
        method: "post",
        url: url.userLogin,
        withCredentials: true, // 允许跨域发生cookie
        data: {
          account: this.account,
          password: this.password
        }
      })
        .then(response => {
          if (response.data.code == 200) {
            this.$store.commit("user/setLoginState", true);
            Toast.success("登录成功");
            this.$router.push("/Main");
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
          console.log(response);
        })
        .catch(err => {
          console.log(err);
          this.openLoading = false;
        });
    },
    //表单验证
    checkForm() {
      var regAccount = /\d{6,9}/g;
      if (regAccount.test(this.account) == false) {
        this.account_err_message = "用户号只能是6-9位数字";
        return false;
      } else if (this.password.length < 6) {
        this.password_err_message = "密码不能小于6位";
        return false;
      } else {
        return true;
      }
    },
    logout() {
      if (document.cookie) {
        // console.log(document.cookie.split(';'))
        axios({
          url: url.userLogout,
          method: "get",
          withCredentials: true
        })
          .then(result => {
            localStorage.removeItem('cartInfo');
            Toast.success("退出成功");
          })
          .catch(err => {
            Toast.fail(err);
          });
      } else {
        Toast.fail("您未登录");
        return;
      }
    }
  },
  created() {
    // console.log(this.$route.query.redirect);
    // 能到这个页面。必定是 1.在这个页面刷新。2.需要权限，重定向过来有query参数 3.从其他普通页面链接过来，则不携带query参数
    // 在login页面刷新时是没有query参数的，不改变路由。当有query参数时，就改变到参数携带的路由上。
    if (this.$route.query.redirect && this.$route.query.redirect != "/login" && this.$store.getters['user/getLoginState']) {
      this.$router.push(this.$route.query.redirect);
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 90px;
}
.register-button {
  padding-top: 10px;
}
</style>