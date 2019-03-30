<template>
  <div class="comment">
    <div class="comment-header">
      <h5>全部评论</h5>
      <h6>{{commentTotal}}条评论</h6>
      <div class="choose-page no-padding">
        <el-pagination
          class="page"
          @current-change="currentPage"
          layout="prev, pager, next"
          :page-size="10"
          :total="commentTotal"
        ></el-pagination>
        <hr>
      </div>
    </div>
    <div class="comment-body">
      <ul class="clearfix comment-parent">
        <li v-for="(item,index) in commentData" class="container comment-section" :key="index">
          <div class="comment-user-pic" :style="setCommentAuthorIcon(item.authorFaceFileName)"></div>
          <div class="comment-user-releace">
            <div class="comment-author">
              <router-link
                class="author-link"
                target="_blank"
                :to="'/userInfo/' + item.author_id "
              >{{item.author}}</router-link>
            </div>
            <div class="comment-content">
              {{item.parent_content}}
              <div class="comment-info">
                <span class="comment-date">{{item.parent_date}}</span>
                <span class="reply-btn">回复</span>
              </div>
            </div>

            <ul v-if="item.son_list.length>0" class="clearfix comment-son">
              <li
                v-for="(sitem,sindex) in showSonCommentLength(item.son_list)"
                :key="sindex"
                class="comment-son-section"
              >
                <div class="comment-son-pic" :style="setCommentAuthorIcon(sitem.authorFaceFileName)"></div>
                <div class="comment--son-user-releace">
                  <div class="comment-son-user-content">
                    <router-link
                      class="author-link"
                      target="_blank"
                      :to="'/userInfo/' + sitem.author_id "
                    >{{sitem.author}}</router-link>
                    <div class="comment-son-content">{{sitem.son_content}}</div>
                    <div class="comment-son-info">
                      <span class="comment-son-date">{{sitem.son_date}}</span>
                      <span class="reply-btn">回复</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="comment-read-more" v-if="item.son_list.length>3">
              <span class="comment-son-total">共{{item.son_list.length}}条回复</span>
              <span class="show-more-btn" v-if="item.son_list.length>3">点击查看</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="choose-page">
      <el-pagination
        class="page"
        @current-change="currentPage"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="commentTotal"
      ></el-pagination>
    </div>
    <div class="comment-foot container">
      <div class="comment-write row">
        <div class="userPic col-2 m-auto">
          <div class="user-icon m-auto" :style="userIconStyle">
            <!-- <img class="user-icon" :src="userIconSrc" alt> -->
          </div>
        </div>
        <div class="comment-textarea col-8">
          <div class="textA m-auto">
            <textarea
              name="user-comment"
              id="user-comment"
              cols="30"
              rows="10"
              placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
            ></textarea>
          </div>
        </div>
        <div class="comment-send col-2">
          <button class="comment-send-btn">发表评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userIconStyle: "",
      commentTotal: 0, //回复总数
      commentParent: [], //主回复列表
      commentSon: [], //子回复列表
      commentData: [], //可以渲染的回复列表 包含主回复和3个子回复
      ReqInfo: {
        av: null,
        Cpage: 1,
        Cstart: 0,
        Cend: 10,
        Cmax: 10
      }
    };
  },
  filters: {},
  methods: {
    showSonCommentLength(value) {
      //最大子回复限制
      if (value.length > 3) {
        return value.slice(0, 3);
      } else {
        return value;
      }
    },
    setUserIcon: function() {
      //设置用户头像
      if (localStorage["__LOGIN__"]) {
        this.userIconStyle =
          "background-image:url(" +
          "http://127.0.0.1:3001/images/userPhoto/" +
          JSON.parse(localStorage["__LOGIN__"]).userPhoto +
          ");";
      }
    },
    setCommentAuthorIcon: function(fileName) {
      console.log(fileName)
      return 'background-image:url("http://127.0.0.1:3001/images/userPhoto/' + fileName+ '");'
    },
    currentPage(val) {
      //分页跳转
      console.log(val);
      if (val == 1) {
        this.ReqInfo.Cpage = 0;
      } else {
        this.ReqInfo.Cpage = val-1;
      }
      this.ReqInfo.Cend = this.ReqInfo.Cmax * this.ReqInfo.Cpage;
      this.ReqInfo.Cstart = this.ReqInfo.Cend;

      this.getVideoComment();
    },
    getVideoComment() {
      //数据获取
      this.axios
        .get(
          "/api/getVideoComment?av=" +
            this.ReqInfo.av +
            "&start=" +
            this.ReqInfo.Cstart +
            "&maxnum=" +
            this.ReqInfo.Cmax
        )
        .then(response => {
          // console.log(response.data);
          this.commentTotal = response.data.commentTotal;
          this.commentTotal = Number(this.commentTotal);
          this.commentParent = response.data.commentParent;
          this.commentSon = response.data.commentSon;
          // this.getUserFaceFileName(this.commentParent)  //获取父回复头像文件名

          this.commentData = this.pushAllSonComment(
            //合并父子元素
            this.commentParent,
            this.commentSon
          );
        });
    },
    pushAllSonComment(cParent, cSon) {
      //父子回复合并一个二元数组
      cParent.forEach(item => {
        // console.log(item);
        let sondata = [];
        let pId = item.parent_id;
        cSon.forEach(item => {
          if (item.son_id == pId) {
            sondata.push(item);
          }
        });
        item.son_list = sondata;
      });
      return cParent;
    }
  },
  mounted() {
    this.ReqInfo.av = this.$route.params.av;

    let that = this;
    this.getVideoComment();
    this.setUserIcon();

    // $(".pagination").on("click", "li", function(e) {
    //   console.log(e);
    // });
  }
};
</script>

<style scoped lang="scss">
.comment-section {
  list-style: none;
  min-height: 111px;
  .comment-user-pic {
    float: left;
    height: 80px;
    width: 80px;
    margin-top: 20px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
  .comment-user-releace {
    margin-left: 100px;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ddd;
    .comment-content {
      min-height: 40px;
      margin-bottom: 15px;
      margin-top: 8px;
    }
  }
  .comment-read-more {
    margin-top: 10px;
  }
}

.comment-son {
  list-style: none;
  .comment-son-section {
    min-height: 70px;
    .comment-son-pic {
      height: 40px;
      width: 40px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
      float: left;
    }
    .comment--son-user-releace {
      .comment-son-user-content {
        margin-left: 60px;
        .comment-son-date {
          font-size: 14px;
          color: #999;
        }
      }
      .comment-son-content {
      }
    }
  }
}

.comment {
  height: 100%;
  width: 100%;
  // background-color: #ccc;
}
.comment-header {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}
.comment-header > h5 {
  margin-left: 30px;
}
.comment-header > h6 {
  margin-left: 30px;
}
.author-link {
  text-decoration: none;
  color: #fb7299;
}

.comment-foot {
  padding: 0px;
}
.comment-write {
  padding: 0px;
  margin: 0px;
  height: 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  // padding-left: 15px;
}
.userPic {
  text-align: center;
  padding: 0px;
}
.user-icon {
  height: 80px;
  width: 80px;
  background-color: #ccc;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
@media (max-width: 768px) {
  .user-icon {
    height: 60px;
    width: 60px;
  }
}
@media (max-width: 576px) {
  .user-icon {
    height: 45px;
    width: 45px;
  }
}
.comment-textarea {
  position: relative;
  height: 150px;
  padding: 0px;
  #user-comment {
    height: 75px;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    border-radius: 10px;

    border: 1px solid #ddd;
    resize: none;
    padding-left: 10px;
    background-color: #eee;
    font-size: 14px;
  }
  #user-comment:hover {
    border-color: #0099ff;
    background-color: #fff;
  }
  #user-comment:focus {
    border-color: #0099ff;
    outline: 0px;
    background-color: #fff;
  }
}

.comment-send {
  padding: 0px;
  // background-color: lightpink;
  position: relative;
  .comment-send-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-left: 15px;
    box-sizing: content-box;
    width: 45px;
    height: 60px;
    padding: 7.5px 15px 7.5px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #00b7ff;
    color: white;
  }
  .comment-send-btn:hover {
    cursor: pointer;
    background-color: #00c7ff;
  }
}
.choose-page {
  height: 100%;
  background-color: #fff;
  text-align: right;
  padding: 10px 0px 10px 0px;
  .page {
  }
}
.show-more-btn {
  color: #00a1d6;
  line-height: 14px;
  font-size: 14px;
  padding: 2px 3px 2px 3px;
}
.show-more-btn:hover {
  cursor: pointer;
  background-color: #ddd;
  border-radius: 5px;
}
.comment-son-total {
  font-size: 14px;
  color: #999;
}
.reply-btn {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
  padding: 2px 3px 2px 3px;
  border-radius: 4px;
}
.reply-btn:hover {
  cursor: pointer;
  background-color: #ddd;
  color: #0099ff;
}
.comment-info {
  margin-top: 5px;
  font-size: 14px;
  color: #999;
}
.no-padding {
  padding: 0px;
}
</style>