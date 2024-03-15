import { API } from 'Constants/common';
import http from 'Utils/http';

/**
 * Home 私有接口
 */
// 通过 url 传参
export function getUser(id: number | string) {
  return http({
    url: `${API}/user/${id}`,
  });
}