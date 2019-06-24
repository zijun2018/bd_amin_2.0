/**
 *   @Project:   复盘文章管理后台api
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/17 19:57
 *   @Note:
 */


import { requestGet } from '../request';

const apiAddress = {
  list: '/api/admin/compound/compound_list',
  show: '/api/admin/compound/compound_show',
  delete: '/api/admin/compound/compound_del',
};

/**
 * 复盘观测列表
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminCompoundList (paramObj) {
  return requestGet(apiAddress.list, paramObj);
}

/**
 * 复盘观测文章预览
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminCompoundShow (paramObj) {
  return requestGet(apiAddress.show, paramObj);
}

/**
 * 复盘观测文章删除
 * @param paramObj {Object} 参数对象
 * @return {Promise<any>}
 */
export function getAdminCompoundDel (paramObj) {
  return requestGet(apiAddress.delete, paramObj);
}
