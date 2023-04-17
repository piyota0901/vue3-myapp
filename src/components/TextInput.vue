<script setup lang="ts">
import { useField } from 'vee-validate';
import * as yup from 'yup'

const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})

const { errorMessage,  value} = useField(() => props.title, yup.string().required().min(0));
</script>
<template>
  <v-text-field 
    v-model="value"
    label="Title"
    v-bind:error-messages="errorMessage"
  ></v-text-field>
</template>
<style scoped>
</style>