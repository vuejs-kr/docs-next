# 빌트인 디렉티브 {#built-in-directives}

## v-text

엘리먼트의 텍스트 컨텐츠를 업데이트합니다.

- **요구되는 값**: `string`

- **세부 사항**:

  `v-text`는 엘리먼트의 [텍스트 컨텐츠](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) 속성을 설정하므로,
  엘리먼트 내부의 기존 콘텐츠를 덮어씁니다.
  `텍스트 컨텐츠`의 일부를 업데이트해야 하는 경우,
  [이중 중괄호](/guide/essentials/template-syntax.html#text-interpolation)를 사용해야 합니다.

- **예제**:

  ```vue-html
  <span v-text="msg"></span>
  <!-- 아래와 같음 -->
  <span>{{msg}}</span>
  ```

- **참고**: [템플릿 문법 - 텍스트 보간법](/guide/essentials/template-syntax.html#text-interpolation)

## v-html

엘리먼트의 [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)을 업데이트합니다.

- **요구되는 값**: `string`

- **세부 사항**:

  `v-html`의 내용은 Vue 템플릿 문법을 처리하지 않고 일반 HTML로 삽입됩니다.
  `v-html`을 사용하여 템플릿을 작성하려고 한다면,
  이 방법 대신 컴포넌트를 사용하여 해결하는 방법을 고민해봐야 합니다.

  ::: warning 보안 참고 사항
  웹사이트에서 임의의 HTML을 동적으로 렌더링하는 것은 [XSS 공격](https://en.wikipedia.org/wiki/Cross-site_scripting)으로 쉽게 이어질 수 있기 때문에 매우 위험할 수 있습니다.
  신뢰할 수 있는 콘텐츠에만 `v-html`을 사용하고,
  사용자가 제공하는 콘텐츠에는 **절대** 사용하면 안됩니다.
  :::

  [싱글 파일 컴포넌트(SFC)](/guide/scaling-up/sfc)에서 `scoped`(범위를 지정한) Style은 `v-html` 내부 컨텐츠에 적용되지 않습니다.
  왜냐하면 해당 HTML은 Vue의 템플릿 컴파일러에서 처리되지 않기 때문입니다.
  범위를 지정한 CSS로 `v-html` 콘텐츠를 대상으로 지정하려는 경우,
  [CSS 모듈](./sfc-css-features.html#css-modules) 또는 BEM과 같은 수동 범위 지정 방법과 함께 전역 `<style>` 엘리먼트를 사용할 수 있습니다.

- **예제**:

  ```vue-html
  <div v-html="html"></div>
  ```

- **참고**: [템플릿 문법 - HTML 출력](/guide/essentials/template-syntax.html#raw-html)

## v-show

표현식의 [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) 값을 기반으로 엘리먼트의 가시성을 전환합니다.

- **요구되는 값**: `any`

- **세부 사항**:

  `v-show`는 인라인 스타일을 통해 `display` CSS 속성을 설정하며,
  엘리먼트가 표시될 때 초기 `display` 값을 설정하려고 시도합니다.
  또한 조건이 변경될 때 전환을 트리거합니다.

- **참고**: [조건부 렌더링 - v-show](/guide/essentials/conditional.html#v-show)

## v-if

표현식의 truthy 값을 기반으로 엘리먼트 또는 템플릿 일부를 조건부로 렌더링합니다.

- **요구되는 값**: `any`

- **세부 사항**:

  `v-if` 엘리먼트가 토글되면, 엘리먼트와 여기에 포함된 디렉티브/컴포넌트가 파괴되고 재구성됩니다.
  초기 조건 값이 falsy이면,
  내부 콘텐츠가 전혀 렌더링되지 않습니다.

  텍스트 또는 여러 엘리먼트를 포함하는 조건부 블록을 나타내기 위해 `<template>`에 사용할 수도 있습니다.

  이 디렉티브는 조건이 변경될 때,
  [트랜지션](/guide/built-ins/transition.html)을 트리거합니다.

  `v-for`와 함께 사용하는 경우, `v-if`의 우선 순위가 높습니다.
  하나의 엘리먼트에 이 두 디렉티브을 함께 사용하는 것은 권장되지 않습니다.
  자세한 내용은 [리스트 렌더링](/guide/essentials/list.html#v-for-with-v-if)을 참고하세요.

- **참고**: [조건부 랜더링 - v-if](/guide/essentials/conditional.html#v-if)

## v-else

`v-if` 또는 `v-else-if` 체인에 대한 `else`입니다.

- **표현식을 허용하지 않습니다**.

- **세부 사항**:

  - 제한사항: 이전 형제 엘리먼트에 `v-if` 또는 `v-else-if`가 있어야 합니다.

  - `<template>`에서 텍스트 또는 여러 엘리먼트를 포함하는 조건부 블록을 나타내는 데 사용할 수 있습니다.

- **예제**:

  ```vue-html
  <div v-if="Math.random() > 0.5">
    이제 나를 볼 수 있어요!
  </div>
  <div v-else>
    아직이에요!
  </div>
  ```

- **참고**: [조건부 랜더링 - v-else](/guide/essentials/conditional.html#v-else)

## v-else-if

`v-if`에 대한 `else if` 블록을 나타냅니다.
`v-else-if`는 계속 이어서 사용할 수 있습니다.

- **요구되는 값**: `any`

- **세부 사항**:

  - 제한사항: 이전 형제 엘리먼트에 `v-if` 또는 `v-else-if`가 있어야 합니다.

  - `<template>`에서 텍스트 또는 여러 엘리먼트를 포함하는 조건부 블록을 나타내는 데 사용할 수 있습니다.

- **예제**:

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    A/B/C 가 아니야!
  </div>
  ```

- **참고**: [조건부 랜더링 - v-else-if](/guide/essentials/conditional.html#v-else-if)

## v-for

소스 데이터를 기반으로 엘리먼트 또는 템플릿 블록을 여러 번 렌더링합니다.

- **요구되는 값**: `Array | Object | number | string | Iterable`

- **세부 사항**:

  디렉티브는 반복되는 과정의 현재 값에 별칭을 제공하기 위해,
  특수 문법인 `alias in expression`(표현식 내 별칭)을 사용해야 합니다:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  또한 인덱스(객체에서 사용되는 경우 키)의 별칭을 지정할 수도 있습니다:

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  `v-for`의 기본 동작은 엘리먼트를 이동하지 않고 제자리에 패치(patch)하려고 합니다.
  강제로 엘리먼트를 재정렬하려면,
  특수 속성 `key`를 사용하여 순서 지정을 위한 힌트를 제공해야 합니다:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for`는 네이티브 `Map`,`Set`과 더불어 [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)을 구현한 값에서도 작동합니다.

- **참고**:
  - [가이드 - 리스트 렌더링](/guide/essentials/list.html)

## v-on

엘리먼트에 이벤트 리스너를 연결합니다.

- **단축 문법:** `@`

- **요구되는 값**: `Function | Inline Statement | Object (without argument)`

- **인자:** `event` (선택사항: 객체 문법을 사용하는 경우)

- **수식어:**

  - `.stop` - call `event.stopPropagation()`.
  - `.prevent` - call `event.preventDefault()`.
  - `.capture` - add event listener in capture mode.
  - `.self` - only trigger handler if event was dispatched from this element.
  - `.{keyAlias}` - only trigger handler on certain keys.
  - `.once` - trigger handler at most once.
  - `.left` - only trigger handler for left button mouse events.
  - `.right` - only trigger handler for right button mouse events.
  - `.middle` - only trigger handler for middle button mouse events.
  - `.passive` - attaches a DOM event with `{ passive: true }`.

- **세부 사항**:

  The event type is denoted by the argument. The expression can be a method name, an inline statement, or omitted if there are modifiers present.

  When used on a normal element, it listens to [**native DOM events**](https://developer.mozilla.org/en-US/docs/Web/Events) only. When used on a custom element component, it listens to **custom events** emitted on that child component.

  When listening to native DOM events, the method receives the native event as the only argument. If using inline statement, the statement has access to the special `$event` property: `v-on:click="handle('ok', $event)"`.

  `v-on` also supports binding to an object of event / listener pairs without an argument. Note when using the object syntax, it does not support any modifiers.

  이벤트 타입은 인자로 표시됩니다.
  표현식은 메소드 이름 또는 인라인 명령문이거나,
  수식어가 있는 경우 생략될 수 있습니다.

  일반 엘리먼트에 사용되면 [**네이티브 DOM 이벤트**](https://developer.mozilla.org/en-US/docs/Web/Events)만 수신합니다.
  커스텀 엘리먼트 컴포넌트에서 사용되는 경우,
  해당 자식 컴포넌트에서 발송(emit)하는 **커스텀 이벤트**를 수신합니다.

  네이티브 DOM 이벤트를 수신할 때,
  메서드의 인자는 네이티브 이벤트 뿐 입니다.
  인라인 명령문을 사용하는 경우,
  명령문은 특수 속성인 `$event`로 `v-on:click="handle('ok', $event)"`와 같이 이벤트 객체에 접근할 수 있습니다.

  `v-on`은 인자 없이 `이벤트(키): 리스너(값)` 형식의 객체 바인딩도 지원합니다.
  수식어는 객체 문법을 사용할 때는 지원하지 않습니다.

- **예제**:

  ```vue-html
  <!-- 메소드 핸들러 -->
  <button v-on:click="doThis"></button>

  <!-- 동적 이벤트 -->
  <button v-on:[event]="doThis"></button>

  <!-- 인라인 표현식 -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- 단축 문법 -->
  <button @click="doThis"></button>

  <!-- 단축 문법 동적 이벤트 -->
  <button @[event]="doThis"></button>

  <!-- 전파 중지 -->
  <button @click.stop="doThis"></button>

  <!-- event.preventDefault() 작동 -->
  <button @click.prevent="doThis"></button>

  <!-- 표현식 없이 event.preventDefault()만 사용 -->
  <form @submit.prevent></form>

  <!-- 수식어 이어서 사용 -->
  <button @click.stop.prevent="doThis"></button>

  <!-- 키 별칭을 수식어로 사용 -->
  <input @keyup.enter="onEnter" />

  <!-- 클릭 이벤트 단 한 번만 트리거 -->
  <button v-on:click.once="doThis"></button>

  <!-- 객체 문법 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  자식 컴포넌트의 커스텀 이벤트 수신 대기(자식에서  "my-event"가 발생하면 핸들러가 호출됨):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- 인라인 표현식 -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **참고**:
  - [이벤트 핸들링](/guide/essentials/event-handling.html)
  - [컴포넌트 - 이벤트 청취하기](/guide/essentials/component-basics.html#listening-to-events)

## v-bind

하나 이상의 속성 또는 컴포넌트 prop을 표현식에 동적으로 바인딩합니다.

- **단축 문법:** `:` 또는 `.`(`.prop` 수식어를 사용할 때)

- **요구되는 값**: `any (인자 있이) | Object (인자 없이)`

- **인자:** `attrOrProp (optional)`

- **수식어:**

  - `.camel` - kebab-case 속성 이름을 camelCase로 변환.
  - `.prop` - 바인딩을 [DOM 속성(property: 이하 프로퍼티)](https://developer.mozilla.org/en-US/docs/Web/API/Element#properties)으로 강제 설정. <sup class="vt-badge">3.2+</sup>
  - `.attr` - 바인딩을 [DOM 속성(attribute)](https://developer.mozilla.org/en-US/docs/Glossary/Attribute)으로 강제 설정. <sup class="vt-badge">3.2+</sup>

- **사용법**:

  `class` 또는 `style` 속성을 바인딩하는 데 사용되는 경우,
  `v-bind`는 배열 또는 객체와 같이 값을 추가할 수 있는 타입을 지원합니다.
  자세한 내용은 아래 링크된 가이드 섹션을 참고합시다.

  엘리먼트에 바인딩을 설정할 때,
  Vue는 기본적으로 연산자 검사를 위한 `in`을 사용하여,
  엘리먼트에 프로퍼티로 정의된 키가 있는지 확인합니다.
  프로퍼티가 정의되면,
  Vue는 속성 대신 DOM 프로퍼티로 값을 설정합니다.
  이것은 대부분의 경우 작동하지만,
  `.prop` 또는 `.attr` 수식어를 명시적으로 사용하여 이 동작을 재정의할 수 있습니다.
  이것은 특히 [커스텀 엘리먼트로 작업](/guide/extras/web-components.html#passing-dom-properties)할 때 필요합니다.

  컴포넌트 prop 바인딩에 사용될 때 prop은 자식 컴포넌트에서 적절하게 선언되어야 합니다.

  인자 없이 사용하는 경우,
  속성을 이름-값 쌍으로 포함하는 객체를 바인딩하는 데 사용할 수 있습니다.
  이 모드에서 `class`와 `style`은 배열 또는 객체를 지원하지 않습니다.

- **예제**:

  ```vue-html
  <!-- 속성 바인딩 -->
  <img v-bind:src="imageSrc" />

  <!-- 동적인 속성명 -->
  <button v-bind:[key]="value"></button>

  <!-- 단축 문법 -->
  <img :src="imageSrc" />

  <!-- 단축 문법과 동적 속성명 -->
  <button :[key]="value"></button>

  <!-- 인라인으로 문자열 결합 -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- class 바인딩 -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- style 바인딩 -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- 속성을 객체로 바인딩 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- prop 바인딩. "prop"은 자식 컴포넌트에서 선언되어 있어야 함 -->
  <MyComponent :prop="someThing" />

  <!-- 자식 컴포넌트와 공유될 부모 props를 전달 -->
  <MyComponent v-bind="$props" />
  ```

  `.prop` 수식어에는 전용 단축 문법 `.`가 있습니다:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- 위 코드는 아래와 같이 단축할 수 있음 -->
  <div .someProperty="someObject"></div>
  ```

  `.camel` 수식어는 DOM 내 템플릿을 사용할 때,
  `v-bind`의 속성명을 카멜라이징(camelizing)할 수 있습니다.
  예를 들면, SVG `viewBox` 속성:

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  문자열 템플릿을 사용하거나 템플릿을 빌드 단계로 미리 컴파일하는 경우에는 `.camel`이 필요하지 않습니다.

- **참고**:
  - [가이드 - 클래스와 스타일 바인딩](/guide/essentials/class-and-style.html)
  - [가이드 - Props: Props 전달에 관한 심화](/guide/components/props.html#prop-passing-details)

## v-model

사용자 입력을 받는 폼(form) 엘리먼트 또는 컴포넌트에 양방향 바인딩을 만듭니다.

- **요구되는 값**: 사용자 입력을 ㄹ받는 폼 엘리먼트 또는 컴포넌트의 출력 값에 따라 다름.

- **다음으로 제한됨**:

  - `<input>`
  - `<select>`
  - `<textarea>`
  - 컴포넌트

- **수식어:**

  - [`.lazy`](/guide/essentials/forms.html#lazy) - `input` 대신 `change` 이벤트를 수신함.
  - [`.number`](/guide/essentials/forms.html#number) - 유효한 입력 문자열을 숫자로 변환하여 전달.
  - [`.trim`](/guide/essentials/forms.html#trim) - 사용자 입력의 공백을 트리밍.

- **참고**:

  - [가이드 - Form 입력 바인딩](/guide/essentials/forms.html)
  - [가이드 - 이벤트: `v-model`과 함께 사용하기](/guide/components/events.html#usage-with-v-model)

## v-slot

이름이 있는 슬롯 또는 props를 받을 것으로 예상되는 슬롯을 나타냅니다.

- **단축 문법:** `#`

- **요구되는 값**: JavaScript expression that is valid in a function argument position, including support for destructuring. Optional - only needed if expecting props to be passed to the slot.

- **인자:** slot name (optional, defaults to `default`)

- **다음으로 제한됨**:

  - `<template>`
  - [컴포넌트](/guide/components/slots.html#scoped-slots) (props를 수신할 기본 슬롯만 있는 경우)

- **예제**:

  ```vue-html
  <!-- 이름이 있는 슬롯 -->
  <BaseLayout>
    <template v-slot:header>
      해더 컨텐츠
    </template>

    <template v-slot:default>
      기본 슬롯 컨텐츠
    </template>

    <template v-slot:footer>
      푸터 컨텐츠
    </template>
  </BaseLayout>

  <!-- props를 수신할 기본 슬롯 -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- props를 수신할 기본 슬롯, 분해할당을 사용 -->
  <Mouse v-slot="{ x, y }">
    마우스 위치: {{ x }}, {{ y }}
  </Mouse>
  ```

- **참고**:
  - [가이드 - 슬롯](/guide/components/slots.html)

## v-pre

이 엘리먼트와 모든 자식 엘리먼트의 컴파일을 생략합니다.

- **표현식을 허용하지 않습니다**.

- **세부 사항**:

  `v-pre`가 있는 엘리먼트 내에서 모든 Vue 템플릿 구문은 그대로 유지되고 렌더링됩니다.
  가장 일반적인 사용 사례는 이중 중괄호 태그를 표시하는 것입니다.

- **예제**:

  ```vue-html
  <span v-pre>{{ 이곳은 컴파일되지 않습니다. }}</span>
  ```

## v-once

엘리먼트와 컴포넌트를 한 번만 렌더링하고,
향후 업데이트를 생략합니다.

- **표현식을 허용하지 않습니다**.

- **세부 사항**:

  이후 다시 렌더링할 때 엘리먼트/컴포넌트 및 모든 자식들은 정적 콘텐츠로 처리되어 생략됩니다.
  이것은 업데이트 성능을 최적화하는 데 사용할 수 있습니다.

  ```vue-html
  <!-- 단일 엘리먼트 -->
  <span v-once>절대 바뀌지 않음: {{msg}}</span>
  <!-- 자식이 있는 엘리먼트 -->
  <div v-once>
    <h1>댓글</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 컴포넌트 -->
  <my-component v-once :comment="msg"></my-component>
  <!-- `v-for` 디렉티브 -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  3.2부터는 [`v-memo`](#v-memo)를 사용하여 무효화 조건으로 템플릿의 일부를 메모화할 수도 있습니다.

- **참고**:
  - [가이드 - 템플릿 문법: 텍스트 보간법](/guide/essentials/template-syntax.html#text-interpolation)
  - [v-memo](#v-memo)

## v-memo <sup class="vt-badge" data-text="3.2+" />

- **요구되는 값**: `any[]`

- **세부 사항**:

  템플릿의 하위 트리를 메모합니다.
  엘리먼트와 컴포넌트 모두에 사용할 수 있습니다.
  디렉티브는 메모이제이션을 위해 비교할 종속성 값의 고정된 길이의 배열을 요구합니다.
  배열의 모든 값이 마지막 렌더링과 같으면 전체 하위 트리에 대한 업데이트를 생략합니다.
  예를 들어:

  ```vue-html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  컴포넌트가 다시 렌더링될 때 `valueA`와 `valueB`가 모두 동일하게 유지되면,
  이 `<div>`와 하위 항목에 대한 모든 업데이트를 생략합니다.
  사실, 하위 트리의 메모된 복사본을 재사용할 수 있기 때문에 가상 DOM VNode 생성도 생략합니다.

  메모이제이션 배열을 올바르게 지정하는 것이 중요합니다.
  그렇지 않으면 실제로 적용되어야 하는 업데이트를 건너뛸 수 있습니다.
  빈 종속성 배열(`v-memo="[]"`)이 있는 `v-memo`는 기능적으로 `v-once`와 동일합니다.

  **`v-for`과 함께 사용하기**

  `v-memo`는 성능이 중요한 시나리오에서 마이크로 최적화를 위해 제공되는 것으로,
  일반적으로 거의 필요하지 않습니다.
  이것이 도움이 될 수 있는 가장 일반적인 경우는 큰 리스트(`length > 1000`)를 `v-for`로 렌더링할 때입니다:

  ```vue-html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - 선택됨: {{ item.id === selected }}</p>
    <p>...더 많은 자식 노드</p>
  </div>
  ```

  컴포넌트의 `selected` 상태가 변경되면,
  대부분의 아이템이 정확히 동일하게 유지되더라도 많은 양의 VNode가 생성됩니다.
  여기서 `v-memo` 사용법은 본질적으로 "아이템의 선택여부가 바뀐 경우에만, 이 아이템을 업데이트하십시오"입니다.
  이렇게 하면 영향을 받지 않는 모든 아이템이 이전 VNode를 재사용하고,
  차이점 비교를 생략할 수 있습니다.
  Vue는 아이템의 `:key`로 자동 추론하므로,
  메모 종속성 배열에 `item.id`를 포함할 필요가 없습니다.

  :::warning
  `v-for`와 함께 `v-memo`를 사용할 때,
  동일한 엘리먼트에 사용되는지 확인이 필요합니다.
  **`v-memo`는 `v-for` 내에서 작동하지 않습니다**.
  :::

  `v-memo`는 자식 컴포넌트 업데이트 확인이 최적화되지 않은 특정 엣지 케이스에서 원치 않는 업데이트를 수동으로 방지하기 위해 컴포넌트에 사용할 수도 있습니다.
  그러나 필요한 업데이트를 건너뛰지 않도록 올바른 종속성 배열을 지정하는 것은 개발자의 책임입니다.

- **참고**:
  - [v-once](#v-once)

## v-cloak

준비될 때까지 컴파일되지 않은 템플릿을 숨기는 데 사용됩니다.

- **표현식을 허용하지 않습니다**.

- **세부 사항**:

  **이 디렉티브는 빌드 단계가 없는 설정에서만 필요합니다**.

  DOM 내 템플릿을 사용할 때,
  "컴파일되지 않은 템플릿이 순간 보이는 현상"이 있을 수 있습니다.
  이러면 사용자는 컴포넌트가 렌더링된 콘텐츠로 대체할 때까지 이중 중괄호 태그를 볼 수 있습니다.

  `v-cloak`은 연결된 컴포넌트 인스턴스가 마운트될 때까지 엘리먼트에 남아 있습니다.
  `[v-cloak] { display: none }`과 같은 CSS 규칙과 결합하여,
  컴포넌트가 준비될 때까지 템플릿을 숨기는 데 사용할 수 있습니다.

- **예제**:

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  `<div>`는 컴파일이 완료될 때까지 표시되지 않습니다.
