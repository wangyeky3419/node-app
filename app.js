var express = require('express');//express框架
var static = require('express-static')//接受一个参数，就是静态资源文件所在的目录,也就是文件读取
var bodyParser = require('body-parser');//能够解析数据类的post，但是对于文件上传类型的post不能解析，所以他有点不好
var multer = require('multer');//解析post文件
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
//创建一个multer对象，指明文件上传到哪个目录
const multerObj = multer({dest:'./static/upload'})
// var consolidate = require('consolidate');//----------------------
var atrTemplate = require('express-art-template')

const expressRoute = require('express-route');
var path = require('path');//解析文件路径
var favicon = require('serve-favicon');

var server = express();//创建服务
server.listen(8080);
var router = express.Router();
//1.获取前台请求数据
//get
server.use(bodyParser.urlencoded())//解析post数据的req.body数据，不然解析不出来会报错
server.use(multerObj.any())
//2. cookie session
server.use(cookieParser())
server.use(cookieParser());
(function(){
    //防止被污染变量，用一个函数包起来
    var keys = [];
    for(var i = 0; i < 10000; i++){
        keys[i]='a_'+Math.random()
    }
    server.use(cookieSession({
        name:'session_id',
        keys:keys,
        maxAge:20*60*1000//20min后过期
    }));
})()

server.use(express.static(__dirname+'/public/'))//将静态文件目录指定到public下
server.use(express.static(__dirname+'/template/'))//将每个页面的静态文件目录指定到template下

//======================模板================================
//将指定的art文件渲染成html(art)文件
server.engine('art',atrTemplate);
//模板文件放在哪，这里的views是固定写法，指定模板文件位置（这里是放在template里）
server.set('views','./template');
//输出什么东西，view engine(写法固定，意思是视图引擎)，这里设置的是输出html
server.set('view engine','html');
//======================route路由==========================
//创建route放在routes文件夹中  route必须用use   不能用get

server.use('/',require('./routes/index.js')())//当访问根目录的时候，跳转到routes/index.js文件里的route
// server.use('/login',require('./routes/web/login.js')())//当访问login目录的时候，跳转到web/login.js文件里的route里