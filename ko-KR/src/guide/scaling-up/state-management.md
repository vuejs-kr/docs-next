# 상태 관리

## 상태 관리란?

기술적으로 모든 Vue 컴포넌트 인스턴스는 이미 자체 반응형 상태를 "관리"합니다.
간단한 카운터 컴포넌트를 예로 들어 보겠습니다:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// 상태(State)
const count = ref(0)

// 기능(Actions)
function increment() {
  count.value++
}
</script>

<!-- 뷰(view) -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // 상태(State)
  data() {
    return {
      count: 0
    }
  },
  // 기능(Actions)
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- 뷰(View) -->
<template>{{ count }}</template>
```

</div>

이것은 다음과 같이 나눌 수 있는 독립된 장치 입니다:

- **상태**(State): 앱 구동에 필요한 기본 데이터 소스.
- **뷰**(View): 상태를 선언적으로 매핑하여 시각화.
- **기능**(Actions): 뷰에서 사용자 입력에 대해 반응적으로 상태를 변경할 수 있게 정의된 동작.

이것은 "단방향 데이터 흐름" 개념의 간단한 표현입니다:

<p style="text-align: center">
  <img alt="state flow diagram" src="./images/state-flow.png" width="276px" style="margin: 16px auto">
</p>

<!-- https://www.figma.com/file/IXV9LNp7s2HaxjbWa4mreU/State-Flow-(ko-kr) -->

그러나 **여러 컴포넌트가 상태를 공유할 때** 단순성이 무너지기 시작합니다:

1. 여러 뷰가 동일한 상태에 따라 달라질 수 있습니다.
2. 서로 다른 뷰의 기능이 동일한 상태를 변경시킬 필요가 있을 수 있습니다.

사례 1의 경우, 가능한 해결 방법은 공유 상태를 공통 조상 컴포넌트로 "끌어올린" 다음 props로 전달하는 것입니다.
그러나 이것은 깊은 계층 구조를 가진 컴포넌트 트리에서 비효율적이 되며 [Prop 드릴링](/guide/components/provide-inject.html#prop-드릴링)으로 알려진 또 다른 문제로 이어집니다.

사례 2의 경우, 템플릿 refs를 통해 직접적인 부모/자식 인스턴스에 도달하거나,
발송(emit)된 이벤트를 통해 상태의 여러 복사본을 변경 및 동기화하려는 것과 같은 솔루션에 의존하는 경우가 많습니다.
이러한 패턴은 모두 깨지기 쉽고 빠르게 유지 관리할 수 없는 코드로 이어집니다.

더 간단하고 직관적인 솔루션은 컴포넌트에서 공유 상태를 추출하고 글로벌 싱글톤에서 관리하는 것입니다.
이를 통해 컴포넌트 트리는 큰 "뷰"가 되고 모든 컴포넌트는 트리의 위치에 관계없이 상태에 액세스하거나 작업을 트리거할 수 있습니다!

## 반응형 API를 통한 간단한 상태 관리

<div class="options-api">

옵션 API에서 반응형 데이터는 `data()` 옵션을 사용하여 선언됩니다.
내부적으로 `data()`에 의해 반환된 객체는 [`reactive()`](/api/reactivity-core.html#reactive) 함수를 통해 반응형으로 만들어지며, 공개 API로 사용할 수도 있습니다.

</div>

여러 인스턴스에서 공유해야 하는 상태가 있는 경우, [`reactive()`](/api/reactivity-core.html#reactive)를 사용하여 반응형 객체를 만든 다음 여러 컴포넌트에서 가져갈 수 있습니다.

```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue
<!-- ComponentA.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>A 컴포넌트에서: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script setup>
import { store } from './store.js'
</script>

<template>B 컴포넌트에서: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue
<!-- ComponentA.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>A 컴포넌트에서: {{ store.count }}</template>
```

```vue
<!-- ComponentB.vue -->
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>B 컴포넌트에서: {{ store.count }}</template>
```

</div>

이제 `store` 객체가 변경될 때마다 `<ComponentA>`와 `<ComponentB>`가 뷰를 자동으로 업데이트합니다.
이제 단일 기본 데이터 소스가 되었습니다.

그러나 이것은 `store`를 가져오는 모든 컴포넌트가 원하는 대로 변경할 수 있음을 의미합니다.

```vue-html{2}
<template>
  <button @click="store.count++">
    B 컴포넌트에서: {{ store.count }}
  </button>
</template>
```

이것은 간단한 경우에는 문제없이 작동하지만, 컴포넌트에 의해 임의로 변경될 수 있는 전역 상태이므로 장기적인 유지 관리는 쉽지 않습니다.
상태 변경 로직이 상태 자체처럼 중앙 집중화되도록 하려면, 작업의 의도를 나타내는 이름으로 `store`에 메서드를 정의하는 것이 좋습니다:

```js{6-8}
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    B 컴포넌트에서: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPENvbXBvbmVudEEgLz5cbiAgPENvbXBvbmVudEIgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wb25lbnRBLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vc3RvcmUuanMnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxidXR0b24gQGNsaWNrPVwic3RvcmUuaW5jcmVtZW50KClcIj5cbiAgICAgIEEg7Lu07Y+s64SM7Yq47JeQ7IScOiB7eyBzdG9yZS5jb3VudCB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQ29tcG9uZW50Qi52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlLmpzJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBCICDsu7Ttj6zrhIztirjsl5DshJw6IHt7IHN0b3JlLmNvdW50IH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJzdG9yZS5qcyI6ImltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3Qgc3RvcmUgPSByZWFjdGl2ZSh7XG4gIGNvdW50OiAwLFxuICBpbmNyZW1lbnQoKSB7XG4gICAgdGhpcy5jb3VudCsrXG4gIH1cbn0pIn0=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wb25lbnRBIGZyb20gJy4vQ29tcG9uZW50QS52dWUnXG5pbXBvcnQgQ29tcG9uZW50QiBmcm9tICcuL0NvbXBvbmVudEIudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIENvbXBvbmVudEEsXG4gICAgQ29tcG9uZW50QlxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q29tcG9uZW50QSAvPlxuICA8Q29tcG9uZW50QiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNvbXBvbmVudEEudnVlIjoiPHNjcmlwdD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdG9yZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBBIOy7tO2PrOuEjO2KuOyXkOyEnDoge3sgc3RvcmUuY291bnQgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBvbmVudEIudnVlIjoiPHNjcmlwdD5cbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZS5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdG9yZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIEBjbGljaz1cInN0b3JlLmluY3JlbWVudCgpXCI+XG4gICAgICBCIOy7tO2PrOuEjO2KuOyXkOyEnDoge3sgc3RvcmUuY291bnQgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsInN0b3JlLmpzIjoiaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9IHJlYWN0aXZlKHtcbiAgY291bnQ6IDAsXG4gIGluY3JlbWVudCgpIHtcbiAgICB0aGlzLmNvdW50KytcbiAgfVxufSkifQ==)

</div>

:::tip
클릭 핸들러는 괄호를 포함한 `store.increment()`를 사용합니다.
이것은 컴포넌트 메소드가 아니기 때문에, 적절히 `this` 컨텍스트를 사용하여 메소드를 호출할 필요가 있습니다.
:::

여기에서는 단일 반응형 객체를 `store`로 사용하고 있지만, `ref()` 또는 `computed()`와 같은 다른 [반응형 API](/api/reactivity-core.html)를 사용하여 생성된 반응형 상태를 공유하거나 [구성화](/guide/reusability/composables.html)를 통해 전역 상태를 반환할 수도 있습니다:

```js
import { ref } from 'vue'

// 모듈 범위에서 생성된 전역 상태
const globalCount = ref(1)

export function useCount() {
  // 로컬 상태, 컴포넌트별로 생성됨
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Vue의 반응형 시스템이 컴포넌트 모델과 분리되어 있다는 사실은 Vue를 매우 유연하게 만듭니다.

## SSR 고려 사항

[서버 사이드 렌더링](./ssr)(SSR)을 활용하는 앱을 구축하는 경우, 위 패턴은 `store`가 여러 요청에서 공유되는 싱글톤이기 때문에 문제를 일으킬 수 있습니다.
이것에 대한 자세한 내용은 [SSR 가이드](./ssr#교차-요청-상태-오염-cross-request-state-pollution)에서 설명합니다.

## Pinia(피니아: 공식 상태관리 라이브러리)

간단한 시나리오에서는 수동 상태 관리 솔루션으로 충분하지만, 대규모 프로덕션 앱에서는 고려해야 할 사항이 더 많습니다:

- 팀 협업을 위한 더 강력한 규칙
- 타임라인, 컴포넌트 검사, time-travel 디버깅을 포함하여 Vue 개발자도구와 통합
- 핫 모듈 교체(HMR)
- 서버 사이드 렌더링 지원

[Pinia](https://pinia.vuejs.org)는 위의 모든 것을 구현하는 상태 관리 라이브러리입니다.
Vue 핵심 팀이 유지 관리하며 Vue 2 및 Vue 3에서 모두 작동합니다.

기존 Vue 사용자는 이전 공식 상태 관리 라이브러리인 [Vuex](https://vuex.vuejs.org/)에 익숙할 수 있습니다.
Pinia가 생태계에서 동일한 역할을 수행하면서 이제 Vuex는 유지 관리 상태에 있습니다.
여전히 작동하지만 더 이상 새로운 기능이 추가되지 않습니다.
새로운 앱에는 Pinia를 사용하는 것이 좋습니다.

Pinia는 Vuex 5의 핵심 팀 논의에서 나온 많은 아이디어를 통합하여 Vuex의 다음이 어떤 모습일지 탐구하는 것으로 시작했다.
결국 우리는 Pinia가 이미 Vuex 5에서 원하는 것을 대부분 구현하고 있다는 것을 깨닫고 이것을 새로운 권장 사항으로 적용하기로 결정했습니다.

Vuex와 비해 Pinia는 더 간단한 API를 제공하고,
Composition-API 스타일의 API를 제공하며,
가장 중요한 것은 TypeScript와 함께 사용할 때 견고한 유형 추론을 지원합니다.
