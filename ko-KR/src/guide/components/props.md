:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Props

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Free Vue.js Props Lesson"/>
</div>

## Props Declaration
## Props 선언

Vue components require explicit props declaration so that Vue knows what external props passed to the component should be treated as fallthrough attributes (which will be discussed in the next section).

Vue 컴포넌트는 명시적인 props 선언을 요구하는데, 이렇게 함으로써 외부에서 컴포넌트에 props를 넘길 때 어떤 속성이 fallthrough 속성으로 처리되어야 하는지 알수 있습니다. (다음 섹션에서 설명함).

<div class="composition-api">

In SFCs using `<script setup>`, props can be declared using the `defineProps()` macro:

`<script setup>`을 사용하는 SFC에서 `defineProps()` 매크로를 사용하여 props를 선언할 수 있습니다.

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

In non-`<script setup>` components, props are declared using the [`props`](/api/options-state.html#props) option:

`<script setup>`를 사용하지 않는 컴포넌트에서는 [`props`](/api/options-state.html#props) 옵션을 통해 props를 선언합니다:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  }
}
```

Notice the argument passed to `defineProps()` is the same as the value provided to the `props` options: the same props options API is shared between the two declaration styles.

`defineProps()`에 전달된 인자는 `props` 옵션에 제공된 값과 동일합니다. 두 선언 스타일은 동일한 props 옵션을 사용합니다. 

</div>

<div class="options-api">

Props are declared using the [`props`](/api/options-state.html#props) option:

[`props`](/api/options-state.html#props) 옵션을 통해 props를 선언합니다:

```js
export default {
  props: ['foo'],
  created() {
    // props are exposed on `this`
    console.log(this.foo)
  }
}
```

</div>

In addition to declaring props using an array of strings, we can also use the object syntax:

문자열 배열을 사용하여 props를 선언하는 것 외에도 객체 구문을 사용할 수도 있습니다:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// in <script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// in non-<script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

For each property in the object declaration syntax, the key is the name of the prop, while the value should be the constructor function of the expected type.

객체 형태로 선언 될때 객체 속성의 키는 props의 이름이 되며, 객체 속성의 값은 원하는 타입의 값을 생성하는 함수이여야 합니다. 

This not only documents your component, but will also warn other developers using your component in the browser console if they pass the wrong type. We will discuss more details about [prop validation](#prop-validation) further down this page.

타입을 지정하는 것은 컴포넌트 문서화에도 역활을 하지만, 실제로 서화할 뿐만 아니라 컴포넌트를 사용하는 다른 개발자가 잘못된 유형을 전달하는 경우 브라우저 콘솔에서 경고를 출력합니다. [prop validation](#prop-validation)에 대한 자세한 내용은 이 페이지 아래에서 더 자세히 설명하겠습니다.

<div class="options-api">

See also: [Typing Component Props](/guide/typescript/options-api.html#typing-component-props) <sup class="vt-badge ts" />

참조: [컴포넌트 props에 타입 지정하기](/guide/typescript/options-api.html#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

If you are using TypeScript with `<script setup>`, it's also possible to declare props using pure type annotations:

TypeScript를 `<script setup>`과 함께 사용하는 경우 순수 타입 주석을 사용하여 props를 선언하는 것도 가능합니다.

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

More details: [Typing Component Props](/guide/typescript/composition-api.html#typing-component-props) <sup class="vt-badge ts" />

더 자세한 내용: [컴포넌트 props에 타입 지정하기](/guide/typescript/options-api.html#typing-component-props) <sup class="vt-badge ts" />

</div>

## Prop Passing Details
## prop 전달에 대한 상세

### Prop Name Casing
### Props 명 케이싱

We declare long prop names using camelCase because this avoids having to use quotes when using them as property keys, and allows us to reference them directly in template expressions because they are valid JavaScript identifiers:

긴 속성명을 선언할때 사용 할 때 `obj["kebab-case"]` 같이 키에 따옴표로 사용하는것을 피하기 위해 카멜 케이스(camelCase, `obj.camelCase`) 를 사용합니다. 이렇게 선언된 속성명은 유효한 자바스크립트 식별자라서 템플릿 표현식에서 바로 참조해서 사용 할 수 있습니다. 

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

Technically, you can also use camelCase when passing props to a child component (except in [DOM templates](/guide/essentials/component-basics.html#dom-template-parsing-caveats)). However, the convention is using kebab-case in all cases to align with HTML attributes:

기술적으로 하위 컴포넌트에 props을 전달할 때 camelCase를 사용할 수 있습니다([DOM 템플릿](/guide/essentials/component-basics.html#dom-template-parsing-caveats) 제외). 하지만 HTML의 관례(Convention)는 모든 HTML 속성은 케밥-케이스(kebab-case)를 이여야 한다는 것입니다. 

```vue-html
<MyComponent greeting-message="hello" />
```

We use [PascalCase for component tags](/guide/components/registration.html#component-name-casing) when possible because it improves template readability by differentiating Vue components from native elements. However, there isn't as much practical benefits for using camelCase when passing props, so we choose to follow each language's conventions.


[Vue 컴포넌트 태그에 PascalCase](/guide/components/registration.html#component-name-casing)를 적용 하면 네이티브 앨리먼트와 Vue 컴포넌트가 잘 구분 되기 때문에 HTML 관례와 다르지만 파스칼 케이스(PaseCase)를 사용합니다. 하지만 props에 camelCase를 사용하는것은 실질적인 이점이 많지 않기 때문에 HTML의 관례인 케밥케이스(kebab-case)를 따르기로 했습니다. 

### Static vs. Dynamic Props
### 정적  vs. 동적 Props

So far, you've seen props passed as static values, like in:

지금까지 정적인 값으로 전달된 props 예제들을 보았습니다:

```vue-html
<BlogPost title="My journey with Vue" />
```

You've also seen props assigned dynamically with `v-bind` or its `:` shortcut, such as in:

그리고 `v-bind` 또는 `:` 단축어를 사용하여 동적으로 할당된 props도 보았습니다:

```vue-html
<!-- Dynamically assign the value of a variable -->
<!-- 변수의 값을 동적으로 할당 -->
<BlogPost :title="post.title" />

<!-- Dynamically assign the value of a complex expression -->
<!-- 복잡한 표현식의 값을 동적으로 할당 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Passing Different Value Types
### 다양한 타입의 값 전달

In the two examples above, we happen to pass string values, but _any_ type of value can be passed to a prop.

위의 두 가지 예제에서 문자열 값을 전달했지만, 사실 어떤 타입의 값이던 props로 전달할 수 있습니다.

#### Number
#### 숫자

```vue-html
<!-- Even though `42` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.       -->
<!-- `42`는 정적인 값이지만 Vue에게 이것이 문자열이 아닌 자바스크립트 표현식임을 알려주는 v-bind를 사용해야 합니다.  -->
<BlogPost :likes="42" />

<!-- Dynamically assign to the value of a variable. -->
<!-- 변수의 값을 동적으로 할당 -->
<BlogPost :likes="post.likes" />
```

#### Boolean


```vue-html
<!-- Including the prop with no value will imply `true`. -->
<!-- 값이 없는 props는 `true`로 포함됩니다. -->
<BlogPost is-published />

<!-- Even though `false` is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.          -->
<!-- `false`는 정적인 값이지만 Vue에게 이것이 문자열이 아닌 자바스크립트  표현식임을 알려주는 v-bind를 사용해야 합니다.  -->
<BlogPost :is-published="false" />

<!-- Dynamically assign to the value of a variable. -->
<!-- 변수의 값을 동적으로 할당 -->
<BlogPost :is-published="post.isPublished" />
```

#### Array
#### 배열

```vue-html
<!-- Even though the array is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.            -->
<!-- 배열은  정적인 값이지만 Vue에게 이것이 문자열이 아닌 자바스크립트  표현식임을 알려주는 v-bind를 사용해야 합니다.  -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Dynamically assign to the value of a variable. -->
<!-- 변수의 값을 동적으로 할당 -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Object

```vue-html
<!-- Even though the object is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.             -->
<!-- 객체는  정적인 값이지만 Vue에게 이것이 문자열이 아닌 자바스크립트  표현식임을 알려주는 v-bind를 사용해야 합니다.  -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Dynamically assign to the value of a variable. -->
<!-- 변수의 값을 동적으로 할당 -->
<BlogPost :author="post.author" />
```

### Binding Multiple Properties Using an Object
### 객체를 이용해서 여러 속성을 바인딩하기

If you want to pass all the properties of an object as props, you can use [`v-bind` without an argument](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) (`v-bind` instead of `:prop-name`). For example, given a `post` object:

객체의 모든 속성을 props로 전달하려면 [인자 없이 `v-bind`](/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes) 를 사용할수 있습니다. (`v -bind` 대신 `:prop-name`). 예를 들어 `post` 객체가 주어지면:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

</div>

The following template:

다음 템플릿은:

```vue-html
<BlogPost v-bind="post" />
```

Will be equivalent to:

다음과 같은 내용입니다:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## One-Way Data Flow
## 단방향 데이터 흐름


All props form a **one-way-down binding** between the child property and the parent one: when the parent property updates, it will flow down to the child, but not the other way around. This prevents child components from accidentally mutating the parent's state, which can make your app's data flow harder to understand.

모든 props는 자식 속성과 부모 속성 사이에 **단방향 하향 바인딩**을 형성합니다. 부모 속성이 업데이트되면 자식으로 흐르지만 그 반대는 아닙니다. 이렇게 하면 자식 컴포넌트가 실수로 부모의 상태를 변경하여 앱의 데이터 흐름을 이해하기 어렵게 만드는 것을 방지할 수 있습니다.

In addition, every time the parent component is updated, all props in the child component will be refreshed with the latest value. This means you should **not** attempt to mutate a prop inside a child component. If you do, Vue will warn you in the console:

또한 상위 컴포넌트가 업데이트될 때마다 하위 컴포넌트의 모든 props가 최신 값으로 새로 고쳐집니다. 즉, 자식 컴포넌트 내부의 props를 변경하려고 시도 **해서는 안 됩니다**. 그렇게 하면 Vue는 콘솔에서 다음과 같이 경고합니다.

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ warning, props are readonly!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ warning, props are readonly!
    this.foo = 'bar'
  }
}
```

</div>

There are usually two cases where it's tempting to mutate a prop:

일반적으로 prop을 변경하고 싶은 두 가지 경우가 있습니다.

1. **The prop is used to pass in an initial value; the child component wants to use it as a local data property afterwards.** In this case, it's best to define a local data property that uses the prop as its initial value:

1. **prop은 초기 값을 전달하는 데 사용됩니다. 자식 컴포넌트는 나중에 이 값을 로컬 데이터 속성으로 사용하려고 합니다.** 이 경우 prop을 초기 값으로 사용하는 로컬 데이터 속성을 정의하는 것이 가장 좋습니다.

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter only uses props.initialCounter as the initial value;
   // it is disconnected from future prop updates.
   // counter는  props.initialCounter 를 초기값을 위해서만 사용합니다;
   // 추후 props가 갱신되어도 연결 되지 않습니다. 
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter only uses this.initialCounter as the initial value;
         // it is disconnected from future prop updates.
         // counter 는  props.initialCounter 를 초기값을 위해서만 사용합니다;
         // 추후 props가 갱신되어도 연결 되지 않습니다. 
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **The prop is passed in as a raw value that needs to be transformed.** In this case, it's best to define a computed property using the prop's value:

2. **props는 변환이 필요한 원시 값으로 전달됩니다.** 이 경우 prop의 값을 사용하여 계산된 속성을 정의하는 것이 가장 좋습니다.

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // computed property that auto-updates when the prop changes
   // prop이 변경되면 자동으로 computed property 이 갱신됩니다. 
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // computed property that auto-updates when the prop changes
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Mutating Object / Array Props
### 객체/배열 props 갱신하기


When objects and arrays are passed as props, while the child component cannot mutate the prop binding, it **will** be able to mutate the object or array's nested properties. This is because in JavaScript objects and arrays are passed by reference, and it is unreasonably expensive for Vue to prevent such mutations.

개체와 배열이 props로 전달되면 자식 컴포넌트는 prop 바인딩을 변경할 수 없지만 **객체 또는 배열의 중첩 속성을 변경할 수 있습니다**. 이것은 자바스크립트에서 객체와 배열이 참조로 전달되고 Vue가 이런 변경까지 방지하는 것은 너무 큰 비용이 들기 때문에 수행 하지 않습니다. 

The main drawback of such mutations is that it allows the child component to affect parent state in a way that isn't obvious to the parent component, potentially making it more difficult to reason about the data flow in the future. As a best practice, you should avoid such mutations unless the parent and child are tightly coupled by design. In most cases, the child should [emit an event](/guide/components/events.html) to let the parent perform the mutation.

이러한 변경의 주요 단점은 하위 컴포넌트가 상위 컴포넌트에 명확하지 않은 방식으로 상위 상태에 영향을 미치게 하여 잠재적으로 향후 데이터 흐름에 대해 추론하기 어렵게 만든다는 것입니다. 가장 좋은 방법은 부모와 자식이 의도적으로 밀접하게 연결되어 있지 않는 한 이러한 변경을 피하는 것입니다. 대부분의 경우 자식은 부모가 변경을 수행할 수 있도록 [이벤트 emit](/guide/components/events.html)를 수행해야 합니다.

## Prop Validation
## Prop 검증

Components can specify requirements for their props, such as the types you've already seen. If a requirement is not met, Vue will warn you in the browser's JavaScript console. This is especially useful when developing a component that is intended to be used by others.

컴포넌트는 이미 본 유형과 같은 props에 대한 요구 사항을 지정할 수 있습니다. 요구 사항이 충족되지 않으면 Vue는 브라우저의 JavaScript 콘솔에서 경고합니다. 이것은 다른 사람이 사용하도록 의도된 컴포넌트를 개발할 때 특히 유용합니다.

To specify prop validations, you can provide an object with validation requirements to the <span class="composition-api">`defineProps()` macro</span><span class="options-api">`props` option</span>, instead of an array of strings. For example:

Props 유효성 검사를 지정하려면 문자열 배열 대신 <span class="composition-api">`defineProps()` 매크로</span><span class="options-api">`props` 옵션</span>에 유효성 검사 요구 사항이 있는 개체를 제공할 수 있습니다. 예를 들어:


<div class="composition-api">

```js
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)

  // 기본 타입 체크
  //  (`null` and `undefined` 은 모든 타입에서 허용됩니다)
  propA: Number,
  // Multiple possible types
  // 복수의 허용타입
  propB: [String, Number],
  // Required string
  // 문자열 필수
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  // 기본값을 가지는 숫자형
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  // 기본값을 가지는 객체
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    // 객체나 배열에 대한 기본값은 항상 팩토리 함수를 통해 기본값을 반환해야 합니다. 
    default() {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  // 커스텀 검증 함수
  propF: {
    validator(value) {
      // The value must match one of these strings
      // 값은 다음 문자열 중에 있어야 함
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  // 기본 값을 가지는 함수
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    // 객체나 배열처럼 이 내용은 팩토리 함수가 아닙니다. 기본값인 함수입니다. (타입이 함수이기 때문입니다)
    default() {
      return 'Default function'
    }
  }
})
```

:::tip
Code inside the `defineProps()` argument **cannot access other variables declared in `<script setup>`**, because the entire expression is moved to an outer function scope when compiled.
:::

:::tip
`defineProps()` 인수 내부의 코드는 **`<script setup>`에서 선언된 다른 변수에 액세스할 수 없습니다**. 컴파일할 때 전체 표현식이 외부 함수 범위로 이동되기 때문입니다.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Basic type check
  //  (`null` and `undefined` values will allow any type)

  // 기본 타입 체크
  //  (`null` and `undefined` 은 모든 타입에서 허용됩니다)
  propA: Number,
  // Multiple possible types
  // 복수의 허용타입
  propB: [String, Number],
  // Required string
  // 문자열 필수
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  // 기본값을 가지는 숫자형
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  // 기본값을 가지는 객체
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    // 객체나 배열에 대한 기본값은 항상 팩토리 함수를 통해 기본값을 반환해야 합니다. 
    default() {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  // 커스텀 검증 함수
  propF: {
    validator(value) {
      // The value must match one of these strings
      // 값은 다음 문자열 중에 있어야 함
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  // 기본 값을 가지는 함수
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    // 객체나 배열처럼 이 내용은 팩토리 함수가 아닙니다. 기본값인 함수입니다. (타입이 함수이기 때문입니다)
    default() {
      return 'Default function'
    }
  }
  }
}
```

</div>

Additional details:

추가 상세:

- All props are optional by default, unless `required: true` is specified.

- `required: true`가 지정되지 않는 한 모든 prop은 기본적으로 선택 사항(optional)입니다.

- An absent optional prop will have `undefined` value.
- 선택 사항(optional)인 prop을 누락되었다면 `undefined`를 값으로 가지게 됩니다. 

- If a `default` value is specified, it will be used if the resolved prop value is `undefined` - this includes both when the prop is absent, or an explicit `undefined` value is passed.
- `default` 값이 지정되면  prop 값이 `undefined`로 해소(resolve) 될 경우 경우 `default` 값이 사용됩니다. prop이 누락 되었거나 명시적으로  `undefined` 값이 전달되는 경우가 모두 포함됩니다.

When prop validation fails, Vue will produce a console warning (if using the development build).

prop 유효성 검사에 실패하면 Vue는 콘솔에 경고를 출력합니다. (개발 빌드를 사용하는 경우).


<div class="composition-api">

If using [Type-based props declarations](/api/sfc-script-setup.html#typescript-only-features), Vue will try its best to compile the type annotations into equivalent runtime prop declarations. For example, `defineProps<{ msg: string }>` will be compiled into `{ msg: { type: String, required: true }}`.

[타입 기반 props 선언](/api/sfc-script-setup.html#typescript-only-features)을 사용하는 경우 Vue는 타입 주석을 적절한 런타임 prop 선언으로 컴파일하기 위해 최선을 다할 것입니다. 예를 들어 `defineProps<{ msg: string }>`는 `{ msg: { type: String, required: true }}`로 컴파일됩니다.

</div>
<div class="options-api">

::: tip Note
Note that props are validated **before** a component instance is created, so instance properties (e.g. `data`, `computed`, etc.) will not be available inside `default` or `validator` functions.
:::

::: tip 참고
props는 컴포넌트 인스턴스가 생성되기 **전에** 검증되므로 인스턴스 속성(예: `data`, `computed` 등)은 `default` 또는 `validator` 함수 내에서 사용할 수 없습니다.
:::

</div>

### Runtime Type Checks
### 런타임 타입 점검

The `type` can be one of the following native constructors:

`type`은 다음 기본 생성자 중 하나일 수 있습니다:


- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

In addition, `type` can also be a custom class or constructor function and the assertion will be made with an `instanceof` check. For example, given the following class:

또한 `type`은 사용자 정의 클래스 또는 생성자 함수일 수도 있으며 assertion은  `instanceof` 검사로 만들어집니다. 예를 들어, 다음 클래스가 주어졌을 때:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

You could use it as a prop's type:

props 타입으로 사용할수 있습니다:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

to validate that the value of the `author` prop was created with `new Person`.

`author` prop가  `new Person` 로 만들어진 객체인지 검증합니다.

## Boolean Casting
## Boolean 캐스팅

Props with `Boolean` type has special casting rules to mimic the behavior of native boolean attributes. Given a `<MyComponent>` with the following declaration:

`Boolean` 유형의 rops에는 기본 boolean 속성의 동작을 모방하는 특수 캐스팅 규칙이 있습니다. 다음 선언과 함께 `<MyComponent>`가 제공됩니다.

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

The component can be used like this:

컴포넌트를 다음처럼 사용할수 있습니다:

```vue-html
<!-- equivalent of passing :disabled="true" -->
<!-- :disabled="true" 으로 주는것과 동일합니다  -->
<MyComponent disabled />

<!-- equivalent of passing :disabled="false" -->
<!-- :disabled="false" 으로 주는것과 동일합니다  -->
<MyComponent />
```

When a prop is declared to allow multiple types, e.g.

prop이 여러 타입을 가질수 있게 선언되었다면, 예를 들어:

<div class="composition-api">

```js
defineProps({
  disabled: [Boolean, Number]
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```

</div>

The casting rules for `Boolean` will apply regardless of type appearance order.


타입 선언 순서와 상관없이 `Boolean` 타입 규칙이 적용됩니다. 
