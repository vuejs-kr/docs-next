# 생명주기 훅(Lifecycle hooks)

각각의 Vue 컴포넌트 인스턴스는 생성될 때 일련의 초기화 단계를 거칩니다. 예를 들어 데이터 관찰을 설정하고 템플릿을 컴파일하고 인스턴스를 DOM에 마운트하고 데이터가 변경되면 DOM을 업데이트해야 합니다. 그 과정에서 생명주기 훅(lifecycle hooks) 기능도 실행하여 사용자가 특정 단계에서 자신의 코드를 추가할 수 있는 기회를 제공합니다.

## 생명주기 훅 등록

예를 들어 <span class="composition-api"><code>onMounted</code></span><span class="options-api"><code>mounted</code></span> 훅은 컴포넌트가 초기 렌더링을 완료하고 DOM 노드를 생성한 후 자신의 코드를 실행하는데 사용이 가능합니다:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```

</div>

인스턴스 생명주기의 여러 단계에서 호출되는 다른 훅도 있으며 가장 일반적으로 사용되는 것은 <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), 그리고 [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted) 입니다. </span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), and [`unmounted`](/api/options-lifecycle.html#unmounted) 입니다.</span>

<div class="options-api">

모든 생명주기 훅은 호출하는 현재 활성 인스턴스를 가리키는 `this` 컨텍스트로 호출됩니다. 즉, 생명주기 훅을 선언할 때 화살표 함수를 사용하지 말아야 합니다. 그렇게 하면 `this`를 통해 컴포넌트 인스턴스에 접근할 수 없기 때문입니다.

</div>

<div class="composition-api">

`onMounted`를 호출하면 Vue는 등록된 콜백 함수를 현재 활성 컴포넌트 인스턴스와 자동으로 연결합니다. 이를 위해서는 컴포넌트 설정 중에 이러한 훅을 **동기적으로(synchronously)** 등록해야 합니다. 예를 들어 다음과 같이 하지 마십시오:

```js
setTimeout(() => {
  onMounted(() => {
    // this won't work.
  })
}, 100)
```

이 호출이 `setup()` 또는 `<script setup>` 내에 사전적으로 배치되어야 함을 의미하지는 않습니다. `onMounted()`는 호출 스택이 동기식이고 `setup()` 내에서 시작되는 한 외부 함수로 호출할 수 있습니다.

</div>

## 생명주기 다이어그램

다음은 인스턴스 생명주기에 대한 다이어그램입니다. 지금 진행 중인 모든 것을 완전히 이해할 필요는 없지만 더 많이 배우고 구축함에 따라 유용한 참조가 될 것입니다.

![Component lifecycle diagram](https://github.com/vuejs-kr/docs-next/blob/main/ko-KR/src/guide/essentials/images/lifecycle.png?raw=true)

<!-- https://www.figma.com/file/Xw3UeNMOralY6NV7gSjWdS/Vue-Lifecycle -->

모든 생명주기 훅 및 해당 사용 사례에 대한 자세한 내용은 <span class="composition-api">[Lifecycle Hooks API reference](/api/composition-api-lifecycle.html)</span><span class="options-api">[Lifecycle Hooks API reference](/api/options-lifecycle.html)</span>를 확인하세요.
