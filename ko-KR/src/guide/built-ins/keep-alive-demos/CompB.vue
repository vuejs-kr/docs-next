<script setup>
let msg = $ref('')
</script>

<template>
  <p>현재 컴포넌트: B</p>
  <span style="margin-right:20px;">메세지: {{ msg }}</span>
  <input v-model="msg">
</template>
