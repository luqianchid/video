<template>
<div id="header">
  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="logo">
          <a href="#/dash"><img src="@/assets/img/logo.png" alt="videoshow"></a>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="grid-content bg-purple-light">
        <div class="navbar">
          <el-menu
            fixed
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="rgb(31,35,37)"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item  index="1" @click="routeto('dash')" v-show="user.isTrustedUser">Dashboard</el-menu-item>
            <el-menu-item  index="2" @click="routeto('manage')" v-show="user.isContentManager">Manage content</el-menu-item>
            <el-menu-item  index="3" @click="routeto('admin')" v-show="user.isAdmin">Admin</el-menu-item>
            <el-menu-item index="4">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff">
                  {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                <!-- 这里需要循环 -->
                  <el-dropdown-item :index='4-1' v-for="item in user.profiles" :key="item.id"><span><img src="@/assets/img/avatar.png" class="avatar"></span>{{item.profileName}}</el-dropdown-item>
                  <div class="divider"></div>
                  <el-dropdown-item index='4-2'><router-link to='/profile' class="href">manage profile</router-link></el-dropdown-item>
                  <div class="divider"></div>
                  <el-dropdown-item index='4-3'><router-link to='/help' class="href">HELP/FAQ</router-link></el-dropdown-item>
                  <el-dropdown-item index='4-4'><router-link to='/userset' class="href">usersetting</router-link></el-dropdown-item>
                  <div class="divider"></div>
                  <el-dropdown-item index='4-5' @click.native="logout">logout</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      user: [],
      cate: [
        { id: 1, cate: 'Dashboard', path: 'dash' },
        { id: 2, cate: 'Manage Content', path: 'manage' },
        { id: 3, cate: 'Admin', path: 'admin' }
      ]
    }
  },
  created () {
    this.getCurrent()
  },
  methods: {
    getCurrent () {
      this.$ajax.get('current').then(r => {
        this.user = r
        console.log(this.user)
      }).catch(r => {
        console.log(r)
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      localStorage.removeItem('ls.currentProfile')
      this.$utils.setCookie('JSESSIONID', null)
      this.$utils.setCookie('streama_remember_me', null)
      this.$router.push({ 'path': '/login' })
    },
    routeto (path) {
      this.$router.push({ name: path })
    }
  }
}
</script>

<style lang='scss' scoped>
#header{
  width:100%;
  height:60px;
  display: flex;
  background: rgb(31,35,37);
  // min-width: 1300px;
  position: fixed;
  z-index: 1;
  .el-row{
    width:100%;
  }
  .logo{
    width:300px;
    a{
      display: block;
      height:100%;
      img{
        width: 92px;
        height: 32px;
        padding-left: 15px;
        padding-top: 14px;
      }
    }
  }
  .navbar{
    flex:1;
    text-align: right;
    float: right;
    // min-width: 1000px;
    .el-menu{
      float: right;
      .el-dropdown-link{
        display: block;
        width:100%;
        height:100%;
      }
    }
  }
}
</style>
<style lang="scss">
.el-dropdown-menu{
  background: rgb(48,48,48)!important;
  border:none!important;
  .el-dropdown-menu__item{
    color:#ebebeb;
  }
  .el-dropdown-menu__item:hover {
    background-color: rgb(55,90,127)!important;
    color:#fff!important;
  }
  .popper__arrow{
    display:none;
  }
}

.divider {
  height: 1px;
  margin: 5px 0;
  overflow: hidden;
  background-color: #464545;
}
.avatar {
  outline: none;
  height: 30px;
  width: 30px;
  background: #0b74b2;
  margin-right: 5px;
}

</style>
