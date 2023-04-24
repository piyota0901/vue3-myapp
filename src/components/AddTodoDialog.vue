<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useTodoStore } from '@/stores/todo';
import * as yup from 'yup';

interface Emits {
  (event:"dialogClose"): void,
}
const emit = defineEmits<Emits>()
const onCancel = () => {
  emit("dialogClose")
}

const todoStore = useTodoStore();

const schema = yup.object({
  title: yup.string().required(),
  comment: yup.string().required()
});

const {handleSubmit} = useForm({
  validationSchema: schema
});

const {value: title, errorMessage: errorTitle} = useField('title', undefined, {initialValue: ''})
const {value: comment, errorMessage: errorComment} = useField('comment', undefined, {initialValue: ''})

const onSubmit = handleSubmit(values => {
  console.log(values);
  todoStore.add({
    title: title.value,
    comment: comment.value
  });
  // 初期値に戻す
  title.value = ''
  comment.value = ''
  emit("dialogClose")
  });
</script>
<template>
  <v-card width="400">
    <v-form v-on:submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col>
            <h4>新規登録</h4>
            <v-text-field 
              v-model="title"
              label="Title"
              v-bind:error-messages="errorTitle"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea 
              clearable 
              v-model="comment" 
              clear-icon="mdi-close-circle"
              label="Comment"
              :error-messages="errorComment"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          class="me-4" 
          v-on:click="onCancel"
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
</template>
<style scoped>
</style>