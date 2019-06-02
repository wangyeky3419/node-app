/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : learn

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2019-06-02 20:34:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES ('1', 'Chris__wang', '107778b0e532e4038734d2e32828a280');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '标题',
  `description` varchar(300) NOT NULL COMMENT '描述',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES ('1', '王野234', '我是描', 'www.baidu.com');
INSERT INTO `banner_table` VALUES ('2', '王野2', '123', 'www.baidu.com123');
INSERT INTO `banner_table` VALUES ('5', '王4 ', '12344444', 'www.baidu.com123');

-- ----------------------------
-- Table structure for custom_evaluation_table
-- ----------------------------
DROP TABLE IF EXISTS `custom_evaluation_table`;
CREATE TABLE `custom_evaluation_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '标题',
  `description` varchar(200) NOT NULL COMMENT '评价详情',
  `src` varchar(300) NOT NULL COMMENT '用户头像',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom_evaluation_table
-- ----------------------------
INSERT INTO `custom_evaluation_table` VALUES ('1', '222', '222', '222');

-- ----------------------------
-- Table structure for news_table
-- ----------------------------
DROP TABLE IF EXISTS `news_table`;
CREATE TABLE `news_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `time` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '简介',
  `content` text NOT NULL COMMENT '内容',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news_table
-- ----------------------------
INSERT INTO `news_table` VALUES ('1', '今日头条举办“头条分之一”创作者沙龙,内容生态 “分子引力计划', '2019.03.23', '在今日头条，每一位创作者都在分享着自己的生活，或是各个领域的知识与见解。每一位创作者，都是“头条分之一”。5月25日，今日头条在北京后山艺术空间，举办了“头条分之一”创作者线下沙龙，为优秀的创作者们打造一场创作思想碰撞的饕餮盛宴。众多自媒体大咖、知名媒体、今日头条诸多垂类优秀创作者以及粉丝们齐聚现场，一起分享、交流与探讨。今日头条内容生态的“分子引力计划”同步启动。');
INSERT INTO `news_table` VALUES ('2', '今日头条母公司要造智能手机?官方回应:不予置评', '2019.03.02', '事实上，上述消息乍一听觉得很有可能，毕竟现在字节跳动拥有锤子科技Smartisan OS所有权，不过这个推出智能手机还是有差别，因为目前智能手机市场不但需要很多的资本，同时还要有相当硬的供应量关系支撑，很显然后者并不是字节跳动所擅长的。\r\n\r\n');
INSERT INTO `news_table` VALUES ('3', '联动全国十数家博物馆 今日头条发起“全民博物馆”主题系列活动', '2019.02.24', '在5月18日国际博物馆日，今日头条联合湖南省博物馆、河南博物院、重庆中国三峡博物馆、山西博物院、苏州博物馆、云南省博物馆、广东省博物馆、安徽博物院、宁夏博物馆、黑龙江省博物馆十大国家级博物馆发起#全民博物馆#话题活动；同时联合观复博物馆、清华大学艺术博物馆、中国紫檀博物馆发起“趣逛博物馆”线上、线下主题活动，吸引更多人走进博物馆，了解各地方博大精深的文化与文明，助力博物馆事业的社会宣传和推广。');
INSERT INTO `news_table` VALUES ('4', '外媒称今日头条母公司要自研手机 但真实性有待观察', '2019.02.23', '最早在今年1月22日，微博有网友爆料，据称锤子科技内部员工已经接到临时通知，要求改签劳动合同到今日头条的母公司“字节跳动”。\r\n\r\n而字节跳动表示：“字节跳动收购了锤子科技部分专利使用权，探索教育领域相关业务。因为具体交易涉及保密条款，不便披露。也有锤子员工入职公司，这是正常的人才流动。”');
INSERT INTO `news_table` VALUES ('5', '字节跳动收购了锤子科技部分专利使用权', '2019.02.21', '目前字节跳动旗下北京大眼星空科技有限公司已经拿下了锤子科技Smartisan OS所有权，这可以说是“字节跳动”做手机奠定了基础，不过对于张一鸣来说，进入智能手机的确需要慎重。');
INSERT INTO `news_table` VALUES ('6', '中科院23家院所入驻今日头条 线上+线下助力全民科普', '2019.02.21', '近日，今日头条发布消息称，第十五届“中国科学院公众科学日”期间，中国科学院下属中国科学院近代物理研究所、中国科学院大连化学物理研究所、中国科学院新疆生态与地理研究所、中国科学院西安光学精密机械研究研究所、中国科学院上海巴斯德研究所等23家科研机构院所集体入驻今日头条，通过线上线下相结合的方式助力全民科普。');
INSERT INTO `news_table` VALUES ('7', '瓜子二手车周家帅:大数据打造二手车用户的“今日头条”', '2019.02.12', '日前，第十届中国数据库技术大会（DTCC 2019）在北京召开，瓜子二手车高级平台研发专家周家帅受邀参加AI与大数据应用专场，并发表了题为《瓜子精细化运营平台的应用实践》的主题演讲。他在演讲中指出，借助大数据和人工智能技术的深入应用，瓜子二手车实现了对用户属性与偏好的深入研究，并在此基础上实现了瓜子平台的精细化运营：基于用户感兴趣的车型和个性化内容的推送，实现了用户活跃度的大幅提升，不同召回场景下点击率与转化率提升幅度最高能达到160%，打造了二手车领域的“今日头条”级智能应用。');
INSERT INTO `news_table` VALUES ('8', '公司成立', '2019.01.01', '恭喜公司成立');
INSERT INTO `news_table` VALUES ('9', '欢度新年', '2019.01.01', '祝大家过年好，恭喜发财');
INSERT INTO `news_table` VALUES ('10', '大家好', '2018.12.01', '欢迎欢迎');
INSERT INTO `news_table` VALUES ('11', '开篇', '2018.11.23', '大吉大利');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) NOT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES ('2', '10011', '李武', '地产', '包工头', '郑州');
INSERT INTO `user_table` VALUES ('3', '10012', '孔灰', '地产', '设计师', '湖北');
INSERT INTO `user_table` VALUES ('4', '10034', '张慧', '金融', '经理', '广东');
INSERT INTO `user_table` VALUES ('18', '1234', '孔颖', '33', '33', '33');
INSERT INTO `user_table` VALUES ('19', '10014', '王先森', '金融', '经理', '上海');
