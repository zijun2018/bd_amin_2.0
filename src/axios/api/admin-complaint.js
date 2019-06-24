/**
 *   @Project:   投诉文章列表api
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/28 20:05
 *   @Note:      -
 */


import { requestGet, requestPost } from '../request';

const apiAddress = {
  newsList: '/api/admin/complaint/news_list',
  newsDetail: '/api/admin/complaint/list',
  show: '/api/admin/complaint/show',
  delete: '/api/admin/complaint/del',
};

/**
 * 投诉文章列表
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminComplaintNewsList (paramObj) {
  return requestGet(apiAddress.newsList, paramObj);
}

/**
 * 投诉详情列表
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminComplaintList (paramObj) {
  return requestGet(apiAddress.newsDetail, paramObj);
}

/**
 * 用户投诉详情预览
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminComplaintShow (paramObj) {
  return requestGet(apiAddress.show, paramObj);
}

/**
 * 用户投诉详情删除
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function postAdminComplaintDel (paramObj) {
  return requestPost(apiAddress.delete, paramObj);
}
