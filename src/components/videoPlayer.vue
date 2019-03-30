<template>
  <div>
    <div class="video-part container">
      <div class="row video-row">
        <vp class="vp col-md-12"></vp>
      </div>
      <div class="row video-info">
        <div class="col">
          <div class="video-title">{{videoTitle}}</div>
          <div class="video-data">
            <div class="video-hits inline-block">{{videoHits}}播放 ·</div>
            <div class="video-date inline-block">{{videoDate}}</div>
          </div>
        </div>
        <div class="col">
          <div class="va">
            <div class="video-author-img">
              <img class="author-img" src="../assets/author.jpg" alt="author">
            </div>
            <div class="video-author">
              <router-link
                class="author-link video-author"
                target="_blank"
                :to="'/userInfo/' + videoAuthorId "
              >{{videoAuthor}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-part container">
      <comment></comment>
    </div>
  </div>
</template>

<script>
import vp from "./cpt/vp";
import comment from "./cpt/comment";
import ST from "../assets/js/superTool";
// var ST = require("../assets/js/superTool");
export default {
  data() {
    return {
      videoTitle: "【敖厂长】50年前美国小朋友玩什么？",
      videoDate: "2018-12-29 15:30:41", //发布时间
      videoHits: "100", //访问量
      videoAuthor: "敖厂长",
      videoAuthorId: 0
    };
  },
  components: {
    vp,
    comment
  },
  created() {
    // let videoAV = this.$route.query.av;
    let videoAV = this.$route.params.av;

    this.axios.get("/api/getvideoSqlInfo?av=" + videoAV).then(res => {
      // console.log(res);
      this.videoAuthor = res.data.video_info[0].author;
      this.videoTitle = res.data.video_info[0].title;
      this.videoHits = res.data.video_info[0].hits;
      this.videoDate = res.data.video_info[0].video_date;
      this.videoAuthorId = res.data.video_info[0].author_id;
    });
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.inline-block {
  display: inline-block;
}
.video-info {
  padding: 1rem;
}
.video-title {
  font: normal normal 1.2rem "微软雅黑";
  color: black;
}
.video-data {
  color: #999;
}
.video-hits {
  color: #999;
}
.vp {
  padding: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}
.va {
  position: absolute;
  right: 0px;
}
.video-author {
  color: rgb(253, 122, 161);
  float: right;
}
.video-author-img {
  float: right;
  height: 40px;
  width: 40px;
  margin-left: 1rem;
  background-color: #999;
}
.author-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.video-row {
  margin-top: 1rem;
}
.video-group {
  padding-right: 0px;
}
.group-list {
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}
.video-info {
  margin-top: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}
a {
  color: black;
  text-decoration: none;
}
.video-header {
  width: 100%;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
}
.nav {
  height: 100%;
  padding: 0px;
}
.wrapper-row {
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}
.user {
  height: 100%;
  padding: 0px;
  list-style: none;
  .user-icon {
    border-radius: 50%;
    //   background-color: red;
  }
}
.user > .wrapper-li {
  float: right;
}
.wrapper-icon {
  height: 2rem;
}
.wrapper-li {
  float: left;
  line-height: 3rem;
  cursor: pointer;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.wrapper-li:hover {
  background-color: rgb(223, 223, 223);
}
.comment-part {
  min-height: 500px;
  padding: 0;
  margin-top: 20px;
}
@media (max-width: 768px) {
  // .user {
  //   display: none;
  //   padding: 0px;
  // }
}
@media (min-width: 576px) {
  .wrapper-row {
    width: 540px;
  }
}
@media (min-width: 768px) {
  .wrapper-row {
    width: 720px;
  }
}

@media (min-width: 992px) {
  .wrapper-row {
    width: 960px;
  }
}
@media (min-width: 1200px) {
  .wrapper-row {
    width: 1140px;
  }
}
</style>