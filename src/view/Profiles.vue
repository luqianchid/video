<template>
<div class="profiles">
  <myheader/>
  <div class="cont">
    <div class="pro-list">
      <div class="pro-tip">Who's Watching?</div>
      <div class="pro-box">
        <div class="pro-center">
          <div class="pro-item" v-for="item in profiles" :key = "item.id" @click="selectprofile(item.id)">
            <div class="pro-avatar">
              <img :src="$img.avatar" v-if="item.avatarColor === null" :style="{'background': '#'+item.standardColor}">
              <img :src="$img.avatar" v-else :style="{'background': '#'+item.avatarColor}">
            </div>
            <div class="pro-name">{{item.profileName}}</div>
          </div>
          <div class="pro-item">
            <div class="pro-add">
              <i class="el-icon-plus"></i>
            </div>
            <div class="pro-name">Add new Profile</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'profiles',
  data () {
    return {
      profiles: []
    }
  },
  created () {
    this.getUserProfiles()
  },
  methods: {
    getUserProfiles () {
      this.$ajax.get('profile').then(r => {
        this.profiles = r
        console.log(this.profiles)
      }).catch(r => {
        console.log(r)
      })
    },
    selectprofile (id) {
      this.profiles.forEach(item => {
        if (item.id === id) {
          localStorage.setItem('ls.currentProfile', JSON.stringify(item))
          this.$router.push({ 'path': '/dash' })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.profiles{
  width:100%;
  height:100%;
  .cont{
    width:100%;
    height:100%;
    padding-top:60px;
    .pro-list{
      width:50%;
      height:50%;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      text-align: center;
      .pro-tip{
        color:#fff;
        font-size:24px;
      }
      .pro-box{
        padding:10px;
        .pro-center{
          display: inline-flex;
          .pro-item{
            width:130px;
            height:160px;
            margin:0 5px;
            .pro-add{
              width:100%;
              height:130px;
              box-sizing: border-box;
              border:2px solid transparent;
              .el-icon-plus{
                color:#fff;
                font-size:24px;
                font-weight: bold;
                padding: 53px;
              }
            }
            .pro-avatar{
              box-sizing: border-box;
              border:2px solid transparent;
              img {
                width: 126px;
                height: 128px;
                background-color: #0b74b2;
              }
            }
            .pro-name{
              font-size:14px;
              color:#fff;
              padding:5px;
            }
          }
        }
      }
    }
  }
}
.pro-item:hover .pro-avatar, .pro-item:hover .pro-add{
  border:2px solid #fff!important;
  cursor: pointer;
}
</style>
