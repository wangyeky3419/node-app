const express = require('express');
const mysql = require('mysql');
var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'9527',
    database:'learn'
});
module.exports = function(){
    var router = express.Router();
    router.get('/get_users',(req,res)=>{
        db.query(`SELECT * FROM user_table`,(err,data)=>{
            if(err){
                res.status(500).send('database error').end()
            }else{
                res.send(data).end()
            }
        })
    });
    router.get('/',(req,res)=>{
        res.render('index.art',{
            path:'./user/user.art'
        })
    })
    //新增
    router.post('/userAdd',(req,res)=>{
        var b = req.body;
        db.query(`INSERT INTO user_table (name,code,industry,job,city) VALUES ('${b.name}','${b.code}','${b.industry}','${b.job}','${b.city}')`,(err,data)=>{
            if(err){
                res.status(500).send('数据库错误').end()
            }else{
                res.status(200).send({msg:'success'}).end()
            }
        })
    })
    //修改
    router.post('/userEdit',(req,res)=>{
        var b = req.body;
        db.query(`UPDATE user_table SET name='${b.name}',code='${b.code}',industry='${b.industry}',job='${b.job}',city='${b.city}' WHERE id='${b.id}'`,(err,data)=>{
            if(err){
                res.status(500).send('数据库错误').end();
            }else{
                res.status(200).send({msg:'success'}).end()
            }
        })
    })
    //删除
    router.post('/userDel',(req,res)=>{
        db.query(`DELETE FROM user_table WHERE id='${req.body.id}'`,(err,data)=>{
            if(err){
                res.status(500).send('数据库错误').end();
            }else{
                res.status(200).send({msg:'success'}).end()
            }
        })
    })
    return router;
}