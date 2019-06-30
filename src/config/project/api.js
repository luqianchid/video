import Vue from 'vue'

const apiArr = {
  'login': 'login/authenticate', // 登陆接口 post
  'profile': 'profile/getUserProfiles.json',
  'movies': 'dash/listMovies.json', // 电影列表
  'files': 'file.json', // 上传文件表格
  'current': 'user/current.json', // 用户表单
  'continue': 'dash/listContinueWatching.json', // 继续观看列表
  'detail': 'movie/show.json', // 文件详情
  'player': 'video/show.json', // 播放界面
  'user': 'user.json', // 用户信息
  'report': 'report.json', // 报告信息
  'highlight': 'notificationQueue/listNewReleases.json', // 推荐板
  'delhigh': 'notificationQueue/delete.json', // 删除高光板
  'searchMedia': 'dash/searchMedia.json', // 搜索media
  'gener': 'genericVideo.json', // generic
  'active/login': 'userActivity.json?max=10&offset=0&type=login', // 登陆活动
  'active/video': 'userActivity.json?max=10&offset=0&type=video' // 视频活动
}

const api = {
  apiPath: () => {
    let apiPath = ''
    if (Vue.config.productionTip) {
      apiPath = 'http://192.168.1.200:8080/'
    } else {
      apiPath = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/'
    }
    return apiPath
  },
  apiArr: apiArr
}

Vue.prototype.$api = api
