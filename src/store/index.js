import Vuex from 'vuex'
import Vue from 'vue'
import todos from './modules/todos'

//LOAD VUEX
Vue.use(Vuex);

//CREATE STORE
export default new Vuex.Store({
  modules: {
    todos
  }
})