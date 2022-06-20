# 컴포넌트

지금까지 우리는 단일 컴포넌트로만 작업했습니다.
일반적으로 실제 Vue 앱은 중첩된 컴포넌트를 사용하여 생성됩니다.

상위 컴포넌트는 다른 컴포넌트를 템플릿의 하위 컴포넌트로 렌더링할 수 있습니다.
자식 컴포넌트를 사용하려면 먼저 가져와야 합니다:

<div class="composition-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'
```

</div>
</div>

<div class="options-api">
<div class="sfc">

```js
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
```

그런 다음 `components` 옵션을 사용하여 컴포넌트를 등록해야 합니다.
여기서는 [객체 축약형 속성명](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions) 문법을 사용하여 `ChildComp`로 컴포넌트를 등록했습니다.

</div>
</div>

<div class="sfc">

그런 다음 템플릿에서 컴포넌트를 다음과 같이 사용할 수 있습니다:

```vue-html
<ChildComp />
```

</div>

<div class="html">

```js
import ChildComp from './ChildComp.js'

createApp({
  components: {
    ChildComp
  }
})
```

그런 다음 `components` 옵션을 사용하여 컴포넌트를 등록해야 합니다.
여기서는 [객체 축약형 속성명](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#property_definitions) 문법을 사용하여 `ChildComp`로 컴포넌트를 등록했습니다.

DOM에 템플릿을 작성하므로 태그의 대소문자를 구분하지 않는 브라우저 문법 분석 규칙이 적용됩니다.
따라서 하위 컴포넌트를 참조하려면 케밥 케이스(kebab-cased) 이름을 사용해야 합니다:

```vue-html
<child-comp></child-comp>
```

</div>

이제 직접 템플릿에서 하위 컴포넌트를 가져와 렌더링해봅시다.
