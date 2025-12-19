<template>
  <div class="movie-detail">
    <el-skeleton :loading="loading" animated :rows="10">
      <div v-if="!loading">
        <el-row :gutter="30">
          <!-- 电影海报 -->
          <el-col :span="8">
            <div class="movie-poster">
              <img :src="movie.poster" :alt="movie.title">
            </div>
          </el-col>
          
          <!-- 电影信息 -->
          <el-col :span="16">
            <div class="movie-info">
              <h1>{{ movie.title }} <span class="year">({{ movie.year }})</span></h1>
              
              <div class="basic-info">
                <el-tag v-for="genre in movie.genres" :key="genre" type="info">{{ genre }}</el-tag>
                <span class="duration">{{ movie.duration }}</span>
                <span class="release-date">{{ movie.releaseDate }}</span>
              </div>
              
              <div class="rating-section">
                <div class="rating-score">
                  <span class="score">{{ movie.rating }}</span>
                  <span class="desc">豆瓣评分</span>
                </div>
                
                <div class="rating-stars">
                  <el-rate
                    v-model="movie.rating / 2"
                    disabled
                    show-score
                    score-template="{value}">
                  </el-rate>
                </div>
              </div>
              
              <div class="actions">
                <el-button type="primary" icon="el-icon-video-play" size="large">立即观看</el-button>
                <el-button :type="isFavorite ? 'danger' : 'default'" 
                          :icon="isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"
                          @click="toggleFavorite">
                  {{ isFavorite ? '已收藏' : '收藏' }}
                </el-button>
              </div>
              
              <div class="director">
                <span class="label">导演：</span>
                <span>{{ movie.director }}</span>
              </div>
              
              <div class="cast">
                <span class="label">主演：</span>
                <span>{{ movie.cast }}</span>
              </div>
              
              <div class="plot">
                <h3>剧情简介</h3>
                <p>{{ movie.plot }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        
        <!-- 评论区 -->
        <div class="comments-section">
          <h2>评论 ({{ comments.length }})</h2>
          
          <div class="comment-form">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="写下你的评论..."
              v-model="newComment">
            </el-input>
            <div class="comment-actions">
              <el-button type="primary" @click="submitComment">发表评论</el-button>
            </div>
          </div>
          
          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-avatar">
                <el-avatar :src="comment.avatar"></el-avatar>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-time">{{ comment.time }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
                <div class="comment-footer">
                  <el-button type="text" icon="el-icon-thumb">点赞 ({{ comment.likes }})</el-button>
                  <el-button type="text" icon="el-icon-chat-dot-round">回复</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data() {
    return {
      loading: true,
      movie: {},
      isFavorite: false,
      newComment: '',
      comments: [
        {
          id: 1,
          author: '张三',
          avatar: 'https://via.placeholder.com/40x40/409EFF/fff?text=Z',
          time: '2023-05-10',
          content: '这部电影真是太棒了！视觉效果震撼，故事情节紧凑，强烈推荐！',
          likes: 24
        },
        {
          id: 2,
          author: '李四',
          avatar: 'https://via.placeholder.com/40x40/67C23A/fff?text=L',
          time: '2023-05-08',
          content: '特效确实不错，但是剧情略显老套，总体来说还是值得一看的。',
          likes: 12
        }
      ]
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$message({
        message: this.isFavorite ? '收藏成功' : '取消收藏',
        type: this.isFavorite ? 'success' : 'info'
      });
    },
    submitComment() {
      if (!this.newComment.trim()) {
        this.$message.warning('请输入评论内容');
        return;
      }
      
      const comment = {
        id: this.comments.length + 1,
        author: '我',
        avatar: 'https://via.placeholder.com/40x40/F56C6C/fff?text=M',
        time: new Date().toLocaleDateString(),
        content: this.newComment,
        likes: 0
      };
      
      this.comments.unshift(comment);
      this.newComment = '';
      this.$message.success('评论发表成功');
    }
  },
  mounted() {
    // 模拟数据加载
    setTimeout(() => {
      this.movie = {
        id: this.$route.params.id,
        title: '阿凡达：水之道',
        year: 2022,
        genres: ['科幻', '动作', '冒险'],
        duration: '192分钟',
        releaseDate: '2022-12-16',
        rating: 9.2,
        poster: 'https://via.placeholder.com/300x450/42b983/fff?text=Avatar+2',
        director: '詹姆斯·卡梅隆',
        cast: '萨姆·沃辛顿, 佐伊·索尔达娜, 西格妮·韦弗, 史蒂芬·朗, 克利夫·柯蒂斯',
        plot: '影片设定在《阿凡达》的剧情落幕十余年之后，讲述了曾经的地球残疾军人杰克·萨利，如今已经是潘多拉星球的纳美族酋长，他与奈提莉组建了家庭，育有一对可爱的儿女。然而，新的威胁再次降临，杰克必须带领族人保卫家园，与入侵的人类展开史诗般的战斗。这一次，他们不仅要保卫陆地，还要保卫海洋，开启全新的冒险篇章。'
      };
      this.loading = false;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.movie-detail {
  .movie-poster {
    img {
      width: 100%;
      border-radius: 5px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  
  .movie-info {
    h1 {
      margin-top: 0;
      margin-bottom: 15px;
      
      .year {
        color: #999;
        font-size: 24px;
      }
    }
    
    .basic-info {
      margin-bottom: 20px;
      
      .el-tag {
        margin-right: 10px;
      }
      
      span {
        margin-right: 15px;
        color: #666;
      }
    }
    
    .rating-section {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 5px;
      
      .rating-score {
        margin-right: 30px;
        text-align: center;
        
        .score {
          display: block;
          font-size: 36px;
          font-weight: bold;
          color: #409EFF;
        }
        
        .desc {
          font-size: 14px;
          color: #999;
        }
      }
    }
    
    .actions {
      margin-bottom: 20px;
      
      .el-button {
        margin-right: 10px;
      }
    }
    
    .label {
      font-weight: bold;
      margin-right: 10px;
    }
    
    .director, .cast {
      margin-bottom: 15px;
    }
    
    .plot {
      h3 {
        margin-top: 30px;
        margin-bottom: 15px;
      }
      
      p {
        line-height: 1.6;
        color: #333;
      }
    }
  }
  
  .comments-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    
    h2 {
      margin-bottom: 20px;
    }
    
    .comment-form {
      margin-bottom: 30px;
      
      .comment-actions {
        margin-top: 15px;
        text-align: right;
      }
    }
    
    .comment-item {
      display: flex;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      
      .comment-avatar {
        margin-right: 15px;
      }
      
      .comment-content {
        flex: 1;
        
        .comment-header {
          margin-bottom: 10px;
          
          .comment-author {
            font-weight: bold;
            margin-right: 15px;
          }
          
          .comment-time {
            color: #999;
            font-size: 14px;
          }
        }
        
        .comment-text {
          margin-bottom: 10px;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>