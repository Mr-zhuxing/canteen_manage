# vue-koa2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 引入vant 和 babel-plugin-import   
``` npm i vant -S  
    全局引入
    import Vant from 'vant'  
    import 'vant/lib/index.css'  
    Vue.use(Vant);  

    按需引入  
    npm i babel-plugin-import -D    
    // 在.babelrc 中添加配置  
    // 注意：webpack 1 无需设置 libraryDirectory  
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
import { Button } from 'vant';
```

## 编写时注意事项  
## 后端注意事项
1. 配置cors跨域时  
注意中间间的顺序，要在router.routes()前配置跨域，否则无效
2. 登录逻辑。跨域cookies 需要设置，  
解决方法：
1后端在配置跨域时要设置，ctx.set('Access-Control-Allow-Credentials', true);或使用koa-cors时设置credentials: true。但
要注意如果跨域允许是所有 * 时，是无法配置cookies的
2前端axios请求配置 withCredentials: true  
3只要设置了session 就会 在浏览器的 cookie中设置一个sessionid
3. cookie不能设置中文，需要转化为base64编码： new Buffer(JSON.stringify(ctx.session.userInfo)).toString('base64')  
  转化回来是：new Buffer(ctx.cookies.get('userInfo'),'base64').toString()  



## 前端注意事项  
1. router.beforeEach()是全局导航钩子，在进入路由前执行。(router.beforeEach()在app.vue的create()之前就会执行一次。所以刷新页面要注意)
2. 注意不要出现当前路由跳到当前路由的操作，会报错NavigationDuplicated:导航重复.
3. keep-alive 标签套在router-view上可以让该路由加载过后，下次进来就不重新访问服务器。(除非你再刷新页面)