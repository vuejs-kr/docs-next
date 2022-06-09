<script setup>
let show = $ref(true)
</script>

<template>
  <div class="demo">
    <button @click="show = !show">토글</button>
    <Transition name="bounce">
      <p v-if="show" style="margin-top: 20px; text-align: center;">
        안녕! 여기에 탄력적인 텍스트가 있어요!
      </p>
    </Transition>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
