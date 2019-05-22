/**
 *   @Project:   第三方文章相关的管理后台
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/16 17:07
 *   @Note:      paramOjb对象：
 *               1）params {Object} 请求参数
 *               2）success {Function} 成功回调
 *               3）error {Function} 失败回调
 */

import { requestGet, requestPost } from '../request';

const apiAddress = {
  list: '/api/admin/third_news/list',
  update: '/api/admin/third_news/update_status',
  show: '/api/admin/third_news/show',
  delete: '/api/admin/third_news/delete',
};

/**
 * 第三方文章列表
 * @param paramObj {Object} 参数对象，详细可见底部注释
 * @return {Promise<any>}
 */
export function getAdminThirdNewsList (paramObj) {
  return requestGet(apiAddress.list, paramObj);
}

// 第三方文章状态更改
export function postAdminThirdNewsUpdateStatus (paramObj) {
  return requestPost(apiAddress.update, paramObj);
}

// 第三方文章预览
export function getAdminThirdNewsShow (paramObj) {
  return requestGet(apiAddress.show, paramObj);
}

// 第三方文章删除
export function getAdminThirdNewsDelete (paramObj) {
  return requestGet(apiAddress.delete, paramObj);
}
