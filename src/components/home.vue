<template>
  <div class="home-page container">
    <!-- 内容头 -->
    <div class="news row">
      <div class="swipe col-sm-12 col-md-12 col-lg-8" ref="swipe">
        <el-carousel :interval="5000" arrow="always" :autoplay="false" :height="boxHeight">
          <el-carousel-item v-for="item in swipeInfo" :key="item.index">
            <!-- <div  class="swipe-img" :style=item.imgsrc ></div> -->
            <div class="img-center">
              <img :src="item.imgsrc" alt="swipe-img" class="swipe-img">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hot col-sm-12 col-md-12 col-lg-4">
        <div class="hot-title">
        <img src="../assets/icon/hot-post.png" alt>
          热门主题</div>
        <ul class="hot-list">
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
          <li>123456789</li>
        </ul>
      </div>
    </div>
    <!-- 内容头 -->
    <!-- 图像卡片 -->
    <div class="image-card-title row">
      <img src="../assets/icon/card.png" alt>
      插画
    </div>
    <ul class="image-card row">
      <li
        class="image-card-item col-xs-6 col-sm-6 col-md-4 col-lg-3"
        v-for="item in cardInfo"
        :key="item.index"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px',cursor:'pointer' }">
          <img :src="item.imgsrc" class="image">
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <span class="card-p">{{item.p}}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <!-- 图像卡片 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: false,
      boxHeight: "",
      currentDate: new Date(),
      swipeInfo: [
        {
          index: 0,
          imgsrc: require("../assets/img/swipe-img/0.jpg")
        },
        {
          index: 1,
          imgsrc: require("../assets/img/swipe-img/1.jpg")
        },
        {
          index: 2,
          imgsrc: require("../assets/img/swipe-img/2.jpg")
        },
        {
          index: 3,
          imgsrc: require("../assets/img/swipe-img/3.jpg")
        },
        {
          index: 4,
          imgsrc: require("../assets/img/swipe-img/4.jpg")
        }
      ],
      cardInfo: [
        {
          index: 0,
          imgsrc: require("../assets/img/card-img/0.png"),
          title: "月",
          p: "魔卡少女樱"
        },
        {
          index: 1,
          imgsrc: require("../assets/img/card-img/1.png"),
          title: "花",
          p: "魔卡少女樱"
        },
        {
          index: 2,
          imgsrc: require("../assets/img/card-img/2.png"),
          title: "火",
          p: "魔卡少女樱"
        },
        {
          index: 3,
          imgsrc: require("../assets/img/card-img/3.png"),
          title: "树",
          p: "魔卡少女樱"
        },
        {
          index: 4,
          imgsrc: require("../assets/img/card-img/4.png"),
          title: "风",
          p: "魔卡少女樱"
        },
        {
          index: 5,
          imgsrc: require("../assets/img/card-img/5.png"),
          title: "地",
          p: "魔卡少女樱"
        },
        {
          index: 6,
          imgsrc: require("../assets/img/card-img/6.png"),
          title: "水",
          p: "魔卡少女樱"
        },
        {
          index: 7,
          imgsrc: require("../assets/img/card-img/7.png"),
          title: "光",
          p: "魔卡少女樱"
        }
      ]
    };
  },
  mounted() {
    let that = this;
    changeheight();
    function changeheight() {//改变轮播图框大小
      let swipe = that.$refs.swipe;
      let height = $(swipe)[0].offsetHeight + "px";
      that.boxHeight = height;
    }
    window.onresize = changeheight;
  },
  destroyed(){
    window.onresize='';
  }
};
</script>

<style scoped lang="scss">
a {
  color: black;
  text-decoration: none;
}
.home-page {
  width: 100%;
  padding: 0px;
  .news {
    margin: 0px;
    margin-top: 0.5rem;
  }
  .image-card-title {
    margin: 0px;
    margin-top: 0.5rem;
    width: 100%;
    height: 2rem;
    // background-color: lightgreen;
    line-height: 2rem;
  }
}

.swipe {
  padding:0px;
  height: 30rem;
}
.swipe-img {
  width: 100%;
  height: 100%;
  // position: absolute;
  // top: 30%;
  // left: 50%;
  // transform: translate(-50%, -40%);
  text-align: center;
}
.hot {
  height: 30rem;
  padding:0px;
  background: linear-gradient(#3085e0,#104066,#001a2b);
}
.image-card {
  margin: 0px;
  list-style: none;
  padding: 0px;
}
.image-card-title > img {
  height: 2rem;
  width: 2rem;
  margin-left: 15px;
}
.image-card-item {
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.card-p {
  font-size: 8px;
  color: #999;
}
.hot-title {
  height: 10%;
  display: flex;
  align-items: center;
  padding-left:10px;
}
.hot-title>img{
  height: 2rem;
  width: 2rem;
  margin-right:0.5rem;
}
.hot-list {
  list-style: none;
  margin-bottom: 0px;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.hot-list > li {
  color:#61a2f2;
  display: flex;
  padding-left:10px;
  flex-grow: 1;
  align-items: center;
  //  border-top:1px solid #eee;
  // border-bottom:1px solid #eee;
}
.hot-list>li:hover{
  color:#00eeff;
  // background-color: #00eeff;
  // border-top:1px solid #00eeff;
  // border-bottom:1px solid #00eeff;

  cursor: pointer;
}
@media (max-width: 992px) {
  .news > .swipe {
    margin-bottom: 15px;
  }
}
@media (max-width: 768px) {
  .news > .swipe {
    height: 20rem;
    margin-bottom: 15px;
  }
  .news > .hot {
    height: 25rem;
  }
  .image-card-item {
    width: 50%;
    height: 100%;
  }
}
@media (max-width: 540px) {
  .news > .swipe {
    height: 15rem;
  }
  .news > .hot {
    height: 25rem;
  }
  .image-card-item {
    width: 50%;
    height: 100%;
  }
}

/*******************image-card area*******************/
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  display: block;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2);
}
/******************caed area*********************/
/*******************swipe area***************************/
.el-carousel__item h3 {
  // color: #475669;
  font-size: 18px;
  opacity: 0.75;
  // line-height: 300px;
  margin: 0;
}
.el-carousel {
  text-align: center;
  // border-radius: 6px;
}

.img-center {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}
/*******************swipe area***************************/
</style>