import { HttpMethod } from 'Enums/common';
import { API } from 'Constants/common';
import http, { prepare } from 'Utils/http';

/**
 * 公共接口
 */
// 通过 post data 传参
export function addUser(user) {
  return http({
    url: `${API}/user`,
    method: HttpMethod.POST,
    data: {
      user,
    },
  });
}

// 文件下载
export function downloadFile(filename) {
  return http({
    url: `${API}/download/${filename}`,
    responseType: 'blob',                // IE10+
  });
}

// 返回一个预请求对象
export function uploadURL(user) {
  return prepare({
    url: `${API}/upload`,
    params: {
      user,
    },
  });
}

// 通过 url 传参
export function getUser(id) {
  return http({
    url: `${API}/user/${id}`,
  });
}

