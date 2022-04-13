# Application API

## createApp()

Creates an application instance.
애플리케이션 인스턴스를 생성합니다.


- **Type**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Details**

  The first argument is the root component. The second optional argument is the props to be passed to the root component.
  첫 번째 인수는 루트 구성 요소입니다. 두 번째 선택적 인수는 루트 구성 요소에 전달할 props입니다.

- **Example**

  With inline root component:
  인라인 루트 컴포넌트 사용:


  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* root component options */
  })
  ```

  With imported component:
  가져온 컴포넌트 사용:


  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **See also:** [Guide - Creating a Vue Application](/guide/essentials/application.html)

## createSSRApp()

Creates an application instance in [SSR Hydration](/guide/scaling-up/ssr.html#client-hydration) mode. Usage is exactly the same as `createApp()`.
[SSR Hydration](/guide/scaling-up/ssr.html#client-hydration) 모드에서 애플리케이션 인스턴스를 생성합니다. 사용법은 `createApp()`과 정확히 동일합니다.

## app.mount()

Mounts the application instance in a container element.
컨테이너 엘리먼트에 애플리케이션 인스턴스를 마운트합니다.

- **Type**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Details**

  The argument can either be an actual DOM element or a CSS selector (the first matched element will be used). Returns the root component instance.
  인자는 실제 DOM요소 또는 CSS 선택자일 수 있습니다(첫번째로 일치하는 요소가 사용됨). 루트 컴포넌트 인스턴스를 반환합니다.


  If the component has a template or a render function defined, it will replace any existing DOM nodes inside the container. Otherwise, if the runtime compiler is available, the `innerHTML` of the container will be used as the template.
  컴포넌트에 정의된 템플릿 또는 렌더링 기능이 있는 경우 컨테이너 내부의 기존 DOM노드를 대체합니다. 그렇지 않고 런타임 컴파일러를 사용할 수 있는 경우 컨테이너의 `innerHTML`이 템플릿으로 사용됩니다.

  In SSR hydration mode, it will hydrate the existing DOM nodes inside the container. If there are [mismatches](/guide/scaling-up/ssr.html#hydration-mismatch), the existing DOM nodes will be morphed to match the expected output.
  SSR hydration 모드에서는 컨테이너 내부의 기존 DOM노드를 수화(hydrate)합니다. [mismatches](/guide/scaling-up/ssr.html#hydration-mismatch)가 있는 경우 기존 DOM노드가 예상 출력과 일치하도록 변형됩니다.

  For each app instance, `mount()` can only be called once.
  각 앱 인스턴스에 대해 `mount()`는 한 번만 호출이 가능합니다.

- **Example**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Can also mount to an actual DOM element:
  실제 DOM 엘리먼트에 마운트 할 수도 있습니다.

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount()

Unmounts a mounted application instance, triggering the unmount lifecycle hooks for all components in the application's component tree.
마운트된 애플리케이션 인스턴스를 마운트 해제하여 애플리케이션의 컴포넌트 트리에 있는 모든 컴포넌트에 대해 마운트 해제 수명 주기 훅을 실행합니다.

- **Type**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.provide()

Provide a value that can be injected in all descendent components within the application.
애플리케이션 내의 모든 하위 컴포넌트에 주입할 수 있는 값을 제공합니다.

- **Type**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Details**

  Expects the injection key as the first argument, and the provided value as the second. Returns the application instance itself.
  주입 키를 첫 번째 인자로 제공된 값을 두 번째 인자로 사용합니다. 애플리케이션 인스턴스 자체를 반환합니다.


- **Example**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  Inside a component in the application:
  애플리케이션의 컴포넌트 내부:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **See also:**
  - [Provide / Inject](/guide/components/provide-inject.html)
  - [App-level Provide](/guide/components/provide-inject.html#app-level-provide)

## app.component()

Registers a global component if passing both a name string and a component definition, or retrieves an already registered one if only the name is passed.
이름 문자열과 컴포넌트 정의를 모두 전달하는 경우 전역 컴포넌트를 등록하거나 이름만 전달되는 경우 이미 등록된 항목을 검색합니다.

- **Type**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Example**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // register an options object
  app.component('my-component', {
    /* ... */
  })

  // retrieve a registered component
  const MyComponent = app.component('my-component')
  ```

- **See also:** [Component Registration](/guide/components/registration.html)

## app.directive()

Registers a global custom directive if passing both a name string and a directive definition, or retrieves an already registered one if only the name is passed.
이름 문자열과 지시문 정의를 모두 전달하는 경우 전역 사용자 정의 지시문을 등록하거나 이름만 전달된 경우 이미 등록된 지시문을 검색합니다.


- **Type**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Example**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // register (object directive)
  app.directive('my-directive', {
    /* custom directive hooks */
  })

  // register (function directive shorthand)
  app.directive('my-directive', () => {
    /* ... */
  })

  // retrieve a registered directive
  const myDirective = app.directive('my-directive')
  ```

- **See also:** [Custom Directives](/guide/reusability/custom-directives.html)

## app.use()

Installs a [plugin](/guide/reusability/plugins.html).
[플러그인](/guide/reusability/plugins.html)을 설치합니다.

- **Type**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Details**

  Expects the plugin as the first argument, and optional plugin options as the second argument.
  첫 번째 인자로 플러그인이, 두 번째 인자로 선택적 플러그인 옵션이 필요합니다.

  The plugin can either be an object with an `install()` method, or a directly a function (which itself will used as the install method). The options (second argument of `app.use()`) will be passed along to the plugin's install method.
  플러그인은 `install()`  메소드가 있는 객체이거나 직접 함수(자체적으로 설치 메소드로 사용됨)일 수 있습니다. 옵션(`app.use()`의 두 번째 인자)은 플러그인의 설치 메소드에 전달됩니다.

  When `app.use()` is called on the same plugin multiple times, the plugin will be installed only once.
  `app.use()`가 동일한 플러그인에서 여러 번 호출되면 플러그인은 한 번만 설치됩니다.

- **Example**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **See also:** [Plugins](/guide/reusability/plugins.html)

## app.mixin()

Applies a global mixin (scoped to the application). A global mixin applies its included options to every component instance in the application.
전역 믹스인을 적용합니다(애플리케이션 범위). 전역 믹스인은 포함된 옵션을 애플리케이션의 모든 컴포넌트 인스턴스에 적용합니다.

:::warning Not Recommended
Mixins are supported in Vue 3 mainly for backwards compatibility due to its wide-spread use in ecosystem libraries. Use of mixins, especially global mixins, should be avoided in application code.

For logic reuse, prefer [Composables](/guide/reusability/composables.html) instead.
:::

:::warning 권장하지 않음
믹스인은 생태계 라이브러리에서 널리 사용되기 때문에 주로 하위 호환성을 위해 Vue 3에서 지원됩니다. 믹스인, 특히 전역 믹스인의 사용은 애플리케이션 코드에서 피해야 합니다.
로직 재사용의 경우 대신 [Composables](/guide/reusability/composables.html)를 사용하세요. 
:::

- **Type**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.version

Provides the version of Vue that the application was created with. This is useful inside [plugins](/guide/reusability/plugins.html), where you might need conditional logic based on different Vue versions.
애플리케이션이 생성된 Vue 버전을 제공합니다. 이는 다양한 Vue 버전을 기반으로 하는 조건부 로직이 필요할 수 있는 [plugins](/guide/reusability/plugins.html) 내에서 유용합니다.

- **Type**

  ```ts
  interface App {
    version: string
  }
  ```

- **Example**

  Performing a version check inside a plugin:
  플러그인 내부에서 버전 확인 수행:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **See also:** [Global API - version](/api/general.html#version)

## app.config

Every application instance exposes a `config` object that contains the configuration settings for that application. You can modify its properties (documented below) before mounting your application.
모든 애플리케이션 인스턴스는 해당 애플리케이션의 구성 설정이 포함된 `config` 객체를 노출합니다. 애플리케이션을 마운트하기 전에 속성(아래 문서 참조)을 수정할 수 있습니다.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler

Assign a global handler for uncaught errors propagating from within the application.
애플리케이션 내에서 전파되는 포착되지 않은 오류에 대한 전역 처리기를 할당합니다.

- **Type**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` is a Vue-specific error info,
      // e.g. which lifecycle hook the error was thrown in
      info: string
    ) => void
  }
  ```

- **Details**

  The error handler receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.
  오류 처리기는 오류, 오류를 트리거한 컴포넌트 인스턴스 및 오류 소스 유형을 지정하는 정보 문자열의 세 가지 인자를 수신합니다.  

  It can capture errors from the following sources:
  오류 처리기는 오류, 오류를 트리거한 컴포넌트 인스턴스 및 오류 소스 유형을 지정하는 정보 문자열의 세 가지 인자를 수신합니다:

  - Component renders
  - Event handlers
  - Lifecycle hooks
  - `setup()` function
  - Watchers
  - Custom directive hooks
  - Transition hooks

- **Example**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // handle error, e.g. report to a service
  }
  ```

## app.config.warnHandler

Assign a custom handler for runtime warnings from Vue.
Vue에서 런타임 경고에 대한 사용자 지정 처리기를 할당합니다.


- **Type**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Details**

  The warning handler receives the warning message as the first argument, the source component instance as the second argument, and a component trace string as the third.
  경고 처리기는 경고 메시지를 첫 번째 인자로, 소스 컴포넌트 인스턴스를 두 번째 인자로, 컴포넌트 추적 문자열을 세 번째 인자로 수신합니다.


  It can be used to filter out specific warnings to reduce console verbosity. All Vue warnings should be addressed during development, so this is only recommended during debug sessions to focus on specific warnings among many, and should be removed once the debugging is done.
  콘솔의 자세한 정보를 줄이기 위해 특정 경고를 필터링하는 데 사용할 수 있습니다. 모든 Vue 경고는 개발 중에 해결되어야 하므로 많은 경고 중 특정 경고에 집중하기 위해 디버그 세션 중에만 권장되며 디버깅이 완료되면 제거해야 합니다.


  :::tip
  Warnings only work during development, so this config is ignored in production mode.
  :::

  :::tip 
  경고는 개발 중에만 작동하므로 이 구성은 프로덕션 모드에서 무시됩니다. 
  :::

- **Example**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` is the component hierarchy trace
  }
  ```

## app.config.performance

Set this to `true` to enable component init, compile, render and patch performance tracing in the browser devtool performance/timeline panel. Only works in development mode and in browsers that support the [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API.
브라우저 devtool 성능/타임라인 패널에서 컴포넌트 초기화, 컴파일, 렌더링 및 패치 성능 추적을 사용하려면 이것을 `true`로 설정합니다. 개발 모드 및  [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)  API를 지원하는 브라우저에서만 작동합니다.

- **Type**: `boolean`

- **See also:** [Guide - Performance](/guide/best-practices/performance.html)

## app.config.compilerOptions

Configure runtime compiler options. Values set on this object will be passed to the in-browser template compiler and affect every component in the configured app. Note you can also override these options on a per-component basis using the [`compilerOptions` option](/).

런타임 컴파일러 옵션을 구성합니다. 이 객체에 설정된 값은 브라우저 내 템플릿 컴파일러로 전달되고 구성된 앱의 모든 컴포넌트에 영향을 미칩니다. [`compilerOptions` option](/)을 사용하여 컴포넌트별로 이러한 옵션을 재정의할 수도 있습니다.

::: warning Important
This config option is only respected when using the full build (i.e. the standalone `vue.js` that can compile templates in the browser). If you are using the runtime-only build with a build setup, compiler options must be passed to `@vue/compiler-dom` via build tool configurations instead.

- For `vue-loader`: [pass via the `compilerOptions` loader option](/). Also see [how to configure it in `vue-cli`](/).

- For `vite`: [pass via `@vitejs/plugin-vue` options](/).
  :::

::: warning  중요 
이 구성 옵션은 전체 빌드(예: 브라우저에서 템플릿을 컴파일할 수 있는 독립 실행형 {code0}vue.js{/code0})를 사용할 때만 적용됩니다. 빌드 설정과 함께 런타임 전용 빌드를 사용하는 경우 대신 빌드 도구 구성을 통해 컴파일러 옵션을 {code1}@vue/compiler-dom{/code1}으로 전달해야 합니다.


- For `vue-loader`: [pass via the `compilerOptions` loader option](/). Also see [how to configure it in `vue-cli`](/).

- For `vite`: [pass via `@vitejs/plugin-vue` options](/).
:::

### app.compilerOptions.isCustomElement

Specifies a check method to recognize native custom elements.
기본 사용자 정의 요소를 인식하기 위한 검사 방법을 지정합니다.

- **Type:** `(tag: string) => boolean`

- **Details**

  Should return `true` if the tag should be treated as a native custom element. For a matched tag, Vue will render it as a native element instead of attempting to resolve it as a Vue component.
  태그를 기본 맞춤 요소로 처리해야 하는 경우 `true`를 반환해야 합니다. 일치하는 태그의 경우 Vue는 이를 Vue 컴포넌트로 확인하는 대신 기본 요소로 렌더링합니다.

  Native HTML and SVG tags don't need to be matched in this function - Vue's parser recognizes them automatically.
  기본 HTML 및 SVG 태그는 이 함수에서 일치시킬 필요가 없습니다. Vue의 파서는 자동으로 태그를 인식합니다.

- **Example**

  ```js
  // treat all tags starting with 'ion-' as custom elements
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **See also:** [Vue and Web Components](/guide/extras/web-components.html)

### app.compilerOptions.whitespace

Adjusts template whitespace handling behavior.
템플릿 공백 처리 동작을 조정합니다.


- **Type:** `'condense' | 'preserve'`

- **Default:** `'condense'`

- **Details**

  Vue removes / condenses whitespace characters in templates to produce more efficient compiled output. The default strategy is "condense", with the following behavior:
  Vue는 템플릿에서 공백 문자를 제거/축소하여 보다 효율적인 컴파일된 출력을 생성합니다. 기본 전략은 다음 동작과 함께 "condense(축소)"입니다:

  1. Leading / ending whitespace characters inside an element are condensed into a single space.
  2. Whitespace characters between elements that contain newlines are removed.
  3. Consecutive whitespace characters in text nodes are condensed into a single space.


  1. 요소 내부의 선행/종료 공백 문자는 단일 공백으로 압축됩니다.
  2. 개행을 포함하는 요소 사이의 공백 문자는 제거됩니다.
  3. 텍스트 노드의 연속 공백 문자는 단일 공백으로 압축됩니다.

  Setting this option to `'preserve'` will disable (2) and (3).
  이 옵션을 `'preserve'` 로 설정하면 (2)와 (3)이 비활성화됩니다.


- **Example**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.compilerOptions.delimiters

Adjusts the delimiters used for text interpolation within the template.
템플릿 내에서 텍스트 보간에 사용되는 구분 기호를 조정합니다.

- **Type:** `[string, string]`

- **Default:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Details**

  This is typically used to avoid conflicting with server-side frameworks that also use mustache syntax.
  이것은 일반적으로 콧수염(mustache) 구문도 사용하는 서버 측 프레임워크와의 충돌을 피하기 위해 사용됩니다.

- **Example**

  ```js
  // Delimiters changed to ES6 template string style
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.compilerOptions.comments

Adjusts treatment of HTML comments in templates.
템플릿에서 HTML 주석 처리를 조정합니다.

- **Type:** `boolean`

- **Default:** `false`

- **Details**

  By default, Vue will remove the comments in production. Setting this option to `true` will force Vue to preserve comments even in production. Comments are always preserved during development. This option is typically used when Vue is used with other libraries that rely on HTML comments.
  기본적으로 Vue는 프로덕션에서 주석을 제거합니다. 이 옵션을 `true`로 설정하면 Vue가 프로덕션에서도 주석을 보존하도록 합니다. 주석은 개발 중에 항상 보존됩니다. 이 옵션은 일반적으로 Vue가 HTML 주석에 의존하는 다른 라이브러리와 함께 사용될 때 사용됩니다.

- **Example**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties

An object that can be used to register global properties that can be accessed on any component instance inside the application.
애플리케이션 내부의 모든 컴포넌트 인스턴스에서 접근할 수 있는 전역 속성을 등록하는 데 사용할 수 있는 객체입니다.


- **Type**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Details**

  This is a replacement of Vue 2's `Vue.prototype` which is no longer present in Vue 3. As with anything global, this should be used sparingly.
  이것은 Vue 3에 더 이상 존재하지 않는 Vue 2의 `Vue.prototype`을 대체합니다. 전반적인 모든 것과 마찬가지로 이것은 드물게 사용해야 합니다.

  If a global property conflicts with a component’s own property, the component's own property will have higher priority.
  전역 속성이 컴포넌트 자체 속성과 충돌하는 경우 컴포넌트 자체 속성이 더 높은 우선 순위를 갖습니다.


- **Usage**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  This makes `msg` available inside any component template in the application, and also on `this` of any component instance:
  이렇게 하면 애플리케이션의 모든 컴포넌트 템플릿 내에서 `msg`를 사용할 수 있으며 컴포넌트 인스턴스의 `this`에서도 사용할 수 있습니다.

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

## app.config.optionMergeStrategies

An object for defining merging strategies for custom component options.
사용자 지정 컴포넌트 옵션에 대한 병합 전략을 정의하기 위한 객체입니다.

- **Type**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Details**

  Some plugins / libraries add support for custom component options (by injecting global mixins). These options may require special merging logic when the same option needs to be "merged" from multiple sources (e.g. mixins or component inheritance).
  일부 플러그인/라이브러리는 사용자 정의 컴포넌트 옵션에 대한 지원을 추가합니다(전역 믹스인 주입). 여러 소스(예: 믹스인 또는 컴포넌트 상속)에서 동일한 옵션을 "병합"해야 하는 경우 이러한 옵션에는 특별한 병합 논리가 필요할 수 있습니다.

  A merge strategy function can registered for a custom option by assigning it on the `app.config.optionMergeStrategies` object using the option's name as the key.
  옵션 이름을 키로 사용하여 `app.config.optionMergeStrategies` 객체에 할당하여 맞춤 옵션에 병합 전략 기능을 등록할 수 있습니다.

  The merge strategy function receives the value of that option defined on the parent and child instances as the first and second arguments, respectively.
  병합 전략 함수는 부모 및 자식 인스턴스에 정의된 해당 옵션의 값을 각각 첫 번째 및 두 번째 인자로 받습니다.

- **Example**

  ```js
  const app = createApp({
    // option from self
    msg: 'Vue',
    // option from a mixin
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // merged options exposed on this.$options
      console.log(this.$options.msg)
    }
  })

  // define a custom merge strategy for `msg`
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logs 'Hello Vue'
  ```

- **See also:** [Component Instance - `$options`](/api/component-instance.html#options)
