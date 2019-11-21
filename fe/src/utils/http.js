import axios from 'axios'
import qs from 'querystring'

  // 拼接参数至url
const queryString = function(url, query) {
  let str = []
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
}

//console.log( process.env.NODE_ENV)
//判断环境提供baseURL，注意要与后台地址一致
let root = process.env.NODE_ENV === 'development'
  // 开发环境api接口
  ?
  `http://localhost:3001/api`
  // 生产环境api接口
  :
  ``;
// 引用axios，设置头文件
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function axiosWithoutAuth(method, url, params) {
  return axios({
    method: method,
    //拼接参数
    url: method === 'GET'|| method === 'DELETE' ? queryString(url,params) : url,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    baseURL: root,
    timeout: 3000,
    withCredentials: false
  })
}

function apiAxios(method, url, params) {
  const token = window.sessionStorage.getItem('token') 

  return axios({
    method: method,
    //拼接参数
    url: method === 'GET'|| method === 'DELETE' ? queryString(url,params) : url,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    baseURL: root,
    timeout: 3000,
    headers: { Authorization: `Bearer ${token}` }, // 鉴权校验
    withCredentials: false
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  getWithoutAuth: function(url, params) {
    return axiosWithoutAuth('GET', url, params)
  },
  postWithoutAuth: function(url, params) {
    return axiosWithoutAuth('POST', url, params)
  }
}




