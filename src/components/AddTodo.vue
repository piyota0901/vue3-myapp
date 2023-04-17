<script setup lang="ts">
import { ref,inject } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import TextInput from './TextInput.vue';
import type { Todo } from '@/interfaces';
import { useForm } from 'vee-validate';
import type {InvalidSubmissionContext} from 'vee-validate';
import TextArea from './TextArea.vue';

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

  console.log("------------")

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


// Validation setting of vee-validate 
// form-level validation
const simpleSchema = {
  title(value: string) {
    if (value?.length >= 1) return true

    return 'Name needs to be at least 1 characters.'
  },
  comment(value: string) {
    if (value?.length >= 1) return true

    return 'Name needs to be at least 1 characters.'
  },
};

const {handleSubmit} = useForm({
  validationSchema: simpleSchema
});

const onInvalidSubmit = (value: InvalidSubmissionContext) => {
  console.log("value: ",value.values); // current form values
  console.log("errors:",value.errors); // a map of field names and their first error message
  console.log("results:",value.results); // a detailed map of field names and their validation results  
}

const onSubmit = handleSubmit(values => {},onInvalidSubmit);

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
  <!-- Dialog -->
    <v-card width="400">
      <v-form v-on:submit.prevent="onSubmit" ref="form">
        <v-container>
          <v-row>
            <v-col>
              <h4>新規登録</h4>
              <TextInput title="title" type="text" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <TextArea comment="comment" type="text" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            class="me-4" 
            v-on:click="addDialog=false"
          >
          Cancel
          </v-btn>
          <v-btn 
            color="primary" 
            class="me-4" 
            type="submit"
          >
          Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<style scoped>
</style>