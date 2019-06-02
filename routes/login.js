const express = require('express');
const mysql = require('mysql');
const utils = require('../public/utils/md5.js')//引入md5
var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'9527',
    database:'learn'
});
module.exports = function(){
    var router = express.Router();
    //当请求方式为get的时候，约定为访问页面
    router.get('/',(req,res)=>{
        res.render('login/login.art',{});
    })
    //当请求方式为post的时候，约定为登录操作
    router.post('/',(req,res)=>{
        var username = req.body.userName;
        //将获取的密码转成md5加密形式，而且数据库存的也是加密后的，并且有后缀
        var password = utils.md5(req.body.password+utils.MD5_SUFFIX);
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
            if(err){
                res.status(500).send('服务器出错').end()
            }else{//成功
                if(data.length == 0){
                    res.status(400).send('该用户不存在').end()
                }else{//成功且有值
                    if(data[0].password == password){//对比的是md5后的值
                        //给session赋值
                        req.session['admin_id'] = data[0].ID;
                        //重定向到首页
                        res.redirect('/')
                    }else{
                        res.status(400).send('密码不正确')
                    }
                }
            }
        })
    })
    //注册register
    router.post('/register',(req,res)=>{
        var username = req.body.userName;
        //将获取的密码转成md5加密形式，而且数据库存的也是加密后的，并且有后缀
        var password = utils.md5(req.body.password+utils.MD5_SUFFIX);
       
    })
    return router;
}