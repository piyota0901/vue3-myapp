<script setup lang="ts">
import { reactive,provide } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type {Todo} from './interfaces';
import TodoList from './components/TodoList.vue';
import AddTodo from './components/AddTodo.vue';


const todoList = new Map<string, Todo>();
const initTodo1 = {
  id: uuidv4(),
  title: 'sample',
  comment: 'サンプルタスクです',
  isDone: false,
  create_at: '2023-03-25'
}
const initTodo2 = {
  id: uuidv4(),
  title: 'sample2',
  comment: 'サンプルタスクです',
  isDone: false,
  create_at: '2023-03-25'
}
const initTodo3 = {
  id: uuidv4(),
  title: 'sample3',
  comment: 'サンプルタスクです',
  isDone: false,
  create_at: '2023-03-25'
}

todoList.set(initTodo1.id, initTodo1);
todoList.set(initTodo2.id, initTodo2);
todoList.set(initTodo3.id, initTodo3);

provide("todoList", reactive(todoList))

</script>
<template>
  <v-app>
    <!-- header -->
    <v-app-bar
      color="cyan darken-1"
      density="compact"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title
        class="text-white"
      >
      Todo Management Application
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <!-- main -->
    <!-- Todo List表示-->
    <v-main>
      <TodoList />
    <!-- Add Todo表示-->
      <AddTodo />
  </v-main>
  </v-app>
</template>
<style scoped>
.todo {
  border: 1px gray solid;
}
</style>