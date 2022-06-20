# 조건부 렌더링

엘리먼트를 조건부로 렌더링하기 위해 `v-if` 디렉티브를 사용할 수 있습니다:

```vue-html
<h1 v-if="awesome">Vue는 굉장해! 엄청나!</h1>
```

이 `<h1>`은 `awesome`의 값이 [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)인 경우에만 렌더링됩니다.
`awesome`이 [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 값으로 변경되면 DOM에서 제거됩니다.

또한 `v-else` 및 `v-else-if`를 사용하여 조건의 다른 분기를 나타낼 수도 있습니다:

```vue-html
<h1 v-if="awesome">Vue는 굉장해! 엄청나!</h1>
<h1 v-else>오 안돼 😢</h1>
```

현재 데모는 두 개의 `<h1>`을 동시에 표시하고 있으며,
버튼은 아무 작업도 수행하지 않습니다.
`v-if` 및 `v-else` 디렉티브를 추가하고 버튼을 사용하여 둘 사이를 전환할 수 있도록 `toggle()` 메서드를 구현해봅시다.

`v-if`에 대한 자세한 내용은 <a target="_blank" href="/guide/essentials/conditional.html">가이드 - 조건부 렌더링</a>에서 다룹니다.
