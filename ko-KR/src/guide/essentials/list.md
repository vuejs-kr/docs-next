# 리스트 렌더링

## `v-for`

`v-for` 지시문을 사용하여 배열을 리스트로 렌더링할 수 있습니다.
`v-for` 지시문은 `item in items` 형식의 특별한 문법이 필요합니다.
여기서 `items`는 배열이고, `item`(이하 아이템)은 배열 내 반복되는 요소의 **에일리어스**(alias)입니다.

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

`v-for` 범위 내 템플릿 표현식은 모든 상위 범위 속성에 액세스할 수 있습니다.
또한 `v-for`는 현재 아이템의 인덱스를 가리키는 선택적 두 번째 에일리어스도 지원합니다.

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

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGFyZW50TWVzc2FnZSA9IHJlZignUGFyZW50JylcbmNvbnN0IGl0ZW1zID0gcmVmKFt7IG1lc3NhZ2U6ICdGb28nIH0sIHsgbWVzc2FnZTogJ0JhcicgfV0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGkgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGl0ZW1zXCI+XG4gIFx0e3sgcGFyZW50TWVzc2FnZSB9fSAtIHt7IGluZGV4IH19IC0ge3sgaXRlbS5tZXNzYWdlIH19XG5cdDwvbGk+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgcGFyZW50TWVzc2FnZTogJ1BhcmVudCcsXG4gICAgXHRpdGVtczogW3sgbWVzc2FnZTogJ0ZvbycgfSwgeyBtZXNzYWdlOiAnQmFyJyB9XVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGxpIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1wiPlxuICBcdHt7IHBhcmVudE1lc3NhZ2UgfX0gLSB7eyBpbmRleCB9fSAtIHt7IGl0ZW0ubWVzc2FnZSB9fVxuXHQ8L2xpPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

`v-for`의 변수 범위는 JavaScript와 유사합니다:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // forEach의 콜백 함수 외부에 있는 `parentMessage`에 대한 접근 가능.
  // 반면 `item`과 `index`는 콜백함수 내부에서만 접근 가능.
  console.log(parentMessage, item.message, index)
})
```

`v-for`에 주어진 값이 `forEach`의 콜백 함수의 특징과 유사하다는 것을 눈치챘나요?
실제로 콜백 함수 인수를 분해 할당해 사용할 수 있는 것처럼, `v-for`의 아이템도 분해 할당해 사용할 수 있습니다:

```vue-html
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- index 에일리어스도 사용 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

중첩된 `v-for`의 경우, 중첩된 함수와 유사한 범위를 가집니다.
각 `v-for` 범위에는 상위 범위에 대한 접근 권한이 있습니다.

```vue-html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

`in` 대신 `of`를 구분 기호를 사용하여 JavaScript 반복문 문법처럼 사용할 수도 있습니다:

```vue-html
<div v-for="item of items"></div>
```

## 객체에 `v-for` 사용하기

`v-for`를 객체의 속성을 반복하는 데 사용할 수 있습니다:

<div class="composition-api">

```js
const myObject = reactive({
  title: 'Vue에서 목록을 작성하는 방법',
  author: '홍길동',
  publishedAt: '2016-04-10'
})
```

</div>
<div class="options-api">

```js
data() {
  return {
    myObject: {
      title: 'Vue에서 목록을 작성하는 방법',
      author: '홍길동',
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

속성명을 가리키는 두 번째 에일리어스를 사용할 수도 있습니다:

```vue-html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

그리고 인덱스를 가리키는 세 번째 에일리어스를 사용할 수도 있습니다:

```vue-html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBteU9iamVjdCA9IHJlYWN0aXZlKHtcbiAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcbiAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICBwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG59KVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PHVsPlxuICAgIDxsaSB2LWZvcj1cIih2YWx1ZSwga2V5LCBpbmRleCkgaW4gbXlPYmplY3RcIj5cblx0XHQgIHt7IGluZGV4IH19LiB7eyBrZXkgfX06IHt7IHZhbHVlIH19XG5cdFx0PC9saT5cbiAgPC91bD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgbXlPYmplY3Q6IHtcbiAgXHQgICAgdGl0bGU6ICdIb3cgdG8gZG8gbGlzdHMgaW4gVnVlJyxcblx0ICAgICAgYXV0aG9yOiAnSmFuZSBEb2UnLFxuICAgICAgXHRwdWJsaXNoZWRBdDogJzIwMTYtMDQtMTAnXG4gICAgXHR9XG4gIFx0fVxuXHR9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8dWw+XG4gICAgPGxpIHYtZm9yPVwiKHZhbHVlLCBrZXksIGluZGV4KSBpbiBteU9iamVjdFwiPlxuXHRcdCAge3sgaW5kZXggfX0uIHt7IGtleSB9fToge3sgdmFsdWUgfX1cblx0XHQ8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

:::tip 참고
객체 속성을 순회할 때의 순서는 `Object.keys()`의 키 나열 순서를 따르며, 구현된 JavaScript 엔진에 따라 순서는 다를 수 있습니다.
:::

## 숫자 범위에 `v-for` 사용하기

`v-for`는 정수를 사용할 수도 있습니다.
이 경우 `1...n` 범위를 기준으로 템플릿을 여러 번 반복합니다.

```vue-html
<span v-for="n in 10">{{ n }}</span>
```

여기서 `n`의 값은 `0`이 아니라 `1`부터 시작합니다.

## `<template>`에서 `v-for` 사용하기

`v-if`와 유사하게 `<template>` 태그에 `v-for`를 사용하여 여러 엘리먼트 블록을 렌더링할 수도 있습니다:

```vue-html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-if`에 `v-for` 사용하기

:::warning 참고
`v-if`와 `v-for`를 함께 사용하는 것은 **권장되지 않습니다**.

[comment]: <> (자세한 내용은 [스타일 가이드]&#40;/style-guide/rules-essential.html#avoid-v-if-with-v-for&#41;를 참조하세요.)
:::

이것들이 같은 노드에 존재할 때 `v-if`가 `v-for`보다 우선순위가 높기 때문에 `v-if` 조건문에서 `v-for` 변수에 액세스할 수 없습니다:

```vue-html
<!--
"todo" 속성이 인스턴스에 정의되어 있지 않기 때문에 오류가 발생합니다.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

`<template>` 태그로 감싼 후, `v-for`를 옮겨서 해결할 수 있습니다(더 명시적이기도 함):

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

## `key`를 통한 상태유지

Vue가 `v-for`로 렌더링된 리스트를 업데이트할 때, 기본적으로 "in-place patch" 전략을 사용합니다.
리스트 아이템의 순서가 변경된 경우,
아이템의 순서와 일치하도록 DOM 엘리먼트를 이동하는 대신,
변경이 필요한 인덱스의 엘리먼트들을 제자리에서 패치해 아이템을 렌더링하도록 합니다.

이러한 기본동작은 효율적이지만, **리스트 렌더링 출력이 하위 컴포넌트 상태 또는 임시 DOM 상태(예: 양식 입력 값)에 의존하지 않는 경우에만 유효**합니다.

Vue가 각 노드의 ID를 추적하고 기존 엘리먼트를 재사용하고 재정렬할 수 있도록 힌트를 제공하려면 각 항목에 대해 고유한 `key` 속성을 제공해야 합니다.

```vue-html
<div v-for="item in items" :key="item.id">
  <!-- 내용 -->
</div>
```

`<template v-for>`를 사용할 때 `key`는 `<template>` 컨테이너에 있어야 합니다.

```vue-html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

:::tip 참고
여기서 `key`는 `v-bind`와 결합되는 특수 속성입니다.
[객체에 `v-for` 사용하기](#객체에-v-for-사용하기)에서 언급하는 두 번째 에일리어스인 key와 혼동해서는 안 됩니다.
:::

반복된 DOM 컨텐츠가 단순하지 않거나, 의도적으로 성능을 위해 기본 동작에 의존하는 경우가 아니라면, `v-for`는 `key` 속성과 함께 사용하는 것을 권장합니다.

[comment]: <> (스타일 가이드 페이지 오픈시 위 문장에서 권장이라는 단어는 아래 주석과 같이 링크로 교체 필요)
[comment]: <> ([권장]&#40;/style-guide/rules-essential.html#use-keyed-v-for&#41;)

`key`에는 문자열, 숫자, 심볼 형식의 값만 바인딩해야 합니다.
`key` 속성의 자세한 사용법은 [`key` API 문서](/api/built-in-special-attributes.html#key)를 참조하세요.

## 컴포넌트에 `v-for` 사용하기

> 이 섹션은 [컴포넌트](/guide/essentials/component-basics)에 대한 지식이 있다고 가정하므로, 건너뛰고 나중에 읽어도 됩니다.

컴포넌트에 `v-for`를 직접 사용할 수 있습니다(`key` 사용을 잊지 마세요):

```vue-html
<my-component v-for="item in items" :key="item.id"></my-component>
```

그러나 컴포넌트에는 자체적으로 구분된 범위가 있기 때문에 컴포넌트에 데이터를 자동으로 전달하지 않습니다.
반복된 데이터를 컴포넌트에 전달하려면 props를 사용해야 합니다.

```vue-html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

컴포넌트에 `item`이 자동으로 전달되지 않는 이유는, 그렇지 않으면`v-for`를 사용해야만 컴포넌트 사용이 가능하도록 종속관계가 되기 때문입니다.
반면, 데이터를 명시해서 전달하는 방법은 `v-for`를 사용하지 않는 다른 상황에서도 컴포넌트가 데이터 전달 기능을 재사용할 수 있기 때문입니다.

<div class="composition-api">

각 인스턴스에 다른 데이터를 전달하는 `v-for`를 사용하여 컴포넌트 리스트를 렌더링하는 방법을 보려면 [간단한 할 일 목록 예제](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5jb25zdCBuZXdUb2RvVGV4dCA9IHJlZignJylcbmNvbnN0IHRvZG9zID0gcmVmKFtcbiAge1xuICAgIGlkOiAxLFxuICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gIH1cbl0pXG5cbmxldCBuZXh0VG9kb0lkID0gNFxuXG5mdW5jdGlvbiBhZGROZXdUb2RvKCkge1xuICB0b2Rvcy52YWx1ZS5wdXNoKHtcbiAgICBpZDogbmV4dFRvZG9JZCsrLFxuICAgIHRpdGxlOiBuZXdUb2RvVGV4dC52YWx1ZVxuICB9KVxuICBuZXdUb2RvVGV4dC52YWx1ZSA9ICcnXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwiYWRkTmV3VG9kb1wiPlxuICAgIDxsYWJlbCBmb3I9XCJuZXctdG9kb1wiPkFkZCBhIHRvZG88L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm5ld1RvZG9UZXh0XCJcbiAgICAgIGlkPVwibmV3LXRvZG9cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJFLmcuIEZlZWQgdGhlIGNhdFwiXG4gICAgLz5cbiAgICA8YnV0dG9uPkFkZDwvYnV0dG9uPlxuICA8L2Zvcm0+XG4gIDx1bD5cbiAgICA8dG9kby1pdGVtXG4gICAgICB2LWZvcj1cIih0b2RvLCBpbmRleCkgaW4gdG9kb3NcIlxuICAgICAgOmtleT1cInRvZG8uaWRcIlxuICAgICAgOnRpdGxlPVwidG9kby50aXRsZVwiXG4gICAgICBAcmVtb3ZlPVwidG9kb3Muc3BsaWNlKGluZGV4LCAxKVwiXG4gICAgPjwvdG9kby1pdGVtPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiVG9kb0l0ZW0udnVlIjoiPHNjcmlwdCBzZXR1cD5cbmRlZmluZVByb3BzKFsndGl0bGUnXSlcbmRlZmluZUVtaXRzKFsncmVtb3ZlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8bGk+XG4gICAge3sgdGl0bGUgfX1cbiAgICA8YnV0dG9uIEBjbGljaz1cIiRlbWl0KCdyZW1vdmUnKVwiPlJlbW92ZTwvYnV0dG9uPlxuICA8L2xpPlxuPC90ZW1wbGF0ZT4ifQ==)를 확인하세요.

</div>
<div class="options-api">

각 인스턴스에 다른 데이터를 전달하는 `v-for`를 사용하여 컴포넌트 리스트를 렌더링하는 방법을 보려면 [간단한 할 일 목록 예제](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBUb2RvSXRlbSBmcm9tICcuL1RvZG9JdGVtLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgVG9kb0l0ZW0gfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3VG9kb1RleHQ6ICcnLFxuICAgICAgdG9kb3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIHRpdGxlOiAnRG8gdGhlIGRpc2hlcydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHRpdGxlOiAnVGFrZSBvdXQgdGhlIHRyYXNoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgdGl0bGU6ICdNb3cgdGhlIGxhd24nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBuZXh0VG9kb0lkOiA0XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkTmV3VG9kbygpIHtcbiAgICAgIHRoaXMudG9kb3MucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm5leHRUb2RvSWQrKyxcbiAgICAgICAgdGl0bGU6IHRoaXMubmV3VG9kb1RleHRcbiAgICAgIH0pXG4gICAgICB0aGlzLm5ld1RvZG9UZXh0ID0gJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XCJhZGROZXdUb2RvXCI+XG4gICAgPGxhYmVsIGZvcj1cIm5ldy10b2RvXCI+QWRkIGEgdG9kbzwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibmV3VG9kb1RleHRcIlxuICAgICAgaWQ9XCJuZXctdG9kb1wiXG4gICAgICBwbGFjZWhvbGRlcj1cIkUuZy4gRmVlZCB0aGUgY2F0XCJcbiAgICAvPlxuICAgIDxidXR0b24+QWRkPC9idXR0b24+XG4gIDwvZm9ybT5cbiAgPHVsPlxuICAgIDx0b2RvLWl0ZW1cbiAgICAgIHYtZm9yPVwiKHRvZG8sIGluZGV4KSBpbiB0b2Rvc1wiXG4gICAgICA6a2V5PVwidG9kby5pZFwiXG4gICAgICA6dGl0bGU9XCJ0b2RvLnRpdGxlXCJcbiAgICAgIEByZW1vdmU9XCJ0b2Rvcy5zcGxpY2UoaW5kZXgsIDEpXCJcbiAgICA+PC90b2RvLWl0ZW0+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJUb2RvSXRlbS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXHRwcm9wczogWyd0aXRsZSddLFxuICBlbWl0czogWydyZW1vdmUnXVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxpPlxuICAgIHt7IHRpdGxlIH19XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgncmVtb3ZlJylcIj5SZW1vdmU8L2J1dHRvbj5cbiAgPC9saT5cbjwvdGVtcGxhdGU+In0=)를 확인하세요.

</div>

## 배열 변경 감지

### 수정 메서드

Vue는 배열을 수정하는 메서드를 래핑하고 관찰하며 뷰(view) 업데이트를 트리거합니다. 래핑된 메서드는 다음과 같습니다:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### 배열 교체

수정 메서드는 이름에서 알 수 있듯이 호출된 원래 배열을 수정합니다.
이에 비해 수정이 아닌 방법도 있습니다.
`filter()`, `concat()` 및 `slice()`는 원본 배열을 수정하지 않고 **항상 새 배열을 반환합니다**.
이러한 방법으로 작업하는 경우, 이전 배열을 새 배열로 교체해야 합니다.

<div class="composition-api">

```js
// `items`는 값이 있는 배열의 ref라고 가정된 경우입니다.
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

</div>
<div class="options-api">

```js
// `items`는 값이 있는 배열의 ref라고 가정된 경우입니다.
this.items = this.items.filter((item) => item.message.match(/Foo/))
```

</div>

이로 인해 Vue가 기존 DOM을 버리고 전체 리스트를 다시 렌더링할 것이라고 생각할 수도 있습니다.
다행히도 그렇지 않습니다.
Vue는 DOM 엘리먼트 재사용을 최대화하기 위해 몇 가지 스마트 휴리스틱을 구현하므로,
이전 배열을 다른 배열로 바꾸는 과정에서 서로 중복되는 객체를 가지는 부분을 매우 효율적으로 처리합니다.

## 필터링/정렬 결과 표시

때로는 원본 데이터를 실제로 수정하거나 교체하지 않고 필터링되거나 정렬된 결과를 표시하고 싶을 수 있습니다.
이 경우 필터링되거나 정렬된 배열을 반환하는 계산된 속성을 만들 수 있습니다.

예제 코드:

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

계산된 속성이 실현 가능하지 않은 상황(예: 중첩된 `v-for` 루프 내부)에서는 다음과 같은 방법으로 해결할 수 있습니다:

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

계산된 속성에서 `reverse()`와 `sort()` 사용에 주의하십시오!
이 두 가지 방법은 원본 배열을 수정하므로 계산된 속성의 getter 함수에서 피해야합니다.
다음 메서드를 호출하기 전에 원본 배열의 복사본을 만듭니다:

```diff
- return numbers.reverse()
+ return [...numbers].reverse()
```
