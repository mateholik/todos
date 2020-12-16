<template>
  <div>
    <div class="add">
      <form @submit="onSubmit">
        <input @focus="error = false" type="text" v-model="title" placeholder="Type todo..." />
        <button type="submit">
          <span v-if="!searchLoader">Add todo</span>
          <span v-else>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </span>
        </button>
      </form>
        <p class="error" v-show="error">Please fill the input</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addTodo",
  data() {
    return {
      title: "",
      error: false
    };
  },
  computed: mapGetters(['searchLoader']),
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      if(this.title != '') {
        this.addTodo(this.title);
        this.title = ''
      } else {
        this.error = true
      }

    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #659dbd;
  outline: 0;
}
button[type="submit"] {
  flex: 2;
  min-width: 80px;
  background: #659dbd;
  color: #fff;
  border: 1px #659dbd solid;
  cursor: pointer;
  outline: none;
}
.error {
  color: red;
  margin: 0;
  margin-top: 5px;
  font-size: 14px
}
/* loader */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 2px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
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
