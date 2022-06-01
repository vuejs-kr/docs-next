<script setup>
import ListBasic from './transition-demos/ListBasic.vue'
import ListMove from './transition-demos/ListMove.vue'
import ListStagger from './transition-demos/ListStagger.vue'
</script>

# TransitionGroup

`<TransitionGroup>` is a built-in component designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

`<TransitionGroup>`은 목록에서 렌더링되는 엘리먼트 또는 컴포넌트삽입, 제거 및 순서 변경을 애니메이션으로 만들기 위해 설계된 빌트인 컴포넌트입니다.


## Differences from `<Transition>`
## `<Transition>` 과의 차이점

`<TransitionGroup>`은 `<Transition>`과 동일한 props, CSS 트랜지션  클래스 및 JavaScript 훅 리스너를 지원하지만, 다음과 같은 차이점이 있습니다:


- 기본적으로 래퍼 앨리먼트를 렌더링하지 않습니다. 그러나 `tag` props로  렌더링할 앨리먼트를 지정할 수 있습니다.

- [트랜지션 모드](./transition.html#transition-modes) 는 지원하지 않습니다. 왜냐하면 우리는 더 이상 상호 배타적인 앨리먼트를 교체 하지않기 때문입니다.

- 내부 앨리먼트는 항상 유일한 `key` 속성을 **반드시 가져야 합니다** 

- CSS 트랜지션 클래스는 리스트 내부 각 개별 앨리먼트에 적용되며, 그룹/컨테이너 자체에는 적용되지 **않습니다**

:::tip
[DOM 템플릿](/guide/essentials/component-basics.html#dom-template-parsing-caveats)에서 사용할 때 `<transition-group>`으로 참조해야 합니다.
:::

## Enter / Leave Transitions
## 진입 / 진출 트랜지션

다음은 `<TransitionGroup>`을 사용하여 `v-for` 목록에 진입/진출 트랜지션을 적용하는 예입니다.


```vue-html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

<ListBasic />

## Move Transitions
## 이동 트랜지션

The above demo has some obvious flaws: when an item is inserted or removed, its surrounding items instantly "jump" into place instead of moving smoothly. We can fix this by adding a few additional CSS rules:

위의 데모에는 몇 가지 명백한 결함이 있습니다. 항목을 삽입하거나 제거할 때 주변 항목이 부드럽게 움직이는 대신 제자리에 즉시 "점프"합니다. 몇 가지 추가 CSS 규칙을 추가하여 이 문제를 해결할 수 있습니다.


```css{1,13-17}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```

이제 훨씬 좋아 보입니다. 전체 목록이 섞일 때 부드럽게 애니메이션이 적용됩니다.


<ListMove />

[전체 예제](/examples/#list-transition)

## 흔들리는 리스트 트랜지션 

데이터 속성을 통해 자바스크립트 트랜지션을 수행하면, 흔들리는 트랜지션을 수행할수 있습니다. 일단 DOM 앨리먼트에 data 속성을으로 아이템 인덱스를 가지게 렌더링 해봅니다. 

```vue-html{11}
<TransitionGroup
  tag="ul"
  :css="false"
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @leave="onLeave"
>
  <li
    v-for="(item, index) in computedList"
    :key="item.msg"
    :data-index="index"
  >
    {{ item.msg }}
  </li>
</TransitionGroup>
```


자바스크립트 훅에서, 이 데이터 속성을 이용해서 트랜지션 딜레이를 줄수 있습니다. 

```js{5}
function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
```

<ListStagger />

<div class="composition-api">

[전체 예제를 온라인 연습장에서 확인하세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xuXG5jb25zdCBsaXN0ID0gW1xuICB7IG1zZzogJ0JydWNlIExlZScgfSxcbiAgeyBtc2c6ICdKYWNraWUgQ2hhbicgfSxcbiAgeyBtc2c6ICdDaHVjayBOb3JyaXMnIH0sXG4gIHsgbXNnOiAnSmV0IExpJyB9LFxuICB7IG1zZzogJ0t1bmcgRnVyeScgfVxuXVxuXG5jb25zdCBxdWVyeSA9IHJlZignJylcblxuY29uc3QgY29tcHV0ZWRMaXN0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gbGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubXNnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudmFsdWUpKVxufSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICBlbC5zdHlsZS5oZWlnaHQgPSAwXG59XG5cbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgaGVpZ2h0OiAnMS42ZW0nLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIG9wYWNpdHk6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[전체 예제를 온라인 연습장에서 확인하세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IGxpc3QgPSBbXG4gIHsgbXNnOiAnQnJ1Y2UgTGVlJyB9LFxuICB7IG1zZzogJ0phY2tpZSBDaGFuJyB9LFxuICB7IG1zZzogJ0NodWNrIE5vcnJpcycgfSxcbiAgeyBtc2c6ICdKZXQgTGknIH0sXG4gIHsgbXNnOiAnS3VuZyBGdXJ5JyB9XG5dXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6ICcnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGNvbXB1dGVkTGlzdCgpIHtcbiAgICAgIHJldHVybiBsaXN0LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5tc2cudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnF1ZXJ5KSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkJlZm9yZUVudGVyKGVsKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMFxuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gMFxuICAgIH0sXG4gICAgb25FbnRlcihlbCwgZG9uZSkge1xuICAgICAgZ3NhcC50byhlbCwge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBoZWlnaHQ6ICcxLjZlbScsXG4gICAgICAgIGRlbGF5OiBlbC5kYXRhc2V0LmluZGV4ICogMC4xNSxcbiAgICAgICAgb25Db21wbGV0ZTogZG9uZVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9uTGVhdmUoZWwsIGRvbmUpIHtcbiAgICAgIGdzYXAudG8oZWwsIHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBkZWxheTogZWwuZGF0YXNldC5pbmRleCAqIDAuMTUsXG4gICAgICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgLz5cbiAgPFRyYW5zaXRpb25Hcm91cFxuICAgIHRhZz1cInVsXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgPlxuICAgIDxsaVxuICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNvbXB1dGVkTGlzdFwiXG4gICAgICA6a2V5PVwiaXRlbS5tc2dcIlxuICAgICAgOmRhdGEtaW5kZXg9XCJpbmRleFwiXG4gICAgPlxuICAgICAge3sgaXRlbS5tc2cgfX1cbiAgICA8L2xpPlxuICA8L1RyYW5zaXRpb25Hcm91cD5cbjwvdGVtcGxhdGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

---

**Related**

- [`<TransitionGroup>` API reference](/api/built-in-components.html#transitiongroup)
