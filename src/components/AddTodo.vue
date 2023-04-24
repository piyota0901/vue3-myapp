<script setup lang="ts">
import { ref } from 'vue';
import AddTodoDialog from '@/components/AddTodoDialog.vue'

const addDialog = ref<boolean>(false);

const onDialogClose = () => {
  addDialog.value = false
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
  <AddTodoDialog 
  v-on:dialogClose="onDialogClose"
  />
  </v-dialog>
</template>
<style scoped>
</style>