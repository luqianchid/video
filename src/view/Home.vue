<template>
  <div id="home">
    <myheader />
    <div class="margin-60">
    <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped="scoped" lang="scss">
  #home {
    background: none;
    .margin-60{
      padding-top: 60px;
      width: 100%;
      height: 100%;
    }
  }
</style>
