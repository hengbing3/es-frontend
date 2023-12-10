/*
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-11-29 23:26:34
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2023-12-10 18:26:40
 * @FilePath: \es-frontend\src\plugins\myAxios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 60000,
  headers: { "X-Custom-Header": "foobar" },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data;
    if (data.code === 200) {
      return data.data;
    }
    console.error("request error", data);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default instance;
