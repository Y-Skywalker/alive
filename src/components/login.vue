<template>
  <div class="login container-fluid">
    <div class="row login-body">
      <div class="col-lg-6 col-md-8 col-sm-12 col-12    m-auto login-board">
        <ul class="input container-fluid">
          <li class="row input-li">
            <div class="col m-auto">
              <h3>登录</h3>
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type username" type="text" placeholder="昵称" required>
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type password" type="password" placeholder="密码" required>
            </div>
          </li>
          <!-- <li class="row m-auto">
            <div>请输入验证码</div>
            <div class="captcha-pic">pic</div>
            <input class="input-type captcha-input" type="text">
          </li>-->
          <li class="row input-li">
            <div class="col m-auto">
              <button class="input-btn loginBtn">登录</button>
              <router-link class="input-btn registeredBtn" to="/registered">注册</router-link>
              <!-- <button class="input-btn registeredBtn">注册</button> -->
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <span class="checkres"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
var qs = require('qs');
export default {
  name: "login",
  methods: {
    checkInput(username = "", password = "") {
      $(".checkres").text("");
      if (username != "" && password != "") {
        let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        let pPattern = /^[a-zA-Z0-9]{4,20}$/;
        if (!uPattern.test(username)) {
          $(".checkres").text("用户名不符合规范,至少为4位");
        } else {
          if (!pPattern.test(password)) {
            $(".checkres").text("密码不符合规范");
          } else {
            return true;
          }
        }
      } else if (username == "") {
        $(".checkres").text("请输入昵称");
      } else if (password == "") {
        $(".checkres").text("请输入密码");
      }
    },
    jumpTohome() {
      let num = 3;
      let that = this;
      let time = setInterval(function() {
        if (num <= 0) {
          clearInterval(time);
          that.$router.push({ path: "/" });
          $(".checkres").text("");
        } else {
          $(".checkres").text("登录成功，即将跳转至主页 " + num);
          num--;
        }
      }, 1000);
    }
  },
  mounted() {
    let that = this;
    $(".loginBtn").on("click", function(e) {
      let username = $(".username").val();
      let password = $(".password").val();
      console.log(username + " " + password);
      let postData = { username: username, password: password };
      if (that.checkInput(username, password)) {
        that.axios.post("/api/login", qs.stringify(postData)).then(res => {
          if (res.data.loginSuccess) {
            $(".checkres").text("登录成功");
            let info = {
              username: res.data.username,
              password: res.data.password,
              userid: res.data.userid,
              userPhoto: res.data.userPhoto
            };
            localStorage["__LOGIN__"] = JSON.stringify(info);
            that.jumpTohome();
          } else {
            $(".checkres").text("账号或密码错误！");
          }
        });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.login {
  margin-top: 5px;

  .login-body {
    height: 650px;
    // background-color: lightblue;
    .login-board {
      height: 550px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      list-style: none;
      text-align: center;
      .input {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
      }
    }
  }
}
.input-li {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  margin-left:0px;
  margin-right:0px;
}
.input-li:first-child {
  margin-top: 20px;
}
.input-type {
  width: 400px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 10px;
  padding-right: 10px;
}
.loginBtn {
  background-color: lightblue;
}
.loginBtn:hover {
  background-color: rgb(191, 239, 255);
}
.registeredBtn {
  display: inline-block;
  margin-left: 15px;
  background-color: #ccc;
  text-decoration: none;
  color: black;
}
.registeredBtn:hover {
  background-color: rgb(245, 244, 244);
}
.input-btn {
  height: 40px;
  width: 185px;
  padding: 0px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.input-btn:hover {
  cursor: pointer;
}
.checkres {
  color: red;
}

@media (max-width: 500px) {
  .input-type {
    width: 300px;
  }
  .input-btn{
    width: 140px;
  }
}
@media (max-width: 410px) {
  .input-type {
    width: 220px;
  }
  .input-btn{
    width: 100px;
  }
}
// @media (min-width: 768px) {
//   .login {
//     width: 400px;
//   }
// }

// @media (min-width: 992px) {
//   .login{
//     width: 600px;
//   }
// }
// @media (min-width: 1200px) {
//   .login{
//     width: 600px;
//   }
// }
</style>