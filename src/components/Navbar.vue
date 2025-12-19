<template>
  <div class="navbar">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="4">
        <div class="logo">
          <h2>MovieHub</h2>
        </div>
      </el-col>
      
      <el-col :span="12">
        <el-menu 
          :default-active="activeIndex" 
          mode="horizontal" 
          @select="handleSelect"
          background-color="#333"
          text-color="#fff"
          active-text-color="#409EFF">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/movies">电影</el-menu-item>
          <el-menu-item index="/profile">个人中心</el-menu-item>
        </el-menu>
      </el-col>
      
      <el-col :span="6" class="user-actions">
        <div v-if="isLoggedIn">
          <el-dropdown @command="handleUserCommand">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人资料</el-dropdown-item>
              <el-dropdown-item command="favorites">我的收藏</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button type="primary" size="small" @click="$router.push('/login')">登录</el-button>
          <el-button size="small" @click="$router.push('/register')">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      activeIndex: '/',
      isLoggedIn: false,
      username: '用户'
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },
    handleUserCommand(command) {
      switch(command) {
        case 'profile':
          this.$router.push('/profile');
          break;
        case 'favorites':
          this.$message.info('查看收藏');
          break;
        case 'logout':
          this.isLoggedIn = false;
          this.$message.success('退出登录成功');
          this.$router.push('/');
          break;
      }
    }
  },
  watch: {
    '$route'(to) {
      this.activeIndex = to.path;
    }
  },
  mounted() {
    // 模拟已登录状态
    this.isLoggedIn = true;
  }
}
</script>

<style scoped lang="scss">
.navbar {
  .logo h2 {
    color: white;
    margin: 0;
  }
  
  .user-actions {
    text-align: right;
    
    .el-dropdown-link {
      color: white;
      cursor: pointer;
    }
  }
}
</style>