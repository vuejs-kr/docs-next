:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# 우선순위 A: 필수(오류 예방)  {#priority-a-rules-essential}


이러한 규칙은 오류를 방지하는 데 도움이 되므로 반드시 숙지하고 준수하세요. 예외가 있을 수 있지만 매우 드물게 발생하며 JavaScript와 Vue에 대한 전문 지식이 있는 사람만 예외를 만들어야 합니다.

## 여러 단어로 된 컴포넌트명을 사용하세요 {#use-multi-word-component-names}

사용자 컴포넌트 이름은 루트 `App` 컴포넌트를 제외하고 항상 다중 단어여야 합니다. 이렇게 하면 모든 HTML 요소가 단일 단어이므로 기존 및 향후 HTML 요소와의 [충돌을 방지](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)할 수 있습니다.

<div class="style-example style-example-bad">
<h3>나쁨</h3>

```vue-html
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>좋음</h3>

```vue-html
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

</div>

## 자세한 Prop 정의 사용 {#use-detailed-prop-definitions}

커밋된 코드에서 프로퍼티 정의는 항상 최소한 유형을 지정하여 가능한 한 상세하게 작성해야 합니다.

::: details 상세설명
자세한 [prop 정의](/guide/components/props.html#prop-validation)에는 두 가지 장점이 있습니다:

- 컴포넌트의 API를 문서화하므로 컴포넌트가 어떻게 사용되는지 쉽게 확인할 수 있습니다.
- 개발 과정에서 컴포넌트에 잘못된 형식의 프로퍼티가 제공되면 Vue에서 경고를 표시하여 잠재적인 오류 원인을 파악할 수 있도록 도와줍니다.
  :::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// This is only OK when prototyping
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
props: {
  status: String
}
```

```js
// Even better!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

## `v-for`에 key 사용하기 {#use-keyed-v-for}

하위 트리에서 내부 컴포넌트 상태를 유지하기 위해 컴포넌트에는 `v-for`와 함께 `key`가 `항상` 필요합니다. 하지만 엘리먼트의 경우에도 애니메이션의 [객체 불변성](https://bost.ocks.org/mike/constancy/)과 같이 예측 가능한 동작을 유지하는 것이 좋습니다.



::: details 상세설명
할 일 목록이 있다고 가정해 봅시다:


```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

그런 다음 알파벳순으로 정렬합니다. DOM을 업데이트할 때 Vue는 렌더링을 최적화하여 가능한 한 가장 저렴한 DOM 변형을 수행합니다. 이는 첫 번째 할 일 요소를 삭제한 다음 목록 끝에 다시 추가하는 것을 의미할 수 있습니다.



문제는 DOM에 남을 요소를 삭제하지 않는 것이 중요한 경우가 있다는 것입니다. 예를 들어 `<transition-group>`을 사용하여 목록 정렬에 애니메이션을 적용하거나 렌더링된 요소가 `<input>`인 경우 포커스를 유지하려고 할 수 있습니다. 이러한 경우 각 항목에 고유 키(예: `:key="todo.id"`)를 추가하면 Vue가 보다 예측 가능한 방식으로 작동하는 방법을 알 수 있습니다.

저희 경험상 고유 키를 _항상_ 추가하는 것이 좋습니다. 그래야 여러분과 여러분의 팀이 이러한 에지 케이스에 대해 걱정할 필요가 없습니다. 그런 다음 객체 불변성이 필요하지 않은 드물고 성능에 중요한 시나리오에서는 의도적으로 예외를 만들 수 있습니다.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## `v-if`와  `v-for`를 같이 사용하지 않기 {#avoid-v-if-with-v-for}

**v-for`와 같은 요소에 `v-if`를 사용하지 마세요.**

두 가지 일반적인 경우가 있습니다:

- 목록의 항목을 필터링하는 경우(예: `v-for="user in users" v-if="user.isActive"`). 이러한 경우 `users`를 필터링된 목록을 반환하는 새로운 계산된 속성(예: `activeUsers`)으로 대체하세요.

- 숨겨야 하는 경우 목록을 렌더링하지 않으려면(예: `v-for="user in users" v-if="shouldShowUsers"`). 이 경우 `v-if`를 컨테이너 요소(예: `ul`, `ol`)로 이동합니다.


::: details 상세 설명
Vue가 지시문을 처리할 때 `v-if`는 `v-for`보다 우선순위가 높으므로 이 템플릿이 적용됩니다:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

`v-if` 지시어가 먼저 평가되고 현재 반복 변수 `user`가 존재하지 않기 때문에 오류가 발생합니다.

이 문제는 다음과 같이 계산된 프로퍼티를 반복하여 해결할 수 있습니다:


```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

또는 `v-for`와 함께 `<템플template릿>` 태그를 사용하여 `<li>` 요소를 래핑할 수 있습니다:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## 컴포넌트 범위 스타일링 사용 {#use-component-scoped-styling}

애플리케이션의 경우 최상위 `App` 컴포넌트와 레이아웃 컴포넌트의 스타일은 전역적일 수 있지만 다른 모든 컴포넌트는 항상 범위가 지정되어야 합니다.

이는 [단일 파일 컴포넌트](/guide/scaling-up/sfc.html)에만 해당됩니다. 반드시 [`scoped` 속성](https://vue-loader.vuejs.org/en/features/scoped-css.html)을 사용할 필요는 없습니다. 범위 지정은 [CSS 모듈](https://vue-loader.vuejs.org/en/features/css-modules.html), [BEM](http://getbem.com/)과 같은 클래스 기반 전략 또는 다른 라이브러리/규약을 통해 이루어질 수 있습니다.

**그러나 컴포넌트 라이브러리는 `scoped` 속성을 사용하는 대신 클래스 기반 전략을 선호해야 합니다.**

이렇게 하면 내부 스타일을 재정의하기가 더 쉬워지며, 사람이 읽을 수 있는 클래스 이름은 너무 구체적이지는 않지만 충돌이 발생할 가능성은 매우 낮습니다.

::: details Detailed Explanation
대규모 프로젝트를 개발 중이거나 다른 개발자와 함께 작업하거나 때로는 타사 HTML/CSS(예: Auth0)를 포함하는 경우 일관된 범위를 지정하면 스타일이 해당 컴포넌트에만 적용되도록 할 수 있습니다.

`scoped` 속성 외에도 고유한 클래스 이름을 사용하면 타사 CSS가 자신의 HTML에 적용되지 않도록 할 수 있습니다. 예를 들어, 많은 프로젝트에서 `button`, `btn` 또는 `icon` 클래스 이름을 사용하므로 BEM과 같은 전략을 사용하지 않더라도 앱별 및/또는 컴포넌트별 접두사(예: `ButtonClose-icon`)를 추가하면 어느 정도 보호 기능을 제공할 수 있습니다.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
