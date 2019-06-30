<template>
<div id="ContinueWatch">
  <h3>最近观看</h3>
  <div class="video-list">
    <div class="video-item"
      v-for="v in viewList"
      :key="v.id"
      >
      <router-link class="cover-url" :to="{name:'player',query:{id:v.video.id}}">
        <img class="video-cover" :src="v.video.poster_image_src"/>
      </router-link>
      <!-- 标题 -->
      <router-link class="video-title" :to="{name:'player',query:{id:v.video.id}}">{{ v.video.title }}</router-link>
      <!-- 进度条 -->
      <p class="lastpoint">上次观看到：{{ v.currentPlayTime }}秒</p>
      <el-progress :percentage="parseInt(v.currentPlayTime/v.runtime*100)"></el-progress>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ContinueWatch',
  data () {
    return {
      viewList: []
    }
  },
  created () {
    this.getRecentView()
  },
  methods: {
    getRecentView () {
      this.$ajax.get('continue').then(r => {
        let recnetList = r
        for (var i = 0; i < recnetList.length; i++) {
          recnetList[i].video.poster_image_src = this.$server + recnetList[i].video.poster_image_src
        }
        this.viewList = recnetList
      }).catch(r => {
        console.log(r)
      })
    },
    lookDetail (val) {
      this.$router.push({ 'path': '/palyer', query: { id: val } })
    }
  }
}
</script>

<style lang='scss' scoped>
#ContinueWatch{
  width:100%;
}
</style>
