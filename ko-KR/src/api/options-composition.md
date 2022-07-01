# 옵션: 컴포지션 {#options-composition}

## provide

하위 컴포넌트에 주입(Inject)할 수 있도록 값을 제공(Provide)합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **세부 사항**:

  부모 컴포넌트가 값을 제공하면,
  컴포넌트 계층 구조의 깊이와 관계없이 모든 자식 컴포넌트에서 선택적으로 종속성을 주입받을 수 있도록,
  `provide`와 [`inject`](#inject)는 함께 사용됩니다.

  `provide` 옵션은 객체이거나 객체를 반환하는 함수여야 합니다.
  이 객체는 자식 컴포넌트에 주입할 수 있는 속성으로 구성되며,
  심볼(Symbol)을 키로 사용할 수 있습니다.

- **예제**:

  기본 사용법:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  함수 사용법:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    },
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  위 예제에서 제공된 `msg`는 반응형이 아닙니다.
  자세한 내용은 [반응형으로 만들기](/guide/components/provide-inject.html#working-with-reactivity)를 참고하십시오.

- **참고**: [Provide / Inject](/guide/components/provide-inject.html)

## inject

상위 컴포넌트 또는 [`app.provide()`](/api/application.html#app-provide)를 통해 앱에서 제공(Provide)된 값 중,
주입(Inject)할 속성을 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **세부 사항**:

  `inject` 옵션은 다음 중 하나입니다:

  - 문자열로 이루어진 배열
  - 객체의 키는 인스턴스에 바인딩 될 이름이고, 값은 다음 중 하나입니다:
    - 문자열 또는 심볼로 되어있는 주입 가능한 속성의 키.
    - 다음 속성 중 하나 이상으로 이루어진 객체:
      - `from`: 문자열 또는 심볼로 되어있는 주입 가능한 속성의 키.
      - `default`: 대체 값으로 사용되며, props의 `default`와 유사.
        대체될 값이 객체 타입일 경우,
        컴포넌트의 여러 인스턴스 간 값의 참조가 공유되는 것을 피하기 위해 팩토리 함수를 사용해야 함.

  일치하는 속성이나 기본값이 제공되지 않는 경우, 주입된 속성의 값은 `undefined`입니다.

  주입되어 바인딩된 값은 반응형이 아니며,
  이것은 의도적입니다.
  그러나 주입된 값이 반응형 객체인 경우,
  해당 객체의 속성은 반응형으로 유지됩니다.
  자세한 내용은 [반응형으로 만들기](/guide/components/provide-inject.html#working-with-reactivity)를 참고하십시오.

- **예제**:

  기본 사용법:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  주입된 값을 prop의 기본값으로 사용:

  ```js
  export default {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  주입된 값을 데이터 입력값으로 사용:

  ```js
  export default {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  주입될 값에 기본값을 설정한 옵션을 제공:

  ```js
  export default {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  주입할 속성의 이름을 다르게 해야 할 경우,
  `from`을 사용하여 주입할 속성 표기:

  ```js
  export default {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  팩토리 함수를 사용한 객체 타입의 기본값 지정:

  ```js
  export default {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **참고**: [Provide / Inject](/guide/components/provide-inject.html)

## mixins

현재 컴포넌트에 혼합할 옵션 객체의 배열입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **세부 사항**:

  `mixins` 옵션은 믹스인 객체로 이루어진 배열입니다.
  믹스인 객체는 일반 인스턴스 객체와 같은 옵션을 포함할 수 있으며,
  특정 옵션 병합 로직을 사용하여 병합된 최종 옵션이 인스턴스에서 사용됩니다.
  예를 들어 믹스인에 `created` 훅이 있고, 컴포넌트에도 훅이 있으면,
  두 함수가 모두 호출됩니다.

  믹스인 훅은 제공된 순서대로 호출되며, 컴포넌트 자체 훅보다 먼저 호출됩니다.

  :::warning 더 이상 권장되지 않음
  Vue 2에서 믹스인은 컴포넌트 로직의 재사용 가능한 청크를 생성하기 위한 기본 메커니즘이었습니다.
  Vue 3에서 믹스인은 계속 지원되지만,
  컴포넌트 간 코드 재사용을 위한 접근 방식으로 [컴포지션 API](/guide/reusability/composables.html)가 추천됩니다.
  :::

- **예제**:

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  export default {
    createApp({
      created() {
        console.log(2)
      },
      mixins: [mixin]
    })
  }

  // => 1
  // => 2
  ```

## extends

현재 컴포넌트를 확장(extend)할 "클래스 기반" 컴포넌트입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **세부 사항**:

  B 컴포넌트 확장에 A 컴포넌트를 사용하면, A 컴포넌트의 옵션을 상속받을 수 있습니다.

  From an implementation perspective, `extends` is almost identical to `mixins`. The component specified by `extends` will be treated as though it were the first mixin.

  However, `extends` and `mixins` express different intents. The `mixins` option is primarily used to compose chunks of functionality, whereas `extends` is primarily concerned with inheritance.

  As with `mixins`, any options will be merged using the relevant merge strategy.

  구현의 관점에서 `extens`는 `mixins`와 거의 동일합니다.
  `extens`로 지정된 컴포넌트는 첫 번째 믹스인인 것처럼 처리됩니다.

  그러나 `extens`와 `mixins`는 구현된 목적이 다릅니다.
  주로 `mixins` 옵션은 기능 묶음을 구성하는데 사용되지만,
  `extens`는 상속과 관련됩니다.

  `mixins`와 마찬가지로 `extends`의 모든 옵션은 관련 병합 로직을 사용하여 병합됩니다.

- **예제**:

  ```js
  // CompB.vue 파일에서

  import CompA from './CompA.vue'

  export default {
    // CompB 컴포넌트는 CompA에 정의된,
    // 옵션 속성들을 상속받음
    extends: CompA,
    ...
  }
  ```
