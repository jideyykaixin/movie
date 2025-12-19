<template>
  <div class="movie-list-page">
    <el-row :gutter="20">
      <!-- 侧边栏筛选 -->
      <el-col :span="6" class="filters">
        <div class="filter-section">
          <h3>分类筛选</h3>
          <el-checkbox-group v-model="selectedCategories">
            <el-checkbox v-for="category in categories" :key="category" :label="category">{{ category }}</el-checkbox>
          </el-checkbox-group>
        </div>
        
        <div class="filter-section">
          <h3>年份筛选</h3>
          <el-select v-model="selectedYear" placeholder="请选择年份" clearable>
            <el-option
              v-for="year in years"
              :key="year"
              :label="year"
              :value="year">
            </el-option>
          </el-select>
        </div>
        
        <div class="filter-section">
          <h3>评分筛选</h3>
          <el-slider
            v-model="ratingRange"
            range
            :max="10"
            :min="0"
            :step="0.5">
          </el-slider>
          <p>评分: {{ ratingRange[0] }} - {{ ratingRange[1] }}</p>
        </div>
      </el-col>
      
      <!-- 电影列表 -->
      <el-col :span="18">
        <div class="list-header">
          <div class="sort-options">
            <span>排序：</span>
            <el-radio-group v-model="sortBy">
              <el-radio-button label="rating">评分</el-radio-button>
              <el-radio-button label="year">年份</el-radio-button>
              <el-radio-button label="name">名称</el-radio-button>
            </el-radio-group>
          </div>
          
          <div class="result-count">
            找到 {{ filteredMovies.length }} 部电影
          </div>
        </div>
        
        <div class="movie-grid">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="6" v-for="movie in paginatedMovies" :key="movie.id">
              <MovieCard :movie="movie" />
            </el-col>
          </el-row>
        </div>
        
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="filteredMovies.length"
            layout="prev, pager, next"
            background>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieList',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [
        { id: 1, title: '阿凡达：水之道', rating: 9.2, year: 2022, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Avatar+2' },
        { id: 2, title: '流浪地球2', rating: 8.8, year: 2023, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Wandering+Earth+2' },
        { id: 3, title: '黑豹2', rating: 8.1, year: 2022, category: '动作', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Black+Panther+2' },
        { id: 4, title: '蚁人与黄蜂女：量子狂潮', rating: 7.9, year: 2023, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Ant-Man+3' },
        { id: 5, title: '雷霆沙赞！众神之怒', rating: 7.5, year: 2023, category: '动作', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Shazam+2' },
        { id: 6, title: '奎迪3', rating: 8.3, year: 2023, category: '剧情', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Creed+3' },
        { id: 7, title: '速度与激情10', rating: 7.2, year: 2023, category: '动作', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Fast+10' },
        { id: 8, title: '夺宝奇兵5', rating: 7.8, year: 2023, category: '冒险', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Indiana+Jones+5' },
        { id: 9, title: '变形金刚：超能勇士崛起', rating: 7.0, year: 2023, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Transformers+Rise' },
        { id: 10, title: '蜘蛛侠：纵横宇宙', rating: 9.0, year: 2023, category: '动画', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Spider-Man+Across' },
        { id: 11, title: '小美人鱼', rating: 6.8, year: 2023, category: '爱情', image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Little+Mermaid' },
        { id: 12, title: '碟中谍7：致命清算', rating: 8.5, year: 2023, category: '动作', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Mission+Impossible+7' },
        { id: 13, title: '银河护卫队3', rating: 8.7, year: 2023, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Guardians+3' },
        { id: 14, title: '闪电侠', rating: 7.3, year: 2023, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=The+Flash' },
        { id: 15, title: '蜘蛛侠：英雄无归', rating: 8.2, year: 2021, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Spider-Man+No+Way+Home' },
        { id: 16, title: '奇异博士2', rating: 7.5, year: 2022, category: '科幻', image: 'https://via.placeholder.com/300x450/42b983/fff?text=Doctor+Strange+2' }
      ],
      selectedCategories: [],
      categories: ['动作', '科幻', '剧情', '爱情', '悬疑', '恐怖', '动画', '冒险'],
      selectedYear: '',
      years: [2023, 2022, 2021, 2020, 2019],
      ratingRange: [0, 10],
      sortBy: 'rating',
      currentPage: 1,
      pageSize: 8
    }
  },
  computed: {
    filteredMovies() {
      let result = this.movies.filter(movie => {
        // 分类筛选
        if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(movie.category)) {
          return false;
        }
        
        // 年份筛选
        if (this.selectedYear && movie.year !== this.selectedYear) {
          return false;
        }
        
        // 评分筛选
        if (movie.rating < this.ratingRange[0] || movie.rating > this.ratingRange[1]) {
          return false;
        }
        
        return true;
      });
      
      // 排序
      result.sort((a, b) => {
        if (this.sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (this.sortBy === 'year') {
          return b.year - a.year;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
      
      return result;
    },
    
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredMovies.slice(start, end);
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      // 回到顶部
      document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style scoped lang="scss">
.movie-list-page {
  .filters {
    .filter-section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      h3 {
        margin-top: 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
      }
      
      .el-checkbox {
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .movie-grid {
    margin-bottom: 30px;
    
    .el-col {
      margin-bottom: 20px;
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>