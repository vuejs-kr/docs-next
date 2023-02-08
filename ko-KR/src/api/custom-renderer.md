:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# 사용자 정의 렌더러 API {#custom-renderer-api}


## createRenderer() {#createrenderer}

사용자 정의 렌더러를 생성합니다. 플랫폼별 노드 생성 및 조작 API를 제공함으로써 Vue의 핵심 런타임을 활용하여 비 DOM 환경을 타겟팅할 수 있습니다.

Creates a custom renderer. By providing platform-specific node creation and manipulation APIs, you can leverage Vue's core runtime to target non-DOM environments.

- **타입**:

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      // 나머지는 대부분의 커스텀 렌더러에 사용되지 않습니다.
      isSVG?: boolean,
      prevChildren?: VNode<HostNode, HostElement>[],
      parentComponent?: ComponentInternalInstance | null,
      parentSuspense?: SuspenseBoundary | null,
      unmountChildren?: UnmountChildrenFn
    ): void
    insert(
      el: HostNode,
      parent: HostElement,
      anchor?: HostNode | null
    ): void
    remove(el: HostNode): void
    createElement(
      type: string,
      isSVG?: boolean,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null

    // optional, DOM-specific
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      isSVG: boolean
    ): [HostNode, HostNode]
  }
  ```

- **예제**:

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render`는 로우레벨 API입니다.
  // `createApp`은 앱 인스턴스를 반환합니다.
  export { render, createApp }

  // re-export Vue core APIs
  export * from '@vue/runtime-core'
  ```
  Vue의 자체 `@vue/runtime-dom`은 [동일한 API를 사용하여 구현](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts)됩니다. 더 간단한 구현을 원한다면, Vue의 자체 단위 테스트를 위한 비공개 패키지인 [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts)를 확인하세요.
  
  Vue's own `@vue/runtime-dom` is [implemented using the same API](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). For a simpler implementation, check out [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts) which is a private package for Vue's own unit testing.
