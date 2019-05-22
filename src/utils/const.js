/**
 *   @Project:   定义并输出全局变量
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/15 19:41
 *   @Note:
 */

import { TEST_PYTHON_HOST, BUILD_PYTHON_HOST, TEST_HOST, BUILD_HOST } from '../axios/host';

const ENV = process.env.NODE_ENV; // 当前环境（development/production）

// 资讯文章上传图片地址
let pythonImgUploadUrl = '';
// 早盘观测文章上传图片地址(后台)
let adminImageUploadUrl = '';

if (ENV === 'development') {
  pythonImgUploadUrl = `${TEST_PYTHON_HOST}/news/e_save_image`;
  adminImageUploadUrl = `${TEST_HOST}/api/admin/morning_market/upload_pic`;
} else if (ENV === 'production') {
  pythonImgUploadUrl = `${BUILD_PYTHON_HOST}/news/e_save_image`;
  adminImageUploadUrl = `${BUILD_HOST}/api/admin/morning_market/upload_pic`;
} else {
  pythonImgUploadUrl = `${TEST_PYTHON_HOST}/news/e_save_image`;
  adminImageUploadUrl = `${TEST_HOST}/api/admin/morning_market/upload_pic`;
}
const PYTHON_IMG_UPLOAD_URL = pythonImgUploadUrl;
const ADMIN_IMAGE_UPLOAD_URL = adminImageUploadUrl;
export {
  PYTHON_IMG_UPLOAD_URL,
  ADMIN_IMAGE_UPLOAD_URL
};
