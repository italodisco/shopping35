import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[]
  },
  getters: {
  },
  mutations: {
    SET_CATEGORIES(state, categories){
      state.categories = categories
    }
  },
  actions: {
   async fetchCategories({commit}){
    try{
let response = await fetch("https://fakestoreapi.com/products/categories")
let categories = await response.json()
commit ('SET_CATEGORIES', categories)
    }
    catch(error){
      console.log(error)
    }
    }
  },
  modules: {
  }
})
