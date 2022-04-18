:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Reactivity API: Core
# 반응형 API: 핵심

:::info See also
To better understand the Reactivity APIs, it is recommended to read the following chapters in the guide:

- [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html) (with the API preference set to Composition API)
- [Reactivity in Depth](/guide/extras/reactivity-in-depth.html)
  :::

:::info 참조 
반응형 API에 대해 더 나은 이해를 얻고 싶다면 다음 가이드 문서를 읽는 것을 추천 합니다. 

- [반응형 기초](/guide/essentials/reactivity-fundamentals.html) (API 스타일 지정을 컴포지션 API로 지정하고 읽으세요)
- [반응형 고급](/guide/extras/reactivity-in-depth.html)
  :::

## ref()

Takes an inner value and returns a reactive and mutable ref object, which has a single property `.value` that points to the inner value.

내부 값을 취하고 내부 값을 가리키는 단일 속성 '.value'를 갖는 반응성 및 변경 가능한 ref 객체를 반환합니다.

- **Type**
- **타입**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Details**
- **상세**

  The ref object is mutable - i.e. you can assign new values to `.value`. It is also reactive - i.e. any read operations to `.value` is tracked, and write operations will trigger associated effects.

  ref 객체는 변경 가능한 객체입니다. 즉, `.value`에 새 값으로 할당할 수 있습니다. 또한 반응형입니다. 즉, `.value`에 대한 모든 읽기 작업이 추적되고,  쓰기 작업이 관련 부가 효과를 트리거합니다.

  If an object is assigned as a ref's value, the object is made deeply reactive with [reactive()](#reactive). This also means if the object contains nested refs, they will be deeply unwrapped.

  객체가 ref의 값(`.value`)으로 할당되면 객체는 [reactive()](#reactive)로 깊은(Deep) 반응형 객체가 됩니다.  이것은 객체에 중첩된 ref가 포함되어 있으면 깊이(deep) 래핑되지 않음을 의미합니다.

  To avoid the deep conversion, use [`shallowRef()`](./reactivity-advanced.html#shallowref) instead.

  깊게 변환되는것을 방지하고 싶다면 [`shallowRef()`](./reactivity-advanced.html#shallowref) 를 사용하세요. 


- **Example**
- **예제**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value++
  console.log(count.value) // 1
  ```

- **See also:**
- **참조:**
  - [Guide - Reactive Variables with `ref()`](/guide/essentials/reactivity-fundamentals.html#reactive-variables-with-ref)
  - [가이드 -  `ref()` 를 이용한 반응형 변수](/guide/essentials/reactivity-fundamentals.html#reactive-variables-with-ref)
  - [Guide - Typing `ref()`](/guide/typescript/composition-api.html#typing-ref)
  - [가이드 - `ref()`에 타입 지정하기](/guide/typescript/composition-api.html#typing-ref)

## computed()

Takes a getter function and returns a readonly reactive [ref](#ref) object for the returned value from the getter. It can also take an object with `get` and `set` functions to create a writable ref object.

getter 함수를 사용하고 getter에서 반환된 값에 대한 읽기 전용 반응 [ref](#ref) 개체를 반환합니다. 쓰기 가능한 ref 객체를 생성하기 위해 `get` 및 `set` 함수가 있는 객체를 사용할 수도 있습니다.

- **Type**
- **타입**

  ```ts
  // read-only
  // 읽기 전용
  function computed<T>(
    getter: () => T,
    // see "Computed Debugging" link below
    // "Computed Debugging" 링크를 참조 하세요
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // writable
  // 쓰기 가능
  function computed<T>(
    options: {
      get: () => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Example**
- **예제**

  Creating a readonly computed ref:
  
  읽기 전용 computed ref 만들기:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // error
  ```

  Creating a writable computed ref:

  쓰기 가능한 computed ref 만들기:

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

  Debugging:

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

- **See also:**
- **참조:**
  - [Guide - Computed Properties](/guide/essentials/computed.html)
  - [가이드 - 계산된 속성](/guide/essentials/computed.html)
  - [Guide - Computed Debugging](/guide/extras/reactivity-in-depth.html#computed-debugging)
  - [Guide - Computed 디버깅](/guide/extras/reactivity-in-depth.html#computed-debugging)
  - [Guide - Typing `computed()`](/guide/typescript/composition-api.html#typing-computed)
  - [Guide - `computed()`에 타입 지정하기](/guide/typescript/composition-api.html#typing-computed)

## reactive()

Returns a reactive proxy of the object.

객체의 반응형 프록시를 반환합니다. 

- **Type**
- **타입**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Details**
- **상세**  

  The reactive conversion is "deep": it affects all nested properties. A reactive object also deeply unwraps any properties that are [refs](#ref) while maintaining reactivity.

  반응형 변환은 "깊게(Deep)" 수행됩니다. 모든 중첩 속성에 영향을 줍니다. 반응성 객체는 반응성을 유지하면서 [refs](#ref)인 모든 속성을 깊이 해제합니다.


  It should also be noted that there is no ref unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`.

  또한 ref가 'Map'과 같은 기본 컬렉션 유형 또는 반응형 배열의 요소로 액세스될 때 수행되는 ref 래핑 해제가 없다는 점에 유의해야 합니다.

  To avoid the deep conversion and only retain reactivity at the root level, use [shallowReactive()](./reactivity-advanced.html#shallowreactive) instead.

  깊은 변환을 피하고 루트 수준에서만 반응성을 유지하려면 대신 [shallowReactive()](./reactivity-advanced.html#shallowreactive)를 사용하세요.



  The returned object and its nested objects are wrapped with [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and **not** equal to the original objects. It is recommended to work exclusively with the reactive proxy and avoid relying on the original object.

  반환된 객체와 중첩된 객체는 [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)로 래핑되며 원래 개체왜  **같지 않습니다** . 반응 프록시로만 작업하고 원본 개체에 의존하지 않는 것이 좋습니다.

- **Example**
- **예제**

  Creating a reactive object:

  반응형 객체 생성: 

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Ref unwrapping:

  Ref 언래핑: 

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref will be unwrapped
  // ref 가 언래핑 됩니다 
  console.log(obj.count === count.value) // true

  // it will update `obj.count`
  // `obj.count`가 업데이트 됩니다 
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // it will also update `count` ref
  // `count` ref 도 업데이트 됩니다 
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  Note that refs are **not** unwrapped when accessed as array or collection elements:

  ref는 배열 또는 컬렉션 요소로 액세스할 때 업래핑되지 **않습니다**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // need .value here
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // need .value here
  console.log(map.get('count').value)
  ```

  When assigning a [ref](#ref) to a `reactive` property, that ref will also be automatically unwrapped:

  'reactive' 속성에 [ref](#ref)를 할당하면 해당 ref도 자동으로 래핑 해제됩니다.

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **See also:**
- **참조:**
  - [Guide - Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html)
  - [가이드 - 반은형 기초](/guide/essentials/reactivity-fundamentals.html)
  - [Guide - Typing `reactive()`](/guide/typescript/composition-api.html#typing-reactive)
  - [가이드 - `reactive()`에 타입 적용하기](/guide/typescript/composition-api.html#typing-reactive)

## readonly()

Takes an object (reactive or plain) or a [ref](#ref) and returns a readonly proxy to the original.

객체(반응형 또는 일반) 또는 [ref](#ref)를 가져와서 원본에 대한 읽기 전용 프록시를 반환합니다.

- **Type**
- **타입**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Details**
- **상세**

  A readonly proxy is deep: any nested property accessed will be readonly as well. It also has the same ref-unwrapping behavior as `reactive()`, except the unwrapped values will also be made readonly.
  
  읽기 전용 프록시는 깊습니다(Deep). 액세스되는 모든 중첩 속성도 읽기 전용입니다. 또한 래핑되지 않은 값도 읽기 전용이 된다는 점을 제외하면 `reactive()`와 동일한 ref-unwrapping 동작을 갖습니다.

  To avoid the deep conversion, use [shallowReadonly()](./reactivity-advanced.html#shallowreadonly) instead.

  깊은 변환을 방지하고 싶다면 [shallowReadonly()](./reactivity-advanced.html#shallowreadonly)를 사용하세요. 

- **Example**
- **예제**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // works for reactivity tracking
    // 반응형 추적을 위해
    console.log(copy.count)
  })

  // mutating original will trigger watchers relying on the copy
  // 원본을 변경하면 이에 의존하는 복제본에 대한 watcher도 트리거 됩니다 
  original.count++

  // mutating the copy will fail and result in a warning
  // 복제본을 변경해도 변경되지 않으며 경고를 받게 됩니다 
  copy.count++ // warning!
  ```

## watchEffect()

Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.

종속성을 반응적으로 추적하면서 즉시 함수를 실행하고 종속성이 변경될 때마다 다시 실행합니다.

- **Type**
- **타입**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): StopHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Details**
- **상세**

  The first argument is the effect function to be run. The effect function receives a function that can be used to register a cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request (see example below).

  첫 번째 인자는 실행할 효과(effect) 함수입니다. watcher 가 트리거 되어 효과(effect) 함수가 실행 될 때 인자를 하나 받을수 있는데, watcher가 정리(Cleanup)작업을 할때 이를 콜백 받을 함수를 등록하기 위한 등록용 함수 입니다. 정리(cleanup) 콜백은 다음에 효과(effect)가 다시 실행되기 직전에 호출되며, watch 중인 값이 변경되어서 무효화된 부작용(side-effect)을 정리하는 데 사용할 수 있습니다. 예) 비동기 요청 보류(Pending)(아래 예 참조).

  The second argument is an optional options object that can be used to adjust the effect's flush timing or to debug the effect's dependencies.

  두 번째 인수는 효과의 플러시 타이밍을 조정하거나 효과의 종속성을 디버그하는 데 사용할 수 있는 선택적 옵션 개체입니다

  The return value is a handle function that can be called to stop the effect from running again.

  반환 값은 효과가 다시 실행되지 않도록 하기 위해 호출할 수 있는 핸들 함수입니다.

- **Example**
- **예제**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> logs 0

  count.value++
  // -> logs 1
  ```

  Side effect cleanup:
  
  부작용 정리:


  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` will be called if `id` changes
    // so that previous pending request will be cancelled
    // if not yet completed

    // `id`가 변경되면 `cancel`이 호출됩니다. 
    // 그래서 이전에 발송대기중인 비동기 요청이 아직 완료되지 않았다면 취소할수 있습니다. 
    onCleanup(cancel)
    data.value = await response
  })
  ```

  Stopping the watcher:

  watcher를 종료합니다:

  ```js
  const stop = watchEffect(() => {})

  // watcher가 더이상 필요하지 않을때
  stop()
  ```

  Options:

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

- **See also**:
- **참조**:
  - [가이드 - Watchers](/guide/essentials/watchers.html#watcheffect)
  - [가이드 - Watcher 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)

## watchPostEffect()

Alias of [`watchEffect()`](#watcheffect) with `flush: 'post'` option.

`flush: 'post'` 옵션이 있는 [`watchEffect()`](#watcheffect)의 별칭.

## watchSyncEffect()

Alias of [`watchEffect()`](#watcheffect) with `flush: 'sync'` option.

`flush: 'sync'` 옵션이 있는 [`watchEffect()`](#watcheffect)의 별칭.


## watch()

Watches one or more reactive data sources and invokes a callback function when the sources change.

하나 이상의 반응형 데이터 소스를 감시하고 소스가 변경되면 콜백 함수를 호출합니다.


- **Type**
- **타입**

  ```ts
  // 단일 소스를 감시합니다. 
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): StopHandle

  // 다중 소스를 감시합니다. 
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
    : never // reactive object

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > Types are simplified for readability.
  > 읽기 쉽게 하기 위해 타입을 간략화 했습니다. 

- **Details**
- **상세**

  `watch()` is lazy by default - i.e. the callback is only called when the watched source has changed.

  `watch()`는 기본적으로 지연됩니다. 즉, 콜백은 감시된 소스가 변경되었을 때만 호출됩니다.

  The first argument is the watcher's **source**. The source can be one of the following:
  
  첫 번째 인자는 감시자의 **소스**입니다. 소스는 다음 중 하나일 수 있습니다.

  - A getter function that returns a value
  - 값을 반환하는 getter 함수
  - A ref
  - ref 객체
  - A reactive object
  - reactive 객체 
  - ...or an array of the above.
  - 또는 위에 나온 것들의 배열

  The second argument is the callback that will be called when the source changes. The callback receives three arguments: the new value, the old value, and a function for registering a side effect cleanup callback. The cleanup callback will be called right before the next time the effect is re-run, and can be used to clean up invalidated side effects, e.g. a pending async request.

  두 번째 인자는 소스가 변경될 때 호출될 콜백입니다. 콜백은 새 값, 이전 값 및 부작용 정리 콜백을 등록하기 위한 함수의 세 가지 인수를 받습니다. 정리 콜백은 다음에 효과가 다시 실행되기 직전에 호출되며 무효화된 부작용을 정리하는 데 사용할 수 있습니다. 예) 비동기 요청 보류하기

  When watching multiple sources, the callback receives two arrays containing new / old values corresponding to the source array.

  다중 소스를 여러 소스를 감시한다면, 콜백은 소스 배열에 해당하는 새/기존 값을 포함하는 두 개의 배열을 인자로 받게 됩니다.

  The third optional argument is an options object that supports the following options:

  세 번째 선택적 인수는 다음 옵션을 지원하는 옵션 개체입니다.

  - **`immediate`**: trigger the callback immediately on watcher creation. Old value will be `undefined` on the first call.
  - **`immediate`**: watcher가 생성되는 즉시 콜백을 트리거합니다. 이전 값은 첫 번째 호출에서 '정의되지 않음'입니다.
  - **`deep`**: force deep traversal of the source if it is an object, so that the callback fires on deep mutations. See [Deep Watchers](/guide/essentials/watchers.html#deep-watchers).
  - **`deep`**: 소스가 객체인 경우 소스의 깊은 순회를 강제 실행하여 콜백이 깊게 중첩된 곳에서 변경이 발생해도 실행되도록 합니다. [Deep Watchers](/guide/essentials/watchers.html#deep-watchers)를 참조하세요.
  - **`flush`**: adjust the callback's flush timing. See [Callback Flush Timing](/guide/essentials/watchers.html#callback-flush-timing).
  - **`flush`**: 콜백의 플러시 타이밍을 조정합니다. [콜백 플러시 타이밍](/guide/essentials/watchers.html#callback-flush-timing)을 참조하세요.
  - **`onTrack / onTrigger`**: debug the watcher's dependencies. See [Watcher Debugging](/guide/extras/reactivity-in-depth.html#watcher-debugging).
  - **`onTrack / onTrigger`**: 감시자의 의존성을 디버그합니다. [감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)을 참조하세요.

  Compared to [`watchEffect()`](#watcheffect), `watch()` allows us to:

  [`watchEffect()`](#watcheffect)와 비교하여 `watch()`를 사용하면 다음을 수행할 수 있습니다:

  - Perform the side effect lazily;
  - 부작용을 lazy 하게 실행 할수 있습니다. 
  - Be more specific about what state should trigger the watcher to re-run;
  - 어떤 상태가 변경되어야 watcher가 다시 실행될지 더 자세히 지정할수 있습니다
  - Access both the previous and current value of the watched state.
  - 감시하는 상태의 변경전 값과 변경된 값을 알수 있습니다. 

- **Example**
- **예제**

  Watching a getter:
  
  getter 함수 감시하기:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Watching a ref:

  ref 감시하기: 

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  When watching multiple sources, the callback receives arrays containing new / old values corresponding to the source array:
  다중 소스를 볼 때 콜백은 소스 배열에 해당하는 새/기존 값이 포함된 배열을 수신:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  When using a getter source, the watcher only fires if the getter's return value has changed. If you want the callback to fire even on deep mutations, you need to explicitly force the watcher into deep mode with `{ deep: true }`. Note in deep mode, the new value and the old will be the same object if the callback was triggered by a deep mutation:

  getter 소스를 사용할 때 watcher는 getter의 반환 값이 변경된 경우에만 실행됩니다. 중첩된 깊은 변경에서도 콜백을 실행하려면 `{ deep: true }`를 사용하여 watcher를 딥 모드로 명시적으로 강제해야 합니다. 딥 모드에서 콜백이 딥 뮤테이션에 의해 트리거된 경우 새 값과 이전 값은 동일한 객체가 됩니다:


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

  When directly watching a reactive object, the watcher is automatically in deep mode:
  
  reactive 객체를 직접 관찰할 때 watcher는 자동으로 딥 모드가 됩니다:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* triggers on deep mutation to state */
  })
  ```

  `watch()` shares the same flush timing and debugging options with [`watchEffect()`](#watcheffect):


  `watch()`는 [`watchEffect()`](#watcheffect)와 동일한 플러시 타이밍 및 디버깅 옵션을 공유합니다:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    }
  })
  ```

- **See also**:
- **참조**

  - [Guide - Watchers](/guide/essentials/watchers.html)
  - [가이드 -  Watchers](/guide/essentials/watchers.html)
  - [Guide - Watcher Debugging](/guide/extras/reactivity-in-depth.html#watcher-debugging)
  - [가이드 - Watcher 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging)
