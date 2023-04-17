<script setup lang="ts">
import { useField } from 'vee-validate';
import * as yup from 'yup'

const props = defineProps({
  comment: {
    type: String,
    required: true
  }
})

const {errorMessage, value} = useField(()=>props.comment, yup.string().required().min(0))

</script>
<template>
  <v-textarea 
    clearable 
    v-model="value" 
    clear-icon="mdi-close-circle"
    label="Comment"
    v-bind:error-messages="errorMessage"
  />
</template>
<style scoped>
</style>