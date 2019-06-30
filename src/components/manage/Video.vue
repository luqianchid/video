<template>
<div class="videos">
  <div class="cont-header">
    <div class="head-left">
      <h1>Movies</h1>
      <div class="sort">
        <el-select v-model="sort" @change="getOtherMovies">
          <el-option
            v-for="item in sorts"
            :key="item.id"
            :label="item.sort"
            :value="item.sort">
          </el-option>
        </el-select>
      </div>
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
      <el-button type="primary" @click="createMovie = true">Create Movie</el-button>
        <el-dialog title="Create New Movie" width="40%" top="30px" :visible.sync="createMovie">
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
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="overview"
                v-model="form.overview"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="createMovie = false">Cancel</el-button>
            <el-button type="success" @click="saveMovie">Create Movie</el-button>
          </div>
        </el-dialog>
      <el-button type="primary" @click="creatMulitMovie = true">Bulk-Created from files</el-button>
        <el-dialog title="Bulk-Created from files" width="40%" height="auto" top="30px" :visible.sync="creatMulitMovie">
          <el-input v-model="searchFlies" prefix-icon="el-icon-search" placeholder="search files"></el-input>
           <el-table
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'rgba(0,0,0,.25)',color:'#fff',fontSize:'13px',display:'none'}"
            :data="files"
           >
           <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column
              prop="name"
              label="FILE NAME"
              >
            </el-table-column>
           </el-table>
           <el-pagination
            small
            layout="prev, pager, next"
            :total="files.length">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="creatMulitMovie = false">Cancel</el-button>
            <el-button type="success" @click="runMatch">Run Match</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
  <div class="cont-cont">
    <div class="video-list">
    <div class="video-item"
      v-for="v in searchMovie(keywords)"
      :key="v.id"
      >
      <router-link :to="{name:'detail',query:{id:v.id}}">
        <div class="cover-url">
          <img class="video-cover" :src="v.poster_image_src"/>
        </div>
      <div class="mask">
        <div class="mask-title">{{v.title}}</div>
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
  name: 'Videos',
  data () {
    return {
      sort: 'A-Z',
      sorts: [
        { id: 1, sort: 'A-Z' },
        { id: 2, sort: 'Z-A' },
        { id: 3, sort: 'Latest Release' },
        { id: 4, sort: 'Oldest Release' },
        { id: 5, sort: 'Most Recently Added' },
        { id: 6, sort: 'Frist Added' }
      ],
      multipleSelection: [], // 多选
      keywords: '', // TV_SHOW 搜索
      searchFlies: '',
      currentPage: 1, // 当前页
      videoList: [], // 视频列表
      createMovie: false, // 创建新视频dialog
      creatMulitMovie: false, // 批量创建
      mulitForm: {
        videos: []
      }, // 批量提交的数据
      files: [
        { id: 1, name: '1.mp4' },
        { id: 2, name: '2.mp4' },
        { id: 3, name: '3.mp4' },
        { id: 4, name: '4.mp4' }
      ], // 批量创建所需files列表
      form: {
        name: '',
        date: '',
        overview: ''
      } // 创建视频提交的数据
    }
  },
  mounted () {
    this.getOtherMovies()
  },
  watch: {
    keywords (val) {
      this.keywords = val
    }
  },
  methods: {
    getOtherMovies () {
      let querySort = {
        'A-Z': { menu: 'title', order: 'ASC' },
        'Z-A': { menu: 'title', order: 'DESC' },
        'Latest Release': { menu: 'release_date', order: 'DESC' },
        'Oldest Release': { menu: 'release_date', order: 'ASC' },
        'Most Recently Added': { menu: 'dateCreated', order: 'DESC' },
        'Frist Added': { menu: 'dateCreated', order: 'ASC' }
      }
      var param = {
        sort: querySort[this.sort].menu,
        order: querySort[this.sort].order,
        offset: '0',
        max: 30
      }
      this.$ajax.get('movies', param).then(r => {
        let movieList = r.list
        for (var i = 0; i < movieList.length; i++) {
          movieList[i].poster_image_src = this.$server + movieList[i].poster_image_src
        }
        this.videoList = movieList
        console.log(this.videoList)
      }).catch(r => {
        console.log(r)
      })
    },
    searchMovie (keywords) {
      let newlist = this.videoList.filter(item => {
        if (item.title.includes(keywords)) {
          return item
        }
      })
      return newlist
    },
    saveMovie () {
      console.log(this.form)
    },
    runMatch () {
      console.log(this.mulitForm.videos)
    },
    handleSelectionChange (val) {
      this.mulitForm.videos = val
    }
  }
}
</script>

<style lang='scss' scoped>
  .sort{
    width:180px;
    height:45px;
    line-height:45px;
    flex:1;
    padding-left:15px;
    .el-dropdown-link{
      color:#fff;
    }
  }
</style>
