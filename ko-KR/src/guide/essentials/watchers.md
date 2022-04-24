:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Watchers
# 감시자

## Basic Example
## 기본 예제

Computed properties allow us to declaratively compute derived values. However, there are cases where we need to perform "side effects" in reaction to state changes - for example, mutating the DOM, or changing another piece of state based on the result of an async operation.


계산된 속성(Computed properties)을 사용해 원본 값에서 파생되는 값을 선언적으로 계산할 수 있습니다. 그러나 상태 변경에 대한 반응으로 "부작용(side-effect)"을 수행해야 하는 경우가 있습니다. 예를 들어 DOM을 변경하거나 비동기 작업의 결과를 기반으로 다른 상태를 변경하는 것입니다.



<div class="options-api">

With Options API, we can use the [`watch` option](/api/options-state.html#watch) to trigger a function whenever a reactive property changes:

옵션 API를 사용하면 [`watch` 옵션](/api/options-state.html#watch)을 사용하여 반응형 속성이 변경될 때마다 함수를 트리거할 수 있습니다:


```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // whenever question changes, this function will run
    // 질문이 변경되면, 이 함수가 실행됩니다. 
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  Ask a yes/no question:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb246ICcnLFxuICAgICAgYW5zd2VyOiAnUXVlc3Rpb25zIHVzdWFsbHkgY29udGFpbiBhIHF1ZXN0aW9uIG1hcmsuIDstKSdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgLy8gd2hlbmV2ZXIgcXVlc3Rpb24gY2hhbmdlcywgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1blxuICAgIHF1ZXN0aW9uKG5ld1F1ZXN0aW9uLCBvbGRRdWVzdGlvbikge1xuICAgICAgaWYgKG5ld1F1ZXN0aW9uLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ2V0QW5zd2VyKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhc3luYyBnZXRBbnN3ZXIoKSB7XG4gICAgICB0aGlzLmFuc3dlciA9ICdUaGlua2luZy4uLidcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgICB0aGlzLmFuc3dlciA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuYW5zd2VyID0gJ0Vycm9yISBDb3VsZCBub3QgcmVhY2ggdGhlIEFQSS4gJyArIGVycm9yXG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

The `watch` option also supports a dot-delimited path as the key:

`watch` 옵션은 점(dot) 구분자 기반 경로를 키로 가질수 있습니다:

```js
export default {
  watch: {
    // Note: only simple paths. Expressions are not supported.
    // 참고: 단순한 경로만 지원합니다. 표현식은 지원하지 않습니다. 
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

With Composition API, we can use the [`watch` function](/api/reactivity-core.html#watch) to trigger a callback whenever a piece of reactive state changes:

Composition API에서는  [`watch` 함수](/api/reactivity-core.html#watch)를 사용하여 반응형 상태가 변경될 때마다 콜백을 트리거할 수 있습니다.


```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmNvbnN0IHF1ZXN0aW9uID0gcmVmKCcnKVxuY29uc3QgYW5zd2VyID0gcmVmKCdRdWVzdGlvbnMgdXN1YWxseSBjb250YWluIGEgcXVlc3Rpb24gbWFyay4gOy0pJylcblxud2F0Y2gocXVlc3Rpb24sIGFzeW5jIChuZXdRdWVzdGlvbikgPT4ge1xuICBpZiAobmV3UXVlc3Rpb24uaW5kZXhPZignPycpID4gLTEpIHtcbiAgICBhbnN3ZXIudmFsdWUgPSAnVGhpbmtpbmcuLi4nXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgYW5zd2VyLnZhbHVlID0gKGF3YWl0IHJlcy5qc29uKCkpLmFuc3dlclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbnN3ZXIudmFsdWUgPSAnRXJyb3IhIENvdWxkIG5vdCByZWFjaCB0aGUgQVBJLiAnICsgZXJyb3JcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBBc2sgYSB5ZXMvbm8gcXVlc3Rpb246XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

### Watch Source Types
### 감시 대상 타입

`watch`'s first argument can be different types of reactive "sources": it can be a ref (including computed refs), a reactive object, a getter function, or an array of multiple sources:

`watch`의 첫 번째 인자는 다양한 유형의 반응형 "소스"가 될 수 있습니다. ref(계산된 ref 포함), 반응형 객체, getter 함수 또는 여러 소스의 배열이 될 수 있습니다:


```js
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

Do note that you can't watch a property of a reactive object like this:

반응형 객체의 속성을 다음과 같은 방식으로는 추적할수 없다는것에 주의 하세요:

```js
const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
// watch()에 소스로 그냥 숫자를 넘긴것일 뿐이라 원하는대로 동작하지 않습니다. 
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

Instead, use a getter:

대신 getter를 사용하세요:

```js
// instead, use a getter:
// 대신 getter를 사용하세요:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

</div>

## Deep Watchers
## 깊은 감시자

<div class="options-api">

`watch` is shallow by default: the callback will only trigger when the watched property has been assigned a new value - it won't trigger on nested property changes. If you want the callback to fire on all nested mutations, you need to use a deep watcher:

`watch` 는 기본적으로 얕습니다. 콜백은 감시된 속성에 새 값이 할당되었을 때만 트리거됩니다. 중첩된 속성 변경에는 트리거되지 않습니다. 중첩된 모든 변경에 대해 콜백을 실행하려면 깊은 감시자를 사용해야 합니다.



```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

When you call `watch()` directly on a reactive object, it will implicitly create a deep watcher - the callback will be triggered on all nested mutations:

반응형 객체에 대해 직접 `watch()`를 호출하면 암시적으로 깊은 감시자가 생성됩니다. 콜백은 모든 중첩된 변경에 대해 트리거됩니다:


```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
  // 중첩된 속성 변경시에 호출됨
  // 참조:: `newValue`와  `oldValue`는 동일합니다. 둘다 동일한 객체이니까요!
})

obj.count++
```

This should be differentiated with a getter that returns a reactive object - in the latter case, the callback will only fire if the getter returns a different object:

이것은 반응형 객체를 반환하는 getter와 구별되어야 합니다. 후자의 경우 콜백은 getter가 다른 객체를 반환하는 경우에만 실행됩니다:


```js
watch(
  () => state.someObject,
  () => {
    // fires only when state.someObject is replaced
    // state.someObject가 변경될때만 호출 됩니다
  }
)
```

You can, however, force the second case into a deep watcher by explicitly using the `deep` option:

그러나 `deep` 옵션을 명시적으로 사용하여 두 번째 경우를 깊은 감시로 강제 할 수 있습니다.


```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
    // state.someObject **교체 되지 않는한** `newValue`와  `oldValue`는 동일합니다.
    
  },
  { deep: true }
)
```

</div>

:::warning Use with Caution
Deep watch requires traversing all nested properties in the watched object, and can be expensive when used on large data structures. Use it only when necessary and beware of the performance implications.
:::

:::warning 주의 깊게 사용하세요
깊은 감시는 감시된 개체의 모든 중첩 속성을 탐색해야 하며,  큰 데이터 구조에서 사용할 때 비용이 많이 들 수 있습니다. 필요한 경우에만 사용하고 성능에 미치는 영향에 주의하세요.
:::


<div class="options-api">

## Eager Watchers \*

## 이른 감시 \*

`watch` is lazy by default: the callback won't be called until the watched source has changed. But in some cases we may want the same callback logic to be run eagerly - for example, we may want to fetch some initial data, and then re-fetch the data whenever relevant state changes.

`watch`는 기본적으로 지연(lazy) 됩니다. 콜백은 감시된 소스가 변경될 때까지 호출되지 않습니다. 그러나 어떤 경우에는 동일한 콜백 로직이 빠르게 실행되기를 원할 수 있습니다. 예를 들어 초기 데이터를 먼저 가져온 다음,  관련 상태가 변경될 때마다 데이터를 다시 가져오게 하고 싶을 수  있습니다.


We can force a watcher's callback to be executed immediately by declaring it using an object with a `handler` function and the `immediate: true` option:

우리는 `handler` 함수와 `immediate: true` 옵션이 있는 객체를 사용하여 선언함으로써 감시자의 콜백이 즉시 실행되도록 할 수 있습니다:


```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
        // 이 콜백은 컴포넌트가 만들어지자 마자 호출됩니다. 
      },
      // 이른 콜백 실행을 강제함
      immediate: true
    }
  }
  // ...
}
```

</div>

<div class="composition-api">

## `watchEffect()` \*\*



`watch()` is lazy: the callback won't be called until the watched source has changed. But in some cases we may want the same callback logic to be run eagerly - for example, we may want to fetch some initial data, and then re-fetch the data whenever relevant state changes. We may find ourselves doing this:

`watch()`는 지연됩니다.  콜백은 감시된 소스가 변경될 때까지 호출되지 않습니다. 그러나 어떤 경우에는 동일한 콜백 로직이 빠르게 실행되기를 원할 수 있습니다. 예를 들어 초기 데이터를 먼저 가져온 다음,  관련 상태가 변경될 때마다 데이터를 다시 가져오게 하고 싶을 수  있습니다.


```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// fetch immediately
// 즉시 읽어 옵니다. 
fetchData()
// ...then watch for url change
// ...그리고 변경을 듣기 시작할수 있습니다. 
watch(url, fetchData)
```

This can be simplified with [`watchEffect()`](/api/reactivity-core.html#watcheffect). `watchEffect()` allows us to perform a side effect immediately while automatically tracking the effect's reactive dependencies. The above example can be rewritten as:

이런 번거로움은  [`watchEffect()`](/api/reactivity-core.html#watcheffect)를 사용하여 단순화할 수 있습니다. `watchEffect()`를 사용하면 효과(effect)의 반응 종속성을 자동으로 추적하면서 부작용(side effect)을 즉시 수행할 수 있습니다. 위의 예는 다음과 같이 다시 작성할 수 있습니다:


```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

Here, the callback will run immediately. During its execution, it will also automatically track `url.value` as a dependency (similar to computed properties). Whenever `url.value` changes, the callback will be run again.

여기에서 콜백이 즉시 실행됩니다. 실행하는 동안 자동으로 `url.value`를 종속성으로 추적합니다(계산된 속성과 유사). `url.value`가 변경될 때마다 콜백이 다시 실행됩니다.


You can check out [this example](/examples/#fetching-data) with `watchEffect` and reactive data-fetching in action.

[이 예시](/examples/#fetching-data)는 'watchEffect'와 반응형 데이터 가져오기가 작동하는 것을 확인할 수 있습니다.


:::tip
`watchEffect` only tracks dependencies during its **synchronous** execution. When using it with an async callback, only properties accessed before the first `await` tick will be tracked.
:::

:::tip
`watchEffect`는 **동기** 실행 중에만 종속성을 추적합니다. 비동기 콜백과 함께 사용할 때 첫 번째 `await` 틱 전에 액세스한 속성만 추적됩니다.
:::


### `watch` vs. `watchEffect`

`watch` and `watchEffect` both allow us to reactively perform side effects. Their main difference is the way they track their reactive dependencies:

`watch`와 `watchEffect`는 모두 부작용(side effect)을 반응적으로 수행할 수 있게 해줍니다. 주요 차이점은 반응 종속성을 추적하는 방식입니다.


- `watch` only tracks the explicitly watched source. It won't track anything accessed inside the callback. In addition, the callback only triggers when the source has actually changed. `watch` separates dependency tracking from the side effect, giving us more precise control over when the callback should fire.

- `watch`는 명시적으로 감시된 소스만 추적합니다. 콜백 내에서 액세스한 항목은 추적하지 않습니다. 또한 콜백은 소스가 실제로 변경된 경우에만 트리거됩니다. `watch`는 종속성 추적을 부작용과 분리하여 콜백이 실행되어야 하는 시기를 보다 정확하게 제어할 수 있습니다.

- `watchEffect`, on the other hand, combines dependency tracking and side effect into one phase. It automatically tracks every reactive property accessed during its synchronous execution. This is more convenient and typically results in terser code, but makes its reactive dependencies less explicit.

- 반면 `watchEffect`는 종속성 추적과 부작용(side effect)을 하나의 단계로 결합합니다. 동기 실행 중에 반응형 속성을을 접근하면 모두 추적됩니다. 이것은 더 편리하고 일반적으로 더 간결한 코드를 생성하지만 반응성 종속성을 덜 명시적으로 만듭니다.


</div>

## Callback Flush Timing
## 콜백 플러시 타이밍

When you mutate reactive state, it may trigger both Vue component updates and watcher callbacks created by you.

반응형 상태를 변경하면 Vue 컴포넌트 업데이트와 사용자가 만든 감시자 콜백이 모두 트리거될 수 있습니다.


By default, user-created watcher callbacks are called **before** Vue component updates. This means if you attempt to access the DOM inside a watcher callback, the DOM will be in the state before Vue has applied any updates.

기본적으로 사용자가 생성한 감시자 콜백은 Vue 컴포넌트 업데이트보다 먼저 실행됩니다. 즉, 감시자 콜백 내에서 DOM에 액세스 했을때의 DOM은 Vue에서 업데이트를 적용하기 전의 상태의 DOM입니다. 

If you want to access the DOM in a watcher callback **after** Vue has updated it, you need to specify the `flush: 'post'` option:

만약 Vue가 업데이트한 **후** 감시자 콜백에서 DOM에 액세스하려면 `flush: 'post'` 옵션을 지정 하면 됩니다.


<div class="options-api">

```js
export default {
  // ...
  watch: {
    key: {
      handler() {},
      flush: 'post'
    }
  }
}
```

</div>

<div class="composition-api">

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

Post-flush `watchEffect()` also has a convenience alias, `watchPostEffect()`:

포스트  플러시 `watchEffect()`에는 편리한 별칭인 `watchPostEffect()`도 있습니다.


```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* executed after Vue updates */
  /* Vue 업데이트 이후에 실행됨  */
})
```

</div>

<div class="options-api">

## `this.$watch()` \*

It's also possible to imperatively create watchers using the [`$watch()` instance method](/api/component-instance.html#watch):

[`$watch()` 인스턴스 메소드](/api/component-instance.html#watch)를 사용하여 감시자를 명령적으로 생성할 수도 있습니다:


```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

This is useful when you need to conditionally set up a watcher, or only watch something in response to user interaction. It also allows you to stop the watcher early.

이는 조건부로 감시자를 설정해야 하거나 사용자 상호 작용에 대한 응답으로만 무언가를 감시해야 할 때 유용합니다. 또한 감시자를 조기에 중지할 수 있습니다.


</div>

## Stopping a Watcher
## 감시자 멈추기

<div class="options-api">

Watchers declared using the `watch` option or the `$watch()` instance method are automatically stopped when the owner component is unmounted, so in most cases you don't need to worry about stopping the watcher yourself.

`watch` 옵션이나 `$watch()` 인스턴스 메소드를 사용하여 선언된 감시자는 소유자 컴포넌트가 마운트 해제될 때 자동으로 중지되므로 대부분의 경우 감시자를 직접 중지하는 것에 대해 걱정할 필요가 없습니다.


In the rare case where you need to stop a watcher before the owner component unmounts, the `$watch()` API returns a function for that:

소유자 컴포넌트가 마운트 해제되기 전에 감시자를 중지해야 하는 드문 경우에 `$watch()` API는 이에 대한 함수를 반환합니다.


```js
const unwatch = this.$watch('foo', callback)

// ...when the watcher is no longer needed:
// 감시자가 더이상 필요없을때 호출합니다...
unwatch()
```

</div>

<div class="composition-api">

Watchers declared synchronously inside `setup()` or `<script setup>` are bound to the owner component instance, and will be automatically stopped when the owner component is unmounted. In most cases, you don't need to worry about stopping the watcher yourself.

`setup()` 또는 `<script setup>` 내부에서 동기적으로 선언된 감시자는 소유자 컴포넌트 인스턴스에 바인딩되며 소유자 컴포넌트가 마운트 해제되면 자동으로 중지됩니다. 대부분의 경우 감시자를 직접 중지하는 것에 대해 걱정할 필요가 없습니다.


The key here is that the watcher must be created **synchronously**: if the watcher is created in an async callback, it won't be bound to the owner component and must be stopped manually to avoid memory leaks. Here's an example:

여기서 핵심은 감시자가 **동기적으로** 생성되어야 한다는 것입니다. 감시자가 비동기 콜백에서 생성된 경우, 감시자는 소유자 컴포넌트에 바인딩되지 않으며 메모리 누수를 방지하기 위해 수동으로 중지해야 합니다. 다음은 예입니다.


```vue
<script setup>
import { watchEffect } from 'vue'

// this one will be automatically stopped
// 이건 자동으로 멈춥니다.
watchEffect(() => {})

// ...this one will not!
// ...이건 아니에요!
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

To manually stop a watcher, use the returned handle function. This works for both `watch` and `watchEffect`:

감시자를 수동으로 중지하려면 반환된 핸들 함수를 사용하십시오. 이것은 `watch`와 `watchEffect` 모두에서 작동합니다.


```js
const unwatch = watchEffect(() => {})

// ...later, when no longer needed
// ...나중에, 더이상 필요 없을때 
unwatch()
```

Note that there should be very few cases where you need to create watchers asynchronously, and synchronous creation should be preferred whenever possible. If you need to wait for some async data, you can make your watch logic conditional instead:

감시자를 비동기적으로 생성해야 하는 경우는 거의 없으며, 가능한 동기 생성이 선호됩니다. 일부 비동기 데이터를 기다려야 하는 경우 감시자 로직을 조건부로 만들 수 있습니다:

```js
// data to be loaded asynchronously
// 데이터는 비동기로 읽어들여짐
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // do something when data is loaded
    // 데이터가 로드 된후에 작업
  }
})
```

</div>
