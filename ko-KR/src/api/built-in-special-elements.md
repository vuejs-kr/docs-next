# 빌트인 특수 엘리먼트 {#built-in-special-elements}

:::info 컴포넌트가 아님
`<component>` 및 `<slot>`은 컴포넌트와 유사한 기능이며,
템플릿 문법의 일부입니다.
이것들은 진정한 컴포넌트가 아니며,
템플릿 컴파일 중에 편집됩니다.
따라서 템플릿에서 일반적으로 소문자로 작성됩니다.
:::

## `<component>` {#component}

동적 컴포넌트 또는 엘리먼트를 렌더링하기 위한 "메타 컴포넌트"입니다.

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **세부 사항**:

  `is`라는 prop의 값으로 렌더링할 실제 컴포넌트가 결정됩니다:

  - 문자열인 경우, HTML 태그 이름 또는 컴포넌트로 등록된 이름일 수 있음.

  - 컴포넌트의 정의에 직접 바인딩될 수도 있음.

- **예제**:

  등록된 이름으로 컴포넌트 렌더링(옵션 API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  정의에 따른 컴포넌트 렌더링(`<script setup>`이 있는 컴포지션 API):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  HTML 엘리먼트 렌더링:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  [빌트인 컴포넌트](./built-in-components.html)는 모두 `is`에 전달할 수 있지만,
  이름으로 전달하려면 등록해야 합니다.
  예를 들어:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  이름이 아닌 컴포넌트 자체를 `is`에 전달하는 경우,
  등록이 필요하지 않습니다(예를 들어 `<script setup>`에서).

  `v-model`이 `<component>` 태그에 사용되면, 템플릿 컴파일러는 다른 컴포넌트와 마찬가지로 이를 `modelValue` prop 및 `update:modelValue` 이벤트 리스너로 확장합니다.
  그러나 이것은 `<input>` 또는 `<select>`와 같은 기본 HTML 엘리먼트와 호환되지 않습니다.
  결과적으로 동적으로 생성된 기본 엘리먼트와 함께 `v-model`을 사용하면 작동하지 않습니다:

  ```vue
  <script setup>
  import { ref } from 'vue'
  
  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- 'input'이 기본 HTML 엘리먼트이므로 작동하지 않음 -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  실제로는 기본 양식(form) 필드가 일반적으로 실제 앱의 컴포넌트에 래핑되기 때문에 이러한 예외적인 경우는 일반적이지 않습니다.
  네이티브 엘리먼트를 직접 사용해야 하는 경우, `v-model`을 속성과 이벤트로 수동으로 분할할 수 있습니다.

- **참고**: [가이드 - 컴포넌트 기초: 동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)

## `<slot>` {#slot}

템플릿의 슬롯 컨텐츠를 내보낼 지점을 나타냅니다.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * 범위가 지정된 슬롯의 인자로 전달하기 위해
     * <slot>에 전달된 모든 props
     */
    [key: string]: any
    /**
     * 슬롯 이름을 지정.
     */
    name?: string
  }
  ```

- **세부 사항**:

  `<slot>` 엘리먼트는 `name` 속성을 사용하여 슬롯 이름을 지정할 수 있습니다.
  `name`을 지정하지 않으면 기본 슬롯으로 렌더링됩니다.
  슬롯 엘리먼트에 전달된 추가 속성은 부모 내부에서 범위가 정의된 슬롯에 슬롯 props로 전달됩니다.

  엘리먼트는 일치하는 슬롯의 컨텐츠로 대체됩니다.

  Vue 템플릿의 `<slot>` 엘리먼트는 JavaScript로 컴파일되므로 [네이티브 `<slot>` 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)와 혼동하면 안됩니다.

- **참고**: [가이드 - 슬롯](/guide/components/slots.html)

## `<template>` {#template}

`<template>` 태그는 DOM에 렌더링없이 사용할 요소들에 대한 위치기술을 위해(placeholder)로 사용할수 있습니다. 
The `<template>` tag is used as a placeholder when we want to use a built-in directive without rendering an element in the DOM.

- **세부 사항:**
  `<template>` 의 이런 특수한 취급은 다음 디렉티브들과 함께 사용될때만 적용됩니다. 
  
  - `v-if`, `v-else-if`, or `v-else`
  - `v-for`
  - `v-slot`
  
  만약 이런 디렉티브가 없다면, [네이티브 `<template>` 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)로 렌더링됩니다. 
  
  `v-for`가 있는 `<template>`은 [`key` 속성](/api/built-in-special-attributes.html#key)도 가질 수 있습니다. 다른 모든 속성과 디렉티브는 해당 엘리먼트가가 없으면 의미가 없으므로 버려집니다.

  
  싱글 파일 컴포넌트는 [최상위 `<template>` 태그](/api/sfc-spec.html#language-blocks)를 사용하여 전체 템플릿을 래핑합니다. 그 사용법은 위에서 설명한 `<template>`의 사용과는 별개입니다. 해당 최상위 태그는 템플릿 자체의 일부가 아니며 지시문과 같은 템플릿 문법을 지원하지 않습니다.

- **See also:**
  - [가이드 - `v-if` on `<template>`](/guide/essentials/conditional.html#v-if-on-template) 
  - [가이드 - `v-for` on `<template>`](/guide/essentials/list.html#v-for-on-template) 
  - [가이드 - Named slots](/guide/components/slots.html#named-slots) 
