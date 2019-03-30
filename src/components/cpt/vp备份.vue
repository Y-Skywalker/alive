<template>
  <div class="videobox">
    <div class="videoaera">
      <video class="video" id="video"></video>
    </div>
    <div class="videobar">
      <div class="total_progress" id="total_progress">
        <div class="progress"></div>
        <div class="buffer-progress-bar"></div>
      </div>
      <div class="play icon-kaishi iconfont"></div>
      <div class="video_time">
        <span class="after_time">00:00:00</span>/
        <span class="total_time">00:00:00</span>
      </div>
      <div class="video_time"></div>
      <div class="video_horn iconfont icon-zuixiaoyinliang"></div>
      <input class="video_range" type="range" min="0" max="100" value="30">
      <div class="iconfont icon-quanping"></div>

      <!-- <div class="icon-houtui iconfont"></div>
      <div class="speed">
        X
        <span class="playspeed">1</span>
      </div>-->
      <!-- <div class="icon-qianjin iconfont"></div> -->
    </div>
    <button id="getbtn">getstart</button>
    <button id="stopbtn">getstop</button>
  </div>
</template>

<script>
import ST from "../../assets/js/superTool";

export default {
  name: "vp",
  data() {
    return {
      video_progress_D_value: 0, //当前播放位置和视频加载长度的差值
      videoInfo: {
        videoAV: null, //当前播放的视频的av号
        video_total_duration: 0, //mp4的总时长 （ms）   ok
        video_now: 0, //mp4当前播放位置  (ms)
        video_position: 0, //mp4当前播放位置比例 0%
        video_total_size: 0, //mp4的总大小（bit）     ok
        fmp4_size_list: null, //MP4的各部分size的列表  ok
        fmp4_sizelist_length: 0, //sizelist的总体长度
        fmp4_offset: 0, //mp4当前offset值
        video_loadedindex: 0 //视频缓冲段 0为第一段
      }
    };
  },
  methods: {
    con() {}
  },
  created() {},
  watch: {
    video_progress_D_value: function(newVal, oldVal) {
      if (newVal < 5) {
        // console.log("差值过小开始请求数据");
      }
    }
  },
  mounted() {
    let that = this;
    var time = null;

    getv();
    async function getv() {
      await getbaseInfo(that).then(res => {
        console.log(res.data);
        that.videoInfo.video_total_size = res.data.video_total_size;
        that.videoInfo.video_total_duration = res.data.video_total_duration;
        that.videoInfo.fmp4_size_list = JSON.parse(res.data.data);
      });
      await mse(that);
    }

    function getbaseInfo(that) {
      return new Promise((res, req) => {
        let av = that.$route.query.av; //从url获取当前播放的视频av号
        that.videoInfo.videoAV = av;
        //this.axios.get().....................开始查询基本信息并计算需要发起的请求次数
        that.axios
          .get("/api/getvideoInfo?av=" + that.videoInfo.videoAV)
          .then(response => {
            res(response);
          });
      });
    }
    var sourceBuffer;
    function mse(that) {
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      console.log(that.videoInfo.fmp4_size_list);
      console.log("*****************************");
      console.log(that.videoInfo.fmp4_size_list);
      console.log("*****************************");
      let av = that.videoInfo.videoAV;
      var video = $(".video")[0]; //dom
      let mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'; //mse
      let mediaSource = new MediaSource();
      video.src = URL.createObjectURL(mediaSource); //创建虚拟url
      console.log(
        MediaSource.isTypeSupported("video/mp4; codecs=“avc1.42E01E,mp4a.40.2”")
      );
      mediaSource.addEventListener("sourceopen", sourceOpen);
      mediaSource.addEventListener("sourceclose", sourceclose);
      function sourceclose() {
        console.log("onsourceclose");
      }

      function sourceOpen() {
        console.log("is open");
        var i = 0;
        var i_end = that.videoInfo.fmp4_size_list.length - 2; //190
        let mediaSource = this;
        var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        sourceBuffer.addEventListener("updateend", function(_) {
          if (i == i_end) {
            //如果获取数据已经结束，则关闭数据流，释放url
            console.log("获取数据已经结束，关闭数据流，释放url");
            mediaSource.endOfStream();
            URL.revokeObjectURL(video.src);
          }
          // } else {
          //   let cb = function(buf) {
          //     //否则就设定一个cb函数往里面加数据
          //     sourceBuffer.appendBuffer(buf);
          //   };
          // }
          if (i == 0) {
            console.log("video is play");
          }
        });
        // let listlength = that.videoInfo.fmp4_size_list.length - 1;
        function gettime() {
          getvideodata(function(buf) {
            sourceBuffer.appendBuffer(buf);
            setTimeout(() => {
              that.video_progress_D_value =
                video.buffered.end(0) - video.currentTime;
              updateBufferProgress(video);
            }, 100);
          }, gettime);
        }
        t();
        function t() {
          time = setInterval(gettime, 200);
        }
        // $(video).on("timeupdate", function() {
        //   //视频时间更新
        //   console.log("时间更新")
        //   progress.width((video.currentTime / video.duration) * 100 + "%");
        //   after_time.html(Time_calculation(video.currentTime));
        //   that.videoInfo.video_now = video.currentTime;
        //   that.video_progress_D_value =
        //     video.buffered.end(0) - video.currentTime;
        //   // if (that.video_progress_D_value < 5&&time) {
        //   //   console.log("差值过小开始请求数据");
        //   //   t();
        //   // } else if(time){
        //   //   console.log("清除获取数据");
        //   //   clearInterval(time);
        //   // }
        // });
        /***************************************** */

        var startbtn = document.getElementById("getbtn");
        var stopbtn = document.getElementById("stopbtn");
        startbtn.onclick = function() {
          t();
        };
        stopbtn.onclick = function() {
          clearInterval(time);
        };
        /***************************************** */
      }
      var start = 0;
      let list = that.videoInfo.fmp4_size_list;
      let readoffset = 0,
        readlength = 0;
      function getvideodata(cb, gettime) {
        function t() {
          time = setInterval(gettime, 1000);
        }
        if (start > list.length - 2) {
          console.log("停止读取");
          clearInterval(time);
        } else {
          // console.log("getvideo");
          console.log("请求已经发送");
          clearInterval(time);
          readoffset = list[start];
          readlength = list[start + 1] - readoffset;
          that.axios
            .get(
              "/api/getvideo?av=" +
                av +
                "&readoffset=" +
                readoffset +
                "&readlength=" +
                readlength,
              { responseType: "blob" }
            )
            .then(response => {
              console.log("数据已经完成");
              t();
              // console.log(start);
              // console.log(readoffset + " " + readlength);
              // console.log(response.status);
              if (response.status == 200) {
                ST.blobToArrayBuffer(response.data).then(res => {
                  cb(res);
                });
              }
            });
          ++start;
        }
      }
    }

    // function updateBufferProgress() {
    //   // console.log("进度条计算已开始 ");
    //   let bufferProgressBar = $(".buffer-progress-bar");
    //   let myvid = document.getElementById("video");
    //   console.log(myvid.duration);
    //   // console.log(
    //   //   "进度条时长"+ myvid.buffered.end(0)+"视频时间"+myvid.duration
    //   // );
    //   bufferProgressBar.width(
    //     (myvid.buffered.end(0) / myvid.duration) * 100 + "%"
    //   );
    // }
    // function changeIsLoadProgress() {
    //   let num = that.videoInfo.isload_size / that.videoInfo.video_total_size; //已经加载的数据占总量的比值
    //   // that.videoInfo.isload_percent = Number(num.toFixed(4));
    //   that.videoInfo.isload_percent = Number(num.toFixed(4));
    //   console.log(that.videoInfo.isload_size, that.videoInfo.video_total_size);
    //   $(".isloadprogress").width(that.videoInfo.isload_percent * 100 + "%");
    // }
    // getvideodata(); //刷新页面默认运行一次，之后随着视频进度来执行
    /********************以下为视频控制************************ */
    var playbtn = $(".play");
    var progress = $(".progress");
    var total_progress = $(".total_progress");
    var volume = $(".range")[0];
    var hornbtn = $(".video_horn");
    var video = $(".video")[0];
    var volume_range = $(".video_range")[0];
    var after_time = $(".after_time");
    var total_time = $(".total_time");
    var full_screen_btn = $(".icon-quanping");
    var fastplaybtn = $(".icon-qianjin");
    var slowplaybtn = $(".icon-houtui");
    var playspeed = $(".playspeed");

    var video_duration = 0;
    var range_val = 0;
    video.volume = 0.3;
    var video_total_time = 0;

    console.log(video);
    //**************************************************** */
    //**************************************************** */
    $(".video").on("mouseenter", function() {
      if (video.currentTime != 0) {
        $(".videobar").show();
      }
    });
    $(".videobar").on("mouseenter", function() {
      if (video.currentTime != 0) {
        $(".videobar").show();
      }
    });
    $(".videobar").on("mouseleave", function() {
      if (!video.paused) {
        $(".videobar").hide();
      }
    });
    $(".video").on("mouseleave", function() {
      if (!video.paused) {
        $(".videobar").hide();
      }
    });

    playbtn.on("click", function() {
      //播放&暂停
      console.log("is click");
      // console.log(video.paused);
      // console.log(video);
      if (video.paused == true) {
        video.play();
        // console.log("is play");
        playbtn.removeClass("icon-kaishi");
        playbtn.addClass("icon-zanting");
      } else if (video.paused == false) {
        video.pause();
        playbtn.removeClass("icon-zanting");
        playbtn.addClass("icon-kaishi");
      }
    });

    $(video).on("canplay", function() {
      //视频总体时间
      video_total_time = video.duration;
      // console.log(Time_calculation(video_total_time));
      total_time.html(Time_calculation(video_total_time));
    });

    function Time_calculation(time) {
      //时间计算函数
      // console.log(time);
      var time = time || 0;
      var h = parseInt(time / 3600);
      var m = parseInt((time % 3600) / 60);
      var s = parseInt(time % 60);
      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return h + ":" + m + ":" + s;
    }

    $(hornbtn).on("click", function() {
      //音量
      if (video.volume == 0) {
        hornbtn.removeClass("icon-guanbiyinliang");
        hornbtn.addClass("icon-zuixiaoyinliang");
        video.volume = 0.3;
        volume_range.value = 30;
      } else if (video.volume != 0) {
        hornbtn.removeClass("icon-zuixiaoyinliang");
        hornbtn.removeClass("icon-zengdayinliang");
        hornbtn.addClass("icon-guanbiyinliang");
        video.volume = 0;
        volume_range.value = 0;
      }
    });
    $(volume_range).on("change", function() {
      //音量
      range_val = this.value / 100;
      video.volume = range_val;
      if (range_val == 1) {
        hornbtn.removeClass("icon-guanbiyinliang");
        hornbtn.removeClass("icon-zuixiaoyinliang");
        hornbtn.addClass("icon-zengdayinliang");
      } else if (range_val == 0) {
        hornbtn.removeClass("icon-zengdayinliang");
        hornbtn.removeClass("icon-zuixiaoyinliang");
        hornbtn.addClass("icon-guanbiyinliang");
      } else {
        hornbtn.removeClass("icon-zengdayinliang");
        hornbtn.removeClass("icon-guanbiyinliang");
        hornbtn.addClass("icon-zuixiaoyinliang");
      }
    });
    full_screen_btn.on("click", function() {
      //全屏
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      }
    });
    var mouseX = 0,
      timePercent = 0,
      nowtime = 0;
    total_progress.on("mousedown", function(e) {
      //进度条控制
      mouseX = e.pageX - $(this).offset().left;
      timePercent = mouseX / $(this).width();
      nowtime = video.duration * timePercent;
      video.currentTime = nowtime.toFixed(4);
      progress.width((video.currentTime / video.duration) * 100 + "%");
      video.play();
      console.log(
        "鼠标点击位置" + ((video.currentTime / video.duration) * 100 + "%")
      );
      playbtn.addClass("video_stop");
      playbtn.removeClass("icon-kaishi");
      playbtn.addClass("icon-zanting");
    });
    /********************************************************************** */
    function getBufferProgressList(video) {
      //返回所有的缓冲条
      let i = video.buffered.length;
      let progressList = [];
      for (let x = 0; x < i; x++) {
        let progressItem = [];
        progressItem[0] = video.buffered.start(x);
        progressItem[1] = video.buffered.end(x);
        progressList.push(progressItem);
      }
      return progressList;
    }

    function renderBufferProgressBar(video, progressBar, progressList) {
      //渲染所有的缓冲条
      let progressBox = document.getElementById(progressBar); //大进度条盒子
      let progressBoxWidth = $(progressBox).width(); //大进度条盒子的宽度
      let start = 0,
        end = 0,
        progressOffset = 0,
        progressLength = 0,
        newProgressBar = null;
      progressList.forEach((item, index) => {
        start = item[0];
        end = item[1];
        progressOffset = (start / video.duration) * progressBoxWidth;
        progressLength = ((end - start) / video.duration) * progressBoxWidth;
        newProgressBar = $(".buffer-progress-bar")
          .first()
          .clone();
        newProgressBar.offset({ left: progressOffset });
        newProgressBar.width(progressLength + "px");
        $(progressBox).append(newProgressBar);
      });
    }
    function updateBufferProgress(video) {
      let BufferProgressList = getBufferProgressList(video);
      let progressBar = "total_progress";
      renderBufferProgressBar(video, progressBar, BufferProgressList);
    }
    /********************************************************************** */

    $(video).on("timeupdate", function() {
      //视频时间更新
      progress.width((video.currentTime / video.duration) * 100 + "%");
      after_time.html(Time_calculation(video.currentTime));
      that.videoInfo.video_now = video.currentTime;
      // that.video_progress_D_value = video.buffered.end(0) - video.currentTime;
      // updateBufferProgress();

      // console.log(video.currentTime);、
      /******************************************* */

      /******************************************* */
    });

    var speed = 1;
    fastplaybtn.on("click", function() {
      //视频速度
      if (speed < 4) {
        speed += 1;
        video.playbackRate = speed;
        playspeed.html(speed);
      }
    });
    slowplaybtn.on("click", function() {
      if (speed > 1) {
        speed -= 1;
        video.playbackRate = speed;
        playspeed.html(speed);
      }
    });
  }
};
</script>

<style scoped>
@import "../../assets/icon/fonticon3/iconfont.css";
@import "../../assets/icon/fonticon2/iconfont.css";
@import "../../assets/icon/fonticon/iconfont.css";

.videobox {
  position: relative;
  height: auto;
  width: 960px;
  /* margin: 10px auto; */
}
.videoaera {
  width: 100%;
  height: 100%;
}
.video {
  display: block;
  height: 100%;
  width: 100%;
}
.videobar {
  position: absolute;
  bottom: 0;
  z-index: 100;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  /* background-color: black; */
  /*background-color: rgba(0,0,0,0.5);*/
}
.total_progress {
  /*总进度条*/
  height: 6px;
  width: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  cursor: pointer;
}
.progress {
  /* 已播放进度条*/
  height: 100%;
  width: 0px;
  position: absolute;
  z-index: 10;
  background-color: red;
}
.buffer-progress-bar {
  height: 6px;
  width: 0px;
  left: 0px;
  position: absolute;
  z-index: 1;
  background-color: #fff;
}
.video_time {
  /*视频时间*/
  height: 20px;
  width: 160px;
  position: absolute;
  bottom: 6px;
  left: 50px;
  line-height: 20px;
  text-align: center;
  color: #fff;
}

input[type="range"] {
  /*滑轨*/
  -webkit-appearance: none; /*去除默认样式*/
  background-color: #666;
  border-radius: 15px;
  width: 100px;
  -webkit-appearance: none;
  height: 4px;
  padding: 0;
  border: none;
}
input[type="range"]::-webkit-slider-thumb {
  /*小滑块*/
  -webkit-appearance: none; /*去除默认样式*/
  cursor: pointer;
  top: 0;
  height: 15px;
  width: 15px;
  background: #ccc;
  border-radius: 15px;
  border: 6px solid #ccc;
}
.video_range {
  position: absolute;
  right: 50px;
  bottom: 15px;
  height: 5px;
  outline: none;
}
.speed {
  height: 24px;
  position: absolute;
  right: 85px;
  bottom: 4px;
}
</style>