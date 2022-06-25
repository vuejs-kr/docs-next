# 반응형 API: 핵심 {#reactivity-api-core}

:::info 참고
반응형 API를 더 이해하고 싶은 경우, 다음 가이드 문서를 읽는 것을 추천합니다:

- [반응형 기초](/guide/essentials/reactivity-fundamentals.html) (API 스타일을 **컴포지션 API**로 설정하고 읽으세요)
- [반응형 심화](/guide/extras/reactivity-in-depth.html)
  :::

## ref()

전달된 값을 갖게 되고, 이것을 가리키는 단일 속성 `.value`가 있는 변경 가능한 반응형 ref 객체를 반환합니다.

- **타입**:

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **세부 사항**:

  ref 객체는 반응형이며, `.value` 속성에 새 값을 할당할 수 있습니다.
  즉, `.value`에 대한 모든 읽기 작업이 추적되고, 쓰기 작업은 관련 이펙트를 트리거합니다.

  객체가 ref의 값(`.value`)으로 할당되면,
  [reactive()](#reactive)로 내부 깊숙이(deeply) 반응하게 됩니다.
  이러한 동작은 객체 내부 깊숙이 ref가 포함되어 있으면, 언래핑됨을 의미합니다.

  내부 깊숙이까지 변환되는 것을 방지하려면, [`shallowRef()`](./reactivity-advanced.html#shallowref)를 사용해야 합니다.

  :::info 래핑, 언래핑의 개념이 혼란스러울 경우
  어떤 값이 `ref`에 할당되어 있다고 가정합시다.

  이 때, `.value`를 통해 할당된 값에 접근해야 한다면 "래핑"된 것이고, `.value` 없이 접근된다면 "언래핑"된 것이라고 이해할 수 있습니다.  
  :::

- **예제**:

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value++
  console.log(count.value) // 1
  ```

- **참고**:
  - [가이드 - `ref()`를 사용한 반응형 변수](/guide/essentials/reactivity-fundamentals.html#reactive-variables-with-ref)
  - [가이드 - `ref()`에 타입 지정하기](/guide/typescript/composition-api.html#typing-ref)

## computed()

getter 함수를 사용하며, getter로부터 반환된 값을 읽기 전용 반응형 [ref](#ref) 객체로 반환합니다.
`get`과 `set` 함수가 있는 객체를 사용하면, 쓰기 가능한 ref 객체를 반환합니다.

- **타입**:

  ```ts
  // 읽기 전용
  function computed<T>(
    getter: () => T,
    // 아래의 "계산된 속성 디버깅" 링크를 참조하세요
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // 쓰기 가능
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **예제**:

  읽기 전용 계산된 속성 ref 만들기:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  쓰기 가능한 계산된 속성 ref 만들기:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  디버깅:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **참고**:
  - [가이드 - 계산된 속성](/guide/essentials/computed.html)
  - [가이드 - 계산된 속성 디버깅](/guide/extras/reactivity-in-depth.html#computed-debugging)
  - [가이드 - `computed()`에 타입 지정하기](/guide/typescript/composition-api.html#typing-computed)

## reactive()

객체의 반응형 프락시(proxy)를 반환합니다.

- **타입**:

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **세부 사항**:

  반응형 변환은 "내부 깊숙이 있는(deep)" 모든 중첩 속성에 영향을 줍니다.
  또한, 반응형 객체는 내부 깊숙이 있는 모든 [refs](#ref) 속성의 반응형을 유지하면서 언래핑합니다.

  그러나 `Map` 같은 네이티브 컬렉션 타입 또는 반응형 배열의 요소인 ref로 접근할 때는 언래핑 되지 않음에 유의해야 합니다.

  내부 깊은 곳까지의 변환은 피하고 루트 수준에서만 반응형을 유지하려면, [shallowReactive()](./reactivity-advanced.html#shallowreactive)를 사용해야 합니다.

  반환된 객체와 중첩된 객체는 [프락시(Proxy)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)로 래핑되므로,
  원본 객체와 **동일하지 않습니다**.
  그러므로 반응형 프락시로만 작업하고, 원본 객체에 의존하지 않는 것이 좋습니다.

- **예제**:

  반응형 객체 생성:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Ref 언래핑:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // obj.count인 ref는 언래핑 됨
  console.log(obj.count === count.value) // true

  // `obj.count`도 업데이트 됨
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // `count` ref도 업데이트 됨
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  배열 또는 컬렉션 요소인 ref에 접근시, **언래핑 되지 않습니다**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // .value 필요
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // .value 필요
  console.log(map.get('count').value)
  ```

  [ref](#ref)를 `reactive` 속성에 할당하면, 해당 ref도 자동으로 언래핑됩니다:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **참고**:
  - [가이드 - 반응형 기초](/guide/essentials/reactivity-fundamentals.html)
  - [가이드 - `reactive()`에 타입 지정하기](/guide/typescript/composition-api.html#typing-reactive)

## readonly()

객체(반응형 또는 일반) 또는 [ref](#ref)를 가져와서 원본에 대한 읽기 전용 프락시를 반환합니다.

- **타입**:

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **세부 사항**:

  읽기 전용 프락시는 접근하게 될 모든 중첩 속성 깊숙이까지 읽기 전용입니다.
  또한 `reactive()`처럼 ref를 언래핑하며, 언래핑 값도 읽기 전용으로 변환됩니다.

  내부 깊은 곳까지의 변환을 피하려면, [shallowReadonly()](./reactivity-advanced.html#shallowreadonly)를 사용해야 합니다.

- **예제**:

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // 반응형 추적으로 작동됨
    console.log(copy.count)
  })

  // original을 변경하면 copy를 종속하는 감시자가 트리거됨
  original.count++

  // copy를 변경하려 해도 변경되지 않으며, 경고가 발생함
  copy.count++ // 경고!
  ```

## watchEffect()

즉시 함수를 실행하고 종속성을 반응적으로 추적하며, 종속성이 변경될 때마다 다시 실행합니다.

- **타입**:

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // 기본 값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **세부 사항**:

  첫 번째 인자는 실행할 이펙트 함수입니다.
  이펙트 함수는 인자로 클린업(cleanup) 콜백을 등록해 실행할 수 있는 함수를 받습니다.
  클린업 콜백은 다음에 이펙트가 다시 실행되기 직전에 호출되며,
  무효화된 사이드 이펙트를 정리하는 데 사용할 수 있습니다.
  예를들어 비동기 요청의 결과 대기중(pending)에 사용할 수 있습니다.(아래 예제 참조)

  두 번째 인자는 이펙트의 발생(flush) 타이밍을 조정하거나,
  이펙트의 종속성을 디버그하는 데 사용할 수 있는 선택적 옵션 객체입니다.

  반환 값은 이펙트가 다시 실행되지 않도록 호출할 수 있는 핸들 함수입니다.

- **예제**:

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  사이드 이펙트 정리:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `id`가 변경되면 `cancel`이 호출됩니다.
    // 이럴경우, 이전 요청이 완료되지 않고 여전히 대기중이라면,
    // 취소할 수 있습니다.(cancel 콜백 로직을 그렇게 정의한 경우)
    onCleanup(cancel)
    data.value = await response
  })
  ```

  감시자 중지하기:

  ```js
  const stop = watchEffect(() => {})

  // 감시자가 더 이상 필요하지 않을 때:
  stop()
  ```

  옵션:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **참고**:
  - [가이드 - 감시자](/guide/essentials/watchers.html#watcheffect)
  - [가이드 - 감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)

## watchPostEffect()

`flush: 'post'` 옵션 값을 사용하는 [`watchEffect()`](#watcheffect)의 별칭.

## watchSyncEffect()

`flush: 'sync'` 옵션 값을 사용하는 [`watchEffect()`](#watcheffect)의 별칭.

## watch()

하나 이상의 반응형 데이터 소스를 감시하고, 소스가 변경되면 콜백 함수를 호출합니다.

- **타입**:

  ```ts
  // 하나의 소스 감시
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // 여러 개의 소스 감시
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): StopHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // 반응형 객체

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // 기본 값: false
    deep?: boolean // 기본 값: false
    flush?: 'pre' | 'post' | 'sync' // 기본 값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**:

  `watch()`는 기본적으로 개으릅니다(lazy).
  그러므로 콜백은 감시된 소스가 변경되었을 때만 호출됩니다.

  첫 번째 인자는 감시될 **소스**입니다.
  소스는 다음 중 하나일 수 있습니다:

  - 값을 반환하는 getter 함수
  - ref
  - 반응형 객체
  - 또는 위에 나열한 것들의 배열

  두 번째 인자는 소스가 변경될 때 호출될 콜백입니다.
  콜백은 "변경된 값", "이전 값", "사이드 이펙트 클린업 콜백을 등록하기 위한 함수" 이렇게 세 가지 인자를 받습니다.
  클린업 콜백은 다음에 이펙트가 다시 실행되기 직전에 호출되며,
  무효화된 사이드 이펙트를 정리하는 데 사용할 수 있습니다.
  예를들어 비동기 요청의 결과 대기중(pending)에 사용할 수 있습니다.

  여러 소스를 감시할 때, 콜백은 소스 배열에 해당하는 변경된 값 배열, 이전 값 배열 두 개를 수신합니다.

  세 번째 인자는 선택적이며, 다음을 지원하는 옵션 객체입니다:

  - **`immediate`**: 감시자가 생성되는 즉시 콜백이 호출됩니다.
    최초 호출 시, 이전 값은 `undefined`입니다.
  - **`deep`**: 소스가 객체인 경우, 깊은 변경사항에서도 콜백이 실행되도록 합니다.
    참고: [깊은 감시자](/guide/essentials/watchers.html#deep-watchers).
  - **`flush`**: 콜백의 발생(flush) 타이밍을 조정합니다.
    참고: [콜백 실행 타이밍](/guide/essentials/watchers.html#callback-flush-timing).
  - **`onTrack / onTrigger`**: 감시자의 종속성을 디버그합니다.
    참고: [감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging).

  [`watchEffect()`](#watcheffect)와 비교하여 `watch()`를 사용하면 다음을 수행할 수 있습니다:

  - 사이드 이펙트를 게으르게(lazily) 실행합니다.
  - 어떤 상태가 변경면 감시자가 다시 실행될지 더 자세하게 정의할 수 있습니다.
  - 감시하는 상태의 변경 전후 값을 알 수 있습니다.

- **예제**:

  getter를 감시:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  ref를 감시:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  여러 소스를 감시할 때, 콜백은 소스 배열에 해당하는 변경된 값 배열, 이전 값 배열 두 개를 수신합니다:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  getter 소스를 사용할 때, 감시자는 getter의 반환 값이 변경된 경우에만 실행됩니다.
  깊은 변경사항에서도 콜백을 실행하려면, `{ deep: true }`를 사용하여 감시자를 딥 모드로 설정해야 합니다.
  딥 모드에서 콜백이 깊은 변경사항으로 트리거된 경우, 새 값과 이전 값은 동일한 객체입니다.

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  반응형 객체를 직접 감시할 때, 감시자는 자동으로 딥 모드가 됩니다:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* 상태의 깊은 변경사항에도 트리거 됨 */
  })
  ```

  `watch()`는 [`watchEffect()`](#watcheffect)와 동일한 발생(flush) 타이밍 및 디버깅 옵션을 공유합니다:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    }
  })
  ```

- **참고**:

  - [가이드 - 감시자](/guide/essentials/watchers.html)
  - [가이드 - 감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)
