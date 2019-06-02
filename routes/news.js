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
    router.get('/',(req,res)=>{
        db.query(`SELECT * FROM news_table LIMIT 0,5`,(err,result)=>{
            if(err){
                res.status(500).send('database error').end()
            }else{
                console.log('data',result)
                res.render('index.art',{
                    path:'./news/news.art',
                    data:result
                })
            }
        })
       
    });
    router.post('/more',(req,res)=>{
        console.log(11111111111,req.body.number)
        db.query(`SELECT * FROM news_table LIMIT ${+req.body.number},5`,(err,result)=>{
            if(err){
                res.status(500).send('database error').end()
            }else{
                res.status(200).send({msg:'success',data:result})
            }
        })
       
    });
    return router;
}