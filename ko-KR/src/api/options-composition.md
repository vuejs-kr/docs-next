# Options: Composition

## provide

하위 컴포넌트에 주입할 수 있는 값을 제공합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **세부 사항**:

  `provide` 와 [`inject`](#inject) 는 동일한 상위 체인에 있는 컴포넌트 계층 구조의 깊이에 관계없이 모든 하위 컴포넌트에 대한 의존성 주입기 역할을 할 수 있도록 사용됩니다.

  `provide` 옵션은 객체 또는 객체를 반환하는 함수여야 합니다. 이 객체에는 하위 컴포넌트에 주입할 수 있는 속성이 포함되어 있습니다. 이 객체에는 Symbol을 키값으로 사용할 수 있습니다.

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

  함수를 사용하여 컴포넌트별 상태 제공:

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

  위 예시에서 제공된 `msg` 반응형(reactive)이 아닙니다. 자세한 내용은 [Working with Reactivity](/guide/components/provide-inject.html#working-with-reactivity)을 참조하십시오.

- **참고**: [Provide / Inject](/guide/components/provide-inject.html)

## inject

조상 제공자(Provider)로부터 속성을 찾아 현재 컴포넌트에 주입할 속성을 선언합니다.

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

  `inject` 옵션은 다음 중 하나여야 합니다:

    - 문자열 배열 또는
    - 객체의 키가 로컬 바인딩 이름이고 값이 다음 중 하나여야 합니다:
        - 사용 가능한 주입에서 검색할 키(문자열 또는 심볼) 또는
        - 객체:
            - `from` 속성은 사용 가능한 주입에서 검색할 키(문자열 또는 심볼)이며,
            - `default` 속성은 대체 값으로 사용됩니다. props 기본값과 유사하게 여러 컴포넌트 인스턴스 간의 값 공유를 피하기 위해 객체 유형에 팩토리 함수가 필요합니다.

  일치하는 속성이나 기본값이 제공되지 않은 경우 주입된 속성은 `undefined`가 됩니다.

  주입된 바인딩은 반응형(reactive)이 아닙니다. 이것은 의도적입니다. 그러나 주입된 값이 반응형 객체인 경우 해당 객체의 속성은 반응형으로 유지됩니다. 자세한 내용은 [Working with Reactivity](/guide/components/provide-inject.html#working-with-reactivity)을 참조하세요.

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

  prop의 기본값으로 주입된 값 사용하기:

  ```js
  const Child = {
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

  주입된 값을 데이터 입력으로 사용:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```
  
  주입은 기본값 설정 옵션을 제공합니다:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  다른 이름의 속성에서 주입해야 하는 경우 `from`을 사용하여 소스 속성을 나타냅니다:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  prop 기본값과 유사하게 레퍼런스 값에 대해 팩토리 함수를 사용해야 합니다:

  ```js
  const Child = {
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

  `mixins` 옵션은 mixin 객체의 배열을 허용합니다. 이러한 믹스인 객체는 일반 인스턴스 객체와 같은 인스턴스 옵션을 포함할 수 있으며 특정 옵션 병합 논리를 사용하여 최종 옵션에 대해 병합됩니다. 예를 들어 믹스인에 `created` 훅이 있고 컴포넌트 자체에도 훅이 있는 경우 두 함수가 모두 호출됩니다.

  믹스인 훅은 제공된 순서대로 호출되며 컴포넌트 자체 훅보다 먼저 호출됩니다.

  :::warning 더 이상 권장되지 않습니다.
  Vue2 에서, 믹스인은 컴포넌트 로직의 재사용 가능한 청크를 생성하기 위한 기본 메커니즘이었습니다. 믹스인은 Vue3 에서 계속 지원되지만, [Composition API](/guide/reusability/composables.html) 를 활용하여 컴포넌트 코드 재사용하는 방식이 선호되고 권장하고 있습니다.
  :::

- **예제**:

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends

확장할 "기본 클래스" 컴포넌트 입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **세부 사항**:

  한 컴포넌트가 다른 컴포넌트를 확장하여 해당 컴포넌트 옵션을 상속할 수 있습니다.

  구현의 관점에서 `extens`는 `mixins`와 거의 동일합니다. `extends`로 지정된 컴포넌트는 첫 번째 믹스인인 것처럼 처리됩니다.

  그러나, `extends`와 `mixins`는 다른 의도를 표현합니다. `mixins` 옵션은 주로 기능 덩어리를 구성하는 데 사용되는 반면, `extends`는 주로 상속과 관련이 있습니다.

  `mixins`와 마찬가지로 모든 옵션은 관련 병합 전략을 사용하여 병합됩니다.

- **예제**:

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```
