:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Composition API: Lifecycle Hooks
# 컴포지션 API: 생명주기 후크

:::info Usage Note
All APIs listed on this page must be called synchronously during the `setup()` phase of a component. See [Guide - Lifecycle Hooks](/guide/essentials/lifecycle.html) for more details.
:::

:::info 사용법 설명
이 페이지에 나열된 모든 API는 구성앨리먼트의 `setup()` 단계에서 동기적으로 호출되어야 합니다. 자세한 내용은 [가이드 - 생명주기 후크](/guide/essentials/lifecycle.html)를 참조하세요.
:::

## onMounted()

Registers a callback to be called after the component has been mounted.

컴포넌트가 마운트 된 후에 호출될 콜백을 등록합니다. 

- **Type**

  ```ts
  function onMounted(callback: () => void): void
  ```

- **Details**

  A component is considered mounted after:
  
  컴포넌트는 다음을 만족하면 마운트 되었다고 간주됩니다:


  - All of its synchronous child components have been mounted (does not include async components or components inside `<Suspense>` trees).
  - 모든 동기적으로 선언된 자식 컴포넌트들이 마운트 되었을때(비동기 컴포넌트나, `<Suspense>` 트리내에 포함된 컴포넌트들은 여기에서 제외됩니다)

  - Its own DOM tree has been created and inserted into the parent container. Note it only guarantees that the component's DOM tree is in-document if the application's root container is also in-document.
  - 자체 DOM 트리가 생성되어 상위 컨테이너에 삽입되었습니다. 애플리케이션의 루트 컨테이너가 Document 객체 내에 있는 경우에만 컴포넌트의 DOM 트리가 Document 객체 내에 있음을 보장합니다.

  This hook is typically used for performing side effects that need access to the component's rendered DOM, or for limiting DOM-related code to the client in a [server-rendered application](/guide/scaling-up/ssr.html).

  이 후크는 일반적으로 컴포넌트의 렌더링된 DOM에 액세스가 필요한 부작용(Side-effect)을 수행하거나 [서버 렌더링 응용 프로그램](/guide/scaling-up/ssr.html)에서 DOM 관련 코드를 클라이언트로 제한하는 데 사용됩니다

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

- **Example**

  Accessing an element via template ref:

  템플릿 ref를 통행 엘리먼트에 접근: 

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated()

Registers a callback to be called after the component has updated its DOM tree due to a reactive state change.

반응형 상태 변경으로 인해 컴포넌트가 DOM 트리를 업데이트한 후 호출됩니다.

- **Type**

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **Details**

  A parent component's updated hook is called after that of its child components.

  부모 컴포넌트의 `updated` 후크는 자식 컴포넌트들의 `updated` 후크가 모두 호출된 이후에 호출됩니다. 

  This hook is called after any DOM update of the component, which can be caused by different state changes. If you need to access the updated DOM after a specific state change, use [nextTick()](/api/general.html#nexttick) instead.

  이 후크는 다른 상태 변경으로 인해 발생할 수 있는 컴포넌트의 DOM 업데이트 후에 호출됩니다. 특정 상태 변경이 완료된 후에 갱신된(새로운 값이 반영된) DOM에 액세스해야 하는 경우라면, 대신 [nextTick()](/api/general.html#nexttick)을 사용하세요.

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

  :::warning
  Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!
  :::

  :::warning
  `updated` 후크에서 컴포넌트의 상태를 변경하지 마십시오. 무한 업데이트 루프가 발생할 수 있습니다!
  :::

- **Example**

  Accessing updated DOM:

  업데이트된 DOM에 접근합니다:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // text content should be the same as current `count.value`
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted()

Registers a callback to be called after the component has been unmounted.

컴포넌트가 마운트 해제된 후 호출됩니다.

- **Type**

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **Details**

  A component is considered unmounted after:

  컴포넌트는 다음의 내용이 완료되면 언마운트 되었다고 간주됩니다: 

  - All of its child components have been unmounted.
  - 모든 자식 컴포넌트가 언마운트 되었음.

  - All of its associated reactive effects (render effect and computed / watchers created during `setup()`) have been stopped.
  - 관련된 모든 반응형 효과(`setup()` 동안 생성된 렌더링 효과 및 computed/watcher)가 중지되었음.

  Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.

  이 후크를 사용하여 타이머, DOM 이벤트 리스너 또는 서버 연결과 같은 수동으로 생성된 부작용(side effect)을 정리합니다.

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

- **Example**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount()

Registers a hook to be called right before the component is to be mounted.

컴포넌트가 마우트 되기 직전에 호출됩니다. 

- **Type**

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **Details**

  When this hook is called, the component has finished setting up its reactive state, but no DOM nodes have been created yet. It is about to execute its DOM render effect for the first time.

  이 후크가 호출되면 컴포넌트가가 반응형 상태들에 대한 설정을 완료했지만 DOM 노드는 아직 생성되지 않았습니다. 처음으로 DOM 렌더링을 수행하려고 하는 순간입니다. 

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

## onBeforeUpdate()

Registers a hook to be called right before the component is about to update its DOM tree due to a reactive state change.

반응형 상태의 변경이 발생하여 컴포넌트가 DOM 트리를 업데이트하려고 하기 직전에 호출됩니다.

- **Type**

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **Details**

  This hook can be used to access the DOM state before Vue updates the DOM. It is also safe to modify component state inside this hook.

  이 후크는 Vue가 DOM을 업데이트하기 전에 DOM 상태에 액세스하는 데 사용할 수 있습니다. 이 후크 내부에서 컴포넌트의 상태를 수정하는 것도 안전합니다.

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

## onBeforeUnmount()

Registers a hook to be called right before a component instance is to be unmounted.

컴포넌트 인스턴스가 마운트 해제되기 직전에 호출됩니다.

- **Type**

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **Details**

  When this hook is called, the component instance is still fully functional.

  이 후크가 호출될때는 아직 컴포넌트 인스턴스는 완전히 동작하는 상태입니다. 

  **This hook is not called during server-side rendering.**

  **이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

## onErrorCaptured()

Registers a hook to be called when an error propagating from a descendent component has been captured.

하위 컴포넌트에서 에러가 전파되었다면 호출됩니다. 

- **Type**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **Details**

  Errors can be captured from the following sources:

  에러는 다음과 같은 소스에서 발생되어 캡쳐될수 있습니다:

  - Component renders
  - 컴포넌트 렌더 함수
  - Event handlers
  - 이벤트 핸들러 
  - Lifecycle hooks
  - 생명주기 후크
  - `setup()` function
  - `setup()` 함수
  - Watchers
  - watcher 함수
  - Custom directive hooks
  - 커스텀 디렉티브 후크
  - Transition hooks
  - 트랜지션 후크

  The hook receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.

  후크 함수는 3개의 인자를 받습니다. 발생한 에러, 에러를 트리거한 컴포넌트 인스턴스, 오류 소스 유형을 지정하는 정보성 문자열

  You can modify component state in `errorCaptured()` to display an error state to the user. However, it is important that the error state should not render the original content that caused the error; otherwise the component will be thrown into an infinite render loop.

  `errorCaptured()`에서 컴포넌트 상태를 수정하여 사용자에게 오류 상태를 표시할 수 있습니다. 그러나 오류 상태가 오류를 일으킨 원본 콘텐츠를 렌더링해서는 안 됩니다. 그렇지 않으면 컴포넌트가 무한 렌더링 루프에 던져집니다.

  The hook can return `false` to stop the error from propagating further. See error propagation details below.

  후크는 `false`를 반환하여 오류가 더 이상 전파되지 않도록 할 수 있습니다. 아래 오류 전파 세부 정보를 참조하십시오.

  **Error Propagation Rules**

  **에러 전파 규칙**

  - By default, all errors are still sent to the application-level [`app.config.errorHandler`](/api/application.html#app-config-errorhandler) if it is defined, so that these errors can still be reported to an analytics service in a single place.
  - 기본적으로 모든 오류는 정의된 경우 애플리케이션 수준의 [`app.config.errorHandler`](/api/application.html#app-config-errorhandler)로 전송되므로 이러한 오류가 계속 보고될 수 있습니다. 한 곳에서 분석 서비스를 제공합니다.


  - If multiple `errorCaptured` hooks exist on a component's inheritance chain or parent chain, all of them will be invoked on the same error.
  - 컴포넌트의 상속 체인 또는 상위 체인에 여러 `errorCaptured` 후크가 있는 경우 모두 동일한 오류에서 호출됩니다.

  - If the `errorCaptured` hook itself throws an error, both this error and the original captured error are sent to `app.config.errorHandler`.
  - `errorCaptured` 후크 자체에서 오류가 발생하면 이 오류와 원래 캡처된 오류가 모두 `app.config.errorHandler`로 전송됩니다.

  - An `errorCaptured` hook can return `false` to prevent the error from propagating further. This is essentially saying "this error has been handled and should be ignored." It will prevent any additional `errorCaptured` hooks or `app.config.errorHandler` from being invoked for this error.
  - `errorCaptured` 후크는 `false`를 반환하여 오류가 더 이상 전파되는 것을 방지할 수 있습니다. 이것은 본질적으로 "이 오류는 처리되었으며 무시되어야 합니다."라고 말합니다. 추가 `errorCaptured` 후크 또는 `app.config.errorHandler`가 이 오류에 대해 호출되는 것을 방지합니다.

## onRenderTracked() <sup class="vt-badge dev-only" />

Registers a debug hook to be called when a reactive dependency has been tracked by the component's render effect.

컴포넌트의 렌더링 효과에 의해 반응형 의존성이 추적되었을때 호출됩니다.

**This hook is development-mode-only and not called during server-side rendering.**

**이 후크는 개발 모드만을 위한 기능이며, 서버사이드렌더링에서는 호출되지 않습니다**

- **Type**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **See also:** [Reactivity in Depth](/guide/extras/reactivity-in-depth.html)
- **참고:** [반응형 심화](/guide/extras/reactivity-in-depth.html)

## onRenderTriggered() <sup class="vt-badge dev-only" />

Registers a debug hook to be called when a reactive dependency triggers the component's render effect to be re-run.

반응 종속성이 컴포넌트의 렌더링 효과를 다시 실행하도록 트리거할 때 호출됩니다.

**This hook is development-mode-only and not called during server-side rendering.**

**이 후크는 개발 모드만을 위한 기능이며, 서버사이드렌더링에서는 호출되지 않습니다**

- **Type**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **See also:** [Reactivity in Depth](/guide/extras/reactivity-in-depth.html)

## onActivated()

Registers a callback to be called after the component instance is inserted into the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components.html#keepalive).

[`<KeepAlive>`](/api/built-in-components.html#keepalive)에 의해 캐시된 컴포넌트 인스턴스가 DOM 트리 내부에 삽입된 후 호출되는 콜백을 등록합니다. 

**This hook is not called during server-side rendering.**

**이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

- **Type**

  ```ts
  function onActivated(callback: () => void): void
  ```

- **See also:** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)
- **참조:** [가이드 - 캐시된 인스턴스의 생명주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onDeactivated()

Registers a callback to be called after the component instance is removed from the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components.html#keepalive).

[`<KeepAlive>`](/api/built-in-components.html#keepalive)에 의해 캐시된 컴포넌트 인스턴스가 DOM 트리 내부에서 제거된후에  호출되는 콜백을 등록합니다. 

**This hook is not called during server-side rendering.**

**이 후크는 서버 사이드 렌더링에서는 호출 되지 않습니다.**

- **Type**

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **See also:** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" />

Registers a async function to be resolved before the component instance is to be rendered on the server.

컴포넌트 인스턴스가 서버에서 렌더링되기 전에 해소될(resolve) 비동기 함수 콜백을 등록합니다. 

- **Type**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **Details**

  If the callback returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.

  후크가 프로마이즈를 반환하면 서버 렌더러는 컴포넌트를 렌더링하기 전에 프로마이즈가 해소 될때까지  기다립니다.

  This hook is only called during server-side rendering can be used to perform server-only data fetching.

  이 후크는 서버 측 렌더링 중에만 호출되어 서버 전용 데이터 가져오기를 수행하는 데 사용할 수 있습니다.

- **Example**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **See also:** [Server-Side Rendering](/guide/scaling-up/ssr.html)
- **참조:** [서버 사이드 렌더링](/guide/scaling-up/ssr.html)
