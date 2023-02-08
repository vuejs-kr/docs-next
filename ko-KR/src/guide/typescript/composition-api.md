# Composition API와 타입스크립트 {#typescript-with-composition-api}

> 이 페이지에서는 타입스크립트 함께 [Using Vue with TypeScript](./overview) 에 대한 개요를 이미 읽었다고 가정합니다.

## 컴포넌트 Props 작성 {#typing-component-props}

### `<script setup>` 사용 {#using-script-setup}


`<script setup>` 을 사용할 때 `defineProps()`는 전달인자를 기반으로 `props` 타입 추론을 진행합니다.

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```


`defineProps()`에 전달된 인자가 런타임 `props` 옵션으로 사용되기 때문에 이것을 "런타임 선언(runtime declaration)"이라고 합니다.

그러나 일반적으로 제너릭 타입 전달인자를 통해 순수 타입으로 props를 정의하는 것이 더 간단합니다.


```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

이것을 "타입 기반 선언(type-based declaration)"이라고 합니다. 컴파일러는 타입 전달인자를 기반으로 같은 런타임 옵션을 추론 하도록 시도합니다. 이 경우 두 번째 예제는 첫 번째 예제와 정확히 동일한 런타임 옵션으로 컴파일됩니다.

타입 기반 선언 또는 런타임 선언 중 하나를 사용할 수 있지만 동시에 둘 다 사용할 수는 없습니다.

props 타입을 별도의 인터페이스로 지정할 수도 있습니다.


```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### 문법 제한 {#syntax-limitations}

올바른 런타임 코드를 생성하려면 `defineProps()` 의 제너릭 전달인자가 다음 중 하나여야 합니다.


- 객체 리터럴 타입:

  ```ts
  defineProps<{ /*... */ }>()
  ```

- **동일한 파일**에 있는 인터페이스 또는 객체 리터럴 타입에 대한 참조:

  ```ts
  interface Props {/* ... */}

  defineProps<Props>()
  ```

인터페이스 또는 객체 리터럴 타입은 다른 파일에서 가져온 타입을 참조 할 수 있지만, `defineProps` 의 제네릭 전달인자는 가져온 타입을 **사용 할 수 없습니다**:


```ts
import { Props } from './other-file'

// 지원하지 않음
defineProps<Props>()
```

이는 Vue 컴포넌트가 격리되어 컴파일되고 컴파일러가 현재 소스 유형을 분석하기 위해 가져온 파일을 크롤링하지 않기 때문입니다. 이 제한은 향후 업데이트에서 제거될 수 있습니다.


### Props 기본값 {#props-default-values}

타입 기반 선언을 사용하면 프로퍼티의 기본값을 선언할 수 없게 됩니다. 이 문제는 컴파일러 매크로 `withDefaults`로 해결할 수 있습니다:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

이는 동등한 런타임 프로퍼티 `default` 옵션으로 컴파일됩니다. 또한 `withDefaults` 헬퍼는 기본값에 대한 유형 검사를 제공하고, 기본값이 선언된 프로퍼티에 대해 반환된 `props` 유형에 선택적 플래그가 제거되었는지 확인합니다.

또는 현재 실험 중인 [반응성 변환](/guide/extras/reactivity-transform.html)을 사용할 수도 있습니다:

```vue
<script setup lang="ts">
interface Props {
  name: string
  count?: number
}

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
// defineProps()를 위해 반응성을 제거 합니다.
// 기본 값은 런타임 옵션과 동일하게 컴파일됩니다.
const { name, count = 100 } = defineProps<Props>()
</script>
```


이 동작은 현재 [explicit opt-in](/guide/extras/reactivity-transform.html#explicit-opt-in)이 필요합니다.


### `<script setup>` 없이 사용하기 {#without-script-setup}


`<script setup>` 을 사용하지 않는 경우 props 타입 추론을 활성화하기 위해 `defineComponent()` 를 사용해야 합니다. `setup()` 에 전달된 props 객체의 타입은 `props` 옵션에서 유추됩니다.


```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```
### 복합 prop 타입 {#complex-prop-types}

타입 기반 선언을 사용하면 소품은 다른 타입과 마찬가지로 복잡한 타입을 사용할 수 있습니다:

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
}>()
</script>
```

런타임 선언의 경우 `PropType` 유틸리티 유형을 사용할 수 있습니다:

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

이는 `props` 옵션을 직접 지정하는 경우에도 거의 동일한 방식으로 작동합니다:


```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    book: Object as PropType<Book>
  }
})
```

`props` 옵션은 옵션 API와 함께 더 일반적으로 사용되므로 [옵션 API를 사용한 타입스크립트](/guide/typescript/options-api.html#typing-component-props) 가이드 에서 더 자세한 예제를 찾을 수 있습니다. 이 예제에 표시된 기법은 `defineProps()`를 사용하는 런타임 선언에도 적용됩니다.
 
## 컴포넌트 Emits 작성 {#typing-component-emits}

`<script setup>` 에서 런타임 선언 또는 타입 선언을 사용하여 `emit` 함수를 입력할 수 있습니다.:


```vue
<script setup lang="ts">
// runtime
// 런타임
const emit = defineEmits(['change', 'update'])

// type-based
// 타입기반
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

타입 전달인자는 [호출 서명](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures) 이 있는 타입 리터럴이어야 합니다. 타입 리터럴은 반환된 `emit` 함수의 타입으로 사용됩니다. 보시다시피, 타입 선언은 emit된 이벤트의 타입 제약 조건에 대해 훨씬 상세한 제어를 제공합니다.

`<script setup>` 을 사용하지 않을 때, `defineComponent()` 는 설정 컨텍스트에 노출된 `emit` 함수에 대해 허용된 이벤트를 추론할 수 있습니다.


```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- type check / auto-completion
  }
})
```

## `ref()`에 타입 적용하기 {#typing-ref}

Refs infer the type from the initial value:

Refs는 초기 값에서 타입을 추론합니다:

```ts
import { ref } from 'vue'

// 타입 유추: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

때로는 ref의 내부 값에 대해 복잡한 타입을 지정해야 할 수도 있습니다. `Ref` 타입을 사용하여 이를 수행할 수 있습니다.


```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

또는 기본 추론을 재정의하기 위해 `ref()` 를 호출할 때 제너릭 전달인자를 전달합니다: 

```ts
// resulting type: Ref<string | number>
// 결과 타입: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

제네릭 형식 타입를 지정하지만 초기 값을 생략하면 결과 타입은 `undefined` 를 포함하는 유니온 타입이 됩니다.


```ts
// inferred type: Ref<number | undefined>
// 추론된 타입: Ref<number | undefined>
const n = ref<number>()
```

## `reactive()`에 타입 지정하기 {#typing-reactive}

reactive() 는 전달인자에서 타입을 암시적으로 추론합니다.


```ts
import { reactive } from 'vue'

// inferred type: { title: string }
// 추론된 타입: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

`reactive` 타입을 명시적으로 입력하기 위해 인터페이스를 사용할 수 있습니다:


```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip 
중첩된 ref unwrapping을 처리하는 반환 타입이 제네릭 인자 타입과 다르기 때문에 `reactive()` 의 제네릭 전달인자는 사용하지 않는 것이 좋습니다. 
:::

## `computed()`에 타입 지정하기 {#typing-computed}

computed() 는 getter의 반환 값을 기반으로 해당 타입을 추론합니다:


```ts
import { ref, computed } from 'vue'

const count = ref(0)

// 추론된 타입: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

제네릭 인자를 통해 명시적으로 타입을 지정할 수도 있습니다.


```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```

## 이벤트 핸들러에 타입 지정하기 {#typing-event-handlers}

네이티브 DOM 이벤트를 처리할 때 핸들러에 올바르게 전달인자를 입력하는 것이 유용할 수 있습니다. 다음 예를 살펴보겠습니다: 

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` 는 어떤(`any`) 타입일수도 있음
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

타입 어노테이션이 없으면 `event` 전달인자는 암묵적으로 `any` 타입을 갖습니다. `"strict": true` 또는 `"noImplicitAny": true` 가 `tsconfig.json` 에서 사용되는 경우에는 TS 에러가 발생합니다. 따라서 이벤트 핸들러의 전달에 어노테이팅 하는 것을 권장합니다. 또한 `event` 에 대한 타입을 명시적으로 캐스팅해야 할 수도 있습니다:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Provide / Inject 에 타입 지정하기 {#typing-provide-inject}

`provide` 및 `inject`은 일반적으로 별도의 컴포넌트에서 수행됩니다. `inject` 된 값을 적절하게 입력하기 위해 Vue는 `Symbol` 을 확장하는 제네릭 타입인 `InjectionKey` 인터페이스를 제공합니다. provider와 consumer 간에 주입된 값의 타입을 동기화하는 데 사용할 수 있습니다:


```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 문자열이 아닌 값을 제공하면 에러가 발생합니다

const foo = inject(key) // type of foo: string | undefined
```

여러 컴포넌트에서 가져올 수 있도록 injection key를 별도의 파일에 배치하는 것이 좋습니다.

문자열 injection key를 사용할 때 주입된 값의 타입은 `unknown` 이 되므로, 제너릭 타입 전달인자를 통해 명시적으로 선언해야 합니다.


```ts
const foo = inject<string>('foo') // type: string | undefined
```

주입된 값은 여전히 `undefined` 일 수 있습니다. provider가 런타임에 이 값을 제공할 것이라는 보장이 없기 때문입니다.

`undefined` 타입은 기본값을 제공하여 제거할 수 있습니다:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

값이 항상 제공된다고 확신하는 경우 값을 강제로 캐스팅할 수도 있습니다.


```ts
const foo = inject('foo') as string
```

## 템플릿  Refs 에 타입 지정하기 {#typing-template-refs}

템플릿 refs는 명시적인 제네릭 타입 전달인자와 초기 값 null 로 생성되어야 합니다:


```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

타입 안전을 위해 `el.value` 에 접근할 때 옵셔널 체이닝 또는 타입 가드를 사용해야 합니다. 이는 컴포넌트가 마운트될 때까지 초기 ref 값이 `null` 이고 참조된 ref가 `v-if` 에 의해 마운트 해제된 경우에도 null 로 설정될 수 있기 때문입니다.


## 컴포넌트 템플릿 Template Refs 에 타입 지정하기 {#typing-component-template-refs}

때로는 public 메서드를 호출하기 위해 자식 컴포넌트에 대한 템플릿 ref에 어노테이션이 필요 할 수 있습니다. 예를 들어, 모달을 여는 메서드가 있는 `MyModal` 자식 컴포넌트가 있습니다:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

`MyModal` 의 인스턴스 타입을 얻으려면 먼저 `typeof` 를 통해 타입을 가져온 다음 타입스크립트의 내장 `InstanceType` 유틸리티를 사용하여 인스턴스 타입을 추출해야 합니다.


```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

Vue SFC 대신 타입스크립트 파일에서 이 기술을 사용하려면 Volar의 [Takeover Mode](./overview.html#volar-takeover-mode) 를 활성화해야 합니다.
