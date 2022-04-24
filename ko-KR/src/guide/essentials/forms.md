---
outline: deep
---

<script setup>
import { ref } from 'vue'
const message = ref('')
const multilineText = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelected = ref([])
</script>

:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Form Input Bindings
# 폼 입력 바인딩

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-inputs-vue-devtools-in-vue-3" title="Free Lesson on User Inputs with Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-inputs-in-vue" title="Free Lesson on User Inputs with Vue.js"/>
</div>

When dealing with forms on the frontend, we often need to sync the state of form input elements with corresponding state in JavaScript. It can be cumbersome to manually wire up value bindings and change event listeners:

프론트엔드에서 폼을 처리할 때 폼의 입력 앨리먼트의 상태를 자바스크립트의 해당 상태와 동기화해야 하는 경우가 많습니다. 수동으로 값을 바인딩하고 이벤트 리스너를 변경하는 것은 번거로운 작업입니다:


```vue-html
<input
  :value="text"
  @input="event => text = event.target.value">
```

The `v-model` directive helps us simplify the above to:

`v-model` 디렉티브는 위 코드를 간단하게 만들어 줍니다:


```vue-html
<input v-model="text">
```

In addition, `v-model` can be used on inputs of different types, `<textarea>`, and `<select>` elements. It automatically expands to different DOM property and event pairs based on the element it is used on:

또한 `v-model`은 다른 유형의 입력, `<textarea>` 및 `<select>` 앨리먼트에 사용할 수 있습니다. 사용되는 앨리먼트에 따라 자동으로 다른 DOM 속성 및 이벤트 쌍으로 확장됩니다.


- `<input>` with text types and `<textarea>` elements use `value` property and `input` event;
- 텍스트 타입의 `<input>` 과  `<textarea>` 앨리먼트는 `value`  속성과  `input` 이벤트를 사용합니다;
- `<input type="checkbox">` and `<input type="radio">` use `checked` property and `change` event;
- `<input type="checkbox">`,  `<input type="radio">`  은  `checked` 속성과 `change` 이벤트를 사용합니다;
- `<select>` use `value` as a prop and `change` as an event.
- `<select>` 는  `value` 속성과 `change` 이벤트를 사용합니다. 

::: tip Note
`v-model` will ignore the initial `value`, `checked` or `selected` attributes found on any form elements. It will always treat the current bound JavaScript state as the source of truth. You should declare the initial value on the JavaScript side, using <span class="options-api">the `data` option</span><span class="composition-api">reactivity APIs</span>.
:::

::: tip 참고
`v-model`은 모든 폼 앨리먼트에서 발견된 초기 `value`, `checked` 또는 `selected` 속성을 무시합니다. 항상 현재 바인딩된 자바스트립 상태를 진실의 소스로 취급합니다. <span class="options-api">`data` 옵션</span><span class="composition-api">reactivity API</span>를 사용하여 자바스트립에서 초기 값을 선언해야 합니다.
:::

## Basic Usage
## 기본 사용법

### Text
### 텍스트

```vue-html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

<div class="demo">
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPk1lc3NhZ2UgaXM6IHt7IG1lc3NhZ2UgfX08L3A+XG5cdDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiZWRpdCBtZVwiIC8+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

<span id="vmodel-ime-tip"></span>
::: tip Note
For languages that require an [IME](https://en.wikipedia.org/wiki/Input_method) (Chinese, Japanese, Korean etc.), you'll notice that `v-model` doesn't get updated during IME composition. If you want to respond to these updates as well, use an `input` event listener and `value` binding instead of using `v-model`.
:::

::: tip 참고
[IME](https://en.wikipedia.org/wiki/Input_method)(중국어, 일본어, 한국어 등)가 필요한 언어의 경우 IME 조합중에는 `v-model`이 업데이트되지 않습니다.  이러한 업데이트에도 응답하려면 `v-model`을 사용하는 대신 `input` 이벤트 리스너와 `value` 바인딩을 사용하세요.
:::

### Multiline text
### 여러 줄 텍스트

```vue-html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

<div class="demo">
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbWVzc2FnZSA9IHJlZignJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuPk11bHRpbGluZSBtZXNzYWdlIGlzOjwvc3Bhbj5cblx0PHAgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XCI+e3sgbWVzc2FnZSB9fTwvcD5cblx0PHRleHRhcmVhIHYtbW9kZWw9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJhZGQgbXVsdGlwbGUgbGluZXNcIj48L3RleHRhcmVhPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Note that interpolation inside `<textarea>` won't work. Use `v-model` instead.

`<textarea>` 태그내에서 문자열 보간은 작동하지 않습니다. 대신 `v-model`을 사용하세요.


```vue-html
<!-- bad -->
<textarea>{{ text }}</textarea>

<!-- good -->
<textarea v-model="text"></textarea>
```

### Checkbox
### 체크박스

Single checkbox, boolean value:

단일 체크박스, boolean 값:

```vue-html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

<div class="demo">
  <input type="checkbox" id="checkbox-demo" v-model="checked" />
  <label for="checkbox-demo">{{ checked }}</label>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZCA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3hcIiB2LW1vZGVsPVwiY2hlY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJjaGVja2JveFwiPnt7IGNoZWNrZWQgfX08L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

We can also bind multiple checkboxes to the same array or [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) value:

하나의 배열(또는 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) )로 다수의  체크박스를 바인딩 할 수도 있습니다.


<div class="composition-api">

```js
const checkedNames = ref([])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
```

</div>

```vue-html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

<div class="demo">
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="demo-jack" value="Jack" v-model="checkedNames">
  <label for="demo-jack">Jack</label>

  <input type="checkbox" id="demo-john" value="John" v-model="checkedNames">
  <label for="demo-john">John</label>

  <input type="checkbox" id="demo-mike" value="Mike" v-model="checkedNames">
  <label for="demo-mike">Mike</label>
</div>

In this case, the `checkedNames` array will always contain the values from the currently checked boxes.

이렇게 하면 `checkedNames`에는 현재 체크된 체크박스들의 값을 가지고 있게 됩니다. 

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY2hlY2tlZE5hbWVzID0gcmVmKFtdKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZE5hbWVzOiBbXVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5DaGVja2VkIG5hbWVzOiB7eyBjaGVja2VkTmFtZXMgfX08L2Rpdj5cblxuICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJqYWNrXCIgdmFsdWU9XCJKYWNrXCIgdi1tb2RlbD1cImNoZWNrZWROYW1lc1wiIC8+XG4gIDxsYWJlbCBmb3I9XCJqYWNrXCI+SmFjazwvbGFiZWw+XG4gXG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImpvaG5cIiB2YWx1ZT1cIkpvaG5cIiB2LW1vZGVsPVwiY2hlY2tlZE5hbWVzXCIgLz5cbiAgPGxhYmVsIGZvcj1cImpvaG5cIj5Kb2huPC9sYWJlbD5cbiBcbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibWlrZVwiIHZhbHVlPVwiTWlrZVwiIHYtbW9kZWw9XCJjaGVja2VkTmFtZXNcIiAvPlxuICA8bGFiZWwgZm9yPVwibWlrZVwiPk1pa2U8L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Radio
### 라디오

```vue-html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

<div class="demo">
  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgcGlja2VkID0gcmVmKCdPbmUnKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG4gIDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGlja2VkOiAnT25lJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGRpdj5QaWNrZWQ6IHt7IHBpY2tlZCB9fTwvZGl2PlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm9uZVwiIHZhbHVlPVwiT25lXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJvbmVcIj5PbmU8L2xhYmVsPlxuXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInR3b1wiIHZhbHVlPVwiVHdvXCIgdi1tb2RlbD1cInBpY2tlZFwiIC8+XG5cdDxsYWJlbCBmb3I9XCJ0d29cIj5Ud288L2xhYmVsPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### Select

Single select:

단일 select:

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJycpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCI+XG4gICAgPG9wdGlvbiBkaXNhYmxlZCB2YWx1ZT1cIlwiPlBsZWFzZSBzZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICcnXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c3Bhbj4gU2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9zcGFuPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gZGlzYWJsZWQgdmFsdWU9XCJcIj5QbGVhc2Ugc2VsZWN0IG9uZTwvb3B0aW9uPlxuICAgIDxvcHRpb24+QTwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qjwvb3B0aW9uPlxuICAgIDxvcHRpb24+Qzwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

:::tip Note
If the initial value of your `v-model` expression does not match any of the options, the `<select>` element will render in an "unselected" state. On iOS this will cause the user not being able to select the first item because iOS does not fire a change event in this case. It is therefore recommended to provide a disabled option with an empty value, as demonstrated in the example above.
:::

:::tip 참조
`v-model` 표현식의 초기 값이 어떤 옵션에도 없으면, `<select>` 엘리먼트는 "선택없음"("unselected") 상태로 렌더링됩니다. iOS에서는 이 경우 변경 이벤트가 발생하지 않아 사용자가 첫 번째 항목을 선택할 수 없게됩니다. 따라서 위 예제처럼 사용하지 않는 옵션에 빈 값을 넣는 것이 좋습니다. 
:::

Multiple select (bound to array):

다중 셀렉트 (배열로 바인딩됨):

```vue-html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

<div class="demo">
  <div>Selected: {{ multiSelected }}</div>

  <select v-model="multiSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoW10pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6IFtdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlNlbGVjdGVkOiB7eyBzZWxlY3RlZCB9fTwvZGl2PlxuXG4gIDxzZWxlY3Qgdi1tb2RlbD1cInNlbGVjdGVkXCIgbXVsdGlwbGU+XG4gICAgPG9wdGlvbj5BPC9vcHRpb24+XG4gICAgPG9wdGlvbj5CPC9vcHRpb24+XG4gICAgPG9wdGlvbj5DPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuc2VsZWN0W211bHRpcGxlXSB7XG4gIHdpZHRoOiAxMDBweDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

Select options can be dynamically rendered with `v-for`:

`v-for` 를 이용한 동적 옵션 렌더링:

<div class="composition-api">

```js
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  }
}
```

</div>

```vue-html
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```

<div class="composition-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2VsZWN0ZWQgPSByZWYoJ0EnKVxuXG5jb25zdCBvcHRpb25zID0gcmVmKFtcbiAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG5dKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNlbGVjdCB2LW1vZGVsPVwic2VsZWN0ZWRcIj5cbiAgICA8b3B0aW9uIHYtZm9yPVwib3B0aW9uIGluIG9wdGlvbnNcIiA6dmFsdWU9XCJvcHRpb24udmFsdWVcIj5cbiAgICAgIHt7IG9wdGlvbi50ZXh0IH19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuXG5cdDxkaXY+U2VsZWN0ZWQ6IHt7IHNlbGVjdGVkIH19PC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6ICdBJyxcbiAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgeyB0ZXh0OiAnT25lJywgdmFsdWU6ICdBJyB9LFxuICAgICAgICB7IHRleHQ6ICdUd28nLCB2YWx1ZTogJ0InIH0sXG4gICAgICAgIHsgdGV4dDogJ1RocmVlJywgdmFsdWU6ICdDJyB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8c2VsZWN0IHYtbW9kZWw9XCJzZWxlY3RlZFwiPlxuICAgIDxvcHRpb24gdi1mb3I9XCJvcHRpb24gaW4gb3B0aW9uc1wiIDp2YWx1ZT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAge3sgb3B0aW9uLnRleHQgfX1cbiAgICA8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG5cblx0PGRpdj5TZWxlY3RlZDoge3sgc2VsZWN0ZWQgfX08L2Rpdj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## Value Bindings
## 값 바인딩하기

For radio, checkbox and select options, the `v-model` binding values are usually static strings (or booleans for checkbox):

라디오, 체크박스 및 셀렉트 옵션의 경우, `v-model` 바인딩 값은 보통 정적인 문자열(또는 체크 박스의 boolean) 입니다.


```vue-html
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

But sometimes we may want to bind the value to a dynamic property on the current active instance. We can use `v-bind` to achieve that. In addition, using `v-bind` allows us to bind the input value to non-string values.

그러나 때로는 현재 활성 인스턴스의 동적 속성에 값을 바인딩하려고 할 때, `v-bind`를 사용할 수 있습니다. 또한, `v-bind`를 사용하면 입력 값을 문자열이 아닌 값에 바인딩 할 수 있습니다.


### Checkbox

```vue-html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` and `false-value` are Vue-specific attributes that only work with `v-model`. Here the `toggle` property's value will be set to `'yes'` when the box is checked, and set to `'no'` when unchecked. You can also bind them to dynamic values using `v-bind`:

`true-value` 및 `false-value`는 `v-model`에서만 작동하는 Vue 전용 속성입니다. 여기에서 `toggle` 속성의 값은 체크박스가 선택되면 `'yes'`로 설정되고, 선택하지 않으면 `'no'`로 설정됩니다. `v-bind`를 사용하여 동적 값에 바인딩할 수도 있습니다.


```vue-html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

:::tip Tip
The `true-value` and `false-value` attributes don't affect the input's `value` attribute, because browsers don't include unchecked boxes in form submissions. To guarantee that one of two values is submitted in a form (e.g. "yes" or "no"), use radio inputs instead.
:::

:::tip Tip
브라우저는 폼 전송(form submission) 시 체크되지 않은 박스를 포함하지 않기 때문에, `true-value` 와 `false-value` 속성은 입력의 `value` 특성에 영향을 주지 않습니다. 두 값("예" 또는 "아니오") 중 하나가 폼을 통해 전송되려면 라디오를 대신 사용하십시오. 
:::

### Radio
### 라디오

```vue-html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick` will be set to the value of `first` when the first radio input is checked, and set to the value of `second` when the second one is checked.

`pick`는 첫 번째 라디오 입력이 확인되면 `first` 값으로 설정되고 두 번째 라디오 입력이 확인되면 `second` 값으로 설정됩니다.


### Select Options

### Select 옵션

```vue-html
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` supports value bindings of non-string values as well! In the above example, when the option is selected, `selected` will be set to the object literal value of `{ number: 123 }`.

`v-model`은 문자열이 아닌 값의 값 바인딩도 지원합니다! 위의 예에서 옵션이 선택되면 `selected`는 `{ number: 123 }`의 객체 리터럴 값으로 설정됩니다.


## Modifiers
## 수식어

### `.lazy`

By default, `v-model` syncs the input with the data after each `input` event (with the exception of IME composition as [stated above](#vmodel-ime-tip)). You can add the `lazy` modifier to instead sync after `change` events:

기본적으로, `v-model`은 각 `input` 이벤트 후 입력과 데이터를 동기화 합니다. (단, [앞에서 설명](#vmodel-ime-tip)한 IME 조합은 제외됩니다.). `lazy` 수식어를 추가하여 `change` 이벤트 이후에 동기화 할 수 있습니다.:


```vue-html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```

### `.number`

If you want user input to be automatically typecast as a number, you can add the `number` modifier to your `v-model` managed inputs:

사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, `v-model`이 관리하는 input에 `number` 수식어를 추가하면 됩니다:


```vue-html
<input v-model.number="age" />
```

If the value cannot be parsed with `parseFloat()`, then the original value is used instead.

만약, 값이 `parseFloat()`에 의해서 분석할 수 없는 경우, 원래의 값이 리턴됩니다.

The `number` modifier is applied automatically if the input has `type="number"`.

폼 input이 `type="number"` 일때 `number` 수정자는 자동으로 적용 됩니다.

### `.trim`

If you want whitespace from user input to be trimmed automatically, you can add the `trim` modifier to your `v-model`-managed inputs:

사용자가 입력한 내용에서 자동으로 앞뒤 공백을 제거하는 트림 처리가 되길 바란다면, `v-model`이 관리하는 input에 `trim` 수식어를 추가하면 됩니다:


```vue-html
<input v-model.trim="msg" />
```

## `v-model` with Components
## 컴포넌트에서의 `v-model`

> If you're not yet familiar with Vue's components, you can skip this for now.

> 아직 Vue 컴포넌트에 익숙하지 않다면 지금은 넘어가도 됩니다.


HTML's built-in input types won't always meet your needs. Fortunately, Vue components allow you to build reusable inputs with completely customized behavior. These inputs even work with `v-model`! To learn more, read about [Usage with `v-model`](/guide/components/events.html#usage-with-v-model) in the Components guide.


HTML의 기본 제공(built-in) input type은 항상 사용자의 요구를 만족시킬 수는 없습니다. 다행히, Vue 컴포넌트는 완전히 사용자 정의된 동작의 재사용 가능한 input을 만들 수 있습니다. 이 input은 `v-model`에도 작동합니다! 자세한 내용은 컴포넌트 가이드의 [사용자 정의 입력](/guide/components/events.html#usage-with-v-model)을 참조하십시오.


