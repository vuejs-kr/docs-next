<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive

`<KeepAlive>`는 여러 컴포넌트 간에 동적으로 전환될 때, 컴포넌트 인스턴스를 조건부로 캐시할 수 있는 빌트인 컴포넌트입니다.

## 기본 사용법

컴포넌트 기초의 [동적 컴포넌트](/guide/essentials/component-basics.html#동적-컴포넌트) 장에서 특별한 `<component>` 엘리먼트를 사용하는 문법을 소개했습니다:

```vue-html
<component :is="activeComponent" />
```

기본적으로 활성 컴포넌트 인스턴스는 비활성으로 전환되면 마운트 해제됩니다.
이렇게되면 해당 활성 컴포넌트가 보유하고 있던 변경된 상태(정보)가 손실됩니다.

아래는 각각 상태를 저장하는 두 개의 컴포넌트로 구성된 예제가 있습니다.
A에는 카운터가 포함되고 B에는 `v-model`을 통해 입력과 동기화된 메시지가 포함됩니다.
그 중 하나의 상태를 업데이트하고 다른 컴포넌트로 전환한 다음 다시 전환해 보십시오:

<SwitchComponent />

다시 전환하면 이전에 변경한 상태가 초기화되었음을 알 수 있습니다.

스위치에서 새 컴포넌트 인스턴스를 만드는 것은 일반적으로 유용한 동작이지만 이 경우에는 두 컴포넌트 인스턴스가 비활성 상태인 경우에도 상태가 보존되기를 원합니다.
이 문제를 해결하기 위해 동적 컴포넌트를 빌트인 컴포넌트인 `<KeepAlive>`로 래핑할 수 있습니다:

```vue-html
<!-- 비활성 컴포넌트가 캐시됩니다! -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

이제 상태는 컴포넌트 전환 간에 유지됩니다:

<SwitchComponent use-KeepAlive />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbmNvbnN0IGN1cnJlbnQgPSBzaGFsbG93UmVmKENvbXBBKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEJcIiAvPiBCPC9sYWJlbD5cbiAgICA8S2VlcEFsaXZlPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50XCI+PC9jb21wb25lbnQ+XG4gICAgPC9LZWVwQWxpdmU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ29tcEEudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPu2YhOyerCDsu7Ttj6zrhIztirg6IEE8L3A+XG4gIDxzcGFuPuy5tOyatO2KuDoge3sgY291bnQgfX08L3NwYW4+XG4gIDxidXR0b24gQGNsaWNrPVwiY291bnQrK1wiPis8L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG4iLCJDb21wQi52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuY29uc3QgbXNnID0gcmVmKCcnKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+7ZiE7J6sIOy7tO2PrOuEjO2KuDogQjwvcD5cbiAgPHNwYW4+66mU7IS47KeAOiB7eyBtc2cgfX08L3NwYW4+XG4gIDxpbnB1dCB2LW1vZGVsPVwibXNnXCI+XG48L3RlbXBsYXRlPlxuIn0=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ29tcEEsIENvbXBCIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJkZW1vXCI+XG4gICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2LW1vZGVsPVwiY3VycmVudFwiIHZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgdmFsdWU9XCJDb21wQlwiIC8+IEI8L2xhYmVsPlxuICAgIDxLZWVwQWxpdmU+XG4gICAgICA8Y29tcG9uZW50IDppcz1cImN1cnJlbnRcIj48L2NvbXBvbmVudD5cbiAgICA8L0tlZXBBbGl2ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb3VudDogMFxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+7ZiE7J6sIOy7tO2PrOuEjO2KuDogQTwvcD5cbiAgPHNwYW4+7Lm07Jq07Yq4OiB7eyBjb3VudCB9fTwvc3Bhbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJjb3VudCsrXCI+KzwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cbiIsIkNvbXBCLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1zZzogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG5cbjx0ZW1wbGF0ZT5cbiAgPHA+7ZiE7J6sIOy7tO2PrOuEjO2KuDogQjwvcD5cbiAgPHNwYW4+66mU7IS47KeAOiB7eyBtc2cgfX08L3NwYW4+XG4gIDxpbnB1dCB2LW1vZGVsPVwibXNnXCI+XG48L3RlbXBsYXRlPlxuIn0=)

</div>

:::tip
[DOM 템플릿](/guide/essentials/component-basics.html#dom-템플릿-파싱-주의-사항)에서 사용할 때 `<keep-alive>`로 참조해야 합니다.
:::

## Include / Exclude

기본적으로 `<KeepAlive>`는 내부의 모든 컴포넌트 인스턴스를 캐시합니다.
`include` 및 `exclude` props를 통해 이 동작을 사용자 정의할 수 있습니다.
두 props 모두 쉼표로 구분된 문자열, `RegExp`(정규식) 또는 이 두 유형 중 하나를 포함하는 배열이 될 수 있습니다:

```vue-html
<!-- 쉼표로 구분되는 문자열 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 정규식 (`v-bind`를 사용해야 함) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 배열 (`v-bind`를 사용해야 함) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

컴포넌트의 [`name`](/api/options-misc.html#name) 옵션과 일치하는지 확인하므로, `KeepAlive`에 의해 조건부로 캐시되어야 하는 컴포넌트는 명시적으로 `name` 옵션을 선언해야 합니다.

## 최대 캐시 인스턴스

`max` props를 통해 캐시할 수 있는 컴포넌트 인스턴스의 최대 수를 제한할 수 있습니다.
`max`가 지정되면 `<KeepAlive>`는 [LRU 캐시](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>)처럼 작동합니다.
캐시된 인스턴스의 수가 지정된 최대 수를 초과하려고 하면, 가장 최근에 접근해서 캐시된 인스턴스가 파괴되어 새 인스턴스를 위한 공간을 확보합니다.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## 캐시된 인스턴스의 수명주기

컴포넌트 인스턴스가 DOM에서 제거되었지만 `<KeepAlive>`에 의해 캐시된 컴포넌트 트리의 일부인 경우,
마운트 해제되는 대신 **비활성화됨** 상태가 됩니다.
컴포넌트 인스턴스가 캐시된 트리의 일부로 DOM에 삽입되면 **활성화**됩니다.

<div class="composition-api">

kept-alive 컴포넌트는 [`onActivated()`](/api/composition-api-lifecycle.html#onactivated) 및 [`onDeactivated()`](/api/composition-api-lifecycle.html#ondeactivated)를 사용하여 이 두 가지 상태에 대한 수명 주기 훅을 등록할 수 있습니다:

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 초기 마운트 시 또는
  // 캐시상태에서 다시 삽입될 때마다 호출됨.
})

onDeactivated(() => {
  // DOM에서 제거되고 캐시로 전환될 시 또는
  // 마운트 해제될 때마다 호출됨.
})
</script>
```

</div>
<div class="options-api">

Keeped-alive 컴포넌트는 [`activated`](/api/options-lifecycle.html#activated) 및 [`deactivated`](/api/options-lifecycle.html#deactivated) 훅을 사용하여, 이 두 가지 상태에 대한 수명 주기 훅을 등록할 수 있습니다:

```js
export default {
  activated() {
    // 초기 마운트 시 또는
    // 캐시상태에서 다시 삽입될 때마다 호출됨.
  },
  deactivated() {
    // DOM에서 제거되고 캐시로 전환될 시 또는
    // 마운트 해제될 때마다 호출됨.
  }
}
```

</div>

참고:

- <span class="composition-api">`onActivated`</span><span class="options-api">`activated`</span>는 마운트 시에도 호출되고 <span class="composition-api">`onDeactivated`</span><span class="options-api">`deactivated`</span>는 마운트 해제 시에도 호출됩니다.

- 두 훅 모두 `<KeepAlive>`에 의해 캐시된 루트 컴포넌트뿐만 아니라 캐시된 트리의 자식 컴포넌트에서도 작동합니다.

---

**관련 문서**

- [`<KeepAlive>` API 참고](/api/built-in-components.html#keepalive)
