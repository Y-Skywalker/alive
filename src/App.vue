<template>
  <div id="app">
    <router-view name="header" v-if="isRouterAlive"></router-view>
    <router-view v-if="isRouterAlive" />
    <router-view name="foot" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
ul > li {
  list-style: none;
}
a {
  text-decoration: none;
}
input:focus {
  outline: none;
}
button:focus {
  outline: none;
}
.clearfix:before,
.clear:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  /* background-color: black; */
}
</style>
