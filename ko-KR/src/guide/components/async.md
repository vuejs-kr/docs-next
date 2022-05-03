:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Async Components
# 비동기 컴포넌트

## Basic Usage
## 기본 사용법

In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's needed. To make that possible, Vue has a [`defineAsyncComponent`](/api/general.html#defineasynccomponent) function:

큰 애플리케이션에서는 앱을 더 작은 청크로 나누고, 필요할때에 서버에서 컴포넌트를 로드해야 할 수 있습니다. 이를 지원하기 위해 Vue는 [`defineAsyncComponent`](/api/general.html#defineasynccomponent) 함수을 제공합니다:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    // ...서버에서 컴포넌트를 읽어 옵니다. 
    resolve(/* loaded component  읽어온 컴포넌트 */)
    
  })
})
// ... use `AsyncComp` like a normal component
// ... 보통의 컴포넌트처럼 `AsyncComp`를 사용
```

As you can see, `defineAsyncComponent` accepts a loader function that returns a Promise. The Promise's `resolve` callback should be called when you have retrieved your component definition from the server. You can also call `reject(reason)` to indicate the load has failed.

예제에서처럼 `defineAsyncComponent`는 Promise를 반환하는 로더 함수를 허용합니다. Promise의 `resolve` 콜백은 서버에서 컴포넌트 정의를 읽어 올 때 호출 되어야 합니다. 로드가 실패했음을 나타내기 위해 `reject(reason)`를 호출할 수도 있습니다.


[ES module dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) also returns a Promise, so most of the time we will use it in combination with `defineAsyncComponent`. Bundlers like Vite and webpack also support the syntax, so we can use it to import Vue SFCs:

[ES 모듈 동적 가져오기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)도 Promise를 반환하므로 대부분의 경우 이를 사용합니다. `defineAsyncComponent`와 조합합니다. Vite 및 webpack과 같은 번들러도 구문을 지원하므로 Vue SFC를 가져오는 데 사용할 수 있습니다.


```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

The resulting `AsyncComp` is a wrapper component that only calls the loader function when it is actually rendered on the page. In addition, it will pass along any props to the inner component, so you can use the async wrapper to seamlessly replace the original component while achieving lazy loading.

반환된 `AsyncComp`는 페이지에서 실제로 렌더링될 때 로더 함수를 호출하는 래퍼 컴포넌트입니다. 또한 내부 컴포넌트에 모든 props을 전달하므로 비동기 래퍼를 사용하여 지연 로드를 달성하면서 원본 컴포넌트를 원활하게 교체할 수 있습니다.


<div class="options-api">

You can also use `defineAsyncComponent` when [registering a component locally](/guide/components/registration.html#local-registration):

[컴포넌트를 지역적으로 등록](/guide/components/registration.html#local-registration)할 때 `defineAsyncComponent`를 사용할 수도 있습니다.


```js
import { defineAsyncComponent } from 'vue'

export default {
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
}
```

</div>

## Loading and Error States
## 로딩 상태 및 에러 상태


Asynchronous operations inevitably involve loading and error states - `defineAsyncComponent()` supports handling these states via advanced options:

비동기 작업에는 필연적으로 로딩 상태 및 오류 상태가 포함됩니다. `defineAsyncComponent()`는 고급 옵션을 통해 이러한 상태 처리를 지원합니다.


```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  // 로더 함수
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  // 비동기 컴포넌트를 읽어 오는 동상 사용할 컴포넌트
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  // 로딩 컴포넌트를 보여주기전 지연할 시간. 기본: 200ms.
  delay: 200,

  // A component to use if the load fails
  // 로딩에 실패했을때 보여줄 컴포넌트
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  // 일적시간이 지나면 에러처리하여 에러 컴포넌트를 보여줄 타임아웃 시간. 기본: 무제한 
  timeout: 3000
})
```

If a loading component is provided, it will be displayed first while the inner component is being loaded. There is a default 200ms delay before the loading component is shown - this is because on fast networks, an instant loading state may get replaced too fast and end up looking like a flicker.

로딩 컴포넌트가 제공되면 내부 컴포넌트가 로딩되는 동안 먼저 표시됩니다. 로딩 컴포넌트가 표시되기 전에 기본 200ms 지연이 있습니다. 이는 빠른 네트워크에서는 인스턴트 로딩 상태가 너무 빨리 교체되어 깜박임처럼 보일 수 있기 때문입니다.


If an error component is provided, it will be displayed when the Promise returned by the loader function is rejected. You can also specify a timeout to show the error component when the request is taking too long.

오류 컴포넌트가 제공되면 로더 함수에서 반환된 Promise가 거부(rejejct)될 때 표시됩니다. 요청이 너무 오래 걸릴 때 오류 컴포넌트를 표시하도록 시간 초과를 지정할 수도 있습니다.


## Using with Suspense
## 지연(suspense) 사용하기 

Async components can be used with the `<Suspense>` built-in component. The interaction between `<Suspense>` and async components are documented in the [dedicated chapter for `<Suspense>`](/guide/built-ins/suspense.html).

비동기 컴포넌트는 `<Suspense>` 내장 컴포넌트와 함께 사용할 수 있습니다. `<Suspense>`와 비동기 컴포넌트 간의 상호 작용은 [`<Suspense>`](/guide/built-ins/suspense.html)에 설명되어 있습니다.
