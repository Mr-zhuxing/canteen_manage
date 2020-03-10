const BASEURL = "https://www.easy-mock.com/mock/5e22f83131e8b414fccb3120/vue-koa2/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getGoodsInfo : BASEURL + 'getGoodsInfo',
    getShoppingMallInfo : LOCALURL + 'getShoppingMallInfo',   
    getShoppingMallInfo2 : LOCALURL + 'goods/getShoppingMallInfo2',  
    registerUser : LOCALURL + 'user/register', //用户注册接口
    userLogin : LOCALURL + 'user/login',
    userLogout : LOCALURL + 'user/logout',
    usergetSession: LOCALURL + 'user/getSession',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
    mohuQuery:LOCALURL+'goods/mohuQuery',//模糊查询商品
    confirmBuy: LOCALURL+'order/confirmBuy',//确认购买
    getOrder: LOCALURL+'order/getOrder', // 获取订单数据
    test_ws: LOCALURL+'test/ws',
}


module.exports = URL