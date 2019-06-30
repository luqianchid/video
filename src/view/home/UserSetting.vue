<template>

<div class="user-set">
  <myheader />
  <div class="cont">
    <div class="cont-header">
      <div class="head-left">
        <h1>UserSetting</h1>
      </div>
      <el-button type="primary" @click="switchBox">切换</el-button>
    </div>
    <div class="cont-body">
        <transition name="userset" mode="out-in">
          <el-form :model="edituser" v-show="userbox">
            <el-form-item label="UserName">
              <el-input v-model="edituser.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="Full Name">
              <el-input v-model="edituser.fullName"></el-input>
            </el-form-item>
            <el-form-item label="Pause Video on Click">
              <el-switch v-model="edituser.clickPause"
                active-color="#13ce66"
                inactive-color="#eee"
                ></el-switch>
            </el-form-item>
            <el-form-item label="Amount of Videos on Dashboard">
              <el-input v-model="edituser.videoLimit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="saveUser">Save User</el-button>
            </el-form-item>
          </el-form>
        </transition>
         <transition name="changePwd" mode="out-in">
          <el-form :model="changePwd" v-show="pwdbox">
            <el-form-item label="Old Password">
              <el-input v-model="changePwd.oldPwd" disabled></el-input>
            </el-form-item>
            <el-form-item label="New Password">
              <el-input v-model="changePwd.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="repeat Password">
              <el-input v-model="changePwd.rePwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="savePwd">Save Password</el-button>
            </el-form-item>
          </el-form>
        </transition>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'userset',
  data () {
    return {
      user: [],
      userbox: true,
      pwdbox: false,
      toogle: '更改密码',
      edituser: {
        name: '',
        fullName: '',
        videoLimit: '30',
        clickPause: true
      },
      changePwd: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$ajax.get('user').then(r => {
        console.log(r)
      }).catch(r => {
        console.log(r)
      })
    },
    saveUser () {
      console.log(this.edituser)
    },
    switchBox () {
      this.userbox = !this.userbox
      this.pwdbox = !this.pwdbox
    }
  }
}
</script>

<style lang='scss' scoped>
.user-set{
  width:100%;
  height:100%;
}
.cont{
  width: 70%;
  height: 90%;
  padding-top: 60px;
  margin: 0 auto;
  .cont-header {
    margin: 10px auto;
    border-bottom: 1px solid rgba(255,255,255,.15);
    display: flex;
    line-height: 45px;
    h1{
      padding:10px;
    }
  }
  .el-form-item{
    display: flex;
    div {
      color:#fff;
    }
  }
}
.userset-enter-active, .userset-leave-active, .changePwd-enter-active, .changePwd-leave-active{
  transition: all .6s ease;
}
.userset-enter, .userset-leave-to{
  opacity: 1;
  transform: translateX(300px);
}
.changePwd-enter, .changePwd-leave-to {
  opacity: 1;
  transform: translateX(300px);
}
</style>
<style lang="scss">
.el-form-item__label{
  color:#fff!important;
  width:240px;
  text-align: left!important;
}
.el-form-item__content{
  flex: 1;
}
</style>
