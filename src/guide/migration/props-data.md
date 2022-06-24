---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## 개요
Vue 인스턴스가 생성되는 동안에 전달되는 props로 사용되던 `propsData` 옵션은 제거되었습니다. Vue 3 어플리케이션에서, 루트 컴포넌트로부터 props를 전달하기 위해서는 [createApp](/api/global-api.html#createapp) 의 두 번째 인자를 사용하기 바랍니다.

## 2.x 문법

2.x에서, 우리는 props 인자를 Vue 인스턴스가 생성되는 동안에 전달할 수 있었습니다:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## 3.x 변경

`propsData` 옵션은 제거되었습니다. 만약 인스턴스가 생성되는 동안에 루트 컴포넌트로부터 props 전달이 필요하다면, `createApp`의 두 번째 인사를 사용하기 바랍니다:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
