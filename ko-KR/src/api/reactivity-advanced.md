# 반응형 API: 고급

## shallowRef()

[`ref()`](./reactivity-core.html#ref)의 얕은 버전입니다.

- **타입**:

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **세부 사항**:

  `ref()`와 달리 `shallowRef()`의 내부 값은 있는 그대로 저장되고 노출되며 내부 깊숙이까지 반응형으로 동작하지는 않습니다.
  `.value` 접근만 반응형입니다.

  `shallowRef`는 일반적으로 대규모 데이터 구조의 성능 최적화 또는 외부 상태 관리 시스템과의 통합에 사용됩니다.

- **예제**:

  ```js
  const state = shallowRef({ count: 1 })

  // change(변경)을 트리거하지 않음
  state.value.count = 2

  // change를 트리거 함
  state.value = { count: 2 }
  ```

- **참고**:
  - [가이드 - 큰 불변 구조에 대한 반응형 오버헤드 감소](/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)
  - [가이드 - 외부 상태 시스템과의 통합](/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems)

## triggerRef()

[`shallowRef()`](#shallowref)의 강제 트리거 이펙트.
이것은 일반적으로 `shallowRef` 내부 깊숙한 곳의 값을 변경 후, 관련 이펙트를 강제로 트리거 하기위해 사용합니다.

- **타입**:

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **예제**:

  ```js
  const shallow = shallowRef({
    greet: '안녕, Vue!'
  })

  // 첫 실행 시 로그: "안녕, Vue!"
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // ref가 얕기 때문에 이펙트가 트리거되지 않음
  shallow.value.greet = '멋진 Vue!'

  // 강제로 shallow와 관련된 이펙트 트리거
  triggerRef(shallow) // 로그: "멋진 Vue!"
  ```

## customRef()

종속성 추적 및 업데이트 트리거를 명시적으로 제어하기 위한 커스텀 ref를 만듭니다.

- **타입**:

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **세부 사항**:

  `customRef()`는 인자로 펙토리 함수를 받습니다.
  이 함수는 `track`와 `trigger`를 인자로 수신하며,
  `get`과 `set` 메소드가 포함된 객체를 반환해야 합니다.

  일반적으로 `track()`은 `get()` 내부에서 호출되어야 하고,
  `trigger()`는 `set()` 내부에서 호출되어야 하지만,
  호출 조건 및 타이밍은 완전히 커스텀 제어 가능합니다.

- **예제**:

  최신 set 호출 후, 특정 시간 초과 후에만 값을 업데이트하는 디바운스된 ref 생성:

  ```js
  import { customRef } from 'vue'
  
  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  컴포넌트에서 사용법

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eNp9Us1q20AQfpXpXqyALTk9GjtQ6BOU0tNeFHnsKrV2xe7KSRGCHmIwNoEcGlIoKTmklNx6CKV9Jsnv0Fn9RXEge5Hmm5nvm7+UvYljd5kgG7GxDlQYG9BokviIizCKpTKQQqLxLR7LRAQ4fYczyGCmZAQ915t2YPdE97gIpNAGDJ4ZmOwnOr3iap2vrl71+nA4HA4PuBh7lSjJkWEwihe+QbIAxrYGoFfcPMBudVFs7nabv/nmK+Tbf8X21sKhiBNTXF9C8WOV3/4sbs4hv18Xf74Vv77AYfGwht3389J/vcovflMKUUB+eZ9v1/n2blTqeJUQ6aVpVXmWtWCpAMtBJKe4mHBm/ZyBR96x19bL+qya1iDyYxqEFDTP1BLw2qE5G0GJWIwGbm3OPhoT65Hn6Vlgt3CiXanmHv25KhEmjNBFHQ2OlTzVqIiYs36HwyNwiWqgUExRoXqJcy/0Ga+lzbjIqJW9rVIr7SkEiTYy6h4BKdDaucCzMmRGiSaU4tnul/4iwT7QFP3PdBqvaf3VPBZI90KdysRYU9H1KfEo5DhG+cGnPhgVzueoDmBy1Ayyjq0tgDkap2atXpnq0J01QJ1RFtOgWT1SsJfvCDz9YL1PeIIF+up9VaRTF9thrRFqixiaMKrksdLqlbIU1Wh0fXV73WKzelwtRPtpPxmhGcv+AwLzVi0=)

## shallowReactive()

[`reactive()`](./reactivity-core.html#reactive)의 얕은 버전입니다.

- **타입**:

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **세부 사항**:

  `reactive()`와 달리 내부 깊숙한 곳의 변경이 반응형으로 작동하지 않고,
  얕게 루트 수준의 속성 변경에 대해서만 반응형인 객체입니다.
  속성 값은 있는 그대로 저장되고 노출되므로,
  속성이 ref 값인 경우, 자동으로 **언래핑되지 않습니다**.

  :::warning 주의해서 사용
  얕은 데이터 구조는 컴포넌트에서 루트 수준 상태로만 사용해야 합니다.
  내부 깊숙이까지 반응형으로 동작하는 객체 내부에 중첩하는 경우,
  반응형 동작에 일관성이 없는 트리가 생성되어 이해와 디버그가 어려울 수 있으니,
  중첩하여 사용하면 안됩니다.
  :::

- **예제**:

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // 상태의 자체 속성 변경은 방응형으로 동작함
  state.foo++

  // ...하지만 중첩된 객체는 그렇지 않음
  isReactive(state.nested) // false

  // 반응형이 아님
  state.nested.bar++
  ```

## shallowReadonly()

[`readonly()`](./reactivity-core.html#readonly)의 얕은 버전입니다.

- **타입**:

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **세부 사항**:

  `readonly()`와 달리 내부 깊숙이까지 변환하지 않고,
  루트 수준 속성만 읽기 전용으로 만들어집니다.
  속성 값은 있는 그대로 저장되고 노출되므로,
  속성이 ref 값인 경우, 자동으로 **언래핑되지 않습니다**.

  :::warning 주의해서 사용
  얕은 데이터 구조는 컴포넌트에서 루트 수준 상태로만 사용해야 합니다.
  내부 깊숙이까지 반응형으로 동작하는 객체 내부에 중첩하는 경우,
  반응형 동작에 일관성이 없는 트리가 생성되어 이해와 디버그가 어려울 수 있으니,
  중첩하여 사용하면 안됩니다.
  :::

- **예제**:

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // 상태의 자체 속성을 변경하는 것은 실패 됨
  state.foo++

  // ...하지만 중첩된 객체는 그렇지 않음
  isReadonly(state.nested) // false

  // 변경 작업이 됨
  state.nested.bar++
  ```

## toRaw()

Vue에서 만든 프락시의 원시 원본 객체를 반환합니다.

- **타입**:

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **세부 사항**:

  `toRaw()`는 [`reactive()`](./reactivity-core.html#reactive), [`readonly()`](./reactivity-core.html#readonly), [`shallowReactive()`](#shallowreactive), [`shallowReadonly()`](#shallowreadonly)로 생성된 프락시에서 원본 객체를 반환합니다.

  이것은 일시적으로 프락시의 접근/추적 오버헤드를 발생시키는 읽기/쓰기와 관련된 트리거 없이 사용하기 위한 용도입니다.
  원본 객체의 영구 참조를 유지하는 것은 **권장되지 않습니다**.
  주의해서 사용해야 합니다.

- **예제**:

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw()

객체가 프락시로 변환되지 않도록 마크(mark)합니다.
객체 자체를 반환합니다.

- **타입**:

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **예제**:

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // 다른 반응형 객체 내부에 중첩될 때도 작동함
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning 주의해서 사용
  `markRaw()`나 `shallowReactive()` 같이 얕은 API를 사용하면,
  선택적으로 기본적인 내부 깊숙이까지의 "반응형"/"읽기 전용" 변환을 옵트아웃(opt-out)하여,
  상태 그래프(선언/정의/사용하는 곳)에 프락시 되지 않은 원시 객체를 포함할 수 있습니다.
  이것들은 다양한 이유로 사용될 수 있습니다:

  - 일부 값들은 함부로 반응형으로 만들면 안되는데,
    그 예로 복잡한 타사의 클래스 인스턴스나 Vue 컴포넌트 객체가 있습니다.

  - 프락시 변경을 건너뛰면,
    변경해서는 안되는 데이터 소스를 포함하고 있는 커다란 리스트를 렌더링할 때,
    성능이 향상될 수 있습니다.

  원시(raw) 옵트아웃은 루트 레벨에만 있기 때문에 고급으로 간주되므로,
  마크되지 않은 중첩된 원시 객체를 반응형 객체로 설정한 다음 다시 접근을 시도하면,
  프락시 버전의 객체로 접근하게 됩니다.
  이것은 동일한 객체에 참조했다고 예상했으나,
  원시 버전과 프락시 버전을 혼용하여 사용하는 "**잘못된 ID 참조**(identity hazards)"로 이어질 수 있습니다.

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // `foo`는 원시 마크가 있지만, `foo.nested`는 그렇지 않음
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  잘못된 ID 참조 문제는 일반적으로 드뭅니다.
  그러나 이 문제로부터 안전하게 이러한 API를 활용하려면,
  반응형 시스템이 어떻게 작동하는지에 확실한 이해가 필요합니다.
  :::

## effectScope()

범위 내 반응형 이펙트(계산된 속성, 감시자)들을 캡처하고,
일괄적으로 처리하는 effectScope 객체를 반환합니다.

이 API의 자세한 사용 사례 참고: [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)

- **타입**:

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined if scope is inactive
    stop(): void
  }
  ```

- **예제**:

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // 범위 내 여러 이펙트 중지(폐기 됨)
  scope.stop()
  ```

## getCurrentScope()

현재 활성 [effectScope](#effectscope)가 있는 경우, 이를 반환합니다.

- **타입**:

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose()

현재 활성 [effectScope](#effectscope)에 중지(폐기) 콜백을 등록합니다.
연결된 effectScope이 중지되면 콜백이 호출됩니다.

각 Vue 컴포넌트의 `setup()` 함수도 effectScope에서 호출되기 때문에,
비-컴포넌트-결합(non-component-coupled)에서 재사용 가능한 컴포지션 함수인 `onUnmounted`의 대체로 사용할 수 있습니다.

- **타입**:

  ```ts
  function onScopeDispose(fn: () => void): void
  ```

- **예제**:

  ```js
  const scope = effectScope()

  scope.run(() => {
    onScopeDispose(() => {
      console.log('effectScope가 중지됨!')
    })
  })

  scope.stop() // 로그: 'effectScope가 중지됨!'
  ```
