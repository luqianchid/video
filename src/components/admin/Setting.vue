<template>
<div class="setting">
  <div class="cont-header">
    <h1>Settings</h1>
    <div class="right-btn">
      <el-button type="primary" @click="saveSetting">Save Settings</el-button>
    </div>
  </div>
  <div class="cont">
    <div class="input-group">
      <div class="input-item">
        <label>Upload Directory <span style="color:red">*</span></label>
        <div class="input-right">
          <el-input
            placeholder="Upload Directory"
            v-model="settings.uploadDir"
            clearable>
          ></el-input>
          <el-button :type="type" v-show="show">validate</el-button>
        </div>
      </div>
      <div class="input-intro">
        <p>
          This setting provides the application with your desired upload-path for all files.
          The default so far has been /data/streama. Remember:
          if you change this path, copy all the files
          (that were previously added) into the new directory.
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >TheMovieDB API key</label>
        <div class="input-right">
          <el-input
            placeholder="TheMovieDB API key"
            v-model="settings.ApiKey"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          API stands for Application Programming Interface.
          TheMovieDB's movie/TV show information database is accessible
          only by registering at themoviedb.org/account/signup and requesting
          an API-key. After you have sent a request form, you can see your
          API-key by going to the API section in your profile's settings in
          TheMovieDB. The API-key is required by this application to fetch
          all the nice Movie/Episode/Show data for y
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >TheMovieDB API language </label>
        <div class="input-right">
          <el-input
            v-model="settings.apiLanguage"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          Language support on TMDb is based on the language query parameter you send along with your API key. For example, you could type es-ES for getting responses in spanish. Be careful with your country, es-ES is not the same as es-MX. More information at en.wikipedia.org/wiki/IETF_language_tag
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Base URL<span style="color:red">*</span></label>
        <div class="input-right">
          <el-input
            placeholder="baseUrl"
            v-model="settings.baseUrl"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <a>reset default value</a>
        <p>
          The Base-URL is used for the link in the invitation-email.
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Second Directory </label>
        <div class="input-right">
          <el-input
            placeholder="Second Directory "
            v-model="settings.SecondDirectory"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          Enter one or more directories, split with |. Example: /data/streama|/mnt/streama. These directories are only used for reading previously uploaded files. This can be useful if you want to spread your video files over two or more directories, for instance by mounting a second or third drive and rsyncing everything ove
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Local Video Files</label>
        <div class="input-right">
          <el-input
            placeholder="Local Video Files"
            v-model="settings.LocalVideoFiles"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          If you already have a directory with your videos, put it here and you will be able to choose them when creating movies or TV shows
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Streama title <span style="color:red">*</span></label>
        <div class="input-right">
          <el-input
            placeholder="your app name"
            v-model="settings.webTitle"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          Change Name of Application
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Hidden Dash sections</label>
        <div class="input-right">
          <el-input
            placeholder="Hidden Dash sections"
            v-model="settings.hiddenDash"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          You can here add a comma-separted list of all the dash sections you would like to hide. To find out the name, check for vm.isDashSectionHidden('SECTION-NAME'). example value: "continue-watching,new-releases"
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label >Let user download video</label>
        <div class="input-right">
          <el-switch
            v-model="settings.downloadSwitch"
            active-color="#13ce66"
            inactive-color="#eee">
          </el-switch>
        </div>
      </div>
      <div class="input-intro">
        <p>
          When this value is set to true, the player-interface will get an additional download-button for all users. This will download the raw movie file.
        </p>
      </div>
    </div>
    <div class="input-group">
      <div class="input-item">
        <label>User Activity Rotation</label>
        <div class="input-right">
          <el-input
            placeholder=""
            v-model="settings.UserLimit"
            clearable>
          ></el-input>
        </div>
      </div>
      <div class="input-intro">
        <p>
          Input a number here. Limits the amount of stored User Activity entries in the database to the amount supplied here. If none is given, all records will be stored without deletion.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      data: [],
      settings: {
        uploadDir: '',
        ApiKey: '',
        apiLanguage: 'en',
        baseUrl: 'http://localhost:8080/',
        SecondDirectory: '',
        LocalVideoFiles: '',
        downloadSwitch: false,
        webTitle: '',
        hiddenDash: '',
        UserLimit: ''
      },
      type: '',
      show: false
    }
  },
  watch: {
    uploadDir (val) {
      this.type = 'success'
      this.show = true
      if (val === '') {
        this.show = false
      }
    }
  },
  methods: {
    saveSetting () {
      console.log(this.settings)
    }
  }
}
</script>

<style lang='scss' scoped>
.setting{
  width:100%;
  height:100%;
  padding: 20px;
  .cont-header{
    display:flex;
    height:80px;
    border-bottom: 1px solid rgba(255,255,255,.15);
    .right-btn{
      flex:1;
      text-align: right;
      line-height: 80px;
      padding-right:60px;
    }
  }
  .input-group {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,.15);
    padding-top: 20px;
    .input-item {
      width:100%;
      display: flex;
      padding: 10px 0 10px 0;
      label {
        width: 25%;
        color: #fff;
      }
      .input-right{
        display: flex;
        width:70%;
        padding-left:30px;
        padding-right: 30px;
        .el-input{
          width:70%;
        }
        .el-button{
          flex:1;
          margin-left:30px;
          text-align: center;
        }
      }
    }
    .input-intro {
        width: 49%;
        margin-left: 25%;
        padding-left: 30px;
        color: #fff;
        opacity: .7;
      }
  }
}
</style>
