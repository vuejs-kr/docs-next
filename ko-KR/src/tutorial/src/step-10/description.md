# 감시자

때때로 우리는 반응형 "사이드 이펙트"를 수행해야 합니다.
예를 들어 숫자가 변경될 때, 콘솔에 숫자를 기록하는 것입니다.
우리는 `watch`(감시자)로 이러한 목적을 구현할 수 있습니다:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // 예, console.log()는 사이드 이펙트입니다.
  console.log(`새로 센 숫자 값은: ${newCount}`)
})
```

`watch()`는 `ref`를 직접 감시할 수 있으므로, `count`의 값이 변경될 때마다 콜백이 실행됩니다.
`watch()`는 다른 타입의 데이터 소스도 볼 수 있습니다.
자세한 내용은 <a target="_blank" href="/guide/essentials/watchers.html">가이드 - 감시자</a>에서 다룹니다.

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // 예, console.log()는 사이드 이펙트입니다.
      console.log(`새로 센 숫자 값은: ${newCount}`)
    }
  }
}
```

여기에서는 `count` 속성의 변경 사항을 감시하기 위해 `watch` 옵션을 사용하고 있습니다.
`watch` 콜백은 `count`가 변경될 때 호출되고 새 값을 인자로 받습니다.
자세한 내용은 <a target="_blank" href="/guide/essentials/watchers.html">가이드 - 감시자</a>에서 다룹니다.

</div>

콘솔에 로그인하는 것보다 ID가 변경될 때 새 데이터를 가져오는 것이 더 실용적입니다.
우리는 컴포넌트가 마운트 될 때, API에서 할 일 데이터를 가지고 오는 코드를 가지고 있습니다.
할 일을 가져오기 위해 ID를 증가시키는 버튼도 있습니다.
버튼을 클릭할 때, 다음 할 일을 가져오는 감시자를 구현해 봅시다.
