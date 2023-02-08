# Vue 및 웹 컴포넌트 {#vue-and-web-components}

[웹 컴포넌트](https://developer.mozilla.org/en-US/docs/Web/Web_Components)는 개발자가 재사용 가능한 사용자 정의 요소를 만들 수 있는 웹 네이티브 API 집합을 포괄적으로 지칭하는 용어입니다.

워드프레스닷컴은 Vue와 웹 컴포넌트를 주로 상호 보완적인 기술로 간주합니다. Vue는 사용자 정의 요소의 사용과 생성을 모두 훌륭하게 지원합니다. 사용자 지정 요소를 기존 Vue 애플리케이션에 통합하든, 사용자 지정 요소를 빌드하고 배포하는 데 Vue를 사용하든 관계없이 좋은 회사에서 사용할 수 있습니다.

## Vue에서 사용자 정의 요소 사용 {#using-custom-elements-in-vue}

Vue는 [사용자 정의 엘리먼트 에브리웨어 테스트에서 100% 만점을 받았습니다](https://custom-elements-everywhere.com/libraries/vue/results/results.html). Vue 애플리케이션 내에서 사용자 정의 요소를 사용하는 것은 기본 HTML 요소를 사용하는 것과 거의 동일하게 작동하지만 몇 가지 유의해야 할 사항이 있습니다:


### 컴포넌트 리졸브 건너뛰기 {#skipping-component-resolution}

기본적으로 Vue는 네이티브가 아닌 HTML 태그를 사용자 정의 요소로 렌더링하기 전에 등록된 Vue 구성 요소로 확인하려고 시도합니다. 이로 인해 Vue는 개발 중에 "구성 요소를 확인하지 못했습니다"라는 경고를 표시합니다. 특정 요소를 사용자 정의 요소로 처리하고 컴포넌트 확인을 건너뛰어야 한다는 것을 Vue에 알리기 위해 [`compilerOptions.isCustomElement` 옵션](/api/application.html#app-config-compiler옵션)을 지정할 수 있습니다.

빌드 설정과 함께 Vue를 사용하는 경우 이 옵션은 컴파일 타임 옵션이므로 빌드 설정을 통해 전달해야 합니다.

#### 브라우저 내 구성 예시 {#example-in-browser-config}

```js
// 브라우저 내 컴파일을 사용하는 경우에만 작동합니다.
// 빌드 도구를 사용하는 경우 아래 구성 예제를 참조하세요.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### Vite 구성 예시 {#example-vite-config}

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 대시가 있는 모든 태그를 사용자 지정 요소로 취급합니다.
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### Vue CLI 구성 예시 {#example-vue-cli-config}

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // ion-으로 시작하는 모든 태그를 사용자 지정 요소로 취급합니다.
          isCustomElement: tag => tag.startsWith('ion-')
        }
      }))
  }
}
```

### DOM 속성 전달 {#passing-dom-properties}

DOM 속성은 문자열만 가능하므로 복잡한 데이터를 사용자 정의 요소에 DOM 속성으로 전달해야 합니다. 사용자 정의 요소에 프로퍼티를 설정할 때 Vue 3는 `in` 연산자를 사용하여 DOM 속성 존재 여부를 자동으로 확인하고 키가 있는 경우 값을 DOM 속성으로 설정하는 것을 선호합니다. 즉, 대부분의 경우 사용자 정의 요소가 [권장 모범 사례](https://web.dev/custom-elements-best-practices/)를 따르는 경우 이에 대해 생각할 필요가 없습니다.

그러나 드물게 데이터를 DOM 프로퍼티로 전달해야 하지만 사용자 정의 요소가 프로퍼티를 제대로 정의/반영하지 않는 경우(`in` 체크가 실패하는 경우)가 있을 수 있습니다. 이 경우 '.prop' 수정자를 사용하여 `v-bind` 바인딩이 DOM 속성으로 설정되도록 강제할 수 있습니다:


```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- shorthand equivalent -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## Vue로 사용자 정의 요소 구축 {#building-custom-elements-with-vue}

사용자 정의 요소의 주요 이점은 프레임워크와 함께 사용하거나 프레임워크 없이도 사용할 수 있다는 것입니다. 따라서 최종 소비자가 동일한 프론트엔드 스택을 사용하지 않을 수 있는 컴포넌트를 배포하거나 최종 애플리케이션을 사용하는 컴포넌트의 구현 세부 사항으로부터 격리하려는 경우에 이상적입니다.

### defineCustomElement {#definecustomelement}

Vue는 [`defineCustomElement`](/api/general.html#definecustomelement) 메서드를 통해 정확히 동일한 Vue 컴포넌트 API를 사용하여 사용자 정의 요소를 생성할 수 있도록 지원합니다. 이 메서드는 [`defineComponent`](/api/general.html#definecomponent)와 동일한 인수를 허용하지만 대신 `HTMLElement`를 확장하는 사용자 정의 엘리먼트 생성자를 반환합니다:


```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // normal Vue component options here
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/* inlined css */`]
})

// Register the custom element.
// After registration, all `<my-vue-element>` tags
// on the page will be upgraded.
customElements.define('my-vue-element', MyVueElement)

// You can also programmatically instantiate the element:
// (can only be done after registration)
document.body.appendChild(
  new MyVueElement({
    // initial props (optional)
  })
)
```

#### 생명주기 {#lifecycle}

- Vue 사용자 정의 요소는 요소의 [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)이 처음 호출될 때 섀도 루트 내부에 내부 Vue 컴포넌트 인스턴스를 마운트합니다.

- 요소의 `disconnectedCallback`이 호출되면 Vue는 마이크로태스크 틱 후 요소가 문서에서 분리되었는지 여부를 확인합니다.

  - 요소가 여전히 문서에 있으면 이동으로 간주되며 컴포넌트 인스턴스가 보존됩니다;

  - 요소가 문서에서 분리되면 제거가 되고 컴포넌트 인스턴스가 마운트 해제됩니다.


#### Props {#props}

- `prop` 옵션을 사용하여 선언된 모든 소품은 사용자 정의 요소에 속성으로 정의됩니다. Vue는 적절한 경우 속성/프로퍼티 간의 반영을 자동으로 처리합니다.

  - 속성은 항상 해당 속성에 반영됩니다.

  - 기본값(`string`, `boolean` 또는 `number`)이 있는 속성은 속성으로 반영됩니다.

- 또한 `부울` 또는 `숫자` 유형으로 선언된 프로퍼티는 속성으로 설정될 때(항상 문자열인) 원하는 유형으로 자동 형변환됩니다. 예를 들어 다음 props 선언이 있습니다:


  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  그리고 사용자 정의 요소 사용법:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  컴포넌트에서 `selected`는 `true`(부울)로 캐스팅되고 `index`는 `1`(숫자)로 캐스팅됩니다.

#### 이벤트 {#events}

`this.$emit` 또는 설정 `emit`을 통해 전송된 이벤트는 사용자 정의 요소에서 기본 [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent)로 디스패치됩니다. 추가 이벤트 인수(페이로드)는 CustomEvent 객체의 `detail` 속성으로 배열로 노출됩니다.


#### 슬롯 {#slots}


컴포넌트 내부에서 슬롯은 평소처럼 `<슬slot롯/>` 요소를 사용하여 렌더링할 수 있습니다. 하지만 결과 요소를 소비할 때는 [네이티브 슬롯 구문](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)만 허용합니다:

- [Scoped slots](/guide/components/slots.html#scoped-slots)는 지원하지 않습니다.

- 명명된 슬롯을 전달할 때는 `v-slot` 지시어 대신 `슬롯` 속성을 사용하십시오:

  ```vue-html
  <my-element>
    <div slot="named">hello</div>
  </my-element>
  ```

#### Provide / Inject {#provide-inject}

The [Provide / Inject API](/guide/components/provide-inject.html#provide-inject) and its [Composition API equivalent](/api/composition-api-dependency-injection.html#provide) also work between Vue-defined custom elements. However, note that this works **only between custom elements**. i.e. a Vue-defined custom element won't be able to inject properties provided by a non-custom-element Vue component.

### SFC as Custom Element {#sfc-as-custom-element}

`defineCustomElement` also works with Vue Single-File Components (SFCs). However, with the default tooling setup, the `<style>` inside the SFCs will still be extracted and merged into a single CSS file during production build. When using an SFC as a custom element, it is often desirable to inject the `<style>` tags into the custom element's shadow root instead.

The official SFC toolings support importing SFCs in "custom element mode" (requires `@vitejs/plugin-vue@^1.4.0` or `vue-loader@^16.5.0`). An SFC loaded in custom element mode inlines its `<style>` tags as strings of CSS and exposes them under the component's `styles` option. This will be picked up by `defineCustomElement` and injected into the element's shadow root when instantiated.

To opt-in to this mode, simply end your component file name with `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// convert into custom element constructor
const ExampleElement = defineCustomElement(Example)

// register
customElements.define('my-example', ExampleElement)
```

If you wish to customize what files should be imported in custom element mode (for example, treating _all_ SFCs as custom elements), you can pass the `customElement` option to the respective build plugins:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### Tips for a Vue Custom Elements Library {#tips-for-a-vue-custom-elements-library}

When building custom elements with Vue, the elements will rely on Vue's runtime. There is a ~16kb baseline size cost depending on how many features are being used. This means it is not ideal to use Vue if you are shipping a single custom element - you may want to use vanilla JavaScript, [petite-vue](https://github.com/vuejs/petite-vue), or frameworks that specialize in small runtime size. However, the base size is more than justifiable if you are shipping a collection of custom elements with complex logic, as Vue will allow each component to be authored with much less code. The more elements you are shipping together, the better the trade-off.

If the custom elements will be used in an application that is also using Vue, you can choose to externalize Vue from the built bundle so that the elements will be using the same copy of Vue from the host application.

It is recommended to export the individual element constructors to give your users the flexibility to import them on-demand and register them with desired tag names. You can also export a convenience function to automatically register all elements. Here's an example entry point of a Vue custom element library:

```js
import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// export individual elements
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

If you have many components, you can also leverage build tool features such as Vite's [glob import](https://vitejs.dev/guide/features.html#glob-import) or webpack's [`require.context`](https://webpack.js.org/guides/dependency-management/#requirecontext) to load all components from a directory.

## Web Components vs. Vue Components {#web-components-vs-vue-components}

Some developers believe that framework-proprietary component models should be avoided, and that exclusively using Custom Elements makes an application "future-proof". Here we will try to explain why we believe that this is an overly simplistic take on the problem.

There is indeed a certain level of feature overlap between Custom Elements and Vue Components: they both allow us to define reusable components with data passing, event emitting, and lifecycle management. However, Web Components APIs are relatively low-level and bare-bones. To build an actual application, we need quite a few additional capabilities which the platform does not cover:

- A declarative and efficient templating system;

- A reactive state management system that facilitates cross-component logic extraction and reuse;

- A performant way to render the components on the server and hydrate them on the client (SSR), which is important for SEO and [Web Vitals metrics such as LCP](https://web.dev/vitals/). Native custom elements SSR typically involves simulating the DOM in Node.js and then serializing the mutated DOM, while Vue SSR compiles into string concatenation whenever possible, which is much more efficient.

Vue's component model is designed with these needs in mind as a coherent system.

With a competent engineering team, you could probably build the equivalent on top of native Custom Elements - but this also means you are taking on the long-term maintenance burden of an in-house framework, while losing out on the ecosystem and community benefits of a mature framework like Vue.

There are also frameworks built using Custom Elements as the basis of their component model, but they all inevitably have to introduce their proprietary solutions to the problems listed above. Using these frameworks entails buying into their technical decisions on how to solve these problems - which, despite what may be advertised, doesn't automatically insulate you from potential future churns.

There are also some areas where we find custom elements to be limiting:

- Eager slot evaluation hinders component composition. Vue's [scoped slots](/guide/components/slots.html#scoped-slots) are a powerful mechanism for component composition, which can't be supported by custom elements due to native slots' eager nature. Eager slots also mean the receiving component cannot control when or whether to render a piece of slot content.

- Shipping custom elements with shadow DOM scoped CSS today requires embedding the CSS inside JavaScript so that they can be injected into shadow roots at runtime. They also result in duplicated styles in markup in SSR scenarios. There are [platform features](https://github.com/whatwg/html/pull/4898/) being worked on in this area - but as of now they are not yet universally supported, and there are still production performance / SSR concerns to be addressed. In the meanwhile, Vue SFCs provide [CSS scoping mechanisms](/api/sfc-css-features.html) that support extracting the styles into plain CSS files.

Vue will always stay up to date with the latest standards in the web platform, and we will happily leverage whatever the platform provides if it makes our job easier. However, our goal is to provide solutions that work well and work today. That means we have to incorporate new platform features with a critical mindset - and that involves filling the gaps where the standards fall short while that is still the case.
