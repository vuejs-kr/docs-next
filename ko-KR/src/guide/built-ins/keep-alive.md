<script setup>
import SwitchComponent from './keep-alive-demos/SwitchComponent.vue'
</script>

# KeepAlive {#keepalive}

`<KeepAlive>` 는 여러 컴포넌트 간에 동적으로 전환할 때 컴포넌트 인스턴스를 조건부로 캐시할 수 있는 내장 컴포넌트 입니다.

## 기본 사용법 {#basic-usage}

컴포넌트 기본 장에서 <code>&lt;component&gt;</code> 특수 엘리먼트를 사용하여 <a>다이나믹 컴포넌트</a> 에 대한 구문을 소개했습니다.

```vue-html
<component :is="activeComponent" />
```

기본적으로 활성화 된 컴포넌트 인스턴스는 에서 이동될 때 해제됩니다. 이렇게 하면 가지고 있는 변경된 상태(changed state)가 사라집니다.

아래 예에는 두 가지 상태 저장 컴포넌트가 있습니다. A에는 카운터가 포함되고 B에는 `v-model` 을 통해 입력과 메시지가 동기화 되어 있습니다. 그 중 하나의 상태를 업데이트하고 다른 곳으로 이동한 다음 다시 돌아와 보세요.

<SwitchComponent />

다시 돌아오면 이전에 변경된 상태가 초기화되었음을 알 수 있습니다.

이동하여 새 컴포넌트 인스턴스를 만드는 것은 일반적으로 유용한 동작이지만, 두 컴포넌트 인스턴스를 비활성 상태인 경우에도 유지 되기를 원하는 경우는 조금 다릅니다. 이 문제를 해결하기 위해 다이나믹 컴포넌트를 `<KeepAlive>` 내장 컴포넌트로 래핑할 수 있습니다.

```vue-html
<!-- 비활성화 컴포넌트는 캐시 됩니다 -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

이제 상태는 컴포넌트 이동 간에 유지됩니다.

<SwitchComponent use-KeepAlive />

<div class="composition-api">
[플레이그라운드에서 확인해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbmNvbnN0IGN1cnJlbnQgPSBzaGFsbG93UmVmKENvbXBBKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgOnZhbHVlPVwiQ29tcEJcIiAvPiBCPC9sYWJlbD5cbiAgICA8S2VlcEFsaXZlPlxuICAgICAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50XCI+PC9jb21wb25lbnQ+XG4gICAgPC9LZWVwQWxpdmU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBjb3VudCA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+Q3VycmVudCBjb21wb25lbnQ6IEE8L3A+XG4gIDxzcGFuPmNvdW50OiB7eyBjb3VudCB9fTwvc3Bhbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJjb3VudCsrXCI+KzwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cbiIsIkNvbXBCLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5jb25zdCBtc2cgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)

</div>

<div data-md-type="block_html"></div>
<div class="options-api">
[플레이그라운드에서 확인해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ29tcEEsIENvbXBCIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJkZW1vXCI+XG4gICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2LW1vZGVsPVwiY3VycmVudFwiIHZhbHVlPVwiQ29tcEFcIiAvPiBBPC9sYWJlbD5cbiAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJjdXJyZW50XCIgdmFsdWU9XCJDb21wQlwiIC8+IEI8L2xhYmVsPlxuICAgIDxLZWVwQWxpdmU+XG4gICAgICA8Y29tcG9uZW50IDppcz1cImN1cnJlbnRcIj48L2NvbXBvbmVudD5cbiAgICA8L0tlZXBBbGl2ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBBLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQTwvcD5cbiAgPHNwYW4+Y291bnQ6IHt7IGNvdW50IH19PC9zcGFuPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj4rPC9idXR0b24+XG48L3RlbXBsYXRlPlxuIiwiQ29tcEIudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbXNnOiAnJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cblxuPHRlbXBsYXRlPlxuICA8cD5DdXJyZW50IGNvbXBvbmVudDogQjwvcD5cbiAgPHNwYW4+TWVzc2FnZSBpczoge3sgbXNnIH19PC9zcGFuPlxuICA8aW5wdXQgdi1tb2RlbD1cIm1zZ1wiPlxuPC90ZW1wbGF0ZT5cbiJ9)
</div>

:::tip 
[DOM 템플릿](/guide/essentials/component-basics.html#dom-template-parsing-caveats) 에서 사용하는 경우 `<keep-alive>` 로 참조해야 합니다. 
:::

## Include / Exclude {#include-exclude}

기본적으로 `<KeepAlive>` 는 내부의 컴포넌트 인스턴스를 캐시합니다. `include` 및 `exclude` props를 통해 이 동작을 사용자 정의할 수 있습니다. 두 props 모두 쉼표로 구분된 문자열, `RegExp` 또는 다음 타입 중 하나를 포함하는 배열이 될 수 있습니다.

```vue-html
<!-- 쉼표로 구분된 문자열 -->
<KeepAlive include="a,b">
  <component :is="view"></component>
</KeepAlive>

<!-- regex (use `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view"></component>
</KeepAlive>

<!-- Array (use `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view"></component>
</KeepAlive>
```

컴포넌트의 [`name`](/api/options-misc.html#name) 옵션에 대해 일치 여부를 확인하므로 `KeepAlive` 에서 조건부로 캐시해야 하는 컴포넌트는 `name` 옵션을 명시적으로 선언해야 합니다.

## 최대 캐시 인스턴스 {#max-cached-instances}

`max` prop을 통해 캐시할 수 있는 컴포넌트 인스턴스의 최대 수를 제한할 수 있습니다. `max` 가 지정되면 `<KeepAlive>` 는 [LRU 캐시](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)) 처럼 동작합니다. 캐시된 인스턴스의 수가 지정된 최대 수를 초과하려고 하면 가장 최근에 접근한 캐시된 인스턴스가 파괴되어 새 인스턴스를 위한 공간이 생깁니다.

```vue-html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

## 캐시된 인스턴스의 라이프사이클 {#lifecycle-of-cached-instance}

컴포넌트 인스턴스가 DOM에서 제거되었지만 `<KeepAlive>` 에 의해 캐시된 컴포넌트 트리의 일부인 경우 해제되는 대신 **비활성화된** 상태가 됩니다. 컴포넌트 인스턴스가 캐시된 트리의 일부로 DOM에 추가되면 **활성화됩니다** .

<div class="composition-api">
kept-alive 컴포넌트는 [`onActivated()`](/api/composition-api-lifecycle.html#onactivated) 및 [`onDeactivated()`](/api/composition-api-lifecycle.html#ondeactivated)  를 사용하여 이 두 가지 상태에 대한 라이프사이클 훅을 등록할 수 있습니다.

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 초기 mount 시 호출
  // 그리고 매번 캐시에 다시 저장
})

onDeactivated(() => {
  // DOM에서 캐시가 제거된 경우 호출
  // 그리고 unmounted 경우
})
</script>
```
  
</div>
<div class="options-api">
kept-alive 컴포넌트는 [`activated`](/api/options-lifecycle.html#activated) 훅과 [`deactivated`](/api/options-lifecycle.html#deactivated) 훅를 사용하여 다음 두 가지 상태에 대한 라이프사이클 훅을 등록할 수 있습니다.
  
```js
export default {
  activated() {
    // 초기 mount시 호출
    // 그리고 매번 캐시에 다시 저장
  },
  deactivated() {
    // DOM에서 캐시가 제거된 경우 호출
    // 그리고 unmounted 경우
  }
}
```
</div> 

참고:

- <span class="composition-api"><code>onActivated</code></span> <span class="options-api"><code>activated</code></span> 는 마운트 시에도 호출되고 <span class="composition-api"><code>onDeactivated</code></span> 는 마운트 해제 시 <span class="options-api"><code>deactivated</code></span> 됩니다.

- 두 훅 모두 `<KeepAlive>` 에 의해 캐시된 루트 컴포넌트뿐만 아니라 캐시된 트리의 하위 컴포넌트에서도 작동합니다.

---

**관련**

- [`<KeepAlive>` API reference](/api/built-in-components.html#keepalive)
