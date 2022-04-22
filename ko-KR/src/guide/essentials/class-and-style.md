:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Class and Style Bindings

# 클래스와 스타일 바인딩

A common need for data binding is manipulating an element's class list and its inline styles. Since they are both attributes, we can use `v-bind` to handle them: we only need to calculate a final string with our expressions. However, meddling with string concatenation is annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expressions can also evaluate to objects or arrays.

일반적으로 웹에서 데이터 바인딩을 하고자 하는 요구사항은 엘리먼트가 가지는 클래스의 목록과 인라인 스타일을 조작하는 것입니다. 클래스와 스타일 모두 속성이므로, v-bind를 사용하여 처리할 수 있습니다. 표현식으로 최종 문자열을 계산하기만 하면 됩니다. 그러나 이런 문자열 연결은 여러 방해요소가 있어서 짜증나고  오류가 발생하기 쉽습니다. 그래서 Vue는 class와 style에 v-bind를 사용하면 문자열 외에도 객체나 배열을 표현하는 특별한 기능 강화를 제공합니다. 



## Binding HTML Classes

## HTML 클래스 바인딩


<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### Binding to Objects

### 객체에 바인딩 하기

We can pass an object to `:class` (short for `v-bind:class`) to dynamically toggle classes:

`:class` (`v-bind:class`의 약자)에 객체를 전달하여 클래스를 동적으로 토글 할수 있습니다:

```vue-html
<div :class="{ active: isActive }"></div>
```

The above syntax means the presence of the `active` class will be determined by the [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) of the data property `isActive`.

위 구문은 `active` 클래스의 존재가 데이터 속성 `isActive`의 [진실성(truthiness)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) (opens new window)에 의해 결정됨을 의미합니다.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following state:

객체에 더 많은 필드를 포함하여, 여러 클래스를 전환할 수 있습니다. 또한, `:class` 지시문은 일반 `class` 속성과 공존할 수도 있습니다. 따라서 다음과 같은 형식을 따르게 됩니다:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

And the following template:

다음 템플릿에 따라:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

It will render:

다음과 같이 렌더링 됩니다: 

```vue-html
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become `"static active text-danger"`.

`isActive` 또는 `hasError`가 변경되면 그에 따라 클래스 목록이 업데이트됩니다. 예를 들어, `hasError가` `true가` 되면 클래스 목록은 `"static active text-danger"`가 됩니다.



The bound object doesn't have to be inline:

바인딩 된 객체는 인라인일 필요는 없습니다 :



<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

This will render the same result. We can also bind to a [computed property](./computed) that returns an object. This is a common and powerful pattern:

이것은 동일한 결과를 렌더링합니다. 객체를 반환하는 [computed property](./computed)에 바인딩 할 수도 있습니다. 이것은 일반적으로 강력한 패턴입니다:



<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### Binding to Arrays
### 배열에 바인딩 하기

We can bind `:class` to an array to apply a list of classes:

배열을 `:class`에 전달하여 클래스 목록을 적용할 수 있습니다:



<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

Which will render:

다음처럼 렌더링됩니다:

```vue-html
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

목록의 클래스를 조건부로 전환하려면 삼항 표현식을 사용하여 수행할 수 있습니다:


```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply `errorClass`, but `activeClass` will only be applied when `isActive` is truthy.

이는 항상 `errorClass`를 적용하지만 `isActive`가 `true` 인 경우 `activeClass`만 적용합니다.



However, this can be a bit verbose if you have multiple conditional classes. That's why it's also possible to use the object syntax inside array syntax:

그러나, 여러 조건부 클래스가 있다면 이것은 약간 장황할 수 있습니다. 그렇기 때문에 배열 구문 내에서 객체 구문을 사용할 수도 있습니다:


```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### With Components
### 컴포넌트에서 사용하기

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

> 이 섹션은 [컴포넌트](/guide/essentials/component-basics) 에 대한 지식이 있다고 가정합니다. 건너 뛰고 나중에 다시 보셔도 됩니다.

When you use the `class` attribute on a component with a single root element, those classes will be added to the component's root element, and merged with any existing class already on it.

단일 루트 엘리먼트가 있는 커스텀 컴포넌트에서 `class` 속성을 사용하면 해당 클래스가 이 엘리먼트에 추가됩니다. 이 엘리먼트의 기존 클래스는 덮어 쓰지 않습니다.

단일 루트 요소가 있는 컴포넌트에서 `class` 속성을 사용하면 해당 클래스가 컴포넌트의 루트 요소에 추가되고 이미 있는 기존 클래스와 병합됩니다.


For example, if we have a component named `my-component` with the following template:

예를 들어, 다음 템플릿을 가지는 `my-component` 라는 이름의 컴포넌트를 선언하는 경우:

```vue-html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

Then add some classes when using it:

다음과 같은 클래스를 추가했다면:

```vue-html
<!-- when using the component -->
<my-component class="baz boo"></my-component>
```

The rendered HTML will be:

다음처럼 렌더링됩니다:

```vue-html
<p class="foo bar baz boo">Hi</p>
```

The same is true for class bindings:

이것은 클래스 바인딩을 사용해도 동일합니다: 

```vue-html
<my-component :class="{ active: isActive }"></my-component>
```

When `isActive` is truthy, the rendered HTML will be:

`isActive`가 참이라면 렌더링된 HTML은 다음과 같습니다: 

```vue-html
<p class="foo bar active">Hi</p>
```

If your component has multiple root elements, you would need to define which element will receive this class. You can do this using the `$attrs` component property:

컴포넌트에 여러 루트 요소가 있는 경우 이 클래스를 받을 요소를 정의해야 합니다. `$attrs` 컴포넌트 속성을 사용하여 이 작업을 수행할 수 있습니다.


```vue-html
<!-- my-component template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<my-component class="baz"></my-component>
```

Will render:

다음처럼 렌더링 됩니다:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

You can learn more about component attribute inheritance in [Fallthrough Attributes](/guide/components/attrs.html) section.

[폴 스루 속성](/guide/components/attrs.html) 섹션에서 컴포넌트 속성 상속에 대해 자세히 알아볼 수 있습니다.


## Binding Inline Styles
## 인라인 스타일 바인딩하기

### Binding to Objects
### 객체에 바인딩하기

`:style` supports binding to JavaScript object values - it corresponds to an [HTML element's `style` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

`:style`은 JavaScript 개체 값에 대한 바인딩을 지원합니다. 이는 [HTML 요소의 `style` 속성](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)에 해당합니다.




<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

Although camelCase keys are recommended, `:style` also supports kebab-cased CSS property keys (corresponds to how they are used in actual CSS) - for example:

 `:style`은 camelCase 키 스타일이 권장 권장되지만 케밥-케이스 기반의 CSS 속성 키(실제 CSS에서 사용되는 방식에 해당)도 지원합니다. 예를 들면 다음과 같습니다:


```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

It is often a good idea to bind to a style object directly so that the template is cleaner:

템플릿을 더 깔끔하게 만들기 위해, 스타일 객체에 직접 바인딩하는 것이 좋습니다:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

Again, object style binding is often used in conjunction with computed properties that return objects.

다시 말하지만, 객체 구문의 객체를 반환하는 computed 속성과 함께 자주 사용됩니다.



### Binding to Arrays
### 배열에 바인딩 하기

We can bind `:style` to an array of multiple style objects. These objects will be merged and applied to the same element:

`:style`에 여러 스타일 객체의 배열을 바인딩 할수 있습니다. 각 객체는 머지되어 같은 엘리먼트에 적용됩니다. 


```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing
### 자동 접두사

When you use a CSS property that requires a [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `:style`, Vue will automatically add the appropriate prefix. Vue does this by checking at runtime to see which style properties are supported in the current browser. If the browser doesn't support a particular property then various prefixed variants will be tested to try to find one that is supported.

`:style`에서 [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)가 필요한 CSS 속성을 사용하면 Vue가 자동으로 적절한 접두사를 추가합니다. Vue는 런타임에 현재 브라우저에서 지원되는 스타일 속성을 확인하여 이를 수행합니다. 브라우저가 특정 속성을 지원하지 않으면 다양한 접두사가 붙은 변형을 테스트하여 지원되는 속성을 찾습니다.




### Multiple Values
### 다중 값

You can provide an array of multiple (prefixed) values to a style property, for example:

스타일 속성에 여러(접두사) 값의 배열을 제공할 수 있습니다. 예를 들면 다음과 같습니다:


```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

This will only render the last value in the array which the browser supports. In this example, it will render `display: flex` for browsers that support the unprefixed version of flexbox.

이것은 브라우저가 지원하는 배열의 마지막 값만 렌더링합니다. 이 예에서는 접두사가 없는 버전의 flexbox를 지원하는 브라우저에 대해 `display: flex`를 렌더링합니다.
