# 렌더 함수 APIs {#render-function-apis}

## h() {#h}

가상 DOM 노드(vnode)를 생성합니다.

- **타입**:

  ```ts
  // 전체 시그니쳐
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // omitting props
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > 가독성을 위해 유형이 단순화되었습니다.

- **세부 사항**:

  첫 번째 인수는 문자열(네이티브 엘리먼트의 경우) 또는 Vue 컴포넌트 정의일 수 있습니다. 두 번째 인수는 전달할 소품이고, 세 번째 인수는 자식입니다.

  컴포넌트 vnode를 생성할 때, 자식은 슬롯 함수로 전달되어야 합니다. 컴포넌트가 기본 슬롯만 기대하는 경우 단일 슬롯 함수를 전달할 수 있습니다. 그렇지 않으면 슬롯을 슬롯 함수의 객체로 전달해야 합니다.

  편의상 자식이 슬롯 객체가 아닌 경우 props 인수를 생략할 수 있습니다.

- **예제**:

  네이티브 요소 만들기:
  Creating native elements:

  ```js
  import { h } from 'vue'

  // 유형을 제외한 모든 인수는 선택 사항입니다.
  // all arguments except the type are optional
  h('div')
  h('div', { id: 'foo' })

  // 속성과 프로퍼티를 모두 소품에 사용할 수 있습니다. Vue가 자동으로 올바른 할당 방법을 선택합니다.
  // both attributes and properties can be used in props
  // Vue automatically picks the right way to assign it
  h('div', { class: 'bar', innerHTML: 'hello' })

  // 클래스와 스타일은 템플릿에서와 같이 동일한 객체/배열 값을 지원합니다.
  // class and style have the same object/array value support like in templates
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // 이벤트 리스너는 onXxx로 전달되어야 합니다.
  // event listeners should be passed as onXxx
  h('div', { onClick: () => {} })

  // 자식은 문자열일 수 있습니다.
  // children can be a string
  h('div', { id: 'foo' }, 'hello')

  // 소품이 없는 경우 소품 생략 가능
  // props can be omitted when there are no props
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // 자식 배열은 혼합 노드와 문자열을 포함할 수 있습니다.
  // children array can contain mixed vnodes and strings
  h('div', ['hello', h('span', 'hello')])
  ```

  컴포넌트 만들기:
  Creating components:

  ```js
  import Foo from './Foo.vue'

  // passing props
  h(Foo, {
    // equivalent of some-prop="hello"
    someProp: 'hello',
    // equivalent of @update="() => {}"
    onUpdate: () => {}
  })

  // passing single default slot
  h(Foo, () => 'default slot')

  // passing named slots
  // notice the `null` is required to avoid
  // slots object being treated as props
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **참고**: [가이드 - Render Functions - Creating VNodes](/guide/extras/render-function.html#creating-vnodes)

## mergeProps() {#mergeprops}

특정 소품에 대한 특수 처리를 사용하여 여러 소품 개체를 병합합니다.

- **타입**:

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **세부 사항**:

  `mergeProps()`는 다음 프로퍼티에 대한 특수 처리를 통해 여러 프로퍼티 객체를 병합하는 것을 지원합니다:

  - `class`
  - `style`
  - `onXxx` 이벤트 리스너 - 같은 이름을 가진 여러 리스너가 배열로 병합됩니다.
  - `onXxx` event listeners - multiple listeners with the same name will be merged into an array.

  병합 동작이 필요하지 않고 간단한 덮어쓰기를 원하는 경우 네이티브 객체 스프레드를 대신 사용할 수 있습니다.

- **예제**:

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

vnode를 복제합니다. 

Clones a vnode.

- **타입**:

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **세부 사항**:

  원본과 병합할 추가 프로퍼티와 함께 복제된 vnode를 반환합니다.

  V노드는 한 번 생성되면 변경할 수 없는 것으로 간주해야 하며, 기존 V노드의 프로퍼티를 변경해서는 안 됩니다. 대신 다른/추가 프로퍼티로 복제하세요.

  V노드에는 특별한 내부 속성이 있으므로 복제하는 것은 객체 스프레드만큼 간단하지 않습니다. cloneVNode()`는 대부분의 내부 로직을 처리합니다.

- **예제**:

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

값이 v노드인지 확인합니다.

- **타입**:

  ```ts
  function isVNode(value: unknown): boolean
  ```
## resolveComponent() {#resolvecomponent}


등록된 컴포넌트를 이름으로 수동으로 확인합니다.

- **타입**:

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **세부 사항**:

  **참고: 컴포넌트를 직접 임포트할 수 있는 경우에는 이 작업이 필요하지 않습니다.**

  올바른 컴포넌트 컨텍스트에서 확인하려면 <span class="composition-api">`setup()`  또는 </span> 렌더 함수 내부에서 `resolveComponent()`를  호출해야 합니다.

  컴포넌트를 찾을 수 없는 경우 런타임 경고가 발생하고 이름 문자열이 반환됩니다.

- **예제**:

  <div class="composition-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  const { h, resolveComponent } = Vue

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```
  </div>

- **참고**: [가이드 - Render Functions - Components](/guide/extras/render-function.html#components)

## resolveDirective() {#resolvedirective}

등록된 지시문을 이름으로 수동으로 확인합니다.

For manually resolving a registered directive by name.

- **타입**:

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **세부 사항**:

  **참고: 컴포넌트를 직접 임포트할 수 있는 경우에는 이 작업이 필요하지 않습니다.**
  **Note: you do not need this if you can import the component directly.**

  올바른 컴포넌트 컨텍스트에서 해결하려면 `resolveDirective()`를 `setup()` 또는 렌더링 함수 내부에서 호출해야 합니다.

  지시어를 찾을 수 없으면 런타임 경고가 발생하고 함수는 `undefined`을 반환합니다.

  `resolveDirective()` must be called inside<span class="composition-api"> either `setup()` or</span> the render function in order to resolve from the correct component context.

  If the directive is not found, a runtime warning will be emitted, and the function returns `undefined`.

- **참고**: [가이드 - Render Functions - Custom Directives](/guide/extras/render-function.html#custom-directives)

## withDirectives() {#withdirectives}

노드에 사용자 지정 지시문을 추가합니다.

For adding custom directives to vnodes.

- **타입**:

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **세부 사항**:

  기존 vnode를 사용자 정의 지시어로 래핑합니다. 두 번째 인자는 사용자지시어의 배열입니다. 각 사용자 정의 지시어는 `[지시어, 값, 인자, 수정자]` 형식의 배열로 표현됩니다. 배열의 꼬리 요소는 필요하지 않은 경우 생략할 수 있습니다.

  Wraps an existing vnode with custom directives. The second argument is an array of custom directives. Each custom directive is also represented as an array in the form of `[Directive, value, argument, modifiers]`. Tailing elements of the array can be omitted if not needed.

- **예제**:

  ```js
  import { h, withDirectives } from 'vue'

  // a custom directive
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **참고**: [가이드 - Render Functions - Custom Directives](/guide/extras/render-function.html#custom-directives)

## withModifiers()  {#withmodifiers}

이벤트 핸들러 함수에 내장된 [`v-on` 수정자](/guide/essentials/event-handling.html#event-modifiers)를 추가하려면 다음과 같이 하세요.

For adding built-in [`v-on` modifiers](/guide/essentials/event-handling.html#event-modifiers) to an event handler function.

- **타입**:

  ```ts
  function withModifiers(fn: Function, modifiers: string[]): Function
  ```

- **예제**:

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // equivalent of v-on.stop.prevent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **참고**: [가이드 - Render Functions - Event Modifiers](/guide/extras/render-function.html#event-modifiers)
