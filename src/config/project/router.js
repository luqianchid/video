import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import Home from '@/view/Home'
import Profile from '@/view/Profiles'
// home
import Admin from '@/view/home/Admin'
import Userset from '@/view/home/UserSetting'
import Dash from '@/view/home/Dash'
import Player from '@/view/home/Player'
import Manage from '@/view/home/Manage'
import Help from '@/view/home/Help'
// manage
import Videos from '@/components/manage/Video'
import OtherVideo from '@/components/manage/OtherVideo'
import Report from '@/components/manage/Report'
import Fmanage from '@/components/manage/FileManage'
import Detail from '@/components/manage/Detail'
import Sdetail from '@/components/manage/Showdetail'
import Tvshow from '@/components/manage/Tvshow'
import HighLight from '@/components/manage/HighLight'
import Notify from '@/components/manage/Notify'
// admin
import Setting from '@/components/admin/Setting'
import Users from '@/components/admin/User'
import UserAct from '@/components/admin/UserActive'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: '/dash',
      children: [
        {
          path: '/dash',
          name: 'dash',
          component: Dash,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/player',
          name: 'player',
          component: Player
        },
        {
          path: '/manage',
          name: 'manage',
          redirect: '/videos',
          component: Manage,
          children: [
            {
              path: '/tv',
              name: 'tv',
              component: Tvshow
            },
            {
              path: '/show-detail',
              name: 'sdetail',
              component: Sdetail
            },
            {
              path: '/videos',
              name: 'video',
              component: Videos
            },
            {
              path: '/other',
              name: 'other',
              component: OtherVideo
            },
            {
              path: '/detail',
              name: 'detail',
              component: Detail
            },
            {
              path: '/notify',
              name: 'notify',
              component: Notify
            },
            {
              path: '/highlight',
              name: 'highlight',
              component: HighLight
            },
            {
              path: '/fmanage',
              name: 'fmanage',
              component: Fmanage
            },
            {
              path: '/report',
              name: 'report',
              component: Report
            }
          ]
        },
        {
          path: '/help',
          name: 'help',
          component: Help
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          redirect: '/setting',
          children: [
            {
              path: '/setting',
              name: 'setting',
              component: Setting
            },
            {
              path: '/users',
              name: 'users',
              component: Users
            },
            {
              path: '/useract',
              name: 'useract',
              component: UserAct
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/userset',
      name: 'userset',
      component: Userset
    },
    {
      path: '*',
      redirect: '/dash'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let name = ''
  // if (to.name) {
  //   name = to.name.toLowerCase()
  // } else {
  //   name = ''
  // }

  // 配合着api中拦截处理
  // let _deviceId = localStorage.gtd_token
  // if (_deviceId === undefined || _deviceId === '') {
  //   if (name === 'login') {
  //     next()
  //   } else {
  //     next({name: 'Login'})
  //     return
  //   }
  // }
  next()
})

export default router
