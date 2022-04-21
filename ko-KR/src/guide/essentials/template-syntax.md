:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Template Syntax
# 템플릿 문법

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. All Vue templates are syntactically valid HTML that can be parsed by spec-compliant browsers and HTML parsers.

Vue는 컴포넌트 인스턴스의 데이터를 DOM에 선언적으로 바인딩할수 있는 HTML 기반의 템플릿 문법을 사용합니다. 모든 Vue 템플릿은 표준을 준수하는 브라우저와 HTML 파서에서 파싱될수 있는 문법적으로 유효한 HTML 입니다. 

Under the hood, Vue compiles the templates into highly-optimized JavaScript code. Combined with the reactivity system, Vue is able to intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes.

내부적으로 Vue는 템플릿을 고도로 최적화된 JavaScript 코드로 컴파일합니다. 반응성 시스템과 결합된 Vue는 앱 상태가 변경될 때 다시 렌더링할 컴포넌트의 최소 수를 지능적으로 파악하여, 최소한의 DOM 조작을 적용할 수 있습니다.


If you are familiar with Virtual DOM concepts and prefer the raw power of JavaScript, you can also [directly write render functions](/guide/extras/render-function.html) instead of templates, with optional JSX support. However, do note that they do not enjoy the same level of compile-time optimizations as templates.

Virtual DOM 개념에 익숙하고 JavaScript의 원시 기능을 선호하는 경우 템플릿 대신 JSX 지원 옵션을 사용하여 [렌더링 기능을 직접 작성](/guide/extras/render-function.html)할 수도 있습니다. 그러나 템플릿과 동일한 수준의 컴파일 타임 최적화를 제공하지는 않습니다.


## Text Interpolation
## 텍스트 보간(Text Interpolation)

The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces):

데이터 바인딩의 가장 기본적인 형태는 콧수염 표기법이라고 알려진 "Mustache" 구문(이중 중괄호)을 사용하는 텍스트 보간입니다.


```vue-html
<span>Message: {{ msg }}</span>
```

The mustache tag will be replaced with the value of the `msg` property from the corresponding component instance. It will also be updated whenever the `msg` property changes.

Mustache 태그는 해당 컴포넌트 인스턴스의 `msg` 속성 값으로 대체됩니다. 그리고 `msg` 속성이 변경될 때마다 업데이트됩니다.


## Raw HTML

The double mustaches interprets the data as plain text, not HTML. In order to output real HTML, you will need to use the [`v-html` directive](/api/built-in-directives.html#v-html):

mustache은 데이터를 HTML이 아닌 일반 텍스트로 해석합니다. 실제 HTML을 출력하려면 [`v-html` 디렉티브](/api/built-in-directives.html#v-html)을 사용해야 합니다.


```vue-html
<p>문자열 보간: {{ rawHtml }}</p>
<p>v-html 디렉티브: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">This should be red.</span>'
</script>

<div class="demo">
  <p>문자열 보간: {{ rawHtml }}</p>
  <p>v-html 디렉티브: <span v-html="rawHtml"></span></p>
</div>

Here we're encountering something new. The `v-html` attribute you're seeing is called a **directive**. Directives are prefixed with `v-` to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, we're basically saying "keep this element's inner HTML up-to-date with the `rawHtml` property on the current active instance."

지금 보시는 `v-html` 같은 속성을 **디렉티브**(directive)이라고 합니다. 디렉티브는 Vue에서 제공하는 특수 속성임을 나타내는 접두사 `v-`를 사용하며, 예상하신대로 렌더링된 DOM에 특별한 반응형 행위를 적용합니다. 위의 코드에서는 "현재 활성 인스턴스의 `rawHtml` 속성을 사용하여 이 엘리먼트의 `innerHtml`을 최신 상태로 유지합니다."라는 행위를 수행합니다.


The contents of the `span` will be replaced with the value of the `rawHtml` property, interpreted as plain HTML - data bindings are ignored. Note that you cannot use `v-html` to compose template partials, because Vue is not a string-based templating engine. Instead, components are preferred as the fundamental unit for UI reuse and composition.

`rawHtml` 속성에 저장된 값은 plain HTML로 해석되어 `span`의 내용(`innerHTML`)을 대체 하게 됩니다. 데이터 바인딩은 무시됩니다. Vue는 문자열 기반 템플릿 엔진이 아니기 때문에 `v-html`을 사용하여 템플릿 조각을 작성할 수는 없습니다. UI 재사용 및 구성을 위한 기본 단위로 컴포넌트가 선호됩니다.


:::warning Security Warning
Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS vulnerabilities](https://en.wikipedia.org/wiki/Cross-site_scripting). Only use `v-html` on trusted content and **never** on user-provided content.
:::

:::warning 보안 경고
웹사이트에서 임의의 HTML을 동적으로 렌더링하는 것은 [XSS 취약점](https://en.wikipedia.org/wiki/Cross-site_scripting)으로 쉽게 이어질 수 있기 때문에 매우 위험할 수 있습니다. 신뢰할 수 있는 콘텐츠에만 `v-html`을 사용하고 사용자가 제공한 콘텐츠에는 **절대** 사용하지 마세요.
:::

## Attribute Bindings
## 속성 바인딩

Mustaches cannot be used inside HTML attributes. Instead, use a [`v-bind` directive](/api/built-in-directives.html#v-bind):

Mustache 표기법은 HTML 속성에는 사용 할 수 없습니다. 대신 [`v-bind` 디렉티브](/api/built-in-directives.html#v-bind)를 사용합니다:

```vue-html
<div v-bind:id="dynamicId"></div>
```

The `v-bind` directive instructs Vue to keep the element's `id` attribute in sync with the component's `dynamicId` property. If the bound value is `null` or `undefined`, then the attribute will be removed from the rendered element.

`v-bind` 디렉티브는 엘리먼트의 `id` 속성을 컴포넌트의 `dynamicId` 속성과 동기화된 상태로 유지하도록 Vue에 지시합니다. 바인딩된 값이 `null` 또는 `undefined`이면 속성이 렌더링된 엘리먼트에서 제거됩니다.


### Shorthand
### 단축 표기법

Because `v-bind` is so commonly used, it has a dedicated shorthand syntax:

`v-bind`는 매우 자주 사용되기 때문에 전용 단축 구문이 있습니다:


```vue-html
<div :id="dynamicId"></div>
```

Attributes that start with `:` may look a bit different from normal HTML, but it is in fact a valid character for attribute names and all Vue-supported browsers can parse it correctly. In addition, they do not appear in the final rendered markup. The shorthand syntax is optional, but you will likely appreciate it when you learn more about its usage later.

`:`로 시작하는 속성은 일반 HTML과 약간 다르게 보일 수 있지만 실제로는 HTML 속성명으로 유효한 문자이며 Vue를  지원하는 모든 브라우저에서 올바르게 파싱할수 있습니다. 또한 최종 렌더링된 마크업에는 표시되지 않습니다. 약식 구문은 선택 사항이지만 나중에 사용법에 대해 자세히 알아볼 때 유용할 것입니다.


> For the rest of the guide, we will be using the shorthand syntax in code examples, as that's the most common usage for Vue developers.

> 이후 가이드 문서에서는 단축 구문을 사용해서 예제를 설명하겠습니다.

### Boolean Attributes
### Boolean 속성

[Boolean attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) are attributes that can indicate true / false values by its presence on an element. For example, [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) is one of the most commonly used boolean attributes.

[Boolean 속성](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)은  참/거짓 값을 이용해 엘리먼트 속성 자체의 표시 여부를 나타낼수 있습니다. 예를 들어, [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)는 가장 일반적으로 사용되는 Boolean 속성 중 하나입니다.


`v-bind` works a bit differently in this case:

`v-bind`는 이 경우 약간 다르게 작동합니다:


```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

The `disabled` attribute will be included if `isButtonDisabled` has a [truthy value](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). It will also be included if the value is an empty string, maintaining consistency with `<button disabled="">`. For other falsy values the attribute will be omitted.

`isButtonDisabled`에 [참(truthy) 값](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)이 있는 경우 `disabled` 속성이 포함됩니다. 값이 빈 문자열인 경우에도 포함되어 `<button disabled="">`와 일관성을 유지합니다. 거짓 값의 경우 속성이 생략됩니다.


### Dynamically Binding Multiple Attributes
### 여러 속성에 대해 동적인 바인딩

If you have a JavaScript object representing multiple attributes that looks like this:

다음과 같은 여러 속성을 나타내는 JavaScript 객체가 있는 경우: 

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

You can bind them to a single element by using `v-bind` without an argument:

인자 지정 없이 `v-bind`를 사용하여 단일 엘리먼트에 바인딩할 수 있습니다:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## Using JavaScript Expressions
## 자바스크립트 표현식 사용하기

So far we've only been binding to simple property keys in our templates. But Vue actually supports the full power of JavaScript expressions inside all data bindings:

지금까지는 템플릿의 간단한 속성 키로만 바인딩했습니다. 그러나 Vue는 실제로 모든 데이터 바인딩 내에서 JavaScript 표현식의 모든 기능을 지원합니다:


```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

These expressions will be evaluated as JavaScript in the data scope of the current component instance.

이러한 표현식은 현재 컴포넌트 인스턴스가 가진 데이터를 이용해 JavaScript로 평가됩니다.

In Vue templates, JavaScript expressions can be used in the following positions:

Vue 템플릿에서 JavaScript 표현식은 다음 위치에서 사용할 수 있습니다:


- Inside text interpolations (mustaches)
- 문자열 보간 내에서 (mustaches)
- In the attribute value of any Vue directives (special attributes that start with `v-`)
- Vue 디렉티트 속성 값 안에서 (`v-`로 시작하는 특수 속성)


### Expressions Only
### 표현식만 사용가능

Each binding can only contain **one single expression**, so the following will **NOT** work:

각 바인딩은 **하나의 단일 표현식**만 포함할 수 있으므로 다음은 작동하지 **않습니다**:


```vue-html
<!-- 이건 표현식(expression)이 아니라 문장(statement)임: -->
{{ var a = 1 }}

<!-- 흐름 제어역시 동작하지 않음. 3항연산자( `condition ? a : b`)를 사용하세요:   -->
{{ if (ok) { return message } }}
```

### Calling Functions
### 함수 호출하기

It is possible to call a component-exposed method inside a binding expression:

바인딩 식 내에서 컴포넌트에서 제공하는 메서드를 호출할 수 있습니다:


```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

:::tip
Functions called inside binding expressions will be called every time the component updates, so they should **not** have any side effects, such as changing data or triggering asynchronous operations.
:::

:::tip
바인딩 표현식 내에서 호출되는 함수는 컴포넌트가 업데이트될 때마다 호출되므로 데이터 변경 또는 비동기 작업 트리거와 같은 부작용이 **없어야 합니다**.
:::

### Restricted Globals Access
### 전역 객체 접근 제한

Template expressions are sandboxed and only have access to a [restricted list of globals](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3). The list exposes commonly used built-in globals such as `Math` and `Date`.

템플릿 표현식은 샌드박스 처리되며 [제한된 전역 객체 목록](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3)에만 액세스할 수 있습니다. 이 목록은 `Math` 및 `Date`와 같이 일반적으로 사용되는 내장 전역 객체를 표시합니다.


Globals not explicitly included in the list, for example user-attached properties on `window`, will not be accessible in template expressions. You can, however, explicitly define additional globals for all Vue expressions by adding them to [`app.config.globalProperties`](/api/application.html#app-config-globalproperties).

목록에 명시적으로 포함되지 않은 전역 객체(예: `window`의 사용자 연결 속성)는 템플릿 표현식에서 액세스할 수 없습니다. 그러나 [`app.config.globalProperties`](/api/application.html#app-config-globalproperties)에 추가하여 모든 Vue 표현식에 대한 추가 전역 객체를 명시적으로 정의할 수 있습니다.


## Directives
## 디렉티브


Directives are special attributes with the `v-` prefix. Vue provides a number of [built-in directives](/api/built-in-directives.html), including `v-html` and `v-bind` which we have introduced above.

디렉티브은 `v-` 접두사가 있는 특수 속성입니다. Vue는 위에서 소개한 `v-html` 및 `v-bind`를 포함하여 다양한 [내장 디렉티브](/api/built-in-directives.html)을 제공합니다.


Directive attribute values are expected to be single JavaScript expressions (with the exception of `v-for`, `v-on` and `v-slot`, which will be discussed in their respective sections later). A directive's job is to reactively apply updates to the DOM when the value of its expression changes. Take [`v-if`](/api/built-in-directives.html#v-if) as an example:

디렉티브 속성 값은 단일 JavaScript 표현식이어야 합니다(나중에 해당 섹션에서 논의할 `v-for`, `v-on` 및 `v-slot` 제외). 디렉티브의 역할은 표현식 값이 변경될 때 DOM에 반응적으로 업데이트를 적용하는 것입니다. [`v-if`](/api/built-in-directives.html#v-if)를 예로 들어 보겠습니다.


```vue-html
<p v-if="seen">Now you see me</p>
```

Here, the `v-if` directive would remove / insert the `<p>` element based on the truthiness of the value of the expression `seen`.

여기서 `v-if` 디렉티브는 `seen` 표현 값의 진실성을 기반으로 `<p>`엘리먼트를 제거/삽입합니다.


### Arguments
### 인자

Some directives can take an "argument", denoted by a colon after the directive name. For example, the `v-bind` directive is used to reactively update an HTML attribute:

일부 디렉티브는 디렉티브 이름 뒤에 콜론으로 표시되는 "인자(argument)"를 사용할 수 있습니다. 예를 들어 `v-bind` 디렉티브는 HTML 속성을 반응적으로 업데이트하는 데 사용됩니다:


```vue-html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

Here `href` is the argument, which tells the `v-bind` directive to bind the element's `href` attribute to the value of the expression `url`. In the shorthand, everything before the argument (i.e. `v-bind:`) is condensed into a single character, `:`.

여기서 `href`는엘리먼트의 `href` 속성을 표현식 `url`의 값에 바인딩하도록 `v-bind` 디렉티브에 지시하는 인자입니다. 간단히 말해서, 인자 앞의 모든 것(즉, `v-bind:`)은 단일 문자 `:`로 압축됩니다.


Another example is the `v-on` directive, which listens to DOM events:

또 다른 예는 DOM 이벤트를 수신하는 `v-on` 디렉티브입니다:


```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

Here the argument is the event name to listen to: `click`. `v-on` is one of the few directives that also have a corresponding shorthand, with its shorthand character being `@`. We will talk about event handling in more detail too.

여기 인자는 수신할 이벤트 이름입니다. `click`. `v-on`은 전용 약어가 있는 몇 안 되는 지시문 중 하나이며 약어 문자는 `@`입니다. 이벤트 처리에 대해서도 더 자세히 이야기하겠습니다.


### Dynamic Arguments
### 동적 인자 지정

It is also possible to use a JavaScript expression in a directive argument by wrapping it with square brackets:

대괄호로 감싸서 디렉티브 인자에서 JavaScript 표현식을 사용할 수도 있습니다:


```vue-html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

Here `attributeName` will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final value for the argument. For example, if your component instance has a data property, `attributeName`, whose value is `"href"`, then this binding will be equivalent to `v-bind:href`.

여기서 `attributeName`은 JavaScript 표현식으로 동적으로 평가되며 평가된 값은 인자의 최종 값으로 사용됩니다. 예를 들어 컴포넌트 인스턴스에 값이 `"href"`인 데이터 속성 `attributeName`이 있는 경우 이 바인딩은 `v-bind:href`와 동일합니다.


Similarly, you can use dynamic arguments to bind a handler to a dynamic event name:

마찬가지로 동적 인자를 사용하여 핸들러를 동적 이벤트 이름에 바인딩할 수 있습니다:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

In this example, when `eventName`'s value is `"focus"`, `v-on:[eventName]` will be equivalent to `v-on:focus`.

이 예에서 `eventName`의 값이 `"focus"`인 경우 `v-on:[eventName]`은 `v-on:focus`와 동일합니다.


#### Dynamic Argument Value Constraints
#### 동적 인자 값 제한

Dynamic arguments are expected to evaluate to a string, with the exception of `null`. The special value `null` can be used to explicitly remove the binding. Any other non-string value will trigger a warning.

동적 인자는 `null`을 제외하고 문자열로 평가되어야 합니다. 특수 값 `null`을 사용하여 바인딩을 명시적으로 제거할 수 있습니다. 문자열이 아닌 다른 값은 경고를 날립니다. 


#### Dynamic Argument Syntax Constraints
#### 동적 인자 문법 제한

Dynamic argument expressions have some syntax constraints because certain characters, such as spaces and quotes, are invalid inside HTML attribute names. For example, the following is invalid:

동적 인자 표현식에는 공백 및 따옴표와 같은 특정 문자가 HTML 속성 이름 내에서 유효하지 않기 때문에 일부 구문 제약 조건이 있습니다. 예를 들어 다음은 유효하지 않습니다:


```vue-html
<!-- This will trigger a compiler warning. -->
<a :['foo' + bar]="value"> ... </a>
```

If you need to pass a complex dynamic argument, it's probably better to use a [computed property](./computed.html), which we will cover shortly.

복잡한 동적 인자를 전달해야 하는 경우 [computed property](./computed.html)를 사용하는 것이 더 나을 것입니다. 이에 대해서는 곧 다룰 것입니다.


When using in-DOM templates (templates directly written in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase:

DOM 내 템플릿(HTML 파일에 직접 작성된 템플릿)을 사용할 때 브라우저가 속성 이름을 소문자로 강제 변환하므로 대문자로 키 이름을 지정하는 것도 피해야 합니다:


```vue-html
<a :[someAttr]="value"> ... </a>
```

The above will be converted to `:[someattr]` in in-DOM templates. If your component has a `someAttr` property instead of `someattr`, your code won't work.

위의 내용은 DOM 내 템플릿에서 `:[someattr]`로 변환됩니다. 컴포넌트에 `someattr` 대신 `someAttr` 속성이 있으면 코드가 작동하지 않습니다.


### Modifiers
### 수정자(Modifiers)


Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the `.prevent` modifier tells the `v-on` directive to call `event.preventDefault()` on the triggered event:

수정자는 점으로 표시되는 특수 접미사로 지시문이 특별한 방식으로 바인딩되어야 함을 나타냅니다. 예를 들어 `.prevent` 수정자는 트리거된 이벤트에서 `event.preventDefault()`를 호출하도록 `v-on` 지시문에 지시합니다.


```vue-html
<form @submit.prevent="onSubmit">...</form>
```

You'll see other examples of modifiers later, [for `v-on`](./event-handling.html#event-modifiers) and [for `v-model`](./forms.html#modifiers), when we explore those features.

나중에 [for `v-on`](./event-handling.html#event-modifiers) 및 [for `v-model`](./forms.html#modifiers)과 같은 수정자의 다른 예를 볼 수 있습니다. 이러한 기능을 탐색할 때


And finally, here's the full directive syntax visualized:

마지막으로 다음은 전체 지시문 구문을 시각화한 것입니다.


![directive syntax graph](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
