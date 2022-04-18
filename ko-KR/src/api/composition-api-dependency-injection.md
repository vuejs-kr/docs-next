:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Composition API: <br>Dependency Injection
# 컴포지션  API: <br>의존성 주입

## provide()

Provides a value that can be injected by descendent components.

하위 컴포넌트에 값을 주입합니다. 

- **Type**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Details**

  `provide()` takes two arguments: the key, which can be a string or a symbol, and the value to be injected.

  `provide()` 함수는 두개의 인자를 받습니다. 문자열이나 심볼인 키, 그리고 주입될 값

  When using TypeScript, the key can be a symbol casted as `InjectionKey` - a Vue provided utility type that extends `Symbol`, which can be used to sync the value type between `provide()` and `inject()`.

  TypeScript를 사용할 때 키는 `Symbol`를 상속받는 `InjectionKey`(Vue 제공 유틸리티 타입)으로 캐스팅된 symbol 일수 있습니다. 이는 `provide()`와 `inject()` 사이의 값 유형을 동기화하는 데 사용할 수 있습니다.


  Similar to lifecycle hook registration APIs, `provide()` must be called synchronously during a component's `setup()` phase.

  생명주기  후크 등록 API와 유사하게 `provide()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.


- **Example**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // provide static value
  // 정적인 값을 제공합니다 
  provide('foo', 'bar')

  // provide reactive value
  // 반응영 값을 제공합니다 -
  const count = ref(0)
  provide('count', count)

  // provide with Symbol keys
  provide(fooSymbol, count)
  </script>ㅣ
  ```

- **See also**:
  - [Guide - Provide / Inject](/guide/components/provide-inject.html)
  - [가이드 - Provide / Inject](/guide/components/provide-inject.html)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api.html#typing-provide-inject)
  - [가이드 - Provide에 타입 적용하기 / Inject](/guide/typescript/composition-api.html#typing-provide-inject)

## inject()

Injects a value provided by an ancestor component or the application (via `app.provide()`).

상위 컴포넌트 또는 애플리케이션(`app.provide()`을 통해)에서 제공된 값을 주입 받는다.

- **Type**

  ```ts
  // without default value
  // 기본값 없이
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // with default value
  // 기본값 설정
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // with factory
  // 팩토리를 이용
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **Details**

  The first argument is the injection key. Vue will walk up the parent chain to locate a provided value with a matching key. If multiple components in the parent chain provides the same key, the one closest to the injecting component will "shadow" those higher up the chain. If no value with matching key was found, `inject()` returns `undefined` unless a default value is provided.

  첫 번째 인수는 주입 키입니다. Vue는 일치하는 키가 있는 제공된 값을 찾기 위해 상위 체인을 걸어 올라갑니다. 상위 체인의 여러 컴포넌트가 동일한 키를 제공하는 경우 주입 컴포넌트에 가장 가까운 컴포넌트가 상위 체인에 있는 컴포넌트에 "그림자"를 표시합니다. 일치하는 키가 있는 값을 찾을 수 없는 경우 기본값이 제공되지 않는 한 `inject()`는 `undefined`를 반환합니다.


  The second argument is optional and is the default value to be used when no matching value was found. It can also be a factory function to return values that are expensive to create. If the default value is a function, then `false` must be passed as the third argument to indicate that the function should be used as the value instead of the factory.

  두 번째 인수는 선택 사항이며 일치하는 값을 찾을 수 없을 때 사용되는 기본값입니다. 생성하는 데 비용이 많이 드는 값을 반환하는 팩토리 함수일 수도 있습니다. 기본값이 함수인 경우 `false`를 세 번째 인수로 전달하여 함수를 팩토리 대신 값으로 사용해야 함을 나타냅니다.


  Similar to lifecycle hook registration APIs, `inject()` must be called synchronously during a component's `setup()` phase.

  생명주기  후크 등록 API와 유사하게 `inject()`는 컴포넌트의 `setup()` 단계에서 동기적으로 호출되어야 합니다.

  When using TypeScript, the key can be of type of `InjectionKey` - a Vue-provided utility type that extends `Symbol`, which can be used to sync the value type between `provide()` and `inject()`.

  TypeScript를 사용할 때 키는 `Symbol`를 상속받는 `InjectionKey`(Vue 제공 유틸리티 타입)으로 캐스팅된 symbol 일수 있습니다. 이는 `provide()`와 `inject()` 사이의 값 유형을 동기화하는 데 사용할 수 있습니다.

- **Example**

  Assuming a parent component has provided values as shown in the previous `provide()` example:

  상위 컴포넌트가 이전 `provide()` 예제와 같이 값을 제공했다고 가정합니다:



  ```vue
  <script setup>
  import { inject } from 'vue'
  import { fooSymbol } from './injectionSymbols'

  // inject static value with default
  const foo = inject('foo')

  // inject reactive value
  const count = inject('count')

  // inject with Symbol keys
  const foo2 = inject(fooSymbol)

  // inject with default value
  const bar = inject('foo', 'default value')

  // inject with default value factory
  const baz = inject('foo', () => new Map())

  // inject with function default value, by passing the 3rd argument
  const fn = inject('function', () => {}, false)
  </script>
  ```

- **See also**:
  - [Guide - Provide / Inject](/guide/components/provide-inject.html)
  - [가이드 - Provide / Inject](/guide/components/provide-inject.html)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api.html#typing-provide-inject)
  - [가이드 - Provide에 타입 적용하기 / Inject](/guide/typescript/composition-api.html#typing-provide-inject)
