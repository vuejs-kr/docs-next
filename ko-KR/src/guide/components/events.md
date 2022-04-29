:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Component Events
# 컴포넌트 이벤트

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Free Vue.js Lesson on Defining Custom Events"/>
</div>

## Emitting and Listening to Events
## 이벤트 방출(emitting)과 수신

A component can emit custom events directly in template expressions (e.g. in a `v-on` handler) using the built-in `$emit` function:


컴포넌트는 내장 함수 `$emit` 를 사용하여 템플릿 표현식(예: `v-on` 핸들러에서)에서 바로 사용자 정의 이벤트를 방출할 수 있습니다:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

<div class="options-api">

The `$emit()` function is also available on the component instance as `this.$emit()`.

`$emit()` 함수는 컴포넌트 인스턴스에서 `this.$emit()` 로도 제공됩니다. 

</div>

The parent can then listen to it using `v-on`:

부모는 방출된 이벤트를  `v-on`을 이용해 수신 할 수 있습니다:

```vue-html
<MyComponent @some-event="callback" />
```

The `.once` modifier is also supported on component event listeners:

컴포넌트 이벤트 리스너에서도 `.once` 수정자가 지원됩니다. :

```vue-html
<MyComponent @some-event.once="callback" />
```

Like components and props, event names provide an automatic case transformation. Notice we emitted a camelCase event, but can listen for it using a kebab-cased listener in the parent. As with [props casing](/guide/components/props.html#prop-name-casing), we recommend using kebab-cased event listeners in templates.

컴포넌트 및 props과 마찬가지로 이벤트 이름에 대해  자동 케이스 변환을 제공합니다. 우리는 camelCase 형식의 이벤트를 내보냈지만 부모에서 kebab-cased 형식의 리스너를 사용하여 이를 수신할 수 있습니다. [props 케이싱](/guide/components/props.html#prop-name-casing)과 마찬가지로 템플릿에서는  케밥 케이스(kebak-cased) 이벤트 리스너를 사용하는 것이 좋습니다.


:::tip
Unlike native DOM events, component emitted events do **not** bubble. You can only listen to the events emitted by a direct child component.
:::

:::tip
네이티브 DOM 이벤트와 달리 컴포넌트에서 방출된 이벤트는 버블링 **되지 않습니다**. 직계 자식 컴포넌트에서 발생하는 이벤트만 수신할 수 있습니다.
:::

## Event Arguments
## 이벤트 인자

It's sometimes useful to emit a specific value with an event. For example, we may want the `<BlogPost>` component to be in charge of how much to enlarge the text by. In those cases, we can pass extra arguments to `$emit` to provide this value:

이벤트와 함께 특정 값을 내보내는 것이 때때로 유용합니다. 예를 들어, `<BlogPost>` 컴포넌트가 텍스트를 얼마나 크게 확대할지 결정할 수 있습니다. 이러한 경우에는 `$emit`에 추가 인자를 전달하여 이 값을 제공할 수 있습니다.


```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

Then, when we listen to the event in the parent, we can use an inline arrow function as the listener, which allows us to access the event argument:

그런 다음 부모에서 이벤트를 수신할 때 인라인 화살표 함수를 리스너로 사용할 수 있습니다. 이를 통해 이벤트 인자에에 액세스할 수 있습니다.


```vue-html
<MyButton @increase-by="(n) => count += n" />
```

Or, if the event handler is a method:

또는 이벤트 핸들러로 메소드를 사용 할 수 있습니다:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Then the value will be passed as the first parameter of that method:

메소드 호출의 첫번째 파라메터로 값이 전달됩니다: 

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
All extra arguments passed to `$emit()` after the event name will be forwarded to the listener. For example, with `$emit('foo', 1, 2, 3)` the listener function will receive three arguments.
:::


:::tip
이벤트 이름 뒤에 `$emit()`에 전달된 모든 추가 인자는 리스너로 전달됩니다. 예를 들어, `$emit('foo', 1, 2, 3)`을 사용하면 리스너 함수는 세 개의 인자를 받습니다.
:::

## Declaring Emitted Events
## 방출 이벤트 선언하기


Emitted events can be explicitly declared on the component via the <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span><span class="options-api">[`emits`](/api/options-state.html#emits) option</span>.

컴포넌트에서 방출 할 수 있는 이벤트를 <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup.html#defineprops-defineemits) 매크로</span><span class="options-api">[`emits`](/api/options-state.html#emits) 옵션</span> 을 사용해 명시적으로 선언 할 수 있습니다. 

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])
</script>
```

The returned `emit` function can be used to emit events in JavaScript.

반환된 `emit` 함수로 자바스크립트내에서 이벤트를 방출 할 수 있습니다. 

If not using `<script setup>`, events should be declared using the [`emits`](/api/options-state.html#emits) option, and the `emit` function is exposed on the `setup()` context:

`<script setup>`을 사용하지 않는 경우 이벤트는 [`emits`](/api/options-state.html#emits) 옵션을 사용하여 선언되어야 하며 `emit` 함수는 `setup()` context 에 노출됩니다:


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

The `emits` option also supports an object syntax, which allows us to perform runtime validation of the payload of the emitted events:

`emits` 옵션은 객체 구문 지원을 통해, 방출된 이벤트의 페이로드에 대한 런타임 유효성 검사를 수행할 수 있습니다.


<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  submit(payload) {
    // return `true` or `false` to indicate
    // validation pass / fail
    // `true` 또는 `false`를 반환하여 검증에 성공/실패 했는지 알려줌 
  }
})
</script>
```

If you are using TypeScript with `<script setup>`, it's also possible to declare emitted events using pure type annotations:

TypeScript를 `<script setup>`과 함께 사용하는 경우 순수 유형 주석을 사용하여 방출된 이벤트를 선언할 수도 있습니다.


```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

More details: [Typing Component Emits](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

참조: [Component Emits에 타입 지정하기](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload) {
      // return `true` or `false` to indicate
      // validation pass / fail
    }
  }
}
```

See also: [Typing Component Emits](/guide/typescript/options-api.html#typing-component-emits) <sup class="vt-badge ts" />

참조: [Component Emits에 타입 지정하기](/guide/typescript/options-api.html#typing-component-emits) <sup class="vt-badge ts" />

</div>

Although optional, it is recommended to define all emitted events in order to better document how a component should work. It also allows Vue to exclude known listeners from [fallthrough attributes](/guide/components/attrs.html#v-on-listener-inheritance).

선택사항이긴 하지만 컴포넌트가 작동하는 방식을 더 잘 문서화하기 위해 방출된 모든 이벤트를 정의하는 것이 좋습니다. 또한 Vue는 [fallthrough 속성](/guide/components/attrs.html#v-on-listener-inheritance)에서 알려진 리스너를 제외할 수 있습니다.


:::tip
If a native event (e.g., `click`) is defined in the `emits` option, the listener will now only listen to component-emitted `click` events and no longer respond to native `click` events.
:::

:::tip
네이티브 이벤트(예: `click`)가 `emits` 옵션에 정의된 경우 리스너는 이제 컴포넌트에서 발생하는 `click` 이벤트만 수신 대기하고 네이티브 `click` 이벤트에 더 이상 응답하지 않습니다.
:::

## Events Validation

## 이벤트 검증

Similar to prop type validation, an emitted event can be validated if it is defined with the object syntax instead of the array syntax.

prop 타입 유효성 검사와 비슷하게 방출된 이벤트는 배열 구문이 아닌 객체 구문으로 정의된 경우 유효성을 검사할 수 있습니다.


To add validation, the event is assigned a function that receives the arguments passed to the <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> call and returns a boolean to indicate whether the event is valid or not.

유효성 검사를 추가하기 위해 이벤트에는 <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> 호출에 전달된 인자를 수신하고 이벤트가 유효한지 여부를 나타내는 부울 값을 반환하는 함수가 할당됩니다.


<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // No validation
  // 검증 없음 
  click: null,

  // Validate submit event
  // submit 이벤트 검증
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
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
    // No validation
    // 검증 없음 
    click: null,

    // Validate submit event
    // submit 이벤트 검증
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
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

## Usage with `v-model`

## `v-model`에서 사용

Custom events can also be used to create custom inputs that work with `v-model`. Remember that:

사용자 정의 이벤트는 'v-model'과 함께 작동하는 사용자 정의 input을 생성하는 데 사용할 수도 있습니다. 다음 코드가:


```vue-html
<input v-model="searchText" />
```

does the same thing as:

다음과 동일한 일을 합니다: 

```vue-html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

When used on a component, `v-model` instead does this:

컴포넌트에서 사용될 때 `v-model`은 대신 다음을 수행합니다: 


```vue-html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

For this to actually work though, the `<input>` inside the component must:

이것이 실제로 작동하려면 컴포넌트 내부의 `<input>`이 다음과 같아야 합니다: 

- Bind the `value` attribute to the `modelValue` prop
- `value` 속성을 `modelValue` prop에 바인딩
- On `input`, emit an `update:modelValue` event with the new value
- `input`에서 새 값으로 `update:modelValue` 이벤트를 내보냅니다.


Here's that in action:

예제를 봅니다: 

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

Now `v-model` should work perfectly with this component:


이제 `v-model`이 이 컴포넌트와 완벽하게 작동합니다: 


```vue-html
<CustomInput v-model="searchText" />
```

<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDdXN0b21JbnB1dCBmcm9tICcuL0N1c3RvbUlucHV0LnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IEN1c3RvbUlucHV0IH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDdXN0b21JbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIC8+IHt7IG1lc3NhZ2UgfX1cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkN1c3RvbUlucHV0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ21vZGVsVmFsdWUnXSxcbiAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0XG4gICAgOnZhbHVlPVwibW9kZWxWYWx1ZVwiXG4gICAgQGlucHV0PVwiJGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDdXN0b21JbnB1dCBmcm9tICcuL0N1c3RvbUlucHV0LnZ1ZSdcbiAgXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q3VzdG9tSW5wdXQgdi1tb2RlbD1cIm1lc3NhZ2VcIiAvPiB7eyBtZXNzYWdlIH19XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDdXN0b21JbnB1dC52dWUiOiI8c2NyaXB0IHNldHVwPlxuZGVmaW5lUHJvcHMoWydtb2RlbFZhbHVlJ10pXG5kZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICA6dmFsdWU9XCJtb2RlbFZhbHVlXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

</div>

Another way of implementing `v-model` within this component is to use a writable `computed` property with both a getter and a setter. The `get` method should return the `modelValue` property and the `set` method should emit the corresponding event:

이 컴포넌트 내에서 `v-model`을 구현하는 또 다른 방법은 getter와 setter 모두와 함께 쓰기 가능한 `computed` 속성을 사용하는 것입니다. `get` 메서드는 `modelValue` 속성을 반환해야 하고 `set` 메서드는 해당 이벤트를 내보내야 합니다.


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

### `v-model` arguments

By default, `v-model` on a component uses `modelValue` as the prop and `update:modelValue` as the event. We can modify these names passing an argument to `v-model`:

```vue-html
<MyComponent v-model:title="bookTitle" />
```

In this case, the child component should expect a `title` prop and emit an `update:title` event to update the parent value:

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5jb25zdCB0aXRsZSA9IHJlZigndi1tb2RlbCBhcmd1bWVudCBleGFtcGxlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoMT57eyB0aXRsZSB9fTwvaDE+XG4gIDxNeUNvbXBvbmVudCB2LW1vZGVsOnRpdGxlPVwidGl0bGVcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiTXlDb21wb25lbnQudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsndXBkYXRlOnRpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwidGl0bGVcIlxuICAgIEBpbnB1dD1cIiRlbWl0KCd1cGRhdGU6dGl0bGUnLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gIC8+XG48L3RlbXBsYXRlPiJ9)

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IE15Q29tcG9uZW50IH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAndi1tb2RlbCBhcmd1bWVudCBleGFtcGxlJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGgxPnt7IHRpdGxlIH19PC9oMT5cbiAgPE15Q29tcG9uZW50IHYtbW9kZWw6dGl0bGU9XCJ0aXRsZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWyd1cGRhdGU6dGl0bGUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIDp2YWx1ZT1cInRpdGxlXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOnRpdGxlJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

### Multiple `v-model` bindings
### 다중 `v-model` 바인딩

By leveraging the ability to target a particular prop and event as we learned before with [`v-model` arguments](#v-model-arguments), we can now create multiple v-model bindings on a single component instance.

이전에 [`v-model` 인수](#v-model-arguments)로 학습한 것처럼 특정 props및 이벤트를 대상으로 지정하는 기능을 활용하여 이제 단일 컴포넌트 인스턴스에 다중 v-모델 바인딩을 만들 수 있습니다.

Each v-model will sync to a different prop, without the need for extra options in the component:

각 v-모델은 컴포넌트에 추가 옵션이 필요 없이 다른 props과 동기화됩니다:


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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBVc2VyTmFtZSBmcm9tICcuL1VzZXJOYW1lLnZ1ZSdcblxuY29uc3QgZmlyc3ROYW1lID0gcmVmKCdKb2huJylcbmNvbnN0IGxhc3ROYW1lID1yZWYoJ0RvZScpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgZmlyc3ROYW1lIH19IHt7IGxhc3ROYW1lIH19PC9oMT5cbiAgPFVzZXJOYW1lXG4gICAgdi1tb2RlbDpmaXJzdC1uYW1lPVwiZmlyc3ROYW1lXCJcbiAgICB2LW1vZGVsOmxhc3QtbmFtZT1cImxhc3ROYW1lXCJcbiAgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlVzZXJOYW1lLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyh7XG4gIGZpcnN0TmFtZTogU3RyaW5nLFxuICBsYXN0TmFtZTogU3RyaW5nXG59KVxuXG5kZWZpbmVFbWl0cyhbJ3VwZGF0ZTpmaXJzdE5hbWUnLCAndXBkYXRlOmxhc3ROYW1lJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwiZmlyc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmZpcnN0TmFtZScsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgLz5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIDp2YWx1ZT1cImxhc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmxhc3ROYW1lJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBVc2VyTmFtZSBmcm9tICcuL1VzZXJOYW1lLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IFVzZXJOYW1lIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgbGFzdE5hbWU6ICdEb2UnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDE+e3sgZmlyc3ROYW1lIH19IHt7IGxhc3ROYW1lIH19PC9oMT5cbiAgPFVzZXJOYW1lXG4gICAgdi1tb2RlbDpmaXJzdC1uYW1lPVwiZmlyc3ROYW1lXCJcbiAgICB2LW1vZGVsOmxhc3QtbmFtZT1cImxhc3ROYW1lXCJcbiAgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIlVzZXJOYW1lLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG5cdCAgZmlyc3ROYW1lOiBTdHJpbmcsXG4gIFx0bGFzdE5hbWU6IFN0cmluZ1xuXHR9LFxuICBlbWl0czogWyd1cGRhdGU6Zmlyc3ROYW1lJywgJ3VwZGF0ZTpsYXN0TmFtZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgOnZhbHVlPVwiZmlyc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmZpcnN0TmFtZScsICRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgLz5cbiAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIDp2YWx1ZT1cImxhc3ROYW1lXCJcbiAgICBAaW5wdXQ9XCIkZW1pdCgndXBkYXRlOmxhc3ROYW1lJywgJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAvPlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

### Handling `v-model` modifiers

### `v-model` 수정자 다루기

When we were learning about form input bindings, we saw that `v-model` has [built-in modifiers](/guide/essentials/forms.html#modifiers) - `.trim`, `.number` and `.lazy`. In some cases, however, you might also want to add your own custom modifiers.

폼 입력 바인딩에 대해 배울 때 `v-model`에는 [내장 수정자](/guide/essentials/forms.html#modifiers) - `.trim`, `.number` 및 `.lazy가 있습니다. `. 그러나 경우에 따라 고유한 사용자 지정 수정자를 추가할 수도 있습니다.


Let's create an example custom modifier, `capitalize`, that capitalizes the first letter of the string provided by the `v-model` binding:

`v-model` 바인딩에서 제공하는 문자열의 첫 글자를 대문자로 표시하는 커스텀 수정자 `capitalize`의 예를 만들어 보겠습니다:


```vue-html
<MyComponent v-model.capitalize="myText" />
```

Modifiers added to a component `v-model` will be provided to the component via the `modelModifiers` prop. In the below example, we have created a component that contains a `modelModifiers` prop that defaults to an empty object:

컴포넌트 `v-model`에 추가된 수정자는 `modelModifiers` props를 통해 컴포넌트에 제공됩니다. 아래 예제에서 우리는 기본적으로 빈 객체로 지정되는 `modelModifiers` props을 포함하는 컴포넌트를 만들었습니다.


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

Notice the component's `modelModifiers` prop contains `capitalize` and its value is `true` - due to it being set on the `v-model` binding `v-model.capitalize="myText"`.

컴포넌트의 `modelModifiers` props에는 `capitalize`가 포함되어 있고 그 값은 `true`입니다. 이는 `v-model` 바인딩 `v-model.capitalize="myText"`에 설정되어 있기 때문입니다.

Now that we have our prop set up, we can check the `modelModifiers` object keys and write a handler to change the emitted value. In the code below we will capitalize the string whenever the `<input />` element fires an `input` event.

이제 props을 설정했으므로 `modelModifiers` 개체 키를 확인하고 방출된 값을 변경하는 핸들러를 작성할 수 있습니다. 아래 코드에서는 `<input />` 요소가 `input` 이벤트를 발생시킬 때마다 문자열을 대문자로 표시합니다.

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5jb25zdCBteVRleHQgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBUaGlzIGlucHV0IGNhcGl0YWxpemVzIGV2ZXJ5dGhpbmcgeW91IGVudGVyOlxuICA8TXlDb21wb25lbnQgdi1tb2RlbC5jYXBpdGFsaXplPVwibXlUZXh0XCIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIk15Q29tcG9uZW50LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgbW9kZWxWYWx1ZTogU3RyaW5nLFxuICBtb2RlbE1vZGlmaWVyczogeyBkZWZhdWx0OiAoKSA9PiAoe30pIH1cbn0pXG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pXG5cbmZ1bmN0aW9uIGVtaXRWYWx1ZShlKSB7XG4gIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gIGlmIChwcm9wcy5tb2RlbE1vZGlmaWVycy5jYXBpdGFsaXplKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpXG4gIH1cbiAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIDp2YWx1ZT1cIm1vZGVsVmFsdWVcIiBAaW5wdXQ9XCJlbWl0VmFsdWVcIiAvPlxuPC90ZW1wbGF0ZT4ifQ==)

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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBNeUNvbXBvbmVudCBmcm9tICcuL015Q29tcG9uZW50LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgTXlDb21wb25lbnQgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXlUZXh0OiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgVGhpcyBpbnB1dCBjYXBpdGFsaXplcyBldmVyeXRoaW5nIHlvdSBlbnRlcjpcbiAgPE15Q29tcG9uZW50IHYtbW9kZWwuY2FwaXRhbGl6ZT1cIm15VGV4dFwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJNeUNvbXBvbmVudC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IFN0cmluZyxcbiAgICBtb2RlbE1vZGlmaWVyczoge1xuICAgICAgZGVmYXVsdDogKCkgPT4gKHt9KVxuICAgIH1cbiAgfSxcbiAgZW1pdHM6IFsndXBkYXRlOm1vZGVsVmFsdWUnXSxcbiAgbWV0aG9kczoge1xuICAgIGVtaXRWYWx1ZShlKSB7XG4gICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgaWYgKHRoaXMubW9kZWxNb2RpZmllcnMuY2FwaXRhbGl6ZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIiA6dmFsdWU9XCJtb2RlbFZhbHVlXCIgQGlucHV0PVwiZW1pdFZhbHVlXCIgLz5cbjwvdGVtcGxhdGU+In0=)

</div>

For `v-model` bindings with both argument and modifiers, the generated prop name will be `arg + "Modifiers"`. For example:

인수와 수정자가 모두 있는 `v-model` 바인딩의 경우 생성된 props 이름은 `arg + "Modifiers"`가 됩니다 :


```vue-html
<MyComponent v-model:title.capitalize="myText">
```

The corresponding declarations should be:

대응되는 선언은 다음과 같습니다: 

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
