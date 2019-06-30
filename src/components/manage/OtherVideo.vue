<template>
<div class="videos">
  <div class="cont-header">
    <div class="head-left">
      <h1>Other Videos</h1>
      <div class="search">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="keywords"
          name = 'search'
        >
        </el-input>
      </div>
    </div>
    <div class="head-right">
      <el-button type="primary" @click="createNewVideo = true">创建新视频</el-button>
      <el-dialog title="Create New Genre" width="40%" top="30px" :visible.sync="createNewVideo">
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
              :action="upload"
              :show-file-list="false"
              accept="image/jpeg,image/jpg,image/png"
              :on-success="imageUploadSuccess"
              :before-upload="beforeUpload"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createNewVideo = false">取 消</el-button>
          <el-button type="primary" @click="saveVideo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <div class="cont-cont">
    <div class="video-list">
    <div class="video-item"
      v-for="v in searchOther(keywords)"
      :key="v.id"
      >
      <router-link :to="{name:'detail',query:{id:v.id}}">
        <div class="cover-url">
          <img class="video-cover" :src="v.poster_image_src"/>
        </div>
      <div class="mask" ref="mask">
        <div class="mask-title">{{v.title}}</div>
        <div v-if="v.hasFiles === false">
          <p>No video yet</p>
        </div>
        <p class="mask-date">{{v.release_date.split('-')[0]}}</p>
      </div>
      </router-link>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Files',
  data () {
    return {
      upload: 'https://jsonplaceholder.typicode.com/posts/',
      videoList: [],
      keywords: '',
      createNewVideo: false,
      options: [],
      tags: [],
      form: {
        name: '',
        date: '',
        overview: '',
        genre: '',
        tag: '',
        postImageUrl: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getOtherMovies()
  },
  watch: {
    keywords (val) {
      this.keywords = val
    }
  },
  methods: {
    getOtherMovies () {
      this.$ajax.get('movies').then(r => {
        let movieList = r.list
        for (var i = 0; i < movieList.length; i++) {
          movieList[i].poster_image_src = this.$server + movieList[i].poster_image_src
        }
        this.videoList = movieList
      }).catch(r => {
        console.log(r)
      })
    },
    searchOther (keywords) {
      let newlist = this.videoList.filter(item => {
        if (item.title.includes(keywords)) {
          return item
        }
      })
      return newlist
    },
    imageUploadSuccess (response) {
      const { data: { url } } = response.url
      this.form.postImageUrl = url
    },
    beforeUpload (file) {
      const imageSize = file.size / 1024 / 1024 < 1
      if (!imageSize) {
        this.$message.error('you cant upload img > 1M')
      }
      return imageSize
    },
    handleRemove () {
      this.form.postImageUrl = ''
    },
    saveVideo () {
      console.log(this.form)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
<style lang='scss'>
.el-dialog{
  background:rgb(62,67,70)!important;
  text-align: left!important;
  height:600px;
  overflow: auto;
  .el-dialog__header{
    height: 40px;
    .el-dialog__title{
      color:#fff;
      position: absolute;
    }
  }
  .el-dialog__body{
    padding: 0 10px;
  }
  div{
    color:#fff;
  }
  .el-textarea__inner{
    background-color: rgb(86,86,86);
    border:none;
    color:#fff;
  }
  .el-upload-dragger{
    background:  rgb(86,86,86);
    color:#fff;
    margin-left:180px;
  }
  .preview{
    width:170px;
    height:250px;
    overflow: hidden;
    position: absolute;
    background: #fff;
  }
}
</style>
