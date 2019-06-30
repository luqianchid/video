<template>
<div class="notify">
  <div class="notify-header">
    <h1>User Activity</h1>
  </div>
  <div class="intro">
    <h4>Filter</h4>
    <el-select v-model="option" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.filter"
        :value="item.filter">
      </el-option>
    </el-select>
  </div>
  <div class="cont">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="User Activity" name="user">
        <el-table
        :data="UserTable"
        :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
        >
          <el-table-column
            prop="username"
            label="USERNAME"
            ></el-table-column>
          <el-table-column
            prop="dateCreated"
            label="DATE CREATE"
            ></el-table-column>
          <el-table-column
            prop="device"
            label="DEVICE"
            ></el-table-column>
            <el-table-column
            prop="operatingSystem"
            label="OPERA SYSTEM"
            ></el-table-column>
            <el-table-column
            prop="browser"
            label="BROWER"
            ></el-table-column>
            <el-table-column
            prop="ipAddress"
            label="IP ADDRESS"
            ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Video Activity" name="video">
        <el-table
        :data="UserTable"
        :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
        >
          <el-table-column
            prop="username"
            label="USERNAME"
            ></el-table-column>
          <el-table-column
            prop="dateCreated"
            label="DATE CREATE"
            ></el-table-column>
          <el-table-column
            prop="device"
            label="DEVICE"
            ></el-table-column>
            <el-table-column
            prop="operatingSystem"
            label="OPERA SYSTEM"
            ></el-table-column>
            <el-table-column
            prop="browser"
            label="BROWER"
            ></el-table-column>
            <el-table-column
            prop="ipAddress"
            label="IP ADDRESS"
            ></el-table-column>
        </el-table>
      </el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>

<script>
export default {
  name: 'useract',
  data () {
    return {
      activeName: 'user',
      option: 'All-Users',
      options: [
        { id: 1, filter: 'All-Users' },
        { id: 2, filter: 'Admin' },
        { id: 3, filter: 'anonymous' }
      ],
      UserTable: [],
      videoTable: [
        //
      ]
    }
  },
  created () {
    this.getUserActive()
  },
  methods: {
    getUserActive () {
      this.$ajax.get('active/login').then(r => {
        this.UserTable = r.list
        this.UserTable.forEach(item => {
          item.dateCreated = item.dateCreated.split('T')[0]
        })
        console.log(this.UserTable)
      }).catch(r => {
        console.log(r)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.notify-btn {
  text-align: right;
  flex: 1;
  margin-right:15px;
  line-height: 45px;
  position: relative;
}
.intro h4{
  font-size:19px;
  font-weight: normal;
  margin-bottom: 10px;
}
.cont{
  padding-right:20px;
  .el-table{
    color:#fff;
  }
}
</style>
<style lang="scss">
#pane-user, #pane-video{
  padding:10px 10px 30px 10px;
  border:1px solid rgba(255,255,255,.15)
}
.el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid rgba(255,255,255,.15)!important;
}
.el-tabs__item .is-top .is-active {
  color: #00bc8c!important;
  background-color: #222222!important;
}
.el-tabs__header{
  margin:0!important;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background:rgb(34,34,34);
  border-bottom:none!important;
}
.el-tabs__item{
  color:#fff!important;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 1px solid rgba(255,255,255,.15)!important;
  border-bottom: none;
  border-radius: 3px 3px 0 0;
}
.el-input--suffix .el-input__inner {
  padding-right: 30px;
  height: 30px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border-left: 1px solid rgba(255,255,255,.15)!important;
}
</style>
