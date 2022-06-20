# Emits

자식 컴포넌트는 부모로부터 props를 받는 것 뿐만 아니라 이벤트를 emit(발송)할 수도 있습니다:

<div class="composition-api">
<div class="sfc">

```vue
<script setup>
// emit할 이벤트 선언
const emit = defineEmits(['response'])

// 인자와 함께 emit
emit('response', '자식 컴포넌트로부터 🌷를 받았어요!')
</script>
```

</div>

<div class="html">

```js
export default {
  // emit할 이벤트 선언
  emits: ['response'],
  setup(props, { emit }) {
    // 인자와 함께 emit
    emit('response', '자식 컴포넌트로부터 🌷를 받았어요!')
  }
}
```

</div>

</div>

<div class="options-api">

```js
export default {
  // emit할 이벤트 선언
  emits: ['response'],
  created() {
    // 인자와 함께 emit
    this.$emit('response', '자식 컴포넌트로부터 🌷를 받았어요!')
  }
}
```

</div>

<span class="options-api">`this.$emit()`</span><span class="composition-api">`emit()`</span>의 첫 번째 인자는 이벤트 이름입니다.
이후 추가되는 모든 인자는 이벤트 리스너에 전달됩니다.

부모는 `v-on`을 사용하여 자식이 발송한 이벤트를 수신할 수 있습니다.
아래 예시 코드는 자식이 이벤트를 발송할 때 추가한 인자를 핸들러에서 받아 로컬 상태에 할당한 것입니다:

<div class="sfc">

```vue-html
<ChildComp @response="(msg) => childMsg = msg" />
```

</div>
<div class="html">

```vue-html
<child-comp @response="(msg) => childMsg = msg"></child-comp>
```

</div>

자식 컴포넌트가 `response` 이벤트에 메시지 인자를 추가하여 발송하고 있습니다.
부모 컴포넌트에서 해당 이벤트를 수신하고,
메세지 인자를 `childMsg`에 적용해봅시다!
