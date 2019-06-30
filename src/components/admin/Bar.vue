<template>
<div id="bar">
  <el-aside>
    <el-menu background-color="rgba(0, 0, 0, 0.15)" active-text-color="#fff" text-color="#fff" default-active="1" class="el-menu-vertical-demo">
      <router-link v-for="c in cateList" :to="c.path" :key="c.id">
        <el-menu-item
        :index="String(c.id)"
        background-color="rgb(31, 35, 37)"
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
  name: 'AdminBar',
  data () {
    return {
      cateList: [
        { id: 1, name: 'Settings', path: '/setting' },
        { id: 2, name: 'Users', path: '/users' },
        { id: 3, name: 'User Activity', path: '/useract' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
#bar{
  background-color: rgba(0, 0, 0, 0.15);
  width:300px;
  height:100%;
  position:fixed;
}
</style>
