/**
 * 封装http库, 便于替换为其他库
 */
import http from '@easytool/http';
import httpSettings from 'Config/http';

// 设置http请求的默认参数
http.defaults(httpSettings);

export * from '@easytool/http';
export default http;