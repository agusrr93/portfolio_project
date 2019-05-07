<template>
  <div id="app">
    <div id="nav">
      <NavBar></NavBar>
      <NavbarThread></NavbarThread>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NavbarThread from '@/components/NavbarThread.vue'

export default {
  components: {
    NavBar,
    NavbarThread
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
