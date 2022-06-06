# 컴포넌트 이벤트

> 이 페이지에서는 [컴포넌트 기초](/guide/essentials/component-basics)를 이미 읽었다고 가정합니다.
컴포넌트를 처음 사용하는 경우, 그 문서를 먼저 읽으십시오.

## 이벤트 발신 및 수신하기

컴포넌트는 내장 함수 `$emit`을 사용하여 템플릿 표현식(예: `v-on` 핸들러에서)에서 직접 사용자 정의 이벤트를 발신할 수 있습니다:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">클릭하기</button>
```

<div class="options-api">

`$emit()` 함수는 컴포넌트 인스턴스에서 `this.$emit()`로도 사용할 수 있습니다:

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
[props 케이싱](/guide/components/props.html#props-이름-케이싱)과 마찬가지로 템플릿에서 kebab-case 형식의 이벤트 리스너를 사용하는 것이 좋습니다.

:::tip
네이티브 DOM 이벤트와 달리 컴포넌트 이벤트 발신은 버블링되지 않습니다.
직계 자식 컴포넌트에서 발생하는 이벤트만 수신할 수 있습니다.
:::

## 이벤트 인자

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

그러면 인자 값이 해당 메소드의 첫 번째 파라미터로 전달됩니다:

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

## 발신되는 이벤트 선언하기

발신되는 이벤트는 <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits) 메크로를</span><span class="options-api">[`emits`](/api/options-state.html#emits) 옵션을</span> 통해 컴포넌트에서 명시적으로 선언될 수 있습니다.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])
</script>
```

함수에서 반환된 `emit`은 JavaScript에서 이벤트를 내보내는 데 사용할 수 있습니다.

`<script setup>`을 사용하지 않는 경우, 이벤트는 [`emits`](/api/options-state.html#emits) 옵션을 사용하여 선언되어야 하며 `emit` 함수는 `setup()` 컨텍스트에 노출됩니다:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
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

참조: [컴포넌트 Emits에 타입 지정하기](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

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

참조: [컴포넌트 Emits에 타입 지정하기](/guide/typescript/options-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>

선택 사항으로 컴포넌트가 작동하는 방식을 더 잘 문서화하기 위해 발신되는 모든 이벤트를 정의하는 것이 좋습니다.
또한 상위로부터 전달된 리스너는 [폴스루 속성](/guide/components/attrs.html#v-on-리스터-상속)에 의해 제외할 수 있습니다.

:::tip
네이티브 이벤트(예: `click`)가 `emits` 옵션에 정의된 경우 리스너는 이제 컴포넌트에서 발생하는 `click` 이벤트만 수신 대기하고 네이티브 `click` 이벤트에 더 이상 응답하지 않습니다.
:::

## 이벤트 유효성 검사

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

## `v-model`과 함께 사용하기

사용자 정의 이벤트는 `v-model`과 함께 작동하는 사용자 정의 입력을 생성하는 데 사용할 수도 있습니다.
다음 코드는:

```vue-html
<input v-model="searchText" />
```

다음과 동일합니다:

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

컴포넌트에서 사용될 때 `v-model`은 대신 다음을 수행합니다:

```vue-html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

이것이 실제로 작동하려면 컴포넌트 내부의 `<input>`이 다음을 충족해야 합니다:

- `value` 속성을 `modelValue` prop에 바인딩

- `input`에서 `update:modelValue` 이벤트로 새 값을 내보냅니다.

다음은 구현된 예제 입니다:

<div class="options-api">

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>

이제 `v-model`이 이 컴포넌트에서 완벽하게 작동해야 합니다:

```vue-html
<CustomInput v-model="searchText" />
```

<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDdXN0b21JbnB1dCBmcm9tICcuL0N1c3RvbUlucHV0LnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IEN1c3RvbUlucHV0IH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICfslYjrhZUhJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEN1c3RvbUlucHV0IHYtbW9kZWw9XCJtZXNzYWdlXCIgLz4ge3sgbWVzc2FnZSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkN1c3RvbUlucHV0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ21vZGVsVmFsdWUnXSxcbiAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0XG4gICAgOnZhbHVlPVwibW9kZWxWYWx1ZVwiXG4gICAgQGlucHV0PVwiJGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDdXN0b21JbnB1dCBmcm9tICcuL0N1c3RvbUlucHV0LnZ1ZSdcbiAgXG5jb25zdCBtZXNzYWdlID0gcmVmKCfslYjrhZUhJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDdXN0b21JbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIC8+IHt7IG1lc3NhZ2UgfX1cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDdXN0b21JbnB1dC52dWUiOiI8c2NyaXB0IHNldHVwPlxuZGVmaW5lUHJvcHMoWydtb2RlbFZhbHVlJ10pXG5kZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICA6dmFsdWU9XCJtb2RlbFZhbHVlXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

</div>

이 컴포넌트 내에서 `v-model`을 구현하는 또 다른 방법은 getter와 setter 모두와 함께 쓰기 가능한 `computed` 속성을 사용하는 것입니다.
`get` 메서드는 `modelValue` 속성을 반환해야 하고 `set` 메서드는 해당 이벤트를 내보내야 합니다:

<div class="options-api">

```vue
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

</div>
<div class="composition-api">

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <input v-model="value" />
</template>
```

</div>

### `v-model` 인자

기본적으로 컴포넌트의 `v-model`은 `modelValue`를 prop으로 사용하고, `update:modelValue`를 이벤트로 사용합니다.
`v-model`에 인자를 전달하여 이러한 이름을 수정할 수 있습니다.

```vue-html
<MyComponent v-model:title="bookTitle" />
```

이 경우 하위 컴포넌트는 `title` prop을 예상하고 `update:title` 이벤트를 내보내 상위 값을 업데이트해야 합니다:

<div class="composition-api">

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5jb25zdCB0aXRsZSA9IHJlZigndi1tb2RlbCDsnbjsnpDsl5Ag64yA7ZWcIOyYiOygnCcpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgdGl0bGUgfX08L2gxPlxuICA8TXlDb21wb25lbnQgdi1tb2RlbDp0aXRsZT1cInRpdGxlXCIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0IHNldHVwPlxuZGVmaW5lUHJvcHMoWyd0aXRsZSddKVxuZGVmaW5lRW1pdHMoWyd1cGRhdGU6dGl0bGUnXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dFxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICA6dmFsdWU9XCJ0aXRsZVwiXG4gICAgQGlucHV0PVwiJGVtaXQoJ3VwZGF0ZTp0aXRsZScsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgLz5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="options-api">

```vue
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IE15Q29tcG9uZW50IH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAndi1tb2RlbCDsnbjsnpDsl5Ag64yA7ZWcIOyYiOygnCdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoMT57eyB0aXRsZSB9fTwvaDE+XG4gIDxNeUNvbXBvbmVudCB2LW1vZGVsOnRpdGxlPVwidGl0bGVcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIk15Q29tcG9uZW50LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ3RpdGxlJ10sXG4gIGVtaXRzOiBbJ3VwZGF0ZTp0aXRsZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwidGl0bGVcIlxuICAgIEBpbnB1dD1cIiRlbWl0KCd1cGRhdGU6dGl0bGUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

</div>

### `v-model` 다중 바인딩

이전에 [`v-model` 인자](#v-model-인자)에서 배운 것처럼, 특정 prop과 이벤트를 대상으로 하는 기능을 활용하면 이제 단일 컴포넌트 인스턴스에 여러 `v-model` 바인딩을 만들 수 있습니다.

각 `v-model`은 컴포넌트에 추가 옵션이 필요 없이 다른 prop과 동기화됩니다:

```vue-html
<UserName
  v-model:first-name="firstName"
  v-model:last-name="lastName"
/>
```

<div class="composition-api">

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBVc2VyTmFtZSBmcm9tICcuL1VzZXJOYW1lLnZ1ZSdcblxuY29uc3QgZmlyc3ROYW1lID0gcmVmKCdKb2huJylcbmNvbnN0IGxhc3ROYW1lID1yZWYoJ0RvZScpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgZmlyc3ROYW1lIH19IHt7IGxhc3ROYW1lIH19PC9oMT5cbiAgPFVzZXJOYW1lXG4gICAgdi1tb2RlbDpmaXJzdC1uYW1lPVwiZmlyc3ROYW1lXCJcbiAgICB2LW1vZGVsOmxhc3QtbmFtZT1cImxhc3ROYW1lXCJcbiAgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlVzZXJOYW1lLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyh7XG4gIGZpcnN0TmFtZTogU3RyaW5nLFxuICBsYXN0TmFtZTogU3RyaW5nXG59KVxuXG5kZWZpbmVFbWl0cyhbJ3VwZGF0ZTpmaXJzdE5hbWUnLCAndXBkYXRlOmxhc3ROYW1lJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwiZmlyc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmZpcnN0TmFtZScsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgLz5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIDp2YWx1ZT1cImxhc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmxhc3ROYW1lJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="options-api">

```vue
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBVc2VyTmFtZSBmcm9tICcuL1VzZXJOYW1lLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IFVzZXJOYW1lIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgbGFzdE5hbWU6ICdEb2UnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgZmlyc3ROYW1lIH19IHt7IGxhc3ROYW1lIH19PC9oMT5cbiAgPFVzZXJOYW1lXG4gICAgdi1tb2RlbDpmaXJzdC1uYW1lPVwiZmlyc3ROYW1lXCJcbiAgICB2LW1vZGVsOmxhc3QtbmFtZT1cImxhc3ROYW1lXCJcbiAgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlVzZXJOYW1lLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG5cdCAgZmlyc3ROYW1lOiBTdHJpbmcsXG4gIFx0bGFzdE5hbWU6IFN0cmluZ1xuXHR9LFxuICBlbWl0czogWyd1cGRhdGU6Zmlyc3ROYW1lJywgJ3VwZGF0ZTpsYXN0TmFtZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwiZmlyc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmZpcnN0TmFtZScsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgLz5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIDp2YWx1ZT1cImxhc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmxhc3ROYW1lJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

### `v-model` 수식어 핸들링

폼 입력 바인딩에 대해 배울 때, `v-model`에 `.trim`, `.number` 및 `.lazy`와 같은 [빌트인 수식어](/guide/essentials/forms.html#수식어)가 있었습니다.
그러나 경우에 따라 고유한 사용자 지정 수식어를 추가할 수도 있습니다.

`v-model` 바인딩으로 제공하는 문자열의 첫 글자를 대문자로 표시하는 사용자 지정 수식어 `capitalize`의 예를 만들어 보겠습니다:

```vue-html
<MyComponent v-model.capitalize="myText" />
```

컴포넌트 `v-model`에 추가된 수식어는 `modelModifiers` prop을 통해 컴포넌트에 제공됩니다.
아래 예제에서 우리는 기본적으로 빈 객체로 지정되는 `modelModifiers` prop을 포함하는 컴포넌트를 만들었습니다:

<div class="composition-api">

```vue{4,9}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

defineEmits(['update:modelValue'])

console.log(props.modelModifiers) // { capitalize: true }
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>
<div class="options-api">

```vue{11}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

</div>

컴포넌트의 `modelModifiers` prop에는 `capitalize`가 포함되어 있고 그 값은 `true`인데, `v-model` 바인딩 시 `v-model.capitalize="myText"`에 의해서 설정되었기 때문입니다.

이제 `modelModifiers` 객체의 키를 확인하고 전달된 값을 변경하는 핸들러를 작성할 수 있습니다.
아래 코드에서는 `<input />` 엘리먼트가 `input` 이벤트를 발생시킬 때마다 문자열을 대문자로 표시합니다.

<div class="composition-api">

```vue{11-13}
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5jb25zdCBteVRleHQgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICDsnbQg7J6F66Cl7J2AIOyeheugpe2VmOuKlCDrqqjrk6Ag7ZWt66qp7J2EIOuMgOusuOyekOuhnCDtkZzsi5ztlanri4jri6Q6XG4gIDxNeUNvbXBvbmVudCB2LW1vZGVsLmNhcGl0YWxpemU9XCJteVRleHRcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIk15Q29tcG9uZW50LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgbW9kZWxWYWx1ZTogU3RyaW5nLFxuICBtb2RlbE1vZGlmaWVyczogeyBkZWZhdWx0OiAoKSA9PiAoe30pIH1cbn0pXG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pXG5cbmZ1bmN0aW9uIGVtaXRWYWx1ZShlKSB7XG4gIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gIGlmIChwcm9wcy5tb2RlbE1vZGlmaWVycy5jYXBpdGFsaXplKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpXG4gIH1cbiAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIDp2YWx1ZT1cIm1vZGVsVmFsdWVcIiBAaW5wdXQ9XCJlbWl0VmFsdWVcIiAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="options-api">

```vue{13-15}
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgTXlDb21wb25lbnQgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXlUZXh0OiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAg7J20IOyeheugpeydgCDsnoXroKXtlZjripQg66qo65OgIO2VreuqqeydhCDrjIDrrLjsnpDroZwg7ZGc7Iuc7ZWp64uI64ukOlxuICA8TXlDb21wb25lbnQgdi1tb2RlbC5jYXBpdGFsaXplPVwibXlUZXh0XCIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IFN0cmluZyxcbiAgICBtb2RlbE1vZGlmaWVyczoge1xuICAgICAgZGVmYXVsdDogKCkgPT4gKHt9KVxuICAgIH1cbiAgfSxcbiAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnXSxcbiAgbWV0aG9kczoge1xuICAgIGVtaXRWYWx1ZShlKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgaWYgKHRoaXMubW9kZWxNb2RpZmllcnMuY2FwaXRhbGl6ZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIiA6dmFsdWU9XCJtb2RlbFZhbHVlXCIgQGlucHV0PVwiZW1pdFZhbHVlXCIgLz5cbjwvdGVtcGxhdGU+In0=)

</div>

인자와 수식어가 모두 있는 `v-model` 바인딩의 경우, 생성된 prop 이름은 `인자이름 + "Modifiers"`가 됩니다.
예를 들어:

```vue-html
<MyComponent v-model:title.capitalize="myText">
```

해당 선언은 다음과 같습니다:

<div class="composition-api">

```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

</div>
<div class="options-api">

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

</div>
