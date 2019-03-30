<template>
  <div class="container-fluid">
    <div class="row login-header">
      <div class="container-fluid video-header">
        <div class="row wrapper-row">
          <ul class="nav col-4 col-md-6 col-lg-6">
            <li class="wrapper-li">
              <router-link class="rtlink" to="/">
                <img class="wrapper-icon" src="../../assets/icon/small-ship.png" alt>主站
              </router-link>
            </li>
          </ul>
          <ul class="user col-8 col-md-6 col-lg-6">
            <li class="wrapper-li loginRT">
              <router-link class="rtlink" to="/login">登录</router-link>
            </li>
            <li class="wrapper-li">
              <div class="user-icon-btn">
                <img class="user-icon" :src="userphotoURL" alt>
                <div class="select-list">
                  <ul class="select-ul">
                    <li class="select-li" @click="gotoUserinfo">个人中心</li>
                    <li class="select-li" @click="gotoChangePass">修改密码</li>
                    <li class="select-li" @click="gotoLogout">注销</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var qs = require("qs");

export default {
  inject: ["reload"],
  data() {
    return {
      userphotoURL: "http://127.0.0.1:3001/images/userphoto/nologin.png"
    };
  },
  methods: {
    // getuserphoto() {
    //   if (localStorage["__LOGIN__"]) {
    //     console.log(localStorage["__LOGIN__"]);
    //     return (
    //       "http://127.0.0.1:3001/images/userphoto/" +
    //       JSON.parse(localStorage["__LOGIN__"]).userPhoto
    //     );
    //   } else {
    //     return "http://127.0.0.1:3001/images/userphoto/nologin.png";
    //   }
    // },
    gotoUserinfo() {
      if (localStorage["__LOGIN__"]) {
        this.$router.history.push(
          "/userInfo/" + JSON.parse(localStorage["__LOGIN__"]).userid
        );
      } else {
        console.log("请登录");
      }
    },
    gotoChangePass() {
      if (localStorage["__LOGIN__"]) {
        this.$router.history.push("/changePass");
      } else {
        this.$router.history.push("/login");
      }
    },
    gotoLogout() {
      if (localStorage["__LOGIN__"]) {
        this.axios
          .get(
            "/api/logout?logoutName=" +
              JSON.parse(localStorage["__LOGIN__"]).username
          )
          .then(res => {
            if (res.data) {
              localStorage.removeItem("__LOGIN__");
              this.reload();
              this.$router.history.push("/login");
            }
          });
      } else {
        this.$router.history.push("/login");
      }
    },
    showLoginBtn() {
      if (localStorage["__LOGIN__"]) {
        $(".loginRT").hide();
      }
    },
    checklocalStorage() {
      if (localStorage["__LOGIN__"]) {
        return true;
      } else {
        return false;
      }
    },
    isStaty() {
      this.axios.get("/api/staty").then(res => {
        console.log(res);
        if (res.data) {
          //服务器已经登录
          console.log("服务器端已经登录");
          if (this.checklocalStorage()) {
            console.log("ls存在");
            this.userphotoURL =
              "http://127.0.0.1:3001/images/userPhoto/" +
              JSON.parse(localStorage["__LOGIN__"]).userPhoto;
          } else {
            console.log("ls不存在");
            localStorage["__LOGIN__"] = JSON.stringify(res.data);
            console.log("已更新ls");
            this.showLoginBtn();
            this.userphotoURL =
              "http://127.0.0.1:3001/images/userPhoto/" +
              JSON.parse(localStorage["__LOGIN__"]).userPhoto;
          }
        } else {
          console.log("服务器端未登录");
          if (this.checklocalStorage()) {
            let info = JSON.parse(localStorage["__LOGIN__"]);
            let postinfo = { username: info.username, password: info.password };
            console.log("ls" + info.password);
            this.axios.post("/api/login", qs.stringify(postinfo)).then(res => {
              console.log(res);
              if (res.data.loginSuccess) {
                console.log("重新登录成功");
                this.userphotoURL =
                  "http://127.0.0.1:3001/images/userPhoto/" +
                  JSON.parse(localStorage["__LOGIN__"]).userPhoto;
              } else {
                console.log("重新登录失败");
              }
            });
          }
        }
      });
    },
    intheDiv(div, e) {
      let x = e.clientX;
      let y = e.clientY;
      let divP = div.getBoundingClientRect();
      let divy2 = divP.y + divP.height;
      if (
        x < divP.x ||
        x > divP.x + divP.width ||
        y > divy2 - 2 ||
        y < divP.y
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  beforeMount() {},
  mounted() {
    this.isStaty();

    this.showLoginBtn();
    let time = null;
    let that = this;
    let div = $(".select-list")[0];
    $(".user-icon").on("mouseenter", function() {
      if (localStorage["__LOGIN__"]) {
        time = setTimeout(function() {
          $(".user-icon").addClass("changepostiton");
          $(".select-list").slideDown(300);
        }, 200);
      }
    });
    $(".user-icon").on("mouseleave", function(e) {
      clearTimeout(time);
      if (!that.intheDiv(div, e)) {
        $(".user-icon").removeClass("changepostiton");
        $(".select-list").slideUp(200);
      }
    });
    $(".select-list").on("mouseleave", function(e) {
      console.log("触发");
      clearTimeout(time);
      if (that.intheDiv(div, e)) {
        console.log("未出");
      } else {
        $(".user-icon").removeClass("changepostiton");
        $(".select-list").slideUp(200);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.inline-block {
  display: inline-block;
}
a {
  color: black;
  text-decoration: none;
}
.rtlink {
  display: inline-block;
  height: 100%;
  width: 100%;
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
// .wrapper-li:hover {
//   background-color: rgb(223, 223, 223);
// }
.comment-part {
  min-height: 500px;
  padding: 0;
  margin-top: 20px;
}
@media (max-width: 768px) {
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
.user-icon-btn {
  position: relative;
  width: 3rem;
  height: 3rem;
}
.user-icon {
  height: 2.5rem;
  width: 2.5rem;
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all 0.4s;
  z-index: 10;
}
.changepostiton {
  top: 30px;
  transform: scale(2);
}
.select-list {
  display: none;
  position: absolute;
  height: 180px;
  width: 168px;
  left: -60px;
  top: 2.5rem;
  background: #fff;
  border: 1px solid #ccc;
  // border-top: 1px;
  z-index: 1;
  border-radius: 10px;
}
.select-ul {
  padding-top: 45px;
}
.select-li {
  height: 45px;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid #ccc;
}
.select-li:first-child {
  border-top: 1px solid #ccc;
}
.select-li:last-child {
  border: 0px;
}
.select-li:hover {
  color: #00eeff;
}
</style>