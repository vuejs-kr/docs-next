:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# List Rendering
# 리스트 렌더링


<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/list-rendering-in-vue-3" title="Free Vue.js List Rendering Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-list-rendering-in-vue" title="Free Vue.js List Rendering Lesson"/>
</div>

## `v-for`

## `v-for`로 엘리먼트에 배열 매핑하기

We can use the `v-for` directive to render a list of items based on an array. The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an **alias** for the array element being iterated on:

`v-for` 디렉티브를 사용하여 배열을 목록(List)으로 렌더링 할 수 있습니다. `v-for` 디렉티브는 `item in items` 형태의 특별한 문법을 사용합니다. `items`는 원본 데이터 배열이고 `item`은 반복되는 배열 엘리먼트의 **별칭**(Alias)입니다:

<div class="composition-api">

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>

<div class="options-api">

```js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="item in items">
  {{ item.message }}
</li>
```

Inside the `v-for` scope, template expressions have access to all parent scope properties. In addition, `v-for` also supports an optional second alias for the index of the current item:

`v-for` 블럭안의 템플릿 표현식은 부모 범위(scope)의 모든 속성에 대해 접근 할 수 있습니다. `v-for`는 두번째 인자(옵션)으로 현재 항목의 인덱스를 제공합니다:

<div class="composition-api">

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

</div>
<div class="options-api">

```js
data() {
  return {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

</div>

```vue-html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<script setup>
const parentMessage = 'Parent'
const items = [{ message: 'Foo' }, { message: 'Bar' }]
</script>
<div class="demo">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGFyZW50TWVzc2FnZSA9IHJlZignUGFyZW50JylcbmNvbnN0IGl0ZW1zID0gcmVmKFt7IG1lc3NhZ2U6ICdGb28nIH0sIHsgbWVzc2FnZTogJ0JhcicgfV0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGkgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGl0ZW1zXCI+XG4gIFx0e3sgcGFyZW50TWVzc2FnZSB9fSAtIHt7IGluZGV4IH19IC0ge3sgaXRlbS5tZXNzYWdlIH19XG5cdDwvbGk+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgcGFyZW50TWVzc2FnZTogJ1BhcmVudCcsXG4gICAgXHRpdGVtczogW3sgbWVzc2FnZTogJ0ZvbycgfSwgeyBtZXNzYWdlOiAnQmFyJyB9XVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGxpIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1wiPlxuICBcdHt7IHBhcmVudE1lc3NhZ2UgfX0gLSB7eyBpbmRleCB9fSAtIHt7IGl0ZW0ubWVzc2FnZSB9fVxuXHQ8L2xpPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

The variable scoping of `v-for` is similar to the following JavaScript:

`v-for` 변수의 범위는 다음 자바스크립트와 유사합니다: 

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // has access to outer scope `parentMessage`
  // but `item` and `index` are only available in here
  // 외부 `parentMessage` 에 접근할수 있습니다. 
  // 그런데 `item` 과  `index` 는 여기에서만 접근할수 있습니다. 
  console.log(parentMessage, item.message, index)
})
```

Notice how the `v-for` value matches the function signature of the `forEach` callback. In fact, you can use destructuring on the `v-for` item alias similar to destructuring function arguments:

`v-for`에서 주어진 값이  `forEach`의 콜백 함수의 시그니처와 유사 하다는 것을 알아 채셨나요? `forEach` 콜백 함수의 인자값을 구조분해(destructure) 해서 사용하는 것과 마찬가지로 `v-for`에서도 아이템 alias 부분에 구조분해를 사용할 수 있습니다:


```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

For nested `v-for`, scoping also works similar to nested functions. Each `v-for` scope has access to parent scopes:

중첩된 `v-for`에서도 중첩된 함수와 유사한 범위를 가집니다. 각각의 `v-for`는 부모 범위에 접근할수 있습니다:

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript's syntax for iterators:

`in` 대신에 `of`를 구분자로 사용할 수 있습니다. 자바스크립트의 이터레이터 구문과 유사합니다.


```vue-html
<div v-for="item of items"></div>
```

## `v-for` with an Object

## `v-for`와 객체

You can also use `v-for` to iterate through the properties of an object.

`v-for`를 사용하여 객체의 속성을 반복할 수도 있습니다.

<div class="composition-api">

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}
```

</div>

```vue-html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

You can also provide a second alias for the property's name (a.k.a. key):

두번째 인자 값(옵션)으로 객체 속성의 이름(보통 key라고 부르는)을 받아서 사용 할 수 있습니다:


```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

And another for the index:

그리고 세번째 인자 값(옵션)으로 인덱스도 전달 할 수 있습니다: 

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBteU9iamVjdCA9IHJlYWN0aXZlKHtcbiAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcbiAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICBwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG59KVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PHVsPlxuICAgIDxsaSB2LWZvcj1cIih2YWx1ZSwga2V5LCBpbmRleCkgaW4gbXlPYmplY3RcIj5cblx0XHQgIHt7IGluZGV4IH19LiB7eyBrZXkgfX06IHt7IHZhbHVlIH19XG5cdFx0PC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgbXlPYmplY3Q6IHtcbiAgXHQgICAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcblx0ICAgICAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICAgICAgXHRwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG4gICAgXHR9XG4gIFx0fVxuXHR9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8dWw+XG4gICAgPGxpIHYtZm9yPVwiKHZhbHVlLCBrZXksIGluZGV4KSBpbiBteU9iamVjdFwiPlxuXHRcdCAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cblx0XHQ8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

:::tip Note
When iterating over an object, the order is based on the enumeration order of `Object.keys()`, which isn't guaranteed to be consistent across JavaScript engine implementations.
:::

:::tip 참고
객체 속성을 순회 할 때의 순서는 `Object.keys()`의 키 나열 순서에 따라 결정됩니다. 이 순서는 자바스크립트 엔진 구현마다 다를수 있습니다. 
:::

## `v-for` with a Range

## 정수값 범위를 가지는 `v-for`

`v-for` can also take an integer. In this case it will repeat the template that many times, based on a range of `1...n`.

`v-for` 는 정수를 인자로 받을수 있습니다. 이때는 템플릿을 1부터 주어진 숫자(`1...n`)까지 증가하며 반복하게 됩니다. 

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

Note here `n` starts with an initial value of `1` instead of `0`.

`n`이 `0` 이 아니라 `1` 부터 시작한다는 점에 주의 하세요.

## `v-for` on `<template>`

## 템플릿에 `v-for` 사용하기

Similar to template `v-if`, you can also use a `<template>` tag with `v-for` to render a block of multiple elements. For example:

템플릿의 `v-if`와 마찬가지로, `v-for`와 함께 `<template>` 태그를 사용하여 여러 요소로 구성된 블럭을 목록으로 렌더링 할 수 있습니다. 예를들어:


```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` with `v-if`

:::warning Note
It's **not** recommended to use `v-if` and `v-for` on the same element due to implicit precedence. Refer to [style guide](/style-guide/rules-essential.html#avoid-v-if-with-v-for) for details.
:::

:::tip 참고
`v-if`와 `v-for`를 함께 사용하는 것은 권장되지 **않습니다.** 자세한 내용은 [스타일 가이드](/style-guide/rules-essential.html#avoid-v-if-with-v-for) 를 참조하세요. 
:::

When they exist on the same node, `v-if` has a higher priority than `v-for`. That means the `v-if` condition will not have access to variables from the scope of the `v-for`:

동일한 노드에 있는 경우, `v-if`는 `v-for`보다 우선 순위가 높습니다. 즉, `v-if` 조건은 `v-for` 범위의 변수에 접근할 수 없습니다:

```vue-html
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

This can be fixed by moving `v-for` to a wrapping `<template>` tag (which is also more explicit):

`v-for`를 래핑(wrapping)하는 `<template>`태그를 사용하면 문제를 해결할 수 있습니다:

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## Maintaining State with `key`
## `key` 를 통한 상태유지


When Vue is updating a list of elements rendered with `v-for`, by default it uses an "in-place patch" strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.

Vue가 `v-for`에서 렌더링된 엘리먼트 목록을 갱신할 때 기본적으로 "in-place patch" 전략을 사용합니다. Vue는 데이터 항목의 순서가 변경된 경우 항목의 순서와 일치하도록 DOM 요소를 이동하는 대신(Reflow를 유발하는 대신), 각 데이터와 일치하는 인덱스에 해당하는 앨리먼트를 찾아 그 자리에서(in-place) 바로 패치 작업을 수행하여 다시 그립니다(Repaint). 

:::tip 참고
웹 브라우저에서는 레이아웃을 구성하는 DOM Tree의 변경이 발생 할 때(Reflow) 보다는 같은 DOM Tree 구성인 상태에서 내부 컨텐츠만 변경되는 것(Repaint)을 훨씬 더 빠르게 재 랜더링 합니다. 
좀더 자세한 내용은 다음 [문서](https://web.dev/critical-rendering-path-render-tree-construction/) 를 참고하세요
:::

This default mode is efficient, but **only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)**.

이 기본 모드는 효율적이지만 **목록의 출력 결과가 하위 컴포넌트 상태 또는 DOM의 임시적인 상태(예: 폼 input에 사용자가 입력중인 문자열등)에 의존하지 않는 경우**에 적합합니다.

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item:

각 노드의 id를 추적하여, 재사용하거나 순서를 변경하는등의 작업을 위해 각 아이템에 유일한 `key` 속성을 주어, vue에게 힌트를 줄수 있습니다:


```vue-html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

When using `<template v-for>`, the `key` should be placed on the `<template>` container:

`<template v-for>`를 사용할 때 `key`는 `<template>` 컨테이너에 있어야 합니다"


```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip Note
`key` here is a special attribute being bound with `v-bind`. It should not be confused with the property key variable when [using `v-for` with an object](#v-for-with-an-object).
:::

:::tip 참고
여기서 `key` 는 `v-bind` 와 결합되는 특수 속성입니다. [객체와 함께 `v-for`를 사용할 때](#v-for-with-an-object) 설명했던 객체의 속성명과 혼동해서는 안 됩니다.
:::

[It is recommended](/style-guide/rules-essential.html#use-keyed-v-for) to provide a `key` attribute with `v-for` whenever possible, unless the iterated DOM content is simple (i.e. contains no components or stateful DOM elements), or you are intentionally relying on the default behavior for performance gains.

반복되는 DOM 내용이 단순한 경우나 의도적인 성능 향상을 위해 기본 동작에 의존하지 않는 경우를 제외하면, 가능하면 언제나 `v-for`에 `key`를 추가하는 것이 [좋습니다](/style-guide/rules-essential.html#use-keyed-v-for).

The `key` binding expects primitive values - i.e. strings and numbers. Do not use objects as `v-for` keys. For detailed usage of the `key` attribute, please see the [`key` API documentation](/api/built-in-special-attributes.html#key).

`key` 는 문자열이나 숫자같은 원시형 값을 가져야 합니다. 객체를 `v-for`의 키로 사용해서는 안됩니다. `key`에 대한 자세한 설명은  [`key` API documentation](/api/built-in-special-attributes.html#key) 를 참고 하세요. 



## `v-for` with a Component

## 컴포넌트의 `v-for`

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

> 이 섹션에서는 [컴포넌트](/guide/essentials/component-basics) 를 안다고 가정합니다. 부담없이 건너뛰어도 됩니다.

You can directly use `v-for` on a component, like any normal element (don't forget to provide a `key`):

보통의 앨리먼트처럼 `v-for`를  컴포넌트에 바로 사용할 수 있습니다.(`key`를 주는것을 잊지 마세요)

```vue-html
<my-component v-for="item in items" :key="item.id"></my-component>
```

However, this won't automatically pass any data to the component, because components have isolated scopes of their own. In order to pass the iterated data into the component, we should also use props:

그러나 컴포넌트에는 자체 범위가 분리되어있기 때문에 컴포넌트에 데이터를 자동으로 전달하지는 않습니다. 반복할 데이터를 컴포넌트로 전달하려면 props도 사용해야합니다.

```vue-html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

The reason for not automatically injecting `item` into the component is because that makes the component tightly coupled to how `v-for` works. Being explicit about where its data comes from makes the component reusable in other situations.


`item`을 컴포넌트에 자동으로 삽입하지 않는 이유는, 그렇게 했을 경우 컴포넌트가 `v-for`이 있어야만 동작하는 것 처럼 강하게 커플링 되기 때문입니다. `item`을 컴포넌트에 은밀하게 전달하지 않고 명시적으로 전달함으로써, 컴포넌트를 재사용 할 수 있게 됩니다.

<div class="composition-api">

Check out [this example of a simple todo list](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5jb25zdCBuZXdUb2RvVGV4dCA9IHJlZignJylcbmNvbnN0IHRvZG9zID0gcmVmKFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gIH1cbl0pXG5cbmxldCBuZXh0VG9kb0lkID0gNFxuXG5mdW5jdGlvbiBhZGROZXdUb2RvKCkge1xuICB0b2Rvcy52YWx1ZS5wdXNoKHtcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHRpdGxlOiBuZXdUb2RvVGV4dC52YWx1ZVxuICB9KVxuICBuZXdUb2RvVGV4dC52YWx1ZSA9ICcnXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwiYWRkTmV3VG9kb1wiPlxuICAgIDxsYWJlbCBmb3I9XCJuZXctdG9kb1wiPkFkZCBhIHRvZG88L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm5ld1RvZG9UZXh0XCJcbiAgICAgIGlkPVwibmV3LXRvZG9cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJFLmcuIEZlZWQgdGhlIGNhdFwiXG4gICAgLz5cbiAgICA8YnV0dG9uPkFkZDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDx1bD5cbiAgICA8dG9kby1pdGVtXG4gICAgICB2LWZvcj1cIih0b2RvLCBpbmRleCkgaW4gdG9kb3NcIlxuICAgICAgOmtleT1cInRvZG8uaWRcIlxuICAgICAgOnRpdGxlPVwidG9kby50aXRsZVwiXG4gICAgICBAcmVtb3ZlPVwidG9kb3Muc3BsaWNlKGluZGV4LCAxKVwiXG4gICAgPjwvdG9kby1pdGVtPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiVG9kb0l0ZW0udnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsncmVtb3ZlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8bGk+XG4gICAge3sgdGl0bGUgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cIiRlbWl0KCdyZW1vdmUnKVwiPlJlbW92ZTwvYnV0dG9uPlxuICA8L2xpPlxuPC90ZW1wbGF0ZT4ifQ==) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>
<div class="options-api">

Check out [this example of a simple todo list](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgVG9kb0l0ZW0gfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3VG9kb1RleHQ6ICcnLFxuICAgICAgdG9kb3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBuZXh0VG9kb0lkOiA0XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkTmV3VG9kbygpIHtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm5leHRUb2RvSWQrKyxcbiAgICAgICAgdGl0bGU6IHRoaXMubmV3VG9kb1RleHRcbiAgICAgIH0pXG4gICAgICB0aGlzLm5ld1RvZG9UZXh0ID0gJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XCJhZGROZXdUb2RvXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5ldy10b2RvXCI+QWRkIGEgdG9kbzwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibmV3VG9kb1RleHRcIlxuICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICBwbGFjZWhvbGRlcj1cIkUuZy4gRmVlZCB0aGUgY2F0XCJcbiAgICAvPlxuICAgIDxidXR0b24+QWRkPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgPHVsPlxuICAgIDx0b2RvLWl0ZW1cbiAgICAgIHYtZm9yPVwiKHRvZG8sIGluZGV4KSBpbiB0b2Rvc1wiXG4gICAgICA6a2V5PVwidG9kby5pZFwiXG4gICAgICA6dGl0bGU9XCJ0b2RvLnRpdGxlXCJcbiAgICAgIEByZW1vdmU9XCJ0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXCJcbiAgICA+PC90b2RvLWl0ZW0+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJUb2RvSXRlbS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWydyZW1vdmUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxpPlxuICAgIHt7IHRpdGxlIH19XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgncmVtb3ZlJylcIj5SZW1vdmU8L2J1dHRvbj5cbiAgPC9saT5cbjwvdGVtcGxhdGU+In0=) to see how to render a list of components using `v-for`, passing different data to each instance.

</div>

## Array Change Detection

## 배열 변경 감지

### Mutation Methods
### 변경 메소드

Vue wraps an observed array's mutation methods so they will also trigger view updates. The wrapped methods are:

Vue는 감시중인 배열의 변경메소드를 래핑하여 뷰(view) 갱신을 트리거합니다. 래핑된 메소드는 다음과 같습니다.

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### Replacing an Array
### 배열 교체

Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. `filter()`, `concat()` and `slice()`, which do not mutate the original array but **always return a new array**. When working with non-mutating methods, we should replace the old array with the new one:

이름에서 알 수 있듯이 변경 메소드는 호출된 원래 배열을 변경합니다. 이에 비해 `filter()`, `concat()` and `slice()`와 같은 원래 배열을 변경하지는 않지만 **항상 새 배열을 반환**하는 비-변경 메소드도 있습니다. 비-변경 메소드로 작업할 때 이전 배열을 새 배열로 바꿀 수 있습니다:

<div class="composition-api">

```js
// `item` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

You might think this will cause Vue to throw away the existing DOM and re-render the entire list - luckily, that is not the case. Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.

이로 인해 Vue가 기존 DOM을 버리고 전체 목록을 다시 렌더링할 것이라고 생각할 수 있습니다. 다행히도 그렇지 않습니다. Vue는 DOM 요소 재사용을 최대화하기 위해 몇 가지 smart heuristics(스마트 휴리스틱, 과학적인 조건보다는 경험이나 직관에 의해 똑똑하게 의사결정을 하는 방식)을 구현하므로, 서로 중복되면서 겹치는 객체를 가지는 배열을 다른 배열로 교체하면서 렌더링 하는 작업은 매우 효율적으로 수행됩니다. 

## Displaying Filtered/Sorted Results
## 필터링/졍렬된 결과 표시

Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a computed property that returns the filtered or sorted array.

때때로 우리는 원래 데이터를 실제로 변경하거나 재설정하지 않고, 배열의 필터링되거나 정렬된 버전을 표시하려고 합니다. 이 경우 필터링되거나 정렬된 배열을 반환하는 computed 속성을 만들 수 있습니다.

For example:

예시:

<div class="composition-api">

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    numbers: [1, 2, 3, 4, 5]
  }
},
computed: {
  evenNumbers() {
    return this.numbers.filter(n => n % 2 === 0)
  }
}
```

</div>

```vue-html
<li v-for="n in evenNumbers">{{ n }}</li>
```

In situations where computed properties are not feasible (e.g. inside nested `v-for` loops), you can use a method:

computed 속성이 적절하지 않을때 (예. 중접된 `v-for` 루프 내부) 메소드를 사용 할 수 있습니다:

<div class="composition-api">

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
  }
},
methods: {
  even(numbers) {
    return numbers.filter(number => number % 2 === 0)
  }
}
```

</div>

```vue-html
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

Be careful with `reverse()` and `sort()` in a computed property! These two methods will mutate the original array, which should be avoided in computed getters. Create a copy of the original array before calling these methods:

계산된 속성내의  `reverse()` 및 `sort()`에 주의하세요! 이 두 가지 메소드는  computed getter에서 하지 말아야 하는 행동인, 원본 배열을 변경 작업을 하고 있습니다. 다음처럼 메서드를 호출하기 전에 원래 배열의 복사본을 만듭니다.


```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
