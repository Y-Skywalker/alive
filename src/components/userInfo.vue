<template>
  <div class="container userinfo">
    <div class="row userinfo-pic"></div>
    <div class="row userinfo-board">
      <div class="col-4 col-sm-4 col-md-2 col-lg-2 userinfo-leftcol">
        <div class="userinfo-list-title">个人中心</div>
        <ul class="container userinfo-list">
          <li class="row userinfo-list-item userBaseInfo ischoose" @click="gotoBaseInfo">基本资料</li>
          <li class="row userinfo-list-item changeUserPhoto" @click="gotoChangeUserPhoto">更换头像</li>
          <li class="row userinfo-list-item">播放记录</li>
        </ul>
      </div>
      <div class="col-8 col-sm-8 col-md-10 col-lg-10 userinfo-rightcol">
        <div class="filling"></div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {};
  },
  watch: {},
  methods: {
    gotoBaseInfo() {
      this.$router.history.push(
        "/userInfo/" + JSON.parse(localStorage["__LOGIN__"]).userid
      );
    },
    gotoChangeUserPhoto() {
      this.$router.history.push(
        "/userInfo/" +
          JSON.parse(localStorage["__LOGIN__"]).userid +
          "/changeUserPhoto"
      );
    }
  },
  mounted() {
    $(".userinfo-list").on("click", ".userinfo-list-item", function(e) {
      $(e.target)
        .parent()
        .children()
        .removeClass("ischoose");
      $(e.target).addClass("ischoose");
    });

    $("." + this.$route.name)
      .parent()
      .children()
      .removeClass("ischoose");
    $("." + this.$route.name).addClass("ischoose");
  }
};
</script>

<style scoped lang="scss">
.userinfo-board {
  height: 800px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  border: 1px solid #ddd;
}
.userinfo-pic {
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-top: 20px;
}
.userinfo-leftcol {
  border-radius: 10px 0px 0px 10px;
  background-color: #eee;
}
.userinfo-leftcol,
.userinfo-rightcol {
  padding: 0px;
}
.userinfo-list {
  padding: 0px;
}
.userinfo-list-item {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  // border-top:1px solid #ccc;
  margin: 0px;
}
.userinfo-list-title {
  display: block;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 0px;
  border-bottom: 1px solid #ddd;
}
.userinfo-list-item:hover {
  cursor: pointer;
  background-color: rgba(143, 255, 255, 0.452);
}
.ischoose {
  color: white;
  background-color: #20a0ff;
}
.ischoose:hover {
  background-color: #20a0ff;
}
.filling {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
</style>