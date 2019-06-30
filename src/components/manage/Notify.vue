<template>
<div class="notify">
  <div class="notify-header">
    <h1>Notification Queue</h1>
    <div class="notify-btn">
      <el-button type="text" @click="SendQueue">send current notification queue</el-button>
      <el-button type="text" @click="AddEmail = true">Add to Email-Notification</el-button>
      <el-dialog title="New Notification" width="40%" style="height:300px" top="30px" :visible.sync="AddEmail">
          <el-input v-model="searchVideo" palceholder="select Video/TV Show" @keyup.enter.native="loadVideo"></el-input>
          <ul class="search-list">
            <li class="item" v-for="item in videoList" :key="item.id">{{item.title}}</li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="AddEmail = false">Cancel</el-button>
            <el-button type="success" @click="saveNotify">save</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
  <div class="intro">This page can be used to send notifications about what you have uploaded to other users.
    Use the Add Notification button inside a Movie's or a TV Show's information page to add to this queue.
  </div>
  <div class="cont">
    <el-table
    ref="notify"
    :data="NotyList"
    :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
    >
      <el-table-column
        prop="time"
        label="DATE CREATED"
        ></el-table-column>
      <el-table-column
        prop="video"
        label="MOVIE/TV SHOW"
        ></el-table-column>
      <el-table-column
        prop="description"
        label="DESCRIPTION"
        ></el-table-column>
      <el-table-column
        label="IS COMPLETED"
      >
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="delRow(scope.row.id)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'highlight',
  data () {
    return {
      NotyList: [
        { id: 1, time: '2019/4/16 上午11:52:34', video: 'aqua man (2019)', description: 'aqua' },
        { id: 2, time: '2019/4/12 下午3:20:54', video: '灵能百分百 (2019)', description: '灵能' }
      ],
      videoList: [],
      state: '',
      AddEmail: false,
      searchVideo: '' // dialog搜索关键字
    }
  },
  watch: {
    searchVideo (val) {
      this.searchVideo = val
    }
  },
  methods: {
    SendQueue () {
      this.$confirm('Are you sure you want to send all of the open Notifications in the queue?', '提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'cancle',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'send success'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'you cancle send it'
        })
      })
    },
    loadVideo () {
      let query = { query: this.searchVideo }
      this.$ajax.get('searchMedia', query).then(r => {
        this.videoList = r.movies
        console.log(this.videoList)
      }).catch(r => {
        console.log(r)
      })
    },
    // querySearch (queryString, cb) {
    //   var videoList = this.videoList
    //   let videos = []
    //   videoList.forEach(item => {
    //     if (item.value.includes(queryString)) {
    //       videos.push({ value: item.value })
    //     }
    //   })
    //   cb(videos)
    // },
    handleSelect (item) {
      console.log(item)
    },
    delRow (id) {
      this.$confirm('you want to delete this item, are you sure?', '提示', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.NotyList.some((item, i) => {
          if (item.id === id) {
            this.NotyList.splice(i, 1)
            return true
          }
        })
        this.$message({
          type: 'info',
          message: 'you have delete one'
        })
      })
    },
    saveNotify () {
      let date = new Date().toLocaleString()
      let notify = { time: date, video: this.searchVideo, description: '' }
      this.NotyList.push(notify)
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
  .el-button{
    background-color: rgb(5,148,111);
    color:#fff;
    border:none;
    margin-right:30px;
  }
}
.cont{
  padding-right:20px;
}
</style>
