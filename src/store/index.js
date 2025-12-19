import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    favoriteMovies: [],
    watchHistory: []
  },
  
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    
    ADD_FAVORITE(state, movie) {
      const exists = state.favoriteMovies.some(fav => fav.id === movie.id)
      if (!exists) {
        state.favoriteMovies.push(movie)
      }
    },
    
    REMOVE_FAVORITE(state, movieId) {
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== movieId)
    },
    
    ADD_TO_HISTORY(state, movie) {
      // 移除重复项
      state.watchHistory = state.watchHistory.filter(item => item.id !== movie.id)
      // 添加到开头
      state.watchHistory.unshift(movie)
      // 限制历史记录数量
      if (state.watchHistory.length > 100) {
        state.watchHistory.pop()
      }
    }
  },
  
  actions: {
    login({ commit }, user) {
      // 模拟登录
      commit('SET_USER', user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    
    logout({ commit }) {
      // 模拟登出
      commit('SET_USER', null)
      localStorage.removeItem('user')
    },
    
    toggleFavorite({ state, commit }, movie) {
      const isFavorite = state.favoriteMovies.some(fav => fav.id === movie.id)
      if (isFavorite) {
        commit('REMOVE_FAVORITE', movie.id)
      } else {
        commit('ADD_FAVORITE', movie)
      }
    }
  },
  
  getters: {
    isFavorite: (state) => (movieId) => {
      return state.favoriteMovies.some(movie => movie.id === movieId)
    },
    
    favoriteCount: (state) => {
      return state.favoriteMovies.length
    }
  }
})