import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.withCredentials = true

const This = Vue.prototype
const ApiPath = This.$api.apiPath()
const ApiArr = This.$api.apiArr

// 无域名下，浏览静态文件会报错：SecurityError : : The operation is insecure
// const TOKEN = localStorage[This.$projectEnName + '_token']

// 外置iframe中使用
localStorage.setItem('ApiPath', ApiPath)

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const ajax = {

  post: (Interface, requestData) => {
    if (Interface === 'login') {
      return Axios.post(ApiPath + ApiArr[Interface], requestData, {
        transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
          // requestData.token = TOKEN
          let ret = ''
          for (let it in requestData) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
          }
          ret = ret.slice(0, ret.length - 1)
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include',
        timeout: 3000
      })
    } else {
      return Axios.post(ApiPath + ApiArr[Interface], requestData, {
        transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
          // requestData.token = TOKEN
          let ret = ''
          for (let it in requestData) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
          }
          ret = ret.slice(0, ret.length - 1)
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          'profileId': JSON.parse(localStorage.getItem('ls.currentProfile')).id.toString()
        },
        credentials: 'include',
        timeout: 3000
      })
    }
  },

  get: (Interface, requestData) => {
    if (Interface === 'profile' || Interface === 'current') {
      // requestData.token = TOKEN
      return Axios.get(ApiPath + ApiArr[Interface], {
        params: requestData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        timeout: 3000
      })
    } else {
      return Axios.get(ApiPath + ApiArr[Interface], {
        params: requestData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'profileId': JSON.parse(localStorage.getItem('ls.currentProfile')).id
        },
        credentials: 'include',
        timeout: 3000
      })
    }
  },

  upload: (Interface, formData, config) => {
    // formData.append('token', TOKEN)
    return new Promise((resolve, reject) => {
      Axios.post(ApiPath + ApiArr[Interface], formData, config).then((res) => {
        if (res) {
          resolve(res)
        }
      }).catch((res) => {
        resolve(res)
      })
    })
  },

  blob: (Interface, requestData) => {
    if (requestData === undefined) {
      requestData = {}
    }
    let configOri = {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'blob'
    }
    // 这里取split是为了适应检测历史详情的title操作
    // requestData.token = TOKEN
    return Axios.get(ApiPath + ApiArr[Interface], configOri)
  }
}

Vue.prototype.$ajax = ajax

// This.$ajax = Axios
