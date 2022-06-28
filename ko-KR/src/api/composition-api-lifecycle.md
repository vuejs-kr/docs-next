# 컴포지션 API: 수명주기 훅

:::info 사용 참고 사항
이 페이지에 나열된 모든 API는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.
자세한 내용은 [가이드 - 수명주기 훅](/guide/essentials/lifecycle.html)을 참고하세요.
:::

## onMounted()

컴포넌트가 마운트된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onMounted(callback: () => void): void
  ```

- **세부 사항**:

  컴포넌트가 마운트 되었다고 간주하는 조건은 다음과 같습니다:

  - 동기식 자식 컴포넌트가 모두 마운트됨(`<Suspense>` 트리 내부의 비동기 컴포넌트 또는 컴포넌트는 포함하지 않음).

  - 자체 DOM 트리가 생성되어 상위 컨테이너에 삽입됨.
    앱의 루트 컨테이너가 Document 내에 있는 경우에만 컴포넌트의 DOM 트리가 문서 내에 있음을 보장함.

  일반적으로 이 훅은 컴포넌트의 렌더링된 DOM에 접근해야 하는 사이드 이펙트를 실행하거나,
  [서버에서 렌더링 된 앱](/guide/scaling-up/ssr.html)에서 DOM과 관련 코드를 클라이언트에서만 실행하도록 제한하는 데 사용됩니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **예제**:

  템플릿 ref를 통해 엘리먼트에 접근:

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

반응형 상태 변경으로 컴포넌트의 DOM 트리가 업데이트된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onUpdated(callback: () => void): void
  ```

- **세부 사항**:

  부모 컴포넌트의 updated 훅은 자식 컴포넌트의 훅 이후에 호출됩니다.

  이 훅은 상태 변경에 영향을 받을 컴포넌트의 DOM 업데이트 후에 호출됩니다.
  특정 상태 변경 후 업데이트된 DOM에 접근해야 하는 경우, [nextTick()](/api/general.html#nexttick)을 사용해야 합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

  :::warning 주의
  updated 훅에서 컴포넌트 상태를 변경하면 안되는데,
  무한 업데이트 루프가 발생할 수 있기 때문입니다!
  :::

- **예제**:

  업데이트된 DOM에 접근:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // 텍스트 내용은 현재 `count.value`와 같아야 함
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted()

컴포넌트가 마운트 해제된 후 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onUnmounted(callback: () => void): void
  ```

- **세부 사항**:

  컴포넌트가 마운트 해제되었다고 간주하는 조건은 다음과 같습니다:

  - 모든 자식 컴포넌트가 마운트 해제됨.

  - 관련된 모든 반응형 이펙트(`setup()`에서 생성된 렌더 이펙트, 계산된 속성, 감시자)가 중지됨.

  이 훅을 사용하여 타이머, DOM 이벤트 리스너 또는 서버 연결처럼 수동으로 생성된 사이드 이펙트를 정리합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **예제**:

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

컴포넌트가 마운트되기 직전에 호출될 훅을 등록합니다.

- **타입**:

  ```ts
  function onBeforeMount(callback: () => void): void
  ```

- **세부 사항**:

  이 훅은 컴포넌트의 반응형 상태 설정이 완료된 후 호출되지만, 아직 DOM 노드가 생성되지 않은 단계입니다.
  첫 DOM 렌더 이펙트를 실행하려고 합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onBeforeUpdate()

반응형 상태 변경으로 컴포넌트의 DOM 트리를 업데이트하기 직전에 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onBeforeUpdate(callback: () => void): void
  ```

- **세부 사항**:

  이 훅은 Vue가 DOM을 업데이트하기 전에 DOM 상태에 접근하는 데 사용할 수 있습니다.
  이 훅 내부에서 컴포넌트 상태를 수정하는 것도 안전합니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onBeforeUnmount()

컴포넌트 인스턴스가 마운트 해제되기 직전에 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onBeforeUnmount(callback: () => void): void
  ```

- **세부 사항**:

  이 훅이 호출될 때, 여전히 컴포넌트 인스턴스는 완전히 동작하는 상태입니다.

  **이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

## onErrorCaptured()

자식 컴포넌트에서 전파된 에러가 캡쳐되었을 때 호출될 콜백을 등록합니다.

- **타입**:

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **세부 사항**:

  다음과 같은 출처의 에러를 캡처할 수 있습니다:

  - 컴포넌트 렌더
  - 이벤트 핸들러
  - 수명주기 훅
  - `setup()` 함수
  - 감시자
  - 커스텀 디렉티브 훅
  - 트랜지션 훅

  훅은 '에러', '에러를 트리거한 컴포넌트 인스턴스', '에러 소스 유형을 지정하는 정보 문자열' 세 개의 인자를 받습니다.

  `errorCaptured` 훅에서 컴포넌트 상태를 수정하여 사용자에게 에러 상태를 표시할 수 있습니다.
  그러나 애러가 난 컴포넌트에서 에러 상태를 렌더링해서는 안됩니다.
  그렇지 않으면 컴포넌트가 무한 렌더링 루프에 빠집니다.

  훅은 `false`를 반환하여 에러가 더 이상 전파되지 않도록 할 수 있습니다.
  아래의 에러 전파 세부 사항을 참조하십시오.

  **에러 전파 규칙**

  - 기본적으로 모든 에러는 단계적으로 전파되며,
    [`app.config.errorHandler`](/api/application.html#app-config-errorhandler)가 정의된 경우,
    최종적으로 이곳으로 전파되므로 한 곳에서 서비스 분석 및 보고 작업을 할 수 있습니다.

  - 컴포넌트의 상속 또는 부모 체인에 `errorCaptured` 훅이 여러 개 있는 경우,
    모두 동일한 에러를 호출합니다.

  - `errorCaptured` 훅 자체에서 에러가 발생하면,
    이 에러와 원래 캡처된 에러가 모두 `app.config.errorHandler`로 전송됩니다.

  - `errorCaptured` 훅에서 `false`를 반환하면 더 이상 에러가 전파되지 않습니다.
    이것은 본질적으로 "이 에러는 처리되었으므로 무시되어야 합니다."를 의미합니다.
    따라서 이후 단계적으로 전파되어야 할 `errorCaptured` 훅 또는 `app.config.errorHandler`에 이 에러로 인한 호출 동작은 없습니다.

## onRenderTracked() <sup class="vt-badge dev-only" />

컴포넌트의 렌더 이펙트에 의해 반응형 종속성이 추적됐을 때, 호출될 디버그 콜백을 등록합니다.

**이 훅은 개발 모드 전용이며, 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

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

- **참고**: [반응형 심화](/guide/extras/reactivity-in-depth.html)

## onRenderTriggered() <sup class="vt-badge dev-only" />

컴포넌트의 렌더 이펙트가 반응형 종속성에 의해 다시 실행되도록 트리거된 경우, 호출될 디버그 콜백을 등록합니다.

**이 훅은 개발 모드 전용이며, 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

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

- **참고**: [반응형 심화](/guide/extras/reactivity-in-depth.html)

## onActivated()

[`<KeepAlive>`](/api/built-in-components.html#keepalive)로 캐시된 컴포넌트 인스턴스가 DOM 트리의 일부로 삽입된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  function onActivated(callback: () => void): void
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명 주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onDeactivated()

[`<KeepAlive>`](/api/built-in-components.html#keepalive)로 캐시된 컴포넌트 인스턴스가 DOM 트리에서 제거된 후 호출될 콜백을 등록합니다.

**이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다**.

- **타입**:

  ```ts
  function onDeactivated(callback: () => void): void
  ```

- **참고**: [가이드 - 캐시된 인스턴스의 수명 주기](/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR 전용" />

컴포넌트 인스턴스가 서버에서 렌더링 되기 전에 완료(resolve)되어야 하는 비동기 함수를 등록합니다.

- **타입**:

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **세부 사항**:

  콜백이 Promise를 반환하면,
  서버 렌더러는 컴포넌트를 렌더링하기 전 Promise가 해결될 때까지 기다립니다.

  이 훅은 SSR(서버 사이드 렌더링) 중에만 호출되므로,
  서버 전용 데이터 가져오기를 실행하는 데 사용할 수 있습니다.

- **예제**:

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // 서버에서 미리 데이터를 가져오는 것은
    // 클라이언트에서 데이터를 요청하는 것보다 빠름.
    // 최초 데이터 요청 결과로 컴포넌트의 일부가 렌더링 됨.
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // 마운트 시 데이터가 null일 경우,
      // 컴포넌트가 클라이언트에서 동적으로 렌더링되도록
      // 클라이언트 측에서 가져오기를 실행해야 함.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **참고**: [서버 사이드 렌더링](/guide/scaling-up/ssr.html)
