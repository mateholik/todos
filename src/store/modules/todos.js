// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const state = {
  todos: [],
  searchLoader: false
}

const getters = {
  allTodos: (state) => state.todos,
  searchLoader: (state) => state.searchLoader,
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    commit('setTodos', response.data)
  },
  async addTodo({ commit }, title) {
    commit('setSearchLoader', true)
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })
    //for update
    response.data.selfCreated = true
    commit('newTodo', response.data)
    commit('setSearchLoader', false)
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit('removeTodo', id)
  },
  // eslint-disable-next-line no-unused-vars
  async filterTodos({ commit }, e) {
    //GET SELECTED NUMBER
    const limit = e.target.options[e.target.options.selectedIndex].innerText * 1;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    commit('setTodos', response.data)
  },
  async updateTodo({ commit }, updTodo) {
    let updatedTodo;
    updatedTodo = {
      id: updTodo.id,
      loading: true
    };
    commit('updateTodo', updatedTodo)

    if(updTodo.selfCreated === true) {
      updatedTodo = {
        id: updTodo.id,
        title: updTodo.title,
        completed: updTodo.completed,
        selfCreated: true
      };
    } else {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
      updatedTodo = response.data
    }
    updatedTodo.loading = false
    commit('updateTodo', updatedTodo)
  },
  async changeTitle({ commit }, updTodo) {
    let updatedTodo;
    updatedTodo = {
      id: updTodo.id,
      loading: true
    };
    commit('updateTodo', updatedTodo)


    if(updTodo.selfCreated === true) {
      updatedTodo = {
        id: updTodo.id,
        title: updTodo.title,
        completed: updTodo.completed,
        selfCreated: true
      };
    } else {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
      updatedTodo = response.data
    }
    updatedTodo.loading = false
    commit('updateTodo', updatedTodo)
  }
}

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  setSearchLoader: (state, value) => (state.searchLoader = value),
  newTodo: (state, todo) => (state.todos.unshift(todo)),
  removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
