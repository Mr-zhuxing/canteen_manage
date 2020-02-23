<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
      @click-right="onClickRight"
    />
    <div class="register-panel">
      <!-- 输入用户名 -->
      <van-field v-model="account" label="用户号:" placeholder="请输入用户号" required clearable :error-message="account_err_message"/>
      <!-- 输入昵称 -->
      <van-field v-model="username" label="昵称:" placeholder="请输入昵名" required clearable :error-message="name_err_message"/>
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
        <van-button type="primary" size="large" @click="register" :loading="openLoading" >马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from '@/serviceAPI.config.js';
import {Toast} from 'vant'
export default {
  data() {
    return {
      account: "",
      username: "",
      password: "",
      tel: "",
      digit: "",
      number: "",
      openLoading:false,          //用户注册时的等待标志
      account_err_message:'', //错误提示
      name_err_message:'',
      password_err_message:'',
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
    register(){
      this.checkForm() && this.toRegister();
    },
    toRegister() {
      this.openLoading = true
      axios({
        method: "post",
        url: url.registerUser,
        data:{
          account: this.account,
          username:this.username,
          password:this.password,
        }
      }).then((response)=>{
        if(response.data.code == 200){
          Toast.success('注册成功');
          this.$router.push('/')
        }else{
          Toast.fail('注册失败');
          this.openLoading = false;
        }
        console.log(response)
      }).catch(err=>{
        console.log(err);
        this.openLoading = false;
      });
    },
    //表单验证
    checkForm(){
      var regAccount = /\d{6,9}/g;
      if(regAccount.test(this.account) == false){
        this.account_err_message = "用户号只能是6-9位数字";
        return false;
      }else if(this.username.length<1){
        this.name_err_message = "昵称不能为空";
        return false;
      }else if(this.password.length<6){
        this.password_err_message = "密码不能小于6位";
        return false;
      }else{
        return true;
      }
    }
  },
  created(){
    
  },
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