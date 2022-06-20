# 폼(form) 바인딩

`v-bind`와 `v-on`을 함께 사용하면, 폼 안의 입력 엘리먼트에 양방향 바인딩을 만들 수 있습니다:

```vue-html
<input :value="text" @input="onInput">
```

<div class="options-api">

```js
methods: {
  onInput(e) {
    // v-on 핸들러는 네이티브 DOM 이벤트를 인자로 받습니다.
    this.text = e.target.value
  }
}
```

</div>

<div class="composition-api">

```js
function onInput(e) {
  // v-on 핸들러는 네이티브 DOM 이벤트를 인자로 받습니다.
  text.value = e.target.value
}
```

</div>

입력란에 입력할 때, `<p>`에 텍스트가 업데이트되는 것을 볼 수 있습니다.

Vue는 양방향 바인딩을 단순화하기 위해, 위 문법을 간편 표기하는 `v-model` 디렉티브를 제공합니다:

```vue-html
<input v-model="text">
```

`v-model`은 `<input>`의 값을 바인딩된 상태와 자동으로 동기화하므로,
더 이상 이에 대한 이벤트 핸들러를 사용할 필요가 없습니다.

`v-model`은 텍스트 입력 외에도 체크박스, 라디오 버튼, 셀렉트 드롭다운과 같은 다른 입력 타입에서도 작동합니다.
자세한 내용은 <a target="_blank" href="/guide/essentials/forms.html">가이드 - Form 입력 바인딩</a>에서 다룹니다.

이제 `v-model`을 대신 사용하도록 코드를 리팩토링 해봅시다.
