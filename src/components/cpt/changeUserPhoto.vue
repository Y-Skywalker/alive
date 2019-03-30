<template>
  <div class="change-user-photo container">
    <div class="row change-user-photo-board">
      <div class="col userphoto oldphoto">
        <span class="photo-label">你的头像</span>
        <img class="oldphoto-img" :src="userOldPhotoURL" alt="原头像">
      </div>
    </div>
    <div class="row change-user-photo-save">
      <div class="col">
        <div class="btn-board clearfix">
          <div class="btn-board-center clearfix">
            <div class="photo-input">
              <input type="file" name="file" class="input-photofile" @change="fileOnChange($event)">
              <a class="photo-input-text" href="#none">上传文件</a>
            </div>
            <button class="change-user-photo-saveBtn">保存</button>
          </div>
          <div class="tip"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-user-photo",
  inject: ["reload"],
  data() {
    return {
      userOldPhotoURL: "",
      picture: {}, //图片信息
      hasdata: false
    };
  },
  methods: {
    fileOnChange() {
      this.picture = event.target.files[0]; // get input file object
      this.hasdata = true;
      $(".tip").text("");
      console.log(this.picture);
    },
    upload() {
      var that = this;
      var formData = new FormData();
      formData.append("file", this.picture);
      this.axios
        .post("/api/userPhotoUpdata", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.InfoChangeSuccess) {
            let ls = JSON.parse(localStorage["__LOGIN__"]);
            ls.userPhoto = res.data.Info;
            localStorage["__LOGIN__"] = JSON.stringify(ls);
            this.reload();
          } else {
            if ((res.data.Info = "no login of no file")) {
              $(".tip").text("登录超时！");
            }
            else if(res.data.Info = "write error"){
              $(".tip").text("更新出错！");
            }
          }
        });
    }
  },
  mounted() {
    let that = this;
    if (localStorage["__LOGIN__"]) {
      this.userOldPhotoURL =
        "http://127.0.0.1:3001/images/userPhoto/" +
        JSON.parse(localStorage["__LOGIN__"]).userPhoto;
    }
    $(".input-photofile").change(function() {
      $(".oldphoto-img").attr("src", URL.createObjectURL($(this)[0].files[0]));
    });
    $(".change-user-photo-saveBtn").on("click", function() {
      if (that.hasdata) {
        that.upload();
      } else {
        $(".tip").text("请选择新头像！");
      }
    });
  }
};
</script>

<style scoped>
.change-user-photo-board {
  border-bottom: 1px solid #ddd;
  height: 400px;
}
.change-user-photo-save {
  text-align: center;
  height: 200px;
}
.change-user-photo-saveBtn {
  float: left;
  margin: 0px;
  background-color: #20a0ff;
  border: 1px solid #ccc;
  width: 200px;
  height: 40px;
  color: white;
  border-radius: 5px;
}
.btn-board {
  margin-top: 40px;
}
.btn-board-center {
  margin: 0 auto;
  width: 420px;
}
.change-user-photo-saveBtn:hover {
  cursor: pointer;
  background-color: #53b5ff;
}
.userphoto {
  position: relative;
  text-align: center;
  line-height: 400px;
  border-right: 1px solid #ddd;
}
.photo-label {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  margin: auto;
}
.oldphoto-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.photo-input {
  float: left;

  display: inline-block;
  width: 200px;
  height: 40px;
  margin-right: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  background-color: #20a0ff;
  z-index: 10;
  border: 1px solid #ddd;
}
.photo-input input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index: 9;
}
.photo-input-text {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.photo-input:hover {
  cursor: pointer;
  background-color: #53b5ff;
}
.tip {
  color: red;
  margin-top: 20px;
}
</style>