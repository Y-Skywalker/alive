<template>
  <div class="userbaseinfo container">
    <div class="row userbaseinfo-board clearfix">
      <ul class="col userbaseinfo-info">
        <li class="userbaseinfo-info-item">
          <span class="label-username">用户名：</span>
          <span class="userbaseinfo-username" >{{username}}</span>
        </li>
        <li class="userbaseinfo-info-item">
          <span class="label-userid">ID：</span>
          <span class="userbaseinfo-userid">{{userid}}</span>
        </li>
        <li class="userbaseinfo-info-item">
          <span class="label-gender">性别：</span>
          <button class="gender-choose">男</button>
          <button class="gender-choose">女</button>
          <button class="gender-choose">保密</button>
        </li>
      </ul>
    </div>
    <div class="row userbaseinfo-board clearfix">
      <div class="col signature-board">
        <label class="label-signature" for="signature">我的签名:</label>
        <textarea
          name="signature"
          class="signature"
          id="signature"
          cols="30"
          rows="10"
          placeholder="输入你的个性签名..."
        ></textarea>
      </div>
    </div>
    <div class="row userbaseinfo-board clearfix">
      <div class="col">
        <button class="userbaseinfo-saveBtn">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userBaseInfo",
  data() {
    return {
      username:JSON.parse(localStorage['__LOGIN__']).username,
      userid:JSON.parse(localStorage['__LOGIN__']).userid
    };
  },
  methods: {
    
  },
  mounted(){

  }
};
</script>

<style scoped lang="scss">
.userbaseinfo {
  height: 600px;
  width: 100%;
  padding: 0px 20px 0px 20px;
}
.userbaseinfo-board {
  height: 200px;
  width: 100%;
  margin: 0px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.userbaseinfo-info {
  width: 100%;
  height: 100%;
  margin: 0px;
  .userbaseinfo-info-item {
    height: 30%;
    width: 100%;
    text-align: left;
  }
  .userbaseinfo-info-item:first-child {
    margin-top: 20px;
  }
}
.userbaseinfo-board:nth-child(2) {
  height: 170px;
}
.userbaseinfo-board:nth-child(3) {
  border: 0px;
}
.label-userid{
  margin-left:32px;
}
.signature-board {
  display: block;
  text-align: center;
  .label-signature {
    float: left;
    margin-right: 20px;
    margin-top: 29px;
    margin-bottom: 0px;
  }
  .signature {
    float: left;
    margin-top: 20px;
    height: 120px;
    width: 80%;
    resize: none;
    border-radius: 5px;
    border-color:#ddd;
    padding:9px 7px 5px 7px;
  }
}
.userbaseinfo-saveBtn{
  margin-top:40px;
  background-color: #20a0ff;
  border:1px solid #ccc;
  width: 200px;
  height:40px;
  color:white;
  border-radius: 5px;
}
.userbaseinfo-saveBtn:hover{
  cursor: pointer;
  background-color: #53b5ff
}
.label-gender{
  margin-left:15px;
}
.gender-choose{
  height: 30px;
  width:40px;
  text-align: center;
  line-height: 26px;
  border-radius: 5px;
  border:1px solid #ccc;
  background-color: #eee;
  margin-right:12px;
}
.gender-choose:hover{
  cursor: pointer;
}
</style>