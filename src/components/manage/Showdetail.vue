<template>
<div class="detail">
  <!-- 一个小导航 -->
  <div class="nav-header"><h2 @click="goback">Tv-shows</h2>/<span>{{ this.show.title }}</span></div>
  <div class="detail-cont">
    <div class="detail-left">
      <div class="detail-title">
        <p class="">{{ this.show.title}}</p><i class="el-icon-caret-right" @click="goPlay()"></i>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-edit-outline"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editInfo = true">Edit Info</el-dropdown-item>
            <el-dialog title="Edit Info" :visible.sync="editInfo" :append-to-body="true">
              <el-form :model="form">
                <!-- 标题 -->
                <el-form-item>
                  <el-input v-model="form.name" placeholder="Video Name" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 日期 -->
                <el-form-item>
                  <div>Release Date</div>
                  <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <!-- overview -->
                <el-form-item>
                  <div>Overview</div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="overview"
                    v-model="form.overview"></el-input>
                </el-form-item>
                <el-form-item>
                  <div>Genre</div>
                  <el-select
                    v-model="form.genre"
                    clearable
                    filterable
                    allow-create
                    placeholder="select genre">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div>Tags</div>
                  <el-select
                    v-model="form.tag"
                    clearable
                    filterable
                    allow-create
                    placeholder="select tags">
                    <el-option
                      v-for="item in tags"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <div>上传封面</div>
                  <div class="preview">
                    <img width="100%" :src="form.postImgUrl">
                  </div>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="/upload"
                    :show-file-list="false"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editInfo = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
              </div>
            </el-dialog>
            <el-dropdown-item @click.native="manageFile = true">Manage Files</el-dropdown-item>
            <el-dialog id="manage-file" title="Manage File" :visible.sync="manageFile" :append-to-body="true">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="upload" name="first">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-tab-pane>
                <el-tab-pane label="external Url" name="second">
                  <el-input v-model="exterUrl"></el-input>
                  <el-button type="success" @click="saveUrl">Add exterUrl</el-button>
                </el-tab-pane>
                <el-tab-pane label="local file" name="third">
                  <br>
                  <el-input v-model="searchKey" placeholder="please search files"></el-input>
                  <br>
                  <ul class="search-box">
                    <li class="search-result" v-for="item in localFiles" :key="item.id"><p>{{item.name}}</p><el-button type="success" @click="choose(item.id)">choose</el-button></li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
              <el-table
                :data="localFiles"
                :header-cell-style="{background:'rgb(49,166,213)',color:'#fff',fontSize:'13px'}"
                >
                <el-table-column
                  prop="name"
                  label="NAME"
                  ></el-table-column>
                <el-table-column
                  prop="type"
                  label="TYPE"
                  ></el-table-column>
                <el-table-column
                  label="操作"
                  >
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deleteUp(scope.row.id)"><i class="el-icon-delete"></i></el-button>
                    <el-button size="mini" type="primary" @click="preview(scope.row.id)">preview</el-button>
                  </template>
                  </el-table-column>
              </el-table>
            </el-dialog>
            <el-dropdown-item @click.native="deleteMovie">Delete Movie</el-dropdown-item>
            <el-dropdown-item @click.native="addEmail">Add to Email-Notification</el-dropdown-item>
            <el-dropdown-item @click.native="addHighlight">Highlight on Dashboard</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="detail-info">
        <div class="detail-date">
          <label>发布日期
            <div class="date">{{ this.show.release_date }}</div>
          </label>
          <label>最后更新
            <div class="date">{{ this.show.lastUpdated }}</div>
          </label>
        </div>
      </div>
      <div class="detail-info">
        <div class="detail-date">
          <label>概览
            <div class="date">{{ this.show.overview }}</div>
          </label>
        </div>
      </div>
      <div class="detail-info">
         <label>类型
            <div class="date">{{ this.show.genre }}</div>
          </label>
      </div>
    </div>
    <div class="detail-right">
      <div class="post">
        <img :src="this.show.poster_image_src" :alt="this.show.title">
      </div>
    </div>
  </div>
  <div class="detail-bottom">
    <show-dialog/>
  </div>
</div>
</template>

<script>
export default {
  name: 'sdetail',
  data () {
    return {
      show: [],
      id: '',
      options: [], // 设置
      tags: [], // 标签
      form: {
        name: '',
        date: '',
        overview: '',
        genre: '',
        tag: '',
        postImageUrl: ''
      },
      activeName: 'first',
      editInfo: false,
      manageFile: false,
      exterUrl: '',
      searchKey: '',
      ChooseList: [],
      localFiles: [
        { id: 1, name: '2.mp4', type: 'mp4' },
        { id: 2, name: '3.mp4', type: 'mp4' },
        { id: 3, name: '33.mp4', type: 'mp4' },
        { id: 4, name: '12.mp4', type: 'mp4' },
        { id: 5, name: '123.mp4', type: 'mp4' }
      ]
    }
  },
  methods: {
    showDetail () {
      this.id = this.$route.query.id
      var param = { id: this.id }
      this.$ajax.get('detail', param).then(r => {
        this.show = r
        this.show.poster_image_src = this.$server + this.show.poster_image_src
        this.show.lastUpdated = this.show.lastUpdated.split('T')[0]
        this.show.files[0].src = this.$server + this.show.files[0].src
        if (this.show.genre.length === 0) {
          this.show.genre = '暂无'
        }
        console.log(this.show)
      }).catch(r => {
        console.log(r)
      })
      return this.show
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    deleteMovie () {
      this.$confirm('Are you sure delete this movie?', '提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$ajax.get('', {
          params: {
            id: this.show.id
          }
        }).then(r => {
          this.$router.push({ 'path': '/manage' })
        })
      })
    },
    addEmail () {
      this.$confirm('The movie was added to the current notification queue. Would you like to send it?', '提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        this.$ajax.get('', {
          params: {
            id: this.show.id
          }
        }).then(r => {
          // say hello
        })
      })
    },
    addHighlight () {
      this.$prompt('Please input your description', '提示', {
        confirmButtonText: 'save',
        cancelButtonText: 'cancle'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: 'you have add it to highlight board!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'you cancel it'
        })
      })
    },
    goPlay () {
      let vid = this.show.id
      this.$router.push({ name: 'player', query: { id: vid } })
    },
    goback () {
      this.$router.push({ name: 'manage' })
    },
    saveUrl () {
      console.log(this.saveUrl)
    },
    choose (id) {
      if (this.ChooseList.indexOf(id) === -1) {
        this.ChooseList.push(id)
      }
      console.log(this.ChooseList)
    }
  },
  created () {
    this.showDetail()
  }
  // created () {
  //   this.showDeatil()
  // }
}
</script>

<style lang='scss' scoped>
.detail{
    padding-bottom: 15px;
  .nav-header{
    height: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    line-height: 40px;
    font-size: 24px;
    color: #fff;
    background: #464545;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    margin-top: 20px;
    display: flex;
  }
  .detail-cont {
    display: flex;
    padding-top: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, .15);
    .detail-left {
      width: 60%;
      .detail-title {
        display: flex;
        p{
          font-size: 30px;
          color: #fff;
        }
        .el-dropdown{
          flex:1;
          text-align: right;
        }
        .el-icon-caret-right {
          font-size: 50px;
          background: #e8692a;
          border-radius: 50%;
          margin-left: 20px;
          cursor: pointer;
          color: #fff;
        }
        .el-icon-edit-outline {
          font-size: 30px;
          color: #fff;
          padding-top: 10px;
        }
      }
      .detail-info {
        padding-top: 20px;
        label{
          color:#fff;
          .date{
            opacity: .7;
          }
        }
      }
    }
    .detail-right{
      flex:1;
      .post{
        position: relative;
        top:50%;
        left:50%;
        width:170px;
        height:250px;
        background: #fff;
        transform: translate(-50%, -50%);
        overflow: hidden;
        img{
          width:100%;
        }
      }
    }
  }
  .detail-bottom{
    padding-top:30px;
  }
}
.search-box {
  border: 1px solid rgba(255,255,255,.1);
  .search-result {
    display: flex;
    padding:10px;
    line-height:40px;
    p{
      width:60%;
    }
  }
}
</style>
<style lang="scss">
.popper__arrow{
  display: none!important;
}
.el-upload--text{
  width:100%!important;
  .el-upload-dragger{
    margin-left:0;
    width:100%;
  }
}
.el-tabs__content {
  margin-bottom: 20px;
}
.el-input{
  margin-bottom:10px;
}
</style>
