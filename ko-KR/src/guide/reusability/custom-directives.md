# 커스텀 지시문

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## 소개

코어에 포함된 기본 지시문 세트(예: `v-model` 또는 `v-show`) 외에도 Vue를 사용하면 커스텀 지시문을 정의할 수 있습니다.

우리는 Vue에서 [컴포넌트 기초](/guide/essentials/component-basics.html)와 [구성화](./composables)라는 두 가지 형태의 코드 재사용을 도입했습니다.
컴포넌트는 주요 구성-요소(building-block)이고, 구성화는 상태 저장 로직을 재사용하는 데 중점을 둡니다.
반면에 커스텀 지시문은 주로 일반 엘리먼트에 대한 저수준(low-level) DOM 접근과 관련된 로직을 재사용하기 위한 것입니다.

커스텀 지시문은 컴포넌트의 수명주기 훅을 포함하는 객체처럼 정의됩니다.
훅은 지시문이 바인딩된 엘리먼트를 수신합니다.
다음은 엘리먼트가 Vue에 의해 DOM에 삽입될 때, `<input>`에 포커스 되는 커스텀 지시문 구현의 예제입니다:

<div class="composition-api">

```vue
<script setup>
// 템플릿에서 v-focus로 활성화 가능
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // 템플릿에서 v-focus로 활성화 가능
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="포커스 되어야 함" />
</div>

페이지의 다른 곳을 클릭하지 않았다고 가정하면, 위의 인풋은 자동으로 포커스 되어야 합니다.
이 지시문은 페이지 로드 시 뿐만 아니라, Vue에서 동적으로 엘리먼트를 삽입할 때도 작동하기 때문에 `autofocus` 속성보다 더 유용합니다.

<div class="composition-api">

`<script setup>`에서 `v` 접두사로 시작하는 모든 camelCase 변수를 커스텀 지시문으로 사용할 수 있습니다.
위의 예에서 `vFocus`는 템플릿에서 `v-focus`로 사용할 수 있습니다.

`<script setup>`을 사용하지 않는 경우, `directives` 옵션을 사용하여 커스텀 지시문을 등록할 수 있습니다:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 템플릿에서 v-focus로 활성화 가능
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

컴포넌트와 마찬가지로 커스텀 지시문은 템플릿에서 사용할 수 있도록 등록해야 합니다.
위의 예에서는 `directives` 옵션을 통해 로컬 등록을 사용하고 있습니다.

</div>

앱 수준에서 커스텀 지시문을 전역적으로 등록하는 것도 일반적입니다:

```js
const app = createApp({})

// 모든 컴포넌트에서 v-focus를 사용할 수 있도록 합니다.
app.directive('focus', {
  /* ... */
})
```

:::tip
커스텀 지시문은 원하는 기능을 직접 DOM 조작을 통해서만 달성할 수 있는 경우에만 사용해야 합니다.
가능하면 `v-bind`와 같은 내장 지시문을 사용하여 선언적 템플릿을 사용하는 것이 더 효율적이고 서버 렌더링에 친숙하기 때문입니다.
:::

## 지시문 훅

지시문을 정의하는 객체는 다음과 같은 여러 훅 기능을 제공할 수 있습니다(모두 선택 사항):

```js
const myDirective = {
  // 바인딩된 엘리먼트의 속성 또는
  // 이벤트 리스너가 적용되기 전에 호출됩니다.
  created(el, binding, vnode, prevVnode) {
    // 인자에 대한 자세한 내용은 아래를 참조.
  },
  // 엘리먼트가 DOM에 삽입되기 직전에 호출됩니다.
  beforeMount() {},
  // 바인딩된 엘리먼트의 부모 컴포넌트 및
  // 모든 자식 컴포넌트의 mounted 이후에 호출됩니다.
  mounted() {},
  // 부모 컴포넌트의 updated 전에 호출됩니다.
  beforeUpdate() {},
  // 바인딩된 엘리먼트의 부모 컴포넌트 및
  // 모든 자식 컴포넌트의 updated 이후에 호출됩니다.
  updated() {},
  // 부모 컴포넌트의 beforeUnmount 이후에 호출됩니다.
  beforeUnmount() {},
  // 부모 컴포넌트의 unmounted 전에 호출됩니다.
  unmounted() {}
}
```

### 훅 인자

지시문 훅에는 다음 인자가 전달됩니다:

- `el`: 지시문이 바인딩된 엘리먼트입니다. DOM을 직접 조작하는 데 사용할 수 있습니다.

- `binding`: 다음 속성을 포함하는 객체입니다.

  - `value`: 지시문에 전달된 값입니다. 예를 들어 `v-my-directive="1 + 1"`에서 value는 `2`입니다.
  - `oldValue`: 이것은 `beforeUpdate` 및 `updated`에서만 사용할 수 있습니다. 값이 변경되었는지 여부에 관계없이 사용 가능합니다.
  - `arg`: 지시문에 전달된 인자(있는 경우). 예를 들어 `v-my-directive:foo`에서 인자는 `"foo"`입니다.
  - `modifiers`: 수식어가 있는 경우 수식어를 포함하는 객체입니다. 예를 들어 `v-my-directive.foo.bar`에서 수식어 객체는 `{ foo: true, bar: true }`입니다.
  - `instance`: 지시문이 사용되는 컴포넌트의 인스턴스입니다.
  - `dir`: 지시문을 정의하는 객체

- `vnode`: 바인딩된 엘리먼트를 나타내는 기본 VNode.
- `prevNode`: 이전 렌더링에서 바인딩된 엘리먼트를 나타내는 VNode입니다. `beforeUpdate` 및 `updated` 훅에서만 사용할 수 있습니다.

다음과 같은 지시문을 사용한다고 가정한 예제를 살펴봅시다:

```vue-html
<div v-example:foo.bar="baz">
```

`binding` 인자는 다음과 같은 형태의 객체입니다:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz`의 값 */,
  oldValue: /* 업데이트 전 `baz`의 값 */
}
```

내장 지시문과 유사하게 커스텀 지시문 인수는 동적일 수 있습니다.
예를 들어:

```vue-html
<div v-example:[arg]="value"></div>
```

여기서 지시문 인자는 컴포넌트 상태의 `arg` 속성을 기반으로 반응형으로 업데이트됩니다.

:::tip 참고
`el`을 제외하고 이러한 인수들은 읽기 전용으로 처리하고 절대 수정해서는 안 됩니다.
훅 간에 정보를 공유해야 하는 경우 엘리먼트의 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)을 통해 공유하는 것이 좋습니다.
:::

## 간단하게 함수로 사용하기

커스텀 지시문이 `mounted` 및 `updated`에 대해 동일한 동작을 갖는 것이 일반적이며, 다른 훅은 필요하지 않습니다.
이러한 경우 지시문을 객체가 아닌 함수로 정의할 수 있습니다:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 이 함수가 호출되는 시점은 `mounted`와 `updated`입니다.
  el.style.color = binding.value
})
```

## 객체를 값으로 전달하기

지시문에 여러 값이 필요한 경우, JavaScript 객체 리터럴을 전달할 수도 있습니다.
지시문은 모든 유효한 JavaScript 표현식을 사용할 수 있음을 기억하십시오.

```vue-html
<div v-demo="{ color: 'white', text: '안녕!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "안녕!"
})
```

## 컴포넌트에서 사용

컴포넌트에 사용될 때 커스텀 지시문은 [폴스루 속성](/guide/components/attrs.html)과 유사하게 항상 컴포넌트의 루트 노드에 적용됩니다.

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- MyComponent 템플릿에서 -->

<div> <!-- 여기에 v-demo 지시문이 적용됩니다. -->
  <span>컴포넌트 컨텐츠...</span>
</div>
```

컴포넌트에는 잠재적으로 둘 이상의 루트 노드가 있을 수 있습니다.
다중 루트 컴포넌트에 적용하려고 하면 지시문이 무시되고 애러가 발생합니다.
속성과 달리 지시문은 `v-bind="$attrs"`를 사용하여 다른 엘리먼트에 전달할 수 없습니다.
일반적으로 컴포넌트에 커스텀 지시문을 사용하는 것은 **권장되지 않습니다**.
