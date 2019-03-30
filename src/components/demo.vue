<template>
  <div class="demo container">
    <div class="demo-row row">
      <div class="demo-list col-4">
        <ul class="demo-ul">
          <li class="demo-item">
            <a href="http://127.0.0.1:3001/demo/indexedDB.html" target="_blank">indexDB练习</a>
          </li>
          <li class="demo-item">
            <a href="http://127.0.0.1:3001/demo/baidu地图.html" target="_blank">百度地图的尝试</a>
          </li>
          <li class="demo-item">
            <a
              href="http://127.0.0.1:3001/demo/20180613响应式首页/index.html"
              target="_blank"
            >响应式页面的第一次尝试</a>
          </li>
          <li class="demo-item">
            <a
              href="http://127.0.0.1:3001/demo/20180428html+css练习/index.html"
              target="_blank"
            >html+css练习</a>
          </li>
          <li class="demo-item">
            <a
              href="http://127.0.0.1:3001/demo/20180513旅发首页html+css+js/index.html"
              target="_blank"
            >旅发首页html+css+js</a>
          </li>
          <li class="demo-item">
            <a href="http://127.0.0.1:3001/demo/amination.html" target="_blank">css实现3d效果</a>
          </li>
        </ul>
      </div>
      <div class="demo-show col-8">
        <!-- <img class="demoPic" src="http://127.0.0.1:3001/images/demoPic/indexDB.png" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {};
  },
  mounted() {
    $(".demo-item").on("mouseenter", function(e) {
      console.log("mouseenter");
      console.log();
    });
  }
};
</script>

<style scoped lang="scss">
.demo {
  width: 100%;
  padding: 0px;
  margin-top: 20px;
  // border-top: 1px solid #ddd;
  // border-bottom: 1px solid #ddd;
}
.demo-row {
  margin: 0px;
}
.demo-list {
  height: 500px;
  padding: 0px;
}
.demo-ul {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #ddd;
  // border-right:0px;
  border-radius: 10px 0px 0px 10px;
  margin: 0px;
}
.demo-item {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  padding-left: 10px;
}
.demo-item > a {
  color: black;
  text-decoration: none;
}
.demo-item:hover {
  cursor: pointer;
  border-color: #ddd;
}
.demo-item:hover a {
  color: #00eeff;
}

.demo-show {
  width: 100%;
  height: 500px;
  text-align: center;
  line-height: 500px;
  // background-color: lightblue;
  border: 1px solid #ddd;
  border-radius: 0px 10px 10px 0px;
  border-left: 0px;
  background-image: url("http://127.0.0.1:3001/images/demoPic/indexDB.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.demoPic {
  height: auto;
  width: 100%;
}
</style>