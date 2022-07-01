# 컴포넌트 인스턴스 {#component-instance}

:::info
이 페이지는 컴포넌트의 공개적인(public) 인스턴스인 `this`에 노출되는 빌트인 속성 및 메서드에 관한 문서입니다.

이 페이지에 나열된 모든 속성은 읽기 전용입니다(`$data`의 중첩 속성 제외).
:::

## $data

[`data`](./options-state.html#data) 옵션에서 반환된 객체로 컴포넌트에 의해 반응형이 됩니다.
컴포넌트 인스턴스는 데이터 객체의 속성 접근을 프락시합니다.
예를들면,
컴포넌트 인스턴스는 데이터 객체의 속성 `this.$data.a`를 `this.a`와 같이 바로 접근할 수 있도록 합니다.


- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props

현재 컴포넌트의 처리(선언, 할당 및 초기화)된 props를 나타내는 객체입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **세부 사항**:

  [`props`](./options-state.html#props) 옵션을 통해 선언된 props만 포함됩니다.
  컴포넌트 인스턴스는 props 객체의 속성 접근을 프락시합니다.

## $el

컴포넌트 인스턴스가 관리하는 루트 DOM 노드입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $el: Node | undefined
  }
  ```

- **세부 사항**:

  `$el`은 [mounted](./options-lifecycle#mounted)될 때까지 `undefined`입니다.

  - 싱글 루트 엘리먼트가 있는 컴포넌트의 경우,
    `$el`은 해당 엘리먼트를 가리킵니다.
  - 텍스트 루트가 있는 컴포넌트의 경우,
    `$el`은 텍스트 노드를 가리킵니다.
  - 여러 루트 노드가 있는 컴포넌트의 경우,
    `$el`은 Vue가 DOM(텍스트 노드 또는 SSR 하이드레이션 모드의 주석 노드)에서 컴포넌트의 위치를 추적하는 데 사용하는 플레이스홀더(placeholder) DOM 노드입니다.

  :::tip
  엘리먼트에 일관적으로 접근해야 할 때,
  `$el`보다 [템플릿 참조](/guide/essentials/template-refs.html)를 사용하는 것이 권장됩니다.
  :::

## $options

현재 컴포넌트 인스턴스를 인스턴스화하는 데 사용된, 처리된 컴포넌트 옵션입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **세부 사항**:

  `$options` 객체는 현재 컴포넌트의 처리된 옵션을 노출하며,
  이것은 아래와 같은 소스의 병합 결과입니다:

  - 전역 믹스인
  - `extends` 기반의 컴포넌트
  - 컴포넌트 믹스인

  일반적으로 커스텀 컴포넌트 옵션을 지원하는 데 사용됩니다:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **참고**: [`app.config.optionMergeStrategies`](/api/application.html#app-config-optionmergestrategies)

## $parent

현재 인스턴스에 부모 인스턴스가 있는 경우,
부모 인스턴스를 나타냅니다.
현재 인스턴스가 루트 인스턴스일 경우에는 `null`이 됩니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root

현재 컴포넌트 트리의 루트 컴포넌트 인스턴스입니다.
현재 인스턴스에 부모가 없으면, 값은 현재 인스턴스 자체가 됩니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots

부모 컴포넌트로부터 전달된 [slots](/guide/components/slots.html)을 나타내는 객체입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **세부 사항**:

  일반적으로 [렌더 함수](/guide/extras/render-function.html)를 수동으로 작성할 때 사용되지만,
  슬롯 유무 확인에도 사용할 수 있습니다.

  `this.$slots`는 각 슬롯의 이름에 해당하는 함수가 노출되며,
  vnode(가상노드)로 구성된 배열을 반환합니다.
  기본 슬롯은 `this.$slots.default`로 표시됩니다.

  슬롯이 [범위가 지정된 슬롯](/guide/components/slots.html#scoped-slots)이면,
  슬롯 함수에 전달된 인자를 슬롯 prop으로 사용할 수 있습니다.

- **참고**: [Render Functions - Rendering Slots](/guide/extras/render-function.html#rendering-slots)

## $refs

[템플릿 참조](/guide/essentials/template-refs.html)를 통해 등록된,
DOM 엘리먼트 및 컴포넌트 인스턴스 객체입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **참고**:

  - [가이드 - 템플릿 참조](/guide/essentials/template-refs.html)
  - [특수 속성 - ref](./built-in-special-attributes.md#ref)

## $attrs

컴포넌트의 폴스루 속성이 포함된 객체입니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **세부 사항**:

  [폴스루 속성](/guide/components/attrs.html)은 부모 컴포넌트에서 전달한 속성 및 이벤트 핸들러이지만,
  자식의 prop 또는 내보낼(emit) 이벤트로 선언하지 않습니다.

  기본적으로 `$attrs`의 모든 항목은 싱글 루트 엘리먼트만 있는 경우,
  컴포넌트의 루트 엘리먼트로 자동 상속됩니다.
  [`inheritAttrs`](./options-misc.html#inheritattrs) 옵션을 사용하여 명시적으로 비활성화할 수 있으며,
  컴포넌트에 여러 루트 노드가 있는 경우에도 비활성화 됩니다.

- **참고**:

  - [가이드 - 폴스루 속성](/guide/components/attrs.html)

## $watch()

감시자를 생성하기 위한 명령형 API.

- **타입**:

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
    immediate?: boolean // 기본 값: false
    deep?: boolean // 기본 값: false
    flush?: 'pre' | 'post' | 'sync' // 기본 값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **세부 사항**:
  첫 번째 인자는 감시할 소스입니다.
  컴포넌트 속성명 문자열, 점으로 구분된 간단한 경로 문자열 또는 getter 함수일 수 있습니다.

  두 번째 인자는 콜백 함수입니다.
  콜백은 감시된 소스의 새 값과 이전 값을 인자로 받습니다.

  - **`immediate`**: 감시자가 생성되는 즉시 콜백이 호출됩니다.
    최초 호출 시, 이전 값은 `undefined`입니다.
  - **`deep`**: 소스가 객체인 경우, 깊은 변경사항에서도 콜백이 실행되도록 합니다.
    참고: [깊은 감시자](/guide/essentials/watchers.html#deep-watchers).
  - **`flush`**: 콜백의 발생(flush) 타이밍을 조정합니다.
    참고: [콜백 실행 타이밍](/guide/essentials/watchers.html#callback-flush-timing).
  - **`onTrack / onTrigger`**: 감시자의 종속성을 디버그합니다.
    참고: [감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging).

- **예제**:

  속성명으로 감시:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  점 구분자로 경로를 감시:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  복합적인 추적이 필요할 경우 getter 사용:

  ```js
  this.$watch(
    // `this.a + this.b` 표현식이 다른 결과를
    // 생성할 때마다 핸들러가 호출됩니다.
    // 계산된 속성을 정의하지 않고
    // 계산된 속성을 감시하고 있는 것과 같습니다.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  감시자 중지(해제):

  ```js
  const unwatch = this.$watch('a', cb)

  // 더 이상 'a'를 감시하지 않음
  unwatch()
  ```

- **참고**:
  - [옵션 - `watch`](/api/options-state.html#watch)
  - [가이드 - 감시자](/guide/essentials/watchers.html)

## $emit()

현재 인스턴스에서 커스텀 이벤트를 트리거합니다.
추가적인 인자는 리스너의 콜백 함수로 전달됩니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **예제**:

  ```js
  export default {
    created() {
      // 커스텀 이벤트 'foo'만 트리거
      this.$emit('foo')
      // 추가 인자와 함께 트리거
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **참고**:

  - [가이드 - 컴포넌트 이벤트](/guide/components/events.html)
  - [옵션 - `emits`](./options-state.html#emits)

## $forceUpdate()

컴포넌트 인스턴스를 강제로 다시 렌더링합니다.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **세부 사항**:

  Vue의 전반적인 자동 반응형 시스템을 고려할 때,
  이것은 거의 필요하지 않습니다.
  필요할 수 있는 유일한 경우는 고급 반응형 API를 사용하여,
  비반응형 컴포넌트 상태를 명시적으로 생성하는 경우입니다.

## $nextTick()

전역 [`nextTick()`](./general.html#nexttick)가 인스턴스에 바인딩된 버전.

- **타입**:

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **세부 사항**:

  전역 `nextTick()`과의 유일한 차이점은 `this.$nextTick()`에 전달된 콜백이 현재 컴포넌트 인스턴스에 바인딩된 `this` 컨텍스트를 갖는다는 것입니다.

- **참고**: [`nextTick()`](./general.html#nexttick)
