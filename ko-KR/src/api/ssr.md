:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Server-Side Rendering API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **예제**:

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context {#ssr-context}

  렌더링 중에 추가 데이터를 기록하는 데 사용할 수 있는 선택적 컨텍스트 객체를 전달할 수 있습니다(예: [텔레포트 콘텐츠에 액세스](/guide/scaling-up/ssr.html#teleports)):

  You can pass an optional context object, which can be used to record additional data during the render, for example [accessing content of Teleports](/guide/scaling-up/ssr.html#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  이 페이지에 있는 대부분의 다른 SSR API도 선택적으로 컨텍스트 객체를 허용합니다. 컨텍스트 객체는 컴포넌트 코드에서 [useSSRContext](#usessrcontext) 헬퍼를 통해 액세스할 수 있습니다.

  Most other SSR APIs on this page also optionally accept a context object. The context object can be accessed in component code via the [useSSRContext](#usessrcontext) helper.

- **참고**: [가이드 - Server-Side Rendering](/guide/scaling-up/ssr.html)

## renderToNodeStream() {#rendertonodestream}

입력을 [Node.js 읽기 가능한 스트림](https://nodejs.org/api/stream.html#stream_class_stream_readable)으로 렌더링합니다.

Renders input as a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable).

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **예제**:

  ```js
  // inside a Node.js http handler
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Note
  이 메서드는 Node.js 환경과 분리된 `vue/server-renderer`의 ESM 빌드에서는 지원되지 않습니다. 대신 [`pipeToNodeWritable`](#pipetonodewritable)을 사용하십시오.
  :::

  :::tip Note
  This method is not supported in the ESM build of `vue/server-renderer`, which is decoupled from Node.js environments. Use [`pipeToNodeWritable`](#pipetonodewritable) instead.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

렌더링하고 기존 [Node.js 쓰기 가능한 스트림](https://nodejs.org/api/stream.html#stream_writable_streams) 인스턴스로 파이프합니다.

Render and pipe to an existing [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) instance.

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **예제**:

  ```js
  // inside a Node.js http handler
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

입력을 [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)으로 렌더링합니다.

Renders input as a [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API).

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **예제**:

  ```js
  // ReadableStream을 지원하는 환경 내에서
  // inside an environment with ReadableStream support
  return new Response(renderToWebStream(app))
  ```

  :::tip Note
  글로벌 스코프에 `ReadableStream` 생성자가 노출되지 않는 환경에서는 [`pipeToWebWritable()`](#pipetowebwritable)을 대신 사용해야 합니다.

  In environments that do not expose `ReadableStream` constructor in the global scope, [`pipeToWebWritable()`](#pipetowebwritable) should be used instead.
  :::

## pipeToWebWritable() {#pipetowebwritable}

렌더링하고 기존 [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) 인스턴스로 파이프합니다.

Render and pipe to an existing [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) instance.

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **예제**:

  이것은 일반적으로 [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream)과 함께 사용됩니다:
  
  This is typically used in combination with [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream):

  ```js
  // TransformStream은 CloudFlare 워커와 같은 환경에서 사용할 수 있습니다.
  // Node.js에서 TransformStream은 'stream/web'에서 명시적으로 임포트해야 합니다.

  // TransformStream is available in environments such as CloudFlare workers.
  // in Node.js, TransformStream needs to be explicitly imported from 'stream/web'
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

간단한 가독성 인터페이스를 사용하여 스트리밍 모드에서 입력을 렌더링합니다.

Renders input in streaming mode using a simple readable interface.

- **Exported from `vue/server-renderer`**

- **타입**:

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **예제**:

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // done
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // error encountered
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}


`renderToString()` 또는 다른 서버 렌더링 API에 전달된 컨텍스트 객체를 검색하는 데 사용되는 런타임 API입니다.

A runtime API used to retrieve the context object passed to `renderToString()` or other server render APIs.

- **타입**:

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **예제**:

  검색된 컨텍스트는 최종 HTML 렌더링에 필요한 정보(예: 헤드 메타데이터)를 첨부하는 데 사용할 수 있습니다.

  The retrieved context can be used to attach information that is needed for rendering the final HTML (e.g. head metadata).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'
  // SSR 중에만 호출해야 합니다.
  // make sure to only call it during SSR
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...attach properties to the context
  }
  </script>
  ```
