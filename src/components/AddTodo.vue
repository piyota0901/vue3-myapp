<script setup lang="ts">
import { ref,inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '@/interfaces';

const todoList = inject("todoList") as Map<string, Todo>;

const addDialog = ref<boolean>(false);
const todo = ref<Todo>({
  id: '',
  title: '',
  comment: '',
  isDone: false,
  create_at: ''
})

const addTodo = ():void => {
  const newTodo: Todo = {
    id: uuidv4(),
    title: todo.value.title,
    comment: todo.value.comment,
    isDone: todo.value.isDone,
    create_at: date2string(new Date())
  }

  todoList.set(newTodo.id, newTodo);
  addDialog.value = false
  todo.value.title = ''
  todo.value.comment = ''
}

const date2string = (date: Date): string => {
  return date.getFullYear() + '-' + Number(date.getMonth()+1) + '-' + date.getDate()
}

</script>
<template>
  <v-row justify="center">
  <v-btn
    color="primary"
    class="ma-5"
    v-on:click="addDialog = true"
    >
    Add
    <v-icon
      end
      icon="mdi-plus-circle-outline"
    ></v-icon>
    </v-btn>
  </v-row>
  <v-dialog
    v-model="addDialog"
    width="auto"
  >
    <v-card>
      <form v-on:submit.prevent="addTodo">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
            v-model="todo.title"
            label="title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            v-model="todo.comment"
            label="comment"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="me-4" v-on:click="addDialog=false">Cancel</v-btn>
        <v-btn color="primary" class="me-4" type="submit">Add</v-btn>
      </v-card-actions>
    </form>
    </v-card>
  </v-dialog>
</template>
<style scoped>
</style>