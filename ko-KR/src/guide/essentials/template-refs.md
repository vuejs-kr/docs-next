:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# Template Refs
# 템플릿  Refs

While Vue's declarative rendering model abstracts away most of the direct DOM operations for you, there may still be cases where we need direct access to the underlying DOM elements. To achieve this, we can use the special `ref` attribute:

Vue의 선언적 렌더링 모델은 대부분의 DOM 대상 직접 작업을 추상화하지만, 여전히 네이티브 DOM 앨리먼트에 직접 액세스해야 하는 경우가 있을 수 있습니다. 이를 위해 특별한 `ref` 속성을 사용할 수 있습니다:


```vue-html
<input ref="input">
```

`ref` is a special attribute, similar to the `key` attribute discussed in the `v-for` chapter. It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted. This may be useful when you want to, for example, programmatically focus an input on component mount, or initialize a 3rd party library on an element.

`ref`는 `v-for` 장에서 논의된 `key` 속성과 유사한 특수 속성입니다. 이를 통해 마운트된 특정 DOM 앨리먼트 또는 자식 컴포넌트 인스턴스에 대한 직접 참조를 얻을 수 있습니다. 예를 들어 프로그래밍 방식으로 컴포넌트 마운트에 대한 입력에 초점을 맞추거나 앨리먼트에서 타사 라이브러리를 초기화하려는 경우에 유용할 수 있습니다.


## Accessing the Refs

<div class="composition-api">

To obtain the reference with Composition API, we need to declare a ref with the same name:

Composition API로 참조를 얻으려면 동일한 이름의 ref를 선언 하면 됩니다. 


```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
// 앨리먼트를 들고 있을 ref는 반드시 테플릿 ref와 동일한 이름이여야 한다. 
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

If not using `<script setup>`, make sure to also return the ref from `setup()`:

`<script setup>`을 사용하지 않는 경우 `setup()`에서 ref도 반환해야 합니다.


```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

The resulting ref is exposed on `this.$refs`:

결과 ref는 `this.$refs`에 노출됩니다:


```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Note that you can only access the ref **after the component is mounted.** If you try to access <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> in a template expression, it will be `null` on the first render. This is because the element doesn't exist until after the first render!


**컴포넌트가 마운트된 후에만 ref에 액세스할 수 있습니다.** <span class="options-api">`$refs.input`</span><span class="composition- api">`input`</span>이 템플릿 표현식에 있으면 첫 번째 렌더링에서 `null`이 됩니다. 이는 첫 번째 렌더링이 끝날 때까지 앨리먼트가 존재하지 않기 때문입니다!


<div class="composition-api">

If you are trying to watch the changes of a template ref, make sure to account for the case where the ref has `null` value:

템플릿 참조의 변경을 감시하려고 할때에는 ref의 값이  `null` 인 경우를 고려해야 합니다:


```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
    // 아직 마운트 되지 않았거나, 언마운트 되었음(예 v-if등으로 인해)
  }
})
```

See also: [Typing Template Refs](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

참조 : [템플릿 Refs에 타입 지정하기](/guide/typescript/composition-api.html#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Refs inside `v-for`
##  `v-for` 안에서 ref 사용하기


> Requires v3.2.25 or above

> 버전이   v3.2.25 이상 이여야 합니다 

<div class="composition-api">

When `ref` is used inside `v-for`, the corresponding ref should contain an Array value, which will be populated with the elements after mount:

`ref`가 `v-for` 내부에서 사용하려고 한다면, 해당 ref은 배열 값을 가져야 하고, 마운트 후 만들어진  앨리먼트의 배열이 됩니다:


```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

When `ref` is used inside `v-for`, the resulting ref value will be an array containing the corresponding elements:

`ref`가 `v-for` 내부에서 사용되면 결과 ref 값은 만들어진 앨리먼트들의 배열이 됩니다. 


```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

It should be noted that the ref array does **not** guarantee the same order as the source array.

ref 배열은 소스 배열과 동일한 순서를 보장하지 **않습니다**.


## Function Refs
## 함수  Refs

Instead of a string key, the `ref` attribute can also be bound to a function, which will be called on each component update and gives you full flexibility on where to store the element reference. The function receives the element reference as the first argument:

문자열 키 대신 `ref` 속성을 함수에 바인딩할 수도 있습니다. 이 함수는 각 컴포넌트 업데이트에서 호출되며 앨리먼트 참조를 저장할 위치에 대한 완전한 유연성을 제공합니다. 이 함수는 첫 번째 인수로 앨리먼트 참조를 받습니다.


```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

Note we are using a dynamic `:ref` binding so we can pass it a function instead of a ref name string. When the element is unmounted, the argument will be `null`. You can, of course, use a method instead of an inline function.

동적 `:ref` 바인딩을 사용하고 있으므로 ref 명 문자열 대신 함수를 전달할 수 있습니다. 앨리먼트가 마운트 해제되면 인수는 `null`이 됩니다. 물론 인라인 함수 대신 메서드를 사용할 수 있습니다.


## Ref on Component
## 컴포넌트의에서 ref

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

> 이 섹션은 [컴포넌트](/guide/essentials/component-basics) 에 대한 지식이 있다고 가정합니다. 건너 뛰고 나중에 다시 보셔도 됩니다.


`ref` can also be used on a child component. In this case the reference will be that of a component instance:

`ref`는 자식 컴포넌트에서도 사용할 수 있습니다. 이 경우 참조는 컴포넌트 인스턴스의 참조가 됩니다.


<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value는  <Child /> 의 인스턴스가 됩니다 
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child will hold an instance of <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">If the child component is using Options API or not using `<script setup>`, the</span><span class="options-api">The</span> referenced instance will be identical to the child component's `this`, which means the parent component will have full access to every property and method of the child component. This makes it easy to create tightly coupled implementation details between the parent and the child, so component refs should be only used when absolutely needed - in most cases, you should try to implement parent / child interactions using the standard props and emit interfaces first.

<span class="composition-api">자식 컴포넌트가 옵션 API를 사용하거나 `<script setup>`을 사용하지 않는 경우, 해당</span><span class="options-api">해당</span>  참조된 인스턴스는 자식 컴포넌트의 this와 동일합니다. 즉, 부모 컴포넌트는 자식 컴포넌트의 모든 속성과 메서드에 대한 전체 액세스 권한을 가집니다. 이렇게 하면 부모와 자식 간에 밀접하게 연결된 구현 세부 정보를 쉽게 만들 수 있으므로 컴포넌트 참조는 절대적으로 필요할 때만 사용해야 합니다. 대부분의 경우 표준 props를 사용하여 부모/자식 상호 작용을 구현하고 인터페이스를 먼저 내보내야 합니다.

<div class="composition-api">

An exception here is that components using `<script setup>` are **private by default**: a parent component referencing a child component using `<script setup>` won't be able to access anything unless the child component chooses to expose a public interface using the `defineExpose` macro:

여기서 예외는 `<script setup>`을 사용하는 컴포넌트가 **기본적으로 비공개**라는 점입니다. `<script setup>`을 사용하는 하위 컴포넌트를 참조하는 상위 컴포넌트는 하위 컴포넌트가 선택하지 않는 한 아무 것도 액세스할 수 없습니다. `defineExpose` 매크로를 사용하여 공개 인터페이스를 노출합니다:


```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

When a parent gets an instance of this component via template refs, the retrieved instance will be of the shape `{ a: number, b: number }` (refs are automatically unwrapped just like on normal instances).

부모가 템플릿 참조를 통해 이 컴포넌트의 인스턴스를 가져오면 검색된 인스턴스는 `{ a: number, b: number }` 모양이 됩니다(참조는 일반 인스턴스와 마찬가지로 자동으로 래핑 해제됨).


See also: [Typing Component Template Refs](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

참고: [컴포넌튼 템플릿 ref에 타입 지정하기](/guide/typescript/composition-api.html#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

The `expose` option can be used to limit the access to a child instance:

`expose` 옵션을 사용하여 하위 인스턴스에 대한 액세스를 제한할 수 있습니다:


```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

In the above example, a parent referencing this component via template ref will only be able to access `publicData` and `publicMethod`.


위의 예에서 템플릿 ref를 통해 이 컴포넌트를 참조하는 부모는 `publicData` 및 `publicMethod`에만 액세스할 수 있습니다.

</div>
