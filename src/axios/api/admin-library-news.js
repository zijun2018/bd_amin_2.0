/**
 *   @Project:   资讯库文章后台管理api
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/6/12 14:49
 *   @Note:      paramOjb对象：
 *               1）params {Object} 请求参数
 *               2）success {Function} 成功回调
 *               3）error {Function} 失败回调
 */


import { requestGet, requestPost, postUpload } from '../request';

const apiAddress = {
  list: '/api/admin/news/list',
  detail: '/api/admin/news/detail',
  add: '/api/admin/news/add',
  shelf: '/api/admin/news/shelf',
  update: '/api/admin/news/update',
  delete: '/api/admin/news/del',
  uploadImg: '/api/admin/news/upload_pic'
};

/**
 * 资讯库文章列表
 * @param paramObj {Object} 参数对象，详细可见顶部注释
 * @return {Promise<any>}
 */
export function getAdminNewsList (paramObj) {
  return requestGet(apiAddress.list, paramObj);
}


/**
 * 资讯库文章详情
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminNewsDetail(paramObj) {
  return requestGet(apiAddress.detail, paramObj);
}

/**
 * 资讯库文章添加
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminNewsAdd (paramObj) {
  return requestPost(apiAddress.add, paramObj);
}

/**
 * 资讯库文章状态更改
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminNewsShelf (paramObj) {
  return requestPost(apiAddress.shelf, paramObj);
}

/**
 * 资讯库文章修改
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminNewsUpdate (paramObj) {
  return requestPost(apiAddress.update, paramObj);
}

/**
 * 资讯库文章删除
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminNewsDel (paramObj) {
  return requestGet(apiAddress.delete, paramObj);
}

/**
 * 资讯库文章上传图片
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminNewsUploadPic (paramObj) {
  return postUpload(apiAddress.uploadImg, paramObj);
}
