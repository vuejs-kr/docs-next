# 수명주기와 템플릿 참조

지금까지 Vue는 반응형 및 선언적 렌더링으로 모든 DOM 업데이트를 처리해 왔습니다.
그러나 필연적으로 DOM을 수동으로 작업해야 하는 경우가 있습니다.

우리는 <a target="_blank" href="/api/built-in-special-attributes.html#ref">특별한 속성인 `ref`</a>를 사용하여 **템플릿 참조**를 요청할 수 있습니다:

```vue-html
<p ref="p">안녕</p>
```

<div class="composition-api">

참조에 접근하려면 다음과 같이 이름이 일치하는 `ref`를 선언<span class="html">하고 노출</span>해야 합니다:

<div class="sfc">

```js
const p = ref(null)
```

</div>
<div class="html">

```js
setup() {
  const p = ref(null)

  return {
    p
  }
}
```

</div>

`ref`는 `null` 값으로 초기화합니다.
<span class="sfc">`<script setup>`</span><span class="html">`setup()`</span> 실행 시 해당 엘리먼트가 아직 존재하지 않기 때문입니다.
템플릿 참조는 컴포넌트가 **마운트된 후**에만 접근할 수 있습니다.

마운트된 후, 코드를 실행하려면 `onMounted()` 함수를 사용해야 합니다:

<div class="sfc">

```js
import { onMounted } from 'vue'

onMounted(() => {
  // 이제 컴포넌트가 마운트되었습니다.
})
```

</div>
<div class="html">

```js
import { onMounted } from 'vue'

createApp({
  setup() {
    onMounted(() => {
      // 이제 컴포넌트가 마운트되었습니다.
    })
  }
})
```

</div>
</div>

<div class="options-api">

엘리먼트는 `this.$refs`에 `this.$refs.p`로 노출됩니다.
그러나 컴포넌트가 **마운트된 후**에만 접근할 수 있습니다.

마운트된 후, 코드를 실행하려면 `mounted` 옵션을 사용해야 합니다:

<div class="sfc">

```js
export default {
  mounted() {
    // 이제 컴포넌트가 마운트되었습니다.
  }
}
```

</div>
<div class="html">

```js
createApp({
  mounted() {
    // 이제 컴포넌트가 마운트되었습니다.
  }
})
```

</div>
</div>

이것을 컴포넌트 **수명 주기 훅**이라고 하며,
수명 주기의 특정 시간에 호출할 콜백을 등록할 수 있습니다.
<span class="options-api">`created` 및 `updated`</span><span class="composition-api">`onUpdated` 및 `onUnmounted`</span>와 같은 다른 훅도 있습니다.
자세한 내용은 <a target="_blank" href="/guide/essentials/lifecycle.html#lifecycle-diagram">수명 주기 도표</a>에서 다룹니다.

이제 <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> 훅을 추가하고,
<span class="options-api">`this.$refs.p`</span><span class="composition-api">`p.value`</span>를 통해 `<p>`에 접근한 다음,
직접 DOM을 조작해봅시다(예: `textContent` 변경).
