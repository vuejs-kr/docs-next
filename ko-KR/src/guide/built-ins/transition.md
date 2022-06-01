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

Vue는 상태 변화에 대한 대응하기 위한 트랜지션 및 애니메이션 작업에 도움이 되는 두 가지 빌트인 컴포넌트를 제공합니다:


- DOM에 엘리먼트 또는 컴포넌트가 들어오고 나갈 때 애니메이션을 적용하기 위한 `<Transition>`. 이 페이지에서 다룹니다.

-  `v-for` 리스트에 엘리먼트 또는 컴포넌트를 삽입, 제거 또는 이동할 때 애니메이션을 적용하기 위한 `<TransitionGroup>`. 이 컴포넌트는 [다음 장](/guide/built-ins/transition-group.html)에서 다룹니다.


Aside from these two components, we can also apply animations in Vue using other techniques such as toggling CSS classes or state-driven animations via style bindings. These additional techniques are covered in the [Animation Techniques](/guide/extras/animation.html) chapter.

이 두 가지 컴포넌트 외에도 CSS 클래스 트랜지션 또는 스타일 바인딩을 통한 상태 기반(State-driven) 애니메이션과 같은 다른 기술을 사용하여 Vue에 애니메이션을 적용할 수도 있습니다. 이러한 추가적인 기법은  [애니메이션 기법](/guide/extras/animation.html) 장에서 다룹니다.


## `<Transition>` 컴포넌트

`<Transition>`은 빌트인 컴포넌트입니다. 별도로 등록하지 않고도 컴포넌트의 템플릿에서 사용할 수 있습니다. 기본 슬롯을 통해 전달된 엘리먼트 또는 컴포넌트에 진입(enter) 및 진출(leave) 애니메이션을 적용할수 있습니다. 진입 또는 진출은 다음 중 하나에 의해 트리거될 수 있습니다:

- `v-if` 를 통한 조건부 렌더링 
- `v-show`를 통한 조건부 표시
- `<component>` 특수 엘리먼트를 통한 동적 컴포넌트 전환

다음은 기본 사용 예입니다:

```vue-html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
/* 이 클래스는 다음에 설명하겠습니다 */
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

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnYtZW50ZXItYWN0aXZlLFxuLnYtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi52LWVudGVyLWZyb20sXG4udi1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnYtZW50ZXItYWN0aXZlLFxuLnYtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi52LWVudGVyLWZyb20sXG4udi1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

:::tip
`<Transition>`은 슬롯의 컨텐츠로 단일 엘리먼트 또는 컴포넌트만 지원합니다. 콘텐츠가 컴포넌트인 경우 컴포넌트에는 단일 루트 엘리먼트만 있어야 합니다.
:::

`<Transition>` 컴포넌트안에 엘리먼트가 삽입되거나 제거되면 다음과 같이 됩니다:

1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다. 그렇다면 적절한 타이밍에 여러 [CSS transition classes](#transition-classes)가 추가/제거됩니다.


2. [JavaScript hooks](#javascript-hooks)에 대한 리스너가 있는 경우, 후크들은 적절한 타이밍에 호출됩니다.


3. CSS 트랜지션/애니메이션이 감지되지 않고 JavaScript 후크가 제공되지 않으면 삽입 및/또는 제거를 위한 DOM 작업이 브라우저의 다음 애니메이션 프레임에서 실행됩니다.
## CSS 기반 트랜지션

### 트랜지션 클래스


진입/진출 트랜지션시에 적용되는 6개의 클래스가 있습니다.


![트랜지현 도표](./images/transition-classes.png)

<!-- https://www.figma.com/file/rlOv0ZKJFFNA9hYmzdZv3S/Transition-Classes -->

1. `v-enter-from`: 진입 시작 상태입니다. 엘리먼트가 삽입되기 전에 추가되고 엘리먼트가 삽입된 후, 1 프레임이 경과하면 제거됩니다.


2. `v-enter-active`: 진입 활성 상태입니다. 전체 진입 단계 동안 적용됩니다. 엘리먼트가 삽입되기 전에 추가되고 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에 대한 지속 시간, 지연 및 완화 곡선을 정의하는 데 사용할 수 있습니다.


3. `v-enter-to`: 진입 종료 상태입니다. 엘리먼트가 삽입된 후, 1 프레임이 경과한 다음에 클래스가 추가되고, (동시에 `v-enter-from`이 제거됨) 트랜지션/애니메이션이 완료되면 제거됩니다.


4.  `v-leave-from`: 진출 시작 상태입니다. 진출 트랜지션이 트리거되면 즉시 추가되고, 1  프레임 경과 한 다음에 제거됩니다.


5. `v-leave-active`: 진출 활성 상태입니다. 전체 진출 단계 동안 적용됩니다. 진출 트랜지션이 트리거되면 즉시 추가되고 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에 대한 지속 시간, 지연 및 완화 곡선을 정의하는 데 사용할 수 있습니다.




6. `v-leave-to`: 진출 종료 상태입니다. 이탈 트랜지션이 트리거된 후, 1 프레임이 경과한 다음 클래스가 추가되고 (동시에 `v-leave-from`이 제거됨) 트랜지션/애니메이션이 완료되면 제거됩니다.


`v-enter-active` 및 `v-leave-active`는 진입/진출 트랜지션에 대해 다른 이징(easing) 곡선을 지정할 수 있는 기능을 제공합니다. 이에 대한 예는 다음 섹션에서 볼 수 있습니다.


### 명명된 트랜지션

트랜지션은 `name` prop을 통해 이름을 지정할 수 있습니다:

```vue-html
<Transition name="fade">
  ...
</Transition>
```

For a named transition, its transition classes will be prefixed with its name instead of `v`. For example, the applied class for the above transition will be `fade-enter-active` instead of `v-enter-active`. The CSS for the fade transition should look like this:

명명된 트랜지션의 경우 트랜지션 클래스에는 `v` 대신 이름이 접두사로 붙습니다. 예를 들어 위의 트랜지션에 적용된 클래스는 `v-enter-active` 대신 `fade-enter-active`가 됩니다. 페이드 트랜지션을 위한 CSS는 다음과 같아야 합니다:


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

`<Transition>` is most commonly used in combination with [native CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), as seen in the basic example above. The `transition` CSS property is a shorthand that allows us to specify multiple aspects of a transition, including properties that should be animated, duration of the transition, and [easing curves](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

위의 기본 예에서 볼 수 있듯이  일반적으로 `<Transition>`은 [네이티브 CSS 트랜지션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)과 함께 사용됩니다. `transition` CSS 속성은 애니메이션을 적용해야 하는 속성, 트랜지션 기간 및  [이징 곡선](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) 을 지정 할 수 있게 합니다. 



다음은 진입 및 진출을 위한 다양한 지속 시간 및 완화 곡선을 사용하여 여러 속성을 트랜지션하는 고급 예입니다:

```vue-html
<Transition name="slide-fade">
  <p v-if="show">hello</p>
</Transition>
```

```css
/*  
  진입 진출 애니메이션이 서로 다른 트랜지션 기간과 타이밍 함수를 사용합니다.
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

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGUgU2xpZGUgKyBGYWRlPC9idXR0b24+XG4gIDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS1mYWRlXCI+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnNsaWRlLWZhZGUtZW50ZXItYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG59XG5cbi5zbGlkZS1mYWRlLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigxLCAwLjUsIDAuOCwgMSk7XG59XG5cbi5zbGlkZS1mYWRlLWVudGVyLWZyb20sXG4uc2xpZGUtZmFkZS1sZWF2ZS10byB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGUgU2xpZGUgKyBGYWRlPC9idXR0b24+XG4gIDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS1mYWRlXCI+XG4gICAgPHAgdi1pZj1cInNob3dcIj5oZWxsbzwvcD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLnNsaWRlLWZhZGUtZW50ZXItYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG59XG5cbi5zbGlkZS1mYWRlLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjhzIGN1YmljLWJlemllcigxLCAwLjUsIDAuOCwgMSk7XG59XG5cbi5zbGlkZS1mYWRlLWVudGVyLWZyb20sXG4uc2xpZGUtZmFkZS1sZWF2ZS10byB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMHB4KTtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### CSS 애니메이션

[Native CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) are applied in the same way as CSS transitions, with the difference being that `*-enter-from` is not removed immediately after the element is inserted, but on an `animationend` event.

[네이티브 CSS 애니메이션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)은 CSS 트랜지션과 동일한 방식으로 적용되지만 `*-enter- from`은 엘리먼트가 삽입된 직후가 아니라 `animationend` 이벤트에서 제거됩니다.


For most CSS animations, we can simply declare them under the `*-enter-active` and `*-leave-active` classes. Here's an example:

대부분의 CSS 애니메이션은  `*-enter-active` 및 `*-leave-active` 클래스를 이용하여 간단히 선언할 수 있습니다. 다음은 예입니다:

```vue-html
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
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

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICBIZWxsbyBoZXJlIGlzIHNvbWUgYm91bmN5IHRleHQhXG4gICAgPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYm91bmNlLWVudGVyLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXM7XG59XG4uYm91bmNlLWxlYXZlLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXMgcmV2ZXJzZTtcbn1cbkBrZXlmcmFtZXMgYm91bmNlLWluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImJvdW5jZVwiPlxuICAgIDxwIHYtaWY9XCJzaG93XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgICBIZWxsbyBoZXJlIGlzIHNvbWUgYm91bmN5IHRleHQhXG4gICAgPC9wPlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYm91bmNlLWVudGVyLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXM7XG59XG4uYm91bmNlLWxlYXZlLWFjdGl2ZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlLWluIDAuNXMgcmV2ZXJzZTtcbn1cbkBrZXlmcmFtZXMgYm91bmNlLWluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMjUpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>


### 커스텀 트랜지션 클래스

You can also specify custom transition classes by passing the following props to `<Transition>`:

`<Transition>`에 다음 Props를 전달하여 사용자 지정 트랜지션 클래스를 지정할 수도 있습니다:


- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`


이들은 기존의 클래스 이름을 재정의합니다. 이는 Vue의 트랜지션 시스템을 [Animate.css](https://daneden.github.io/animate.css/)와 같은 기존 CSS 애니메이션 라이브러리와 결합하려는 경우에 특히 유용합니다:


```vue-html
<!-- assuming Animate.css is included on the page -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

<div class="composition-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+aGVsbG88L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbkBpbXBvcnQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9hbmltYXRlLmNzcy80LjEuMS9hbmltYXRlLm1pbi5jc3NcIjtcbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogdHJ1ZVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb25cbiAgICBuYW1lPVwiY3VzdG9tLWNsYXNzZXNcIlxuICAgIGVudGVyLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX3RhZGFcIlxuICAgIGxlYXZlLWFjdGl2ZS1jbGFzcz1cImFuaW1hdGVfX2FuaW1hdGVkIGFuaW1hdGVfX2JvdW5jZU91dFJpZ2h0XCJcbiAgPlxuICAgIDxwIHYtaWY9XCJzaG93XCI+aGVsbG88L3A+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbkBpbXBvcnQgXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9hbmltYXRlLmNzcy80LjEuMS9hbmltYXRlLm1pbi5jc3NcIjtcbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

### 트랜지션과 애니메이션을 같이 사용하기


Vue는 트랜지션이 종료된 시점을 알기 위해 이벤트 리스너를 연결해야 합니다. 적용된 CSS 규칙 유형에 따라 `transitionend` 또는 `animationend`가 될 수 있습니다. 둘 중 하나만 사용하는 경우 Vue는 올바른 유형을 자동으로 감지할 수 있습니다.


However, in some cases you may want to have both on the same element, for example having a CSS animation triggered by Vue, along with a CSS transition effect on hover. In these cases, you will have to explicitly declare the type you want Vue to care about by passing the `type` prop, with a value of either `animation` or `transition`:

그러나 경우에 따라 마우스 호버 CSS 트랜지션 효과를 가지고 있지만, Vue에 의해 CSS 애니메이션이 트리거 되는 경우처럼 하나의 앨리먼트에 두가지 이벤트가 동시에 발생할수도 있습니다. . 이러한 경우에는 `type` prop에 `animation` 또는 `transition` 를 명시적으로 지정해서 어떤 이벤트를 트랜지션 종료 시점으로 사용할지 선언해야 합니다. 

```vue-html
<Transition type="animation">...</Transition>
```

### 중첩된 트랜지션과 트랜지션 지속시간 명시하기


트랜지션 클래스는 `<Transition>`의 직계 자식 엘리먼트에만 적용되지만 중첩된 CSS 선택기를 사용하여 중첩된 엘리먼트를 트랜지션할 수 있습니다:


```vue-html
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>
```

```css
/* rules that target nested elements */
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

진입 시 중첩된 엘리먼트에 트랜지션 지연을 추가하여 엇갈린 진입 애니메이션 시퀀스를 생성할 수도 있습니다:

```css{3}
/* delay enter of nested element for staggered effect */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
```


그러나 이것은 작은 문제를 만듭니다. 기본적으로 `<Transition>` 컴포넌트는 루트 트랜지션 엘리먼트에서 발생하는 **첫번째** `transitionend` 또는 `animationend` 이벤트를 수신하여 트랜지션이 완료되는 시점을 자동으로 파악하려고 시도합니다. 중첩 트랜지션을 사용하면 모든 내부 엘리먼트의 트랜지션이 완료될 때까지 원하는 동작이 대기해야 합니다.



이러한 경우 `<transition>` 컴포넌트에 `duration` props에 값을 주어 명시적인 트랜지션 기간(밀리초 단위)을 지정할 수 있습니다. 총 지속 시간은 지연에 내부 엘리먼트의 트랜지션 지속 시간을 더한 값과 일치해야 합니다:


```vue-html
<Transition :duration="550">...</Transition>
```

<NestedTransitions />

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hvdyA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cbiAgPFRyYW5zaXRpb24gZHVyYXRpb249XCI1NTBcIiBuYW1lPVwibmVzdGVkXCI+XG4gICAgPGRpdiB2LWlmPVwic2hvd1wiIGNsYXNzPVwib3V0ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lclwiPlxuICAgXHRcdFx0SGVsbG9cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L1RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4ub3V0ZXIsIC5pbm5lciB7XG5cdGJhY2tncm91bmQ6ICNlZWU7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xufVxuICBcbi5pbm5lciB7IFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xufVxuICBcbi5uZXN0ZWQtZW50ZXItYWN0aXZlLCAubmVzdGVkLWxlYXZlLWFjdGl2ZSB7XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xufVxuLyogZGVsYXkgbGVhdmUgb2YgcGFyZW50IGVsZW1lbnQgKi9cbi5uZXN0ZWQtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbi1kZWxheTogMC4yNXM7XG59XG5cbi5uZXN0ZWQtZW50ZXItZnJvbSxcbi5uZXN0ZWQtbGVhdmUtdG8ge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi8qIHdlIGNhbiBhbHNvIHRyYW5zaXRpb24gbmVzdGVkIGVsZW1lbnRzIHVzaW5nIG5lc3RlZCBzZWxlY3RvcnMgKi9cbi5uZXN0ZWQtZW50ZXItYWN0aXZlIC5pbm5lcixcbi5uZXN0ZWQtbGVhdmUtYWN0aXZlIC5pbm5lciB7IFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbn1cbi8qIGRlbGF5IGVudGVyIG9mIG5lc3RlZCBlbGVtZW50ICovXG4ubmVzdGVkLWVudGVyLWFjdGl2ZSAuaW5uZXIge1xuXHR0cmFuc2l0aW9uLWRlbGF5OiAwLjI1cztcbn1cblxuLm5lc3RlZC1lbnRlci1mcm9tIC5pbm5lcixcbi5uZXN0ZWQtbGVhdmUtdG8gLmlubmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDMwcHgpO1xuICAvKlxuICBcdEhhY2sgYXJvdW5kIGEgQ2hyb21lIDk2IGJ1ZyBpbiBoYW5kbGluZyBuZXN0ZWQgb3BhY2l0eSB0cmFuc2l0aW9ucy5cbiAgICBUaGlzIGlzIG5vdCBuZWVkZWQgaW4gb3RoZXIgYnJvd3NlcnMgb3IgQ2hyb21lIDk5KyB3aGVyZSB0aGUgYnVnXG4gICAgaGFzIGJlZW4gZml4ZWQuXG4gICovXG4gIG9wYWNpdHk6IDAuMDAxO1xufVxuPC9zdHlsZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)


필요한 경우 개체를 사용하여 진입 및 진출 기간에 대해 별도의 값을 지정할 수도 있습니다.


```vue-html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

### 성능 고려사항


위에 표시된 애니메이션은 대부분 `transform` 및 `opacity`와 같은 속성을 사용하고 있음을 알 수 있습니다. 이러한 속성은 다음과 같은 이유로 애니메이션에 효율적입니다:


1. 애니메이션 중에 문서 레이아웃에 영향을 주지 않으므로 모든 애니메이션 프레임에서 값비싼 CSS 레이아웃 계산을 트리거하지 않습니다.


2. 대부분의 최신 브라우저는 `transform`에 애니메이션을 적용할 때 GPU 하드웨어 가속을 활용할 수 있습니다.

이에 비해 `height` 또는 `margin`과 같은 속성은 CSS 레이아웃을 트리거하므로 애니메이션을 적용하는 데 훨씬 더 많은 비용이 소요되므로 주의해서 사용해야 합니다. [CSS-Triggers](https://csstriggers.com/)와 같은 리소스를 확인하여 애니메이션을 적용하면 레이아웃을 트리거할 속성을 확인할 수 있습니다.

## 자바스크립트 후크

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
function onBeforeEnter(el) {},

// 엘리먼트가 삽입된 후 한 프레임 다음에 호출됩니다.
// 이를 사용하여 진입 애니메이션을 시작합니다.

function onEnter(el, done) {
  // 트랜지션이 완료되면 done 콜백를 호출해서 종료를 알려주어야 합니다. 
  // CSS와 함께 사용하는 경우 선택 사항입니다. 
  done()
}

// 진입 트랜지션이 완료되면 호출됩니다.
function onAfterEnter(el) {}
function onEnterCancelled(el) {}

// `leave`후크 전에 호출됩니다.
// 대부분의 경우 그냥 `leave`  후크를 사용해야 합니다.
function onBeforeLeave(el) {}

// 진출 트랜지션이 시작될때 호출됩니다. 진출 애니메이션을 시작할때 사용합니다. 
function onLeave(el, done) {
  // 트랜지션이 완료되면 done 콜백를 호출해서 종료를 알려주어야 합니다. 
  // CSS와 함께 사용하는 경우 선택 사항입니다. 
  done()
}

// 진출 트랜지션이 완료되거 앨리먼트가 DOM에서 제거되면 호출됩니다. 
function onAfterLeave(el) {}

// v-show 트랜지션에서만 사용할수 있습니다. 
function leaveCancelled(el) {}
```

</div>
<div class="options-api">

```js
export default {
  // ...
  methods: {
    // called before the element is inserted into the DOM.
    // use this to set the "enter-from" state of the element
    onBeforeEnter(el) {},

    // called one frame after the element is inserted.
    // use this to start the animation.
    onEnter(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done()
    },

    // called when the enter transition has finished.
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // called before the leave hook.
    // Most of the time, you shoud just use the leave hook.
    onBeforeLeave(el) {},

    // called when the leave transition starts.
    // use this to start the leaving animation.
    onLeave(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done()
    },

    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    onAfterLeave(el) {},

    // only available with v-show transitions
    leaveCancelled(el) {}
  }
}
```

</div>


이 후크는 CSS 트랜지션/애니메이션과 함께 사용하거나 단독으로 사용할 수 있습니다.

JavaScript 전용 트랜지션을 사용할 때 일반적으로 `:css="false"` props를 추가하는 것이 좋습니다. 이것은 Vue가 자동 CSS 트랜지션 감지를 건너뛰도록 명시적으로 지시합니다. 성능이 약간 향상되는 것 외에도 CSS 규칙이 실수로 트랜지션을 방해하는 것을 방지합니다.



```vue-html{3}
<Transition
  ...
  :css="false"
>
  ...
</Transition>
```


`:css="false"`를 사용하면 트랜지션이 끝나는 시점 제어에 대한 전적인 책임을 가집니다.  이 경우 `@enter` 및 `@leave` 후크에 `done` 콜백이 필요합니다. `:css="false"` 를 사용하지 않으면 후크가 동기적으로 호출되고 트랜지션이 즉시 완료됩니다.


다음은 [GreenSock 라이브러리](https://greensock.com/)를 사용하여 애니메이션을 수행하는 데모입니다. 물론 [Anime.js](https://animejs.com/) 또는 [Motion One](https://motion.dev/)과 같이 원하는 다른 애니메이션 라이브러리를 사용할 수 있습니다.


<JsHooks />

<div class="composition-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmNvbnN0IHNob3cgPSByZWYodHJ1ZSlcblxuZnVuY3Rpb24gb25CZWZvcmVFbnRlcihlbCkge1xuICBnc2FwLnNldChlbCwge1xuICAgIHNjYWxlWDogMC4yNSxcbiAgICBzY2FsZVk6IDAuMjUsXG4gICAgb3BhY2l0eTogMVxuICB9KVxufVxuICBcbmZ1bmN0aW9uIG9uRW50ZXIoZWwsIGRvbmUpIHtcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAxLFxuICAgIHNjYWxlWDogMSxcbiAgICBzY2FsZVk6IDEsXG4gICAgb3BhY2l0eTogMSxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJyxcbiAgICBvbkNvbXBsZXRlOiBkb25lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG9uTGVhdmUoZWwsIGRvbmUpIHtcblx0Z3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjcsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICB4OiAzMDAsXG4gICAgZWFzZTogJ2VsYXN0aWMuaW5PdXQoMi41LCAxKSdcbiAgfSlcbiAgZ3NhcC50byhlbCwge1xuICAgIGR1cmF0aW9uOiAwLjIsXG4gICAgZGVsYXk6IDAuNSxcbiAgICBvcGFjaXR5OiAwLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwic2hvdyA9ICFzaG93XCI+VG9nZ2xlPC9idXR0b24+XG5cbiAgPFRyYW5zaXRpb25cbiAgICBAYmVmb3JlLWVudGVyPVwib25CZWZvcmVFbnRlclwiXG4gICAgQGVudGVyPVwib25FbnRlclwiXG4gICAgQGxlYXZlPVwib25MZWF2ZVwiXG4gICAgOmNzcz1cImZhbHNlXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJnc2FwLWJveFwiIHYtaWY9XCJzaG93XCI+PC9kaXY+XG4gIDwvVHJhbnNpdGlvbj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZT5cbi5nc2FwLWJveCB7XG4gIGJhY2tncm91bmQ6ICM0MmI4ODM7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJnc2FwXCI6IFwiaHR0cHM6Ly91bnBrZy5jb20vZ3NhcD9tb2R1bGVcIixcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG4gIFxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiB0cnVlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG5cdFx0b25CZWZvcmVFbnRlcixcbiAgICBvbkVudGVyLFxuICAgIG9uTGVhdmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkJlZm9yZUVudGVyKGVsKSB7XG4gIGdzYXAuc2V0KGVsLCB7XG4gICAgc2NhbGVYOiAwLjI1LFxuICAgIHNjYWxlWTogMC4yNSxcbiAgICBvcGFjaXR5OiAxXG4gIH0pXG59XG4gIFxuZnVuY3Rpb24gb25FbnRlcihlbCwgZG9uZSkge1xuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDEsXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICBvcGFjaXR5OiAxLFxuICAgIGVhc2U6ICdlbGFzdGljLmluT3V0KDIuNSwgMSknLFxuICAgIG9uQ29tcGxldGU6IGRvbmVcbiAgfSlcbn1cblxuZnVuY3Rpb24gb25MZWF2ZShlbCwgZG9uZSkge1xuXHRnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuNyxcbiAgICBzY2FsZVg6IDEsXG4gICAgc2NhbGVZOiAxLFxuICAgIHg6IDMwMCxcbiAgICBlYXNlOiAnZWxhc3RpYy5pbk91dCgyLjUsIDEpJ1xuICB9KVxuICBnc2FwLnRvKGVsLCB7XG4gICAgZHVyYXRpb246IDAuMixcbiAgICBkZWxheTogMC41LFxuICAgIG9wYWNpdHk6IDAsXG4gICAgb25Db21wbGV0ZTogZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzaG93ID0gIXNob3dcIj5Ub2dnbGU8L2J1dHRvbj5cblxuICA8VHJhbnNpdGlvblxuICAgIEBiZWZvcmUtZW50ZXI9XCJvbkJlZm9yZUVudGVyXCJcbiAgICBAZW50ZXI9XCJvbkVudGVyXCJcbiAgICBAbGVhdmU9XCJvbkxlYXZlXCJcbiAgICA6Y3NzPVwiZmFsc2VcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cImdzYXAtYm94XCIgdi1pZj1cInNob3dcIj48L2Rpdj5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmdzYXAtYm94IHtcbiAgYmFja2dyb3VuZDogIzQyYjg4MztcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcImdzYXBcIjogXCJodHRwczovL3VucGtnLmNvbS9nc2FwP21vZHVsZVwiLFxuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>

## 재사용 가능한 트랜지션

Vue의 컴포넌트 시스템을 통해 트랜지션을 재사용할 수 있습니다. 재사용 가능한 트랜지션을 만들기 위해 `<Transition>` 컴포넌트를 래핑하고 슬롯 콘텐츠를 전달하는 컴포넌트를 만들 수 있습니다"


```vue{5}
<!-- MyTransition.vue -->
<script>
// JavaScript hooks logic...
</script>

<template>
  <!-- wrap the built-in Transition component -->
  <Transition
    name="my-transition"
    @enter="onEnter"
    @leave="onLeave">
    <slot></slot> <!-- pass down slot content -->
  </Transition>
</template>

<style>
/*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
</style>
```


이제 빌트인 버전처럼 `MyTransition`을 가져와서 사용할 수 있습니다:

```vue-html
<MyTransition>
  <div v-if="show">Hello</div>
</MyTransition>
```

## 등장  트랜지션


DOM Node의 최초 렌더링에도 트랜지션을 적용하려면 `appear` 속성을 추가할 수 있습니다"


```vue-html
<Transition appear>
  ...
</Transition>
```

## 앨리먼트간에 트랜지션 하기


`v-if` / `v-show`로 엘리먼트를 트랜지션하는 것 외에도 `v-if` / `v-else` / `v-else-if`를 사용하여 두 엘리먼트 사이를 트랜지션할 수도 있습니다:


```vue-html
<Transition>
  <button v-if="docState === 'saved'">Edit</button>
  <button v-else-if="docState === 'edited'">Save</button>
  <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

<BetweenElements />

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgZG9jU3RhdGUgPSByZWYoJ3NhdmVkJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxzcGFuIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAyMHB4XCI+Q2xpY2sgdG8gY3ljbGUgdGhyb3VnaCBzdGF0ZXM6PC9zcGFuPlxuICA8ZGl2IGNsYXNzPVwiYnRuLWNvbnRhaW5lclwiPlxuXHRcdDxUcmFuc2l0aW9uIG5hbWU9XCJzbGlkZS11cFwiPlxuICAgICAgPGJ1dHRvbiB2LWlmPVwiZG9jU3RhdGUgPT09ICdzYXZlZCdcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJkb2NTdGF0ZSA9ICdlZGl0ZWQnXCI+RWRpdDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB2LWVsc2UtaWY9XCJkb2NTdGF0ZSA9PT0gJ2VkaXRlZCdcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJkb2NTdGF0ZSA9ICdlZGl0aW5nJ1wiPlNhdmU8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdi1lbHNlLWlmPVwiZG9jU3RhdGUgPT09ICdlZGl0aW5nJ1wiXG4gICAgICAgICAgICAgIEBjbGljaz1cImRvY1N0YXRlID0gJ3NhdmVkJ1wiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvVHJhbnNpdGlvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYnRuLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDFlbTtcbn1cblxuYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4uc2xpZGUtdXAtZW50ZXItYWN0aXZlLFxuLnNsaWRlLXVwLWxlYXZlLWFjdGl2ZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlLW91dDtcbn1cblxuLnNsaWRlLXVwLWVudGVyLWZyb20ge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7XG59XG5cbi5zbGlkZS11cC1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzBweCk7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

## 트랜지션 모드

앞의 예에서 진입 엘리먼트와 진출 엘리먼트는 동시에 애니메이션되며 두 엘리먼트가 모두 DOM에 있을 때 레이아웃 문제를 피하기 위해 `position: absolute`로 만들어야 했습니다.

그러나 어떤 경우에는 이것이 선택가능한 옵션이 아니거나, 원하는 동작이 아닐수 있습니다.  진출 엘리먼트가 먼저 애니메이션 처리되고 들어가는 엘리먼트가 떠나는 애니메이션이 완료된 **이후에**만 삽입되기를 원할 수 있습니다. 이러한 애니메이션을 수동으로 조정하는 것은 매우 복잡합니다. 운 좋게도 `<Transition>`에 `mode` 소품을 전달하여 이 동작을 활성화할 수 있습니다:

```vue-html
<Transition mode="out-in">
  ...
</Transition>
```



앞에서 나온 데모를 `mode="out-in"` 적용해 보았습니다. 

<BetweenElements mode="out-in" />


`<Transition>`은 자주 사용되지는 않지만 `mode="in-out"`도 지원합니다.


## 컴포넌트간에 트랜지션

`<Transition>`은 [동적 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)에서도 사용할 수 있습니다:


```vue-html
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>
```

<BetweenComponents />

<div class="composition-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHNoYWxsb3dSZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgQ29tcEEgZnJvbSAnLi9Db21wQS52dWUnXG5pbXBvcnQgQ29tcEIgZnJvbSAnLi9Db21wQi52dWUnXG5cbi8vIHVzZSBzaGFsbG93UmVmIHRvIGF2b2lkIGNvbXBvbmVudCBiZWluZyBkZWVwbHkgb2JzZXJ2ZWRcbmNvbnN0IGFjdGl2ZUNvbXBvbmVudCA9IHNoYWxsb3dSZWYoQ29tcEEpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiA6dmFsdWU9XCJDb21wQVwiPiBBXG4gIDwvbGFiZWw+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIDp2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQ29tcG9uZW50IEFcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBCLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBDb21wb25lbnQgQlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>
<div class="options-api">

[온라인 연습장에서 시도해보세요](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBDb21wQSBmcm9tICcuL0NvbXBBLnZ1ZSdcbmltcG9ydCBDb21wQiBmcm9tICcuL0NvbXBCLnZ1ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb21wb25lbnRzOiB7IENvbXBBLCBDb21wQiB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmVDb21wb25lbnQ6ICdDb21wQSdcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxsYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgdi1tb2RlbD1cImFjdGl2ZUNvbXBvbmVudFwiIHZhbHVlPVwiQ29tcEFcIj4gQVxuICA8L2xhYmVsPlxuICA8bGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHYtbW9kZWw9XCJhY3RpdmVDb21wb25lbnRcIiB2YWx1ZT1cIkNvbXBCXCI+IEJcbiAgPC9sYWJlbD5cbiAgPFRyYW5zaXRpb24gbmFtZT1cImZhZGVcIiBtb2RlPVwib3V0LWluXCI+XG4gICAgPGNvbXBvbmVudCA6aXM9XCJhY3RpdmVDb21wb25lbnRcIj48L2NvbXBvbmVudD5cbiAgPC9UcmFuc2l0aW9uPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmZhZGUtZW50ZXItYWN0aXZlLFxuLmZhZGUtbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5mYWRlLWVudGVyLWZyb20sXG4uZmFkZS1sZWF2ZS10byB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJDb21wQS52dWUiOiI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgQ29tcG9uZW50IEFcbiAgPC9kaXY+XG48L3RlbXBsYXRlPiIsIkNvbXBCLnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBDb21wb25lbnQgQlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+In0=)

</div>

## 동적 트랜지션


`<Transition>` `name`과 같은 props도 동적일 수 있습니다! 이를 통해 상태 변경에 따라 다른 트랜지션을 동적으로 적용할 수 있습니다:

```vue-html
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```


이것은 Vue의 트랜지션 클래스 규칙을 사용하여 CSS 트랜지션/애니메이션을 정의하고 둘 사이를 트랜지션하려는 경우에 유용할 수 있습니다.



컴포넌트의 현재 상태를 기반으로 JavaScript 트랜지션 후크에서 다른 동작을 적용할 수도 있습니다. 마지막으로, 동적 트랜지션을 만드는 궁극적인 방법은 사용할 트랜지션의 특성을 변경하기 위해 소품을 허용하는 [재사용 가능한 트랜지션 컴포넌트](#reusable-transitions)를 사용하는 것입니다. 진부하게 들릴지 모르지만, 실제로 한계는 당신의 상상력뿐입니다.


---

**Related**

- [`<Transition>` API reference](/api/built-in-components.html#transition)
