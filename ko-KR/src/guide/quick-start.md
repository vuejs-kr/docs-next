---
footer: false
---

# 빠른 시작

사용 사례 및 기본 설정에 따라 빌드 단계를 포함하거나 포함하지 않고 Vue를 사용할 수 있습니다.

## 빌드 도구 사용

빌드 설정을 통해 Vue [싱글 파일 컴포넌트](/guide/scaling-up/sfc)(SFC)를 사용할 수 있습니다.
공식 Vue 빌드 설정은 현대적이고 가볍고 매우 빠른 프론트엔드 빌드 도구인 [Vite](https://vitejs.dev)를 기반으로 합니다.

### 온라인

[StackBlitz](https://vite.new/vue)에서 온라인으로 Vue와 SFC를 사용해 볼 수 있습니다.
StackBlitz는 브라우저에서 직접 Vite 기반 빌드 설정을 실행하므로 로컬 설정과 거의 동일하며 컴퓨터에 아무것도 설치할 필요가 없습니다.

### 로컬

:::tip 전제 조건

- 명령줄(command line) 사용에 익숙함
- [Node.js](https://nodejs.org/) 설치
  :::

기기에서 빌드 도구가 활성화된 Vue 프로젝트를 생성하려면, 명령줄에서 다음 명령을 실행합니다(`>` 기호 제외):

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 [create-vue](https://github.com/vuejs/create-vue)를 설치하고 실행합니다.
TypeScript 및 테스트 지원과 같은 여러 선택적 기능에 대한 프롬프트가 표시됩니다.

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:#888;"># 프로젝트 이름은:</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 타입스크립트를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># JSX를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 싱글 페이지 애플리케이션 개발을 위해 Vue 라우터를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 상태 관리를 위해 Pinia를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 단위 테스트를 위해 Vitest를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 단위 및 End-to-End 테스트 모두에 Cypress를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 코드 품질을 위해 ESLint를 추가하시겠습니까?</span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:#888;"># 코드 서식을 위해 Prettier를 추가하시겠습니까?</span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#888;"># ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span> 에 프로젝트 스케폴딩 중...</span>
<span style="color:#A6ACCD;">Done.</span>
<span style="color:#888;"># 완료</span></code></pre></div>

:::tip 스케폴딩(Scaffolding)이란?
프로젝트 생성 시 초기 디렉토리 구조, 컴파일 설정 등을 자동 또는 사용자 지정 값으로 생성해 주는 행위.
:::

옵션을 잘 모를 경우, 일단 Enter 키를 눌러 `No`를 선택하세요.
프로젝트가 생성되면 지침에 따라 종속성을 설치하고 개발 서버를 시작합니다:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

이제 첫 번째 Vue 프로젝트가 실행 중이어야 합니다!
다음은 몇 가지 추가 팁입니다:

- 권장되는 IDE는 [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)입니다.
  다른 편집기를 사용하는 경우 [IDE 지원 섹션](/guide/scaling-up/tooling.html#ide-support)을 확인하세요.

[comment]: <> (/guide/scaling-up/tooling.md 번역 후 링크 수정 필요)

- 백엔드 프레임워크와의 통합을 비롯한 자세한 도구 세부정보는 [도구 가이드](/guide/scaling-up/tooling.html)에서 설명합니다.

- 기본 빌드 도구인 Vite에 대해 자세히 알아보려면 [Vite 문서](https://vitejs.dev)를 확인하세요.

- TypeScript를 사용하기로 선택한 경우 [TypeScript 사용 가이드](typescript/overview.html)를 확인하세요.

앱을 프로덕션에 제공할 준비가 되면 다음을 실행합니다:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

그러면 프로젝트의 `./dist` 디렉토리에 앱을 배포할 준비가 된 결과물이 생성됩니다.
앱을 프로덕션으로 배포하는 방법에 대해 자세히 알아보려면 [프로덕션 배포 가이드](/guide/best-practices/production-deployment.html)를 확인하세요.

[다음 단계 >](#다음-단계)

## 빌드 도구 사용 안 함

빌드 단계 없이 Vue를 시작하려면 다음 코드를 HTML 파일에 복사하고 브라우저에서 엽니다:

```html
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: '안녕 Vue!'
      }
    }
  }).mount('#app')
</script>
```

위의 예는 모든 API가 글로벌 변수 `Vue` 내에 노출되는 Vue의 글로벌 빌드를 사용합니다.
예를 들어 `ref` API를 사용하려면 다음과 같이 해야합니다:

```js
const { createApp, ref } = Vue
```

글로벌 빌드가 작동하는 동안 일관성을 위해 문서의 나머지 부분에서 주로 [ES 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 문법을 사용합니다.
네이티브 ES 모듈에서 Vue를 사용하려면 HTML을 아래와 같이 사용하십시오:

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: '안녕 Vue!'
      }
    }
  }).mount('#app')
</script>
```

코드를 `import { createApp } from 'vue'`로 작성하는 방법에 주목하세요.
이는 브라우저의 기본 기능인 [Import Maps](https://caniuse.com/import-maps)를 활용하여 `<script type="importmap">` 블록을 통해 가능합니다.

다른 종속성에 대한 항목을 import map에 추가할 수 있습니다.
사용하려는 라이브러리의 ES 모듈 버전을 가리키는지 확인하기만 하면 됩니다.

:::tip Import Maps 브라우저 지원
Import maps는 Chromium 기반 브라우저에서 기본적으로 지원되므로 학습 과정에서 Chrome 또는 Edge를 사용하는 것이 좋습니다.

Firefox를 사용하는 경우 버전 102 이상에서만 지원되며 현재 `about:config`의 `dom.importMaps.enabled` 옵션을 통해 활성화해야 합니다.

선호하는 브라우저가 아직 Import maps를 지원하지 않는 경우 [es-module-shims](https://github.com/guybedford/es-module-shims)로 폴리필할 수 있습니다.
:::

:::warning 프로덕션을 위한 것이 아님
import-maps 기반 설정은 학습용입니다.
프로덕션에서 빌드 도구 없이 Vue를 사용하려는 경우 [프로덕션 배포 가이드](/guide/best-practices/production-deployment.html#without-build-tools)를 확인하세요.
:::

### HTTP를 통한 서비스

가이드를 자세히 살펴보면서 관리하기 쉽도록 코드를 별도의 JavaScript 파일로 분할해야 할 수도 있습니다.
예를 들면:

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>숫자 세기: {{ count }}</div>`
}
```

이것이 작동하려면 `file://` 프로토콜 대신 `http://` 프로토콜을 통해 HTML을 제공해야 합니다.
로컬 HTTP 서버를 시작하려면 먼저 [Node.js](https://nodejs.org/en/)를 설치한 다음 HTML 파일이 있는 동일한 디렉토리의 명령줄에서 `npx serve`를 실행합니다.
올바른 MIME 유형으로 정적 파일을 제공할 수 있는 다른 HTTP 서버를 사용할 수도 있습니다.

가져온 컴포넌트의 템플릿이 JavaScript 문자열로 인라인된 것을 보았을 것입니다.
VSCode를 사용하는 경우 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 확장자를 설치하고 문자열에 `/*html*/` 주석을 붙여서 문법 강조 표시를 얻을 수 있습니다.

## 다음 단계

[소개](/guide/introduction)를 건너뛴 경우 다른 문서로 이동하기 전에 해당 문서를 읽는 것이 좋습니다.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">가이드 계속 진행하기</p>
    <p class="next-steps-caption">이 가이드는 프레임워크의 모든 측면을 자세히 안내합니다.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">튜토리얼 시도</p>
    <p class="next-steps-caption">직접 배우는 것을 선호하는 사람들을 위해.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">예제 확인하기</p>
    <p class="next-steps-caption">핵심 기능 및 일반적인 UI 작업의 예를 살펴보십시오.</p>
  </a>
</div>
