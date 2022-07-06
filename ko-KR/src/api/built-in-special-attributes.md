# 빌트인 특수 속성 {#built-in-special-attributes}

## key

특수 속성 `key`는 Vue의 가상 DOM 알고리즘이 이전 목록과 새 노드 목록을 비교할 때 vnode를 식별하는 힌트로 주로 사용됩니다.

- **요구되는 값**: `number | string | symbol`

- **세부 사항**:

  키가 없으면 Vue는 엘리먼트 이동을 최소화하고 동일한 유형의 엘리먼트를 가능한 한 제자리에서 패치/재사용하는 알고리즘을 사용합니다.
  키를 사용하면 키의 순서 변경에 따라 엘리먼트를 재정렬하고 더 이상 존재하지 않는 키가 있는 엘리먼트는 항상 제거/파기됩니다.

  동일한 공통 부모의 자식들은 **고유 키**가 있어야 합니다.
  키가 중복되면 렌더링 에러가 발생합니다.

  `v-for`에서 가장 일반적으로 사용 됩니다:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  또는 엘리먼트/컴포넌트를 재사용하는 대신 강제로 교체하는 데 사용할 수도 있습니다.
  다음과 같은 경우에 유용할 수 있습니다:

  - 컴포넌트의 수명 주기 훅을 올바르게 트리거함.
  - 트랜지션 트리거

  예제:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  `text`가 변경되면 `<span>`이 패치 대신 항상 교체되므로 트랜지션이 트리거됩니다.

- **참고**: [가이드 - 리스트 렌더링: `key`를 통한 상태유지](/guide/essentials/list.html#maintaining-state-with-key)

## ref

[템플릿 참조](/guide/essentials/template-refs.html)를 의미합니다.

- **요구되는 값**: `string | Function`

- **세부 사항**:

  `ref` is used to register a reference to an element or a child component.

  In Options API, the reference will be registered under the component's `this.$refs` object:

  `ref`는 엘리먼트 또는 자식 컴포넌트를 참조하기 위해 사용됩니다.

  옵션 API에서 참조는 컴포넌트의 `this.$refs` 객체 내에 등록됩니다.

  ```vue-html
  <!-- 저장됨: this.$refs.p -->
  <p ref="p">안녕!</p>
  ```

  컴포지션 API에서 참조는 이름이 일치하는 `ref`에 저장됩니다.

  ```vue
  <script setup>
  import { ref } from 'vue'

  const p = ref()
  </script>

  <template>
    <p ref="p">안녕!</p>
  </template>
  ```

  일반 DOM 엘리먼트에서 사용되는 경우, 참조는 해당 엘리먼트가 됩니다.
  자식 컴포넌트에 사용되는 경우, 참조는 자식 컴포넌트 인스턴스가 됩니다.

  `ref`는 함수를 사용하여 참조 저장을 완전히 제어할 수 있습니다:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  참조 등록 타이밍에 대한 중요한 참고 사항:
  참조는 렌더 함수의 결과로 생성되므로,
  접근하기 전에 컴포넌트가 마운트될 때까지 기다려야 합니다.

  `this.$refs`도 반응형이 아니므로 데이터 바인딩을 위한 템플릿에서 사용하면 안됩니다.

- **참고**: [가이드 - 템플릿 참조](/guide/essentials/template-refs.html)

## is

[동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components) 바인딩에 사용합니다.

- **요구되는 값**: `string | Component`

- **네이티브 엘리먼트에 사용** <sup class="vt-badge">3.1+</sup>

  `is` 속성이 네이티브 HTML 엘리먼트에 사용되면,
  네이티브 웹 플랫폼 함수인 [커스터마이즈 빌트인 엘리먼트](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)로 해석됩니다.

  그러나 [DOM 템플릿 파싱 주의 사항](/guide/essentials/component-basics.html#dom-template-parsing-caveats)에 설명된 대로,
  기본 엘리먼트를 Vue 컴포넌트로 교체하기 위해 Vue가 필요할 수 있는 사용 사례가 있습니다.
  Vue가 엘리먼트를 Vue 컴포넌트로 렌더링하도록 `is` 속성 값에 `vue:` 접두사를 붙일 수 있습니다:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **참고**:

  - [API - 특수 엘리먼트: `<component>`](/api/built-in-special-elements.html#component)
  - [가이드 - 컴포넌트 기초: 동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)
