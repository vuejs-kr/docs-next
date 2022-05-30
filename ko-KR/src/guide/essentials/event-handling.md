# 이벤트 핸들링

## 이벤트 리스닝하기

일반적으로 `v-on` 지시문은 단축 문법으로 `@` 기호를 사용하며, DOM 이벤트를 수신하고 트리거될 때, 사전 정의해둔 JavaScript 코드를 실행할 수 있습니다.
`v-on:click="handler"` 또는 줄여서 `@click="handler"`와 같이 사용합니다.

핸들러 값은 다음 중 하나일 수 있습니다:

1. **인라인 핸들러:** 이벤트가 트리거될 때 실행되는 인라인 JavaScript(네이티브 `onclick` 속성과 유사).

2. **메서드 핸들러:** 컴포넌트에 정의된 메서드 이름 또는 메서드를 가리키는 경로.

## 인라인 핸들러

인라인 핸들러는 일반적으로 다음과 같이 간단한 경우에 사용됩니다:

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
<button @click="count++">1 추가</button>
<p>숫자 값은: {{ count }}</p>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiY291bnQrK1wiPjEg7LaU6rCAPC9idXR0b24+XG4gIDxwPuyIq+yekCDqsJLsnYA6IHt7IGNvdW50IH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnQ6IDBcbiAgXHR9XG5cdH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiY291bnQrK1wiPjEg7LaU6rCAPC9idXR0b24+XG4gIDxwPuyIq+yekCDqsJLsnYA6IHt7IGNvdW50IH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## 메서드 핸들러

대부분의 이벤트 핸들러 논리는 복잡할 것이며, 인라인 핸들러에서는 실현 가능하지 않을 수 있습니다.
그러므로 `v-on`은 컴포넌트의 메서드 이름이나 메서드를 가리키는 경로를 실행할 수 있게 구현되어 있습니다.

예제:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`안녕 ${name.value}!`)
  // 'event'는 네이티브 DOM 이벤트 객체입니다.
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
    // `this`는 메서드가 활성화된 현재 인스턴스를 가리킵니다.
    alert(`안녕 ${this.name}!`)
    // 'event'는 네이티브 DOM 이벤트 객체입니다.
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet`는 위에서 정의한 메서드의 이름입니다. -->
<button @click="greet">환영하기</button>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYOyViOuFlSAke25hbWUudmFsdWV9IWApXG4gIC8vICdldmVudCfripQg64Sk7J207Yuw67iMIERPTSDsnbTrsqTtirgg6rCd7LK07J6F64uI64ukLlxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPu2ZmOyYge2VmOq4sDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNg64qUIOuplOyEnOuTnOqwgCDtmZzshLHtmZTrkJwg7ZiE7J6sIOyduOyKpO2EtOyKpOulvCDqsIDrpqztgrXri4jri6QuXG4gICAgICBhbGVydChg7JWI64WVICR7dGhpcy5uYW1lfSFgKVxuICAgICAgLy8gJ2V2ZW50J+uKlCDrhKTsnbTti7DruIwgRE9NIOydtOuypO2KuCDqsJ3ssrTsnoXri4jri6QuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgYWxlcnQoZXZlbnQudGFyZ2V0LnRhZ05hbWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8YnV0dG9uIEBjbGljaz1cImdyZWV0XCI+7ZmY7JiB7ZWY6riwPC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

메소드 핸들러는 이를 트리거하는 네이티브 DOM 이벤트 객체를 자동으로 수신합니다.
위의 예에서 `event.target.tagName`을 통해 이벤트를 전달하는 엘리먼트에 접근할 수 있습니다.

<div class="composition-api">

참조: [이벤트 핸들러 타입 지정하기](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

참조: [이벤트 핸들러 타입 지정하기](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### 메서드 vs 인라인 구분

템플릿 컴파일러는 `v-on` 값인 문자열이 유효한 JavaScript 식별자 또는 속성에 접근 가능한 경로인지를 확인해 매서드 핸들러를 감지합니다.
예를 들어 `foo`, `foo.bar` 및 `foo['bar']`는 메서드 핸들러로 처리되는 반면, `foo()` 및 `count++`는 인라인 핸들러로 처리됩니다.

## 인라인 핸들러에서 메서드 호출하기

메서드 이름을 직접 바인딩하는 대신, 인라인 핸들러에서 메서드를 호출할 수도 있습니다.
이를 통해 네이티브 이벤트 객체 대신 사용자 지정 인수를 메서드에 전달할 수 있습니다:

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
<button @click="say('안녕')">안녕이라고 말하기</button>
<button @click="say('잘가')">잘가라고 말하기</button>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmZ1bmN0aW9uIHNheShtZXNzYWdlKSB7XG4gIGFsZXJ0KG1lc3NhZ2UpXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cInNheSgn7JWI64WVJylcIj7slYjrhZXsnbTrnbzqs6Ag66eQ7ZWY6riwPC9idXR0b24+XG4gIDxidXR0b24gQGNsaWNrPVwic2F5KCfsnpjqsIAnKVwiPuyemOqwgOudvOqzoCDrp5DtlZjquLA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ+yViOuFlScpXCI+7JWI64WV7J2065286rOgIOunkO2VmOq4sDwvYnV0dG9uPlxuICA8YnV0dG9uIEBjbGljaz1cInNheSgn7J6Y6rCAJylcIj7snpjqsIDrnbzqs6Ag66eQ7ZWY6riwPC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

## 인라인 핸들러에서 이벤트 객체 접근하기

때로는 인라인 핸들러에서 네이티브 DOM 이벤트 객체에 접근해야 하는 경우도 있습니다.
특수한 키워드인 `$event`를 사용하여 메서드에 전달하거나 인라인 화살표 함수를 사용할 수 있습니다:

```vue-html
<!-- 특수한 키워드인 $event 사용 -->
<button @click="warn('아직 양식을 제출할 수 없습니다.', $event)">
  제출하기
</button>

<!-- 인라인 화살표 함수 사용 -->
<button @click="(event) => warn('아직 양식을 제출할 수 없습니다.', event)">
  제출하기
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // 이제 네이티브 이벤트 객체에 접근할 수 있습니다.
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
    // 이제 네이티브 이벤트 객체에 접근할 수 있습니다.
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## 이벤트 수식어

이벤트 핸들러 내에서 `event.preventDefault()` 또는 `event.stopPropagation()`을 호출하는 것은 매우 흔한 일입니다.
메서드 내에서 이 작업을 쉽게 수행할 수 있지만, 메서드가 DOM 이벤트에 대한 세부적인 처리 로직 없이 오로지 데이터 처리 로직만 있다면 코드 유지보수에 더 좋을 것입니다.

이 문제를 해결하기 위해 `v-on`은 점(`.`)으로 시작하는 지시적 접미사인 **이벤트 수식어**를 제공합니다.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- 클릭 이벤트 전파가 중지됩니다. -->
<a @click.stop="doThis"></a>

<!-- submit 이벤트가 더 이상 페이지 리로드하지 않습니다. -->
<form @submit.prevent="onSubmit"></form>

<!-- 수식어를 연결할 수 있습니다. -->
<a @click.stop.prevent="doThat"></a>

<!-- 이벤트에 핸들러 없이 수식어만 사용할 수 있습니다. -->
<form @submit.prevent></form>

<!-- event.target이 엘리먼트 자신일 경우에만 핸들러가 실행됩니다. -->
<!-- 예를 들어 자식 엘리먼트에서 클릭 액션이 있으면 핸들러가 실행되지 않습니다. -->
<div @click.self="doThat">...</div>
```

::: tip
수식어를 명시한 순서대로 관련 코드가 생성되기 때문에 수식어를 사용할 때 순서가 중요합니다.
따라서 `@click.prevent.self`를 사용하면 **해당 엘리먼트 및 자식 엘리먼트가 클릭 되는 경우 실행되는 기본 동작을 방지**합니다.
반면, `@click.self.prevent`는 **해당 엘리먼트가 클릭 되는 경우에만 실행되는 기본 동작을 방지**합니다.
:::

`.capture`, `.once` 및 `.passive` 수식어는 [네이티브 `addEventListener` 메서드의 옵션](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)을 반영합니다.:

```vue-html
<!-- 이벤트 리스너를 추가할 때 캡처 모드 사용 -->
<!-- 내부 엘리먼트에서 클릭 이벤트 핸들러가 실행되기 전에, 여기에서 먼저 핸들러가 실행됩니다. -->
<div @click.capture="doThis">...</div>

<!-- 클릭 이벤트는 단 한 번만 실행됩니다. -->
<a @click.once="doThis"></a>

<!-- 핸들러 내 `event.preventDefault()`가 포함되었더라도 -->
<!-- 스크롤 이벤트의 기본 동작(스크롤)이 발생합니다.        -->
<div @scroll.passive="onScroll">...</div>
```

`.passive` 수식어는 일반적으로 [모바일 장치의 성능 향상](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)을 위해 터치 이벤트 리스너와 함께 사용됩니다.

::: tip
`.passive`는 브라우저에게 이벤트의 _기본 동작을 방지(prevent)하지 않겠다_는 의도를 전달한 것입니다.
따라서 `.passive`와 `.prevent`를 함께 사용해서는 안되며, 그렇게 할 경우 브라우저(콘솔)에서 경고 메세지를 볼 수 있습니다.
:::

## 입력키 수식어

키보드 이벤트를 수신할 때, 특정 키를 확인해야 하는 경우가 많기 때문에, 키 수식어를 지원합니다:

```vue-html
<!-- `key`가 `Enter`일 때만 `vm.submit()`을 호출합니다 -->
<input @keyup.enter="submit" />
```

[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)를 통해 유효한 입력키 이름을 kebab-case로 변환하여 수식어로 사용할 수 있습니다:

```vue-html
<input @keyup.page-down="onPageDown" />
```

위의 예에서 핸들러는 `$event.key`가 `'PageDown'`일 경우에만 호출됩니다:

### 입력키 별칭

Vue는 가장 일반적으로 사용되는 키에 대한 별칭을 제공합니다:

- `.enter`
- `.tab`
- `.delete` ("Delete" 및 "Backspace" 키 모두 캡처)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### 시스템 입력키 수식어

마우스 또는 키보드 이벤트 리스너는 아래 수식어를 사용하여, 해당 입력키를 누를 때만 트리거 되도록 할 수 있습니다:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip 참고
Macintosh 키보드에서 메타는 커멘드 키(⌘)입니다.
Windows 키보드에서 meta는 Windows 키(⊞)입니다.
Sun Microsystems 키보드에서 메타는 실선 다이아몬드(◆)로 표시됩니다.
Knight 키보드, space-cadet 키보드와 같은 특정 키보드, 특히 MIT 및 Lisp 기계 키보드 및 후속 제품에서는 메타가 "META"로 표시됩니다.
Symbolics 키보드에서 메타는 "META" 또는 "Meta"로 표시됩니다.
:::

예:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">시작하기</div>
```

::: tip
시스템 수식어 입력키는 일반 키와 다르므로 `keyup` 이벤트와 함께 사용되는 경우, 키가 눌려저 있어야 이벤트가 발생합니다.
즉, `keyup.ctrl`은 `ctrl`을 누른 상태에서 다른 입력키를 땔 때(key up)만 트리거됩니다.
`ctrl` 키만 땔 때는 트리거되지 않습니다.
:::

### `.exact` 수식어

`.exact` 수식어를 사용하면 이벤트를 트리거하는 데 필요한 시스템 수식어의 정확한 조합을 제어할 수 있습니다.

```vue-html
<!-- Ctrl과 함께 Alt 또는 Shift를 누른 상태에서도 클릭하면 실행됩니다. -->
<button @click.ctrl="onClick">A</button>

<!-- 오직 Ctrl만 누른 상태에서 클릭해야 실행됩니다. -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 시스템 입력키를 누르지 않고 클릭해야지만 실행됩니다. -->
<button @click.exact="onClick">A</button>
```

## 마우스 버튼 수식어

- `.left`
- `.right`
- `.middle`

특정 마우스 버튼에 의해 이벤트가 트리거 되도록 제한하고 싶을 때 사용합니다.
