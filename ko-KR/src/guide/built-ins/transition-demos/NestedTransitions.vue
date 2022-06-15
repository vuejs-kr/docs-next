<script setup>
let show = $ref(true)
</script>

<template>
  <div class="demo">
    <button @click="show = !show" style="margin-bottom: 20px">토글</button>
    <Transition duration="550" name="nested">
      <div v-if="show" class="transition-demo-outer">
        <div class="transition-demo-inner">안녕</div>
      </div>
    </Transition>
  </div>
</template>

<style>
.transition-demo-outer,
.transition-demo-inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.transition-demo-inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* 부모 엘리먼트의 지연된 진출 */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* 중첩 셀렉터를 사용하여 중첩(자식) 엘리먼트를 트랜지션할 수도 있습니다. */
.nested-enter-active .transition-demo-inner,
.nested-leave-active .transition-demo-inner {
  transition: all 0.3s ease-in-out;
}
/* 중첩된(자식) 엘리먼트의 지연된 진입 */
.nested-enter-active .transition-demo-inner {
  transition-delay: 0.25s;
}

.nested-enter-from .transition-demo-inner,
.nested-leave-to .transition-demo-inner {
  transform: translateX(30px);
  /*
    중첩된 불투명도 트랜지션을 처리할 때 Chrome 96 버그 해결 핵.
    버그가 수정된 다른 브라우저나 Chrome 99+에서는 필요하지 않습니다.
  */
  opacity: 0.001;
}
</style>
