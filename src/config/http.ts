/**
 * http请求全局配置
 */
export default {
  // proxyPath: process.env.NODE_ENV === 'development',   // 代理根路径, 用于开发环境跨域
  // validateStatus(status: number): boolean {            // 默认有效的状态码
  //     return status >= 200 && status < 500;
  // },
  // 请求拦截
  // beforeRequest(resolve: Function, reject: Function, options: Record<string, any>) {
  // },
  // 响应拦截
  afterResponse(resolve: Function, reject: Function, response: {data: object, status: number}, options: object) {
    const { data, status } = response;
    // 根据接口状态返回
    switch (status) {
      case 200: // 成功
        resolve(data);
        break;
      case 401: // 未授权
        reject(response);
        break;
      default: // 抛出异常
        reject(response);
        break;
    }
  },
  // 全局错误处理
  // onError(data:{config:any, request:any, response:any, message:any, stack:any}) {}
};

// 更多配置参考: https://www.npmjs.com/package/@easytool/http