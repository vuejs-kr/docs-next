<script setup>
import Basic from './transition-demos/Basic.vue'
import SlideFade from './transition-demos/SlideFade.vue'
import CssAnimation from './transition-demos/CssAnimation.vue'
import NestedTransitions from './transition-demos/NestedTransitions.vue'
import JsHooks from './transition-demos/JsHooks.vue'
import BetweenElements from './transition-demos/BetweenElements.vue'
import BetweenComponents from './transition-demos/BetweenComponents.vue'
</script>

# 트랜지션

Vue는 상태 변화에 대응하기 위해 트랜지션 및 애니메이션 작업에 도움이 되는 두 가지 빌트인 컴포넌트를 제공합니다:

- 엘리먼트 또는 컴포넌트가 DOM에 들어오고 나갈 때 애니메이션을 적용하기 위한 `<Transition>`. 이 페이지에서 다룹니다.

- 엘리먼트 또는 컴포넌트가 `v-for` 리스트에 삽입, 제거 또는 이동할 때 애니메이션을 적용하기 위한 `<TransitionGroup>`. 이것은 [다음 장](/guide/built-ins/transition-group.html)에서 다룹니다.

이 두 가지 컴포넌트 외에도 CSS 클래스 트랜지션 또는 스타일 바인딩을 통한 상태 기반 애니메이션과 같은 기술을 사용하여 Vue에서 애니메이션을 적용할 수도 있습니다.
이러한 추가 기술은 [애니메이션 기법](/guide/extras/animation.html) 장에서 다룹니다.

## `<Transition>` 컴포넌트

`<Transition>`은 빌트인 컴포넌트이므로 등록하지 않고도 컴포넌트의 템플릿에서 사용할 수 있습니다.
기본 슬롯을 통해 전달된 엘리먼트 또는 컴포넌트에 진입(enter) 및 진출(leave) 애니메이션을 적용하는 데 사용할 수 있습니다.
해당 애니메이션은 다음 중 하나의 조건에 충족하면 발생합니다:

- `v-if`를 통한 조건부 렌더링
- `v-show`를 통한 조건부 표시
- 스페셜 엘리먼트 `<component>`를 통해 전환되는 동적 컴포넌트

다음은 가장 기본적인 사용법 예제입니다:

```vue-html
<button @click="show = !show">토글</button>
<Transition>
  <p v-if="show">안녕</p>
</Transition>
```

```css
/* 이 클래스들이 무엇을 하는지 다음에 설명하겠습니다. */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

<Basic />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj7slYjrhZU8L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi52LWVudGVyLWFjdGl2ZSxcbi52LWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xufVxuXG4udi1lbnRlci1mcm9tLFxuLnYtbGVhdmUtdG8ge1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj7slYjrhZU8L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi52LWVudGVyLWFjdGl2ZSxcbi52LWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xufVxuXG4udi1lbnRlci1mcm9tLFxuLnYtbGVhdmUtdG8ge1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

:::tip
`<Transition>`은 슬롯 콘텐츠로 단일 엘리먼트 또는 컴포넌트만 지원합니다.
콘텐츠가 컴포넌트인 경우, 컴포넌트에는 단일 루트 엘리먼트만 있어야 합니다.
:::

`<Transition>` 컴포넌트 안에 엘리먼트가 삽입되거나 제거되면 다음과 같은 일이 일어납니다:

1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다.
   그리고 적절한 타이밍에 여러 [CSS 트랜지션 클레스](#트랜지션-클레스)가 추가/제거됩니다.

2. [JavaScript 훅](#javascript-훅)에 대한 리스너가 있는 경우, 이 훅은 적절한 타이밍에 호출됩니다.

3. CSS 트랜지션/애니메이션이 감지되지 않고 JavaScript 훅이 제공되지 않으면, DOM 삽입/제거 작업이 브라우저의 다음 애니메이션 프레임에서 실행됩니다.

## CSS 기반 트랜지션

### 트랜지션 클레스

진입/진출 트랜지션에 적용되는 6개의 클래스가 있습니다.

![Transition Diagram](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->
<!-- https://www.figma.com/file/N6zVa8Wiw0R8i3dGOeJySs/Transition-Classes-(ko-kr) -->

1. `v-enter-from`: 진입 시작 상태.
   엘리먼트가 삽입되기 전에 추가되고, 엘리먼트가 삽입되고 1 프레임 후 제거됩니다.

2. `v-enter-active`: 진입 활성 상태.
   모든 진입 상태에 적용됩니다.
   엘리먼트가 삽입되기 전에 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다.
   이 클래스는 진입 트랜지션에 대한 지속 시간, 딜레이 및 이징(easing) 곡선을 정의하는 데 사용할 수 있습니다.

3. `v-enter-to`: 진입 종료 상태.
   엘리먼트가 삽입된 후 1 프레임 후 추가되고(동시에 `v-enter-from`이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

4. `v-leave-from`: 진출 시작 상태.
   진출 트랜지션이 트리거되면 즉시 추가되고 1 프레임 후 제거됩니다.

5. `v-leave-active`: 진출 활성 상태.
   모든 진출 상태에 적용됩니다.
   진출 트랜지션이 트리거되면 즉시 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다.
   이 클래스는 진출 트랜지션에 대한 지속 시간, 딜레이 및 이징 곡선을 정의하는 데 사용할 수 있습니다.

6. `v-leave-to`: 진출 종료 상태.
   진출 트랜지션이 트리거된 후 1 프레임이 추가되고(동시에 `v-leave-from`이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

`v-enter-active` 및 `v-leave-active`는 진입/진출 트랜지션에 대해 다른 이징 곡선을 지정할 수 있는 기능을 제공합니다.
이에 대한 예는 다음 섹션에서 볼 수 있습니다.

### 트랜지션 이름 지정하기

트랜지션은 `name` prop을 통해 이름을 지정할 수 있습니다:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

이름이 지정된 트랜지션의 경우, 트랜지션 클래스에는 `v` 대신 이름이 접두사로 붙습니다.
예를 들어 위의 트랜지션에 적용된 클래스는 `v-enter-active` 대신 `fade-enter-active`가 됩니다.
페이드 트랜지션을 위한 CSS는 다음과 같아야 합니다:

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

### CSS 트랜지션

위의 기본 예제에서 볼 수 있듯이 일반적으로 `<Transition>`은 [네이티브 CSS 트랜지션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)과 함께 사용됩니다.
`transition` CSS 속성은 애니메이션을 적용해야 하는 속성, 트랜지션 기간 및 [이징 곡선](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)을 포함하여 트랜지션 관련된 여러 속성을 지정할 수 있게 해주는 약칭입니다.

다음은 다양한 진입/진출 트랜지션/애니메이션을 구현하기 위해 지속 시간 및 이징 곡선을 사용하는 고급 예제입니다:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">안녕</p>
</Transition>
```

```css
/*
  진입/진출 애니메이션은 다른 지속 시간과
  타이밍 함수를 사용할 수 있습니다.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

<SlideFade />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA6IOyKrOudvOydtOuTnCArIO2OmOydtOuTnDwvYnV0dG9uPlxuICA8VHJhbnNpdGlvbiBuYW1lPVwic2xpZGUtZmFkZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+7JWI64WVPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uc2xpZGUtZmFkZS1lbnRlci1hY3RpdmUge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbn1cblxuLnNsaWRlLWZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDEsIDAuNSwgMC44LCAxKTtcbn1cblxuLnNsaWRlLWZhZGUtZW50ZXItZnJvbSxcbi5zbGlkZS1mYWRlLWxlYXZlLXRvIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA6IOyKrOudvOydtOuTnCArIO2OmOydtOuTnDwvYnV0dG9uPlxuICA8VHJhbnNpdGlvbiBuYW1lPVwic2xpZGUtZmFkZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+7JWI64WVPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uc2xpZGUtZmFkZS1lbnRlci1hY3RpdmUge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbn1cblxuLnNsaWRlLWZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuOHMgY3ViaWMtYmV6aWVyKDEsIDAuNSwgMC44LCAxKTtcbn1cblxuLnNsaWRlLWZhZGUtZW50ZXItZnJvbSxcbi5zbGlkZS1mYWRlLWxlYXZlLXRvIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwcHgpO1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### CSS 애니메이션

[네이티브 CSS 애니메이션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)은 CSS 트랜지션과 동일한 방식으로 적용되지만,
엘리먼트가 삽입된 직후에 `*-enter-from`이 제거되지 않고, `animationend` 이벤트에서 제거된다는 차이점이 있습니다.

대부분의 CSS 애니메이션의 경우 `*-enter-active` 및 `*-leave-active` 클래스에서 간단히 선언할 수 있습니다.
다음은 예제입니다:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    안녕! 여기에 탄력적인 텍스트가 있어요!
  </p>
</Transition>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

<CssAnimation />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICDslYjrhZUhIOyXrOq4sOyXkCDtg4TroKXsoIHsnbgg7YWN7Iqk7Yq46rCAIOyeiOyWtOyalCFcbiAgICA8L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5ib3VuY2UtZW50ZXItYWN0aXZlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2UtaW4gMC41cztcbn1cbi5ib3VuY2UtbGVhdmUtYWN0aXZlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2UtaW4gMC41cyByZXZlcnNlO1xufVxuQGtleWZyYW1lcyBib3VuY2UtaW4ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yNSk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICDslYjrhZUhIOyXrOq4sOyXkCDtg4TroKXsoIHsnbgg7YWN7Iqk7Yq46rCAIOyeiOyWtOyalCFcbiAgICA8L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5ib3VuY2UtZW50ZXItYWN0aXZlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2UtaW4gMC41cztcbn1cbi5ib3VuY2UtbGVhdmUtYWN0aXZlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2UtaW4gMC41cyByZXZlcnNlO1xufVxuQGtleWZyYW1lcyBib3VuY2UtaW4ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yNSk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### 커스텀 트랜지션 클래스

아래 나열된 `<Transition>` props에 커스텀 트랜지션 클래스를 정의하여 전달할 수도 있습니다:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

이들은 기존의 클래스 이름을 재정의합니다.
이는 Vue의 트랜지션 시스템을 [Animate.css](https://daneden.github.io/animate.css/)와 같은 기존 CSS 애니메이션 라이브러리와 결합하려는 경우에 특히 유용합니다.

```vue-html
<!-- Animate.css가 페이지에 포함되어 있다고 가정합니다. -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">안녕</p>
</Transition>
```

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+7JWI64WVPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5AaW1wb3J0IFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYW5pbWF0ZS5jc3MvNC4xLjEvYW5pbWF0ZS5taW4uY3NzXCI7XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+7JWI64WVPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG5AaW1wb3J0IFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYW5pbWF0ZS5jc3MvNC4xLjEvYW5pbWF0ZS5taW4uY3NzXCI7XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

### 트랜지션과 애니메이션을 같이 사용하기

Vue는 트랜지션이 종료된 시점을 알기 위해 이벤트 리스너를 연결해야 합니다.
리스너는 적용된 CSS 규칙 유형에 따라 `transitionend` 또는 `animationend`가 될 수 있습니다.
둘 중 하나만 사용하는 경우, Vue는 올바른 유형을 자동으로 감지할 수 있습니다.

그러나 경우에 따라 하나의 엘리먼트에 Vue에 의해 트리거된 CSS 애니메이션과 hover에 대한 CSS 트랜지션 효과가 같이 있을 수 있습니다.
이러한 경우에는 `type` prop을 사용하여 `animation` 또는 `transition` 값을 전달하여 Vue에서 처리할 유형을 명시적으로 선언해야 합니다:

```vue-html
<Transition type="animation">...</Transition>
```

### 중첩된 트랜지션과 지속시간 설정하기

트랜지션 클래스는 `<Transition>`의 직접적인 자식 엘리먼트에만 적용되지만,
중첩된 CSS 선택기를 사용하여 중첩된 엘리먼트를 트랜지션할 수 있습니다:

```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      안녕
    </div>
  </div>
</Transition>
```

```css
/* 중첩 엘리먼트를 대상으로 하는 규칙 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
```

진입 시 중첩된 엘리먼트에 트랜지션 딜레이를 추가하여, 시차가 있는 진입 애니메이션 순서를 생성할 수도 있습니다:

```css{3}
/* 시차를 둔 중첩 엘리먼트의 딜레이된 진입 효과 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```

그러나 이것은 작은 문제를 만듭니다.
기본적으로 `<Transition>` 컴포넌트는 루트 트랜지션 엘리먼트에서 첫 번째 `transitionend` 또는 `animationend` 이벤트를 수신하여 트랜지션이 완료된 시점을 자동으로 파악하려고 시도합니다.
중첩 트랜지션을 사용하면 모든 내부 엘리먼트의 트랜지션이 완료될 때까지 원하는 동작이 대기해야 합니다.

이러한 경우 `<transition>` 컴포넌트의 `duration` prop을 사용하여 명시적 트랜지션 지속 시간(밀리초 단위)을 지정할 수 있습니다.
총 지속 시간은 딜레이에 내부 엘리먼트의 트랜지션 지속 시간을 더한 값과 일치해야 합니다:

```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gZHVyYXRpb249XCI1NTBcIiBuYW1lPVwibmVzdGVkXCI+XG4gICAgPGRpdiB2LWlmPVwic2hvd1wiIGNsYXNzPVwib3V0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgXHRcdFx07JWI64WVXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLm91dGVyLCAuaW5uZXIge1xuXHRiYWNrZ3JvdW5kOiAjZWVlO1xuICBwYWRkaW5nOiAzMHB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbn1cbiAgXG4uaW5uZXIgeyBcbiAgYmFja2dyb3VuZDogI2NjYztcbn1cbiAgXG4ubmVzdGVkLWVudGVyLWFjdGl2ZSwgLm5lc3RlZC1sZWF2ZS1hY3RpdmUge1xuXHR0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbn1cbi8qIOu2gOuqqCDsl5jrpqzrqLztirjsnZgg7KeA7Jew65CcIOynhOy2nCAqL1xuLm5lc3RlZC1sZWF2ZS1hY3RpdmUge1xuICB0cmFuc2l0aW9uLWRlbGF5OiAwLjI1cztcbn1cblxuLm5lc3RlZC1lbnRlci1mcm9tLFxuLm5lc3RlZC1sZWF2ZS10byB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMHB4KTtcbiAgb3BhY2l0eTogMDtcbn1cblxuLyog7KSR7LKpIOyFgOugie2EsOulvCDsgqzsmqntlZjsl6wg7KSR7LKpKOyekOyLnSkg7JeY66as66i87Yq466W8IO2KuOuenOyngOyFmO2VoCDsiJjrj4Qg7J6I7Iq164uI64ukLiAqL1xuLm5lc3RlZC1lbnRlci1hY3RpdmUgLmlubmVyLFxuLm5lc3RlZC1sZWF2ZS1hY3RpdmUgLmlubmVyIHsgXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xufVxuLyog7KSR7LKp65CcKOyekOyLnSkg7JeY66as66i87Yq47J2YIOyngOyXsOuQnCDsp4TsnoUgKi9cbi5uZXN0ZWQtZW50ZXItYWN0aXZlIC5pbm5lciB7XG5cdHRyYW5zaXRpb24tZGVsYXk6IDAuMjVzO1xufVxuXG4ubmVzdGVkLWVudGVyLWZyb20gLmlubmVyLFxuLm5lc3RlZC1sZWF2ZS10byAuaW5uZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gIC8qXG4gICAg7KSR7LKp65CcIOu2iO2IrOuqheuPhCDtirjrnpzsp4DshZjsnYQg7LKY66as7ZWgIOuVjCBDaHJvbWUgOTYg67KE6re4IO2VtOqysCDtlbUuXG4gICAg67KE6re46rCAIOyImOygleuQnCDri6Trpbgg67iM65287Jqw7KCA64KYIENocm9tZSA5OSvsl5DshJzripQg7ZWE7JqU7ZWY7KeAIOyViuyKteuLiOuLpC5cbiAgKi9cbiAgb3BhY2l0eTogMC4wMDE7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

필요한 경우 객체를 사용하여 진입/출 지속 시간에 대해 별도의 값을 지정할 수도 있습니다:

```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### 성능 고려사항

위에 표시된 애니메이션은 대부분 `transform` 및 `opacity`와 같은 속성을 사용하고 있음을 알 수 있습니다.
이러한 속성은 다음과 같은 이유로 애니메이션에 효율적입니다:

1. 애니메이션 진행중에 문서 레이아웃에 영향을 미치지 않으므로 모든 애니메이션 프레임에서 값비싼 CSS 레이아웃 계산을 트리거하지 않습니다.

2. 대부분의 최신 브라우저는 `transform`에 애니메이션을 적용할 때 GPU 하드웨어 가속을 활용할 수 있습니다.

이에 비해 `height` 또는 `margin`과 같은 속성은 CSS 레이아웃을 트리거하므로 애니메이션을 적용하는 데 훨씬 더 많은 비용이 소요되므로 주의해서 사용해야 합니다.
[CSS-Triggers](https://csstriggers.com/)와 같은 리소스를 확인하여 애니메이션을 적용하면 레이아웃을 트리거하는 속성을 확인할 수 있습니다.

## JavaScript 훅

`<Transition>` 컴포넌트의 이벤트를 수신하여 JavaScript로 트랜지션 프로세스에 연결할 수 있습니다:

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

<div class="composition-api">

```js
// 엘리먼트가 DOM에 삽입되기 전에 호출됩니다.
// 이것을 사용하여 엘리먼트의 "enter-from" 상태를 설정합니다.
function onBeforeEnter(el) {}

// 엘리먼트가 삽입되고 1 프레임 후 호출됩니다.
// 진입 애니메이션을 시작하는 데 사용합니다.
function onEnter(el, done) {
  // CSS와 함께 사용되는 경우, 선택적으로 
  // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
  done()
}

// 진입 트랜지션이 완료되면 호출됩니다.
function onAfterEnter(el) {}
function onEnterCancelled(el) {}

// 진출 훅 전에 호출됩니다.
// 대부분의 경우 그냥 진출 훅을 사용해야 합니다.
function onBeforeLeave(el) {}

// 진출 트랜지션이 시작될 때 호출됩니다.
// 진출 애니메이션을 시작하는 데 사용합니다.
function onLeave(el, done) {
  // CSS와 함께 사용되는 경우, 선택적으로 
  // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
  done()
}

// 진출 트랜지션이 완료되고,
// 엘리먼트가 DOM에서 제거된 후 호출됩니다.
function onAfterLeave(el) {}

// v-show 트랜지션에서만 사용 가능합니다.
function leaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // 엘리먼트가 DOM에 삽입되기 전에 호출됩니다.
    // 이것을 사용하여 엘리먼트의 "enter-from" 상태를 설정합니다.
    onBeforeEnter(el) {},

    // 엘리먼트가 삽입되고 1 프레임 후 호출됩니다.
    // 진입 애니메이션을 시작하는 데 사용합니다.
    onEnter(el, done) {
      // CSS와 함께 사용되는 경우, 선택적으로 
      // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
      done()
    },

    // 진입 트랜지션이 완료되면 호출됩니다.
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // 진출 훅 전에 호출됩니다.
    // 대부분의 경우 그냥 진출 훅을 사용해야 합니다.
    onBeforeLeave(el) {},

    // 진출 트랜지션이 시작될 때 호출됩니다.
    // 진출 애니메이션을 시작하는 데 사용합니다.
    onLeave(el, done) {
      // CSS와 함께 사용되는 경우, 선택적으로 
      // 트랜지션 종료를 나타내기 위해 done 콜백을 호출합니다.
      done()
    },

    // 진출 트랜지션이 완료되고,
    // 엘리먼트가 DOM에서 제거된 후 호출됩니다.
    onAfterLeave(el) {},

    // v-show 트랜지션에서만 사용 가능합니다.
    leaveCancelled(el) {}
  }
}
```

</div>

이 훅은 CSS 트랜지션/애니메이션과 함께 사용하거나 단독으로 사용할 수 있습니다.

JavaScript 전용 트랜지션을 사용할 때 일반적으로 `:css="false"` prop을 추가하는 것이 좋습니다.
이것은 Vue가 CSS 트랜지션을 자동으로 감지하는 것을 건너뛰도록 명시적으로 지시합니다.
성능이 약간 향상되는 것 외에도 CSS 규칙이 실수로 트랜지션을 방해하는 것을 방지합니다.

```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```

`:css="false"`를 사용하면 트랜지션이 끝나는 시점 제어에 대한 전적인 책임을 가집니다.
이 경우 `@enter` 및 `@leave` 훅에 `done` 콜백이 필요합니다.
그렇지 않으면 훅이 동기적으로 호출되고 트랜지션이 즉시 완료됩니다.

다음은 [GreenSock 라이브러리](https://greensock.com/)를 사용하여 애니메이션을 수행하는 데모입니다.
물론 [Anime.js](https://animejs.com/) 또는 [Motion One](https://motion.dev/)과 같이 원하는 다른 애니메이션 라이브러리를 사용할 수 있습니다.

<JsHooks />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IHNob3cgPSByZWYodHJ1ZSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBnc2FwLnNldChlbCwge1xuICAgIHNjYWxlWDogMC4yNSxcbiAgICBzY2FsZVk6IDAuMjUsXG4gICAgb3BhY2l0eTogMVxuICB9KVxufVxuICBcbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAxLFxuICAgIHNjYWxlWDogMSxcbiAgICBzY2FsZVk6IDEsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJyxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcblx0Z3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICB4OiAzMDAsXG4gICAgZWFzZTogJ2VsYXN0aWMuaW5PdXQoMi41LCAxKSdcbiAgfSlcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjIsXG4gICAgZGVsYXk6IDAuNSxcbiAgICBvcGFjaXR5OiAwLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwic2hvdyA9ICFzaG93XCI+7Yag6riAPC9idXR0b24+XG5cbiAgPFRyYW5zaXRpb25cbiAgICBAYmVmb3JlLWVudGVyPVwib25CZWZvcmVFbnRlclwiXG4gICAgQGVudGVyPVwib25FbnRlclwiXG4gICAgQGxlYXZlPVwib25MZWF2ZVwiXG4gICAgOmNzcz1cImZhbHNlXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJnc2FwLWJveFwiIHYtaWY9XCJzaG93XCI+PC9kaXY+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5nc2FwLWJveCB7XG4gIGJhY2tncm91bmQ6ICM0MmI4ODM7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiB0cnVlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG5cdFx0b25CZWZvcmVFbnRlcixcbiAgICBvbkVudGVyLFxuICAgIG9uTGVhdmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkJlZm9yZUVudGVyKGVsKSB7XG4gIGdzYXAuc2V0KGVsLCB7XG4gICAgc2NhbGVYOiAwLjI1LFxuICAgIHNjYWxlWTogMC4yNSxcbiAgICBvcGFjaXR5OiAxXG4gIH0pXG59XG4gIFxuZnVuY3Rpb24gb25FbnRlcihlbCwgZG9uZSkge1xuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDEsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2U6ICdlbGFzdGljLmluT3V0KDIuNSwgMSknLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cblxuZnVuY3Rpb24gb25MZWF2ZShlbCwgZG9uZSkge1xuXHRnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuNyxcbiAgICBzY2FsZVg6IDEsXG4gICAgc2NhbGVZOiAxLFxuICAgIHg6IDMwMCxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJ1xuICB9KVxuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuMixcbiAgICBkZWxheTogMC41LFxuICAgIG9wYWNpdHk6IDAsXG4gICAgb25Db21wbGV0ZTogZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj7thqDquIA8L2J1dHRvbj5cblxuICA8VHJhbnNpdGlvblxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cImdzYXAtYm94XCIgdi1pZj1cInNob3dcIj48L2Rpdj5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmdzYXAtYm94IHtcbiAgYmFja2dyb3VuZDogIzQyYjg4MztcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcImdzYXBcIjogXCJodHRwczovL3VucGtnLmNvbS9nc2FwP21vZHVsZVwiLFxuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## 재사용 가능한 트랜지션

Vue의 컴포넌트 시스템을 통해 트랜지션을 재사용할 수 있습니다.
재사용 가능한 트랜지션을 만들기 위해 `<Transition>` 컴포넌트를 래핑하고 슬롯 콘텐츠를 전달하는 컴포넌트를 만들 수 있습니다:

```vue{5}
<!-- MyTransition.vue -->
<script>
// JavaScript 훅 로직...
</script>

<template>
  <!-- 빌트인 트랜지션 컴포넌트 래핑 -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- 슬롯 컨텐츠 전달 -->
  </Transition>
</template>

<style>
/*
  필요한 CSS 정의...
  참고: 슬롯 콘텐츠에 적용되지 않으므로,
  여기에서 <style scoped>를 사용하지 마십시오.
*/
</style>
```

이제 빌트인 버전처럼 `MyTransition`을 가져와서 사용할 수 있습니다:

```vue-html
<MyTransition>
  <div v-if="show">안녕</div>
</MyTransition>
```

## 등장 트랜지션

노드의 초기 렌더링에도 트랜지션을 적용하려면 `appear` 속성을 추가할 수 있습니다:

```vue-html
<Transition appear>
  ...
</Transition>
```

## 엘리먼트 간 트랜지션

`v-if`/`v-show`로 엘리먼트를 전환하는 것 외에도 `v-if`/`v-else`/`v-else-if`를 사용하여 두 엘리먼트 사이를 전환할 수도 있습니다.

```vue-html
<Transition>
  <button v-if="docState === 'saved'">수정</button>
  <button v-else-if="docState === 'edited'">저장</button>
  <button v-else-if="docState === 'editing'">취소</button>
</Transition>
```

<BetweenElements />

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgZG9jU3RhdGUgPSByZWYoJ3NhdmVkJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAyMHB4XCI+7YG066atIOyLnCDsg4Htg5wg67OA6rK9Ojwvc3Bhbj5cbiAgPGRpdiBjbGFzcz1cImJ0bi1jb250YWluZXJcIj5cblx0XHQ8VHJhbnNpdGlvbiBuYW1lPVwic2xpZGUtdXBcIj5cbiAgICAgIDxidXR0b24gdi1pZj1cImRvY1N0YXRlID09PSAnc2F2ZWQnXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiZG9jU3RhdGUgPSAnZWRpdGVkJ1wiPuyImOyglTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB2LWVsc2UtaWY9XCJkb2NTdGF0ZSA9PT0gJ2VkaXRlZCdcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJkb2NTdGF0ZSA9ICdlZGl0aW5nJ1wiPuyggOyepTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB2LWVsc2UtaWY9XCJkb2NTdGF0ZSA9PT0gJ2VkaXRpbmcnXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiZG9jU3RhdGUgPSAnc2F2ZWQnXCI+7Leo7IaMPC9idXR0b24+XG4gICAgPC9UcmFuc2l0aW9uPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5idG4tY29udGFpbmVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMWVtO1xufVxuXG5idXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdoaXRlLXNwYWNlOiBwcmU7XG59XG5cbi5zbGlkZS11cC1lbnRlci1hY3RpdmUsXG4uc2xpZGUtdXAtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2Utb3V0O1xufVxuXG4uc2xpZGUtdXAtZW50ZXItZnJvbSB7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMHB4KTtcbn1cblxuLnNsaWRlLXVwLWxlYXZlLXRvIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

## 트랜지션 모드

이전 예제에서 진입 시 엘리먼트와 진출 시 엘리먼트는 동시에 애니메이션되며 두 엘리먼트가 DOM에 있을 때 레이아웃 문제를 피하기 위해 `position: absolute`로 만들어야 했습니다.

그러나 어떤 경우에는 이것이 선택가능한 옵션이 아니거나, 원하는 동작이 아닐수 있습니다.
진출 시 엘리먼트가 먼저 애니메이션 처리되고 진입 시 엘리먼트가 **진출 애니메이션이 완료된 이후에 삽입**되기를 원할 수 있습니다.
이러한 애니메이션을 수동으로 조정하는 것은 매우 복잡합니다.
운 좋게도 `<Transition>`에 `mode` prop을 전달하여 이 동작을 활성화할 수 있습니다.

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```

다음은 `mode="out-in"`을 사용한 이전 데모입니다:

<BetweenElements mode="out-in" />

`<Transition>`은 자주 사용되지는 않지만 `mode="in-out"`도 지원합니다.

## 컴포넌트 간 트랜지션

`<Transition>`은 [동적 컴포넌트](/guide/essentials/component-basics.html#동적-컴포넌트)에서도 사용할 수 있습니다:

```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbi8vIHVzZSBzaGFsbG93UmVmIHRvIGF2b2lkIGNvbXBvbmVudCBiZWluZyBkZWVwbHkgb2JzZXJ2ZWRcbmNvbnN0IGFjdGl2ZUNvbXBvbmVudCA9IHNoYWxsb3dSZWYoQ29tcEEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiA6dmFsdWU9XCJDb21wQVwiPiBBXG4gIDwvbGFiZWw+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIDp2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ29tcEEudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIEEg7Lu07Y+s64SM7Yq4XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJDb21wQi52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQiDsu7Ttj6zrhIztirhcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENvbXBBLCBDb21wQiB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmVDb21wb25lbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIHZhbHVlPVwiQ29tcEFcIj4gQVxuICA8L2xhYmVsPlxuICA8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiB2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiLFxuICAgIFwidnVlL3NlcnZlci1yZW5kZXJlclwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy9zZXJ2ZXItcmVuZGVyZXIuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwiQ29tcEEudnVlIjoiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIEEg7Lu07Y+s64SM7Yq4XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT4iLCJDb21wQi52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQiDsu7Ttj6zrhIztirhcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiJ9)

</div>

## 동적 트랜지션

`<Transition>` `name`과 같은 prop도 동적일 수 있습니다!
이를 통해 상태 변경에 따라 다른 트랜지션을 동적으로 적용할 수 있습니다:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

이것은 Vue의 트랜지션 클래스 규칙을 사용하여 CSS 트랜지션/애니메이션을 정의하고 둘 사이를 트랜지션하려는 경우에 유용할 수 있습니다.

컴포넌트의 현재 상태를 기반으로 JavaScript 트랜지션 훅에서 다른 동작을 적용할 수도 있습니다.
마지막으로, 동적 트랜지션을 만드는 궁극적인 방법은 사용할 트랜지션의 특성을 변경하기 위해 prop을 허용하는 [재사용 가능한 트랜지션 컴포넌트](#재사용-가능한-트랜지션)를 사용하는 것입니다.
진부하게 들릴지 모르지만, 실제로 한계는 당신의 상상력뿐입니다.

---

**관련 문서**

- [`<Transition>` API 참고](/api/built-in-components.html#transition)
