:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Event Handling

# 이벤트 핸들링

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

## Listening to Events
## 이벤트 듣기

We can use the `v-on` directive, which we typically shorten to the `@` symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be `v-on:click="handler"` or with the shortcut, `@click="handler"`.

`v-on` (약어로 `@`)는 DOM에서 이벤트가 발생하는것을 듣고 있다가, 이벤트가 발생 했을 때 자바스크립트 코드를 실행시켜 줍니다. 보통 `v-on:click="handler"` 형태로 기술됩니다. (축약해서 `@click="handler"`)

The handler value can be one of the following:

핸들러는 다음 두가지 형식입니다:

1. **Inline handlers:** Inline JavaScript to be executed when the event is triggered (similar to the native `onclick` attribute).

1. **인라인 핸들러:** 이벤트가 트리거될 때 실행되는 인라인 자바스크립트(네이티브 `onclick` 속성과 유사).


2. **Method handlers:** A property name or path that points to a method defined on the component.

2. **메소드 핸들러:** 컴포넌트에 선언된 메소드를 나타내는 속성명 또는 경로


## Inline Handlers
## 인라인 핸들러

Inline handlers are typically used in simple cases, for example:

인라인 핸들러는 일반적으로 다음과 같은 간단한 경우에 사용됩니다: 

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnRlciA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnRlcjogMFxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Method Handlers
## 메소드 핸들러

The logic for many event handlers will be more complex though, and likely isn't feasible with inline handlers. That's why `v-on` can also accept the name or path of a component method you'd like to call.

많은 이벤트 핸들러에 대한 논리는 더 복잡하고 인라인 핸들러에서는 실현 가능하지 않을 수 있습니다. 그렇기 때문에 `v-on`은 호출하려는 구성 요소 메소드의 이름이나 경로도 받아들일 수 있습니다.

대부분의 이벤트 핸들러는 더 복잡한 로직을 가지기 때문에 인라인 핸들러는 적합하지 않습니다. `v-on`이 호출한  컴포넌트 메소드의 이름이나 경로를 인자로 받는 것이 이런 이유 때문입니다. 


For example:

예를 들어: 

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  // `event`는 DOM 네이티브 이벤트입니다. 
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` inside methods points to the current active instance
    // 메소드 안에서 `this` 는 현재 활성화된 컴포넌트 인스턴스를 가르킵니다. 
    alert(`Hello ${this.name}!`)
    // `event` is the native DOM event
    // `event`는 DOM 네이티브 이벤트입니다. 
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` is the name of the method defined above -->
<!-- `greet`는 위에서 선언된 메소드의 이름입니다.  -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYEhlbGxvICR7bmFtZS52YWx1ZX0hYClcbiAgLy8gYGV2ZW50YCBpcyB0aGUgbmF0aXZlIERPTSBldmVudFxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPkdyZWV0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNgIGluc2lkZSBtZXRob2RzIHBvaW50cyB0byB0aGUgY3VycmVudCBhY3RpdmUgaW5zdGFuY2VcbiAgICAgIGFsZXJ0KGBIZWxsbyAke3RoaXMubmFtZX0hYClcbiAgICAgIC8vIGBldmVudGAgaXMgdGhlIG5hdGl2ZSBET00gZXZlbnRcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxidXR0b24gQGNsaWNrPVwiZ3JlZXRcIj5HcmVldDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

A method handler automatically receives the native DOM Event object that triggers it - in the example above, we are able to access the element dispatching the event via `event.target.tagName`.

메소드 핸들러 함수는 콜백 될 때 핸들러를 트리거하는 네이티브 DOM 이벤트 객체를 인자로 받을 수 있습니다.  위의 예에서 인자로 주어진 `event.target.tagName`을 통해 이벤트를 전달하는 앨리먼트에 접근할수 있습니다. 


<div class="composition-api">

See also: [Typing Event Handlers](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

참조: [이벤트 핸들러에 타입 지정하기](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

See also: [Typing Event Handlers](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

참조: [이벤트 핸들러에 타입 지정하기](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Method vs. Inline Detection

### 메소드 vs 인라인 감지

The template compiler detects method handlers by checking whether the `v-on` value string is a valid JavaScript identifier or property access path. For example, `foo`, `foo.bar` and `foo['bar']` are treated as method handlers, while `foo()` and `count++` are treated as inline handlers.

템플릿 컴파일러는 `v-on` 값 문자열이 유효한 자바스크립트 식별자 또는 속성 접근 경로인지를 확인하여 메소드 핸들러를 감지합니다. 예를 들어 `foo`, `foo.bar` 및 `foo['bar']`는 메소드 핸들러로 처리되는 반면, `foo()` 및 `count++`는 인라인 핸들러로 처리됩니다.


## Calling Methods in Inline Handlers
## 인라인 핸들러에서 메소드 호출하기

Instead of binding directly to a method name, we can also call methods in an inline handler. This allows us to pass the method custom arguments instead of the native event:

메소드 이름을 바로 바인딩하는 대신 인라인 핸들러에서 메소드를 호출할 수도 있습니다. 이를 통해 메소드에  네이티브 이벤트 대신 커스텀 인자를 전달할 수 있습니다.


<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmZ1bmN0aW9uIHNheShtZXNzYWdlKSB7XG4gIGFsZXJ0KG1lc3NhZ2UpXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8YnV0dG9uIEBjbGljaz1cInNheSgnaGknKVwiPlNheSBoaTwvYnV0dG9uPlxuICA8YnV0dG9uIEBjbGljaz1cInNheSgnd2hhdCcpXCI+U2F5IHdoYXQ8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ2hpJylcIj5TYXkgaGk8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ3doYXQnKVwiPlNheSB3aGF0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Accessing Event Argument in Inline Handlers
## 인라인 핸들러에서 이벤트 인자 접근하기

Sometimes we also need to access the original DOM event in an inline handler. You can pass it into a method using the special `$event` variable, or use an inline arrow function:

때로는 인라인 핸들러에서 원래 DOM 이벤트에 액세스해야 하는 경우도 있습니다. 특수 변수 `$event`를 사용하여 이를 메서드에 전달하거나 인라인 화살표 함수에서 사용할 수 있습니다.


```vue-html
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Event Modifiers
## 이벤트 수정자

It is a very common need to call `event.preventDefault()` or `event.stopPropagation()` inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

이벤트 핸들러 내에서 `event.preventDefault()` 또는 `event.stopPropagation()`을 호출 하는 것은 정말 일반적입니다. 메서드 내에서 그냥 호출 해도 되지만, 메서드의 구현이 가급적이면 DOM 이벤트에 대한 세부 정보를 처리하지 않고, 순전히 데이터 로직만 처리하는게 좋을 거 같습니다. 


To address this problem, Vue provides **event modifiers** for `v-on`. Recall that modifiers are directive postfixes denoted by a dot.

이 문제를 해결하기 위해 Vue는 `v-on`에 대한 **이벤트 수정자**를 제공합니다. 수정자는 점으로 표시되는 지시적 접미사임을 기억하십시오.


- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- the click event's propagation will be stopped -->
<!-- 클릭 이벤트 전파가 멈춤니다 -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<!-- submit 이벤트가 페이지 리로드를 일으키지 않습니다. --> 
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<!-- 수정자는 체이닝 될수 있습니다.  -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<!-- 수정자만  -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<!-- 이벤트의 타겟이 지금 현재 앨리먼트일때만 트리거 되게-->
<!-- i.e. 자식 앨리먼트에서 발생한 클릭 이벤트에는 반응하지 않습니다 -->
<div @click.self="doThat">...</div>
```

::: tip
Order matters when using modifiers because the relevant code is generated in the same order. Therefore using `@click.prevent.self` will prevent **clicks default action on the element itself and its children** while `@click.self.prevent` will only prevent clicks default action on the element itself.
:::

::: tip
수정자를 사용한 순서대로 관련 호출 코드가 생성되기때문에 순서가 중요합니다. 예를들어 `@click.prevent.self`를 사용하면 **앨리먼트 자신과 자식 앨리먼트의 클릭 기본 동작** 을 방지하지만, , `@click.self.prevent`는 **앨리먼트 자신에 대한 기본 동작을 클릭**하는 것만 방지합니다.
:::

The `.capture`, `.once`, and `.passive` modifiers mirror the [options of the native `addEventListener` method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters):

 `.capture`, `.once`, `.passive` 수정자는 [네이티브 `addEventListener` 메소드의 옵션 method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters) 을 반영합니다:

```vue-html
<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<!-- 이벤트 리스너를 추가할때 캡쳐 모드를 적용합니다.  -->
<!-- i.e. 더 안쪽의 앨리먼트를 향하는 이벤트가 더 안쪽으로 진입하기 전에 여기에서 처리되게 됩니다. -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<!-- 다음 클릭은 단 한번만 트리거 됩니다.  -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<!-- 스크롤 이벤트의 기본 동작(스크롤)은 `event.preventDefault()`가 포함된 경우  -->
<!-- `onScroll`이 완료되기를 기다리는 대신 즉시 발생합니다  -->
<div @scroll.passive="onScroll">...</div>
```

The `.passive` modifier is typically used with touch event listeners for [improving performance on mobile devices](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

`.passive` 수정자는 일반적으로 [모바일 기기에서 성능 향상](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)을 위해 터치 이벤트 리스너와 함께 사용됩니다.


::: tip
Do not use `.passive` and `.prevent` together, because `.passive` already indicates to the browser that you _do not_ intend to prevent the event's default behavior, and you will likely see a warning from the browser if you do so.
:::

::: tip
`.passive`와 `.prevent`를 함께 사용하지 마세요. `.passive`는 브라우저에 이벤트의 기본 동작을 _방지(prevent)하지 않겠다_라고 한것이기 때문에, 브라우저에서 경고할 가능성이 높습니다. 
:::

## Key Modifiers
## 입력키 수정자

When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for `v-on` or `@` when listening for key events:

키보드 이벤트를 수신할 때 특정 키(입력키)를 확인해야 하는 경우가 많습니다. Vue는 키 이벤트를 수신할 때 `v-on` 또는 `@`에 입력키 수정자를 추가할 수 있습니다.


```vue-html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<!-- 입력키(`Key`)가 `Enter` 일때만 `vm.submit()`이 호출됩니다.  -->
<input @keyup.enter="submit" />
```

You can directly use any valid key names exposed via [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) as modifiers by converting them to kebab-case.

[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)를 통해 사용할수 있는 유효한 입력키 이름을 케밥케이스로 변환하여 바로 사용할수 있습니다.


```vue-html
<input @keyup.page-down="onPageDown" />
```

In the above example, the handler will only be called if `$event.key` is equal to `'PageDown'`.

위의 예에서  `$event.key`가  `'PageDown'` 일때만 핸들러가 호출됩니다. 

### Key Aliases

### 입력키 별칭

Vue provides aliases for the most commonly used keys:

자주 사용되는 입력키에 대해 별칭을 쓸수 있습니다:

- `.enter`
- `.tab`
- `.delete` (captures both "Delete" and "Backspace" keys) ("Delete"키와 "Backspace"키 모두 캡쳐합니다) 
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### System Modifier Keys
### 시스템 입력키 수정자

You can use the following modifiers to trigger mouse or keyboard event listeners only when the corresponding modifier key is pressed:

다음 수정자를 사용하여 해당 수정자 키를 누를 때만 마우스 또는 키보드 이벤트 리스너를 트리거할 수 있습니다:


- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
On Macintosh keyboards, meta is the command key (⌘). On Windows keyboards, meta is the Windows key (⊞). On Sun Microsystems keyboards, meta is marked as a solid diamond (◆). On certain keyboards, specifically MIT and Lisp machine keyboards and successors, such as the Knight keyboard, space-cadet keyboard, meta is labeled “META”. On Symbolics keyboards, meta is labeled “META” or “Meta”.
:::

::: tip 참고
Macintosh 키보드에서 메타는 명령 키(⌘)입니다. Windows 키보드에서 meta는 Windows 키(⊞)입니다. Sun Microsystems 키보드에서 메타는 실선 다이아몬드(◆)로 표시됩니다. Knight 키보드, space-cadet 키보드와 같은 특정 키보드, 특히 MIT 및 Lisp 기계 키보드 및 후속 제품에서는 메타가 "META"로 표시됩니다. Symbolics 키보드에서 메타는 "META" 또는 "Meta"로 표시됩니다.
:::

For example:

예:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
Note that modifier keys are different from regular keys and when used with `keyup` events, they have to be pressed when the event is emitted. In other words, `keyup.ctrl` will only trigger if you release a key while holding down `ctrl`. It won't trigger if you release the `ctrl` key alone.
:::

::: tip
시스템 입력키 수정자 는 일반 키와 다르며 `keyup` 이벤트와 같이 사용 되었을 때, 시스템 입력키는 눌려 있어야 합니다.  즉, `keyup.ctrl`은 `ctrl`을 누른 상태에서 키를 놓는 경우에만 트리거됩니다. `ctrl` 키만 놓으면 트리거되지 않습니다.
:::

### `.exact` Modifier
### `.exact` 수정자

The `.exact` modifier allows control of the exact combination of system modifiers needed to trigger an event.

`.exact` 수정자를 사용하면 이벤트를 트리거하는 데 필요한 시스템 수정자의 정확한 조합을 제어할 수 있습니다:


```vue-html
<!-- this will fire even if Alt or Shift is also pressed -->
<!-- ctrl 말고도 alt나 sfhit가 눌려 있어도 이벤트가 발생합니다.  -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<!-- Ctrl 말고 다른 키가 눌려 있지 않을때 이벤트가 발생합니다. -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<!-- 시스템 입력키 수정자가 아무것도 눌려 있지 않아야 이벤트가 발생합니다. -->
<button @click.exact="onClick">A</button>
```

## Mouse Button Modifiers
## 마우스 버튼 수정자

- `.left`
- `.right`
- `.middle`

These modifiers restrict the handler to events triggered by a specific mouse button.

특정 마우스 버튼에서 발생한 이벤트로만 동작을 제한하고 싶을때 사용합니다. 

