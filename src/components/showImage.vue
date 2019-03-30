<template>
  <div class="showImage container">
    <div class="imgShow row">
      <div class="show-board col">
        <img class="image" :src="imgSrc" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showImage",
  data() {
    return {
      imgSrc: ""
    };
  },
  mounted() {
    console.log(this.$route.params.imgId);
    let imgId = this.$route.params.imgId;
    this.imgSrc = `http://127.0.0.1:3001/images/waterFall/${imgId}.jpg`;
  }
};
</script>

<style scoped lang="scss">
.showImage {
  padding: 0px;
  padding-top: 20px;
}

.imgShow {
  height: 700px;
  width: 100%;
  margin: 0px;
  margin-bottom: 20px;
  .show-board {
    width: 100%;
    height: 100%;
    padding: 0px;
    text-align: center;
    .image {
      height: 100%;
      width: auto;
    }
  }
}
</style>