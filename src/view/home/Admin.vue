<template>
<div class='admin'>
  <adminbar></adminbar>
  <div class="right-cont">
  <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'admin'
}
</script>

<style lang='scss' scoped>
.admin{
  display: flex;
  height:100%;
  width:100%;
  .right-cont{
    width:100%;
    height:100%;
    padding-left:20px;
    margin-left: 300px;
  }
}
</style>
