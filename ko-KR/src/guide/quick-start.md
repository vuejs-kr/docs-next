---
footer: false
---

# Quick Start
# 빠른 시작


Depending on your use case and preference, you can use Vue with or without a build step.
독자님의 유스케이스와 선호도에 따라 빌드 단계를 포함하거나 포함하지 않고 Vue를 사용할 수 있습니다.

## With Build Tools
## 빌드 도구 사용

A build setup allows us to use Vue [Single-File Components](/guide/scaling-up/sfc) (SFCs). The official Vue build setup is based on [Vite](https://vitejs.dev), a frontend build tool that is modern, lightweight and extremely fast.
빌드 설정을 통해 Vue SFC( [싱글 파일 컴포넌트](/guide/scaling-up/sfc))를 사용할 수 있습니다. 공식 Vue 빌드 설정은 현대적이고 가벼우며 매우 빠른 프론트엔드 빌드 도구인 [Vite](https://vitejs.dev) 를 기반으로 합니다.

### Online
### 온라인


You can try Vue with SFCs online on [StackBlitz](https://vite.new/vue). StackBlitz runs the Vite-based build setup directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

[StackBlitz](https://vite.new/vue) 에서 온라인으로 Vue with SFC를 사용해 볼 수 있습니다. StackBlitz는 브라우저에서 직접 Vite 기반 빌드 설정을 실행하므로 로컬 설정과 거의 동일하지만 컴퓨터에 아무것도 설치할 필요가 없습니다.

### Local
### 로컬

:::tip Pre-requisites

- Familiarity with the command line
- Install [Node.js](https://nodejs.org/)
  :::

:::tip 전제 조건

- 커맨드 라인 환경에 익숙함Familiarity with the command line
- [Node.js](https://nodejs.org/) 설치 
  :::

To create a build-tool-enabled Vue project on your machine, run the following command in your command line (without the `>` sign):
당신의 기기에서 빌드 도구를 이용해 Vue 프로젝트를 생성하려면 커맨드라인에서 다음 명령을 실행합니다( `>` 기호는 제외).

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript and testing support:
이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 [create-vue](https://github.com/vuejs/create-vue) 를 설치하고 실행합니다. TypeScript 및 테스트 지원과 같은 여러 선택적 기능에 대한 프롬프트가 표시됩니다.

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formating? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

If you are unsure about an option, simply choose `No` by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:
옵션이 확실하지 않은 경우 지금은 Enter 키를 눌러 `No` 를 선택하십시오. 프로젝트가 생성되면 지침에 따라 의존성을 설치하고 개발 서버를 시작합니다.

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>
<span class="line"></span></code></pre></div>

You should now have your first Vue project running! Here are some additional tips:
이제 첫 번째 Vue 프로젝트가 실행 되고 있습니다! 다음은 몇 가지 추가 팁입니다:

- The recommended IDE setup is [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar). [WebStorm](https://www.jetbrains.com/webstorm/) is also viable.
- 권장되는 IDE 설정은 [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) 입니다. [WebStorm](https://www.jetbrains.com/webstorm/)도 실행 가능합니다.
- More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](/guide/scaling-up/tooling.html).
- 백엔드 프레임워크와의 통합을 포함한 자세한 도구 세부정보는 [도구 가이드](/guide/scaling-up/tooling.html) 에서 설명합니다.
- To learn more about the underlying build tool Vite, check out the [Vite docs](https://vitejs.dev).
- 기본 빌드 도구 Vite에 대해 자세히 알아보려면 [Vite 문서](https://vitejs.dev) 를 확인하세요.
- If you chose to use TypeScript, check out the [TypeScript Usage Guide](typescript/overview.html).
- TypeScript를 사용하기로 선택한 경우 [TypeScript 사용 가이드](typescript/overview.html) 를 확인하십시오.

When you are ready to ship your app to production, run the following:
앱을 프로덕션에 제공할 준비가 되면 다음을 실행합니다:

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>
<span class="line"></span></code></pre></div>

This will create a production-ready build of your app in the project's `./dist` directory. Check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html) to learn more about shipping your app to production.
그러면 프로젝트의 `./dist` 디렉토리에 프로덕션 준비가 된 앱 빌드가 생성됩니다. [운영 배포 가이드](/guide/best-practices/production-deployment.html) 를 확인하여 앱을 운영으로 배포하는 방법에 대해 자세히 알아보세요.

[Next Steps >](#next-steps)

## Without Build Tools
## 빌드 도구 미사용

To get started with Vue without a build step, simply copy the following code into an HTML file and open it in your browser:
빌드 단계 없이 Vue를 시작하려면 다음 코드를 HTML 파일에 복사하고 브라우저에서 엽니다:


```html
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

The above example uses the global build of Vue where all APIs are exposed under the global `Vue` variable.
위의 예는 모든 API가  `Vue` 전역 변수에 제공됩니다. 노출되는 Vue의 전역 빌드를 사용합니다.

While the global build works, we will be primarily using [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) syntax throughout the rest of the documentation for consistency. In order to use Vue over native ES modules, use the following HTML instead:
전역 빌드가 작동하는 동안 일관성을 위해 문서의 나머지 부분에서 주로 [ES 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 구문을 사용합니다. 기본 ES 모듈에서 Vue를 사용하려면 대신 다음 HTML을 사용하십시오.

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
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

Notice how we can import directly from `'vue'` in our code - this is made possible by the `<script type="importmap">` block, leveraging a native browser feature called [Import Maps](https://caniuse.com/import-maps). Import maps are currently only available in Chromium-based browsers, so we recommend using Chrome or Edge during the learning process. If your preferred browser does not support import maps yet, you can polyfill it with [es-module-shims](https://github.com/guybedford/es-module-shims).
코드 `'vue'` 에서 직접 가져올 수 있는 방법에 주목하세요. 이는 [Import Maps](https://caniuse.com/import-maps) 라는 기본 브라우저 기능을 활용하여 `<script type="importmap">`  블록으로 가능합니다. 지도 가져오기는 현재 Chromium 기반 브라우저에서만 사용할 수 있으므로 학습 과정에서 Chrome 또는 Edge를 사용하는 것이 좋습니다. 선호하는 브라우저가 아직 지도 가져오기를 지원하지 않는 경우 [es-module-shims](https://github.com/guybedford/es-module-shims) 로 폴리필할 수 있습니다.


You can add entries for other dependencies to the import map - just make sure they point to the ES modules version of the library you intend to use.
다른 의존성에 대한 항목을 지도 가져오기에 추가할 수 있습니다. 사용하려는 라이브러리의 ES 모듈 버전을 가리키는지 확인하기만 하면 됩니다.


:::tip Not for production
The import-maps-based setup is meant for learning only - if you intend to use Vue without build tools in production, make sure to check out the [Production Deployment Guide](/guide/best-practices/production-deployment.html#without-build-tools).
:::

:::tip 운영용이 아님
지도 가져오기 기반 설정은 학습용입니다. 프로덕션 환경에서 빌드 도구 없이 Vue를 사용하려는 경우 [운영  배포 가이드](/guide/best-practices/production-deployment.html#without-build-tools) 를 확인하세요. 
:::

### Serving over HTTP
### HTTP를 통한 제공

As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage. For example:
가이드에 대해 더 깊이 파고들면 관리하기 쉽도록 코드를 별도의 JavaScript 파일로 분할해야 할 수도 있습니다. 예를 들어:

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
  template: `<div>count is {{ count }}</div>`
}
```

In order for this to work, you need to serve your HTML over the `http://` protocol instead of `file://` protocol. To start a local HTTP server, first install [Node.js](https://nodejs.org/en/), and then run `npx serve` from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with correct MIME types.

이것이 작동하려면 {code0}file://{/code0} 프로토콜 대신 {code1}http://{/code1} 프로토콜을 통해 HTML을 제공해야 합니다. 로컬 HTTP 서버를 시작하려면 먼저 {a2}Node.js{/a2} 를 설치한 다음 HTML 파일이 있는 동일한 디렉토리의 커맨드라인에서 {code3}npx serve{/code3} 를 실행합니다. 올바른 MIME 유형으로 정적 파일을 제공할 수 있는 다른 HTTP 서버를 사용할 수도 있습니다.


You may have noticed that the imported component's template is inlined as a JavaScript string. If you are using VSCode, you can install the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) extension and prefix the strings with a `/*html*/` comment to get syntax highlighting for them.

가져온 컴포넌트의 템플릿이 JavaScript 문자열로 인라인되어 있음을 알 수 있습니다. VSCode를 사용하는 경우 {a0}es6-string-html{/a0} 확장을 설치하고 문자열에 {code1}/*html*/{/code1} 주석을 접두어로 추가하여 구문 강조 표시를 얻을 수 있습니다.

## Next Steps
## 다음 단계


If you skipped the [Introduction](/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.

[Introduction](/guide/introduction) 을 아직 않 읽었다면  다른 문서를 읽기전에 해당 문서를 읽는 것이 좋습니다.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Continue the Guide</p>
    <p class="next-steps-link">가이드를 이어나갑니다.</p>
    <p class="next-steps-caption">The guide walks you through every aspect of the framework in full details.</p>    
    <p class="next-steps-caption">이 가이드는 프레임워크의 모든 측면에 대해 자세히 설명합니다.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Try the Tutorial</p>
    <p class="next-steps-link">듀토리얼을 시도해 보세요.</p>    
    <p class="next-steps-caption">For those who prefer learning things hands-on.</p>
    <p class="next-steps-caption">직접 배우는 것을 좋아하는 분들을 위해.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Check out the Examples</p>
    <p class="next-steps-link">샘플을 확인 하세요.</p>
    <p class="next-steps-caption">Explore examples of core features and common UI tasks.</p>    
    <p class="next-steps-caption">핵심 기능 및 일반적인 UI 작업의 예.</p>
  </a>
</div>
