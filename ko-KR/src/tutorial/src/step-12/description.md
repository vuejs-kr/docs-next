# Props

자식 컴포넌트는 **props**를 통해 부모로부터 데이터를 받을 수 있습니다.
우선, 허용할 props를 선언해야 합니다:

<div class="composition-api">
<div class="sfc">

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

참고로 `defineProps()`는 컴파일 타임 매크로이므로 `import` 할 필요가 없습니다.
일단 선언되면 `msg` prop은 자식 컴포넌트 템플릿에서 사용할 수 있습니다.
또한 `defineProps()`에서 반환된 객체는 JavaScript에서 접근할 수 있습니다.

</div>

<div class="html">

```js
// 자식 컴포넌트에서
export default {
  props: {
    msg: String
  },
  setup(props) {
    // props.msg에 접근 가능
  }
}
```

일단 선언되면 `msg` prop이 `this`에 노출되고,
자식 컴포넌트의 템플릿에서 사용할 수 있습니다.
전달 받은 props는 `setup()`에 첫 번째 인자로 전달됩니다.

</div>

</div>

<div class="options-api">

```js
// 자식 컴포넌트에서
export default {
  props: {
    msg: String
  }
}
```

일단 선언되면 `msg` prop이 `this`에 노출되고,
자식 컴포넌트의 템플릿에서 사용할 수 있습니다.

</div>

부모는 속성을 사용하는 것처럼 자식에게 prop을 전달할 수 있습니다.
동적 값을 전달하기 위해 `v-bind` 문법을 사용할 수도 있습니다:

<div class="sfc">

```vue-html
<ChildComp :msg="greeting" />
```

</div>
<div class="html">

```vue-html
<child-comp :msg="greeting"></child-comp>
```

</div>

이제 `greeting` 속성을 자식 컴포넌트에 `msg`라는 prop으로 전달해봅시다!
