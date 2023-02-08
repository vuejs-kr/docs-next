:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# 유틸리티 타입 {#utility-types}

:::info
이 페이지에는 사용법에 대한 설명이 필요할 수 있는 일반적으로 사용되는 몇 가지 유틸리티 유형만 나열되어 있습니다. 내보낸 전체 유형 목록은 [소스 코드](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)를 참조하세요.

This page only lists a few commonly used utility types that may need explanation for their usage. For a full list of exported types, consult the [source code](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131).
:::

## PropType\<T> {#proptype-t}

런타임 프롭 선언을 사용할 때 고급 유형으로 프롭에 주석을 달 때 사용합니다.

Used to annotate a prop with more advanced types when using runtime props declarations.

- **예제**:

  ```ts
  import { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // `객체`에 보다 구체적인 유형을 제공합니다.
        // provide more specific type to `Object`
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **참고**: [가이드 - Typing Component Props](/guide/typescript/options-api.html#typing-component-props)

## ComponentCustomProperties {#componentcustomproperties}

컴포넌트 인스턴스 유형을 보강하여 커스텀 글로벌 프로퍼티를 지원하는 데 사용됩니다.

Used to augment the component instance type to support custom global properties.

- **예제**:

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  증강은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 자세한 내용은 [타입 증강 배치](/guide/typescript/options-api.html#augmenting-global-properties)를 참조하세요.

  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

- **참고**: [가이드 - Augmenting Global Properties](/guide/typescript/options-api.html#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

사용자 지정 옵션을 지원하기 위해 컴포넌트 옵션 유형을 보강하는 데 사용됩니다.

Used to augment the component options type to support custom options.

- **예제**:

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  증강은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 자세한 내용은 [타입 증강 배치](/guide/typescript/options-api.html#augmenting-global-properties)를 참조하세요.

  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

- **참고**: [가이드 - Augmenting Custom Options](/guide/typescript/options-api.html#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

TSX 요소에 신고되지 않은 소품을 사용하기 위해 허용된 TSX 소품을 보강하는 데 사용됩니다.

Used to augment allowed TSX props in order to use non-declared props on TSX elements.

- **예제**:

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // 이제 hello가 선언된 prop이 아니어도 작동합니다.
  // now works even if hello is not a declared prop
  <MyComponent hello="world" />
  ```

  :::tip
  증강은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 자세한 내용은 [타입 증강 배치](/guide/typescript/options-api.html#augmenting-global-properties)를 참조하세요.

  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::

## CSSProperties {#cssproperties}

스타일 속성 바인딩에서 허용되는 값을 보강하는 데 사용됩니다.

Used to augment allowed values in style property bindings.

- **예제**:

  Allow any custom CSS property

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```
  ```html
  <div :style="{ '--bg-color': 'blue' }">
  ```

  :::tip
 증강은 모듈 `.ts` 또는 `.d.ts` 파일에 배치해야 합니다. 자세한 내용은 [타입 증강 배치](/guide/typescript/options-api.html#augmenting-global-properties)를 참조하세요.

  Augmentations must be placed in a module `.ts` or `.d.ts` file. See [Type Augmentation Placement](/guide/typescript/options-api.html#augmenting-global-properties) for more details.
  :::
  
  :::info See also
  SFC `<스타일>` 태그는 `v-bind CSS` 함수를 사용하여 CSS 값을 동적 컴포넌트 상태에 연결할 수 있도록 지원합니다. 이를 통해 유형 보강 없이 사용자 정의 속성을 사용할 수 있습니다.

  SFC `<style>` tags support linking CSS values to dynamic component state using the `v-bind CSS` function. This allows for custom properties without type augmentation. 

- [v-bind() in CSS](/api/sfc-css-features.html#v-bind-in-css)
  :::
