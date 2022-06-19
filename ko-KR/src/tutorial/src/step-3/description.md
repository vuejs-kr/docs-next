# 속성 바인딩

Vue에서 이중 중괄호는 텍스트 삽입에만 사용됩니다.
속성을 동적 값에 바인딩하려면 `v-bind` 디렉티브를 사용합니다:

```vue-html
<div v-bind:id="dynamicId"></div>
```

**디렉티브**는 `v-` 접두사로 시작하는 특수한 속성으로 Vue 템플릿 문법의 일부입니다.
텍스트 삽입과 유사하게 디렉티브 값은 컴포넌트의 상태에 접근할 수 있는 JavaScript 표현식입니다.
`v-bind` 및 디렉티브 문법에 대한 자세한 내용은 <a target="_blank" href="/guide/essentials/template-syntax.html">가이드 - 템플릿 문법</a>에서 설명합니다.

콜론(`:`) 뒤의 부분(`id`)은 디렉티브의 "인수"입니다.
여기서 엘리먼트의 `id` 속성은 컴포넌트 상태의 `dynamicId` 속성과 동기화됩니다.

`v-bind`는 너무 자주 사용되기 때문에 전용 단축 문법이 있습니다:

```vue-html
<div :id="dynamicId"></div>
```

이제 <span class="options-api">`data` 속성</span><span class="composition-api">`ref`</span>의 `titleClass`을 값으로 사용하여,
`<h1>`의 `class`에 동적 바인딩을 추가해 보십시오.
올바르게 바인딩된 경우, 텍스트가 빨간색으로 변해야 합니다.
