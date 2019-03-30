<template>
  <div class="container">
    <div class="row videos">
      <div
        v-for="item in videoList"
        class="col-xs-6 col-sm-6 col-md-4 col-lg-3 video-item"
        :key="item.index"
      >
      <router-link target="_blank" tag="a" :to="'/videoPlayer/av' + item.id ">
        <img :src="item.video_pic">
        <div>{{item.title}}</div>
        <div>{{item.video_duration}}</div>
        <div>作者：{{item.author}}</div>
        <div>访问量：{{item.hits}}</div>
        <div>{{item.video_date}}</div>
      </router-link>
      <!-- <router-link target="_blank" tag="a" :to="{path:'/videoPlayer',query:{av:'av'+item.id}}">
        <img :src="item.video_pic">
        <div>{{item.title}}</div>
        <div>{{item.video_duration}}</div>
        <div>作者：{{item.author}}</div>
        <div>访问量：{{item.hits}}</div>
        <div>{{item.video_date}}</div>
      </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoList: null,  //视频信息列表
    };
  },
  created() {
    let that = this;
    this.axios
    .get("/api/getvideoList")
    .then((res,error)=>{
      console.log(res);
      let videoListInfo = res.data;
      this.videoList = videoListInfo;
    })
  },
};
</script>

<style scoped lang="scss">
.videos {
  min-height: 500px;
  width: 100%;
  margin:0px;
  margin-top:20px;
}
.video-item {
  height: 15rem;
  margin-bottom:10px;
}
img{
  width: 10rem;
  height:auto;
}
</style>