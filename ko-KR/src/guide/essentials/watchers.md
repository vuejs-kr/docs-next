# 감시자

## 기본 예제

계산된 속성은 계산되어 파생된 값을 선언적으로 사용할 수 있게 합니다.
그러나 상태 변경에 대한 반응으로 "사이드 이펙트"(예: DOM을 변경하거나 비동기 작업의 결과를 기반으로 다른 상태를 변경하는 것)를 수행해야 하는 경우가 있습니다.

<div class="options-api">

옵션 API를 사용하는 경우, [`watch` 옵션](/api/options-state.html#watch)을 사용하여 반응형 속성이 변경될 때마다 함수를 실행할 수 있습니다:

```js
export default {
  data() {
    return {
      question: '',
      answer: '질문에는 일반적으로 물음표가 포함됩니다.'
    }
  },
  watch: {
    // 질문이 변경될 때마다 이 함수가 실행됩니다
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = '생각 중...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer === 'yes' ? '네' : '아니오'
      } catch (error) {
        this.answer = '오류! API에 연결할 수 없습니다. ' + error
      }
    }
  }
}
```

```vue-html
<p>
  예/아니오 질문:
  <input v-model="question" />
</p>
<p>{{ answer }}</p>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlc3Rpb246ICcnLFxuICAgICAgYW5zd2VyOiAn7KeI66y47JeQ64qUIOydvOuwmOyggeycvOuhnCDrrLzsnYztkZzqsIAg7Y+s7ZWo65Cp64uI64ukLidcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgLy8g7KeI66y47J20IOuzgOqyveuQoCDrlYzrp4jri6Qg7J20IO2VqOyImOqwgCDsi6TtlonrkKnri4jri6RcbiAgICBxdWVzdGlvbihuZXdRdWVzdGlvbiwgb2xkUXVlc3Rpb24pIHtcbiAgICAgIGlmIChuZXdRdWVzdGlvbi5pbmRleE9mKCc/JykgPiAtMSkge1xuICAgICAgICB0aGlzLmdldEFuc3dlcigpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYXN5bmMgZ2V0QW5zd2VyKCkge1xuICAgICAgdGhpcy5hbnN3ZXIgPSAn7IOd6rCBIOykkS4uLidcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL3llc25vLnd0Zi9hcGknKVxuICAgICAgICB0aGlzLmFuc3dlciA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXIgPT09ICd5ZXMnID8gJ+uEpCcgOiAn7JWE64uI7JikJ1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5hbnN3ZXIgPSAn7Jik66WYISBBUEnsl5Ag7Jew6rKw7ZWgIOyImCDsl4bsirXri4jri6QuICcgKyBlcnJvclxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+XG4gICAg7JiIL+yVhOuLiOyYpCDsp4jrrLg6XG4gICAgPGlucHV0IHYtbW9kZWw9XCJxdWVzdGlvblwiIC8+XG4gIDwvcD5cbiAgPHA+e3sgYW5zd2VyIH19PC9wPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

`watch` 옵션은 점으로 구분된 경로도 지원합니다:

```js
export default {
  watch: {
    // 참고: 단순 경로만 가능합니다. 표현식은 지원되지 않습니다.
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```

</div>

<div class="composition-api">

Composition API를 사용하는 경우, [`watch` 함수](/api/reactivity-core.html#watch)를 사용하여 반응형 속성이 변경될 때마다 함수를 실행할 수 있습니다:

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('질문에는 일반적으로 물음표가 포함됩니다.')

// watch는 ref에서 직접 작동합니다
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = '생각 중...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer === 'yes' ? '네' : '아니오'
    } catch (error) {
      answer.value = '오류! API에 연결할 수 없습니다. ' + error
    }
  }
})
</script>

<template>
  <p>
    예/아니오 질문:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5cbmNvbnN0IHF1ZXN0aW9uID0gcmVmKCcnKVxuY29uc3QgYW5zd2VyID0gcmVmKCfsp4jrrLjsl5DripQg7J2867CY7KCB7Jy866GcIOusvOydjO2RnOqwgCDtj6ztlajrkKnri4jri6QuJylcblxuLy8gd2F0Y2jripQgcmVm7JeQ7IScIOyngeygkSDsnpHrj5ntlanri4jri6RcbndhdGNoKHF1ZXN0aW9uLCBhc3luYyAobmV3UXVlc3Rpb24sIG9sZFF1ZXN0aW9uKSA9PiB7XG4gIGlmIChuZXdRdWVzdGlvbi5pbmRleE9mKCc/JykgPiAtMSkge1xuICAgIGFuc3dlci52YWx1ZSA9ICfsg53qsIEg7KSRLi4uJ1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly95ZXNuby53dGYvYXBpJylcbiAgICAgIGFuc3dlci52YWx1ZSA9IChhd2FpdCByZXMuanNvbigpKS5hbnN3ZXIgPT09ICd5ZXMnID8gJ+uEpCcgOiAn7JWE64uI7JikJ1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbnN3ZXIudmFsdWUgPSAn7Jik66WYISBBUEnsl5Ag7Jew6rKw7ZWgIOyImCDsl4bsirXri4jri6QuICcgKyBlcnJvclxuICAgIH1cbiAgfVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIOyYiC/slYTri4jsmKQg7KeI66y4OlxuICAgIDxpbnB1dCB2LW1vZGVsPVwicXVlc3Rpb25cIiAvPlxuICA8L3A+XG4gIDxwPnt7IGFuc3dlciB9fTwvcD5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

### 감시 대상 타입

`watch`의 첫 번째 인수는 다양한 유형의 반응형 "소스"가 될 수 있습니다.
ref(계산된 ref 포함), 반응형 객체, getter 함수 또는 여러 소스의 배열이 될 수 있습니다:

```js
const x = ref(0)
const y = ref(0)

// 단일 ref
watch(x, (newX) => {
  console.log(`x값: ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x + y: ${sum}`)
  }
)

// 여러 소스의 배열
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x는 ${newX}이고, y는 ${newY} 입니다.`)
})
```

다음과 같이 반응형 객체의 속성을 감시할 수는 없습니다:

```js
const obj = reactive({ count: 0 })

// 이것은 watch()에 숫자를 전달하기 때문에 작동하지 않습니다.
watch(obj.count, (count) => {
  console.log(`count 값: ${count}`)
})
```

대신 getter를 사용하십시오:

```js
watch(
  () => obj.count,
  (count) => {
    console.log(`count 값: ${count}`)
  }
)
```

</div>

## 깊은 감시자

<div class="options-api">

`watch`는 기본적으로 얕습니다.
콜백은 감시된 속성에 새 값이 할당되었을 때만 트리거됩니다.
중첩된 속성 변경에는 트리거되지 않습니다.
중첩된 모든 변경사항에 대해 콜백을 실행하려면 깊은 감시자를 사용해야 합니다:

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // 참고:
        // someObject가 다른 객체로 교체되지 않는 한,
        // newValue와 oldValue는 같습니다.
        // 둘 다 동일한 객체를 참고하고 있기 때문입니다!
      },
      deep: true
    }
  }
}
```

</div>

<div class="composition-api">

`watch()`로 반응형 객체를 직접 호출하면 암시적으로 깊은 감시자가 생성됩니다.
콜백은 중첩된 모든 변경사항에 대해 실행됩니다.

```js
const someObject = reactive({ count: 0 })

watch(someObject, (newValue, oldValue) => {
  // 중첩된 속성 변경사항이 있을 경우 실행됩니다.
  // 참고:
  // `newValue`와 `oldValue`는 같습니다.
  // 둘 다 동일한 객체를 참고하고 있기 때문입니다!
})

someObject.count++
```

위 예제는 반응형 객체를 반환하는 getter 입니다.
아래의 경우 getter가 다른 객체를 반환하는 경우에만 콜백이 실행됩니다:

```js
const state = reactive({
  someObject: { count: 0 }
})

watch(
  () => state.someObject,
  () => {
    // state.someObject가 교체될 때만 실행됩니다.
  }
)
```

그러나 `deep` 옵션을 명시적으로 사용하여 두 번째 경우(위 예시)를 깊은 감시자로 강제할 수 있습니다:

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 참고: 
    // state.someObject가 교체되지 않는 한 여기에서
    // `newValue`와 `oldValue`는 같습니다.
  },
  { deep: true }
)
```

</div>

:::warning 사용 시 주의사항
깊은 감시는 감시된 객체의 모든 중첩 속성을 탐색하므로, 큰 데이터 구조에서 사용할 때 비용이 많이 들 수 있습니다.
성능에 영향을 주는지 고려해서 필요한 경우에만 사용하십시오.
:::

<div class="options-api">

## 열성적인 감시자 \*

`watch`는 기본적으로 게으릅니다(lazy).
콜백은 감시된 소스가 변경되기 전까지 호출되지 않습니다.
그러나 어떤 경우에는 동일한 콜백 로직이 열성적으로 실행되기를 원할 수 있습니다.
예를 들어 최초 데이터가 구성된 후 콜백이 실행되기를 원할 수 있습니다.

`handler` 함수와 `immediate: true` 옵션으로 구성된 객체를 사용해 감시자를 선언함으로써 콜백이 즉시 실행되도록 할 수 있습니다:

```js
export default {
  // ...
  watch: {
    question: {
      handler(newQuestion) {
        // 이제 컴포넌트 생성 시
        // `beforeCreate`와 `created` 훅 사이에
        // 한 번 실행됩니다.
      },
      // 열성적으로 콜백 실행
      immediate: true
    }
  }
  // ...
}
```

</div>

<div class="composition-api">

## `watchEffect()` \*\*

`watch()`는 게으르므로(lazy) 감시 소스가 변경될 때까지 콜백이 호출되지 않습니다.
그러나 어떤 경우에는 동일한 콜백 로직이 열성적으로 실행되기를 원할 수 있습니다.
예를 들어 초기 데이터를 가져온 다음 관련 상태가 변경될 때마다 데이터를 다시 가져오기를 원할 수 있습니다.
다음과 같이 구현할 수 있습니다:

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// 즉시 데이터 가져오기
fetchData()
// ...그런다음 url 변경을 감시하도록 watch를 실행합니다.
watch(url, fetchData)
```

위 구현 로직은 [`watchEffect()`](/api/reactivity-core.html#watcheffect)로 단순화할 수 있습니다.
`watchEffect()`를 사용하면 반응형 종속성을 자동으로 감시하면서, 최초에 즉시 사이드 이펙트를 한 번 실행합니다.
위의 예는 다음과 같이 다시 작성할 수 있습니다:

```js
const url = ref('https://...')
const data = ref(null)

watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

이제 콜백이 최초에 즉시 한 번 실행됩니다.
실행되는 동안에도 자동으로 종속성인 `url.value`를 추적합니다(계산된 속성과 유사).
`url.value`가 변경될 때마다 콜백이 다시 실행됩니다.

`watchEffect`와 반응형 데이터 가져오기 동작에 대해 [이 예제](/examples/#fetching-data)에서 확인할 수 있습니다.

:::tip
`watchEffect`는 **동기적** 실행 중에만 종속성을 추적합니다.
비동기 콜백과 함께 사용할 때 첫 번째 `await` 틱 이전에 접근한 속성들만 추적합니다.
:::

### `watch` vs. `watchEffect`

`watch`와 `'watchEffect`' 둘 다 사이드 이펙트를 반응적으로 실행할 수 있게 해줍니다.
주요 차이점은 반응형 종속성을 추적하는 방식입니다:

- `watch`는 명시적으로 감시된 소스만 추적합니다.
  콜백 내에서 조회하는 항목은 추적하지 않습니다.
  또한 콜백은 소스가 실제로 변경된 경우에만 트리거됩니다.
  `watch`는 종속성 추적을 사이드 이펙트와 분리하여, 콜백이 실행되어야 하는 시기를 보다 정확하게 제어할 수 있습니다.

- 반면 `watchEffect`는 종속성 추적과 사이드 이펙트를 하나의 단계로 결합합니다.
  동기적(sync) 실행 중에 조회되는 모든 반응형 속성을 자동으로 추적합니다.
  이것은 더 편리하고 일반적으로 더 간결한 코드를 생성하지만, 콜백이 실행되어야 하는 시기가 덜 명시적입니다.

</div>

## 콜백 실행 타이밍

반응형 상태를 변경하면 Vue 컴포넌트 업데이트와 사용자가 만든 감시자 콜백이 모두 실행될 수 있습니다.

기본적으로 개발자가 생성한 감시자 콜백은 Vue 컴포넌트가 **업데이트되기 전**에 실행됩니다.
따라서 감시자 콜백 내에서 DOM에 접근하면 DOM이 Vue에 의해 업데이트되기 전의 상태입니다.

Vue에 의해 업데이트된 후 의 DOM을 감시자 콜백에서 접근하려면, `flush: 'post'` 옵션을 지정해야 합니다:

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

`flush: 'post'` 옵션이 적용된 `watchEffect()`를 보다 간편하게 사용하기 위해서 `watchPostEffect()`를 사용할 수 있습니다:

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* Vue가 업데이트 된 후 실행됩니다 */
})
```

</div>

<div class="options-api">

## `this.$watch()` \*

[`$watch()` 인스턴스 메서드](/api/component-instance.html#watch)를 사용하여 감시자를 선언적으로 생성할 수도 있습니다.

```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```

이는 감시자를 조건부로 설정해야 하거나, 사용자 상호 작용에 대한 응답으로만 무언가를 감시해야 할 때 유용합니다.
또한 감시자를 조기에 중지할 수 있습니다.

</div>

## 감시자 중지하기

<div class="options-api">

`watch` 옵션이나 `$watch()` 인스턴스 메소드를 사용하여 선언된 감시자는 해당 컴포넌트가 마운트 해제될 때 자동으로 중지되므로 대부분의 경우 감시자를 직접 중지하는 것에 대해 고민할 필요가 없습니다.

드물게 해당 컴포넌트가 마운트 해제되기 전에 감시자를 중지해야 하는 경우를 위해 `$watch()` API는 이 기능을 수행할 수 있게 함수를 반환합니다:

```js
const unwatch = this.$watch('foo', callback)

// ...나중에 감시자가 더 이상 필요하지 않을 때:
unwatch()
```

</div>

<div class="composition-api">

`setup()` 또는 `<script setup>` 내부에서 동기적으로 선언된 감시자는 해당 컴포넌트 인스턴스에 바인딩되며, 해당 컴포넌트가 마운트 해제되면 자동으로 중지됩니다.
대부분의 경우 감시자를 직접 중지하는 것에 대해 고민할 필요가 없습니다.

여기서 핵심은 감시자가 **동기적**(synchronously)으로 생성되어야 한다는 것입니다.
감시자가 비동기 콜백에서 생성된 경우, 감시자는 해당 컴포넌트에 바인딩되지 않으며 메모리 누수를 방지하기 위해 수동으로 중지해야 합니다.
다음은 이러한 케이스에 해당하는 예제입니다:

```vue
<script setup>
import { watchEffect } from 'vue'

// 이 감시자는 컴포넌트가 마운트 해제되면 자동으로 중지됩니다.
watchEffect(() => {})

// ...하지만 이것은 자동으로 중지되지 않습니다.
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

감시자를 수동으로 중지하려면 반환된 함수를 사용하십시오.
이것은 `watch`와 `watchEffect` 모두에서 작동합니다:

```js
const unwatch = watchEffect(() => {})

// ...나중에 감시자가 더 이상 필요하지 않을 때:
unwatch()
```

감시자를 비동기식으로 생성해야 하는 경우는 거의 없으며, 가능하면 동기식 생성을 해야 합니다.
일부 비동기 데이터를 기다려야 하는 경우, 감시자 로직을 조건부로 만들 수 있습니다:

```js
// 비동기적으로 로드할 데이터
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 데이터가 로드될 때 실행될 로직
  }
})
```

</div>
