:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Provide / Inject

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

## Prop Drilling
## prop 드릴링

Usually, when we need to pass data from the parent to a child component, we use [props](/guide/components/props). However, imagine the case where we have a large component tree, and a deeply nested component needs something from a distant ancestor component. With only props, we would have to pass the same prop across the entire parent chain:

일반적으로 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달해야 할 때 [props](/guide/components/props)를 사용합니다. 그러나 큰 컴포넌트 트리가 있고 깊이 중첩된 컴포넌트에 먼 조상 컴포넌트의 무언가가 필요한 경우를 상상해 보십시오. 우리에게 주어진 것이 props 뿐이라면 전체 부모 체인에 동일한 prop을 반복해서 전달해야 합니다.


![prop drilling diagram](./images/prop-drilling.png)

<!-- https://www.figma.com/file/yNDTtReM2xVgjcGVRzChss/prop-drilling -->

Notice although the `<Footer>` component may not care about these props at all, it still needs to declare and pass them along just so `<DeepChild>` can access them. If there is a longer parent chain, more components would be affected along the way. This is called "props drilling" and definitely isn't fun to deal with.

`<Footer>` 컴포넌트가 이러한 props가 전혀 필요 없지만, `<DeepChild>`가 필요로 하기 때문에  props를 선언하고 전달 해야 합니다. 더 긴 상위 체인이 있으면 그 과정에서 더 많은 컴포넌트가 영향을 받습니다. 이것을 "prop 드릴링" 이라고 하며 정말 재미 없습니다.


We can solve props drilling with `provide` and `inject`. A parent component can serve as a **dependency provider** for all its descendants. Any component in the descendant tree, regardless of how deep it is, can **inject** dependencies provided by components up in its parent chain.


우리는 `provide`와 `inject`로 prop 드릴링을 해결할 수 있습니다. 상위 컴포넌트는 모든 하위 컴포넌트에 대한 **의존성 제공자 provider**의 역할을 할 수 있습니다. 하위 트리의 모든 컴포넌트는 깊이에 관계없이 상위 체인의 컴포넌트에서 제공하는 종속성을 **주입**할 수 있습니다.


![Provide/inject scheme](./images/provide-inject.png)

<!-- https://www.figma.com/file/PbTJ9oXis5KUawEOWdy2cE/provide-inject -->

## Provide

<div class="composition-api">

To provide data to a component's descendants, use the [`provide()`](/api/composition-api-dependency-injection.html#provide) function:

컴포넌트의 하위 항목에 데이터를 제공하려면 [`provide()`](/api/composition-api-dependency-injection.html#provide) 함수를 사용하세요:


```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

If not using `<script setup>`, make sure `provide()` is called synchronously inside `setup()`:

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* key */ 'message', /* value */ 'hello!')
  }
}
```

The `provide()` function accepts two arguments. The first argument is called the **injection key**, which can be a string or a `Symbol`. The injection key is used by descendent components to lookup the desired value to inject. A single component can call `provide()` multiple times with different injection keys to provide different values.

`provide()` 함수는 두 개의 인자를 받습니다. 첫 번째 인자 는 **주입 키**라고 하며 문자열 또는 `Symbol`이 될 수 있습니다. 주입 키는 하위 컴포넌트에서 주입할 원하는 값을 조회하는 데 사용됩니다. 단일 컴포넌트는 다른 값을 제공하기 위해 다른 주입 키를 사용하여 `provide()`를 여러 번 호출할 수 있습니다.

The second argument is the provided value. The value can be of any type, including reactive state such as refs:

두 번째 인자는 제공된 값입니다. 값은 refs와 같은 반응형 상태를 포함하여 어떤 타입이든 될 수 있습니다:


```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

Providing reactive values allows the descendent components using the provided value to establish a reactive connection to the provider component.

반응형 값을 제공하면 제공된 값을 사용하는 하위 컴포넌트가 공급자 컴포넌트에 대한 반응 연결을 설정할 수 있습니다.


</div>

<div class="options-api">

To provide data to a component's descendants, use the [`provide`](/api/options-composition.html#provide) option:

컴포넌트의 하위 항목에 데이터를 제공하려면 [`provide`](/api/options-composition.html#provide) 옵션을 사용하세요:


```js
export default {
  provide: {
    message: 'hello!'
  }
}
```

For each property in the `provide` object, the key is used by child components to locate the correct value to inject, while the value is what ends up being injected.

`provide` 객체의 각 속성에 대해 키는 주입할 올바른 값을 찾기 위해 사용되고, 값은 주입됩니다. 

If we need to provide per-instance state, for example data declared via the `data()`, then `provide` must use a function value:

예를 들어 `data()`를 통해 선언된 데이터와 같이 인스턴스별 상태를 제공해야 하는 경우 `provide`는 함수 값을 사용해야 합니다:


```js{7-12}
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // use function syntax so that we can access `this`
    // 함수 문법을 사용ㅇ하기 때문에 `this`를 통해 접근할수 있습니다. 
    return {
      message: this.message
    }
  }
}
```

However, do note this does **not** make the injection reactive. We will discuss [making injections reactive](#working-with-reactivity) below.

그러나 주입된 값을 자동으로 반응형으로 만들지 **않습니다**. 우리는 아래에서 [주입을 반응형으로 만들기](#working-with-reactivity)에 대해 논의할 것입니다.


</div>

## App-level Provide
## 애플리케이션 레벨 주입

In addition to providing data in a component, we can also provide at the app level:

컴포넌트에 데이터를 제공하는 것 외에도 앱 수준에서 다음을 제공할 수도 있습니다.


```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

App-level provides are available to all components rendered in the app. This is especially useful when writing [plugins](/guide/reusability/plugins.html), as plugins typically wouldn't be able to provide values using components.

앱 수준 제공은 앱에서 렌더링되는 모든 컴포넌트에서 사용할 수 있습니다. 플러그인은 일반적으로 컴포넌트를 통해 값을 제공할 수 없기 때문에 [플러그인](/guide/reusability/plugins.html)을 작성할 때 특히 유용합니다.


## Inject
## 주입

<div class="composition-api">

To inject data provided by an ancestor component, use the [`inject()`](/api/composition-api-dependency-injection.html#inject) function:

상위 컴포넌트에서 제공한 데이터를 주입하려면 [`inject()`](/api/composition-api-dependency-injection.html#inject) 함수를 사용하세요:


```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

If the provided value is a ref, it will be injected as-is and will **not** be automatically unwrapped. This allows the injector component to retain the reactivity connection to the provider component.

제공된 값이 ref인 경우 그대로 주입되고 자동으로 래핑 해제되지 **않습니다**. 이를 통해 주입대상 컴포넌트는 제공자 컴포넌트에 대한 반응성 연결을 유지할 수 있습니다.


[Full provide + inject Example with Reactivity](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuLy8gYnkgcHJvdmlkaW5nIGEgcmVmLCB0aGUgR3JhbmRDaGlsZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaGFwcGVuaW5nIGhlcmUuXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG5wcm92aWRlKCdtZXNzYWdlJywgbWVzc2FnZSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiPlxuICA8Q2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNoaWxkLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgR3JhbmRDaGlsZCBmcm9tICcuL0dyYW5kQ2hpbGQudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBtZXNzYWdlID0gaW5qZWN0KCdtZXNzYWdlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIE1lc3NhZ2UgdG8gZ3JhbmQgY2hpbGQ6IHt7IG1lc3NhZ2UgfX1cbiAgPC9wPlxuPC90ZW1wbGF0ZT4ifQ==)

Again, if not using `<script setup>`, `inject()` should only be called synchronously inside `setup()`:

주의할것은 `<script setup>`을 사용하지 않는 경우 `inject()`는 `setup()` 내에서 동기적으로 호출되어야 합니다:

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

</div>

<div class="options-api">

To inject data provided by an ancestor component, use the [`inject`](/api/options-composition.html#inject) option:

상위 컴포넌트에서 제공한 데이터를 삽입하려면 [`inject`](/api/options-composition.html#inject) 옵션을 사용하세요:


```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // injected value
  }
}
```

Injections are resolved **before** the component's own state, so you can access injected properties in `data()`:

주입은 컴포넌트의 자체 상태 **이전에** 리졸브 되므로 `data()`에서 주입된 속성에 액세스할 수 있습니다:


```js
export default {
  inject: ['message'],
  data() {
    return {
      // initial data based on injected value
      // 주입된 값으로 데이터를 초기화 할수 있음
      fullMessage: this.message
    }
  }
}
```

[Full provide + inject example](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENoaWxkIH0sXG4gIHByb3ZpZGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6ICdoZWxsbydcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

### Injection Aliasing \*
### 주입 별명 \*

When using the array syntax for `inject`, the injected properties are exposed on the component instance using the same key. In the example above, the property was provided under the key `"message"`, and injected as `this.message`. The local key is the same as the injection key.

`inject`에 대한 배열 구문을 사용할 때 주입된 속성은 동일한 키를 사용하여 컴포넌트 인스턴스에 노출됩니다. 위의 예에서 속성은 `"message"` 키로 제공되었으며 `this.message`로 주입됩니다. 로컬 키는 주입 키와 동일합니다.


If we want to inject the property using a different local key, we need to use the object syntax for the `inject` option:

다른 로컬 키를 사용하여 속성을 주입하려면 `inject` 옵션에 대한 객체 구문을 사용해야 합니다.

```js
export default {
  inject: {
    /* local key */ localMessage: {
      from: /* injection key */ 'message'
    }
  }
}
```

Here, the component will locate a property provided with the key `"message"`, and then expose it as `this.localMessage`.

여기에서 컴포넌트는 키 `"message"`와 함께 제공된 속성을 찾은 다음 `this.localMessage`로 노출합니다.


</div>

### Injection Default Values
### 기본값 주입 

By default, `inject` assumes that the injected key is provided somewhere in the parent chain. In the case where the key is not provided, there will be a runtime warning.

기본적으로 `inject`는 주입된 키가 상위 체인의 어딘가에 제공된다고 가정합니다. 키가 제공되지 않은 경우 런타임 경고가 표시됩니다.


If we want to make an injected property work with optional providers, we need to declare a default value, similar to props:

주입된 속성이 옵션인 공급자와 함께 작동하도록 하려면 props 처럼 기본값을 선언해야 합니다:


<div class="composition-api">

```js
// `value` will be "default value"
// if no data matching "message" was provided
// "message"가 제공되지 않으면 `value`는 "default value"가 됩니다. 
const value = inject('message', 'default value')
```

In some cases, the default value may need to be created by calling a function or instantiating a new class. To avoid unnecessary computation or side effects in case the optional value is not used, we can use a factory function for creating the default value:

어떤 경우에는 함수를 호출하거나 새 클래스를 인스턴스화하여 기본값을 만들어야 할 수도 있습니다. 선택적 값이 사용되지 않는 경우 불필요한 계산이나 부작용을 피하기 위해 기본값을 생성하는 팩토리 함수를 사용할 수 있습니다:


```js
const value = inject('key', () => new ExpensiveClass())
```

</div>

<div class="options-api">

```js
export default {
  // object syntax is required
  // when declaring default values for injections
  // 주입 기본값을 선언하기 위해서는 객체 문법을 사용해야 합니다. 
  inject: {
    message: {
      from: 'message', // this is optional if using the same key for injection // 같은 이름으로 주입할때는 옵션입니다. 
      default: 'default value'
    },
    user: {
      // use a factory function for non-primitive values that are expensive
      // to create, or ones that should be unique per component instance.
      // 생성하는 데 비용이 많이 드는 기본이 아닌 값 또는 컴포넌트 인스턴스마다 고유해야 하는 값에 대해 팩토리 함수를 사용합니다.
      default: () => ({ name: 'John' })
    }
  }
}
```

</div>

## Working with Reactivity
## 반응형와 작업하기

<div class="composition-api">

When using reactive provide / inject values, **it is recommended to keep any mutations to reactive state inside of the _provider_ whenever possible**. This ensures that the provided state and its possible mutations are co-located in the same component, making it easier to maintain in the future.

반응 제공/주입 값을 사용할 때 **가능하면 _provider_ 내부에서 반응형 상태의 변경을 담당하게 하는것이 좋습니다**. 이렇게 하면 제공된 상태와 가능한 돌연변이가 동일한 컴포넌트에 함께 배치되어 향후 유지 관리가 더 쉬워집니다.


There may be times when we need to update the data from an injector component. In such cases, we recommend providing a function that is responsible for mutating the state:

주입대상 컴포넌트에서 데이터를 업데이트해야 하는 경우도 있습니다. 이러한 경우 상태 변경을 담당하는 함수를 제공하는 것이 좋습니다.


```vue{7-9,13}
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue{5}
<!-- in injector component -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

Finally, you can wrap the provided value with [`readonly()`](/api/reactivity-core.html#readonly) if you want to ensure that the data passed through `provide` cannot be mutated by the injected component.

마지막으로 `provide`를 통해 전달된 데이터가 주입된 컴포넌트에 의해 변경되지 않도록 하려면 제공된 값을 [`readonly()`](/api/reactivity-core.html#readonly)로 래핑할 수 있습니다.


```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

</div>

<div class="options-api">

In order to make injections reactively linked to the provider, we need to provide a computed property using the [computed()](/api/reactivity-core.html#computed) function:

공급자에 반응적으로 연결된 주입을 만들기 위해 [computed()](/api/reactivity-core.html#computed) 함수를 사용하여 계산된 속성을 제공해야 합니다:


```js{10}
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      message: computed(() => this.message)
    }
  }
}
```

[Full provide + inject Example with Reactivity](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHsgQ2hpbGQgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogJ2hlbGxvJ1xuICAgIH1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogY29tcHV0ZWQoKCkgPT4gdGhpcy5tZXNzYWdlKVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGlucHV0IHYtbW9kZWw9XCJtZXNzYWdlXCI+XG4gIDxDaGlsZCAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ2hpbGQudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBHcmFuZENoaWxkIGZyb20gJy4vR3JhbmRDaGlsZC52dWUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29tcG9uZW50czoge1xuICAgIEdyYW5kQ2hpbGRcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmplY3Q6IFsnbWVzc2FnZSddXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8cD5cbiAgICBNZXNzYWdlIHRvIGdyYW5kIGNoaWxkOiB7eyBtZXNzYWdlIH19XG4gIDwvcD5cbjwvdGVtcGxhdGU+In0=)

The `computed()` function is typically used in Composition API components, but can also be used to complement certain use cases in Options API. You can learn more about its usage by reading the [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html) and [Computed Properties](/guide/essentials/computed.html) with the API Preference set to Composition API.

`computed()` 함수는 일반적으로 컴포지션 API 컴포넌트에서 사용되지만 옵션 API의 특정 사용 사례를 보완하는 데 사용할 수도 있습니다. API Preference가 컴포지션 API로 설정된 상태에서 [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html) 및 [Computed Properties](/guide/essentials/computed.html)를 읽으면 사용법에 대해 자세히 알아볼 수 있습니다.


:::warning Temporary Config Required
The above usage requires setting `app.config.unwrapInjectedRef = true` to make injections automatically unwrap computed refs. This will become the default behavior in Vue 3.3 and this config is introduced temporarily to avoid breakage. It will no longer be required after 3.3.
:::

:::warning 설정이 필요함
위의 사용법에서는 인젝션이 계산된 참조를 자동으로 풀기 위해 `app.config.unwrapInjectedRef = true`를 설정해야 합니다. 이것은 Vue 3.3의 기본 동작이 되며 이 구성은 구버전을 사용하고 있는곳에서 피해를  피하기 위해 일시적으로 도입되었습니다. 3.3 이후에는 더 이상 필요하지 않습니다.
:::

</div>

## Working with Symbol Keys
## 심볼 키로 작업하기

So far, we have been using string injection keys in the examples. If you are working in a large application with many dependency providers, or you are authoring components that are going to be used by other developers, it is best to use Symbol injection keys to avoid potential collisions.

지금까지 예제에서 문자열 삽입 키를 사용했습니다. 많은 종속성 공급자가 있는 대규모 응용 프로그램에서 작업하거나 다른 개발자가 사용할 구성 요소를 작성하는 경우 잠재적 충돌을 피하기 위해 Symbol 주입 키를 사용하는 것이 가장 좋습니다.

It's recommended to export the Symbols in a dedicated file:

심볼을 전용 파일로 내보내는 것이 좋습니다.


```js
// keys.js
export const myInjectionKey = Symbol()
```

<div class="composition-api">

```js
// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})
```

```js
// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

See also: [Typing Provide / Inject](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

참고: [Provide / Inject에 타입 지정하기](/guide/typescript/composition-api.html#typing-provide-inject) <sup class="vt-badge ts" />

</div>

<div class="options-api">

```js
// in provider component
import { myInjectionKey } from './keys.js'

export default {
  provide() {
    return {
      [myInjectionKey]: {
        /* data to provide */
      }
    }
  }
}
```

```js
// in injector component
import { myInjectionKey } from './keys.js'

export default {
  inject: {
    injected: { from: myInjectionKey }
  }
}
```

</div>
