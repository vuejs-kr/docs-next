---
pageClass: api
---

# 빌트인 컴포넌트 {#built-in-components}

:::info 등록과 사용법

빌트인 컴포넌트는 등록할 필요 없이 템플릿에서 직접 사용할 수 있습니다.
이것은 트리 쉐이킹되므로 사용되는 경우에만 빌드에 포함됩니다.

[랜더 함수](/guide/extras/render-function.html)에서 사용할 때는 명시적으로 `import` 해야합니다.
예를 들어:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>`

**싱글** 엘리먼트 또는 컴포넌트에 애니메이션 트렌지션 효과를 제공합니다.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * 트렌지션 CSS 클래스 이름 자동 생성에 사용.
     * 예를 들어 `name: 'fade'`는 `.fade-enter`,
     * `.fade-enter-active` 등으로 자동 확장됨.
     */
    name?: string
    /**
     * CSS 트렌지션 클래스를 적용할지 여부입니다.
     * 기본 값: true
     */
    css?: boolean
    /**
     * 트렌지션 종료 타이밍을 결정하기 위해,
     * 대기할 트렌지션 이벤트의 유형을 지정.
     * 기본 동작은 지속 시간이 더 긴 유형을
     * 자동으로 감지.
     */
    type?: 'transition' | 'animation'
    /**
     * 명시적으로 트렌지션의 지속 시간을 지정.
     * 기본 동작은 루트 트렌지션 엘리먼트의 첫 번째
     * `transitionend` 또는 `animationend` 이벤트를 기다리는 것.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * 진입/진출 트렌지션의 타이밍 순서를 제어.
     * 기본 동작은 동시.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * 최초 렌더링에 트렌지션을 적용할지 여부.
     * 기본 값: false
     */
    appear?: boolean

    /**
     * 트렌지션 클래스를 커스텀하기 위한 props.
     * 템플릿에서 kebab-case를 사용해야 함.
     * 예: enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **이벤트**:

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show`에서만)
  - `@appear-cancelled`

- **예제**:

  간단한 엘리먼트:

  ```vue-html
  <Transition>
    <div v-if="ok">토글된 컨텐츠</div>
  </Transition>
  ```

  트렌지션 모드 + 등장 애니메이션을 가진 동적 컴포넌트:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  트렌지션 이벤트 수신:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">토글된 컨텐츠</div>
  </Transition>
  ```

- **참고**: [가이드 - `<Transition>`](/guide/built-ins/transition.html)

## `<TransitionGroup>`

리스트의 **여러** 엘리먼트 또는 컴포넌트에 트렌지션 효과를 제공합니다.

- **Props**

  `<TransitionGroup>`은 `<Transition>`과 동일한 props에서 `mode`를 제외하고 두 개의 추가 props를 허용합니다:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * 정의하지 않으면, 랜더는 프래그먼트처럼 취급함.
     */
    tag?: string
    /**
     * 이동중 트렌지션에 적용될 CSS 클래스를 커스텀.
     * 템플릿에서 kebab-case를 사용해야 함.
     * 예: enter-from-class="xxx"
     */
    moveClass?: string
  }
  ```

- **이벤트**:

  `<TransitionGroup>`은 `<Transition>`과 동일한 이벤트를 발생시킵니다.

- **세부 사항**:

  기본적으로 `<TransitionGroup>`은 래퍼 DOM 엘리먼트를 렌더링하지 않지만 `tag` prop을 통해 정의할 수 있습니다.

  애니메이션이 제대로 작동하려면 `<transition-group>`의 모든 자식이 [**고유 키**](/guide/essentials/list.html#maintaining-state-with-key)를 가져야 합니다.

  `<TransitionGroup>`은 CSS `transform`으로 이동 트렌지션을 지원합니다.
  업데이트 후 화면에서 자식의 위치가 변경되면,
  움직이는 CSS 클래스가 적용됩니다(`name` 속성에서 자동 생성되거나 `move-class` prop으로 구성됨).
  이동 클래스가 적용될 때 CSS의 `transform` 속성이 "트렌지션 가능"이면,
  [FLIP 기술](https://aerotwist.com/blog/flip-your-animations/)을 사용하여 엘리먼트가 목적지까지 부드럽게 애니메이션됩니다.

- **예제**:

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **참고**: [가이드 - TransitionGroup](/guide/built-ins/transition-group.html)

## `<KeepAlive>`

내부에 래핑된 동적으로 토글되는 컴포넌트를 캐시합니다.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * `include`와 이름이 일치하는 컴포넌트만 캐시됨.
     */
    include?: MatchPattern
    /**
     * `exclude`와 이름이 일치하는 컴포넌트는 캐시되지 않음.
     */
    exclude?: MatchPattern
    /**
     * 캐시할 컴포넌트 인스턴스의 최대 수.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **세부 사항**:

  `<KeepAlive>`로 래핑된 동적 컴포넌트는 비활성화 되면,
  컴포넌트 인스턴스가 파괴되지 않고 캐시됩니다.

  `<KeepAlive>`에는 언제나 활성화된 직계 자식의 컴포넌트 인스턴스가 하나만 있을 수 있습니다.

  컴포넌트가 `<KeepAlive>` 내에서 토글되면,
  `mounted` 및 `unmounted` 대신 `activated` 및 `deactivated` 수명 주기 훅이 호출됩니다.
  이는 `<KeepAlive>`의 직계 자식과 모든 하위 항목에 적용됩니다.

- **예제**:

  기본 사용법:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  `v-if` / `v-else`를 사용할 때,
  한 번에 하나의 컴포넌트만 렌더링되어야 합니다:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  `<Transition>`과 함께 사용:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  `include` / `exclude` 사용:

  ```vue-html
  <!-- 쉼표로 구분된 문자열 -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 정규식 사용(`v-bind` 포함) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 배열 사용(`v-bind` 포함) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  `max`를 활용한 사용:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **참고**: [가이드 - KeepAlive](/guide/built-ins/keep-alive.html)

## `<Teleport>`

슬롯 콘텐츠를 DOM 내 다른 위치에서 렌더링합니다.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * 필수. 대상이 될 컨테이너를 지정.
     * 셀렉터 또는 실제 엘리먼트일 수 있음.
     */
    to: string | HTMLElement
    /**
     * `true`이면 콘텐츠가 대상이 될 컨테이너로
     * 이동하지 않고 원래 위치에 남아 있음.
     * 동적으로 변경할 수 있음.
     */
    disabled?: boolean
  }
  ```

- **예제**:

  대상이 될 컨테이너 지정:

  ```vue-html
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  ```

  조건부 비활성화:

  ```vue-html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

- **참고**: [가이드 - Teleport](/guide/built-ins/teleport.html)

## `<Suspense>` <sup class="vt-badge experimental" />

컴포넌트 트리에서 중첩된 비동기 종속성을 조정하는 데 사용됩니다.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **이벤트**:

  - `@resolve`
  - `@pending`
  - `@fallback`

- **세부 사항**:

  `<Suspense>`는 `#default` 슬롯과 `#fallback` 슬롯이라는 두 개의 슬롯을 사용합니다.
  메모리에서 기본 슬롯을 렌더링하는 동안,
  폴백 슬롯의 대체 컨텐츠를 노출합니다.

  기본 슬롯을 렌더링하는 동안 비동기 종속성([비동기 컴포넌트](/guide/components/async.html) 및 [`async setup()`](/guide/built-ins/suspense.html#async-setup)이 있는 컴포넌트)을 만나면,
  기본 슬롯을 표시하기 전에 모든 것이 해결될 때까지 대기합니다.

- **참고**: [가이드 - Suspense](/guide/built-ins/suspense.html)
