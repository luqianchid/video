import Vue from 'vue'

// 组件列表
import MyHeader from '@/components/MyHeader'
import ContinueWatch from '@/components/ContinueWatch'
import DiscoverShow from '@/components/DiscoverShow'
import SideBar from '@/components/manage/SideBar'
import AdminBar from '@/components/admin/Bar'
import showDialog from '@/components/ShowsDialog'
Vue.component('SideBar', SideBar)
Vue.component('myheader', MyHeader)
Vue.component('ContinueWatch', ContinueWatch)
Vue.component('DiscoverShow', DiscoverShow)
Vue.component('Adminbar', AdminBar)
Vue.component('showDialog', showDialog)
