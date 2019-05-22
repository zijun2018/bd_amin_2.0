/**
 *   @Project:   资讯文章管理后台api
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/5/17 19:57
 *   @Note:
 */

import { axios } from '../request-python';

const api = {
  user: '/news/zhanyebao',
  uploadImag: '/news/e_save_image',
  createNews: '/news/zhanyebao_create',
  newsDetail: '/news/zhanyebao_detail',
  editNews: '/news/zhanyebao_status_update'
};

export function getNewsList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  });
}

export function uploadImage (parameter) {
  return axios({
    url: api.uploadImag,
    method: 'post',
    data: parameter
  });
}

export function createNews (parameter) {
  return axios({
    url: api.createNews,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: parameter
  });
}

export function getNewsDetail (parameter) {
  return axios({
    url: api.newsDetail,
    method: 'get',
    params: parameter
  });
}

export function editNews (parameter) {
  return axios({
    url: api.editNews,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: parameter
  });
}
