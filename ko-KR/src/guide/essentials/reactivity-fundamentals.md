---
outline: deep
---

# 반응형 기초

:::tip API 기본설정
이 페이지와 이후 다른 가이드의 많은 챕터에는 옵션과 컴포지션 API에 대한 다양한 콘텐츠가 포함되어 있습니다.
현재 기본 설정은 <span class="options-api">옵션 API</span><span class="composition-api">컴포지션 API</span>입니다.
좌측 사이드바 상단에 있는 "API 스타일 설정" 스위치를 사용하여 API 스타일을 전환할 수 있습니다.
:::

## 반응형 상태 설정

<div class="options-api">

옵션 API에서는 `data` 옵션을 사용하여 컴포넌트의 반응형 상태를 선언합니다.
옵션 값은 객체를 반환하는 함수여야 합니다.
Vue는 새 컴포넌트 인스턴스를 만들 때 함수를 호출하고, 반환된 객체를 반응형 시스템에 래핑합니다.
이 객체 내 모든 속성은 해당 컴포넌트 인스턴스(메서드 및 수명 주기 훅에서 `this`)에서 최상위에 프록시(proxy)되어 노출됩니다.

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted`는 나중에 설명할 수명 주기 훅입니다.
  mounted() {
    // `this`는 컴포넌트 인스턴스를 나타냅니다.
    console.log(this.count) // => 1

    // 값을 변경할 수 있습니다.
    this.count = 2
  }
}
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRg64qUIOuCmOykkeyXkCDshKTrqoXtlaAg7IiY66qFIOyjvOq4sCDtm4XsnoXri4jri6QuXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNg64qUIOy7tO2PrOuEjO2KuCDsnbjsiqTthLTsiqTrpbwg64KY7YOA64OF64uI64ukLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIOqwkuydhCDrs4Dqsr3tlaAg7IiYIOyeiOyKteuLiOuLpC5cbiAgICB0aGlzLmNvdW50ID0gMlxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBDb3VudCBpczoge3sgY291bnQgfX1cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

이러한 인스턴스 속성은 인스턴스를 처음 만들 때만 추가되므로, `data` 함수에 의해 반환되는 객체에 선언되었는지 확인해야 합니다.
바로 사용하지 않아 빈 값이지만 나중에 값이 추가되는 속성의 경우, `null`, `undefined` 또는 기타 임시로 어떠한 값이라도 넣어 사전에 선언해 두어야 합니다.

`data`에 포함하지 않고 `this`에 직접 새 속성을 추가할 수는 있습니다.
그러나 이러한 방식으로 추가된 속성은 이후 반응형 업데이트 동작이 이루어지지 않습니다.

Vue는 컴포넌트 인스턴스를 통해 기본 제공되는 API를 노출할 때 `$` 접두사를 사용합니다.
또한 내부 속성에 대해서는 `_` 접두사를 사용합니다.
따라서 `data` 함수에 의해 반환되는 객체 내 최상위 속성명은 이러한 문자 중 하나로 시작하지 않아야 합니다.

### 반응형 재정의 vs 원본 \*

Vue 3에서는 [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)를 활용하여 데이터를 반응형으로 만듭니다.
Vue 2를 경험한 개발자는 다음과 같은 경우에 주의해야 합니다:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

`newObject` 객체를 `this.someObject`에 할당 후 접근할 경우, 이 값은 원본을 반응형으로 재정의한 프록시 객체입니다.
**Vue 2와 달리 원본 `newObject` 객체는 그대로 유지되며, 반응형으로 변하지 않습니다.
항상 `this`를 통해 반응형 상태의 속성에 접근해야 합니다.**

</div>

<div class="composition-api">

[`reactive()`](/api/reactivity-core.html#reactive) 함수를 사용하여 객체 또는 배열을 반응형으로 만들 수 있습니다:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

반응형 객체는 [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)이며 일반 객체처럼 작동합니다.
일반 객체와 차이점은 Vue가 속성에 접근 및 반응형 객체의 변경사항을 감지할 수 있다는 것입니다.
자세한 내용이 궁금하시다면 [반응형 심화](/guide/extras/reactivity-in-depth.html)에서 Vue의 반응형 시스템이 어떻게 작동하는지 설명하지만, 메인 가이드를 마친 후 읽는 것을 권장합니다.

참조: [반응형에 타입 지정하기](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

컴포넌트의 템플릿에서 반응형 상태를 사용하려면, 컴포넌트의 `setup()'` 함수에서 반응형 상태를 선언하고 반환해야 합니다:

```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup`은 컴포지션 API에서만 사용되는 특별한 훅입니다.
  setup() {
    const state = reactive({ count: 0 })

    // 상태를 템플릿에 노출
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

마찬가지로 동일한 범위에서 반응형 상태를 변경하는 함수를 선언하고 상태와 함께 메서드로 노출할 수 있습니다:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // 함수를 반환하는 것을 잊지 마세요.
    return {
      state,
      increment
    }
  }
}
```

노출된 메서드는 일반적으로 이벤트 리스너로 사용됩니다:

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\*

`setup()` 훅을 통해 상태와 메서드를 수동으로 노출하는 것은 장황할 수 있습니다.
다행히 빌드 방식을 사용하지 않을 때만 이러한 방법이 필요합니다.
싱글 파일 컴포넌트(`*.vue`) 사용 시, `<script setup>`과 같이 표기만 하면 되므로 복잡성을 크게 단순화할 수 있습니다:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

컴포넌트의 `<script setup>`에서 import 또는 최상위 레벨로 선언된 변수나 함수는 해당 템플릿에서 바로 사용할 수 있습니다.

> 이후 가이드 문서의 컴포지션 API 스타일의 예제는 개발자가 가장 많이 사용하는 SFC + `<script setup>` 문법을 사용할 것입니다.

</div>

<div class="options-api">

## 메서드 선언 \*

컴포넌트 인스턴스에 메서드를 추가하기 위해서는 `methods` 옵션을 사용해야 합니다.
이것은 직접 정의한 메서드를 포함하는 객체입니다:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // 메서드는 수명 주기 훅 또는 다른 메서드에서 호출할 수 있습니다!
    this.increment()
  }
}
```

Vue는 `methods`에서 `this`가 컴포넌트 인스턴스를 참조하도록 항상 자동으로 바인딩합니다.
따라서 메서드가 이벤트 리스너 또는 콜백으로 사용되는 경우에도 `this` 값은 컴포넌트 인스턴스로 유지됩니다.
단, 화살표 함수는 Vue가 `this`를 컴포넌트 인스턴스로 바인딩하는 것을 방지하므로, `methods`를 정의할 때 화살표 함수를 사용하는 것은 피해야 합니다.

```js
export default {
  methods: {
    increment: () => {
      // 나쁨: 여기서 `this`에 접근할 수 없습니다!
    }
  }
}
```

컴포넌트 인스턴스의 다른 모든 속성과 마찬가지로 `methods`는 컴포넌트 템플릿 내에서 접근할 수 있으며, 주로 이벤트 리스너로 사용됩니다.

```vue-html
<button @click="increment">{{ count }}</button>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

위의 예제에서 `<button>`을 클릭하면 `increment` 메서드가 호출됩니다.

</div>

### DOM 업데이트 시기

반응형 상태를 변경하면 DOM이 자동으로 업데이트됩니다.
그러나 DOM 업데이트는 동기적으로 적용되지 않는다는 점에 유의해야 합니다.
대신 Vue는 업데이트 주기의 "다음 틱(tick)"까지 버퍼링하여 상태 변경을 여러 번 수행했어도 각 컴포넌트가 한 번만 업데이트되도록 합니다.

상태 변경 후, DOM 업데이트가 완료될 때까지 기다리려면 [nextTick()](/api/general.html#nexttick) 글로벌 API를 사용할 수 있습니다:

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 업데이트된 DOM에 접근 가능
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // 업데이트된 DOM에 접근 가능
      })
    }
  }
}
```

</div>

### 깊은 반응형

Vue는 기본적으로 반응형 상태를 깊이 있게 추적하므로, 중첩된 객체나 배열을 변경할 때에도 변경 사항이 감지됩니다:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // 변경 사항이 감지됩니다.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 변경 사항이
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

반응형이 루트 수준에서만 추적되는 [얕은 반응형 객체](/api/reactivity-advanced.html#shallowreactive)를 명시적으로 생성하는 것도 가능하지만, 일반적으로 고급 사용 사례에서만 필요합니다.

<div class="composition-api">

### 반응형 재정의 vs. 원본 \*\*

`reactive()`의 반환 값은 원본 객체와 같지 않고 원본 객체를 재정의한 [프록시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)(Proxy)라는 점을 유의하는 것이 중요합니다.

```js
const raw = {}
const proxy = reactive(raw)

// 반응형으로 재정의 된 것은 원본과 같지 않습니다.
console.log(proxy === raw) // false
```

프록시만 반응형입니다.
원본 객체를 변경해도 업데이트가 트리거되지 않습니다.
따라서 객체를 Vue의 반응형 시스템으로 작업할 때 가장 좋은 방법은 **상태를 재정의한 프록시만 사용**하는 것입니다.

프록시에 대한 일관된 접근을 보장하기 위해, 원본 객체를 `reactive()` 한 프록시와 프록시를 `reactive()` 한 프록시는 동일한 프록시를 반환하도록 동작합니다.

```js
// 객체를 reactive() 한 반환 값과 proxy는 동일합니다.
console.log(reactive(raw) === proxy) // true

// proxy를 reactive() 한 반환 값과 proxy는 동일합니다.
console.log(reactive(proxy) === proxy) // true
```

이 규칙은 중첩된 객체에도 적용됩니다.
깊은 반응형으로 인해 반응형 객체 내부의 중첩 객체도 프록시입니다:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### `reactive()`의 제한 사항 \*\*

`reactive()` API는 두 개의 제한 사항이 있습니다:

1. 객체, 배열 그리고 `Map`이나 `Set`과 같은 [컬렉션 유형](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections)에만 작동합니다.
   `string`, `number` 또는 `boolean`과 같은 [기본 유형](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)에 사용할 수 없습니다.

2. Vue의 반응형 변경 감지는 속성에 접근함으로써 작동하므로, 항상 반응형 객체에 대한 동일한 참조를 유지해야 합니다.
   즉, 첫 번째 참조에 대한 반응형 연결이 손실되기 때문에 반응형 객체를 쉽게 "교체"할 수 없음을 의미합니다.

   ```js
   let state = reactive({ count: 0 })

   // 위에서 참조한 ({ count: 0 })는 더 이상 추적되지 않습니다. (반응형 연결이 끊어졌습니다.)
   state = reactive({ count: 1 })
   ```

   또한 반응형 객체의 속성을 지역 변수에 할당하거나 분해 할당 또는 함수에 전달할 때 반응형 연결이 끊어짐을 의미합니다:

   ```js
   const state = reactive({ count: 0 })

   // n은 state.count에서 연결이 끊긴 지역 변수입니다.
   let n = state.count
   // 원본의 상태(state.count)에 영향을 미치지 않습니다.
   n++

   // 지역 변수 count는 state.count로부터 연결이 끊깁니다.
   let { count } = state
   // 원본의 상태(state.count)에 영향을 미치지 않습니다.
   count++

   // 함수는 일반적인 숫자를 수신하며,
   // state.count의 변경 사항을 감지할 수 없습니다.
   callSomeFunction(state.count)
   ```

## `ref()`를 사용한 반응형 변수 \*\*

Vue는 `reactive()`의 제한 사항을 해결하기 위해, 어떠한 유형의 데이터라도 반응형으로 재정의할 수 있는 [`ref()`](/api/reactivity-core.html#ref) 함수를 제공합니다:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()`는 받은 인수를 `.value` 속성을 포함하는 **ref** 객체에 래핑 후 반환합니다:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

참조: [Refs에 타입 지정하기](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

반응형 객체의 속성과 유사하게 ref의 `.value` 속성은 반응형입니다.
또한 객체 유형을 가지고 있는 경우, ref는 자동으로 `.value`를 `reactive()`로 변환합니다.

ref가 값으로 객체를 가지는 경우, 객체 전체를 반응형으로 대체할 수 있습니다:

```js
const objectRef = ref({ count: 0 })

// 이것은 반응형으로 작동합니다
objectRef.value = { count: 1 }
```

또한 반응형 상태로 함수에 전달되거나 분해 할당될 수 있습니다:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 함수가 ref를 전달받습니다.
// .value를 통해 값에 접근해야 하지만
// 반응형 연결 상태가 유지됩니다.
callSomeFunction(obj.foo)

// 분해 할당했지만, 반응형 상태가 유지됩니다.
const { foo, bar } = obj
```

즉, `ref()`를 사용하면 모든 값에 대한 "참조"를 만들어 반응성을 잃지 않고 전달할 수 있습니다.
이 기능은 [컴포저블 함수](/guide/reusability/composables.html)로 로직을 추출할 때 자주 사용되기 때문에 상당히 중요합니다.

### 템플릿에서 ref 래핑 해제 \*\*

최상위 속성의 ref를 템플릿에서 접근하면 자동으로 "래핑 해제"되므로 `.value`를 사용할 필요가 없습니다.
아래는 `ref()`를 사용한 카운터 예제입니다:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- .value가 필요하지 않습니다. -->
  </button>
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

언래핑은 ref가 템플릿 렌더 컨텍스트의 최상위 속성인 경우에만 적용됩니다.
예를 들어 `foo`는 최상위 속성이지만 `object.foo`는 그렇지 않습니다.

따라서 아래와 같은 객체가 주어졌을 때:

```js
const object = { foo: ref(1) }
```

아래 표현식은 **예상대로 작동하지 않습니다**:

```vue-html
{{ object.foo + 1 }}
```

`object.foo`는 ref 객체이기 때문에 렌더링된 결과는 `[object Object]`가 됩니다.
`foo`를 최상위 속성으로 만들어 해결할 수 있습니다:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

이제 렌더링 결과는 `2`가 됩니다.

한 가지 주목해야 할 점은 ref가 <code v-pre>{{ }}</code> 또는 `v-text=" "`와 같은 텍스트 보간의 최종 평가 값인 경우에도 래핑 해제되므로 다음은 `1`이 랜더링 됩니다:

```vue-html
{{ object.foo }}
```

이것은 텍스트 보간의 편의 기능일 뿐이며 <code v-pre>{{ object.foo.value }}</code>와 동일합니다.

### 반응형 객체에서 ref 래핑 해제 \*\*

`ref`가 반응형 객체의 속성으로 접근하거나 변경되면 자동으로 래핑 해제되어 일반 속성처럼 작동합니다:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

ref가 할당된 기존 속성에 새 ref를 할당하면 이전 ref는 대체됩니다:

```js
const otherCount = ref(2)

// 기존 ref는 이제 state.count에서 참조가 끊어집니다. 
state.count = otherCount
console.log(state.count) // 2
console.log(count.value) // 1
```

ref의 래핑 해제는 깊은 반응형 객체 내부에 중첩된 경우에만 발생합니다.
[얕은 반응형 객체](/api/reactivity-advanced.html#shallowreactive)의 속성으로 접근하는 경우에는 적용되지 않습니다.

#### 배열 및 컬렉션에서 ref 래핑 해제

반응형 객체와 달리 ref를 반응형 배열의 요소로서 접근하거나 `Map`과 같은 기본 컬렉션 유형에서 접근할 때 래핑 해제가 실행되지 않습니다:

```js
const books = reactive([ref('Vue 3 Guide')])
// .value가 필요합니다
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// .value가 필요합니다
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### 메서드 상태유지 \*

어떤 경우에는 메서드 함수를 동적으로 생성해야 할 수도 있습니다.
예를 들어 디바운스된 이벤트 핸들러 생성:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Lodash로 디바운싱
    click: debounce(function () {
      // ... 클릭에 응답 ...
    }, 500)
  }
}
```

그러나 이 접근 방식은 디바운스된 함수가 **일정 시간이 지나기 전까지 유지**되기 때문에 재사용되는 컴포넌트에 문제가 있습니다.
여러 컴포넌트 인스턴스가 동일한 디바운스 함수를 공유하는 경우 서로 간섭합니다.

각 컴포넌트 인스턴스의 디바운스된 함수를 각각 독립적으로 유지하기 위해 `created` 수명 주기 훅에서 디바운스된 함수를 컨트롤 할 수 있는 환경을 구성할 수 있습니다:

```js
export default {
  created() {
    // 이제 각 인스턴스는 자체적인 디바운스된 헨들러를 가집니다.
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 컴포넌트가 제거된 후 
    // 타이머를 취소하는 것은 좋은 방법입니다.
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 클릭에 응답 ...
    }
  }
}
```

</div>

<div class="composition-api">

## 반응형 변환 <sup class="vt-badge experimental" /> \*\*

JavaScript의 언어적 제약으로 인해 ref를 `.value`와 같이 사용해야 하는 단점이 있습니다.
그러나 컴파일 시 변환을 사용해 적절한 위치에 `.value`를 자동으로 추가하여 개발간 편의성을 개선할 수 있습니다.
Vue는 다음과 같이 "카운터" 예제를 작성할 수 있도록 컴파일 시 변환을 제공합니다:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // .value가 필요하지 않습니다.
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

[반응형 변환](/guide/extras/reactivity-transform.html)에 대한 자세한 내용은 해당 섹션에서 확인할 수 있습니다.
현재 아직 실험 단계이며 최종적으로 확정되기 전에 변경될 수 있습니다.

</div>
