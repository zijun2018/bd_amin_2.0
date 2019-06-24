/**
 *   @Project:   定义并输出全局变量
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/15 19:41
 *   @Note:
 */

// 资讯文章上传图片地址
const pythonImgUploadUrl = `${process.env.VUE_APP_BASE_PYTHON_URL}/news/e_save_image`;

// 早盘观测文章上传图片地址(后台)
const adminImageUploadUrl = `${process.env.VUE_APP_BASE_URL}/api/admin/morning_market/upload_pic`;

export const PYTHON_IMG_UPLOAD_URL = pythonImgUploadUrl;
export const ADMIN_IMAGE_UPLOAD_URL = adminImageUploadUrl;
