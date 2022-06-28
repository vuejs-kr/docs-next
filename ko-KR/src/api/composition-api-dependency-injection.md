# 컴포지션 API: <br>종속성 주입

## provide()

하위 컴포넌트에 주입(Inject)할 수 있도록 값을 제공(Provide)합니다.

- **타입**:

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **세부 사항**:

  `provide()`는 "키가 될 문자열 또는 심볼(symbol)"과 "제공될 값" 두 가지 인자를 가집니다.

  TypeScript를 사용할 때 키는 `InjectionKey`(Vue에서 제공하는 `Symbol`을 확장한 다용도 타입)로 캐스팅된 심볼일 수 있으며,
  이것은 `provide()`와 `inject()` 간 값의 타입을 동기화하는 데 사용할 수 있습니다.

  수명 주기 훅을 등록하는 API와 유사하게 `provide()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

- **예제**:

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // 제공: 정적 값
  provide('foo', 'bar')

  // 제공: 반응형 값
  const count = ref(0)
  provide('count', count)

  // 제공: 심볼(Symbol) 키
  provide(fooSymbol, count)
  </script>
  ```

- **참고**:
  - [가이드 - Provide/Inject](/guide/components/provide-inject.html)
  - [가이드 - Provide/Inject에 타입 지정하기](/guide/typescript/composition-api.html#typing-provide-inject)

## inject()

상위 컴포넌트 또는 `app.provide()`를 통해 앱에서 제공(Provide)한 값을 주입(Inject)합니다.

- **타입**:

  ```ts
  // 기본 값 없음
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // 기본 값 정의 있음
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // with factory
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **세부 사항**:

  첫 번째 인자는 주입 키입니다.
  Vue는 키가 일치하는 제공된 값을 찾기 위해 상위 체인을 단계적으로 탐색합니다.
  상위 체인의 여러 컴포넌트가 동일한 키를 제공하는 경우,
  주입될 컴포넌트에 가장 가까운 컴포넌트의 값이 제공되며,
  이보다 멀리있는 상위 체인의 값은 "가려짐(shadow)"이 됩니다.
  `inject()`는 일치하는 키가 발견되지 않으면,
  기본값이 제공되지 않는 한 `undefined`를 반환합니다.

  두 번째 인자는 선택 사항으로 일치하는 값을 찾을 수 없을 때 사용될 기본값입니다.
  생성하는 데 비용이 많이 드는 값을 반환하는 팩토리 함수일 수도 있습니다.
  기본값이 함수인 경우,
  팩토리의 반환 값이 아닌 함수 자체가 값으로 사용되어야 하는 경우,
  `false`를 세 번째 인자로 전달해야 합니다.

  수명 주기 훅을 등록하는 API와 유사하게 `provide()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

  TypeScript를 사용할 때 키는 `InjectionKey`(Vue에서 제공하는 `Symbol`을 확장한 다용도 타입)로 캐스팅된 심볼일 수 있으며,
  이것은 `provide()`와 `inject()` 간 값의 타입을 동기화하는 데 사용할 수 있습니다.

- **예제**:

  부모 컴포넌트가 이전 `provide()` 예제에서와 같은 값을 제공했다고 가정:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // 주입: 정적 값
  const foo = inject('foo')

  // 주입: 반응형 값
  const count = inject('count')

  // 주입: 심볼 키를 사용하여
  const foo2 = inject(fooSymbol)

  // 주입: 기본 값 제공을 하며 (제공되는 'foo'가 없는 경우 적용됨)
  const bar = inject('foo', 'default value')

  // 주입: 기본 값으로 팩토리 함수를 제공
  const baz = inject('foo', () => new Map())

  // 주입: 3번째 인자와 함께 기본값으로 함수 제공
  const fn = inject('function', () => {}, false)
  </script>
  ```

  :::danger 주의
  공식 문서에서 3번째 인자의 기본값은 `true`라고 설명하고 있으며,
  이것을 바탕으로 아래 예제도 작성되어 있습니다.
  하지만 실제 기본값은 `false`로 동작합니다.
  한국어 번역본은 원본 내용과 동일합니다.

  현재 [이슈](https://github.com/vuejs/docs/issues/1809)가 진행중이므로,
  이슈 해결 전까지 함수 또는 팩토리를 사용해야 하는 경우,
  3번째 인자의 값은 명시하는 것이 좋습니다.

  이 안내문은 이슈 해결시 관련 문서 업데이트와 함께 제거될 예정입니다.
  :::

- **참고**:
  - [가이드 - Provide/Inject](/guide/components/provide-inject.html)
  - [가이드 - Provide/Inject에 타입 지정하기](/guide/typescript/composition-api.html#typing-provide-inject)
