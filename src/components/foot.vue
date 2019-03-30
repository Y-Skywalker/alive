<template>
  <div class="foot-bg">
    <div class="container foot">
      <div class="row f-row">
        <ul class="col foot-info clearfix">
          <li>作者:prophet</li>
          <li>加入我们</li>
          <li>联系我们</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.foot-bg {
  margin-top: 5rem;
  background-color: #eee;
  height: 10rem;
  width: 100%;
  position: relative;
}
.foot{
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.f-row{
  margin:0px;
}
.foot-info {
  margin: 0px;
  list-style: none;
}
.foot-info > li {
  float: left;
  padding: 0px 10px 0px 10px;
  border-right: 1px solid #ccc;
  color:#999;
  font-size:0.8rem;
}
</style>