---
title: 'Mount API 변경'
badges:
  - breaking
---

# 마운트된 앱은 요소를 대체하지 않음 <MigrationBadges :badges="$frontmatter.badges" />

## 개요

Vue 2.x에서 `template`을 가진 앱이 마운트될 때 렌더링된 컨텐츠는 우리가 마운트할 요소를 대체 하였습니다. Vue 3.x에서 렌더링된 어플리케이션은 이러한 요소의 자식으로 추가되어, 요소의 `innerHTML`을 대체합니다.

## 2.x 문법

Vue 2.x에서, `new Vue()`나 `$mount`로 HTML 요소 선택자를 전달하였습니다:

```js
new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// 또는
const app = new Vue({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

이 어플리케이션을 전달된 선택자와 `div`를 가지고 있는 페이지로 마운트할 때(여기서는 `id="app"`):

```html
<body>
  <div id="app">
    Some app content
  </div>
</body>
```

렌더링 된 결과에서, 언급된 `div`는 렌더링된 어플리케이션 내용으로 대체될 것:

```html
<body>
  <div id="rendered">Hello Vue!</div>
</body>
```

## 3.x 문법

Vue 3.x에서 어플리케이션을 마운트할 때, 렌더링된 내용은 `mount`로 전달한 요소의 `innerHTML`을 대체한다:

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

이 앱이 `div`와 `id="app"`을 가진 페이지로 마운트될 때, 결과는 이렇게 될 것:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Hello Vue!</div>
  </div>
</body>
```

## 더 보기

- [`mount` API](/api/application-api.html#mount)
