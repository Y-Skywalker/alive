<template>
  <div class="container image">
    <div class="row image-row">
      <div class="col image-water-fall">
        <div class="wfbox" data-id="imgId">
          <img class="wfimg" src alt>
          <!-- <span>wfauthor</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WF from "../assets/js/waterFall.js";

export default {
  data() {
    return {
      itemList: [
        "http://127.0.0.1:3001/images/waterFall/0.jpg",
        "http://127.0.0.1:3001/images/waterFall/1.jpg",
        "http://127.0.0.1:3001/images/waterFall/2.jpg",
        "http://127.0.0.1:3001/images/waterFall/3.jpg",
        "http://127.0.0.1:3001/images/waterFall/4.jpg",
        "http://127.0.0.1:3001/images/waterFall/5.jpg",
        "http://127.0.0.1:3001/images/waterFall/6.jpg",
        "http://127.0.0.1:3001/images/waterFall/7.jpg",
        "http://127.0.0.1:3001/images/waterFall/8.jpg",
        "http://127.0.0.1:3001/images/waterFall/9.jpg",
        "http://127.0.0.1:3001/images/waterFall/10.jpg",
        "http://127.0.0.1:3001/images/waterFall/11.jpg",
        "http://127.0.0.1:3001/images/waterFall/12.jpg",
        "http://127.0.0.1:3001/images/waterFall/13.jpg",
        "http://127.0.0.1:3001/images/waterFall/14.jpg",
        "http://127.0.0.1:3001/images/waterFall/15.jpg",
        "http://127.0.0.1:3001/images/waterFall/16.jpg",
        "http://127.0.0.1:3001/images/waterFall/17.jpg",
        "http://127.0.0.1:3001/images/waterFall/18.jpg",
        "http://127.0.0.1:3001/images/waterFall/19.jpg",
        "http://127.0.0.1:3001/images/waterFall/20.jpg",
        "http://127.0.0.1:3001/images/waterFall/21.jpg",
        "http://127.0.0.1:3001/images/waterFall/22.jpg",
        "http://127.0.0.1:3001/images/waterFall/23.jpg",
        "http://127.0.0.1:3001/images/waterFall/24.jpg",
        "http://127.0.0.1:3001/images/waterFall/25.jpg",
        "http://127.0.0.1:3001/images/waterFall/26.jpg",
        "http://127.0.0.1:3001/images/waterFall/27.jpg",
        "http://127.0.0.1:3001/images/waterFall/28.jpg",
        "http://127.0.0.1:3001/images/waterFall/29.jpg",
        "http://127.0.0.1:3001/images/waterFall/30.jpg",
        "http://127.0.0.1:3001/images/waterFall/31.jpg"
      ],
      wfData: [
        {
          imgId: "0",
          wfauthor: "demo0"
        },
        {
          imgId: "1",
          wfauthor: "demo1"
        },
        {
          imgId: "2",
          wfauthor: "demo2"
        },
        {
          imgId: "3",
          wfauthor: "demo3"
        },
        {
          imgId: "4",
          wfauthor: "demo4"
        },
        {
          imgId: "5",
          wfauthor: "demo5"
        },
        {
          imgId: "6",
          wfauthor: "demo6"
        },
        {
          imgId: "7",
          wfauthor: "demo7"
        },
        {
          imgId: "8",
          wfauthor: "demo8"
        },
        {
          imgId: "9",
          wfauthor: "demo9"
        },
        {
          imgId: "10",
          wfauthor: "demo10"
        },
        {
          imgId: "11",
          wfauthor: "demo11"
        },
        {
          imgId: "12",
          wfauthor: "demo12"
        },
        {
          imgId: "13",
          wfauthor: "demo13"
        },
        {
          imgId: "14",
          wfauthor: "demo14"
        },
        {
          imgId: "15",
          wfauthor: "demo15"
        },
        {
          imgId: "16",
          wfauthor: "demo16"
        },
        {
          imgId: "17",
          wfauthor: "demo17"
        },
        {
          imgId: "18",
          wfauthor: "demo18"
        },
        {
          imgId: "19",
          wfauthor: "demo19"
        },
        {
          imgId: "20",
          wfauthor: "demo20"
        },
        {
          imgId: "21",
          wfauthor: "demo21"
        },
        {
          imgId: "22",
          wfauthor: "demo22"
        },
        {
          imgId: "23",
          wfauthor: "demo23"
        },
        {
          imgId: "24",
          wfauthor: "demo24"
        },
        {
          imgId: "25",
          wfauthor: "demo25"
        },
        {
          imgId: "26",
          wfauthor: "demo26"
        },
        {
          imgId: "27",
          wfauthor: "demo27"
        },
        {
          imgId: "28",
          wfauthor: "demo28"
        },
        {
          imgId: "29",
          wfauthor: "demo29"
        },
        {
          imgId: "30",
          wfauthor: "demo30"
        },
        {
          imgId: "31",
          wfauthor: "demo31"
        }
      ],
      time: null
    };
  },
  methods: {},
  mounted() {
    /*************************************** */
    let that = this;

    let wfitem = document.getElementsByClassName("wfbox")[0];
    let wfbox = document.getElementsByClassName("image-water-fall")[0];
    let minWidth = 200,
      maxMargin = 5;

    let wf = WF.createWF(wfbox, wfitem, minWidth, maxMargin); //初始化
    console.log(wf);

    wf.getImgDataList(this.itemList, imgloading, function(res) {
      wf.render(res, that.wfData);
    });

    function imgloading() {
      console.log("图片开始加载！");
    }

    let w = wfbox.clientWidth;
    let boxWidth = null;
    $(window).resize(function() {
      boxWidth = wfbox.clientWidth;
      if (w != boxWidth) {
        w = boxWidth;
        wf.reRender(wfbox);
      }
    });
    $(".image-water-fall").on("click", ".wfbox", function(e) {
      let imgId = e.currentTarget.getAttribute("data-id")
      let routerData = that.$router.resolve({ path: `/showImage/${imgId }`});
      window.open(routerData.href,'_blank')
    });
  }
};
</script>

<style scoped lang="scss">
.image-row {
  // width: 100%;
  margin: 0px;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.image-water-fall {
  position: relative;
  min-height: 1000px;
  width: 100%;
  // background-color: lightpink;
  padding: 0px;
}
.container-fluid {
  padding: 20px;
}

.wfbox {
  position: absolute;
  width: 200px;
  height: auto;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  .wfimg {
    width: 100%;
    height: auto;
  }
}
.wfbox:hover {
  box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>