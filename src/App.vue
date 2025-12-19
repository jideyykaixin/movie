<template>
  <div id="app">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header, .el-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #f5f5f5;
  min-height: calc(100vh - 120px);
}
</style>