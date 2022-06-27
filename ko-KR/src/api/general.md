<script setup>
import CustomPreferenceSwitch from './CustomPreferenceSwitch.vue'
</script>

# Global API: General

## version

Vue의 현재 버전(문자열)을 반환합니다.

- **타입**: `string`

- **예제**:

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick()

다음 DOM 업데이트 발생을 기다리는 유틸리티입니다.

- **타입**:

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **세부 사항**:
  반응형 상태를 변경한 결과는 동기적으로 DOM에 업데이트되지 않습니다.
  대신, 이것은 상태를 얼마나 많이 변경했는지에 관계없이 "다음 틱"까지 버퍼링하여, 각 컴포넌트가 한 번만 업데이트 되었음을 보장합니다.

  `nextTick()`은 상태 변경 직후에 DOM 업데이트가 완료될 때까지 대기하는 데 사용할 수 있습니다.
  콜백을 인자로 전달하거나, 프로미스(Promise) 반환을 기다릴 수 있습니다.

- **예제**:

  <CustomPreferenceSwitch />

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // 아직 DOM 업데이트되지 않음.
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // 이제 DOM 업데이트됨.
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // 아직 DOM 업데이트되지 않음.
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // 이제 DOM 업데이트됨.
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **참고**: [`this.$nextTick()`](/api/component-instance.html#nexttick)

## defineComponent()

타입 추론으로 Vue 컴포넌트를 정의하기 위한 타입 핼퍼입니다.

- **타입**:

  ```ts
  function defineComponent(
    component: ComponentOptions | ComponentOptions['setup']
  ): ComponentConstructor
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**:

  첫 번째 인자로 컴포넌트 옵션 객체가 필요합니다.
  이 함수는 본질적으로 타입 추론 목적이므로, 동일한 옵션 객체를 반환하며, 런타임에 작동하지 않습니다.

  반환 타입은 약간 특별한데, 옵션을 기반으로 추론된 컴포넌트 인스턴스 타입인 생성자 타입이 됩니다.
  이것은 반환된 타입이 TSX에서 태그로 사용될 때 타입 추론에 사용됩니다.

  다음과 같이 `defineComponent()`의 반환 타입에서 컴포넌트의 인스턴스 타입(해당 옵션의 `this` 타입과 동일)을 추출할 수 있습니다:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

- **참고**: [가이드 - Vue에서 타입스크립트 사용하기](/guide/typescript/overview.html#general-usage-notes)

## defineAsyncComponent()

렌더링될 때 지연 로드되는 비동기 컴포넌트를 정의합니다.
인자는 로더 함수이거나 로드 동작의 고급 제어를 위한 옵션 객체일 수 있습니다.

- **타입**:

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **참고**: [가이드 - 비동기 컴포넌트](/guide/components/async.html)

## defineCustomElement()

이 메서드는 [`defineComponent`](#definecomponent)와 동일한 인자를 사용하지만,
네이티브 [커스텀 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 클래스 생성자를 반환합니다.

- **타입**:

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  ```

  > 타입은 가독성을 위해 단순화되었습니다.

- **세부 사항**:

  `defineCustomElement()`는 일반 컴포넌트 옵션 외에도 추가로 엘리먼트의 [섀도우 루트](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)에 삽입되어야 하는 CSS를 제공하기 위해,
  인라인 CSS 문자열을 배열로 감싼 특수 옵션 `styles`도 지원합니다.

  반환 값은 [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)을 사용하여 등록할 수 있는 커스텀 엘리먼트 생성자입니다.

- **예제**:

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* 컴포넌트 옵션 */
  })

  // 커스텀 엘리먼트를 등록함
  customElements.define('my-vue-element', MyVueElement)
  ```

- **참고**:

  - [가이드 - Vue로 커스텀 엘리먼트 만들기](/guide/extras/web-components.html#building-custom-elements-with-vue)

  - `defineCustomElement()`는 싱글 파일 컴포넌트와 함께 사용할 때, [특별한 설정](/guide/extras/web-components.html#sfc-as-custom-element)이 필요합니다.
