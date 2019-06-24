/**
 *   @Project:   早盘文章管理后台api
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/17 19:57
 *   @Note:      paramOjb对象：
 *               1）params {Object} 请求参数
 *               2）success {Function} 成功回调
 *               3）error {Function} 失败回调
 */


import { requestGet, requestPost, postUpload } from '../request';

const apiAddress = {
  list: '/api/admin/morning_market/list',
  add: '/api/admin/morning_market/add',
  shelf: '/api/admin/morning_market/shelf',
  update: '/api/admin/morning_market/update',
  show: '/api/admin/morning_market/show',
  delete: '/api/admin/morning_market/del',
  uploadImg: '/api/admin/morning_market/upload_pic'
};

/**
 * 早盘观测列表
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminMorningMarketList (paramObj) {
  return requestGet(apiAddress.list, paramObj);
}

/**
 * 添加早盘观测
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminMorningMarketAdd(paramObj) {
  return requestPost(apiAddress.add, paramObj);
}

/**
 * 早盘观测内容更新
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminMorningMarketUpdate (paramObj) {
  return requestPost(apiAddress.update, paramObj);
}

/**
 * 早盘观测状态更改
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminMorningMarketShelf (paramObj) {
  return requestPost(apiAddress.shelf, paramObj);
}

/**
 * 早盘观测文章预览
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminMorningMarketShow (paramObj) {
  return requestGet(apiAddress.show, paramObj);
}

/**
 * 早盘观测文章删除
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminMorningMarketDel (paramObj) {
  return requestGet(apiAddress.delete, paramObj);
}

/**
 * 早盘观测文章上传图片
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminMorningMarketUploadPic (paramObj) {
  return postUpload(apiAddress.uploadImg, paramObj);
}
