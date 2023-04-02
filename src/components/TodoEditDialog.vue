<script setup lang="ts">
import { ref } from 'vue';
import type {Ref} from 'vue';
import type {Todo,EditTodo} from '@/interfaces';
import { inject } from 'vue';

interface Props {
  todoId: string
}

interface Emits {
  (event:"editCancel"): void,
  (event:"editExecute", edittedTodo: Ref<EditTodo>): void;
}

// const props = defineProps<Todo>();
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const editTodo: Ref<EditTodo> = ref({
  id: props.todoId,
  title: '',
  comment: ''
})

const todoList = inject("todoList") as Map<string, Todo>;
const todo = todoList.get(props.todoId) as Todo;

const cancel = (): void => {
  emit("editCancel");
};

const edit = (): void => {
  if(editTodo.value.title === '') {editTodo.value.title = todo.title};
  if(editTodo.value.comment === '') {editTodo.value.comment = todo.comment};
  emit("editExecute", editTodo)
}



console.log(props.todoId)

</script>
<template>
  <v-card
   max-width="600"
   max-height="400">
    <h1>Edit Todo</h1>
    <form v-on:submit.prevent="edit">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
            v-model="todo.title"
            v-bind:disabled="true"
            label="Title"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            v-model="editTodo.title"
            label="New Title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="todo.comment"
              v-bind:disabled="true"
              label="Comment"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            v-model="editTodo.comment"
            label="New Comment"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="me-4" v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" class="me-4" type="submit" v-on:click="edit">Edit</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>
<style scoped>
</style>