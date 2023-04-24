<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'
import type {Todo} from '@/interfaces'

interface Props {
  todoId: string
}
const props = defineProps<Props>()

interface Emits {
  (event:"editClose"): void,
}
const emit = defineEmits<Emits>()

const todoStore = useTodoStore()
const currentTodo = {...todoStore.getById(props.todoId)}

const schema = yup.object({
  title: yup.string().required(),
  comment: yup.string().required()
});

const {handleSubmit} = useForm({
  validationSchema: schema
});

const {value: title, errorMessage: errorTitle} = useField('title', undefined, {initialValue: ''})
const {value: comment, errorMessage: errorComment} = useField('comment', undefined, {initialValue: ''})

const cancel = (): void => {
  emit("editClose");
};

const onSubmit = handleSubmit(values => {
  const updateTodo: Todo = {
    id: currentTodo.id,
    title: values.title,
    comment: values.comment,
    isDone: currentTodo.isDone,
    create_at: currentTodo.create_at
  }
  todoStore.update(updateTodo)
  emit("editClose");
  // 初期値に戻す
  title.value = ''
  comment.value = ''
  });

</script>
<template>
  <v-card>
    <v-card-title class="text-center text-decoration-underline">Edit Todo</v-card-title>
    <form v-on:submit="onSubmit">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field 
              v-bind:disabled="true"
            >{{ currentTodo.title }}
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            v-model="title"
            label="New Title"
            v-bind:error-messages="errorTitle"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-bind:disabled="true"
            >
            {{ currentTodo.comment }}
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            v-model="comment"
            label="New Comment"
            v-bind:error-messages="errorComment"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="me-4" v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" class="me-4" type="submit">Edit</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>
<style scoped>
</style>