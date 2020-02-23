module.exports = {
  origin: function (ctx) {
    // if(ctx.url === '/user/getSession'){
    //   return "http://localhost:8080";
    // }
    // return '*';
    return "http://localhost:8080";
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
//   ctx.set('Access-Control-Allow-Headers', 
//   'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//       ctx.body = 200;
//   } else {
//       await next();
//   }
// });
