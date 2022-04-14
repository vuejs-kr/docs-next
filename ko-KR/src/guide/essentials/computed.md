# Computed Properties
# Computed 속성

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## Basic Example
## 기본 예제

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example, if we have an object with a nested array:

표현식을 템플릿 안에서 사용하는 것은 편리하긴 하지만, 이 기능은 단순한 연산을 위해서 사용해야 합니다. 템플릿 안에서 너무 많은 연산을 하면 코드가 비대해지고 유지보수가 어렵습니다. 예를 들기 위해, 중첩된 배열을 가지는 객체를 살펴 봅시다.

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

And we want to display different messages depending on if `author` already has some books or not:

그리고 `author`가 출판한 책이 있는 지 여부에 따라 다른 메시지를 보여주고자 합니다.

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

At this point, the template is getting a bit cluttered. We have to look at it for a second before realizing that it performs a calculation depending on `author.books`. More importantly, we probably don't want to repeat ourselves if we need to include this calculation in the template more than once.

이 시점에서는 템플릿은 더이상 단순하고 선언적이지 않습니다.  이 연산이 `author.books`에 의존적이기 때문에 반응성이 필요하다는 것을 일단 제쳐두고, 더 중요한 점은  템플릿 내에 이 계산을 더 넣어야 할때 중복이 발생한다는 점입니다.

That's why for complex logic that includes reactive data, it is recommended to use a **computed property**. Here's the same example, refactored:

이런 이유로 반응형 데이터를 포함하는 복잡한 로직에 대해 **계산된 속성** (computed property)의 사용을 추천합니다. 동일한 예제를 리팩토링 해보겠습니다.

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the component instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue-html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgIGJvb2tzOiBbXG4gICAgICAgICAgJ1Z1ZSAyIC0gQWR2YW5jZWQgR3VpZGUnLFxuICAgICAgICAgICdWdWUgMyAtIEJhc2ljIEd1aWRlJyxcbiAgICAgICAgICAnVnVlIDQgLSBUaGUgTXlzdGVyeSdcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwdWJsaXNoZWRCb29rc01lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+SGFzIHB1Ymxpc2hlZCBib29rczo8L3A+XG4gIDxzcGFuPnt7IGF1dGhvci5ib29rcy5sZW5ndGggPiAwID8gJ1llcycgOiAnTm8nIH19PC9zcGFuPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Here we have declared a computed property `publishedBooksMessage`. 


Try to change the value of the `books` array in the application `data` and you will see how `publishedBooksMessage` is changing accordingly.

You can data-bind to computed properties in templates just like a normal property. Vue is aware that `this.publishedBooksMessage` depends on `this.author.books`, so it will update any bindings that depend on `this.publishedBooksMessage` when `this.author.books` changes.

See also: [Typing Computed Properties](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

우리는 여기서 `publishedBooksMessage` 라는 computed 속성을 선언했습니다.

이 어플리케이션에서 `data` 의 `books` 배열의 값을 변경하면, 그에 따라 `publishedBooksMessage` 가 어떻게 변경되는 지 볼 수 있습니다.

일반적인 속성과 마찬가지로 템플릿에서 computed 속성도 데이터 바인딩 할 수 있습니다. Vue는 `this.publishedBooksMessage` 가 `this.author.books` 에 의존한다는 것을 알고 있습니다. 그래서 `this.author.books`가 변경될 때 `this.publishedBooksMessage` 의존하는 모든 바인딩을 업데이트합니다.

참조: [타입을 가지는 계산된 속성](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXV0aG9yID0gcmVhY3RpdmUoe1xuICBuYW1lOiAnSm9obiBEb2UnLFxuICBib29rczogW1xuICAgICdWdWUgMiAtIEFkdmFuY2VkIEd1aWRlJyxcbiAgICAnVnVlIDMgLSBCYXNpYyBHdWlkZScsXG4gICAgJ1Z1ZSA0IC0gVGhlIE15c3RlcnknXG4gIF1cbn0pXG5cbi8vIGEgY29tcHV0ZWQgcmVmXG5jb25zdCBwdWJsaXNoZWRCb29rc01lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPkhhcyBwdWJsaXNoZWQgYm9va3M6PC9wPlxuICA8c3Bhbj57eyBwdWJsaXNoZWRCb29rc01lc3NhZ2UgfX08L3NwYW4+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Here we have declared a computed property `publishedBooksMessage`. The `computed()` function expects to be passed a getter function, and the returned value is a **computed ref**. Similar to normal refs, you can access the computed result as `publishedBooksMessage.value`. Computed refs are also auto-unwrapped in templates so you can reference them without `.value` in template expressions.

A computed property automatically tracks its reactive dependencies. Vue is aware that the computation of `publishedBooksMessage` depends on `author.books`, so it will update any bindings that depend on `publishedBooksMessage` when `author.books` changes.

See also: [Typing Computed](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

여기에서 computed 속성인 `publishedBooksMessage` 를 선언했습니다. `computed()` 함수는 getter 함수가 전달될 것으로 예상하고 반환된 값은 **computed ref** 입니다. 일반 refs와 유사하게 계산된 결과에 `publishedBooksMessage.value` 로 액세스할 수 있습니다. Computed ref는 템플릿에서 자동으로 래핑 해제(unwrap)되므로 템플릿 표현식에서 `.value` 없이 참조할 수 있습니다.

computed 속성은 반응형(reactive) 종속성을 자동으로 추적합니다. Vue는 `publishedBooksMessage` 계산이 `author.books`에 의존한다는 것을 알고 있으므로 `publishedBooksMessage` 가 변경되면 `author.books` 에 의존하는 모든 바인딩을 업데이트할 것입니다.

참조: [Typing Computed](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" ></sup>

</div>

## Computed Caching vs Methods
## Computed 속성의 캐싱 vs 메소드

You may have noticed we can achieve the same result by invoking a method in the expression:

표현식에서 메소드를 호출하여 동일한 결과를 얻을 수도 있습니다:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// in component
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

Instead of a computed property, we can define the same function as a method. For the end result, the two approaches are indeed exactly the same. However, the difference is that **computed properties are cached based on their reactive dependencies.** A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as `author.books` has not changed, multiple access to `publishedBooksMessage` will immediately return the previously computed result without having to run the getter function again.

computed 속성 대신에 메소드와 동일한 함수를 정의할 수 있습니다. 결과적으로 두 가지 접근 방식은 실제로 완전히 동일합니다. 그러나 차이점은 **computed 속성은 반응형(reactive) 종속성에 기반하여 캐시된다는 것 입니다.** computed 속성은 반응형 종속성 중 일부가 변경된 경우에만 재평가됩니다. 이는 `author.books` 가 변경되지 않은 한 `publishedBooksMessage` BooksMessage에 여러번 접근하더라도 getter 함수를 다시 실행할 필요 없이 이전에 계산된 결과를 즉시 반환합니다.

This also means the following computed property will never update, because `Date.now()` is not a reactive dependency:

또한 이는 `Date.now()`이 반응형 종속성이 아니기 때문에, 다음 예제의 computed 속성이 업데이트되지 않음을 의미합니다.

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

In comparison, a method invocation will **always** run the function whenever a re-render happens.

이에 비해 메소드 호출은 다시 렌더링이 발생할 때마다 **항상** 함수를 호출합니다.

Why do we need caching? Imagine we have an expensive computed property `list`, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on `list`. Without caching, we would be executing `list`’s getter many more times than necessary! In cases where you do not want caching, use a method call instead.

캐싱이 필요한 이유는 무엇일까요? 거대한 배열을 반복하고 많은 계산을 수행해야 하는 값비싼 `list` computed 속성이 있다고 상상해보십시오. 그리고 `list` 에 종속적인 다른 computed 속성들이 있다고 가정해봅시다. 캐싱이 없다면 `list` 의 getter를 필요한 것보다 훨씬 더 많이 실행할 것입니다! 캐싱을 원하지 않는 경우라면, 메소드 호출을 사용하십시오.

## Writable Computed
## 쓰기 가능한 Computed

Computed properties are by default getter-only. If you attempt to assign a new value to a computed property, you will receive a runtime warning. In the rare cases where you need a "writable" computed property, you can create one by providing both a getter and a setter:

computed 속성은 기본적으로 getter만 제공하는 읽기 전용입니다. computed 속성에 새 값을 할당하려고 하면 런타임 경고가 표시됩니다. "쓰기 가능한" 계산 속성이 필요한 드문 경우에 getter와 setter를 모두 제공하여 속성을 만들 수 있습니다:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Now when you run `this.fullName = 'John Doe'`, the setter will be invoked and `this.firstName` and `this.lastName` will be updated accordingly.

이제 `this.fullName = '존 도우'` 를 실행하면 setter가 호출되고 이에 따라 `this.firstName` 및 `this.lastName` 이 업데이트됩니다.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Now when you run `fullName.value = 'John Doe'`, the setter will be invoked and `firstName` and `lastName` will be updated accordingly.

이제 `fullName.value = 'John Doe'` 를 실행하면 setter가 호출되고 이에 따라 `firstName` 및 `lastName` 이 업데이트됩니다.

</div>

## Best Practices
## 모범 사례

### Getters should be side-effect free
### Getter는 사이드이펙트가 없어야 합니다.

It is important to remember that computed getter functions should only perform pure computation and be free of side effects. For example, don't make async requests or mutate the DOM inside a computed getter! Think of a computed property as declaratively describing how to derive a value based on other values - its only responsibility should be computing and returning that value. Later in the guide we will discuss how we can perform side effects in reaction to state changes with [watchers](./watchers).

computed의 getter 함수는 순수한 계산만 수행하고 사이드이펙트가 없어야 하는 함을 기억하는 것이 중요합니다. 예를 들어, 비동기 요청을 하거나 computed getter 내부에서 DOM을 변경하지 마십시오! computed 속성을 다른 값을 기반으로 값을 파생하는 방법을 선언적으로 설명하는 것으로 생각하십시오. 유일한 역할은 해당 값을 계산하고 반환하는 것 이어야 합니다. 가이드 뒷 부분에서 우리는 [watch](./watchers) 와 함께 상태 변경에 대한 반응으로 부작용을 수행하는 방법에 대해 논의할 것입니다.

### Avoid mutating computed value
### computed 값을 변경하지 마십시오.

The returned value from a computed property is derived state. Think of it as a temporary snapshot - every time the source state changes, a new snapshot is created. It does not make sense to mutate a snapshot, so a computed return value should be treated as read-only and never be mutated - instead, update the source state it depends on to trigger new computations.

computed 속성에서 반환된 값은 파생된 상태입니다. 임시 스냅샷으로 생각하십시오. 소스 상태가 변경될 때마다 새 스냅샷이 생성됩니다. 스냅샷을 변경하는 것은 의미가 없으므로 계산된 반환 값은 읽기 전용으로 처리되어야 하며 변경되지 않아야 합니다. 대신 새 계산을 트리거하기 위해 의존하는 소스 상태(state)를 업데이트하십시오.
