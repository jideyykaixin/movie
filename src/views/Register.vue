<template>
  <div class="register-page">
    <div class="register-form">
      <h2>用户注册</h2>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item prop="username">
          <el-input 
            v-model="registerForm.username" 
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            size="large">
          </el-input>
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input 
            v-model="registerForm.email" 
            prefix-icon="el-icon-message"
            placeholder="请输入邮箱"
            size="large">
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            size="large"
            show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请确认密码"
            size="large"
            show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="agreeTerms">
            我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私政策</a>
          </el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="submitRegister" 
            :loading="loading"
            size="large"
            style="width: 100%">
            注册
          </el-button>
        </el-form-item>
        
        <div class="form-footer">
          已有账号？<a href="#" @click.prevent="goToLogin">立即登录</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    // 确认密码验证
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      agreeTerms: false,
      loading: false
    }
  },
  methods: {
    submitRegister() {
      if (!this.agreeTerms) {
        this.$message.warning('请先同意用户协议和隐私政策');
        return;
      }
      
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          
          // 模拟注册请求
          setTimeout(() => {
            this.loading = false;
            this.$message.success('注册成功，请登录');
            this.$router.push('/login');
          }, 1500);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped lang="scss">
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  
  .register-form {
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
    
    .el-checkbox {
      a {
        color: #409EFF;
        text-decoration: none;
      }
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