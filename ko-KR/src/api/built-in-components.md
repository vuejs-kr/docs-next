---
pageClass: api
---

# Built-in Components

# 내장 컴포넌트

:::info Registration and Usage
Built-in components can be used directly in templates without needing to be registered. They are also tree-shakeable: they are only included in the build when they are used.

When using them in [render functions](/guide/extras/render-function.html), they need to be imported explicitly. For example:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

:::info 등록과 사용
내장 컴포넌트는 등록할 필요없이 템플릿에서 바로 사용할수 있습니다.  내장 컴포넌트는 트리 쉐이킹이 되기 때문에 사용 할때에만 포함됩니다. 

[render 함수](/guide/extras/render-function.html)에서 사용할 때는 명시적으로 임포트 해야 합니다.


```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>`

Provides animated transition effects to a **single** element or component.

**단일** 엘리먼트나 컴포넌트에 애니메이션 트랜지션 효과를 제공합니다.


- **Props**

  ```ts
  interface TransitionProps {
    /**
     * Used to automatically generate transition CSS class names.
     * e.g. `name: fade'` will auto expand to `.fade-enter`,
     * `.fade-enter-active`, etc.
     * 트랜지션 CSS 클래스 이름을 자동으로 생성하는 데 사용됩니다.
     * 예. `name: fade'` 은 자동으로 `.fade-enter`,
     * `.fade-enter-active`등의 이름으로 확장됩니다. 
     */
    
    name?: string
    /**
     * Whether to apply CSS transition classes.
     * Default: true
     * CSS 트랜지션 클래스를 적용할지 여부입니다.
     * 기본값: true
     */
    css?: boolean
    /**
     * Specifies the type of transition events to wait for to
     * determine transition end timing.
     * Default behavior is auto detecting the type that has
     * longer duration.
     * 트랜지션 종료 타이밍을 결정하기 위해 대기할 트랜지션 이벤트의 유형을 지정합니다.
     * 기본 동작은 지속 시간이 더 긴 유형을 자동으로 감지하는 것입니다.
     */
    type?: 'transition' | 'animation'
    /**
     * Specifies explicit durations of the transition.
     * Default behavior is wait for the first `transitionend`
     * or `animationend` event on the root transition element.
     * 트랜지션의 명시적 지속 시간을 지정합니다.
     * 기본 동작은 루트 트랜지션 요소의 첫 번째 `transitionend` 또는 `animationend` 이벤트를 기다리는 것입니다.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Controls the timing sequence of leaving/entering transitions.
     * Default behavior is simultaneous.
     * 퇴장/진입 트랜지션의 타이밍 순서를 제어합니다.
     * 기본 동작은 동시입니다. 
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Whether to apply transition on initial render.
     * Default: false
     * 초기 렌더링에 트랜지션을 적용할지 여부입니다.
     * 기본값: false
     */
    appear?: boolean

    /**
     * Props for customizing transition classes.
     * Use kebab-case in templates, e.g. enter-from-class="xxx"
     * 트랜지션 클래스 커스터마이징을 위한 props. 
     * 템플릿에서는 케밥 케이스를 사용하세요. 예) enter-from-class="xxx"
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

- **Events**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show` only)
  - `@appear-cancelled`

- **Example**

  Simple element:

  단순 엘리먼트

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  Dynamic component, with transition mode + animate on appear:

  트랜지션 모드와 등장시 애니메이션을 가지는 동적 컴포넌트:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Listening to transition events:

  트랜지션 이벤트 듣기: 

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **See also:** [`<Transition>` Guide](/guide/built-ins/transition.html)

## `<TransitionGroup>`

Provides transition effects for **multiple** elements or components in a list.

리스트내에 있는 **여러** 앨레먼트 또는 컴포넌트에 대한 전환 효과를 제공합니다.


- **Props**

  `<TransitionGroup>` accepts the same props as `<Transition>` except `mode`, plus two additional props:

  `<TransitionGroup>`은 `mode`를 제외하고 `<Transition>`과 동일한 props와 두 개의 추가 props를 허용합니다.


  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * If not defined, renders as a fragment.
     * 정의하지 않으면 프래그먼트로 렌더링됩니다. 
     */
    tag?: string
    /**
     * For customizing the CSS class applied during move transitions.
     * Use kebab-case in templates, e.g. move-class="xxx"
     * 이동 전환 중에 적용된 CSS 클래스를 사용자 정의합니다.
     * 템플릿에서는 케밥 케이스를 사용하세요. 예) enter-from-class="xxx"
     */
    moveClass?: string
  }
  ```

- **Events**

  `<TransitionGroup>` emits the same events as `<Transition>`.
  `<TransitionGroup>`는  `<Transition>`과 동일한 이벤트를 발생시킵니다.

- **Details**

  By default, `<TransitionGroup>` doesn't render a wrapper DOM element, but one can be defined via the `tag` prop.

  기본적으로 `<TransitionGroup>`은 래퍼(wrapper) DOM 요소를 렌더링하지 않지만 `tag` 소품을 통해 정의할 수 있습니다.


  Note that every child in a `<transition-group>` must be [**uniquely keyed**](/guide/essentials/list.html#maintaining-state-with-key) for the animations to work properly.

  `<TransitionGroup>` 내의 모든 자식은 애니메이션이 정상적으로 동작하기 위해 반드시 [**유일한 키를 부여받아야**](/guide/essentials/list.html#maintaining-state-with-key)합니다.

  

  `<TransitionGroup>` supports moving transitions via CSS transform. When a child's position on screen has changed after an update, it will get applied a moving CSS class (auto generated from the `name` attribute or configured with the `move-class` prop). If the CSS `transform` property is "transition-able" when the moving class is applied, the element will be smoothly animated to its destination using the [FLIP technique](https://aerotwist.com/blog/flip-your-animations/).
  
  `<TransitionGroup>`은 CSS 변환을 통한 이동 트랜지션을 지원합니다. 업데이트 후 화면에서 자녀의 위치가 변경되면 이동 CSS 클래스가 적용됩니다(`name` 속성에서 자동 생성되거나 `move-class` 소품으로 구성됨). 움직이는 클래스가 적용될 때 CSS의 `transform` 속성이 "전환 가능"이면 [FLIP 기술](https://aerotwist.com/blog/flip-your- 애니메이션/).


- **Example**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **See also:** [Guide - TransitionGroup](/guide/built-ins/transition-group.html)
- **참조:** [가이드 - 트랜지션 그룹](/guide/built-ins/transition-group.html)

## `<KeepAlive>`

Caches dynamically toggled components wrapped inside.

동적으로 토글(toggle) 되는 컴포넌트를 캐싱합니다. 

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * If specified, only components with names matched by
     * `include` will be cached.
     * 지정하면 `include`와 일치하는 이름을 가진 컴포넌트만 캐시됩니다.
     */
    include?: MatchPattern
    /**
     * Any component with a name matched by `exclude` will
     * not be cached.
     * 'exclude'와 일치하는 이름을 가진 컴포넌트는 캐시되지 않습니다.
     */
    exclude?: MatchPattern
    /**
     * The maximum number of component instances to cache.
     * 캐시할 컴포넌트 인스턴스의 최대 수입니다.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Details**

  When wrapped around a dynamic component, `<KeepAlive>` caches the inactive component instances without destroying them.

  동적 컴포넌트를 래핑할때  `<KeepAlive>`는 비활성되는 컴포넌트 인스턴스를 파괴하지 않고 캐시합니다.

  There can only be one active component instance as the direct child of `<KeepAlive>` at any time.

  `<KeepAlive>`의 내부에는 단 하나의 컴포넌트 인스턴스만 활성화 됩니다. 


  When a component is toggled inside `<KeepAlive>`, its `activated` and `deactivated` lifecycle hooks will be invoked accordingly, providing an alternative to `mounted` and `unmounted`, which are not called. This applies to the direct child of `<KeepAlive>` as well as to all of its descendants.

  컴포넌트가 `<KeepAlive>` 내에서 토글되면 그에 따라 `activated` 및 `deactivated` 수명 주기 후크가 호출되어 호출되지 않는 `mounted` 및 `unmounted` 에 대한 대안을 제공합니다. 이는 `<KeepAlive>`의 직계 자식과 모든 하위 항목에 적용됩니다.


- **Example**

  Basic usage:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  When used with `v-if` / `v-else` branches, there must be only one component rendered at a time:

  `v-if` / `v-else` 분기와 함께 사용할 때 한 번에 하나의 컴포넌트만 렌더링되어야 합니다:


  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Used together with `<Transition>`:

  `<Transition>`과 함께 사용할때: 


  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Using `include` / `exclude`:

  `include` / `exclude` 사용:


  ```vue-html
  <!-- comma-delimited string -->
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

  Usage with `max`:

  `max` 사용:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **See also:** [Guide - KeepAlive](/guide/built-ins/keep-alive.html)
- **참조:** [가이드 - KeepAlive](/guide/built-ins/keep-alive.html)

## `<Teleport>`

Renders its slot content to another part of the DOM.

슬롯 콘텐츠를 DOM의 다른 부분으로 렌더링합니다.


- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Required. Specify target container.
     * Can either be a selector or an actual element.
     */
    to: string | HTMLElement
    /**
     * When `true`, the content will remain in its original
     * location instead of moved into the target container.
     * Can be changed dynamically.
     */
    disabled?: boolean
  }
  ```

- **Example**

  Specifying target container:

  대상 컨테이너 지정:

  ```vue-html
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  ```

  Conditionally disabling:

  조건부로 비활성화: 

  ```vue-html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

- **See also:** [Guide - Teleport](/guide/built-ins/teleport.html)
- **참조:** [가이드 - Teleport](/guide/built-ins/teleport.html)

## `<Suspense>` <sup class="vt-badge experimental" />

Used for orchestrating nested async dependencies in a component tree.

컴포넌트 트리에서 중첩된 비동기 의존성을 조정하는 데 사용됩니다.


- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **Events**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Details**

  `<Suspense>` accepts two slots: the `#default` slot and the `#fallback` slot. It will display the content of the fallback slot while rendering the default slot in memory.

  `<Suspense>`는 `#default` 슬롯과 `#fallback` 슬롯이라는 두 개의 슬롯을 허용합니다. 메모리에서 기본 슬롯을 렌더링하는 동안 대체 슬롯의 내용을 표시합니다.


  If it encounters async dependencies ([Async Components](/guide/components/async.html) and components with [`async setup()`](/guide/built-ins/suspense.html#async-setup)) while rendering the default slot, it will wait until all of them are resolved before displaying the default slot.

  렌더링하는 동안 비동기 종속성([Async Components](/guide/components/async.html) 및 [`async setup()`](/guide/built-ins/suspense.html#async-setup)이 있는 컴포넌트)이 발생하는 경우 기본 슬롯이 있는 경우 기본 슬롯을 표시하기 전에 모든 문제가 해결될 때까지 기다립니다.


- **See also:** [Guide - Suspense](/guide/built-ins/suspense.html)
- **참조:** [가이드 - Suspense](/guide/built-ins/suspense.html)
