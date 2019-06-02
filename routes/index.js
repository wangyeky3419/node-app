const express = require('express');
const urlLib = require('url');

module.exports = function(){
    var router = express.Router();
    //检查登录状态，如更没登录，跳转到登录状态
    router.use((req,res,next)=>{//没有登录
        if(req.url!='/favicon.ico'){
            var pattern = new RegExp("/", "g");
            var reqUrl = req.url.replace(pattern,'');
            reqUrl = '/'+reqUrl
            if(!req.session['admin_id']&&reqUrl!='/login'){
                //这里检查如果没有登录（没有admin_id）就会重定向到登录界面
                //当登录后，就会设置admin_id
                res.redirect('/login');//重定向
                //备注，重定向后还是会重新访问这里文件，这时候还会做判断，如果判断失败，走else
            }else{
                next()
            }
        }
    });
    router.get('/',(req,res)=>{
        res.render('index.art',{
            path:'./user/user.art'
        })
    })

    //当访问login，跳转到login路由，进行登录页面渲染
    router.use('/login',require('./login.js')());

    //当访问user,跳转到user路由，进行user.art渲染
    router.use('/user',require('./user.js')());
 
    //当访问news,跳转到news路由，进行news.art渲染
    router.use('/news',require('./news.js')());
   
    return router;
}