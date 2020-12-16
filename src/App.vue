<template>
  <div id="app">
    <div class="container">
      <h1>Todo app</h1>
      <addTodo></addTodo>
      <filterTodos></filterTodos>
      <Todos></Todos>
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import FilterTodos from "./components/FilterTodos.vue";

export default {
  name: "App",
  components: {
    Todos,
    AddTodo,
    FilterTodos,
  },
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  background: #659dbd0d;
  -webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
h1 {
  text-align: center;
}
</style>
