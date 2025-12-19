<template>
  <div class="home">
    <!-- Banner区域 -->
    <div class="banner">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <div class="banner-item" :style="{ backgroundImage: 'url(' + item.image + ')' }">
            <div class="banner-content">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <el-button type="primary" @click="viewMovie(item.movieId)">立即观看</el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 推荐电影 -->
    <div class="section">
      <div class="section-header">
        <h2>热门推荐</h2>
        <el-button type="text" @click="viewAllMovies">查看更多 ></el-button>
      </div>
      <div class="movie-list">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="movie in recommendedMovies" :key="movie.id">
            <MovieCard :movie="movie" />
          </el-col>
        </el-row>
      </div>
    </div>
    
    <!-- 最新电影 -->
    <div class="section">
      <div class="section-header">
        <h2>最新上线</h2>
        <el-button type="text" @click="viewAllMovies">查看更多 ></el-button>
      </div>
      <div class="movie-list">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="movie in latestMovies" :key="movie.id">
            <MovieCard :movie="movie" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Home',
  components: {
    MovieCard
  },
  data() {
    return {
      banners: [
        {
          id: 1,
          title: '阿凡达：水之道',
          description: '詹姆斯·卡梅隆执导的科幻史诗巨作',
          image: 'https://via.placeholder.com/1200x400/42b983/fff?text=Avatar+2',
          movieId: 1
        },
        {
          id: 2,
          title: '流浪地球2',
          description: '中国科幻大片续作，再创辉煌',
          image: 'https://via.placeholder.com/1200x400/42b983/fff?text=The+Wandering+Earth+2',
          movieId: 2
        }
      ],
      recommendedMovies: [
        { id: 1, title: '阿凡达：水之道', rating: 9.2, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Avatar+2' },
        { id: 2, title: '流浪地球2', rating: 8.8, image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Wandering+Earth+2' },
        { id: 3, title: '黑豹2', rating: 8.1, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Black+Panther+2' },
        { id: 4, title: '蚁人与黄蜂女：量子狂潮', rating: 7.9, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Ant-Man+3' },
        { id: 5, title: '雷霆沙赞！众神之怒', rating: 7.5, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Shazam+2' },
        { id: 6, title: '奎迪3', rating: 8.3, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Creed+3' }
      ],
      latestMovies: [
        { id: 7, title: '速度与激情10', rating: 7.2, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Fast+10' },
        { id: 8, title: '夺宝奇兵5', rating: 7.8, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Indiana+Jones+5' },
        { id: 9, title: '变形金刚：超能勇士崛起', rating: 7.0, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Transformers+Rise' },
        { id: 10, title: '蜘蛛侠：纵横宇宙', rating: 9.0, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Spider-Man+Across' },
        { id: 11, title: '小美人鱼', rating: 6.8, image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Little+Mermaid' },
        { id: 12, title: '碟中谍7：致命清算', rating: 8.5, image: 'https://via.placeholder.com/300x450/42b983/fff?text=Mission+Impossible+7' }
      ]
    }
  },
  methods: {
    viewMovie(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
    viewAllMovies() {
      this.$router.push('/movies');
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  .banner {
    margin-bottom: 30px;
    
    .banner-item {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      
      .banner-content {
        position: absolute;
        left: 10%;
        bottom: 20%;
        color: white;
        max-width: 500px;
        background: rgba(0, 0, 0, 0.5);
        padding: 20px;
        border-radius: 5px;
        
        h2 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        
        p {
          font-size: 16px;
          margin-bottom: 20px;
        }
      }
    }
  }
  
  .section {
    margin-bottom: 40px;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      h2 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
    }
    
    .movie-list {
      .el-col {
        margin-bottom: 20px;
      }
    }
  }
}
</style>