# 옵션: 렌더링 {#options-rendering}

## template {#template}

컴포넌트의 문자열 템플릿입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **세부 사항**:

  `template` 옵션을 통해 제공된 템플릿은 런타임에서 즉시 컴파일되지만,
  템플릿 컴파일러가 포함된 Vue 빌드를 사용할 때만 지원됩니다.
  그러나 이름에 `runtime` 단어가 포함된 `vue.runtime.esm-bundler.js`라는 템플릿 컴파일러는 Vue 빌드에 포함되어있지 않습니다.
  다른 빌드의 자세한 내용은 [dist 파일 가이드](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use)를 참고하세요.

  문자열이 `#`로 시작하면 `querySelector`로 사용되고,
  선택한 엘리먼트의 `innerHTML`을 템플릿 문자열로 사용합니다.
  이를 통해 네이티브 `<template>` 엘리먼트를 사용하여 소스 템플릿을 작성할 수 있습니다.

  동일한 컴포넌트에 `render` 옵션도 있는 경우, `template`은 무시됩니다.

  앱의 루트 컴포넌트에 `template` 또는 `render` 옵션이 지정되지 않은 경우,
  Vue는 마운트된 엘리먼트의 `innerHTML`을 템플릿으로 사용하려고 시도합니다.

  :::warning 보안 참고 사항
  신뢰할 수 있는 템플릿 소스만 사용해야 합니다.
  사용자가 제공한 컨텐츠를 템플릿으로 사용하면 안됩니다.
  자세한 내용은 [가이드 - 보안](/guide/best-practices/security.html#rule-no-1-never-use-non-trusted-templates) 참고.
  :::

## render {#render}

컴포넌트의 가상 DOM 트리를 프로그래밍 방식으로 반환하는 함수입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **세부 사항**:

  `render`는 문자열 템플릿의 대안으로,
  템플릿 전체를 JavaScript 프로그래밍 능력을 활용하여,
  컴포넌트의 렌더링 출력을 선언할 수 있습니다.

  예를 들어 싱글 파일 컴포넌트(SFC)에 있는 것처럼,
  미리 컴파일된 템플릿은 빌드 시 `render` 옵션으로 컴파일됩니다.
  컴포넌트에 `render`와 `template`이 모두 있는 경우,
  `render`가 더 높은 우선 순위를 갖습니다.

- **참고**:
  - [가이드 - 렌더링 메커니즘](/guide/extras/rendering-mechanism.html)
  - [가이드 - Render Functions](/guide/extras/render-function.html)

## compilerOptions {#compileroptions}

컴포넌트의 템플릿의 런타임 컴파일러 옵션을 구성합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // 기본 값: 'condense'
      delimiters?: [string, string] // 기본 값: ['{{', '}}']
      comments?: boolean // 기본 값: false
    }
  }
  ```

- **세부 사항**:

  이 환경설정(config) 옵션은 전체 빌드(예: 브라우저에서 템플릿을 컴파일할 수 있는 독립 실행형 `vue.js`)를 사용할 때만 적용됩니다.
  앱 레벨의 [app.config.compilerOptions](/api/application.html#app-config-compileroptions)와 동일한 옵션을 지원하며,
  현재 컴포넌트가 더 높은 우선 순위를 갖습니다.

- **참고**: [app.config.compilerOptions](/api/application.html#app-config-compileroptions)
