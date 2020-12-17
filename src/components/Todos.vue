/* eslint-disable vue/valid-template-root */
<template>
  <div>
    <div class="todos">
      <div
        v-bind:class="{'is-complete':todo.completed}"
        v-for="(todo, i) in allTodos"
        :key="todo.id"
        class="todo"
      >
        <h3>Task nr.: {{i}}</h3>
        <div class="loader" v-if="todo.loading">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <p v-else>
          <textarea @blur="updateTitle(todo)" :ref="'textarea' + todo.id" :value="todo.title"></textarea>
        </p>
        <span @click="deleteTodo(todo.id)" class="delete">Delete</span>
        <span @click="toggleComplete(todo)" class="complete">Complete</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo", "changeTitle"]),
    toggleComplete(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
        selfCreated: todo.selfCreated
      };
      this.updateTodo(updTodo);
    },
    updateTitle(todo) {
      const oldTitle = this.$refs['textarea' + todo.id][0]._value
      const newTitle = this.$refs['textarea' + todo.id][0].value
      const updTodo = {
        id: todo.id,
        title: newTitle,
        completed: todo.completed,
        selfCreated: todo.selfCreated
      };
      if(oldTitle !== newTitle) {
        this.changeTitle(updTodo);
      }

    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  margin-top: 30px
}
.todo:hover {
  transform: translateY(-10px)
}
.todo {
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
  background: #fbeec1;
  transition: 0.2s;
}
.todo:after {
  position: absolute;
  content: '';
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #8d8741b8;
  transition: 0.2s;
}
.is-complete:after {
  top: 0;
}
.todo h3 {
  margin: 0;
  padding: 5px 10px;
  background: #bc986a;
  font-weight: 500;
  color: #fff;
}
.todo textarea {
  padding: 60px 10px;
  text-transform: capitalize;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}
.todo span {
  position: absolute;
  bottom: 0;
  padding: 0 5px;
  margin: 5px;
  font-size: 14px;
  z-index: 99;
  color: #fff;
  transition: 0.2s;
  cursor: pointer;
}
.todo span.delete {
  right: 0;
  background: #b84841;
}
.todo span.complete {
  right: 60px;
  background: #b88341;
}
@media (max-width: 900px) {
  .todos {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}


/* loader */
.loader {
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 4px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
