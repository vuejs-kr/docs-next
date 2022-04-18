:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::


# TypeScript with Composition API

# Composition API와 타입스크립트


> This page assumes you've already read the overview on [Using Vue with TypeScript](./overview).

> 이 페이지에서는 타입스크립트 함께 [Using Vue with TypeScript](./overview) 에 대한 개요를 이미 읽었다고 가정합니다.



## Typing Component Props
## 컴포넌트 Props 작성


### Using `<script setup>`

### `<script setup>` 사용

When using `<script setup>`, the `defineProps()` macro supports inferring the props types based on its argument:

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

This is called "runtime declaration", because the argument passed to `defineProps()` will be used as the runtime `props` option.

`defineProps()`에 전달된 인자가 런타임 `props` 옵션으로 사용되기 때문에 이것을 "런타임 선언(runtime declaration)"이라고 합니다.

However, it is usually more straightforward to define props with pure types via a generic type argument:

그러나 일반적으로 제너릭 타입 전달인자를 통해 순수 타입으로 props를 정의하는 것이 더 간단합니다.


```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

This is called "type-based declaration". The compiler will try to do its best to infer the equivalent runtime options based on the type argument. In this case, our second example compiles into the exact same runtime options as the first example.

이것을 "타입 기반 선언(type-based declaration)"이라고 합니다. 컴파일러는 타입 전달인자를 기반으로 같은 런타임 옵션을 추론 하도록 시도합니다. 이 경우 두 번째 예제는 첫 번째 예제와 정확히 동일한 런타임 옵션으로 컴파일됩니다.

You can use either type-based declaration OR runtime declaration, but you cannot use both at the same time.

타입 기반 선언 또는 런타임 선언 중 하나를 사용할 수 있지만 동시에 둘 다 사용할 수는 없습니다.

We can also move the props types into a separate interface:

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

#### Syntax Limitations
#### 문법 제한

In order to generate the correct runtime code, the generic argument for `defineProps()` must be one of the following:

올바른 런타임 코드를 생성하려면 `defineProps()` 의 제너릭 전달인자가 다음 중 하나여야 합니다.


- An object literal type:
- 객체 리터럴 타입:


  ```ts
  defineProps<{ /*... */ }>()
  ```

- A reference to an interface or object literal type **in the same file**:
- **동일한 파일**에 있는 인터페이스 또는 객체 리터럴 타입에 대한 참조:


  ```ts
  interface Props {/* ... */}

  defineProps<Props>()
  ```

The interface or object literal type can contain references to types imported from other files, however, the generic argument itself passed to `defineProps` **cannot** be an imported type:

인터페이스 또는 객체 리터럴 타입은 다른 파일에서 가져온 타입을 참조 할 수 있지만, `defineProps` 의 제네릭 전달인자는 가져온 타입을 **사용 할 수 없습니다**:


```ts
import { Props } from './other-file'

// 지원하지 않음
defineProps<Props>()
```

This is because Vue components are compiled in isolation and the compiler currently does not crawl imported files in order to analyze the source type. This limitation could be removed in a future release.

이는 Vue 컴포넌트가 격리되어 컴파일되고 컴파일러가 현재 소스 유형을 분석하기 위해 가져온 파일을 크롤링하지 않기 때문입니다. 이 제한은 향후 업데이트에서 제거될 수 있습니다.


### Props Default Values <sup class="vt-badge experimental" />

### Props 기본값 <sup class="vt-badge experimental" />

When using type-based declaration, we lose the ability to declare default values for the props. This can be resolved by the currently experimental [Reactivity Transform](/guide/extras/reactivity-transform.html):

타입 기반 선언을 사용할 때 props에 대한 기본값을 설정 할 수 없습니다. 이것은 현재 실험 중인 [Reactivity Transform](/guide/extras/reactivity-transform.html) 으로 해결할 수 있습니다:


```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
// defineProps()를 위해 반응성을 제거 합니다.
// 기본 값은 런타임 옵션과 동일하게 컴파일됩니다.
const { foo, bar = 100 } = defineProps<Props>()
</script>
```


This behavior currently requires [explicit opt-in](/guide/extras/reactivity-transform.html#explicit-opt-in).

이 동작은 현재 [explicit opt-in](/guide/extras/reactivity-transform.html#explicit-opt-in)이 필요합니다.


### Without `<script setup>`
### `<script setup>` 없이 사용하기


If not using `<script setup>`, it is necessary to use `defineComponent()` to enable props type inference. The type of the props object passed to `setup()` is inferred from the `props` option.

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

## Typing Component Emits
## 컴포넌트 Emits 작성

In `<script setup>`, the `emit` function can also be typed using either runtime declaration OR type declaration:

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

The type argument should be a type literal with [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). The type literal will be used as the type of the returned `emit` function. As we can see, the type declaration gives us much finer-grained control over the type constraints of emitted events.

타입 전달인자는 [호출 서명](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures) 이 있는 타입 리터럴이어야 합니다. 타입 리터럴은 반환된 `emit` 함수의 타입으로 사용됩니다. 보시다시피, 타입 선언은 emit된 이벤트의 타입 제약 조건에 대해 훨씬 상세한 제어를 제공합니다.


When not using `<script setup>`, `defineComponent()` is able to infer the allowed events for the `emit` function exposed on the setup context:

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

## Typing `ref()`
## `ref()`에 타입 적용하기

Refs infer the type from the initial value:

Refs는 초기 값에서 타입을 추론합니다:

```ts
import { ref } from 'vue'

// inferred type: Ref<number>
// 타입 유추: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

Sometimes we may need to specify complex types for a ref's inner value. We can do that by using the `Ref` type:

때로는 ref의 내부 값에 대해 복잡한 타입을 지정해야 할 수도 있습니다. `Ref` 타입을 사용하여 이를 수행할 수 있습니다.


```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

Or, by passing a generic argument when calling `ref()` to override the default inference:

또는 기본 추론을 재정의하기 위해 `ref()` 를 호출할 때 제너릭 전달인자를 전달합니다: 

```ts
// resulting type: Ref<string | number>
// 결과 타입: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

If you specify a generic type argument but omit the initial value, the resulting type will be a union type that includes `undefined`:

제네릭 형식 타입를 지정하지만 초기 값을 생략하면 결과 타입은 `undefined` 를 포함하는 유니온 타입이 됩니다.


```ts
// inferred type: Ref<number | undefined>
// 추론된 타입: Ref<number | undefined>
const n = ref<number>()
```

## Typing `reactive()`
## `reactive()`에 타입 지정하기

`reactive()` also implicitly infers the type from its argument:

reactive() 는 전달인자에서 타입을 암시적으로 추론합니다.


```ts
import { reactive } from 'vue'

// inferred type: { title: string }
// 추론된 타입: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

To explicitly type a `reactive` property, we can use interfaces:

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
It's not recommended to use the generic argument of `reactive()` because the returned type, which handles nested ref unwrapping, is different from the generic argument type.
:::

:::tip 
중첩된 ref unwrapping을 처리하는 반환 타입이 제네릭 인자 타입과 다르기 때문에 `reactive()` 의 제네릭 전달인자는 사용하지 않는 것이 좋습니다. 
:::


## Typing `computed()`
## `computed()`에 타입 지정하기

`computed()` infers its type based on the getter's return value:

computed() 는 getter의 반환 값을 기반으로 해당 타입을 추론합니다:


```ts
import { ref, computed } from 'vue'

const count = ref(0)

// inferred type: ComputedRef<number>
// 추론된 타입: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

You can also specify an explicit type via a generic argument:

제네릭 인자를 통해 명시적으로 타입을 지정할 수도 있습니다.


```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```

## Typing Event Handlers
## 이벤트 핸들러에 타입 지정하기

When dealing with native DOM events, it might be useful to type the argument we pass to the handler correctly. Let's take a look at this example:

네이티브 DOM 이벤트를 처리할 때 핸들러에 올바르게 전달인자를 입력하는 것이 유용할 수 있습니다. 다음 예를 살펴보겠습니다: 

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` implicitly has `any` type
  // `event` 는 어떤(`any`) 타입일수도 있음
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Without type annotation, the `event` argument will implicitly have a type of `any`. This will also result in a TS error if `"strict": true` or `"noImplicitAny": true` are used in `tsconfig.json`. It is therefore recommended to explicitly annotate the argument of event handlers. In addition, you may need to explicitly cast properties on `event`:

타입 어노테이션이 없으면 `event` 전달인자는 암묵적으로 `any` 타입을 갖습니다. `"strict": true` 또는 `"noImplicitAny": true` 가 `tsconfig.json` 에서 사용되는 경우에는 TS 오류가 발생합니다. 따라서 이벤트 핸들러의 전달에 어노테이팅 하는 것을 권장합니다. 또한 `event` 에 대한 타입을 명시적으로 캐스팅해야 할 수도 있습니다:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Typing Provide / Inject
## Provide / Inject 에 타입 지정하기


Provide and inject are usually performed in separate components. To properly type injected values, Vue provides an `InjectionKey` interface, which is a generic type that extends `Symbol`. It can be used to sync the type of the injected value between the provider and the consumer:

`provide` 및 `inject`은 일반적으로 별도의 컴포넌트에서 수행됩니다. `inject` 된 값을 적절하게 입력하기 위해 Vue는 `Symbol` 을 확장하는 제네릭 타입인 `InjectionKey` 인터페이스를 제공합니다. provider와 consumer 간에 주입된 값의 타입을 동기화하는 데 사용할 수 있습니다:


```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // providing non-string value will result in error 
                    // 문자열이 아닌 값을 제공하면 에러가 발생합니다

const foo = inject(key) // type of foo: string | undefined
```

It's recommended to place the injection key in a separate file so that it can be imported in multiple components.

여러 컴포넌트에서 가져올 수 있도록 injection key를 별도의 파일에 배치하는 것이 좋습니다.


When using string injection keys, the type of the injected value will be `unknown`, and needs to be explicitly declared via a generic type argument:

문자열 injection key를 사용할 때 주입된 값의 타입은 `unknown` 이 되므로, 제너릭 타입 전달인자를 통해 명시적으로 선언해야 합니다.


```ts
const foo = inject<string>('foo') // type: string | undefined
```

Notice the injected value can still be `undefined`, because there is no guarantee that a provider will provide this value at runtime.

주입된 값은 여전히 `undefined` 일 수 있습니다. provider가 런타임에 이 값을 제공할 것이라는 보장이 없기 때문입니다.


The `undefined` type can be removed by providing a default value:

`undefined` 타입은 기본값을 제공하여 제거할 수 있습니다:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

If you are sure that the value is always provided, you can also force cast the value:

값이 항상 제공된다고 확신하는 경우 값을 강제로 캐스팅할 수도 있습니다.


```ts
const foo = inject('foo') as string
```

## Typing Template Refs
## 템플릿  Refs 에 타입 지정하기

Template refs should be created with an explicit generic type argument and an initial value of `null`:

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

Note that for strict type safety, it is necessary to use optional chaining or type guards when accessing `el.value`. This is because the initial ref value is `null` until the component is mounted, and it can also be set to `null` if the referenced element is unmounted by `v-if`.

타입 안전을 위해 `el.value` 에 접근할 때 옵셔널 체이닝 또는 타입 가드를 사용해야 합니다. 이는 컴포넌트가 마운트될 때까지 초기 ref 값이 `null` 이고 참조된 ref가 `v-if` 에 의해 마운트 해제된 경우에도 null 로 설정될 수 있기 때문입니다.


## Typing Component Template Refs
## 컴포넌트 템플릿 Template Refs 에 타입 지정하기

Sometimes you might need to annotate a template ref for a child component in order to call its public method. For example, we have a `MyModal` child component with a method that opens the modal:

때로는 public 메소드를 호출하기 위해 자식 컴포넌트에 대한 템플릿 ref에 어노테이션이 필요 할 수 있습니다. 예를 들어, 모달을 여는 메소드가 있는 `MyModal` 자식 컴포넌트가 있습니다:

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

In order to get the instance type of `MyModal`, we need to first get its type via `typeof`, then use TypeScript's built-in `InstanceType` utility to extract its instance type:

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

Note if you want to use this technique in TypeScript files instead of Vue SFCs, you need to enable Volar's [Takeover Mode](./overview.html#takeover-mode).

Vue SFC 대신 타입스크립트 파일에서 이 기술을 사용하려면 Volar의 [Takeover Mode](./overview.html#takeover-mode) 를 활성화해야 합니다.
