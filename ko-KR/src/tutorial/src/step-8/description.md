# 계산된 속성

이전 단계의 할 일 목록을 계속 만들어 나가봅시다.
여기에 이미 각 할 일에 토글 기능을 추가했습니다.
이것은 각 할 일 객체에 `done` 속성을 추가하고,
`v-model`을 사용하여 체크박스에 바인딩함으로써 작동합니다.

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

다음 개선 사항은 이미 완료된 할 일을 숨길 수 있는 기능을 추가하는 것입니다.
이미 `hideCompleted` 상태를 토글하는 버튼이 있습니다.
하지만 그 상태를 바탕으로 목록 내 항목을 어떻게 렌더링해야 할까요?

<div class="options-api">

<a target="_blank" href="/guide/essentials/computed.html">계산된(computed) 속성</a>을 소개합니다.
`computed` 옵션을 사용하여 반응적으로 계산되는 속성을 선언할 수 있습니다:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted`를
      // 기반으로 필터링된 할 일 반환
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // `this.hideCompleted`를
      // 기반으로 필터링된 할 일 반환
    }
  }
})
```

</div>

</div>
<div class="composition-api">

<a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>를 소개합니다.
반응 데이터 소스를 기반으로 `.value`를 계산하는 계산된 참조(ref)를 만들 수 있습니다:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // `todos.value` 및 `hideCompleted.value`를
  // 기반으로 필터링된 할 일을 반환.
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // `todos.value` 및 `hideCompleted.value`를
      // 기반으로 필터링된 할 일을 반환.
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

계산된 속성은 계산에 사용된 다른 반응형 상태를 종속성으로 추적합니다.
결과를 캐시하고 종속성이 변경되면 자동으로 업데이트합니다.

이제 계산된 속성 `filteredTodos`을 추가하고, 계산되는 로직을 구현해 봅시다!
올바르게 구현된 경우, 완료된 항목 숨기기 상태일 때 할 일을 채크하면 즉시 숨겨져야 합니다.
