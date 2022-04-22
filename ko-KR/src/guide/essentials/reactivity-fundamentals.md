---
outline: deep
---
:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Reactivity Fundamentals
# 반응형 기초

:::tip API Preference
This page and many other chapters later in the guide contain different content for Options API and Composition API. Your current preference is <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. You can toggle between the API styles using the "API Preference" switches at the top of the left sidebar.
:::

:::tip API Preference
이 페이지와 가이드 뒷부분의 다른 많은 장에는 옵션 API 및 컴포지션 API에 대한 다양한 콘텐츠가 포함되어 있습니다. 현재 설정은 <span class="options-api">옵션 API</span><span class="composition-api">컴포지션 API</span>입니다. 왼쪽 사이드바 상단에 있는 "API 기본 설정" 스위치를 사용하여 API 스타일을 전환할 수 있습니다.
:::

## Declaring Reactive State
## 반응형 상태 선언하기


<div class="options-api">

With Options API, we use the `data` option to declare reactive state of a component. The option value should be a function that returns an object. Vue will call the function when creating a new component instance, and wrap the returned object in its reactivity system. Any top-level properties of this object are proxied on the component instance (`this` in methods and lifecycle hooks):

Options API에서는 `data` 옵션을 사용하여 컴포넌트의 반응 상태를 선언합니다. 옵션 값은 객체를 반환하는 함수여야 합니다. Vue는 새 컴포넌트 인스턴스를 만들 때마다 해당 함수를 호출하여 반환된 개체를 반응성 시스템에 래핑합니다. 반환된 객체의 모든 최상위 속성은 컴포넌트 인스턴스에서 프록시됩니다(메서드 및 생명주기 후크에서 `this`로 접근 할 수 있습니다).


```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` is a lifecycle hook which we will explain later
  // `mounted`는 생명주기 후크인데 나중에 설명합니다. 
  mounted() {
    // `this` refers to the component instance.
    // `this` 는 컴포넌트 인스턴스를 나타냅니다. 
    console.log(this.count) // => 1

    // data can be mutated as well
    // 데이터는 잘 변경됩니다.
    this.count = 2
  }
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

These instance properties are only added when the instance is first created, so you need to ensure they are all present in the object returned by the `data` function. Where necessary, use `null`, `undefined` or some other placeholder value for properties where the desired value isn't yet available.

이러한 인스턴스 속성은 인스턴스가 처음 생성될 때만 추가되므로 `data` 함수에서 반환된 객체에 필요한 속성이 모두 존재하는지 확인해야 합니다. 필요한 경우 `null`, `undefined` 또는 원하는 값을 아직 사용할 수 없는 속성에 대해 임시 값(PLaceholder value)을 사용하세요.


It is possible to add a new property directly to `this` without including it in `data`. However, properties added this way will not be able to trigger reactive updates.

`data`에 포함하지 않고 `this`에 직접 새 속성을 추가할 수 있습니다. 그러나 이러한 방식으로 추가된 속성은 반응형 업데이트를 트리거할 수 없습니다.

Vue uses a `$` prefix when exposing its own built-in APIs via the component instance. It also reserves the prefix `_` for internal properties. You should avoid using names for top-level `data` properties that start with either of these characters.

Vue는 컴포넌트 인스턴스를 통해 자체 내장 API를 노출할 때 `$` 접두사를 사용합니다. 또한 내부 속성에 대해 접두사 `_`를 예약합니다. 이러한 문자 중 하나로 시작하는 최상위 `data` 속성의 이름을 사용하지 않아야 합니다.


### Reactive Proxy vs. Original \*
### 반응형 프락시 vs 원본 \*

In Vue 3, data is made reactive by leveraging [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Users coming from Vue 2 should be aware of the following edge case:

Vue 3에서 `data`는 [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)를 활용하여 반응형으로 만들어집니다. Vue 2를 사용하다 오시는 분은  다음과 같은 경우에 주의해야 합니다.


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

When you access `this.someObject` after assigning it, the value is a reactive proxy of the original `newObject`. **Unlike in Vue 2, the original `newObject` is left intact and will not be made reactive: make sure to always access reactive state as a property of `this`.**

할당 후 `this.someObject`에 접근할때 얻어지는 값은 원본 `newObject`에 대한 반응형 프록시입니다. **Vue 2와 달리 원래의 `newObject`는 그대로 유지되며 반응형이 되지 않습니다. 항상 `this`의 속성으로 반응형 상태에 액세스해야 합니다.**


</div>



<div class="composition-api">

We can create a reactive object or array with the [`reactive()`](/api/reactivity-core.html#reactive) function:

[`reactive()`](/api/reactivity-core.html#reactive) 함수를 사용하여 반응형 객체 또는 배열을 만들 수 있습니다.


```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Reactive objects are [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and behave just like normal objects. The difference is that Vue is able to track the property access and mutations of a reactive object. If you are curious about the details, we explain how Vue's reactivity system works in [Reactivity in Depth](/guide/extras/reactivity-in-depth.html) - but we recommend reading it after you have finished the main guide.

반응형 객체는 [자바스크립트 프락시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)이며 일반 개체처럼 동작합니다. 보통의 객체와의 차이점은 반응형 객체의 속성을 읽고 변경하는 것을 Vue가 추적할수 있다는 것입니다. [반응형 심화](/guide/extras/reactivity-in-depth.html) 가이드에서 Vue의 반응형 시스템이 어떻게 작동하는지 자세히 설명 합니다만, 메인 가이드를 마친후에 읽을 것을 권장합니다.

See also: [Typing Reactive](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

참조: [반응형에 타입 지정하기](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

To use reactive state in a component's template, declare and return them from a component's `setup()` function:

컴포넌트의 템플릿에서 반응형 상태를 사용하려면 컴포넌트의 `setup()` 함수에서 이를 선언하고 반환합니다.


```js{5,9-11}
import { reactive } from 'vue'

export default {
  // `setup` is a special hook dedicated for composition API.
  // `setup`는 컴포지션 API를 위한 전용 후크입니다. 
  setup() {
    const state = reactive({ count: 0 })

    // expose the state to the template
    // state를 템플릿에 노출 시킵니다. 
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

Similarly, we can declare functions that mutate reactive state in the same scope, and expose it as a method alongside the state:

마찬가지로 동일한 범위에서 반응형 상태를 변경하는 함수를 선언하고, 상태와 함께 메서드로 노출할 수 있습니다:


```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // don't forget to expose the function as well.
    // 함수를 노출하는것을 잊지 마세요
    return {
      state,
      increment
    }
  }
}
```

Exposed methods are typically used as event listeners:

노출된 메서드는 일반적으로 이벤트 리스너로 사용됩니다:


```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\*

Manually exposing state and methods via `setup()` can be verbose. Luckily, it is only necessary when not using a build step. When using Single-File Components (SFCs), we can greatly simplify the usage with `<script setup>`:

`setup()`을 통해 상태와 메서드를 수동으로 노출하는 것은 장황할 수 있습니다. 빌드 도구를 이용해 빌드를 할때는 더 쉬운 방법이 있습니다. SFC(싱글 파일 컴포넌트)를 사용할 때 `<script setup>`으로 반응형 상태의 사용을 크게 단순화할 수 있습니다:


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

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Top-level imports and variables declared in `<script setup>` are automatically usable in the template of the same component.

최상위 레벨에서 import 되거나 선언된 변수들은 같은 컴포넌트의 템플릿에 자동으로 노출 되어 사용할수 있습니다. 

> For the rest of the guide, we will be primarily using SFC + `<script setup>` syntax for Composition API code examples, as that is the most common usage for Vue developers.

> 이후 가이드 문서의 컴포지션 API 코드 예제에 Vue 개발자들이 가장 많이 사용하는 SFC + `<script setup>` 문법을 사용할 것입니다.


</div>


<div class="options-api">

## Declaring Methods \*
## 메소드 선언 \*

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

To add methods to a component instance we use the `methods` option. This should be an object containing the desired methods:

컴포넌트 인스턴스에 메소드를 추가하기 위해 `methods` 옵션을 사용합니다. 이 옵션은 원하는 메소드를 포함하는 객체여야 합니다:


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
    // methods can be called in lifecycle hooks, or other methods!
    // 생명주기 후크나 다른 메소드에서 메소드들을 호출할수 있습니다. 
    this.increment()
  }
}
```

Vue automatically binds the `this` value for `methods` so that it always refers to the component instance. This ensures that a method retains the correct `this` value if it's used as an event listener or callback. You should avoid using arrow functions when defining `methods`, as that prevents Vue from binding the appropriate `this` value:

Vue는 항상 컴포넌트 인스턴스를 참조하도록 `methods`에 대해 `this` 값을 자동으로 바인딩합니다. 이렇게 하면 메서드가 이벤트 리스너 또는 콜백으로 사용되는 경우 올바른 `this` 값이 유지됩니다. `methods`를 정의할때 화살표 함수를 사용하면 Vue가  적절한 `this` 값을 바인딩 할수 없기 때문에 화살표 함수는 사용하지 말아야 합니다:


```js
export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
      // BAD: `this`에 대해 접근할수 없습니다!
    }
  }
}
```

Just like all other properties of the component instance, the `methods` are accessible from within the component's template. Inside a template they are most commonly used as event listeners:

컴포넌트 인스턴스의 다른 모든 속성과 마찬가지로 `methods`는 컴포넌트 템플릿 내에서 액세스할 수 있습니다. 템플릿 내에서 이벤트 리스너로 가장 일반적으로 사용됩니다.


```vue-html
<button @click="increment">{{ count }}</button>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

In the example above, the method `increment` will be called when the `<button>` is clicked.

위의 예에서 `<button>`을 클릭하면 `increment` 메소드가 호출됩니다.


</div>



### DOM Update Timing
### DOM 갱신 타이밍

When you mutate reactive state, the DOM is updated automatically. However, it should be noted that the DOM updates are not applied synchronously. Instead, Vue buffers them until the "next tick" in the update cycle to ensure that each component needs to update only once no matter how many state changes you have made.

반응형 상태를 변경하면 DOM이 자동으로 업데이트됩니다. 그러나 DOM 업데이트는 동기적으로 반영되지 않는다는 점에 유의해야 합니다. 대신 Vue는 업데이트 주기의 "다음 틱(tick)"까지 버퍼링하여 상태 변경을 아주 많이 수행했어도 각 컴포넌트가 한 번만 업데이트되도록 합니다.


To wait for the DOM update to complete after a state change, you can use the [nextTick()](/api/general.html#nexttick) global API:

상태 변경 후 DOM 업데이트가 완료될 때까지 기다리려면 [nextTick()](/api/general.html#nexttick) 전역 API를 사용할 수 있습니다:


<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
    // 갱신된 DOM 에 접근 할수 있습니다
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
        // access updated DOM
        // 갱신된 DOM 에 접근 할수 있습니다
      })
    }
  }
}
```

</div>

### Deep Reactivity
### 깊은(Deep) 반응형

In Vue, state is deeply reactive by default. This means you can expect changes to be detected even when you mutate nested objects or arrays:

Vue에서 상태는 기본적으로 깊게(deep) 반응성을 추적 됩니다. 즉, 중첩된 객체나 배열을 변경하는 경우에도 변경 사항이 감지될 것으로 기대할수 있습니다.


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
      // these will work as expected.
      // 다음도 기대대로 동작합니다. 
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
  // these will work as expected.
  // 다음도 기대대로 동작합니다. 
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>


It is also possible to explicitly create [shallow reactive objects](/api/reactivity-advanced.html#shallowreactive) where the reactivity is only tracked at the root-level, however they are typically only needed in advanced use cases.

반응성이 루트 수준에서만 추적되는 [얕은 반응 개체](/api/reactivity-advanced.html#shallowreactive)(shallow)를 명시적으로 생성하는 것도 가능하지만 일반적으로 고급 사용 사례에서만 필요합니다.


<div class="composition-api">

### Reactive Proxy vs. Original \*\*
### 반응형 프락시 vs 원본 \*\*


It is important to note that the returned value from `reactive()` is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the original object, which is not equal to the original object:

`reactive()`에서 반환된 값은 원본의 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)이며 원본 객체를 수정한게 아닙니다. 원본 객체와는 별개의 객체입니다. 


```js
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
// proxy 는 원본과 동일한 객체 인스턴스가 아닙니다. 
console.log(proxy === raw) // false
```

Only the proxy is reactive - mutating the original object will not trigger updates. Therefore, the best practice when working with Vue's reactivity system is to **exclusively use the proxied versions of your state**.

프록시만 반응적입니다. 원본 개체를 변경해도 업데이트가 트리거되지 않습니다. 따라서 Vue의 반응성 시스템으로 작업할 때 가장 좋은 방법은 **상태의 프록시 버전만 독점적으로 사용**하는 것입니다.


To ensure consistent access to the proxy, calling `reactive()` on the same object always returns the same proxy, and calling `reactive()` on an existing proxy also returns that same proxy:

프록시에 대한 일관된 액세스를 보장하기 위해 동일한 객체에서 `reactive()`를 호출하면 항상 동일한 프록시가 반환되고 기존 프록시에서 `reactive()`를 호출해도 동일한 프록시가 반환됩니다.


```js
// calling reactive() on the same object returns the same proxy
// 동일한 객체에 대해 reactive()를 호출하면 동일한 프락시가 반환됩니다. 
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
// 프락시에 대해  reactive()를 호출하면 프락시 자체가 반환됩니다. 
console.log(reactive(proxy) === proxy) // true
```

This rule applies to nested objects as well. Due to deep reactivity, nested objects inside a reactive object are also proxies:

이 규칙은 중첩된 개체에도 적용됩니다. 깊은 반응성으로 인해 반응성 객체 내부의 중첩 객체도 프록시입니다:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Limitations of `reactive()` \*\*
### `reactive()`의 제약 사항 \*\*

The `reactive()` API has two limitations:
`reactive()` API는 두개의 제약 사항이 있습니다:

1. It only works for object types (objects, arrays, and [collection types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) such as `Map` and `Set`). It cannot hold [primitive types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) such as `string`, `number` or `boolean`.

1. 객체 유형(객체, 배열 및 `Map`이나 `Set`같은 [컬렉션 유형](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) )에서만 작동합니다. `string`, `number` 또는 `boolean`과 같은 [기본 유형](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)에서는 동작하지 않습니다.


2. Since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object because the reactivity connection to the first reference is lost:

2. Vue의 반응 추적은 속성 접근에 대해서만 동작하기 때문에 반응형 개체에 대한 동일한 레퍼런스를 항상 유지해야 합니다. 이것은 첫 번째 레퍼런스에 대한 반응성 연결이 손실되기 때문에 반응성 객체를 쉽게 "교체"할 수 없음을 의미합니다.


   ```js
   let state = reactive({ count: 0 })

   // the above reference ({ count: 0 }) is no longer being tracked (reactivity connection is lost!)
   // 위에서 생성한 ({ count: 0 }) 에 대한 레퍼런스는 더이상 추적되지 않습니다(반응성 연결을 잃게 됩니다!)
   state = reactive({ count: 1 })
   ```

   It also means that when we assign or destructure a reactive object's property into local variables, or when we pass that property into a function, we will lose the reactivity connection:

   그것은 또한 우리가 반응성 객체의 속성을 지역 변수에 할당하거나 구조해체(destructure)를 시도 할 때, 또는 속성만 다른 함수에 전달할 때 반응성 연결을 잃게 된다는 것을 의미합니다:


   ```js
   const state = reactive({ count: 0 })

   // n is a local variable that is disconnected
   // from state.count.
   // n는 state.count로 부터 연결 해제된 지역 변수입니다. 
   let n = state.count
   // does not affect original state
   // 변경해도 원래 상태에 반영되지 않습니다 
   n++

   // count is also disconnected from state.count.
   // ncount는 state.count로 부터 연결 해제되었습니다. 
   let { count } = state
   // does not affect original state
   // 변경해도 원래 상태에 반영되지 않습니다 
   count++

   // the function receives a plain number and
   // won't be able to track changes to state.count
   // 함수는 그냥 일반 숫자를 인자로 받았을 뿐이고, state.count가 변경되어도 이를 따라갈수 없습니다
   callSomeFunction(state.count)
   ```

## Reactive Variables with `ref()` \*\*
## `ref()`를 이용한 반응형 변수 \*\*

To address the limitations of `reactive()`, Vue also provides a [`ref()`](/api/reactivity-core.html#ref) function which allows us to create reactive **"refs"** that can hold any value type:

이러한 `reactive()`의 제한 사항을 해소하기 위해, Vue는 어떤 값도 담을수 있는 반응형 **"refs"**(레퍼런스)를 생성하는 [`ref()`](/api/reactivity-core.html#ref) 함수를 제공합니다. 

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

`ref()` 는 주거진 인자를 `.value` 속성으로 감싸는 참조 객체를 반환합니다. :

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

See also: [Typing Refs](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

참조: [Refs 에 타입 지정하기](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Similar to properties on a reactive object, the `.value` property of a ref is reactive. In addition, when holding object types, ref automatically converts its `.value` with `reactive()`.

반응형 객체의 속성과 유사하게 ref의 `.value` 속성은 반응형입니다. 또한 ref는 값으로 객체 유형을 가질때 `.value` 를 `reactive()` 로 자동으로 변환합니다.


A ref containing an object value can reactively replace the entire object:

객체 값을 포함하는 ref는 전체 객체를 반응적으로 교체 할 수 있습니다:


```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }
```

Refs can also be passed into functions or destructured from plain objects without losing reactivity:

Ref는 반응성을 잃지 않고 함수로 전달되거나 일반 객체로 구조 해제될 수 있습니다.


```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

In other words, `ref()` allows us to create a "reference" to any value and pass it around without losing reactivity. This capability is quite important as it is frequently used when extracting logic into [Composable Functions](/guide/reusability/composables.html).

즉, `ref()`를 사용하면 모든 값에 대한 "참조"를 만들고 반응성을 잃지 않고 전달할 수 있습니다. 이 기능은 [Composable Functions](/guide/reusability/composables.html)로 로직을 추출할 때 자주 사용되기 때문에 상당히 중요합니다.


### Ref Unwrapping in Templates \*\*
### 템플릿에서 ref는 언래핑됩니다. \*\*

When refs are accessed as top-level properties in the template, they are automatically "unwrapped" so there is no need to use `.value`. Here's the previous counter example, using `ref()` instead:

ref가 템플릿의 최상위 속성으로 액세스되면 자동으로 "래핑 해제"되므로 `.value`를 사용할 필요가 없습니다. 이전 카운터 예제를  `ref()`를 이용해 구현해 보았습니다:


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
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Note the unwrapping only applies if the ref is a top-level property on the template render context. As an example, `foo` is a top-level property, but `object.foo` is not.

언래핑은 ref가 템플릿 렌더 컨텍스트의 최상위 속성인 경우에만 적용됩니다. 예를 들어 `foo`는 최상위 속성이지만 `object.foo`는 그렇지 않습니다.


So given the following object:

그래서 다음과 같은 객체가 있을때:


```js
const object = { foo: ref(1) }
```

The following expression will **NOT** work as expected:

다음 표현식은 기대대로 동작하지 **않습니다**:

```vue-html
{{ object.foo + 1 }}
```

The rendered result will be `[object Object]` because `object.foo` is a ref object. We can fix that by making `foo` a top-level property:

`object.foo`는 ref 객체이기 때문에 렌더링된 결과는 `[object Object]`가 됩니다. `foo`를 최상위 속성으로 만들어 해결할 수 있습니다.


```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Now the render result will be `2`.

이제 렌더링 결과는  `2`가 됩니다.

One thing to note is that a ref will also be unwrapped if it is the final evaluated value of a text interpolation (i.e. a <code v-pre>{{ }}</code> tag), so the following will render `1`:

한 가지 주의할 점은 ref가 텍스트 보간(예: <code v-pre>{{ }}</code> 태그)의 최종 평가 값인 경우는 래핑이 해제되므로 다음은 `1`이 렌더링 됩니다:

```vue-html
{{ object.foo }}
```

This is just a convenience feature of text interpolation and is equivalent to <code v-pre>{{ object.foo.value }}</code>.

이것은 텍스트 보간의 편의 기능일 뿐이며 <code v-pre>{{ object.foo.value }}</code>와 동일합니다.

### Ref Unwrapping in Reactive Objects \*\*
### 반응형 객체의 Ref 언래핑 \*\*

When a `ref` is accessed or mutated as a property of a reactive object, it is also automatically unwrapped so it behaves like a normal property:

`ref`가 반응 객체의 속성으로 액세스되거나 변경되면 자동으로 래핑 해제되어 일반 속성처럼 작동합니다:


```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

기존 참조에 연결된 속성에 새 참조가 할당되면 이전 참조를 대체합니다:


```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a [shallow reactive object](/api/reactivity-advanced.html#shallowreactive).

참조 언래핑은 깊은 반응 객체 내부에 중첩된 경우에만 발생합니다. [얕은 반응 객체](/api/reactivity-advanced.html#shallowreactive)의 속성으로 접근하는 경우에는 적용되지 않습니다.


#### Ref Unwrapping in Arrays and Collections
#### 배열 및 컬렉션의 참조 언래핑

Unlike reactive objects, there is no unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`:

반응형 객체와 달리 ref가 반응형 배열의 요소로 액세스되거나 `Map`과 같은 기본 컬렉션 유형으로 액세스될 때 래핑 해제가 수행되지 않습니다.


```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Stateful Methods \*
### 상태를 가지는 메소드 \*

In some cases, we may need to dynamically create a method function, for example creating a debounced event handler:

어떤 경우에는 메소드 함수를 동적으로 생성해야 할 수도 있습니다. 예) 디바운스된 이벤트 핸들러 생성:


```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

However, this approach is problematic for components that are reused because a debounced function is **stateful**: it maintains some internal state on the elapsed time. If multiple component instances share the same debounced function, they will interfere with one another.

그러나 이 접근 방식은 디바운스 기능이 시간 경과에 대한 내부 **상태를 가지기** 때문에 재사용되는 컴포넌트에 문제가 있습니다. 여러 컴포넌트 인스턴스가 동일한 디바운스 기능을 공유하는 경우 서로 간섭합니다.


To keep each component instance's debounced function independent of the others, we can create the debounced version in the `created` lifecycle hook:

각 컴포넌트 인스턴스의 디바운스 기능을 다른 인스턴스와 독립적으로 유지하기 위해 `created` 수명 주기 후크에서 디바운스된 버전을 만들 수 있습니다.


```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    // 각 인스턴스는 자기만의 디바운스 핸들러를 가집니다. 
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    // 컴포넌트가 제거될때 타이머를 캔슬하는것은 좋은 생각이죠. 
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
      // 클릭에 응답합니다...
    }
  }
}
```

</div>


<div class="composition-api">

## Reactivity Transform <sup class="vt-badge experimental" /> \*\*

## 반응형 변환 <sup class="vt-badge experimental" /> \*\*

Having to use `.value` with refs is a drawback imposed by the language constraints of JavaScript. However, with compile-time transforms we can improve the ergonomics by automatically appending `.value` in appropriate locations. Vue provides a compile-time transform that allows us to write the earlier "counter" example like this:

refs와 함께 `.value`를 사용해야 하는 것은 JavaScript의 언어 제약으로 인한 제한 사항입니다.  그러나 컴파일 타임 변환을 사용하면 적절한 위치에 `.value`를 자동으로 추가하여 개발자 편의성을 개선할 수 있습니다. Vue는 다음과 같이 이전 "카운터" 예제를 작성할 수 있는 컴파일 타임 변환을 제공합니다.


```vue
<script setup>
let count = $ref(0)

function increment() {
  // no need for .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

You can learn more about [Reactivity Transform](/guide/extras/reactivity-transform.html) in its dedicated section. Do note that it is currently still experimental and may change before being finalized.

[Reactivity Transform](/guide/extras/reactivity-transform.html)에 대해 자세히 알아볼 수 있습니다. 현재 아직 실험 단계이며 최종 결정되기 전에 변경될 수 있습니다.

</div>
