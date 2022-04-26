:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Components Basics

# 컴포넌트 기초

Components allow us to split the UI into independent and reusable pieces, and think about each piece in isolation. It's common for an app to be organized into a tree of nested components:

컴포넌트를 사용하면 UI를 독립적이고 재사용 가능한 부분으로 분할하고 각 부분을 독립시켜 고려할수 있습니다. 애플리케이션을 중첩된 컴포넌트의 트리로 분해하여 구성하는 것은 매우 일반적인 설계입니다. 


![Component Tree](./images/components.png)

<!-- https://www.figma.com/file/qa7WHDQRWuEZNRs7iZRZSI/components -->

This is very similar to how we nest native HTML elements, but Vue implements its own component model that allow us to encapsulate custom content and logic in each component. Vue also plays nicely with native Web Components. If you are curious about the relationship between Vue Components and native Web Components, [read more here](/guide/extras/web-components.html).

네이티브 HTML 엘리먼트를 중첩시키는 것과 유사하지만, Vue는 자체 컴포넌트 모델을 통해 컴포넌트에 사용자 정의 콘텐츠와 논리를 캡슐화 합니다. Vue는 네이티브 웹 컴포넌트와도 잘 작동합니다. Vue 컴포넌트와 네이티브 웹 컴포넌트 간의 관계가 궁금하시다면 [여기에서 자세히 읽어보세요](/guide/extras/web-components.html).


## Defining a Component
## 컴포넌트 정의

When using a build step, we typically define each Vue component in a dedicated file using the `.vue` extension - known as a [Single-File Component](/guide/scaling-up/sfc.html) (SFC for short):

빌드 단계를 사용하면 일반적으로 [싱글 파일 컴포넌트](/guide/scaling-up/sfc.html)(줄여서 SFC)라고 하는 `.vue` 확장자를 사용하는 전용 파일에 각 Vue 컴포넌트를 정의합니다:


<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

</div>

When not using a build step, a Vue component can be defined as a plain JavaScript object containing Vue-specific options:

빌드 단계를 사용하지 않을 때 Vue 컴포넌트는 Vue 관련 옵션을 포함하는 일반 JavaScript 객체로 정의할 수 있습니다.


<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

</div>
<div class="composition-api">

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // or `template: '#my-template-element'`
}
```

</div>

The template is inlined as a JavaScript string here, which Vue will compile on the fly. You can also use an ID selector pointing to an element (usually native `<template>` elements) - Vue will use its content as the template source.

템플릿은 Vue가 즉석에서 컴파일할 JavaScript 문자열로 인라인됩니다. 엘리먼트(보통 기본 `<template>` 엘리먼트)를 가리키는 ID 셀렉터를 사용할 수도 있습니다. Vue는 해당 콘텐츠를 템플릿 소스로 사용합니다.

The example above defines a single component and exports it as the default export of a `.js` file, but you can use named exports to export multiple components from the same file.

위의 예는 단일 컴포넌트를 정의하고 이를 `.js` 파일의 기본 내보내기로 내보냅니다. 그러나 명명된 내보내기를 사용하여 동일한 파일에서 여러 컴포넌트를 내보낼 수 있습니다.


## Using a Component
## 컴포넌트 사용하기

:::tip
We will be using SFC syntax for the rest of this guide - the concepts around components are the same regardless of whether you are using a build step or not. The [Examples](/examples/) section shows component usage in both scenarios.
:::

:::tip
이 가이드의 나머지 부분에서는 SFC 구문을 사용할 것입니다. 컴포넌트에 대한 개념은 빌드 단계를 사용하는지 여부에 관계없이 동일합니다. [예제](/examples/) 섹션은 두 시나리오 모두에서 컴포넌트 사용을 보여줍니다.
:::

To use a child component, we need to import it in the parent component. Assuming we placed our counter component inside a file called `ButtonCounter.vue`, the component will be exposed as the file's default export:

자식 컴포넌트를 사용하려면 부모 컴포넌트에서 가져와야 합니다. `ButtonCounter.vue`라는 파일 안에 카운터 컴포넌트를 배치했다고 가정하면 컴포넌트는 파일의 default export로 노출됩니다.


<div class="options-api">

```vue
<script>
import ButtonCounter from './ButtonCounter.vue'

export default {
  components: {
    ButtonCounter
  }
}
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

To expose the imported component to our template, we need to [register](/guide/components/registration.html) it with the `components` option. The component will then be available as a tag using the key it is registered under.

가져온 컴포넌트를 템플릿에 노출하려면 `components` 옵션을 사용하여 [등록](/guide/components/registration.html)해야 합니다. 그러면 컴포넌트는 등록된 키를 사용하여 태그로 사용할 수 있습니다.


</div>

<div class="composition-api">

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

With `<script setup>`, imported components are automatically made available to the template.


`<script setup>`을 사용하면 가져온 컴포넌트를 템플릿에서 자동으로 사용할 수 있습니다.

</div>

It's also possible to globally register a component, making it available to all components in a given app without having to import it. The pros and cons of global vs. 
local registration is discussed in the dedicated [Component Registration](/guide/components/registration.html) section.

컴포넌트를 전역적으로 등록하여 가져올 필요 없이 지정된 앱의 모든 컴포넌트에서 사용할 수 있도록 하는 것도 가능합니다. 글로벌 및 로컬 등록의 장단점은 전용 [컴포넌트 등록](/guide/components/registration.html) 섹션에서 설명합니다.

Components can be reused as many times as you want:

컴포넌트는 원하는 만큼 재사용할 수 있습니다:


```vue-html
<h1>Here are many child components!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7XG4gICAgQnV0dG9uQ291bnRlclxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvdW50OiAwXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBCdXR0b25Db3VudGVyIGZyb20gJy4vQnV0dG9uQ291bnRlci52dWUnXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8aDE+SGVyZSBhcmUgbWFueSBjaGlsZCBjb21wb25lbnRzITwvaDE+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG5cdDxCdXR0b25Db3VudGVyIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJCdXR0b25Db3VudGVyLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGNvdW50ID0gcmVmKDApXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImNvdW50KytcIj5cbiAgICBZb3UgY2xpY2tlZCBtZSB7eyBjb3VudCB9fSB0aW1lcy5cbiAgPC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

</div>

Notice that when clicking on the buttons, each one maintains its own, separate `count`. That's because each time you use a component, a new **instance** of it is created.

버튼을 클릭할 때 각 버튼은 별도의 `count`를 유지합니다. 컴포넌트를 사용할 때마다 해당 컴포넌트의 새 **인스턴스**가 생성되기 때문입니다.


In SFCs, it's recommended to use `PascalCase` tag names for child components to differentiate from native HTML elements. Although native HTML tag names are case-insensitive, Vue SFC is a compiled format so we are able to use case-sensitive tag names in it. We are also able to use `/>` to close a tag.

SFC에서는 네이티브 HTML 엘리먼트와 구별하기 위해 자식 컴포넌트에 `PascalCase` 태그 이름을 사용하는 것이 좋습니다. 기본 HTML 태그 이름은 대소문자를 구분하지 않지만 Vue SFC는 컴파일된 형식이므로 대소문자 구분 태그 이름을 사용할 수 있습니다. 또한 `/>`를 사용하여 태그를 닫을 수 있습니다.


If you are authoring your templates directly in a DOM (e.g. as the content of a native `<template>` element), the template will be subject to the browser's native HTML parsing behavior. In such cases, you will need to use `kebab-case` and explicit closing tags for components:

템플릿을 DOM에서 직접 작성하는 경우(예: 기본 `<template>` 엘리먼트의 콘텐츠로) 템플릿은 브라우저의 기본 HTML 구문 분석 동작을 따릅니다. 이러한 경우 컴포넌트에 `kebab-case` 및 명시적 닫는 태그를 사용해야 합니다.


```vue-html
<!-- if this template is written in the DOM -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

See [DOM template parsing caveats](#dom-template-parsing-caveats) for more details.

자세한 내용은 [DOM 템플릿 구문 분석 주의 사항](#dom-template-parsing-caveats)을 참조하세요.


## Passing Props

## Props 전달하기

If we are building a blog, we will likely need a component representing a blog post. We want all the blog posts to share the same visual layout, but with different content. Such a component won't be useful unless you can pass data to it, such as the title and content of the specific post we want to display. That's where props come in.

블로그를 구축하는 경우 블로그 게시물을 나타내는 컴포넌트가 필요할 수 있습니다. 우리는 모든 블로그 게시물이 동일한 시각적 레이아웃을 공유하기를 원하지만 콘텐츠는 다릅니다. 이러한 컴포넌트는 표시하려는 특정 게시물의 제목 및 콘텐츠와 같은 데이터를 전달할 수 없으면 유용하지 않습니다. 소품이 들어가는 곳입니다.


Props are custom attributes you can register on a component. To pass a title to our blog post component, we must declare it in the list of props this component accepts, using the <span class="options-api">[`props`](/api/options-state.html#props) option</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span>:

Props are custom attributes you can register on a component. To pass a title to our blog post component, we must declare it in the list of props this component accepts, using the [`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits) macro:

Props은 컴포넌트에 등록할 수 있는 사용자 정의 속성입니다. 블로그 게시물 컴포넌트에 제목을 전달하려면 <span class="options-api">[`props`](/api/options-state.html#props) option</span><span class="composition-api">[`defineProps`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span>를 사용하여 이 컴포넌트가 허용하는 props 목록에서 제목을 선언해야 합니다.

<div class="options-api">

```vue
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

When a value is passed to a prop attribute, it becomes a property on that component instance. The value of that property is accessible within the template and on the component's `this` context, just like any other component property.

값이 prop 속성에 전달되면 해당 컴포넌트 인스턴스의 속성이 됩니다. 해당 속성의 값은 다른 컴포넌트 속성과 마찬가지로 템플릿 내에서 그리고 컴포넌트의 `this` 컨텍스트에서 액세스할 수 있습니다.


</div>
<div class="composition-api">

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps` is a compile-time macro that is only available inside `<script setup>` and does not need to be explicitly imported. Declared props are automatically exposed to the template. `defineProps` also returns an object that contains all the props passed to the component, so that we can access them in JavaScript if needed:

`defineProps`는 `<script setup>` 내에서만 사용할 수 있는 컴파일 타임 매크로이며 명시적으로 가져올 필요가 없습니다. 선언된 소품은 템플릿에 자동으로 노출됩니다. `defineProps`는 또한 컴포넌트에 전달된 모든 props를 포함하는 객체를 반환하므로 필요한 경우 JavaScript에서 액세스할 수 있습니다.


```js
const props = defineProps(['title'])
console.log(props.title)
```

See also: [Typing Component Props](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

If you are not using `<script setup>`, props should be declared using the `props` option, and the props object will be passed to `setup()` as the first argument:

`<script setup>`을 사용하지 않는 경우 props는 `props` 옵션을 사용하여 선언해야 하며 props 객체는 첫 번째 인자로 `setup()`에 전달됩니다.

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

</div>

A component can have as many props as you like and, by default, any value can be passed to any prop.

컴포넌트는 원하는 만큼 props를 가질 수 있으며 기본적으로 모든 값을 모든 prop에 전달할 수 있습니다.


Once a prop is registered, you can pass data to it as a custom attribute, like this:

prop가 등록되면 다음과 같이 데이터를 사용자 정의 속성으로 전달할 수 있습니다.


```vue-html
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

In a typical app, however, you'll likely have an array of posts in your parent component:

그러나 일반적인 앱에서는 상위 컴포넌트에 게시물 배열이 있을 수 있습니다.

<div class="options-api">

```js
export default {
  // ...
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ]
    }
  }
}
```

</div>
<div class="composition-api">

```js
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
```

</div>

Then want to render a component for each one, using `v-for`:

```vue-html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiBbJ3RpdGxlJ11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoND57eyB0aXRsZSB9fTwvaDQ+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxCbG9nUG9zdFxuICBcdHYtZm9yPVwicG9zdCBpbiBwb3N0c1wiXG5cdCAgOmtleT1cInBvc3QuaWRcIlxuICBcdDp0aXRsZT1cInBvc3QudGl0bGVcIlxuXHQ+PC9CbG9nUG9zdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

Notice how we can use `v-bind` to pass dynamic props. This is especially useful when you don't know the exact content you're going to render ahead of time.

동적 props을 전달하기 위해 `v-bind`를 사용하는 방법에 주목하세요. 이것은 미리 렌더링할 정확한 콘텐츠를 모를 때 특히 유용합니다.


That's all you need to know about props for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Props](/guide/components/props.html).

지금은 props에 대해 알아야 할 전부입니다. 하지만 이 페이지를 다 읽고 내용에 익숙해지면 나중에 다시 돌아와 [Props](/guide/components/props.html)의 전체 가이드를 읽는 것이 좋습니다. 


## Listening to Events
## 이벤트 듣기

As we develop our `<BlogPost>` component, some features may require communicating back up to the parent. For example, we may decide to include an accessibility feature to enlarge the text of blog posts, while leaving the rest of the page at its default size.

`<BlogPost>` 컴포넌트를 개발할 때 일부 기능은 상위 항목과 다시 통신해야 할 수 있습니다. 예를 들어, 페이지의 나머지 부분은 기본 크기로 유지하면서 블로그 게시물의 텍스트를 확대하는 접근성 기능을 포함하기로 결정할 수 있습니다.


In the parent, we can support this feature by adding a `postFontSize` <span class="options-api">data property</span><span class="composition-api">ref</span>:

부모에서 `postFontSize` <span class="options-api">data property</span><span class="composition-api">ref</span>를 추가하여 이 기능을 지원할 수 있습니다:


<div class="options-api">

```js{6}
data() {
  return {
    posts: [
      /* ... */
    ],
    postFontSize: 1
  }
}
```

</div>
<div class="composition-api">

```js{5}
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

</div>

Which can be used in the template to control the font size of all blog posts:

템플릿에서 모든 블로그 게시물의 글꼴 크기를 제어하는 ​​데 사용할 수 있습니다.


```vue-html{1,7}
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>
```

Now let's add a button to the `<BlogPost>` component's template:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Enlarge text</button>
  </div>
</template>
```

The button currently doesn't do anything yet - we want clicking the button to communicate to the parent that it should enlarge the text of all posts. To solve this problem, component instances provide a custom events system. The parent can choose to listen to any event on the child component instance with `v-on` or `@`, just as we would with a native DOM event:

버튼은 현재 아무 작업도 수행하지 않습니다. 버튼을 클릭하여 모든 게시물의 텍스트를 확대해야 한다는 사실을 부모에게 전달하고자 합니다. 이 문제를 해결하기 위해 컴포넌트 인스턴스는 사용자 지정 이벤트 시스템을 제공합니다. 부모는 네이티브 DOM 이벤트와 마찬가지로 `v-on` 또는 `@`를 사용하여 자식 컴포넌트 인스턴스의 모든 이벤트를 수신하도록 선택할 수 있습니다.


```vue-html{3}
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />
```

Then the child component can emit an event on itself by calling the built-in [**`$emit`** method](/api/component-instance.html#emit), passing the name of the event:

```vue{5}
<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

Thanks to the `@enlarge-text="postFontSize += 0.1"` listener, the parent will receive the event and update the value of `postFontSize`.

`@enlarge-text="postFontSize += 0.1"` 리스너 덕분에 부모는 이벤트를 수신하고 `postFontSize` 값을 업데이트합니다.


<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBCbG9nUG9zdFxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3N0czogW1xuICAgICAgICB7IGlkOiAxLCB0aXRsZTogJ015IGpvdXJuZXkgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDIsIHRpdGxlOiAnQmxvZ2dpbmcgd2l0aCBWdWUnIH0sXG4gICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnV2h5IFZ1ZSBpcyBzbyBmdW4nIH1cbiAgICAgIF0sXG4gICAgICBwb3N0Rm9udFNpemU6IDFcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOnN0eWxlPVwieyBmb250U2l6ZTogcG9zdEZvbnRTaXplICsgJ2VtJyB9XCI+XG4gICAgPEJsb2dQb3N0XG4gICAgICB2LWZvcj1cInBvc3QgaW4gcG9zdHNcIlxuICAgICAgOmtleT1cInBvc3QuaWRcIlxuICAgICAgOnRpdGxlPVwicG9zdC50aXRsZVwiXG4gICAgICBAZW5sYXJnZS10ZXh0PVwicG9zdEZvbnRTaXplICs9IDAuMVwiXG4gICAgPjwvQmxvZ1Bvc3Q+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQmxvZ1Bvc3QudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IFsndGl0bGUnXSxcbiAgZW1pdHM6IFsnZW5sYXJnZS10ZXh0J11cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJibG9nLXBvc3RcIj5cblx0ICA8aDQ+e3sgdGl0bGUgfX08L2g0PlxuXHQgIDxidXR0b24gQGNsaWNrPVwiJGVtaXQoJ2VubGFyZ2UtdGV4dCcpXCI+RW5sYXJnZSB0ZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>
<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuL0Jsb2dQb3N0LnZ1ZSdcbiAgXG5jb25zdCBwb3N0cyA9IHJlZihbXG4gIHsgaWQ6IDEsIHRpdGxlOiAnTXkgam91cm5leSB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMiwgdGl0bGU6ICdCbG9nZ2luZyB3aXRoIFZ1ZScgfSxcbiAgeyBpZDogMywgdGl0bGU6ICdXaHkgVnVlIGlzIHNvIGZ1bicgfVxuXSlcblxuY29uc3QgcG9zdEZvbnRTaXplID0gcmVmKDEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8ZGl2IDpzdHlsZT1cInsgZm9udFNpemU6IHBvc3RGb250U2l6ZSArICdlbScgfVwiPlxuICAgIDxCbG9nUG9zdFxuICAgICAgdi1mb3I9XCJwb3N0IGluIHBvc3RzXCJcbiAgICAgIDprZXk9XCJwb3N0LmlkXCJcbiAgICAgIDp0aXRsZT1cInBvc3QudGl0bGVcIlxuICAgICAgQGVubGFyZ2UtdGV4dD1cInBvc3RGb250U2l6ZSArPSAwLjFcIlxuICAgID48L0Jsb2dQb3N0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkJsb2dQb3N0LnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5kZWZpbmVQcm9wcyhbJ3RpdGxlJ10pXG5kZWZpbmVFbWl0cyhbJ2VubGFyZ2UtdGV4dCddKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdFwiPlxuICAgIDxoND57eyB0aXRsZSB9fTwvaDQ+XG4gICAgPGJ1dHRvbiBAY2xpY2s9XCIkZW1pdCgnZW5sYXJnZS10ZXh0JylcIj5FbmxhcmdlIHRleHQ8L2J1dHRvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>

We can optionally declare emitted events using the <span class="options-api">[`emits`](/api/options-state.html#emits) option</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup.html#defineprops-defineemits) macro</span>:

<span class="options-api">[`emits`](/api/options-state.html#emits) 옵션</span><span class="composition-api">[`defineEmits`](/api/sfc-script-setup.html#defineprops-defineemits) 매크로</span>을 사용하여 방출된 이벤트를 선택적으로 선언할 수 있습니다.


<div class="options-api">

```vue{5}
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```

</div>
<div class="composition-api">

```vue{4}
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

</div>

This documents all the events that a component emits and optionally [validates them](/guide/components/events.html#events-validation). It also allows Vue to avoid implicitly applying them as native listeners to the child component's root element.

<div class="composition-api">

Similar to `defineProps`, `defineEmits` is also only usable in `<script setup>` and doesn't need to be imported. It returns an `emit` function that can be used to emit events in JavaScript code:

```js
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
```

See also: [Typing Component Emits](/guide/typescript/composition-api.html#typing-component-emits) <sup class="vt-badge ts" />

If you are not using `<script setup>`, you can declare emitted events using the `emits` option. You can access the `emit` function as a property of the setup context (passed to `setup()` as the second argument):

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

</div>

That's all you need to know about custom component events for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Custom Events](/guide/components/events).

지금은 이것이 사용자 정의 컴포넌트 이벤트에 대해 알아야 할 전부입니다. 그러나 이 페이지를 읽고 내용에 익숙해지면 나중에 다시 돌아와 [사용자 정의 이벤트](/guide/components/events)를 읽어 보세요.


## Content Distribution with Slots
## 슬롯을 이용한 컨텐츠 배포

Just like with HTML elements, it's often useful to be able to pass content to a component, like this:

HTML 엘리먼트와 마찬가지로 다음과 같이 컴포넌트에 콘텐츠를 전달할 수 있으면 종종 유용합니다:

```vue-html
<AlertBox>
  Something bad happened.
</AlertBox>
```

Which might render something like:

다음과 같이 렌더링할 수 있습니다:

:::danger This is an Error for Demo Purposes
Something bad happened.
:::

:::danger 데모용 오류입니다.
Something bad happened.
:::

This can be achieved using Vue's custom `<slot>` element:

이것은 Vue의 사용자 정의 `<slot>` 엘리먼트를 사용하여 달성할 수 있습니다"


```vue{4}
<template>
  <div class="alert-box">
    <strong>Error!</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

As you'll see above, we use the `<slot>` as a placeholder where we want the content to go – and that's it. We're done!


위에서 볼 수 있듯이 콘텐츠를 이동하려는 자리 표시자로 `<slot>`을 사용합니다. 끝!

<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbiAgXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQWxlcnRCb3ggfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PEFsZXJ0Qm94PlxuICBcdFNvbWV0aGluZyBiYWQgaGFwcGVuZWQuXG5cdDwvQWxlcnRCb3g+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJBbGVydEJveC52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJhbGVydC1ib3hcIj5cbiAgICA8c3Ryb25nPkVycm9yITwvc3Ryb25nPlxuICAgIDxici8+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuLmFsZXJ0LWJveCB7XG4gIGNvbG9yOiAjNjY2O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbn1cbiAgXG5zdHJvbmcge1xuXHRjb2xvcjogcmVkOyAgICBcbn1cbjwvc3R5bGU+In0=)

</div>
<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBBbGVydEJveCBmcm9tICcuL0FsZXJ0Qm94LnZ1ZSdcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxBbGVydEJveD5cbiAgXHRTb21ldGhpbmcgYmFkIGhhcHBlbmVkLlxuXHQ8L0FsZXJ0Qm94PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQWxlcnRCb3gudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYWxlcnQtYm94XCI+XG4gICAgPHN0cm9uZz5FcnJvciE8L3N0cm9uZz5cbiAgICA8YnIvPlxuICAgIDxzbG90IC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5hbGVydC1ib3gge1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XG59XG4gIFxuc3Ryb25nIHtcblx0Y29sb3I6IHJlZDsgICAgXG59XG48L3N0eWxlPiJ9)

</div>

That's all you need to know about slots for now, but once you've finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on [Slots](/guide/components/slots).

지금은 이것이 슬롯에 대해 알아야 할 전부입니다. 그러나 이 페이지를 다 읽고 내용에 익숙해지면 나중에 다시 돌아와서 [슬롯](/guide/components/slots)에 대한 전체 가이드를 읽는 것이 좋습니다.


## Dynamic Components
## 동적 컴포넌트

Sometimes, it's useful to dynamically switch between components, like in a tabbed interface:

때로는 탭 인터페이스와 같이 컴포넌트 간에 동적으로 전환하는 것이 유용합니다.


<div class="options-api">

[Open example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuICBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEhvbWUsXG4gICAgUG9zdHMsXG4gICAgQXJjaGl2ZVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50VGFiOiAnSG9tZScsXG4gICAgICB0YWJzOiBbJ0hvbWUnLCAnUG9zdHMnLCAnQXJjaGl2ZSddXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cInRhYiBpbiB0YWJzXCJcbiAgICAgICA6a2V5PVwidGFiXCJcbiAgICAgICA6Y2xhc3M9XCJbJ3RhYi1idXR0b24nLCB7IGFjdGl2ZTogY3VycmVudFRhYiA9PT0gdGFiIH1dXCJcbiAgICAgICBAY2xpY2s9XCJjdXJyZW50VGFiID0gdGFiXCJcbiAgICAgPlxuICAgICAge3sgdGFiIH19XG4gICAgPC9idXR0b24+XG5cdCAgPGNvbXBvbmVudCA6aXM9XCJjdXJyZW50VGFiXCIgY2xhc3M9XCJ0YWJcIj48L2NvbXBvbmVudD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uZGVtbyB7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIHBhZGRpbmc6IDIwcHggMzBweDtcbiAgbWFyZ2luLXRvcDogMWVtO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgb3ZlcmZsb3cteDogYXV0bztcbn1cblxuLnRhYi1idXR0b24ge1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogM3B4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogM3B4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gIG1hcmdpbi1yaWdodDogLTFweDtcbn1cbi50YWItYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWItYnV0dG9uLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlMGUwZTA7XG59XG4udGFiIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMTBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgSG9tZSBjb21wb25lbnRcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIlBvc3RzLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIFBvc3RzIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiQXJjaGl2ZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBBcmNoaXZlIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="composition-api">

[Open example in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgUG9zdHMgZnJvbSAnLi9Qb3N0cy52dWUnXG5pbXBvcnQgQXJjaGl2ZSBmcm9tICcuL0FyY2hpdmUudnVlJ1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuIFxuY29uc3QgY3VycmVudFRhYiA9IHJlZignSG9tZScpXG5cbmNvbnN0IHRhYnMgPSB7XG4gIEhvbWUsXG4gIFBvc3RzLFxuICBBcmNoaXZlXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZGVtb1wiPlxuICAgIDxidXR0b25cbiAgICAgICB2LWZvcj1cIihfLCB0YWIpIGluIHRhYnNcIlxuICAgICAgIDprZXk9XCJ0YWJcIlxuICAgICAgIDpjbGFzcz1cIlsndGFiLWJ1dHRvbicsIHsgYWN0aXZlOiBjdXJyZW50VGFiID09PSB0YWIgfV1cIlxuICAgICAgIEBjbGljaz1cImN1cnJlbnRUYWIgPSB0YWJcIlxuICAgICA+XG4gICAgICB7eyB0YWIgfX1cbiAgICA8L2J1dHRvbj5cblx0ICA8Y29tcG9uZW50IDppcz1cInRhYnNbY3VycmVudFRhYl1cIiBjbGFzcz1cInRhYlwiPjwvY29tcG9uZW50PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5kZW1vIHtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBtYXJnaW4tdG9wOiAxZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBvdmVyZmxvdy14OiBhdXRvO1xufVxuXG4udGFiLWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMXB4O1xufVxuLnRhYi1idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTBlMGUwO1xufVxuLnRhYi1idXR0b24uYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2UwZTBlMDtcbn1cbi50YWIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiSG9tZS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJ0YWJcIj5cbiAgICBIb21lIGNvbXBvbmVudFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+IiwiUG9zdHMudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidGFiXCI+XG4gICAgUG9zdHMgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJBcmNoaXZlLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRhYlwiPlxuICAgIEFyY2hpdmUgY29tcG9uZW50XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4ifQ==)

</div>

The above is made possible by Vue's `<component>` element with the special `is` attribute:

위의 내용은 Vue의 `<component>` 엘리먼트에 특별한 `is` 속성이 있어 가능합니다.


<div class="options-api">

```vue-html
<!-- Component changes when currentTab changes -->
<component :is="currentTab"></component>
```

</div>
<div class="composition-api">

```vue-html
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

</div>

In the example above, the value passed to `:is` can contain either:
위의 예에서 `:is`에 전달된 값은 다음 중 하나를 포함할 수 있습니다.


- the name string of a registered component, OR
- the actual imported component object
- 등록된 컴포넌트의 이름 문자열, 또는 
- 실제 가져온 컴포넌트 개체

You can also use the `is` attribute to create regular HTML elements.

`is` 속성을 사용하여 일반 HTML 엘리먼트를 만들 수도 있습니다.


When switching between multiple components with `<component :is="...">`, a component will be unmounted when it is switched away from. We can force the inactive components to stay "alive" with the built-in [`<KeepAlive>` component](/guide/built-ins/keep-alive.html).

`<component :is="...">`를 사용하여 여러 컴포넌트 간에 전환할 때 다른 컴포넌트에서 전환되면 컴포넌트가 마운트 해제됩니다. 내장된 [`<KeepAlive>` 컴포넌트](/guide/built-ins/keep-alive.html)를 사용하여 비활성 컴포넌트를 "활성" 상태로 유지하도록 강제할 수 있습니다.

## DOM Template Parsing Caveats
## 
DOM 템플릿 구문 분석 주의 사항

If you are writing your Vue templates directly in the DOM, Vue will have to retrieve the template string from the DOM. This leads to some caveats due to browsers' native HTML parsing behavior.

Vue 템플릿을 DOM에서 직접 작성하는 경우 Vue는 DOM에서 템플릿 문자열을 검색해야 합니다. 이것은 브라우저의 기본 HTML 구문 분석 동작으로 인해 몇 가지 주의 사항으로 이어집니다.


:::tip
It should be noted that the limitations discussed below only apply if you are writing your templates directly in the DOM. They do NOT apply if you are using string templates from the following sources:

- Single-File Components
- Inlined template strings (e.g. `template: '...'`)
- `<script type="text/x-template">`
  :::

:::tip
아래에 설명된 제한 사항은 템플릿을 DOM에서 직접 작성하는 경우에만 적용된다는 점에 유의해야 합니다. 다음 소스의 문자열 템플릿을 사용하는 경우 적용되지 않습니다.

- 싱글 파일 컴포넌트
- 인라인 템플릿 문자열 (e.g. `template: '...'`)
- `<script type="text/x-template">`
  :::

### Case Insensitivity
### 대소문자 구분

HTML tags and attribute names are case-insensitive, so browsers will interpret any uppercase characters as lowercase. That means when you’re using in-DOM templates, PascalCase component names and camelCased prop names or `v-on` event names all need to use their kebab-cased (hyphen-delimited) equivalents:

HTML 태그와 속성 이름은 대소문자를 구분하지 않으므로 브라우저는 대문자를 소문자로 해석합니다. 즉, DOM 내 템플릿을 사용할 때 PascalCase 컴포넌트 이름과 camelCased 소품 이름 또는 `v-on` 이벤트 이름은 모두 케밥 대소문자 구분(하이픈으로 구분)된 등가물을 사용해야 합니다:


```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost']
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```vue-html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

### Self Closing Tags
### Self Closing Tags

We have been using self-closing tags for components in previous code samples:

이전 코드 샘플에서 컴포넌트에 자동 닫기 태그를 사용했습니다: 


```vue-html
<MyComponent />
```

This is because Vue's template parser respects `/>` as an indication to end any tag, regardless of its type.

Vue의 템플릿 파서는 유형에 관계없이 모든 태그를 종료하라는 표시로 `/>`를 존중하기 때문입니다.


In DOM templates, however, we must always include explicit closing tags:

그러나 DOM 템플릿에서는 항상 명시적인 닫는 태그를 포함해야 합니다.


```vue-html
<my-component></my-component>
```

This is because the HTML spec only allows [a few specific elements](https://html.spec.whatwg.org/multipage/syntax.html#void-elements) to omit closing tags, the most common being `<input>` and `<img>`. For all other elements, if you omit the closing tag, the native HTML parser will think you never terminated the opening tag. For example, the following snippet:

HTML 사양은 [몇 가지 특정 엘리먼트](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)만 닫는 태그를 생략할 수 있도록 허용하기 때문입니다. 가장 일반적인 것은 `<input> ` 및 `<img>`. 다른 모든 엘리먼트의 경우 닫는 태그를 생략하면 기본 HTML 파서는 사용자가 여는 태그를 종료하지 않은 것으로 간주합니다. 예를 들어 다음 스니펫:


```vue-html
<my-component /> <!-- we intend to close the tag here... -->
<span>hello</span>
```

will be parsed as:


다음과 같이 구문 분석됩니다.

```vue-html
<my-component>
  <span>hello</span>
</my-component> <!-- but the browser will close it here. -->
```

### Element Placement Restrictions
### 엘리먼트 배치 제한

Some HTML elements, such as `<ul>`, `<ol>`, `<table>` and `<select>` have restrictions on what elements can appear inside them, and some elements such as `<li>`, `<tr>`, and `<option>` can only appear inside certain other elements.

`<ul>`, `<ol>`, `<table>` 및 `<select>`와 같은 일부 HTML 엘리먼트에는 내부에 표시할 수 있는 엘리먼트에 대한 제한이 있으며 `<li>`와 같은 일부 엘리먼트는 `<tr>` 및 `<option>`은 특정 다른 엘리먼트 내부에만 나타날 수 있습니다.


This will lead to issues when using components with elements that have such restrictions. For example:

이러한 제한이 있는 엘리먼트가 있는 컴포넌트를 사용할 때 문제가 발생합니다. 예를 들어:


```vue-html
<table>
  <blog-post-row></blog-post-row>
</table>
```

The custom component `<blog-post-row>` will be hoisted out as invalid content, causing errors in the eventual rendered output. We can use the special [`is` attribute](/api/built-in-special-attributes.html#is) as a workaround:

사용자 정의 컴포넌트 `<blog-post-row>`는 잘못된 콘텐츠로 호이스트되어 최종적으로 렌더링된 출력에서 ​​오류가 발생합니다. 특별한 [`is` 속성](/api/built-in-special-attributes.html#is)을 해결 방법으로 사용할 수 있습니다.



```vue-html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

:::tip
When used on native HTML elements, the value of `is` must be prefixed with `vue:` in order to be interpreted as a Vue component. This is required to avoid confusion with native [customized built-in elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example).
:::

:::tip
기본 HTML 엘리먼트에 사용되는 경우 'is' 값은 Vue 컴포넌트로 해석되기 위해 'vue:' 접두사를 사용해야 합니다. 이는 기본 [맞춤형 내장 엘리먼트](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example)와의 혼동을 피하기 위해 필요합니다.

:::

That's all you need to know about DOM template parsing caveats for now - and actually, the end of Vue's _Essentials_. Congratulations! There's still more to learn, but first, we recommend taking a break to play with Vue yourself - build something fun, or check out some of the [Examples](/examples/) if you haven't already.

그것이 현재로서는 DOM 템플릿 구문 분석 경고에 대해 알아야 할 전부이며 실제로는 Vue의 _Essentials_의 끝입니다. 축하합니다! 아직 배울 것이 더 있지만 먼저 잠시 휴식을 취하여 Vue를 직접 플레이하는 것이 좋습니다. 재미있는 것을 빌드하거나 아직 [예제](/examples/) 중 일부를 확인하지 않은 경우 확인하십시오.


Once you feel comfortable with the knowledge you've just digested, move on with the guide to learn more about components in depth.

방금 소화한 지식에 익숙해지면 가이드를 계속 진행하여 컴포넌트에 대해 자세히 알아보세요.

