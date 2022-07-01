<script setup>
import CustomPreferenceSwitch from './CustomPreferenceSwitch.vue'
</script>

# 옵션: 기타 {#options-misc}

## name

표시될 컴포넌트 이름을 명시적으로 선언합니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **세부 사항**:

  컴포넌트의 이름은 다음에 사용됩니다:

  - 컴포넌트 자체 템플릿의 재귀적 참조
  - Vue DevTools의 컴포넌트 검사 트리에 표시
  - 컴포넌트 경고 추적에 표시

  싱글 파일 컴포넌트를 사용할 때,
  컴포넌트는 파일 이름으로 고유한 이름을 유추합니다.
  예를 들어,
  `MyComponent.vue`라는 파일에서 유추된 이름 "MyComponent"입니다.

  또는 컴포넌트를 [`app.component`](/api/application.html#app-component)를 사용하여 전역으로 등록하면,
  전역 ID가 자동으로 이름으로 설정되는 경우 입니다.

  `name` 옵션을 사용하면,
  유추된 이름을 재정의하거나 이름을 유추할 수 없는 경우(예: 빌드 도구를 사용하지 않거나 인라인된 SFC가 아닌 컴포넌트를 사용하는 경우),
  이름을 명시적으로 제공할 수 있습니다.

  `name`이 명시적으로 필요한 경우는 단 하나로,
  [`<KeepAlive>`](/guide/built-ins/keep-alive.html)의 `include / exclude` props를 통해 캐시 가능한 컴포넌트를 정의하는 경우입니다.

## inheritAttrs

- **타입**:

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // 기본 값: true
  }
  ```

- **세부 사항**:

  기본적으로 props로 인식되지 않는 부모 범위(scope)의 속성 바인딩은 "폴스루(fallthrough)"됩니다.
  즉, 싱글 루트 컴포넌트가 있는 경우,
  이러한 바인딩이 일반 HTML 속성으로 자식 컴포넌트의 루트 엘리먼트에 적용됩니다.
  대상이 되는 엘리먼트 또는 다른 컴포넌트를 래핑하는 컴포넌트를 작성할 때,
  이러한 동작을 원치 않을 수 있습니다.
  `inheritAttrs`를 `false`로 설정하면,
  이 기본 동작을 비활성화할 수 있습니다.
  속성은 `$attrs` 인스턴스 속성을 통해 사용할 수 있으며,
  `v-bind`를 사용하여 루트가 아닌 요소에 명시적으로 바인딩할 수 있습니다.

- **예제**:

  <div class="composition-api">

  `<script setup>`을 사용하는 컴포넌트에서 이 옵션을 선언해야 할 경우,
  별도의 `<script>` 블록이 필요합니다:

  </div>

  <CustomPreferenceSwitch />

  <div class="composition-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false
  }
  </script>

  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **참고**: [가이드 - 폴스루 속성](/guide/components/attrs.html)

## components

컴포넌트 인스턴스에서 다른 컴포넌트를 사용할 수 있도록 등록하는 객체입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **예제**:

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // 단축 표기 (객체 리터럴 문법)
      Foo,
      // 다른 이름으로 등록
      RenamedBar: Bar
    }
  }
  ```

- **참고**: [가이드 - 컴포넌트 등록](/guide/components/registration.html)

## directives

컴포넌트 인스턴스에서 사용할 수 있도록 커스텀 디렉티브를 등록하는 객체입니다.

- **타입**:

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **예제**:

  ```js
  export default {
    directives: {
      // 템플릿에서 v-focus 사용 가능
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

  번잡해질 수 있는 기능을 정의한 디렉티브로,
  간단하게 컴포넌트 인스턴스에서 사용할 수 있습니다.

- **참고**: [가이드 - 커스텀 디렉티브](/guide/reusability/custom-directives.html)
