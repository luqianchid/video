<template>
<div id="DiscoverShow">
  <h3>我的视频</h3>
  <div class="video-list">
    <div class="video-item"
      v-for="v in movieData"
      :key="v.id"
      >
      <div class="cover-url">
        <img class="video-cover" :src="v.poster_image_src"/>
      </div>
     <div class="mask" ref="mask">
        <div class="mask-title">{{v.title}}</div>
        <p class="mask-date">{{v.release_date}}</p>
        <router-link :to="{'path':'/player',query:{id:v.id}}"><i class="el-icon-caret-right"></i></router-link>
        <router-link :to="{'path':'/detail',query:{id:v.id}}"><i class="el-icon-info"></i></router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DiscoverShow',
  data () {
    return {
      movieData: []
    }
  },
  created () {
    this.getMovies()
  },
  methods: {
    getMovies () {
      var param = { sort: 'title', offset: '0', max: 30 }
      this.$ajax.get('movies', param).then(r => {
        let movieList = r.list
        for (var i = 0; i < movieList.length; i++) {
          movieList[i].poster_image_src = this.$server + movieList[i].poster_image_src
        }
        this.movieData = movieList
        console.log(this.movieData)
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
#DiscoverShow{
  width:100%;
}
</style>
