<template>
  <div class="registered container-fluid">
    <div class="row registered-body">
      <div class="registered-board col-12 col-sm-10 col-md-10 col-lg-5 m-auto">
        <ul class="input container">
          <li class="row input-li">
            <div class="col m-auto">
              <h3>注册</h3>
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type username" type="text" placeholder="昵称">
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type password" type="password" placeholder="密码">
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type password-again" type="password" placeholder="再次输入密码">
            </div>
          </li>
          <!-- <li class="row m-auto">
            <div>请输入验证码</div>
            <div class="captcha-pic">pic</div>
            <input class="input-type captcha-input" type="text">
          </li>-->
          <li class="row input-li">
            <div class="col m-auto">
              <button class="input-btn okregisteredBtn">确定修改</button>
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
export default {
  name: "registered",
  methods: {
    checkInput(username = "", password = "", passwordAgain = "") {
      $(".checkres").text("");
      if (
        username != "" &&
        password != "" &&
        passwordAgain != "" &&
        password == passwordAgain
      ) {
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
      } else if (passwordAgain == "") {
        $(".checkres").text("请再次输入密码");
      } else if (password != passwordAgain) {
        $(".checkres").text("两次输入的密码不一致");
      }
    },
    jumpTologin() {
      let num = 3;
      let that = this;
      let time = setInterval(function() {
        if (num <= 0) {
          clearInterval(time);
          that.$router.push({ path: "/login" });
          $(".checkres").text("");
        } else {
          $(".checkres").text("注册成功，即将跳转 "+num);
          num--;
        }
      }, 1000);
    }
  },
  mounted() {
    let that = this;
    let upisok = null;
    $(".okregisteredBtn").on("click", function(e) {
      let username = $(".username").val();
      let password = $(".password").val();
      let passwordAgain = $(".password-again").val();
      upisok = that.checkInput(username, password, passwordAgain);
      if (upisok) {
        let postData = { username: username, password: password };
        that.axios.post("/api/registered", postData).then(res => {
          console.log(res);
          if (res.data.registeredSuccess == true) {
            $(".checkres").text("注册成功，即将跳转");
            that.jumpTologin();
          }
        });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.registered {
  margin-top: 5px;

  .registered-body {
    height: 650px;
    // background-color: lightblue;
    .registered-board {
      height: 550px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      list-style: none;
      .input {
        height: 100%;
        margin: 0px;
      }
    }
  }
}
.input-li {
  text-align: center;
  margin-bottom: 20px;
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

.okregisteredBtn {
  // margin-left: 20px;
  background-color: #ccc;
  color: #666;
}
.okregisteredBtn:hover {
  background-color: rgb(245, 244, 244);
}
.input-btn {
  height: 40px;
  width: 400px;
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
</style>