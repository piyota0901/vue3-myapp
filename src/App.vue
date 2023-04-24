<script setup lang="ts">
import {useTodoStore} from '@/stores/todo'
import TodoList from './components/TodoList.vue';
import AddTodo from './components/AddTodo.vue';

const todoStore = useTodoStore()
todoStore.initTodoList()

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
      <section>
        <TodoList />
      <!-- Add Todo表示-->
        <AddTodo />
      </section>
  </v-main>
  </v-app>
</template>
<style scoped>
.todo {
  border: 1px gray solid;
}
</style>