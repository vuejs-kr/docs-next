---
outline: deep
---

:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Fallthrough Attributes
# 대체(Fallthrough) 속성


> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

## Attribute Inheritance
## 속성 상속

A "fallthrough attribute" is an attribute or `v-on` event listener that is passed to a component, but is not explicitly declared in the receiving component's [props](./props) or [emits](./events.html#declaring-emitted-events). Common examples of this include `class`, `style`, and `id` attributes.

"대체(fallthrough) 속성"은 컴포넌트에 전달되지만 수신 컴포넌트의 [props](./props) 또는 [emit](./events.html#declaring-emitted-events)에 명시적으로 선언되지 않은 속성 또는 `v-on` 이벤트 리스너입니다. 일반적인 예로는 `class`, `style`, `id` 속성이 있습니다.

When a component renders a single root element, fallthrough attributes will be automatically added to the root element's attributes. For example, given a `<MyButton>` component with the following template:

컴포넌트가 단일 루트 앨리먼트를 렌더링하면 대체 속성이 루트 앨리먼트의 속성에 자동으로 추가됩니다. 예를 들어 다음 템플릿이 있는 `<MyButton>` 컴포넌트가 있다고 가정합니다.

```vue-html
<!-- template of <MyButton> -->
<button>click me</button>
```

And a parent using this component with:

부모 컴포넌트에서 다음처럼 사용하면:

```vue-html
<MyButton class="large" />
```

The final rendered DOM would be:

최종 DOM은 이렇게 렌더링 됩니다:

```html
<button class="large">click me</button>
```

### `class` and `style` Merging
### `class`, `style` 병합

If the child component's root element already has existing `class` or `style` attributes, it will be merged with the `class` and `style` values that are inherited from the parent. Suppose we change the template of `<MyButton>` in the previous example to:

하위 컴포넌트의 루트 앨리먼트에 이미 기존 `class` 또는 `style` 속성이 있는 경우 상위 앨리먼트에서 상속된 `class` 및 `style` 값과 병합됩니다. 이전 예에서 `<MyButton>`의 템플릿을 다음과 같이 변경한다면:

```vue-html
<!-- template of <MyButton> -->
<button class="btn">click me</button>
```

Then the final rendered DOM would now become:

최종 렌더링된 DOM이 다음 처럼 바뀝니다:

```html
<button class="btn large">click me</button>
```

### `v-on` Listener Inheritance
### `v-on` 리스너 상속

The same rule applies to `v-on` event listeners:

동일한 규칙이  `v-on` 이벤트 리스너에도 적용됩니다:

```vue-html
<MyButton @click="onClick" />
```

The `click` listener will be added to the root element of `<MyButton>`, i.e. the native `<button>` element. When the native `<button>` is clicked, it will trigger the `onClick` method of the parent component. If the native `<button>` already has a `click` listener bound with `v-on`, then both listeners will trigger.

`click` 리스너는 `<MyButton>`의 루트 앨리먼트, 즉 기본 `<button>` 앨리먼트에 추가됩니다. 기본 `<button>`을 클릭하면 상위 컴포넌트의 `onClick` 메소드가 트리거됩니다. 기본 `<button>`에 이미 `v-on`으로 바인딩된 `click` 리스너가 있는 경우 두 리스너가 모두 트리거됩니다.

### Nested Component Inheritance

### 중첩된 컴포넌트 상속

If a component renders another component as its root node, for example, we refactored `<MyButton>` to render a `<BaseButton>` as its root:

예를 들어 컴포넌트가 다른 컴포넌트를 루트 노드로 렌더링하는 경우 `<MyButton>`을 리팩터링하여 `<BaseButton>`을 루트로 렌더링합니다.

```vue-html
<!-- template of <MyButton/> that simply renders another component -->
<BaseButton />
```

Then the fallthrough attributes received by `<MyButton>` will be automatically forwarded to `<BaseButton>`.


그러면 `<MyButton>`이 수신한 대체 속성이 자동으로 `<BaseButton>`으로 전달됩니다.

Note that:

참조: 

1. Forwarded attributes do not include any attributes that are declared as props, or `v-on` listeners of declared events by `<MyButton>` - in other words, the declared props and listeners have been "consumed" by `<MyButton>`.

1. 전달된 속성에는 props로 선언된 속성이나 `<MyButton>`에 의해 선언된 이벤트의 `v-on` 리스너가 포함되지 않습니다. 즉, 선언된 props와 리스너는 `<MyButton>`에 의해 "소비"되었습니다. .

2. Forwarded attributes may be accepted as props by `<BaseButton>`, if declared by it.

2. 전달된 속성은 `<BaseButton>`에 의해 선언된 경우 props 로 허용될 수 있습니다.

## Disabling Attribute Inheritance
## 속성 상속 비활성화 하기

If you do **not** want a component to automatically inherit attributes, you can set `inheritAttrs: false` in the component's options.

컴포넌트가 속성을 자동으로 상속하지 **않도록** 하려면 컴포넌트 옵션에서 `inheritAttrs: false`를 설정하면 됩니다. 

<div class="composition-api">

If using `<script setup>`, you will need to declare this option using a separate, normal `<script>` block:

`<script setup>`를 사용중이라면, 별로도 분리된 , `<script>` 블럭에서 이 옵션을 선언해야 합니다 :


```vue
<script>
// 일반  <script>  블럭을 이용하여 옵션 선언 
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup logic
</script>
```

</div>

The common scenario for disabling attribute inheritance is when attributes need to be applied to other elements besides the root node. By setting the `inheritAttrs` option to `false`, you can take full control over where the fallthrough attributes should be applied.

속성 상속을 비활성화하는 일반적인 시나리오는 루트 노드 이외의 다른 앨리먼트에 속성을 적용해야 하는 경우입니다. `inheritAttrs` 옵션을 `false`로 설정하면 대체 속성을 적용해야 하는 위치를 완전히 제어할 수 있습니다.

These fallthrough attributes can be accessed directly in template expressions as `$attrs`:

이러한 대체 속성은 템플릿 표현식에서 `$attrs`로 직접 액세스할 수 있습니다:

```vue-html
<span>Fallthrough attributes: {{ $attrs }}</span>
```

The `$attrs` object includes all attributes that are not declared by the component's `props` or `emits` options (e.g., `class`, `style`, `v-on` listeners, etc.).

`$attrs` 객체에는 컴포넌트의 `props` 또는 `emits` 옵션(예: `class`, `style`, `v-on` 리스너 등)으로 선언되지 않은 모든 속성이 포함됩니다.

Some notes:

참고: 

- Unlike props, fallthrough attributes preserve their original casing in JavaScript, so an attribute like `foo-bar` needs to be accessed as `$attrs['foo-bar']`.
- props와 달리 대체 속성은 JavaScript에서 원래 대소문자를 유지하므로 `foo-bar`와 같은 속성은 `$attrs['foo-bar']`로 액세스해야 합니다.

- A `v-on` event listener like `@click` will be exposed on the object as a function under `$attrs.onClick`.
- `@click`과 같은 `v-on` 이벤트 리스너는 `$attrs.onClick` 라는 이름의 함수로 객체에 노출됩니다.

Using our `<MyButton>` component example from the [previous section](#attribute-inheritance) - sometimes we may need to wrap the actual `<button>` element with an extra `<div>` for styling purposes:

[이전 섹션](#attribute-inheritance)의 `<MyButton>` 컴포넌트 예제에서 처럼 - 때로는 실제 `<button>` 앨리먼트를 스타일 지정을 위해 추가 `<div>`로 래핑해야 할 수도 있습니다.

```vue-html
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

We want all fallthrough attributes like `class` and `v-on` listeners to be applied to the inner `<button>`, not the outer `<div>`. We can achieve this with `inheritAttrs: false` and `v-bind="$attrs"`:

여기에서  `class` 및 `v-on` 리스너와 같은 모든 대체 속성이 외부 `<div>`가 아닌 내부 `<button>`에 적용되기를 원합니다. `inheritAttrs: false` 로 설정하고  `v-bind="$attrs"`로 건내 주어 달성할 수 있습니다.

```vue-html{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

Remember that [`v-bind` without an argument](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) binds all the properties of an object as attributes of the target element.

[인자없는 `v-bind`](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes)는 객체의 모든 속성을 대상 앨리먼트의 속성으로 바인딩합니다.

## Attribute Inheritance on Multiple Root Nodes
## 다중 루트 노드에서 속성 상속


Unlike components with a single root node, components with multiple root nodes do not have an automatic attribute fallthrough behavior. If `$attrs` are not bound explicitly, a runtime warning will be issued.

단일 루트 노드가 있는 컴포넌트와 달리 여러 루트 노드가 있는 컴포넌트에는 자동 속성 폴스루 동작이 없습니다. `$attrs`가 명시적으로 바인딩되지 않은 경우 런타임 경고가 발행됩니다.

```vue-html
<CustomLayout id="custom-layout" @click="changeValue" />
```

If `<CustomLayout>` has the following multi-root template, there will be a warning because Vue cannot be sure where to apply the fallthrough attributes:

`<CustomLayout>`에 다음과 같은 다중 루트 템플릿이 있는 경우 Vue가 대체 속성을 적용할 위치를 확신할 수 없기 때문에 경고가 표시됩니다:

```vue-html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

The warning will be suppressed if `$attrs` is explicitly bound:

`$attrs`가 명시적으로 바인딩된 경우 경고가 표시되지 않습니다:


```vue-html{2}
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

## Accessing Fallthrough Attributes in JavaScript
## 자바스크립트에서 대체  속성에 접근하기

<div class="composition-api">

If needed, you can access a component's fallthrough attributes in `<script setup>` using the `useAttrs()` API:

필요한 경우 `useAttrs()` API를 사용하여 `<script setup>`에서 컴포넌트의 대체 속성에 액세스할 수 있습니다.

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

If not using `<script setup>`, `attrs` will be exposed as a property of the `setup()` context:

`<script setup>`을 사용하지 않으면 `attrs`가 `setup()` 컨텍스트의 속성으로 노출됩니다.


```js
export default {
  setup(props, ctx) {
    // fallthrough attributes are exposed as ctx.attrs
    // 대체속성은 ctx.attrs 으로 노출됩니다
    console.log(ctx.attrs)
  }
}
```

Note that although the `attrs` object here always reflect the latest fallthrough attributes, it isn't reactive (for performance reasons). You cannot use watchers to observe its changes. If you need reactivity, use a prop. Alternatively, you can use `onUpdated()` to perform side effects with latest `attrs` on each update.

알아두어야 할것은,  `attrs` 객체는 항상 최신 대체 속성을 반영하지만 반응하지 않습니다(성능상의 이유로). 감시자를 사용하여 변경 사항을 관찰할 수 없습니다. 반응성이 필요하면 prop을 사용하세요. 또는 `onUpdated()`를 사용하여 각 업데이트에서 최신 `attrs`로 부작용(side-effect)을 수행할 수 있습니다.

</div>

<div class="options-api">

If needed, you can access a component's fallthrough attributes via the `$attrs` instance property:

필요한 경우 `$attrs` 인스턴스 속성을 통해 컴포넌트의 대체 속성에 액세스할 수 있습니다.

```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```

</div>
