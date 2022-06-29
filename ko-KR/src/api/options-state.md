# 옵션: 상태

## data

컴포넌트 인스턴스의 초기 반응형 상태를 반환하는 함수입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **세부 사항**:

  이 함수는 Vue에 의해 반응형으로 만들어진 일반 JavaScript 객체를 반환합니다.
  인스턴스가 생성된 후, 반응형 데이터 객체는 `this.$data`로 접근할 수 있습니다.
  컴포넌트 인스턴스는 데이터 객체에서 찾은 모든 속성을 프록시하므로 `this.$data.a`는 `this.a`와 동일합니다.

  모든 최상위 데이터 속성은 반환된 데이터 객체에 포함되어야 합니다.
  `this.$data`에 새 속성을 추가하는 것이 가능하지만 **권장되지는 않습니다**.
  원하는 속성 값을 아직 사용할 수 없는 경우,
  `undefined` 또는 `null`과 같은 빈 값을 사용하여 Vue가 속성이 존재함을 알 수 있도록 해야 합니다.

  `_` 또는 `$`로 시작하는 속성은 Vue의 내부 속성 및 API 메서드와 충돌할 수 있으므로,
  컴포넌트 인스턴스에서 **프록시되지 않습니다**.
  이런 경우에는 `this.$data._property`와 같은 방법으로 접근해야 합니다.

  브라우저 API 객체나 프로토타입 속성과 같은 고유한 상태를 저장한 객체를 반환하는 것은 **권장하지 않습니다**.
  이상적으로 반환된 객체는 컴포넌트의 상태만 나타내는 일반 객체여야 합니다.

- **예제**:

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  `data` 속성에 화살표 함수를 사용하는 경우,
  `this`는 컴포넌트의 인스턴스가 아니지만 함수의 첫 번째 인자로 인스턴스에 접근할 수 있습니다:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **참고**: [반응형 심화](/guide/extras/reactivity-in-depth.html)

## props

컴포넌트의 props를 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**:

  Vue에서 모든 컴포넌트 props는 명시적으로 선언되어야 합니다.
  컴포넌트 props는 두 가지 방식으로 선언할 수 있습니다:

  - 문자열 배열을 이용한 간단한 형태
  - "키: prop의 이름", "값: 타입(생성자 함수) 또는 고급 옵션"을 속성으로 하는 객체를 이용한 완전한 형태

  객체 기반 문법을 사용하면, 각 prop은 다음 옵션을 추가로 정의할 수 있습니다:

  - **`type`**: 다음 네이티브 생성자 중 하나일 수 있습니다:
    `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, "모든 커스텀 생성자 함수" 또는 이것들로 이루어진 배열.
    개발 모드에서 Vue는 prop의 값이 선언된 타입과 일치하는지 확인하고, 일치하지 않으면 경고를 표시합니다.
    자세한 내용은 [Prop 유효성 검사](/guide/components/props.html#prop-validation) 참고.

    `Boolean` 타입은 개발 및 프로덕션에서 값을 캐스팅 하는 동작에 영향을 줍니다.
    자세한 내용은 [불리언 캐스팅](/guide/components/props.html#boolean-casting) 참고.

  - **`default`**: 부모로부터 전달받지 않거나 `undefined` 값인 경우, prop에 지정할 기본값 입니다.
    기본값이 객체 또는 배열일 경우, 팩토리 함수를 사용하여 반환돼야 합니다.
    팩토리 함수는 "rawProps(상위 컴포넌트에게 받은 props 전체 객체)"를 인자로 받습니다.

  - **`required`**: prop이 필수인지 정의합니다.
    비프로덕션 환경에서 이 값이 `true`이고 prop이 전달되지 않으면 콘솔 경고가 발생합니다.

  - **`validator`**: prop 값을 유일한 인자로 사용하는 커스텀 유효성 검사 함수입니다.
    개발 모드에서 이 함수가 거짓 값을 반환하면(유효성 검사가 실패하면) 콘솔 경고가 발생합니다.

- **예제**:

  간단하게 선언하기:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  유효성 검사가 포함된 객체로 선언:

  ```js
  export default {
    props: {
      // 타입 체크
      height: Number,
      // 타입 체크 및 유효성 검사
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **참고**: [Props](/guide/components/props.html)

## computed

컴포넌트 인스턴스에 노출될 계산된 속성을 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **세부 사항**:

  이 옵션은 "키: 계산된 속성의 이름", "값: 계산된 `getter` 또는 `get`과 `set`(쓰기 가능한 계산된 속성의 경우) 메서드가 있는 객체"로 이루어진 객체입니다.

  모든 `getter`와 `setter`에는 컴포넌트 인스턴스에 자동으로 바인딩된 `this` 컨텍스트가 있습니다.

  화살표 함수를 사용한 계산된 속성의 경우,
  `this`는 컴포넌트의 인스턴스를 가리키지 않지만,
  여전히 함수의 첫 번째 인자로 인스턴스에 접근할 수 있습니다.

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **예제**:

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // 읽기전용
      aDouble() {
        return this.a * 2
      },
      // 쓰기가능
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **참고**: [계산된 속성](/guide/essentials/computed.html)

## methods

컴포넌트 인스턴스에서 사용할 메서드를 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **세부 사항**:

  선언된 메서드는 컴포넌트 인스턴스에서 직접 접근하거나,
  템플릿 표현식에서 사용할 수 있습니다.
  모든 메서드에는 해당 컴포넌트 인스턴스에 자동으로 바인딩된 `this` 컨텍스트가 있으며,
  주위 컴포넌트로 전달된 경우에도 유지됩니다.

  메서드를 선언할 때 화살표 함수를 사용하지 않도록 해야 하는데,
  `this`를 통해 컴포넌트 인스턴스에 접근할 수 없기 때문입니다.

- **예제**:

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

- **참고**: [이벤트 핸들링](/guide/essentials/event-handling.html)

## watch

데이터 변경 시 호출될 감시 콜백을 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // 기본 값: false
    deep?: boolean // 기본 값: false
    flush?: 'pre' | 'post' | 'sync' // 기본 값: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**:

  `watch` 옵션은 키가 감시할 반응형 컴포넌트 인스턴스 속성(예: `data` 또는 `computed`를 통해 선언된 속성)이고,
  값이 해당 콜백으로 이루어진 객체입니다.
  콜백은 감시되는 소스의 새 값과 이전 값을 인자로 수신합니다.

  루트 수준 속성이 아닌 경우,
  키는 `a.b.c`와 같이 점으로 구분된 경로가 될 수도 있습니다.
  이 사용법은 복잡한 표현식을 **지원하지 않으며**,
  점으로 구분된 경로만 지원됩니다.
  복잡한 데이터 소스를 관찰해야 하는 경우,
  명령형 [`$watch()`](/api/component-instance.html#watch) API를 사용해야 합니다.

  값은 메소드 이름에 해당하는 문자열(`methods`를 통해 선언됨) 또는 추가적인 옵션을 포함하는 객체일 수도 있습니다.
  객체 문법을 사용할 경우,
  `handler` 필드에 콜백을 선언해야 합니다.
  추가 옵션은 다음과 같습니다:

  - **`immediate`**: 감시자 생성 시 즉시 콜백 트리거.
    첫 호출 시 이전 값은 `undefined`.
  - **`deep`**: 객체 또는 배열인 경우 내부 깊숙한 곳에서 변경 사항 발생 시에도 콜백이 실행되도록 합니다.
    참고: [깊은 감시자](/guide/essentials/watchers.html#deep-watchers).
  - **`flush`**: 콜백 실행 타이밍을 조정합니다.
    참고: [콜백 실행 타이밍](/guide/essentials/watchers.html#callback-flush-timing).
  - **`onTrack / onTrigger`**: 감시자의 종속성을 디버그합니다.
    참고: [감시자 디버깅](/guide/extras/reactivity-in-depth.html#watcher-debugging).

  감시 콜백을 선언할 때 화살표 함수를 사용해선 안 되는데,
  `this`로 컴포넌트 인스턴스에 접근할 수 없기 때문입니다.

- **예제**:

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // 루트 레벨 속성 감시
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // 메서드 이름 문자열
      b: 'someMethod',
      // 중첩 깊이에 관계없이 감시하는 객체 속성이 변경될 때마다 콜백을 호출
      c: {
        handler(val, oldVal) {
          console.log('c 변경됨')
        },
        deep: true
      },
      // 중첩 속성 감시:
      'c.d': function (val, oldVal) {
        /* ... */
      },
      // 콜백은 감시 시작 직후에도 호출됨
      e: {
        handler(val, oldVal) {
          console.log('e 변경됨')
        },
        immediate: true
      },
      // 콜백 배열을 전달할 수 있으며 하나씩 호출됨
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 실행됨!')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 실행됨!')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b 변경됨')
      },
      handle1() {
        console.log('handle1 실행됨!')
      }
    },
    created() {
      this.a = 3 // => 현재 값: 3, 이전 값: 1
    }
  }
  ```

- **참고**: [감시자](/guide/essentials/watchers.html)

## emits

컴포넌트에서 내보낼 커스텀 이벤트를 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **세부 사항**:

  내보낼 이벤트는 두 가지 타입으로 선언할 수 있습니다:

  - 문자열 배열을 이용한 간단한 형태
  - "키: prop의 이름", "값: `null` 또는 유효성 검사 함수"를 속성으로 하는 객체를 이용한 완전한 형태

  유효성 검사 함수는 컴포넌트의 `$emit` 호출에 전달된 인자를 수신합니다.
  예를 들어 `this.$emit('foo', 1)`이 호출되면,
  `foo`에 해당하는 유효성 검사기는 인자 `1`을 받습니다.
  유효성 검사 함수는 이벤트 인자의 유효성을 불리언으로 반환해야 합니다.

  `emits` 옵션은 기본 DOM 이벤트 리스너가 아닌 컴포넌트 이벤트 리스너로 간주되는 이벤트 리스너에 영향을 미칩니다.
  `emits`에 선언된 이벤트의 리스너는 컴포넌트의 `$attrs` 객체에서 제거되므로,
  컴포넌트의 루트 엘리먼트로 전달되지 않습니다.
  자세한 내용은 [폴스루 속성](/guide/components/attrs.html) 참고.

- **예제**:

  배열 문법:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  객체 문법:

  ```js
  export default {
    emits: {
      // 유효성 검사 없음
      click: null,

      // 유효성 검사 사용
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`잘못된 정보 제출 이벤트!`)
          return false
        }
      }
    }
  }
  ```

- **참고:** [폴스루 속성](/guide/components/attrs.html)

## expose

부모 컴포넌트 인스턴스에서 템플릿 참조로 접근할 때,
노출될 공용 속성을 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **세부 사항**:

  기본적으로 컴포넌트 인스턴스는 `$parent`, `$root` 또는 템플릿 참조(`$refs`)를 통해 접근할 때,
  모든 인스턴스 속성을 부모에게 노출합니다.
  자식 컴포넌트에는 긴밀한 결합을 피하기 위해 비공개로 유지되어야 하는 상태 또는 메서드가 있을 가능성이 높기 때문에 ,
  이것은 바람직하지 않을 수 있습니다.

  `expose` 옵션은 속성의 이름 문자열로 이루어진 배열입니다.
  `expose`를 사용하면 명시적으로 나열된 속성만 컴포넌트의 공개 인스턴스에 노출됩니다.

  `expose`는 커스텀 속성에만 영향을 미치며,
  빌트인 컴포넌트 인스턴스 속성은 걸러내지 않습니다.

- **예제**:

  ```js
  export default {
    // 공개 인스턴스에서는 `publicMethod`만 접근 가능
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
