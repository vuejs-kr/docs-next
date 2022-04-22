:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::


# Conditional Rendering
# 조건부 렌더링

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/conditional-rendering-in-vue-3" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue" title="Free Vue.js Conditional Rendering Lesson"/>
</div>

<script setup>
import { ref } from 'vue'
const awesome = ref(true)
</script>

## `v-if`


The directive `v-if` is used to conditionally render a block. The block will only be rendered if the directive's expression returns a truthy value.

`v-if` 디렉티브는 조건에 따라 블록을 렌더링할 때 사용합니다. 블록은 디렉티브의 표현식이 true 값을 반환할 때만 렌더링됩니다.


```vue-html
<h1 v-if="awesome">Vue is awesome!</h1>
```

## `v-else`

You can use the `v-else` directive to indicate an "else block" for `v-if`:

`v-else` 디렉티브를 이용해 `v-if`의  "else 블록"을 표시할수 있습니다:

```vue-html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

<div class="demo">
  <button @click="awesome = !awesome">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

A `v-else` element must immediately follow a `v-if` or a `v-else-if` element - otherwise it will not be recognized.

`v-else` 엘리먼트는 `v-if` 나 `v-else-if` 엘리먼트 바로 다음에 나와야 합니다. 그렇지 않으면 인식되지 않습니다. 

## `v-else-if`

The `v-else-if`, as the name suggests, serves as an "else if block" for `v-if`. It can also be chained multiple times:

이름을 보면 알수 있듯이  `v-else-if`는 `v-if`의 "else if 블럭" 을 나타냅니다. 여러번 나올수 있습니다. 

```vue-html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

Similar to `v-else`, a `v-else-if` element must immediately follow a `v-if` or a `v-else-if` element.
`v-else` 와 마찬가지로  `v-else-if` 엘리먼트는 `v-if` 나 `v-else-if` 엘리먼트 바로 다음에 나와야 합니다. 

## `v-if` on `<template>`

### `<template>`에 `v-if`를 갖는 조건부 그룹 만들기


Because `v-if` is a directive, it has to be attached to a single element. But what if we want to toggle more than one element? In this case we can use `v-if` on a `<template>` element, which serves as an invisible wrapper. The final rendered result will not include the `<template>` element.

`v-if`는 디렉티브이기 때문에 하나의 엘리먼트에 추가되어야 합니다. 하지만 둘 이상의 엘리먼트를 전환하려면 어떻게 해야 할까요? 이런 경우, `v-if`를 `<template>` 엘리먼트에 사용할 수 있습니다. `<template>` 엘리먼트는 눈에 보이지 않게 내부 엘리먼트를 감싸는 역할(invisible wrapper)을 하며, 최종 렌더링 결과에 포함되지 않습니다.



```vue-html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

`v-else` and `v-else-if` can also be used on `<template>`.

`v-else` 나  `v-else-if`도  `<template>`에 나올수 있습니다. 

## `v-show`

Another option for conditionally displaying an element is the `v-show` directive. The usage is largely the same:

엘리먼트를 조건에 따라 표시하기 위한 또 다른 방법으로 `v-show` 디렉티브가 있습니다. 사용 방법은 거의 동일합니다:




```vue-html
<h1 v-show="ok">Hello!</h1>
```

The difference is that an element with `v-show` will always be rendered and remain in the DOM; `v-show` only toggles the `display` CSS property of the element.

둘의 차이는 `v-show`를 쓴 엘리먼트의 경우, 항상 렌더링 되어 DOM에 남아있다는 점입니다. `v-show`는 단순히 엘리먼트의 CSS `display` 속성만을 전환합니다.

`v-show` doesn't support the `<template>` element, nor does it work with `v-else`.

`v-show`는 `<template>` 엘리먼트를 지원하지 않으며, `v-else`와 함께 쓸 수 없습니다.


## `v-if` vs `v-show`
## `v-if` 대 `v-show`


`v-if` is "real" conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

`v-if`는 "실제(real)" 조건부 렌더링입니다. 전환 도중 조건부 블록 내부의 이벤트 리스너 및 자식 컴포넌트들이 올바르게 제거되고 다시 생성되기 때문입니다.


`v-if` is also **lazy**: if the condition is false on initial render, it will not do anything - the conditional block won't be rendered until the condition becomes true for the first time.

또한 `v-if`는 **게으릅니다(lazy)**. 초기 렌더링 시, 조건이 거짓(false)이면 아무 작업도 하지 않습니다. 조건부 블록은 조건이 처음으로 참(true)이 될 때까지 렌더링되지 않습니다.

In comparison, `v-show` is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

이에 비해 `v-show`는 훨씬 간단합니다. 엘리먼트는 CSS 기반 전환으로 초기 조건과 관계 없이 항상 렌더링됩니다. (역자 주: v-show는 엘리먼트를 DOM에 우선 렌더링하고 조건에 따라 CSS display:block/display:none 속성을 전환합니다.)

Generally speaking, `v-if` has higher toggle costs while `v-show` has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.

일반적으로 `v-if`는 전환 비용이 높은 반면, `v-show`는 초기 렌더링 비용이 높습니다. 그러므로 무언가를 자주 전환해야 한다면 `v-show`를 사용하는 게 좋고, 런타임 시 조건이 변경되지 않는다면 `v-if`를 사용하는 게 더 낫습니다.


## `v-if` with `v-for`

## `v-if` 와 `v-for`


::: warning Note
It's **not** recommended to use `v-if` and `v-for` on the same element due to implicit precedence. Refer to [style guide](/style-guide/rules-essential.html#avoid-v-if-with-v-for) for details.
:::

::: tip 참고
`v-if`와 `v-for`를 함께 쓰는 것은 **권장하지 않습니다**. 자세한 내용은 [스타일 가이드](/style-guide/rules-essential.html#avoid-v-if-with-v-for)  를 참고하세요. 
:::


When `v-if` and `v-for` are both used on the same element, `v-if` will be evaluated first. See the [list rendering guide](list#v-for-with-v-if) for details.

동일한 엘리먼트에 `v-if`와 `v-for`를 함께 사용할 때, `v-if`가 더 높은 우선순위를 갖습니다. 자세한 내용은 [리스트 렌더링 가이드](list#v-for-with-v-if)를 참고하세요.
