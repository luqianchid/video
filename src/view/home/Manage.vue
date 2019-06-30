<template>
  <div class="manage">
    <side-bar></side-bar>
    <div class="side-content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manage'
}
</script>
<style scoped="scoped" lang="scss">
  .manage{
    width: 100%;
    height: 100%;
    display: flex;
    .side-content{
      flex:1;
      padding-left:20px;
      min-width: 1000px;
      margin-left:300px;
    }
  }
</style>
