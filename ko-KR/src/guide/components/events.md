<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>
# 컴포넌트 이벤트 {#component-events}

> 이 페이지에서는 [컴포넌트 기초](/guide/essentials/component-basics)를 이미 읽었다고 가정합니다.
컴포넌트를 처음 사용하는 경우, 그 문서를 먼저 읽으십시오.

## 이벤트 발신 및 수신하기 {#emitting-and-listening-to-events}

컴포넌트는 내장 메서드 `$emit`을 사용하여 템플릿 표현식(예: `v-on` 핸들러에서)에서 직접 사용자 정의 이벤트를 발신할 수 있습니다:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">클릭하기</button>
```

<div class="options-api">

`$emit()` 메소드는 컴포넌트 인스턴스에서 `this.$emit()`로도 사용할 수 있습니다:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

그러면 부모는 `v-on`을 사용하여 수신 할 수 있습니다:

```vue-html
<MyComponent @some-event="callback" />
```

`.once` 수식어는 컴포넌트 이벤트 리스너에서도 지원됩니다.

```vue-html
<MyComponent @some-event.once="callback" />
```


컴포넌트 및 props와 마찬가지로 이벤트 이름은 자동 대소문자 변환을 제공합니다.
우리는 camelCase 형식으로 이벤트를 발신했지만, 부모에서 kebab-case 표기로 리스너를 사용하여 이를 수신할 수 있습니다.
[props 케이싱](/guide/components/props.html#prop-name-casing)과 마찬가지로 템플릿에서 kebab-case 형식의 이벤트 리스너를 사용하는 것이 좋습니다.

:::tip
네이티브 DOM 이벤트와 달리 컴포넌트에서 방출되는 이벤트는 버블이 발생하지 않습니다. 직접 자식 컴포넌트에서 발생하는 이벤트만 수신할 수 있습니다. 형제 또는 깊게 중첩된 컴포넌트 간에 통신이 필요한 경우 외부 이벤트 버스 또는 [글로벌 상태 관리 솔루션](/guide/scaling-up/state-management.html)을 사용하세요.
:::

## 이벤트 인자 {#event-arguments}

이벤트와 함께 특정 값을 내보내는 것이 때때로 유용합니다.
예를 들어, `<BlogPost>` 컴포넌트가 텍스트를 얼마나 크게 확대할지 결정할 수 있습니다.
이러한 경우에는 `$emit`에 추가 인자를 전달하여 이 값을 제공할 수 있습니다:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

그런 다음 부모가 이벤트를 수신할 때 인라인 화살표 함수를 리스너로 사용할 수 있습니다.
이를 통해 이벤트 인자에 접근할 수 있습니다:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

또는 이벤트 핸들러가 메서드인 경우:

```vue-html
<MyButton @increase-by="increaseCount" />
```

그러면 인자 값이 해당 메서드의 첫 번째 파라미터로 전달됩니다:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
`$emit()`에서 이벤트 이름 뒤에 전달된 모든 추가 인자는 리스너로 전달됩니다.
예를 들어, `$emit('foo', 1, 2, 3)`을 사용하면 리스너 함수는 세 개의 인자를 받습니다.
:::

## 발신되는 이벤트 선언하기 {#declaring-emitted-events}

컴포넌트는 <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits) 매크로를</span><span class="options-api">[`emits`](/api/options-state.html#emits) 옵션을</span> 사용하여 명시적으로 방출할 이벤트를 선언할 수 있습니다:


<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

`<template>`에서 사용한 `$emit` 메서드는 컴포넌트의 `<script setup>` 섹션 내에서 접근할 수 없지만,
`defineEmits()`는 `$emit` 대신에 사용할 수 있는 동등한 함수를 반환합니다.

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` 매크로는 **함수 내에서 사용할 수 없으므로**,
위의 예제처럼 `<script setup>` 내에 직접 배치해야 합니다.

`<script setup>` 대신 명시적으로 `setup` 함수를 사용하는 경우,
이벤트는 [`emits`](/api/options-state.html#emits) 옵션을 사용하여 선언되어야 하며 `emit` 함수는 `setup()` 컨텍스트에 노출되어야 합니다:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

`setup()` 컨텍스트의 다른 속성과 마찬가지로 `emit`는 안전하게 분해할당할 수 있습니다:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```



다른 `setup()` 컨텍스트의 속성들 처럼, `emit` 역시 구조분해가 가능합니다.

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>

`emits` 옵션은 객체 구문도 지원하므로, 발신되는 이벤트의 전달 내용(payload)에 대한 런타임 유효성 검사를 수행할 수 있습니다:

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // `true` 또는 `false` 값을 반환하여
    // 유효성 검사 통과/실패 여부를 알려줌

    // 페이로드는 전달되는 인자를 나타내는 것으로
    // `emit('submit', 'a', 'b', 'c')`와 같이 3개의 인자를 전달하는 경우,
    // `submit(pl1, pl2, pl3) { /* 유효성 검사 반환 로직 */ }`과 같이
    // 유효성 검사에 페이로드를 사용할 수 있습니다.
  }
})
</script>
```

TypeScript를 `<script setup>`과 함께 사용하는 경우, 순수 타입스크립트 문법을 사용하여 발신되는 이벤트를 선언할 수도 있습니다:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

참고: [컴포넌트 Emits에 타입 지정하기](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // `true` 또는 `false` 값을 반환하여
      // 유효성 검사 통과/실패 여부를 알려줌

      // 페이로드는 전달되는 인자를 나타내는 것으로
      // `emit('submit', 'a', 'b', 'c')`와 같이 3개의 인자를 전달하는 경우,
      // `submit(pl1, pl2, pl3) { /* 유효성 검사 반환 로직 */ }`과 같이
      // 유효성 검사에 페이로드를 사용할 수 있습니다.
    }
  }
}
```

참고: [컴포넌트 Emits에 타입 지정하기](/guide/typescript/options-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>

선택 사항으로 컴포넌트가 작동하는 방식을 더 잘 문서화하기 위해 발신되는 모든 이벤트를 정의하는 것이 좋습니다.
또한 상위로부터 전달된 리스너는 [폴스루 속성](/guide/components/attrs.html#v-on-listener-inheritance)에 의해 제외할 수 있습니다.

:::tip
네이티브 이벤트(예: `click`)가 `emits` 옵션에 정의된 경우 리스너는 이제 컴포넌트에서 발생하는 `click` 이벤트만 수신 대기하고 네이티브 `click` 이벤트에 더 이상 응답하지 않습니다.
:::

## 이벤트 유효성 검사 {#events-validation}

props 타입 유효성 검사와 유사하게, 발신되는 이벤트는 배열 대신 객체 구문으로 정의된 경우 유효성을 검사할 수 있습니다.

유효성 검사를 추가하기 위해 이벤트에는 <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> 호출 시 전달되는 인자를 수신하고,
이벤트가 유효한지 여부를 나타내는 불리언 값을 반환하는 함수가 할당됩니다.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // 유효성 검사 없음
  click: null,

  // submit 이벤트 유효성 검사
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('submit 이벤트 페이로드가 옳지 않음!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // 유효성 검사 없음
    click: null,

    // submit 이벤트 유효성 검사
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('submit 이벤트 페이로드가 옳지 않음!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>

