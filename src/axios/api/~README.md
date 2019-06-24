<!--
 * @Project: Do not edit
 * @Author: Zi_Jun
 * @Email: zijun2030@gmail.com
 * @Date: 2019-06-12 14:34:13
 * @LastEditTime: 2019-06-21 14:24:24
 * @LastEditors: Do not edit
 * @Note: Do not edit
 -->

# api目录

主要提供接口api,根据后台功能接口分类

+ admin-complaint.js : 投诉相关管理后台api
  + getAdminComplaintNewsList : 投诉文章列表
  + getAdminComplaintList : 投诉详情列表
  + getAdminComplaintShow : 用户投诉详情预览
  + postAdminComplaintDel : 用户投诉详情删除

+ admin-compound-news.js: 复盘文章管理后台api
  + getAdminCompoundList : 复盘观测列表
  + getAdminCompoundShow : 复盘观测文章预览
  + getAdminCompoundDel : 复盘观测文章删除

+ admin-early-news.js : 早盘文章管理后台api
  + getAdminMorningMarketList : 早盘观测列表
  + postAdminMorningMarketAdd : 添加早盘观测
  + postAdminMorningMarketUpdate : 早盘观测内容更新
  + postAdminMorningMarketShelf : 早盘观测状态更改
  + getAdminMorningMarketShow : 早盘观测文章预览
  + getAdminMorningMarketDel : 早盘观测文章删除
  + getAdminMorningMarketUploadPic : 早盘观测文章上传图片

+ admin-library-news.js : 资讯库文章管理后台api
  + getAdminNewsList : 资讯库文章列表
  + postAdminNewsDetail : 资讯库文章详情
  + postAdminNewsAdd : 资讯库文章添加
  + postAdminNewsUpdate : 资讯库文章修改
  + getAdminNewsDel : 资讯库文章删除
  + postAdminNewsUpdate : 资讯库文章上传图片

+ admin-third-news.js : 第三方文章相关的管理后台api
  + getAdminThirdNewsList : 第三方文章列表
  + postAdminThirdNewsUpdateStatus : 第三方文章状态更改
  + getAdminThirdNewsShow : 第三方文章预览
  + getAdminThirdNewsDelete : 第三方文章删除
