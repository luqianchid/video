<template>
  <div id="login">
    <div class="container">
      <div class="login-box">
        <img src="@/assets/img/logo.png" class="login-logo">
        <div class="login-inner">
          <el-input
            id="username"
            type="text"
            name = "username"
            v-model="username"
            palceholder="用户名"
            clearable
            >
          </el-input>
          <el-input
            id="password"
            palceholder="密码"
            type="password"
            name = "pwd"
            v-model="pwd"
            clearable
            >
          </el-input>
          <el-button @click="loginAct" type="primary">Login<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  watch: {
    username (val) {
      this.username = val.trim()
    },
    pwd (val) {
      this.pwd = val.trim()
    }
  },
  methods: {
    loginAct () {
      let data = { username: this.username, password: this.pwd, 'remember_me': 'on' }
      this.$ajax.post('login', data).then(r => {
        this.$router.push({ 'path': '/profile' })
      }).catch(r => {
        console.log(r)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login{
  width:100%;
  height:100%;
  .container{
    width:100%;
    height:100%;
    background: url('../assets/img/bg.jpg');
    background-size: cover;
    background-position: center;
    .login-box{
      padding: 0px;
      text-align: center;
      .login-logo{
        max-width: 350px;
        margin-top: 55px;
      }
      .login-inner{
        max-width: 540px;
        width: 100%;
        padding-bottom: 6px;
        margin: 60px auto;
        text-align: left;
        .el-input{
          margin-bottom: 15px;
          color: #000;
        }
        .el-button{
          float: right;
          height:40px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#login .el-input__inner{
  background-color: #fff!important;
  color: #000!important;
  height:40px;
  line-height: 40px;
}
</style>
