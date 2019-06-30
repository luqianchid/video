import Vue from 'vue'

// 样式
import '@/assets/css/reset.css'
import '@/assets/css/theme.scss'
import '@/assets/css/common.scss'

// 图片引入
import favicon from '@/assets/img/cloud.png'
import cover from '@/assets/img/covers/cover.png'
import avatar from '@/assets/img/avatar.png'
Vue.prototype.$img = {
  cover: cover,
  avatar: avatar
}
document.querySelector('#web-icon').href = favicon

// 项目的中英文名字
Vue.prototype.$projectEnName = 'videoShow'
Vue.prototype.$projectCnName = document.title = '视频展示'
