# \<script setup>

`<script setup>`은 싱글 파일 컴포넌트(SFC) 내에서 컴포지션 API를 더 쉽게 읽거나 사용하기 위한 컴파일 타임 문법입니다.
SFC에서 컴포지션 API를 사용하는 경우, 권장되는 문법입니다.
일반적인 `<script>` 문법에 비해 많은 이점을 제공합니다:

- 더 적은 상용구로 더 간결한 코드
- 순수 TypeScript를 사용하여 props 및 내보낼(emit) 이벤트를 선언하는 기능
- 더 나은 런타임 성능(템플릿은 중간 프록시 없이 동일한 범위의 렌더 함수로 컴파일됨)
- 더 나은 IDE 타입 추론 성능(언어 서버가 코드에서 타입을 추출하는 작업 감소)

## 기본 문법 {#basic-syntax}

문법을 선택하려면 `<script>` 블록에 `setup` 속성을 추가해야 합니다:

```vue
<script setup>
console.log('안녕, script setup!')
</script>
```

내부 코드는 컴포넌트의 `setup()` 함수 내용으로 컴파일됩니다.
즉, 컴포넌트를 처음 가져올 때 한 번만 실행되는 일반적인 `<script>`와 달리,
`<script setup>` 내부의 코드는 **컴포넌트의 인스턴스가 생성될 때마다 실행**합니다.

### 템플릿에 노출되는 최상위 바인딩 {#top-level-bindings-are-exposed-to-template}

`<script setup>`을 사용할 때,
내부에 선언된 모든 최상위 바인딩(변수, 함수 선언 및 `import` 포함)은 템플릿에서 직접 사용할 수 있습니다:

```vue
<script setup>
// 변수
const msg = '안녕!'

// 함수
function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>
```

`import`도 같은 방식으로 노출됩니다.
즉, `methods` 옵션을 통해 노출하지 않고도 템플릿 표현식에서 `import`한 헬퍼 함수를 직접 사용할 수 있습니다:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## 반응형 {#reactivity}

반응형 상태는 [반응형 API](./reactivity-core.html)를 사용하여 명시적으로 생성되어야 합니다.
`setup()` 함수에서 반환된 값과 유사하게, 템플릿에서 참조될 때 ref는 자동으로 언래핑됩니다:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <!-- 템플릿에서 ref는 언래핑되어 .value 없이 접근 가능 -->
  <button @click="count++">{{ count }}</button>
</template>
```

## 컴포넌트 사용하기 {#using-components}

`<script setup>` 범위의 커스텀 컴포넌트 값은 태그 이름으로 사용할 수 있습니다:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent`는 변수처럼 참조된다고 생각하십시오.
JSX를 사용한 적이 있는 경우,
멘탈 모델(mental model)과 유사합니다.
kebab-case에 해당하는 `<my-component>`도 템플릿에서 작동하지만,
일관성을 위해 PascalCase 컴포넌트 태그를 강력히 권장합니다.
또한 네이티브 커스텀 엘리먼트와 구별하는 데 도움이 됩니다.

### 동적 컴포넌트 {#dynamic-components}

컴포넌트는 문자열 키로 등록되는 대신 변수로 참조되므로,
`<script setup>` 내에서 동적 컴포넌트를 사용할 때,
동적인 `:is` 바인딩을 사용해야 합니다:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

삼항 표현식에서 컴포넌트를 변수로 사용할 수 있습니다.

### 재귀 컴포넌트 {#recursive-components}

SFC는 파일 이름을 통해 암시적으로 자신을 참조할 수 있습니다.
예를 들어 `FooBar.vue`라는 파일은 템플릿에서 `<FooBar/>`로 자신을 참조할 수 있습니다.

`import`한 컴포넌트보다 우선 순위가 낮습니다.
컴포넌트의 유추된 이름과 충돌하는 명명된 가져오기가 있는 경우,
`import`할 때 별칭을 지정할 수 있습니다:

```js
import { FooBar as FooBarChild } from './components'
```

### 네임스페이스 컴포넌트 {#namespaced-components}

`<Foo.Bar>`와 같이 점이 있는 컴포넌트 태그를 사용하여,
객체 내부에 중첩된 속성으로 컴포넌트를 참조할 수 있습니다.
단일 파일에서 여러 컴포넌트를 가져올 때 유용합니다:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>레이블</Form.Label>
  </Form.Input>
</template>
```

## 커스텀 디렉티브 사용 {#using-custom-directives}

전역적으로 등록된 커스텀 디렉티브는 정상적으로 작동합니다.
로컬 커스텀 디렉티브는 `<script setup>`으로 명시적으로 등록할 필요는 없지만,
`vNameOfDirective`라는 네이밍 스키마를 따라야 합니다:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 엘리먼트(el)로 작업을 할 수 있음
  }
}
</script>
<template>
  <h1 v-my-directive>이것은 제목입니다!</h1>
</template>
```

다른 곳에서 디렉티브를 가져오는 경우,
필요한 명명 체계에 맞게 이름을 바꿀 수 있습니다:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## `defineProps()` & `defineEmits()`

완전한 타입 추론을 지원하는 `props` 및 `emits`와 같은 옵션을 선언하려면,
`<script setup>` 내에서 자동으로 사용할 수 있는 `defineProps` 및 `defineEmits` API를 사용합니다:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// ... setup 코드
</script>
```

- `defineProps` 및 `defineEmits`는 `<script setup>` 내에서만 사용할 수 있는 **컴파일러 매크로**입니다.
  `import`할 필요가 없으며, `<script setup>`이 처리될 때 컴파일됩니다.

- `defineProps`는 `props` 옵션과 동일한 값을 허용하고,
  `defineEmits`는 `emits` 옵션과 동일한 값을 허용합니다.

- `defineProps` 및 `defineEmits`는 전달된 옵션을 기반으로 적절한 타입 추론을 제공합니다.

- `defineProps` 및 `defineEmits`에 전달된 옵션은 setup에서 모듈 범위로 호이스트됩니다.
  따라서 옵션은 setup 범위에서 선언된 지역 변수를 참조할 수 없습니다.
  그렇게 하면 컴파일 오류가 발생합니다.
  그러나 `import`한 바인딩은 모듈 범위에 있으므로 **참조 할 수 있습니다**.

TypeScript를 사용하는 경우, [순수 타입 주석을 사용하여 props를 선언하고 내보내는(emit)](#typescript-only-features) 것도 가능합니다.

## `defineExpose()`

`<script setup>`을 사용하는 컴포넌트는 **기본적으로 닫혀 있습니다**.
즉, 템플릿 참조 또는 `$parent` 체인을 통해 검색되는 컴포넌트의 공개 인스턴스는 `<script setup>` 내부에서 선언된 바인딩을 **노출하지 않습니다**.

`<script setup>` 컴포넌트의 속성을 명시적으로 노출하려면 `defineExpose` 컴파일러 매크로를 사용해야 합니다:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

부모가 템플릿 참조를 통해 이 컴포넌트의 인스턴스를 가져오면,
검색된 인스턴스는 `{ a: number, b: number }` 모양이 됩니다(참조는 일반 인스턴스와 마찬가지로 자동으로 언래핑됨).

## `useSlots()` & `useAttrs()`

`<script setup>` 내부에서 `slots` 및 `attrs` 사용은 템플릿에서 `$slots` 및 `$attrs`로 직접 접근할 수 있으므로 비교적 드물게 사용해야 합니다.
드물게 필요한 경우 `useSlots` 및 `useAttrs` 헬퍼를 각각 사용합니다:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` 및 `useAttrs`는 `setupContext.slots` 및 `setupContext.attrs`에 해당하는 항목을 반환하는 실제 런타임 함수입니다.
일반 컴포지션 API 함수에서도 사용할 수 있습니다.

## 일반 `<script>`와 함께 사용 {#usage-alongside-normal-script}

`<script setup>`은 일반 `<script>`와 함께 사용할 수 있습니다.
다음을 수행해야 하는 경우 일반 `<script>`가 필요할 수 있습니다:

- `<script setup>`에서 표현할 수 없는 옵션을 선언하는 경우.
  예를 들어 `inheritAttrs` 또는 플러그인을 통해 활성화된 커스텀 옵션이 있는 경우.
- 명명된 `export`를 선언하는 경우.
- 사이드 이펙트를 실행하거나 한 번만 실행되어야 하는 객체를 만드는 경우.

```vue
<script>
// 일반 <script>, 모듈 범위에서 실행(한 번만)
runSideEffectOnce()

// 추가 옵션 선언
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// setup() 범위에서 실행(각 인스턴스에 대해)
</script>
```

## 최상위 `await` {#top-level-await}

최상위 `await`는 `<script setup>` 내에서 사용할 수 있습니다.
결과 코드는 `async setup()`으로 컴파일됩니다:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

또한 이러한 표현식은 `await` 이후의 현재 컴포넌트 인스턴스 컨텍스트를 유지하는 형식으로 자동 컴파일됩니다.

:::warning 참고
`async setup()`은 현재 실험적인 기능인 `Suspense`와 함께 사용해야 합니다.
향후 릴리스에서 이를 마무리하고 문서화할 계획입니다.
하지만 지금 궁금한 점은 [테스트](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts)를 참고하여 작동 방식을 확인할 수 있습니다.
:::

## TypeScript 전용 기능 <sup class="vt-badge ts" /> {#typescript-only-features}

### 타입 전용 props/emit 선언 {#type-only-props-emit-declarations}

Props 및 emits는 리터럴 타입 인자를 `defineProps` 또는 `defineEmits`에 전달하여 순수 타입 문법을 사용하여 선언할 수도 있습니다:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

- `defineProps` 또는 `defineEmits`는 런타임 선언 또는 타입 선언만 사용할 수 있습니다.
  두 가지를 동시에 사용하면 컴파일 오류가 발생합니다.

- 타입 선언을 사용할 때 정적 분석에서 동등한 런타임 선언이 자동으로 생성되어,
  이중 선언의 필요성을 제거하고 여전히 올바른 런타임 동작을 보장합니다.

  - 개발 모드에서 컴파일러는 타입에서 해당 런타임 유효성 검사를 유추하려고 시도합니다.
    예를 들어 `foo: String`은 `foo: string` 타입에서 유추됩니다.
    타입이 가져온 타입의 참조인 경우,
    컴파일러에 외부 파일 정보가 없기 때문에 추론된 결과는 `foo: null`(`any` 타입과 동일)이 됩니다.

  - prod 모드에서 컴파일러는 번들 크기를 줄이기 위해 배열 형식 선언을 생성합니다(여기서 props는 `['foo', 'bar']`로 컴파일됩니다).

  - 내보낼(emit)) 코드는 여전히 유효한 타이핑이 있는 TypeScript이며,
    다른 도구에서 추가로 처리할 수 있습니다.

- 현재로서는 올바른 정적 분석을 위해 타입 선언 인자가 다음 중 하나여야 합니다.

  - A 타입 리터럴
  - 동일한 파일에 있는 인터페이스 또는 타입 리터럴에 대한 참조

  현재 복합 타입 및 다른 파일에서 타입 `import`는 지원되지 않습니다.
  향후 타입 `import`를 지원할 예정입니다.

### 타입 선언을 사용할 때 기본 props 값 {#default-props-values-when-using-type-declaration}

타입 전용 `defineProps` 선언의 한 가지 단점은 props에 대한 기본값을 제공할 방법이 없다는 것입니다.
이 문제를 해결하기 위해 `withDefaults` 컴파일러 매크로를 제공합니다:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: '안녕!',
  labels: () => ['하나', '둘']
})
```

이것은 동등한 런타임 props `default` 옵션으로 컴파일됩니다.
또한 `withDefaults` 헬퍼는 기본값에 대한 타입 검사를 제공하고,
반환된 `props` 타입에 기본값이 선언된 속성의 선택적 플래그가 제거되었는지 확인합니다.

## 제한사항 {#restrictions}

모듈 실행 의미의 차이로 인해 `<script setup>` 내부의 코드는 SFC의 컨텍스트에 의존합니다.
외부 `.js` 또는 `.ts` 파일로 이동하면 개발자와 개발도구 모두에 혼란을 초래할 수 있습니다.
따라서 **`<script setup>`**는 `src` 속성과 함께 사용할 수 없습니다.
