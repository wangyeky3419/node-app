//md5加密
const crypto = require('crypto');
module.exports = {
    //加上个随机的后缀，这样几乎不会被破解
    //注意，数据库里面存放的密码必须是经过相同的后缀加密的密码，否则识别不出来
    MD5_SUFFIX:'dsjfdjSJF&*%MKDK%K*!@NJKSKD',
    md5:function(str){
        var obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');//输出16进制结果
    }
}