:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Component Registration
# 컴포넌트 등록

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Free Vue.js Component Registration Lesson"/>

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

A Vue component needs to be "registered" so that Vue knows where to locate its implementation when it is encountered in a template. There are two ways to register components: global and local.

Vue 컴포넌트는 템플릿에 나왔을 때 Vue가 구현체가 어디에 있는지 알수 있도록 "등록"되어야 합니다. 컴포넌트를 등록하는 방법에는 전역 등록과 지역 등록 두가지 방식이 있습니다. 

## Global Registration
## 전역 등록

We can make components available globally in the current [Vue application](/guide/essentials/application.html) using the `app.component()` method:

현재 [Vue 애플리케이션](/guide/essentials/application.html)에  `app.component()` 메소드를 사용하여 컴포넌트를 전역적으로 등록할수 있습니다. 

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // the registered name
  // 등록될 이름
  'MyComponent',
  // the implementation
  // 구현체
  {
    /* ... */
  }
)
```

If using SFCs, you will be registering the imported `.vue` files:

싱글 파일 컴포넌트를 사용하고 있다면, `.vue`  파일을 임포트하여 등록하면 됩니다:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

The `app.component()` method can be chained:

`app.component()` 메소드는 체이닝 될수 있습니다::

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Globally registered components can be used in the template of any component within this application:

전역적으로 등록된 컴포넌트는 이 응용 프로그램 내의 어떤 컴포넌트의 템플릿에서도 사용할 수 있습니다.

```vue-html
<!-- this will work in any component inside the app -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

This even applies to all subcomponents, meaning all three of these components will also be available _inside each other_.

이는 모든 하위 컴포넌트에도 적용됩니다. 즉, 이 세 컴포넌트 모두 _서로 내부에서_ 사용할 수 있습니다.

## Local Registration
## 지역 등록

While convenient, global registration has a few drawbacks:

전역 등록은 편리 하지만 몇 가지 단점이 있습니다:

1. Global registration prevents build systems from removing unused components (a.k.a "tree-shaking"). If you globally register a component but end up not using it anywhere in your app, it will still be included in the final bundle.


1. 전역 등록은 빌드 시스템이 사용하지 않는 컴포넌트를 제거하는 것을 방지합니다(일명 "트리 쉐이킹"). 컴포넌트를 전역적으로 등록했지만 사용하는 곳에 어디에도 없어도 여전히 최종 번들에 계속 포함됩니다.


2. Global registration makes dependency relationships less explicit in large applications. It makes it difficult to locate a child component's implementation from a parent component using it. This can affect long-term maintainability similar to using too many global variables.

2. 전역 등록은 대규모 응용 프로그램에서 종속 관계를 덜 명시적으로 만듭니다. 그것을 사용하는 부모 컴포넌트에서 자식 컴포넌트의 구현을 찾기가 어렵습니다. 이것은 너무 많은 전역 변수를 사용하는 것과 비슷하게 코드를 오래 유지 보수 할때 나쁜 영향을 미칠수 있습니다. 


Local registration scopes the availability of the registered components to the current component only. It makes the dependency relationship more explicit, and is more tree-shaking friendly.

로컬 등록은 등록된 컴포넌트의 가용성 범위를 현재 컴포넌트로만 제한합니다. 종속 관계를 더 명시적으로 만들고 트리 쉐이킹에 친화적입니다. 

<div class="composition-api">

When using SFC with `<script setup>`, imported components are automatically registered locally:

SFC에서 `<script setup>` 에서 임포트된 컴포넌트는 자동으로 로컬에 등록됩니다. 

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

If not using SFC, you will need to use the `components` option:

SFC를 사용하지 않는다면 `components` 옵션을 사용합니다:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

Local registration is done using the `components` option:

지역 등록이 `components` 옵션으로 수행됩니다:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

For each property in the `components` object, the key will be the registered name of the component, while the value will contain the implementation of the component. The above example is using the ES2015 property shorthand and is equivalent to:

`components` 객체의 각 속성에 대해 키는 컴포넌트의 등록된 이름이 되고 값에는 컴포넌트의 구현이 포함됩니다. 위의 예는 ES2015 속성 약칭을 사용하고 있으며 다음과 동일합니다.

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

Note that **locally registered components are _not_ also available in descendent components**. In this case, `ComponentA` will be made available to the current component only, not any of its child or descendent components.

**로컬로 등록된 컴포넌트는 하위 컴포넌트에서는 사용할 수 _없습니다_**. 이 경우 `ComponentA`는 현재 컴포넌트에서만 사용할 수 있으며 자식 컴포넌트나 하위 컴포넌트는 사용할 수 없습니다.

## Component Name Casing
## 컴포넌트명 표기법

Throughout the guide, we are using PascalCase names when registering components. This is because:

1. PascalCase names are valid JavaScript identifiers. This makes it easier to import and register components in JavaScript. It also helps IDEs with auto-completion.

2. `<PascalCase />` makes it more obvious that this is a Vue component instead of a native HTML element in templates. It also differentiates Vue components from custom elements (web components).

This is the recommended style when working with SFC or string templates. However, as discussed in [DOM Template Parsing Caveats](/guide/essentials/component-basics.html#dom-template-parsing-caveats), PascalCase tags are not usable in DOM templates.

Luckily, Vue supports resolving kebab-case tags to components registered using PascalCase. This means a component registered as `MyComponent` can be referenced in the template via both `<MyComponent>` and `<my-component>`. This allows us to use the same JavaScript component registration code regardless of template source.
