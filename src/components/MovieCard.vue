<template>
  <div class="movie-card" @click="viewDetails">
    <div class="movie-poster">
      <img :src="movie.image" :alt="movie.title">
      <div class="rating">
        <i class="el-icon-star-on"></i>
        {{ movie.rating }}
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
      this.$router.push(`/movie/${this.movie.id}`);
    }
  }
}
</script>

<style scoped lang="scss">
.movie-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .movie-poster {
    position: relative;
    
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .rating {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #ffd700;
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 12px;
    }
  }
  
  .movie-info {
    padding: 10px;
    
    .movie-title {
      margin: 0;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>