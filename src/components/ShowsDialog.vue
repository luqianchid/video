<template>
<div class="shows-dialog">
  <el-button type="primary" @click.native="openSeason = true">Add New Episode Manually</el-button>
  <el-dialog title="Episode" :visible.sync="openSeason">
    <el-form :model="seasonForm">
      <el-form-item label="名称">
        <el-input v-model="seasonForm.title"></el-input>
      </el-form-item>
      <div class="item-group">
        <el-form-item label="Episode Number">
          <el-input v-model="seasonForm.episodeNum"  placeholder="Episode Name"></el-input>
        </el-form-item>
        <el-form-item label="Season Number">
          <el-input v-model="seasonForm.SeasonNum"  placeholder="#"></el-input>
        </el-form-item>
        <el-form-item label="Episode String">
          <el-input v-model="seasonForm.EpisodeStr" placeholder="s##e##"></el-input>
        </el-form-item>
        <el-form-item label="First Aired">
          <el-input v-model="seasonForm.FirstAired" placeholder="yyy-mm-dd"></el-input>
        </el-form-item>
      </div>
      <div class="item-group">
        <el-form-item label="Intro Start">
          <el-input v-model="seasonForm.IntroStart" placeholder="0:0"></el-input>
        </el-form-item>
        <el-form-item label="Intro End">
          <el-input v-model="seasonForm.IntroEnd" placeholder="0:0"></el-input>
        </el-form-item>
        <el-form-item label="Outro Start">
          <el-input v-model="seasonForm.OutroStart" placeholder="0:0"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="overview">
        <el-input v-model="seasonForm.Overview" type="textarea" placeholder="overview"></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
    </el-form>
    <div class="el-dialog__footer">
      <el-button type="success">save</el-button>
    </div>
  </el-dialog>
  <div class="season">
    <div class="season-list">
      <div class="season-item">
        <span class="season-topic">season123</span>
        <div class="season-delete"><el-button type="danger" size="mini">delete</el-button></div>
        <div class="season-img">
          <img :src="$img.cover" alt="">
        </div>
        <div class="season-edit">
          <el-button type="primary" size="mini">edit</el-button>
          <el-button type="primary" size="mini">manage file</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'showdiglog', // Tvshow 界面dialog
  data () {
    return {
      openSeason: false, // 打开添加系列
      seasonForm: {
        title: '',
        episodeNum: '',
        SeasonNum: '',
        EpisodeStr: '',
        FirstAired: '',
        IntroStart: '',
        IntroEnd: '',
        OutroStart: '',
        Overview: ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.item-group{
  display:flex;
  .el-form-item{
    width:23%;
    margin-right:10px;
  }
}
.season-list {
  padding-top: 15px;
  .season-item {
    width: 200px;
    text-align: center;
    .season-topic {
      color: #fff;
      border: 1px solid #fff;
      border-radius: 20px;
      padding:5px;
    }
  }
}
</style>
