<script setup lang="ts">
import { inject,ref,computed } from 'vue';
import type {Todo,EditTodo} from '@/interfaces';
import TodoEditDialog from './TodoEditDialog.vue';
import type { Ref } from 'vue';
const todoList = inject("todoList") as Map<string, Todo>;



const editDialog = ref<boolean>(false);
const removeDialog = ref<boolean>(false);
const currentTodo = ref<Todo>();


const onClickEdit = (todo: Todo) => {
  currentTodo.value = todo
  editDialog.value = true
}

const onClickRemove = (todo: Todo) => {
  currentTodo.value = todo
  removeDialog.value = true
}

const onEditCancel = () => { editDialog.value = false }
const onEditExecute = (edited_todo: Ref<EditTodo>): void => {
  console.log("called onEditExecute!!!")
  let old_todo = todoList.get(edited_todo.value.id)!;

  old_todo.title = edited_todo.value.title
  old_todo.comment = edited_todo.value.comment
  editDialog.value = false
}

const removeTodo = (todoId: string):void => {
  todoList.delete(todoId);
  removeDialog.value = false
}

</script>
<template>
  <p v-if="todoList.size == 0" class="d-flex justify-center">
    タスクはありません。
  </p>
  <v-card
    v-else
    class="mx-auto"
    max-width="600"
  >
    <v-list lines="two">
      <v-list-subheader>Todo List</v-list-subheader>
      <!-- Todo Item表示-->
      <template v-for="[id, todo] in todoList" :key="id">
        <v-divider v-show="todo != undefined"></v-divider>
        <v-list-item>
            <v-container>
              <v-row>
                <v-col cols="4" align-self="center">
                  {{ todo.title }}
                </v-col>
                <v-col cols="6" align-self="center">
                  {{ todo.comment }}
                </v-col>
                <v-col cols="2" align-self="center">
                  <v-checkbox
                    v-model="todo.isDone"
                    color="success"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <template v-slot:append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-pencil"
              variant="text"
              v-on:click="onClickEdit(todo)"
              ></v-btn>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-delete"
              variant="text"
              v-on:click="onClickRemove(todo)"
            ></v-btn>
            </template>
        </v-list-item>
    </template>
    </v-list>
    <v-dialog v-model="editDialog" v-if="currentTodo" max-width="300px">
      <TodoEditDialog 
        v-bind:todoId = "currentTodo.id"
        v-bind:dialog="editDialog"
        v-on:editCancel="onEditCancel"
        v-on:editExecute="onEditExecute"
      />
    </v-dialog>
    <v-dialog v-model="removeDialog" v-if="currentTodo" max-width="300px">
      <v-card>
        <v-card-text class="text-center">
          本当に削除しても良いですか。
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn 
                  class="text-none ms-4 text-white"
                  color="blue-darken-4"
                  variant="outlined" 
                  v-on:click="removeDialog=false"
                >Cancel
                </v-btn>
                <v-btn 
                  class="text-none ms-4 text-white"
                  color="blue-darken-4"          
                  variant="flat"
                  v-on:click="removeTodo(currentTodo!.id)"
                >Delete
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
     
  </v-card>
</template>
<style scoped>

</style>