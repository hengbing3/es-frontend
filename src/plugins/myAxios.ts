/*
 * @Author: Christer hongweibing3@gmail.com
 * @Date: 2023-11-29 23:26:34
 * @LastEditors: Christer hongweibing3@gmail.com
 * @LastEditTime: 2023-11-29 23:29:14
 * @FilePath: \es-frontend\src\plugins\myAxios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
const instance = axios.create({
  baseURL: "https/localhost:8102/api",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
