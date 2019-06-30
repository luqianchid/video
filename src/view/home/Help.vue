<template>
<div class="help">
  <div id="sidebar">
    <el-aside>
      <el-menu background-color="rgba(0, 0, 0, 0.15)" text-color="#fff" default-active="1" class="el-menu-vertical-demo">
        <a v-for="q in qList" :href="q.path" :key="q.id">
          <el-menu-item
          :index="String(q.id)"
          >
            <span slot="title">{{q.id}}.{{ q.name }}</span>
          </el-menu-item>
        </a>
      </el-menu>
    </el-aside>
  </div>
  <div class="right-cont">
    <div class="cont-header">
      <h1>HELP/FAQ</h1>
    </div>
    <div class="question-item" v-for="item in qList" :key="item.id" :id="'q'+item.id">
      <h2> {{item.id}}.{{item.name}}</h2>
      <div class="question-detail">
        {{item.intro}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      qList: [
        { id: 1, name: 'How can I upload a video?', path: '#q1', intro: 'You can upload videos by going to Manage Content menu. Choose if you want to upload a Movie, TV show or Other video. Click the relevant sub-menu option on the vertical navigation bar on the left side of the screen. You can upload a video by clicking the Create New Movie/TV Show/Other Video button or by typing the name of the video you want to upload to the search bar and selecting the relevant movie from search results. After that, you can choose to fill in the videos information either manually or loading its information from TheMovieDB. After that, you can upload the video and subtitle files by clicking Manage Files button.' },
        { id: 2, name: 'How can I delete a video?', path: '#q2', intro: 'You can delete a video by going to the videos information page and clicking Manage Files and selecting the red trash can icon. Clicking Edit Movie and selecting Delete Movie is another way to do it. You can also use the File Manager which is in the Manage Content menu. You can see all the files you have uploaded there. Click the red trash can icon to delete a file' },
        { id: 3, name: 'Which video formats are supported?', path: '#q3', intro: 'Streama supports currently only the video file formats supported by HTML5 player. You can test if your video file is HTML5 player compatible by dragging and dropping your file to an empty tab on your browser.' },
        { id: 4, name: 'How can I add subtitles to videos?', path: '#q4', intro: 'You can add subtitles to videos by clicking Manage Files button which is in the videos information page. You can drag and drop subtitle files there. Previously you had to manually convert them into a compatible file format, but not anymore! Now the application handles that for you.' },
        { id: 5, name: 'How can I invite friends to watch my hosted videos?', path: '#q5', intro: 'You can share your videos with your friends by inviting them to use your hosted Streama. Go to the Users menu and click Invite User button. Fill in the invite form and select the invitees role(s). Users with the role Admin can edit Users & Settings. Users with the role Content Manager can edit content. Your friend will be notified about the invitation via email. You can also share video sessions with your friends by clicking the video players Share button and linking the session URL to them.' },
        { id: 6, name: 'Whats the base URL and how should I configure it?', path: '#q6', intro: 'The Base-URL is used for the videos and the link in the invitation-email.' },
        { id: 7, name: 'What are notifications?', path: '#q7', intro: 'You can notify your invited friends about uploaded videos by sending them notification messages. You can send them by adding them your notification queue by clicking Add Notification button which is in your videos information page and going to the Notifications menu and clicking Send Queue button.' },
        { id: 8, name: 'Does the video player have shortcut keys?', path: '#q8', intro: 'Yes. Pause/unpause: space. Manage volume: arrow keys up or down. Skip video forward/backward: arrow keys left or right. Long skip: control + arrow keys left or right. Fullscreen on/off: alt + enter. Subtitles on/off: S, Mute: M, Return to previous screen: delete or backspace.' },
        { id: 9, name: 'How do users favorite genres affect Streama?', path: '#q9', intro: 'Coming soon...' },
        { id: 10, name: 'Useful links', path: '#q10', intro: 'Coming soon...' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.help{
  display: flex;
  height:100%;
  width:100%;
  .right-cont{
    flex:1;
    padding-left:20px;
    padding-right:30px;
    min-width: 1000px;
    margin-left:300px;
    .cont-header{
      width:100%;
      height:70px;
      border-bottom:1px solid rgba(255,255,255,.15);
      h1{
        padding-top:13px;
      }
    }
    .question-item {
      padding-top: 40px;
      color: #fff;
      padding-bottom:90px;
      h2{
        padding-top:20px;
        font-size:32px;
        font-weight: normal;
      }
      .question-detail{
        padding-top:30px;
        font-size:15px;
        font-family: "Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
      }
    }
  }
}
</style>
