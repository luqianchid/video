<template>
<div id="sidebar">
  <el-aside>
    <el-menu background-color="rgba(0, 0, 0, 0.15)" text-color="#fff" default-active="1" class="el-menu-vertical-demo">
      <router-link v-for="c in cateList" :to="c.path" :key="c.id">
        <el-menu-item
        :index="String(c.id)"
        >
          <span slot="title">{{ c.name }}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      cateList: [
        { id: 1, name: 'TV Shows', path: '/tv' },
        { id: 2, name: 'Movies', path: '/videos' },
        { id: 3, name: 'Other Videos', path: '/other' },
        { id: 4, name: 'File Manager', path: '/fmanage' },
        { id: 5, name: 'Notifications', path: '/notify' },
        { id: 6, name: 'Dashboard Highlights', path: '/highlight' },
        { id: 7, name: 'Reports', path: '/report' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
</style>
