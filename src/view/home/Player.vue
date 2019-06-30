<template>
  <div id="videoshow">
    <video id='show' v-for="item in show" :key='item.id' :src="item.src" controls="controls"></video>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      show: [],
      id: ''
    }
  },
  methods: {
    showMovies () {
      this.id = this.$route.query.id
      var param = { id: this.id }
      this.$ajax.get('player', param).then(r => {
        this.show = r.files
        for (var i = 0; i < this.show.length; i++) {
          this.show[i].src = this.$server + this.show[i].src
        }
        console.log(this.show)
      }).catch(r => {
        console.log(r)
      })
    }
  },
  created () {
    this.showMovies()
  }
}
</script>
<style scoped="scoped" lang="scss">
  #videoshow{
    width:100%;
    height:90%;
    #show{
      width:100%;
      height:100%;
    }
  }
</style>
