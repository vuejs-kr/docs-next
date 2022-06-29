# 컴포지션 API: setup() {#composition-api-setup}

:::info Note
이 페이지는 컴포넌트의 `setup` 옵션 사용법을 설명합니다.
싱글 파일 컴포넌트에 컴포지션 API를 사용하는 경우,
보다 간결하고 인체공학적인 문법을 위해 [`<script setup>`](/api/sfc-script-setup.html) 사용을 권장합니다.
:::

`setup()` 훅은 다음과 같은 경우, 컴포넌트에서 컴포지션 API 사용을 위한 진입점 역할을 합니다:

1. 빌드 과정 없이 컴포지션 API 사용.
2. 옵션 API 컴포넌트에서 컴포지션 API 기반 코드와 통합.

## 기본 사용법 {#basic-usage}

[반응형 API](./reactivity-core.html)를 사용하여 반응형 상태를 선언하고 `setup()`에서 객체를 반환하여 템플릿에 노출할 수 있습니다.
반환된 객체의 속성은 컴포넌트 인스턴스에서 사용할 수 있습니다(옵션 API가 사용되는 경우):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 템플릿 및 기타 옵션 API 훅에 노출
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

`setup`에서 반환된 [refs](/api/reactivity-core.html#ref)는 템플릿에서 접근할 때,
[자동으로 얕은 언래핑](/guide/essentials/reactivity-fundamentals.html#deep-reactivity)되므로, 접근할 때 `.value`를 사용할 필요가 없습니다.
또한 `this`에서 접근할 때, 같은 방식으로 언래핑 됩니다.

:::tip
`setup()` 자체에는 컴포넌트 인스턴스에 대한 접근 권한이 없습니다.
`setup()` 내부에서 `this`의 값은 `undefined`입니다.
Composition API에서 노출한 값은 Options API에서 접근할 수 있지만, 그 반대는 불가능합니다.
:::

## Props에 접근하기 {#accessing-props}

`setup` 함수의 첫 번째 인자는 `props`입니다.
`setup` 함수 내부의 `props`는 반응형이며, 새 props가 전달되면 업데이트됩니다.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

`props` 객체를 분해할 경우, 분해 된 변수는 반응성을 잃게 됩니다.
따라서 항상 `props.xxx`처럼 접근하는 것이 좋습니다.

Props를 분해해야 하거나, 반응성을 유지하면서 외부 함수에 props를 전달해야 하는 경우,
[toRefs()](./reactivity-utilities.html#torefs) 또는 [toRef()](/api/reactivity-utilities.html#toref) 유틸리티 API를 사용하여 구현할 수 있습니다.

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // refs 객체로 `props`를 변환한 후, 분해 할당
    const { title } = toRefs(props)
    // `title`은 `props.title`을 추적하는 ref 입니다.
    console.log(title.value)

    // 또는, 하나의 `props` 속성만 ref로 변환할 수 있습니다.
    const title = toRef(props, 'title')
  }
}
```

## Setup Context

`setup` 함수에 전달되는 두 번째 인자는 **Setup Context** 객체입니다.
컨텍스트 객체는 `setup` 내부에서 유용할 수 있는 다른 값을 노출합니다:

```js
export default {
  setup(props, context) {
    // 속성 (비-반응형 객체, $attrs에 해당함)
    console.log(context.attrs)

    // 슬롯 (비-반응형 객체, $slots에 해당함)
    console.log(context.slots)

    // 이벤트 발송 (함수, $emit에 해당함)
    console.log(context.emit)

    // 로컬 속성 노출 (함수)
    console.log(context.expose)
  }
}
```

컨텍스트 객체는 반응형이 아니며, 안전하게 분해 할당될 수 있습니다:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs`와 `slots`는 컴포넌트가 업데이트될 때, 항상 업데이트되는 스테이트풀(stateful) 객체입니다.
즉, 구조를 분해하지 말고 `attrs.x`나 `slots.x`와 같이 속성을 참조해야 합니다.
또한 `props`와 달리 `attrs`와 `slots`의 속성은 **반응형이 아닙니다**.
따라서 `attrs` 또는 `slots`의 변경 사항을 기반으로 하는 사이드 이펙트는 `onBeforeUpdate` 수명 주기 훅 내에서 구현해야 합니다.

### 퍼블릭 속성 노출하기 {#exposing-public-properties}

`expose` 함수는 부모 컴포넌트가 [템플릿 참조](/guide/essentials/template-refs.html#ref-on-component)를 통해 자식 컴포넌트 인스턴스에 접근할 때,
노출되는 속성을 명시적으로 제한하기 위해 사용합니다.

```js{5,10}
export default {
  setup(props, { expose }) {
    // 인스턴스를 "닫힘" 상태로 설정
    // 예: 부모 컴포넌트에 아무것도 노출하지 않으려는 경우
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 선택적으로 로컬 상태를 노출
    expose({ count: publicCount })
  }
}
```

## 렌더 함수와 함께 사용하기 {#usage-with-render-functions}

`setup`은 범위 내 선언된 반응형 상태에 직접 접근할 수 있는 [렌더 함수](/guide/extras/render-function.html)를 반환할 수도 있습니다:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

렌더 함수를 반환하면, 다른 것을 반환할 수 없습니다.
내부적으로는 문제가 되지 않지만,
템플릿 참조를 통해 이 컴포넌트의 메서드를 부모 컴포넌트에 노출하려는 경우,
문제가 될 수 있습니다.

이럴 때는 [`expose()`](#exposing-public-properties)를 호출하여 이 문제를 해결할 수 있습니다:

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

이제 `increment` 메서드는 템플릿 참조를 통해 부모 컴포넌트에서 사용할 수 있습니다.
