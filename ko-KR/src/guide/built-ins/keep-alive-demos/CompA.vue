<script setup>
let count = $ref(0)
</script>

<template>
  <p>현재 컴포넌트: A</p>
  <span style="margin-right:20px">카운트: {{ count }}</span>
  <button @click="count++">+</button>
</template>
