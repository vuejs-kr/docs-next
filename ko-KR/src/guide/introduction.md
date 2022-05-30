---
footer: false
---

# 소개

:::info 당신은 현재 Vue 3에 대한 문서를 읽고 있습니다!

- Vue 2 문서가 [v2.vuejs.org](https://v2.vuejs.org/)로 이동되었습니다.
- Vue 2에서 업그레이드 하시려면 [마이그레이션 가이드](https://v3-migration.vuejs.org/)를 확인하십시오.
  :::

## Vue는 무엇입니까?

Vue는 사용자 인터페이스를 구축하기 위한 JavaScript 프레임 워크입니다.
표준 HTML, CSS 및 JavaScript를 기반으로 구축되며, 단순하든 복잡하든 사용자 인터페이스를 효율적으로 개발할 수 있도록 컴포넌트 기반 프로그래밍 모델을 제공합니다.

다음은 최소한의 예입니다:

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    숫자 세기: {{ count }}
  </button>
</div>
```

**결과**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    숫자 세기: {{ count }}
  </button>
</div>

위의 예는 Vue의 두 가지 핵심 기능을 보여줍니다:

- **서술적 랜더링**: Vue는 표준 HTML을 템플릿 문법으로 확장하여 JavaScript 상태를 기반으로 화면에 출력될 HTML을 작성할 수 있습니다.

- **반응형**: Vue는 JavaScript 상태 변경을 자동으로 추적하고 변경이 발생하면 DOM을 효율적으로 업데이트합니다.

이미 Vue에 대해 궁금한 점이 있을 수 있으나 조급해하지 마세요.
이후 문서에서 모든 세부 사항을 다 다룰 것입니다.
지금은 Vue가 제공하는 것에 대한 기본적인 수준의 이해를 할 수 있도록 따라 읽어보시기를 바랍니다.

:::tip 전제조건
나머지 문서에서는 HTML, CSS 및 JavaScript에 대한 기본적인 지식이 있다고 가정합니다.
프론트엔드 개발이 처음이면 첫 번째 단계로 프레임워크에 바로 뛰어드는 것은 좋은 생각이 아닙니다.
기본 지식을 갖추고 난 다음 다시 돌아오세요!
다른 프레임워크를 사용했던 경험이 도움이 되지만 필수는 아닙니다.
:::

## 프로그레시브 프레임워크

Vue는 프론트엔드 개발에 필요한 대부분의 공통 기능을 다루는 프레임워크이자 생태계입니다.
그러나 웹은 매우 다양해 구축하려는 것의 형태와 규모가 크게 다를 수 있습니다.
이를 염두에 두고 Vue는 유연하고 점진적으로 채택할 수 있도록 설계되었습니다.
사용 사례에 따라 Vue를 다양한 방식으로 사용할 수 있습니다:

- 빌드 단계 없이 정적 HTML에 적용
- 모든 페이지에 웹 컴포넌트로 추가
- 싱글 페이지 어플리케이션 (SPA: Single-Page Application)
- Fullstack / 서버 사이드 렌더링 (SSR: Server-Side-Rendering)
- Jamstack / 정적 사이트 생성 (SSG: Static-Site-Generation)
- 데스크톱, 모바일, WebGL 또는 터미널을 대상으로 하는 경우

이러한 개념이 두렵더라도 걱정하지 마십시오!
튜토리얼과 가이드는 HTML과 JavaScript의 기본적인 지식만 요구하며 전문가가 아니더라도 따라 할 수 있습니다.

위 목록에서 언급하는 용어들의 의미가 궁금하거나 어떻게 하면 당신의 기술 스택과 Vue를 잘 조합하여 사용할 수 있는지 관심이 있는 숙련된 개발자라면,
이에 대해 자세히 설명된 [Vue 사용 방법](/guide/extras/ways-of-using-vue)을 살펴보세요.

이러한 유연성에도 불구하고 Vue 작동 방식에 대한 핵심 지식은 이러한 모든 사용 사례에서 공유됩니다.
비록 지금은 초보자일지라도 미래에 더 야심 찬 목표를 달성하기 위해 성장함에 따라 그 과정에서 얻은 지식은 계속 유용할 것입니다.
베테랑이라면 해결하려는 문제를 기반으로 Vue를 활용하는 최적의 방법을 선택하면서 같은 생산성을 유지할 수 있습니다.
이러한 이유로 Vue를 "프로그레시브 프레임워크(Progressive Framework)"라고 부릅니다.
이것은 당신과 함께 성장하고 당신의 요구에 적응할 수 있는 프레임워크입니다.

## 싱글 파일 컴포넌트

빌드 도구를 지원하는 대부분의 Vue 프로젝트에서는 HTML과 유사한 **싱글 파일 컴포넌트**(Single-File Component: **SFC**, `*.vue` 파일이라고도 함)라는 파일 형식을 사용하여 Vue 컴포넌트를 작성합니다.
Vue SFC는 이름에서 알 수 있듯이 컴포넌트의 논리(JavaScript), 템플릿(HTML) 및 스타일(CSS)을 하나의 파일에 캡슐화합니다.
이전에 보았던 예제는 다음과 같이 SFC 형식으로 작성할 수 있습니다:

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">숫자 세기: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC는 Vue를 빌드 방식으로 사용하는 경우, 컴포넌트를 만들고 정의하는데 권장되는 방법입니다.
[SFC를 왜 그리고 어떻게 사용해야 할까](/guide/scaling-up/sfc)에서 자세히 알아볼 수 있습니다.
하지만 지금은 Vue가 모든 빌드 도구 설정을 처리한다는 점만 알아두세요.

## API 스타일

Vue 컴포넌트는 **옵션(Options) API**와 **컴포지션(Composition) API** 두 가지 스타일로 작성할 수 있습니다.

### 옵션 API

옵션 API를 사용하여 `data`, `methods` 및 `mounted`와 같은 옵션의 객체를 사용하여 컴포넌트의 로직를 정의합니다.
옵션으로 정의된 속성은 컴포넌트 인스턴스를 가리키는 함수 내부의 `this`에 노출됩니다:

```vue
<script>
export default {
  // data()에서 반환된 속성들은 반응적인 상태가 되어 `this`에 노출됩니다.
  data() {
    return {
      count: 0
    }
  },

  // methods는 속성 값을 변경하고 업데이트 할 수 있는 함수.
  // 템플릿 내에서 이벤트 리스너로 바인딩 될 수 있음.
  methods: {
    increment() {
      this.count++
    }
  },

  // 수명주기 훅(Lifecycle hooks)은 컴포넌트 수명주기의 여러 단계에서 호출됩니다.
  // 이 함수는 컴포넌트가 마운트 된 후 호출됩니다.
  mounted() {
    console.log(`숫자 세기의 초기값은 ${ this.count } 입니다.`)
  }
}
</script>

<template>
  <button @click="increment">숫자 세기: {{ count }}</button>
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8g67CY7J2R7ZiVIOyDge2DnFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb3VudDogMFxuICAgIH1cbiAgfSxcblxuICAvLyBtZXRob2Rz64qUIOyGjeyEsSDqsJLsnYQg67OA6rK97ZWY6rOgIOyXheuNsOydtO2KuCDtlaAg7IiYIOyeiOuKlCDtlajsiJhcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyDsiJjrqoUg7KO86riwIO2bhVxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKGDsiKvsnpAg7IS46riw7J2YIOy0iOq4sOqwkuydgCAke3RoaXMuY291bnR9IOyeheuLiOuLpC5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPuyIq+yekCDshLjquLA6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

### 컴포지션 API

컴포지션 API를 사용하는 경우, 가져온(`import`) API 함수들을 사용하여 컴포넌트의 로직를 정의합니다.
SFC에서 컴포지션 API는 일반적으로 [`<script setup>`](/api/sfc-script-setup)과 함께 사용됩니다.
`setup` 속성은 Vue가 더 적은 코드 문맥으로 컴포지션 API를 사용하고,
컴파일 시 의도한대로 올바르게 동작할 수 있게 코드를 변환하도록 하는 힌트입니다.
예를 들어 `<script setup>`에 선언된 `import`와 최상위 변수 및 함수는 템플릿에서 직접 사용할 수 있습니다.

아래 예제는 위 예제와 완전히 동일한 템플릿을 사용하는 동일한 컴포넌트 이지만,
Composition API와 `<script setup>`을 사용했습니다:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 반응적인 상태의 속성
const count = ref(0)

// 속성 값을 변경하고 업데이트 할 수 있는 함수.
function increment() {
  count.value++
}

// 수명 주기 훅
onMounted(() => {
  console.log(`숫자 세기의 초기값은 ${ count.value } 입니다.`)
})
</script>

<template>
  <button @click="increment">숫자 세기: {{ count }}</button>
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyDrsJjsnZHsoIHsnbgg7IOB7YOc7J2YIOyGjeyEsVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8g7IaN7ISxIOqwkuydhCDrs4Dqsr3tlZjqs6Ag7JeF642w7J207Yq4IO2VoCDsiJgg7J6I64qUIO2VqOyImC5cbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyDsiJjrqoUg7KO86riwIO2bhVxub25Nb3VudGVkKCgpID0+IHtcbiAgY29uc29sZS5sb2coYOyIq+yekCDshLjquLDsnZgg7LSI6riw6rCS7J2AICR7IGNvdW50LnZhbHVlIH0g7J6F64uI64ukLmApXG59KVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJpbmNyZW1lbnRcIj7siKvsnpAg7IS46riwOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

### 무엇을 선택해야 할까요?

우선 두 API 스타일 모두 일반적인 사용 사례를 완벽하게 다룰 수 있습니다.
이것들은 정확히 동일한 기본 시스템에 의해 구동되는 서로 다른 인터페이스입니다.
사실, 옵션 API는 컴포지션 API 위에 구현됩니다!
Vue에 대한 기본 개념과 지식은 두 스타일과 상관없이 동일합니다.

옵션 API는 일반적으로 OOP 언어 배경을 가진 사용자를 위한 클래스 기반 모델과 더 잘 맞는 "컴포넌트 인스턴스"(예제에서 볼 수 있는 `this`)의 개념을 중심으로 합니다.
또한 반응형 세부 사항을 추상화하고 옵션 그룹을 통해 코드 구조를 실행하여 초보자에게 더 친숙합니다.

컴포지션 API는 함수 범위에서 직접 반응형 변수를 선언하고 복잡성을 처리하기 위해 여러 함수의 상태를 함께 구성하는데 중점을 둡니다.
보다 자유로운 형식이며 Vue에서 반응형이 효과적으로 사용되는 방식에 대한 이해가 필요합니다.
그 대가로 이 유연성은 로직을 구성하고 재사용하기 위한 보다 강력한 패턴을 가능하게 합니다.

[컴포지션 API FAQ](/guide/extras/composition-api-faq)에서 두 스타일의 비교 및 컴포지션 API의 잠재적 이점에 대해 자세히 알아볼 수 있습니다.

Vue를 처음 사용하는 경우 일반적인 권장 사항은 다음과 같습니다:

- 학습을 목적으로 하는 경우, 당신이 쉽게 이해할 수 있어보이는 스타일로 가십시오. 다시 말하지만, 대부분의 핵심 개념은 두 스타일 간에 공유됩니다. 나중에 언제든지 다른 하나를 선택할 수 있습니다.

- 생산용(production)으로 사용하는 경우:

  - 빌드 도구를 사용하지 않거나 Vue를 주로 복잡성이 낮은 시나리오에서 사용할 계획이라면 옵션 API를 사용하세요.

  - Go with Composition API + Single-File Components if you plan to build full applications with Vue.
  - Vue로 어느정도 규모가 있는 애플리케이션의 전체를 구축하려는 경우 컴포넌트 API + SFC를 사용하십시오.

학습 단계에서 한 가지 스타일만 고집할 필요는 없습니다.
이후 문서에서는 두 가지 스타일의 코드 샘플을 제공하며, 왼쪽 사이드바의 상단에 있는 **API 스타일 설정**을 사용하여 언제든지 두 스타일 사이를 전환할 수 있습니다.

## 여전히 질문이 있나요?

[FAQ](/about/faq)를 확인하세요.

## 학습 방법 선택

개발자마다 학습 스타일이 다릅니다.
선호하는 학습 방법을 자유롭게 선택하세요.
가능하면 모든 콘텐츠를 살펴보는 것이 좋습니다.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">튜토리얼 시작</p>
    <p class="next-steps-caption">직접 배우는 것을 선호하는 사람들을 위해.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">가이드 읽기</p>
    <p class="next-steps-caption">이 가이드는 프레임워크의 모든 측면을 자세히 안내합니다.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">예제 확인하기</p>
    <p class="next-steps-caption">핵심 기능 및 일반적인 UI 작업의 예를 살펴보십시오.</p>
  </a>
</div>
