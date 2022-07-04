# SFC 문법 설명서 {#sfc-syntax-specification}

## 개요 {#overview}

일반적으로 `*.vue` 파일 확장자를 사용하는 Vue 싱글 파일 컴포넌트(SFC)는 HTML과 유사한 문법을 사용하여 Vue 컴포넌트를 설명하는 커스텀 파일 형식입니다.
Vue SFC는 HTML과 문법적으로 호환됩니다.

각 `*.vue` 파일은 세 가지 유형의 최상위 언어 블록(`<template>`, `<script>`, `<style>`)과 선택적으로 추가 커스텀 블록으로 구성됩니다:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: '안녕 Vue!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
예를 들어 컴포넌트 설명서가 될 수 있습니다.
</custom1>
```

## 언어 블럭 {#language-blocks}

### `<template>`

- `*.vue` 파일은 최상위 `<template>` 블록은 하나만 포함할 수 있습니다.

- 콘텐츠는 추출되어 `@vue/compiler-dom`으로 전달되고,
  JavaScript 렌더 함수로 사전 컴파일되며,
  내보낸 컴포넌트에 `render` 옵션으로 첨부됩니다.

### `<script>`

- `*.vue` 파일은 하나의 `<script>` 블록만 포함할 수 있습니다([`<script setup>`](/api/sfc-script-setup.html) 제외).

- 스크립트는 ES 모듈로 실행됩니다.

- **기본 내보내기**는 일반 객체 또는 [defineComponent](/api/general.html#definecomponent)의 반환 값으로 Vue 컴포넌트 옵션 객체여야 합니다.

### `<script setup>`

- `*.vue` 파일은 하나의 `<script setup>` 블록만 포함할 수 있습니다(일반 `<script>` 제외).

- 스크립트는 전처리되어 컴포넌트의 `setup()` 함수로 사용됩니다.
  즉, **컴포넌트의 각 인스턴스**에 대해 실행됩니다.
  `<script setup>` 내에 최상위 바인딩은 템플릿에 자동으로 노출됩니다.
  자세한 내용은 [`<script setup>` 전용 문서](/api/sfc-script-setup)를 참조하십시오.

### `<style>`

- `*.vue` 파일에는 여러 `<style>` 태그가 포함될 수 있습니다.

- `<style>` 태그는 현재 컴포넌트에 스타일을 캡슐화하는 데 도움이 되도록,
  `scoped` 또는 `module` 속성(자세한 내용은 [SFC 스타일 특징](/api/sfc-css-features) 참고)을 가질 수 있습니다.
  캡슐화 모드가 다른 여러 `<style>` 태그를 동일한 컴포넌트에 혼합할 수 있습니다.

### 커스텀 블럭 {#custom-blocks}

프로젝트별 요구 사항에 따라 `*.vue` 파일에 추가 커스텀 블록을 포함할 수 있습니다(예: `<docs>` 블록).
커스텀 블록의 실제 예는 다음과 같습니다:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block)

커스텀 블록 처리는 도구에 따라 다릅니다.
자체 커스텀 블록 통합을 구축하려는 경우 자세한 내용은 [도구 섹션](/guide/scaling-up/tooling.html#sfc-custom-block-integrations)을 참고하십시오.

## 자동으로 이름 추론 {#automatic-name-inference}

다음과 같은 경우, SFC **파일 이름**에서 컴포넌트의 이름을 자동으로 유추합니다:

- 개발 경고 포멧팅
- DevTools 검사
- 재귀적 자기 참조.
  예를 들어 `FooBar.vue`라는 파일은 템플릿에서 `<FooBar/>`로 자신을 참조할 수 있음.
  명시적으로 등록/가져온 컴포넌트보다 우선 순위가 낮음.

## 전처리기 {#pre-processors}

블록은 `lang` 속성을 사용하여 전처리기 언어를 선언할 수 있습니다.
가장 일반적인 경우는 `<script>` 블록에 TypeScript를 사용하는 것입니다:

```vue-html
<script lang="ts">
  // TypeScript 사용
</script>
```

`lang`은 모든 블록에 적용할 수 있습니다.
예를 들어 `<style>`에서는 [SASS](https://sass-lang.com/)를, `<template>`에서는 [Pug](https://pugjs.org/api/getting-started.html)를 사용할 수 있습니다:

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

다양한 전처리기와의 통합은 툴체인에 따라 다를 수 있습니다.
예제를 보려면 해당 문서를 확인하십시오:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## Src 가져오기 {#src-imports}

`*.vue` 컴포넌트를 여러 파일로 분할하는 것을 선호하는 경우,
`src` 속성을 사용하여 언어 블록에서 외부 파일을 가져올 수 있습니다:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

`src` 가져오기는 웹팩 모듈 요청과 동일한 경로 확인 규칙을 따릅니다.
즉, 다음을 의미합니다:

- 상대 경로는 `./`로 시작해야 함.
- npm 종속성에서 리소스를 가져올 수 있음.

```vue
<!-- 설치된 "todomvc-app-css" npm 패키지에서 파일 가져오기 -->
<style src="todomvc-app-css/index.css" />
```

`src` 가져오기는 커스텀 블록에서도 작동합니다. 예를들어:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

## 주석 {#comments}

각 블록 내에서 사용 중인 언어(HTML, CSS, JavaScript, Pug 등)의 주석 문법을 사용해야 합니다.
최상위 주석의 경우 HTML 주석 문법을 사용하십시오:
`<!-- 컴포넌트 주석 -->`
