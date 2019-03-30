<template>
  <div class="changePass container-fluid">
    <div class="row changePass-body">
      <div class="changePass-board col-12 col-sm-10 col-md-10 col-lg-5 m-auto">
        <ul class="input container">
          <li class="row input-li">
            <div class="col m-auto">
              <h3>修改密码</h3>
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type oldpassword" type="text" placeholder="原密码">
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type newpassword" type="password" placeholder="新密码">
            </div>
          </li>
          <li class="row input-li">
            <div class="col m-auto">
              <input class="input-type newpassword-again" type="password" placeholder="再次输入新密码">
            </div>
          </li>
          <!-- <li class="row m-auto">
            <div>请输入验证码</div>
            <div class="captcha-pic">pic</div>
            <input class="input-type captcha-input" type="text">
          </li>-->
          <li class="row input-li">
            <div class="col m-auto">
              <button class="input-btn okchangePassBtn">确定修改</button>
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
  name: "changePass",
  methods: {
    checkInput(oldPass = "", password = "", passwordAgain = "") {
      $(".checkres").text("");
      if (
        oldPass != "" &&
        password != "" &&
        passwordAgain != "" &&
        password == passwordAgain
      ) {
        let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        let pPattern = /^[a-zA-Z0-9]{4,20}$/;
        if (!uPattern.test(oldPass)) {
          $(".checkres").text("原密码不符合规范,至少为4位");
        } else {
          if (!pPattern.test(password)) {
            $(".checkres").text("新密码不符合规范");
          } else {
            return true;
          }
        }
      } else if (oldPass == "") {
        $(".checkres").text("请输入原密码");
      } else if (password == "") {
        $(".checkres").text("请输入新密码");
      } else if (passwordAgain == "") {
        $(".checkres").text("请再次输入新密码");
      } else if (password != passwordAgain) {
        $(".checkres").text("两次输入的密码不一致");
      }
    },
    jumpToHome() {
      let num = 3;
      let that = this;
      let time = setInterval(function() {
        if (num <= 0) {
          clearInterval(time);
          that.$router.push({ path: "/" });
          $(".checkres").text("");
        } else {
          $(".checkres").text("修改成功，即将跳转 " + num);
          num--;
        }
      }, 1000);
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
          $(".checkres").text("即将跳转至登陆： " + num);
          num--;
        }
      }, 1000);
    }
  },
  mounted() {
    let that = this;
    let cpisok = null;
    $(".okchangePassBtn").on("click", function(e) {
      let oldpassword = $(".oldpassword").val();
      let newpassword = $(".newpassword").val();
      let newpasswordAgain = $(".newpassword-again").val();
      cpisok = that.checkInput(oldpassword, newpassword, newpasswordAgain);
      if (cpisok) {
        let postData = {
          username: JSON.parse(localStorage["__LOGIN__"]).username,
          oldpassword: oldpassword,
          newpassword: newpassword
        };
        console.log(postData);
        that.axios.post("/api/changePass", postData).then(res => {
          console.log(res);
          if (res.data.changePassSuccess == true) {
            let ls = JSON.parse(localStorage["__LOGIN__"]);
            ls.password = res.data.newPass;
            let newlsStr = JSON.stringify(ls);
            localStorage["__LOGIN__"] = newlsStr;
            $(".checkres").text("修改成功，即将跳转");
            that.jumpToHome();
          } else {
            console.log(res.data);
            if ((res.data.content = "nologin")) {
              $(".checkres").text("账号未登陆");
              that.jumpTologin();
            } else if ((res.data.content = "errorPass")) {
              $(".checkres").text("修改失败，原密码错误");
              $(".oldpassword").val("");
              $(".newpassword").val("");
              $(".newpassword-again").val("");
            }
          }
        });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.changePass {
  margin-top: 5px;

  .changePass-body {
    height: 650px;
    // background-color: lightblue;
    .changePass-board {
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

.okchangePassBtn {
  // margin-left: 20px;
  background-color: #ccc;
  color: #666;
}
.okchangePassBtn:hover {
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