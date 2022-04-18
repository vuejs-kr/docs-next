---
footer: false
---
:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::


# Introduction
# 시작하기

:::info You are reading the documentation for Vue 3!


- Vue 2 documentation has been moved to [v2.vuejs.org](https://v2.vuejs.org/).
- Upgrading from Vue 2? Check out the [Migration Guide](https://v3-migration.vuejs.org/).
  :::

:::info 현재 Vue 3 를 위한 문서를 읽고 계십니다!
- Vue 2 문서가 [v2.vuejs.org](https://v2.vuejs.org/) 로 이동되었습니다.
- Vue 2에서 업그레이드 하고자 하신다면 [마이그레이션 가이드](https://v3-migration.vuejs.org/) 를 확인하세요.
:::  

<style src="/@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses-path/beginner" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description">Learn Vue with video tutorials on <span>VueMastery.com</span></p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## What is Vue?

## Vue 는 무엇인가요?

Vue (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.

Vue(**view** 와 같이 /vjuː/로 발음하시면 됩니다)는 사용자 인터페이스를 구축하기 위한 자바스크립트 프레임워크입니다. Vue는 HTML, CSS 및 JavaScript 표준을 기반으로 만들어 졌습니다. 단순하거나 복잡한 사용자 인터페이스를 효율적으로 개발하는 데 도움이 되는 선언적(decalative)인  컴포넌트 기반 프로그래밍 모델을 제공합니다.


Here is a minimal example:

간단히 예제를 한번 보시죠:

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
    Count is: {{ count }}
  </button>
</div>
```

**Result**
**결과**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

The above example demonstrates the two core features of Vue:

위의 예는 Vue의 두 가지 핵심 기능을 보여줍니다:


- **Declarative Rendering**: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.
- **선언적 렌더링** : Vue는 표준 HTML을 템플릿 문법을 통해 확장할수 있습니다. Vue의 템플릿 문법은 자바스크립트의 상태값를 선언적으로 HTML 으로 출력할수 있게 해줍니다. 

- **Reactivity**: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.
- **반응성** : Vue는 자바스크립트 상태값의 변경을 자동으로 추적하고, 발생한 변경을 효율적으로 DOM에 반영합니다. 

You may already have questions - don't worry. We will cover every little detail in the rest of the documentation. For now, please read along so you can have a high-level understanding of what Vue offers.

이게 무슨 소리인가 하는 의문이  드실 겁니다.  걱정하지 마세요. 자세한건 다른 문서들에서 자세히 설명 할 겁니다.  지금은 이 문서를 계속 읽어 나가면서 Vue를 개략적인 수준으로 이해해 봅시다.

:::tip Prerequisites
The rest of the documentation assumes basic familiarity with HTML, CSS and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics then come back! Prior experience with other frameworks helps, but is not required.
:::

:::tip 전제 사항
이 문서는 읽으시는 분들이  HTML, CSS 및 자바스크립트에 대한 기본적인 지식이 있다고 가정 하고 작성되었습니다. 프론트엔드 개발을 처음 접하시는 분들이라면 프레임워크를 먼저 배우는 것은 별로 좋은 생각이 아닙니다. 기본 지식을 익힌 후에 다시 돌아오세요!  다른 프레임워크에 대한 사전 경험이 있으시면 큰 도움이 될수 있지만 필수적이지는 않습니다.  
:::

## The Progressive Framework
## 점진적인(Progressive) 프레임워크


Vue is a framework and ecosystem that covers most of the common features needed in frontend development. But the web is extremely diverse - the things we build on the web may vary drastically in form and scale. With that in mind, Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:

Vue는 프론트엔드 개발에 필요한 대부분의 공통 기능을 다루는 프레임워크이자 생태계입니다. 그러나 웹은 극단적으로 다양합니다. 웹에서 구축하고자 하는 것의 형태와 규모는 서로 크게 다를 수 있습니다. 이를 염두에 두고 Vue는 유연하고 점진적으로 채택할 수 있도록 설계되었습니다. 사용 사례에 따라 Vue를 다양한 방식으로 사용할 수 있습니다.

- Enhancing static HTML without a build step
- 빌드 단계 없이 정적 HTML 개선
- Embedding as Web Components on any page
- 어떤 페이지에서든 웹 컴포넌트 형태로 포함시키기
- Single-Page Application (SPA)
- 단일 페이지 애플리케이션(Single-Page Application SPA)
- Fullstack / Server-Side-Rendering (SSR)
- 풀스택/서버 사이드 렌더링(SSR)
- Jamstack / Static-Site-Generation (SSG)
- Jamstack / 정적 사이트 생성(SSG)
- Targeting desktop, mobile, WebGL or even the terminal
- 데스크탑, 모바일, WebGL 또는 터미널까지 타겟팅

If you find these concepts intimidating, don't worry! The tutorial and guide only require basic HTML and JavaScript knowledge, and you should be able to follow along without being an expert in any of these.

새로운 개념이 많이 나와서 두려울수 있습니다만, 걱정 마세요! 튜토리얼과 가이드를 따라 가기 위해서는 기본적인 HTML과 자바스크립트 지식만 있으면 됩니다. 전문가가 아니더라도 배우실수 있습니다.


If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more details in [Ways of Using Vue](/guide/extras/ways-of-using-vue).

Vue를 사용하고 계신 개발 스택에 잘 통합하는 방법에 관심이 있는 숙련된 개발자이거나 이러한 용어의 의미가 궁금하다면 [Vue 사용 방법](/guide/extras/ways-of-using-vue)에서 더 자세한 내용을 다루고 있습니다. 

Despite the flexibility, the core knowledge about how Vue works is shared across all these use cases. Even if you are just a beginner now, the knowledge gained along the way will stay useful as you grow to tackle more ambitious goals in the future. If you are a veteran, you can pick the optimal way to leverage Vue based on the problems you are trying to solve, while retaining the same productivity. This is why we call Vue "The Progressive Framework": it's a framework that can grow with you and adapt to your needs.

이렇게 사용 방식에 대한 놀라운 유연성을 제공하지만, Vue가 어떻게 동작하는가에 대한 지식은 모든 사용 사례에서 공유됩니다. 지금은 초보자일지라도 그 과정에서 얻은 지식은 앞으로 더 야심찬 목표를 달성하기 위해 성장함에 따라 유용하게 사용될 것입니다. 베테랑이라면 동일한 생산성을 유지하면서 해결하려는 문제를 기반으로 Vue를 활용하는 최적의 방법을 선택할 수 있습니다. 이것이 우리가 Vue를 "점진적인(Progressive) 프레임워크"라고 부르는 이유입니다. Vue는 당신과 함께 성장하고 당신의 요구에 적응할 수 있는 프레임워크입니다.

## Single-File Components
## 싱글 파일 컴포넌트


In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called **Single-File Component** (also known as `*.vue` files, abbreviated as **SFC**). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:

대부분의 빌드 도구 지원 Vue 프로젝트에서 **싱글 파일 컴포넌트** ( `*.vue` 파일이라고도 함, `SFC` 로 약칭)라는 HTML과 유사한 파일 형식을 사용하여 Vue 컴포넌트를 작성합니다. Vue SFC는 이름에서 알 수 있듯이 컴포넌트의 논리(JavaScript), 템플릿(HTML) 및 스타일(CSS)을 단일 파일에 캡슐화합니다. 다음은 앞에 나왔던 예제를 SFC 형식으로 작성한 것입니다:

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
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC is a defining feature of Vue, and is the recommended way to author Vue components **if** your use case warrants a build setup. You can learn more about the [how and why of SFC](/guide/scaling-up/sfc) in its dedicated section - but for now, just know that Vue will handle all the build tools setup for you.

SFC는 Vue의 정의 기능이며 사용 사례가 빌드 설정을 사용하는 **경우** Vue 컴포넌트를 작성하는 데 권장되는 방법입니다. 전용 섹션에서 [SFC의 사용하는 이유와 방법](/guide/scaling-up/sfc) 대해 자세히 알아볼 수 있지만 지금은 Vue가 모든 빌드 도구 설정을 처리한다는 점만 알아두세요.

## API Styles

Vue components can be authored in two different API styles: **Options API** and **Composition API**.

Vue 컴포넌트는 **옵션 API** 및 **컴포지션(Composition) API** 의 두 가지 API 스타일로 작성할 수 있습니다.

### Options API

With Options API, we define a component's logic using an object of options such as `data`, `methods`, and `mounted`. Properties defined by options are exposed on `this` inside functions, which points to the component instance:

Options API를 사용하여 `data` , `methods` 및 `mounted` 와 같은 옵션 개체를 사용하여 컴포넌트의 논리를 정의합니다. 옵션으로 정의된 속성은 컴포넌트 인스턴스를 가리키는 `this`의 내부 함수에 노출

```vue
<script>
export default {
  // Properties returned from data() becomes reactive state
  // and will be exposed on `this`.
  // data()에서 반환된 속성은 반응 상태가 됩니다.
  // 그리고 `this`에 노출됩니다.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event listeners in templates.
  // 메서드는 상태를 변경하고 업데이트를 트리거하는 함수입니다.
  // 템플릿에서 이벤트 리스너로 바인딩될 수 있습니다.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  // 수명 주기 후크는 다른 단계에서 호출됩니다.
  // 컴포넌트의 수명 주기.
  // 이 함수는 컴포넌트가 마운트될 때 호출됩니다.  
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>


<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### 컴포지션(Composition) API

With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with [`<script setup>`](/api/sfc-script-setup). The `setup` attribute is a hint that makes Vue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.

컴포지션 API을 사용하면, 컴포넌트의 로직을 컴포지션 API 함수를 이용해 정의할수 있습니다.  SFC에서 Composition API는 일반적으로 [`<script setup>`](/api/sfc-script-setup) 과 함께 사용됩니다. `setup` 속성은 Vue가 더 적은 상용구로 컴포지션 API를 사용할 수 있도록 하는 컴파일 타임 변환을 수행하도록 하는 힌트입니다. 예를 들어 `<script setup>` 에서 선언된 import 및 최상위 변수/함수는 템플릿에서 직접 사용할 수 있습니다.

Here is the same component, with the exact same template, but using Composition API and `<script setup>` instead:

다음은 정확히 동일한 템플릿을 사용하는 동일한 컴포넌트이지만 대신 컴포지션 API와 `<script setup>` 을 사용하는 것입니다:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### Which to Choose?
### 어떤 것을 선택할까요?

First of all, both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

우선 어떤 API 스타일을 선택해도  충분히 대부분의 경우에 대응할수 있습니다. 두개의 서로 다른 인터페이스는 정확히 같은 하위 기반 시스템을 기반으로 하고 있기 때문입니다. 사실 옵션 API는 컴포지션 API를 이용해 제작 되었습니다! Vue에 대한 기반 개념과 지식으 두가지 지식에서 모두 공유됩니다. 

The Options API is centered around the concept of a "component instance" (`this` as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.

옵션 API는 "컴포넌트 인스턴스" (예제에서 `this` 로 나왔죠 )라는 개념을 중심으로 만들어져서 일반적인 OOP 적인 클래스 기반의 사고방식을 가진 개발자들에게 잘 어울립니다. 이 스타일은 디데일한 부분은 추상화 시키고, 옵션 그룹을 이용해 코드에 대한 구조화를 강제하기 때문에 초보자들에게 더 쉽게 다가갈수 있습니다. 

The Composition API is centered around declaring reactive state variables directly in a function scope, and composing state from multiple functions together to handle complexity. It is more free-form, and requires understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

컴포지션 API는 반응형 상태 변수를 함수 범위에서 직접 선언하고 다루는 것을 중심에 두고 이것들을 여러 상태를 조합하고, 여러 함수를 제공하여 복잡성을 다룹니다. 더 자유로운 형태로 다룰수 있으며 Vue의 반응형이 어떻게 동작하는지에 대한 좀더 깊은 이해를 요구합니다. 그에 대한 댓가로 로직을 조직화 하고 재사용 하는 부분에 대해 더 강력하고 유연한 패턴을 사용할수 있게 해줍니다. 

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the [Composition API FAQ](/guide/extras/composition-api-faq).

[Composition API FAQ](/guide/extras/composition-api-faq) 에서 두가지 스타일을 비교하고 컴포지션 API의 잠재적인 이득에 대해 알아볼수 있습니다. 

If you are new to Vue, here's our general recommendation:

만약 Vue를 처음 접하신다면, 다음을 따라 보세요

- For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other one at a later time.
- 학습을 위해, 더 쉬워 보이는 스타일을 선택하세요. 어떤 스타일을 선택해도 핵심 개념은 동일합니다. 다른 스타일로 나중에 바꾸는것도 얼마든지 가능합니다. 

- For production use:
- 실 제품 개발을 위해:

  - Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.
  - 만약 빌드 도구를 사용하지 않거나 복잡하지 않은 시나리오에서 Vue를 사용하실거라면 옵션 API를 사용하세요. 예) 점증적인 개선

  - Go with Composition API + Single-File Components if you plan to build full applications with Vue.
  - Vue로 완전한 애플리케이션을 빌드하실 예정이라면  컴포지션 API와 싱글 파일 컴포넌트를 사용하세요 

You don't have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the **API Preference switches** at the top of the left sidebar.

학습 단계에서 한 가지 스타일만 고집할 필요는 없습니다. 나머지 문서는 해당되는 경우 두 가지 스타일의 코드 샘플을 제공하며 왼쪽 사이드바 상단에 있는 **API 기본 설정 스위치**를 사용하여 언제든지 두 스타일 사이를 전환할 수 있습니다.


## Still Got Questions?

## 궁굼한게 남으셨나요? 

Check out our [FAQ](/about/faq).

[FAQ](/about/faq)를 방문해보세요

## Pick Your Learning Path

## 학습 경록 선택

Different developers have different learning styles. Feel free to pick a learning path that suits your preference - although we do recommend going over all content if possible!

개발자마다 학습 스타일이 다릅니다. 선호하는 학습 경로를 자유롭게 선택하세요. 가능하면 모든 콘텐츠를 살펴보는 것이 좋습니다.


<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Try the Tutorial</p>
    <p class="next-steps-caption">For those who prefer learning things hands-on.</p>
    <p class="next-steps-link">튜토리얼로 시작해보세요</p>
    <p class="next-steps-caption">손으로 직접 무언가를 해보는 것을 선호하는 분들을 위한 방법입니다.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Read the Guide</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full details.</p>
    <p class="next-steps-link">가이드 문서를 읽어 보세요</p>
    <p class="next-steps-caption">가이드 문서는 프레임워크의 모든 측명을 아주 자세하게 안내합니다.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-caption">Explore examples of core features and common UI tasks.</p>
    <p class="next-steps-link">예제를 확인해보세요</p>
    <p class="next-steps-caption">핵심 기능과 일반적인 UI 작업에 대안 예제를 탐색해보세요</p>
  </a>
</div>
