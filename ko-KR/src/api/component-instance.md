:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Component Instance

# 컴포넌트 인스턴스

:::info
This page documents the built-in properties and methods exposed on the component public instance, i.e. `this`.

All properties listed on this page are readonly (except nested properties in `$data`).
:::

:::info
이 페이지는 컴포넌트 공개(Public) 인스턴스(예: `this`)에서 제공되는 내장 속성 및 메서드를 문서화합니다.


All properties listed on this page are readonly (except nested properties in `$data`).

이 페이지에 나열된 모든 속성은 읽기 전용입니다(`$data`의 중첩 속성 제외).

:::

## $data

The object returned from the [`data`](./options-state.html#data) option, made reactive by the component. The component instance proxies access to the properties on its data object.

[`data`](./options-state.html#data) 옵션에서 반환된 객체는 컴포넌트에 의해 반응형 객체로 변환됩니다.  컴포넌트 인스턴스는 데이터 개체의 속성들에 접근할때 이 접근을 프록시하여 제공합니다. 


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props

An object representing the component's current, resolved props.

컴포넌트의 현재 해결된 props을 나타내는 개체입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Details**

  Only props declared via the [`props`](./options-state.html#props) option will be included. The component instance proxies access to the properties on its props object.

  [`props`](./options-state.html#props) 옵션을 통해 선언된 props만 포함됩니다. 컴포넌트 인스턴스는 props 개체의 속성들에 접근할때 이 접근을 프록시하여 제공합니다. 


## $el

The root DOM node that the component instance is managing.

컴포넌트 인스턴스가 관리하는 루트 DOM 노드입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **Details**

  `$el` will be `undefined` until the component is [mounted](./options-lifecycle#mounted).

  `$el`은 컴포넌트가 [mounted](./options-lifecycle#mounted)될 때까지 `undefined`입니다.


  - For components with a single root element, `$el` will point to that element.
  - 단일 루트엘리먼트가 있는 컴포넌트의 경우 `$el`은 해당엘리먼트를 가리킵니다.
  - 
  - For components with text root, `$el` will point to the text node.
  - 텍스트 루트가 있는 컴포넌트의 경우 `$el`은 텍스트 노드를 가리킵니다.
  - 
  - For components with multiple root nodes, `$el` will be the placeholder DOM node that Vue uses to keep track of the component's position in the DOM (a text node, or a comment node in SSR hydration mode).
  - 여러 루트 노드가 있는 컴포넌트의 경우 `$el`은 Vue가 DOM(텍스트 노드 또는 SSR 수화 모드의 주석 노드)에서 컴포넌트의 위치를 ​​추적하는 데 사용하는 자리 표시자 DOM 노드입니다.


  :::tip
  For consistency, its is recommended to use [template refs](/guide/essentials/template-refs.html) for direct access to elements instead of relying on `$el`.
  :::

  :::tip
  일관성을 위해 `$el`에 의존하는 대신엘리먼트에 직접 액세스할 때 [템플릿 refs](/guide/essentials/template-refs.html)를 사용하는 것이 좋습니다.
  :::

  


## $options

The resolved component options used for instantiating the current component instance.

현재 컴포넌트 인스턴스를 인스턴스화하는 데 사용되는 확인된 컴포넌트 옵션입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Details**

  The `$options` object exposes the resolved options for the current component and is the merge result of these possible sources:

  `$options` 객체는 현재 컴포넌트에 대한 해결된 옵션을 노출하며 다음과 같은 가능한 소스의 병합 결과입니다.


  - Global mixins
  - 전역 믹스인

  - Component `extends` base
  - 컴포넌트 `extends` 기반
  - Component mixins
  - 컴포넌트 믹스인

  It is typically used to support custom component options:
  일반적으로 사용자 지정 컴포넌트 옵션을 지원하는 데 사용됩니다.


  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **See also:** [`app.config.optionMergeStrategies`](/api/application.html#app-config-optionmergestrategies)
- **참조:** [`app.config.optionMergeStrategies`](/api/application.html#app-config-optionmergestrategies)


## $parent

The parent instance, if the current instance has one. It will be `null` for the root instance itself.

현재 인스턴스에 상위 인스턴스가 있는 경우 상위 인스턴스입니다. 루트 인스턴스 자체에 대해서는 'null'이 됩니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root

The root component instance of the current component tree. If the current instance has no parents this value will be itself.

현재 컴포넌트 트리의 루트 컴포넌트 인스턴스입니다. 현재 인스턴스에 상위 항목이 없으면 이 값 자체가 됩니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots

An object representing the [slots](/guide/components/slots.html) passed by the parent component.

상위 컴포넌트에 의해 전달된 [슬롯](/guide/components/slots.html)을 나타내는 개체입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Details**

  Typically used when manually authoring [render functions](/guide/extras/render-function.html), but can also be used to detect whether a slot is present.

  일반적으로 [render functions](/guide/extras/render-function.html)를 수동으로 작성할 때 사용되지만 슬롯이 있는지 여부를 감지하는 데에도 사용할 수 있습니다.


  Each slot is exposed on `this.$slots` as a function that returns an array of vnodes under the key corresponding to that slot's name. The default slot is exposed as `this.$slots.default`.

  각 슬롯은 해당 슬롯의 이름에 해당하는 키 아래에 vnode 배열을 반환하는 함수로 `this.$slots`에 노출됩니다. 기본 슬롯은 `this.$slots.default`로 표시됩니다.


  If a slot is a [scoped slot](/guide/components/slots.html#scoped-slots), arguments passed to the slot functions are available to the slot as its slot props.

  슬롯이 [범위가 지정된 슬롯](/guide/components/slots.html#scoped-slots)인 경우 슬롯 함수에 전달된 인수는 슬롯 소품으로 슬롯에 사용할 수 있습니다.


- **See also:** [Render Functions - Rendering Slots](/guide/extras/render-function.html#rendering-slots)
- **See also:** [렌더링 함수 - 슬롯 렌더링](/guide/extras/render-function.html#rendering-slots)

## $refs

An object of DOM elements and component instances, registered via [template refs](/guide/essentials/template-refs.html).

[템플릿 참조](/guide/essentials/template-refs.html)를 통해 등록된 DOM엘리먼트 및 컴포넌트 인스턴스의 개체입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **See also:**

  - [Template refs](/guide/essentials/template-refs.html)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs

An object that contains the component's fallthrough attributes.

컴포넌트의 대체 속성이 포함된 개체입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Details**

  [Fallthrough Attributes](/guide/components/attrs.html) are attributes and event handlers passed by the parent component, but not declared as a prop or a emitted event by the child.

  [폴스루 속성](/guide/components/attrs.html)은 상위 구성요소에 의해 전달된 속성 및 이벤트 핸들러이지만 하위엘리먼트 또는 내보낸 이벤트로 선언되지 않습니다.


  By default, everything in `$attrs` will be automatically inherited on the component's root element if there is only a single root element. This behavior is disabled if the component has multiple root nodes, and can be explicitly disabled with the [`inheritAttrs`](./options-misc.html#inheritattrs) option.

  기본적으로 `$attrs`의 모든 항목은 단일 루트엘리먼트만 있는 경우 컴포넌트의 루트엘리먼트에서 자동으로 상속됩니다. 이 동작은 컴포넌트에 여러 루트 노드가 있는 경우 비활성화되며 [`inheritAttrs`](./options-misc.html#inheritattrs) 옵션을 사용하여 명시적으로 비활성화할 수 있습니다.


- **See also:**

  - [Fallthrough Attributes](/guide/components/attrs.html)
  - [폴스루 속성](/guide/components/attrs.html)



## $watch()

Imperative API for creating watchers.

watcher를 생성하기 위한 명령형 API.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Details**

  The first argument is the watch source. It can be a component property name string, a simple dot-delimited path string, or a getter function.

  첫 번째 인자는 감시 소스입니다. 컴포넌트 속성 이름 문자열, 점으로 구분된 간단한 경로 문자열 또는 getter 함수일 수 있습니다.


  The second argument is the callback function. The callback receives the new value and the old value of the watched source.

  두 번째 인수는 콜백 함수입니다. 콜백은 감시된 소스의 새 값과 이전 값을 수신합니다.


  - **`immediate`**: trigger the callback immediately on watcher creation. Old value will be `undefined` on the first call.
  - **`immediate`**: 감시자가 생성되는 즉시 콜백을 트리거합니다. 이전 값은 첫 번째 호출에서 '정의되지 않음'입니다.

  - **`deep`**: force deep traversal of the source if it is an object, so that the callback fires on deep mutations. See [Deep Watchers](/guide/essentials/watchers.html#deep-watchers).
  - **`deep`**: 소스가 객체인 경우 소스의 깊은 순회를 강제 실행하여 콜백이 깊은 돌연변이에서 실행되도록 합니다. [Deep Watchers](/guide/essentials/watchers.html#deep-watchers)를 참조하세요.


  - **`flush`**: adjust the callback's flush timing. See [Callback Flush Timing](/guide/essentials/watchers.html#callback-flush-timing).
  - **`flush`**: 콜백의 플러시 타이밍을 조정합니다. [콜백 플러시 타이밍](/guide/essentials/watchers.html#callback-flush-timing)을 참조하세요.


  - **`onTrack / onTrigger`**: debug the watcher's dependencies. See [Watcher Debugging](/guide/extras/reactivity-in-depth.html#watcher-debugging).
  - **`onTrack / onTrigger`**: 감시자의 종속성을 디버그합니다. [감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)을 참조하세요.


- **Example**

  Watch a property name:
  
  속성 이름을 감시: 

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Watch a dot-delimited path:
  
  점 구분자 경로를 감시: 

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Using getter for more complex expressions:

  더 복잡한 경우를 추적하기 위해 getter를 사용


  ```js
  this.$watch(
    // every time the expression `this.a + this.b` yields
    // a different result, the handler will be called.
    // It's as if we were watching a computed property
    // without defining the computed property itself.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Stopping the watcher:

  watcher 중지 시키기: 

  ```js
  const unwatch = this.$watch('a', cb)

  // later...
  unwatch()
  ```

- **See also:**
  - [Options - `watch`](/api/options-state.html#watch)
  - [Guide - Watchers](/guide/essentials/watchers.html)

## $emit()

Trigger a custom event on the current instance. Any additional arguments will be passed into the listener's callback function.

현재 인스턴스에서 사용자 정의 이벤트를 트리거합니다. 추가 인수는 리스너의 콜백 함수로 전달됩니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Example**

  ```js
  export default {
    created() {
      // only event
      this.$emit('foo')
      // with additional arguments
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **See also:**

  - [Component - Events](/guide/components/events.html)
  - [`emits` option](./options-state.html#emits)

## $forceUpdate()

Force the component instance to re-render.

컴포넌트 인스턴스를 강제로 다시 렌더링합니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Details**

  This should be rarely needed given Vue's fully automatic reactivity system. The only cases where you may need it is when you have explicitly created non-reactive component state using advanced reactivity APIs.

  Vue의 완전 자동 반응성 시스템을 고려할 때 이것은 거의 필요하지 않습니다. 필요할 수 있는 유일한 경우는 고급 반응성 API를 사용하여 비반응성 컴포넌트 상태를 명시적으로 생성한 경우입니다.


## $nextTick()

Instance-bound version of the global [`nextTick()`](./general.html#nexttick).

전역 [`nextTick()`](./general.html#nexttick)의 인스턴스 바인딩 버전입니다.


- **Type**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Details**

  The only different from the global version of `nextTick()` is that the callback passed to `this.$nextTick()` will have its `this` context bound to the current component instance.

  `nextTick()`의 글로벌 버전과 유일한 차이점은 `this.$nextTick()`에 전달된 콜백이 현재 컴포넌트 인스턴스에 바인딩된 `this` 컨텍스트를 갖는다는 것입니다.


- **See also:** [`nextTick()`](./general.html#nexttick)
