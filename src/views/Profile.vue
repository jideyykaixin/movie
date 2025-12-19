<template>
  <div class="profile-page">
    <el-row :gutter="30">
      <!-- 侧边栏 -->
      <el-col :span="6">
        <div class="profile-sidebar">
          <div class="user-info">
            <el-avatar :size="80" src="https://via.placeholder.com/80x80/409EFF/fff?text=User"></el-avatar>
            <h3>用户名</h3>
            <p class="user-email">user@example.com</p>
          </div>
          
          <el-menu
            :default-active="activeMenu"
            @select="handleMenuSelect">
            <el-menu-item index="profile">
              <i class="el-icon-user"></i>
              <span>个人信息</span>
            </el-menu-item>
            <el-menu-item index="favorites">
              <i class="el-icon-star-off"></i>
              <span>我的收藏</span>
            </el-menu-item>
            <el-menu-item index="comments">
              <i class="el-icon-chat-dot-round"></i>
              <span>我的评论</span>
            </el-menu-item>
            <el-menu-item index="settings">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      
      <!-- 主内容区 -->
      <el-col :span="18">
        <div class="profile-content">
          <!-- 个人信息 -->
          <div v-if="activeMenu === 'profile'" class="content-section">
            <h2>个人信息</h2>
            <el-form :model="userInfo" label-width="100px">
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false">
                  <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username"></el-input>
              </el-form-item>
              
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              
              <el-form-item label="注册时间">
                <el-input v-model="userInfo.registerDate" disabled></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveProfile">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <!-- 我的收藏 -->
          <div v-if="activeMenu === 'favorites'" class="content-section">
            <h2>我的收藏</h2>
            <div v-if="favorites.length === 0" class="empty-state">
              <p>暂无收藏的电影</p>
            </div>
            <div v-else>
              <el-row :gutter="20">
                <el-col :xs="12" :sm="8" :md="6" v-for="movie in favorites" :key="movie.id">
                  <MovieCard :movie="movie" />
                </el-col>
              </el-row>
            </div>
          </div>
          
          <!-- 我的评论 -->
          <div v-if="activeMenu === 'comments'" class="content-section">
            <h2>我的评论</h2>
            <div v-if="myComments.length === 0" class="empty-state">
              <p>暂无评论</p>
            </div>
            <div v-else class="comments-list">
              <div v-for="comment in myComments" :key="comment.id" class="comment-item">
                <div class="comment-movie">
                  电影：<strong>{{ comment.movieTitle }}</strong>
                </div>
                <p class="comment-content">{{ comment.content }}</p>
                <div class="comment-time">
                  发表于 {{ comment.time }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- 设置 -->
          <div v-if="activeMenu === 'settings'" class="content-section">
            <h2>设置</h2>
            <el-form label-width="120px">
              <el-form-item label="消息通知">
                <el-switch v-model="settings.notifications"></el-switch>
              </el-form-item>
              
              <el-form-item label="推送通知">
                <el-switch v-model="settings.pushNotifications"></el-switch>
              </el-form-item>
              
              <el-form-item label="夜间模式">
                <el-switch v-model="settings.darkMode"></el-switch>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
            
            <div class="danger-zone">
              <h3>危险操作</h3>
              <el-button type="danger" @click="logout">退出登录</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Profile',
  components: {
    MovieCard
  },
  data() {
    return {
      activeMenu: 'profile',
      userInfo: {
        avatar: '',
        username: '用户名',
        email: 'user@example.com',
        registerDate: '2023-01-01'
      },
      favorites: [
        { id: 1, title: '阿凡达：水之道', rating: 9.2, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Avatar+2' },
        { id: 2, title: '流浪地球2', rating: 8.8, image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Wandering+Earth+2' },
        { id: 3, title: '黑豹2', rating: 8.1, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Black+Panther+2' },
        { id: 4, title: '蜘蛛侠：纵横宇宙', rating: 9.0, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Spider-Man+Across' }
      ],
      myComments: [
        {
          id: 1,
          movieTitle: '阿凡达：水之道',
          content: '这部电影真是太棒了！视觉效果震撼，故事情节紧凑，强烈推荐！',
          time: '2023-05-10'
        },
        {
          id: 2,
          movieTitle: '流浪地球2',
          content: '国产科幻片的新高度，特效和故事都很棒！',
          time: '2023-03-12'
        }
      ],
      settings: {
        notifications: true,
        pushNotifications: false,
        darkMode: false
      }
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index;
    },
    saveProfile() {
      this.$message.success('个人信息保存成功');
    },
    saveSettings() {
      this.$message.success('设置保存成功');
    },
    logout() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('退出登录成功');
        this.$router.push('/');
      });
    }
  }
}
</script>

<style scoped lang="scss">
.profile-page {
  .profile-sidebar {
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    
    .user-info {
      text-align: center;
      margin-bottom: 30px;
      
      h3 {
        margin: 15px 0 5px;
      }
      
      .user-email {
        color: #999;
        margin: 0;
      }
    }
  }
  
  .profile-content {
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    
    .content-section {
      h2 {
        margin-top: 0;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        
        &:hover {
          border-color: #409EFF;
        }
      }
      
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
      
      .avatar {
        width: 80px;
        height: 80px;
        display: block;
      }
      
      .empty-state {
        text-align: center;
        padding: 50px 0;
        color: #999;
      }
      
      .comments-list {
        .comment-item {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          
          .comment-movie {
            margin-bottom: 10px;
          }
          
          .comment-content {
            margin-bottom: 10px;
            line-height: 1.6;
          }
          
          .comment-time {
            color: #999;
            font-size: 14px;
          }
        }
      }
      
      .danger-zone {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        
        h3 {
          color: #F56C6C;
        }
      }
    }
  }
}
</style>