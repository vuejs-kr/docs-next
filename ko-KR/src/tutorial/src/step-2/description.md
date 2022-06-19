# 선언적 렌더링

<div class="sfc">

편집기에 보이는 것은 Vue SFC(Single File Component)입니다.
SFC는 HTML, CSS, JavaScript를 캡슐화한 코드 블록으로 재사용 가능한 `.vue` 파일입니다.

</div>

Vue의 핵심 기능은 **선언적 렌더링**입니다.
HTML을 확장하는 템플릿 문법을 사용하여 JavaScript 상태를 기반으로 HTML이 어떻게 보이는지 설명할 수 있습니다.
상태가 변경되면 HTML이 자동으로 업데이트됩니다.

<div class="composition-api">

변경 시, 업데이트를 트리거할 수 있는 상태는 **반응형**으로 간주됩니다.
Vue의 `reactive()` API를 사용하여 반응형 상태를 선언할 수 있습니다.
`reactive()`로 생성된 객체는 일반 객체처럼 작동하는 JavaScript [프록시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)입니다:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`reactive()`는 객체(배열, `Map`, `Set`과 같은 빌트인 타입 포함)에서만 작동합니다.
반면에 `ref()`는 모든 타입의 값을 사용할 수 있으며,
`.value` 속성으로 내부 값을 노출하는 객체를 생성합니다.

```js
import { ref } from 'vue'

const message = ref('안녕 Vue!')

console.log(message.value) // "안녕 Vue!"
message.value = '메세지 변경됨'
```

`reactive()` 및 `ref()`에 대한 자세한 내용은 <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">가이드 - 반응형 기초</a>에서 설명합니다.

<div class="sfc">

컴포넌트의 `<script setup>` 블록에 선언된 반응형 상태는 템플릿에서 직접 사용할 수 있습니다.
이것은 이중 중괄호 문법을 사용하여 `counter` 객체와 `message` ref의 값을 동적으로 텍스트로 렌더링하는 방법입니다.

</div>

<div class="html">

`createApp()`에 전달되는 객체는 Vue 컴포넌트입니다.
컴포넌트의 상태는 `setup()` 함수 내에서 선언되어야 하며, 객체를 사용하여 반환되어야 합니다:

```js{2,5}
setup() {
  const counter = reactive({ count: 0 })
  const message = ref('안녕 Vue!')
  return {
    counter,
    message
  }
}
```

반환된 객체의 속성은 템플릿에서 사용할 수 있습니다.
이것은 이중 중괄호 문법을 사용하여 `message` 값을 동적 텍스트로 렌더링하는 방법입니다:

</div>

```vue-html
<h1>{{ message }}</h1>
<p>숫자 세기: {{ counter.count }}</p>
```

템플릿에서 `message` ref에 접근할 때, `.value`를 사용할 필요가 없습니다!
보다 간결한 사용을 위해 자동으로 언래핑됩니다.

</div>

<div class="options-api">

변경 시, 업데이트를 트리거할 수 있는 상태는 **반응형**으로 간주됩니다.
Vue에서 반응형 상태는 컴포넌트에 유지됩니다.
예제 코드에서 `createApp()`에 전달되는 객체는 컴포넌트입니다.

컴포넌트에서 객체를 반환해야하는 함수 `data` 옵션을 사용하여 반응형 상태를 선언할 수 있습니다:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: '안녕 Vue!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: '안녕 Vue!'
    }
  }
})
```

</div>

템플릿에서 `message` 속성을 사용할 수 있습니다.
이것은 이중 중괄호 문법을 사용하여 `message` 값을 동적으로 텍스트로 렌더링하는 방법입니다:

```vue-html
<h1>{{ message }}</h1>
```

</div>

이중 중괄호 내부의 내용은 식별자나 경로에만 국한되지 않습니다.
유효한 JavaScript 표현식을 사용할 수도 있습니다:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

이제 반응형 상태를 직접 만들고 이를 사용하여 템플릿의 `<h1>`에 동적 텍스트 콘텐츠를 렌더링해봅시다.

</div>

<div class="options-api">

이제 직접 `data` 속성을 만들고 템플릿의 `<h1>`에 텍스트 콘텐츠로 사용해봅시다.

</div>
