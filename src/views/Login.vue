<template>
  <div class="login-page">
    <div class="login-form">
      <h2>用户登录</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            prefix-icon="el-icon-user"
            placeholder="请输入用户名或邮箱"
            size="large">
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            size="large"
            show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <a href="#" class="forgot-password">忘记密码？</a>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="submitLogin" 
            :loading="loading"
            size="large"
            style="width: 100%">
            登录
          </el-button>
        </el-form-item>
        
        <div class="form-footer">
          还没有账号？<a href="#" @click.prevent="goToRegister">立即注册</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少6位', trigger: 'blur' }
        ]
      },
      rememberMe: false,
      loading: false
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          
          // 模拟登录请求
          setTimeout(() => {
            this.loading = false;
            this.$message.success('登录成功');
            this.$router.push('/');
          }, 1500);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  
  .login-form {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
    
    .forgot-password {
      float: right;
      font-size: 14px;
      color: #409EFF;
      text-decoration: none;
    }
    
    .form-footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      
      a {
        color: #409EFF;
        text-decoration: none;
      }
    }
  }
}
</style>