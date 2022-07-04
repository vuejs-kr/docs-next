import{_ as e,c as r,o as t,a}from"./app.60b648c0.js";const o='{"title":"도구","description":"","frontmatter":{},"headers":[{"level":2,"title":"온라인으로 사용해보기","slug":"try-it-online"},{"level":2,"title":"프로젝트의 스케폴딩","slug":"project-scaffolding"},{"level":3,"title":"Vite","slug":"vite"},{"level":3,"title":"Vue CLI","slug":"vue-cli"},{"level":3,"title":"브라우저 내 템플릿 편집에 대한 참고 사항","slug":"note-on-in-browser-template-compilation"},{"level":2,"title":"IDE 지원","slug":"ide-support"},{"level":2,"title":"브라우저 개발자 도구","slug":"browser-devtools"},{"level":2,"title":"타입스크립트","slug":"typescript"},{"level":2,"title":"테스팅","slug":"testing"},{"level":2,"title":"Linting(코드 유효성 검사)","slug":"linting"},{"level":2,"title":"Formatting","slug":"formatting"},{"level":2,"title":"SFC의 커스텀 블록 통합하기","slug":"sfc-custom-block-integrations"},{"level":2,"title":"저수준 패키지","slug":"lower-level-packages"},{"level":3,"title":"@vue/compiler-sfc","slug":"vue-compiler-sfc"},{"level":3,"title":"@vitejs/plugin-vue","slug":"vitejs-plugin-vue"},{"level":3,"title":"vue-loader","slug":"vue-loader"},{"level":2,"title":"기타 온라인 연습장","slug":"other-online-playgrounds"}],"relativePath":"guide/scaling-up/tooling.md"}',l={},i=[a('<h1 id="tooling" tabindex="-1">도구 <a class="header-anchor" href="#tooling" aria-hidden="true">#</a></h1><h2 id="try-it-online" tabindex="-1">온라인으로 사용해보기 <a class="header-anchor" href="#try-it-online" aria-hidden="true">#</a></h2><p>Vue SFC를 사용해 보기 위해서 컴퓨터에 무엇을 설치할 필요가 없습니다. 브라우저에서 바로 실행할 수 있는 온라인 연습장이 있습니다:</p><ul><li><a href="https://sfc.vuejs.org" target="_blank" rel="noopener noreferrer">Vue SFC 온라인 연습장</a><ul><li>항상 최신 버전 상태</li><li>컴포넌트 컴파일 결과를 확인할 수 있도록 설계</li></ul></li><li><a href="https://vite.new/vue" target="_blank" rel="noopener noreferrer">StackBlitz(Vue + Vite)</a><ul><li>브라우저에서 실제 Vite 개발 서버를 실행하는 IDE와 유사한 환경</li><li>로컬 설정과 유사한 환경</li></ul></li></ul><p>또한 버그 신고 시 이러한 온라인 연습장을 사용하여 재현 코드를 제공하는 것이 좋습니다.</p><h2 id="project-scaffolding" tabindex="-1">프로젝트의 스케폴딩 <a class="header-anchor" href="#project-scaffolding" aria-hidden="true">#</a></h2><h3 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-hidden="true">#</a></h3><p><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite</a>는 Vue SFC를 지원하는 가볍고 빠른 최신 빌드 도구입니다. Vue의 저자이기도 한 Evan You가 만들었습니다!</p><p>Vite + Vue를 시작하려면 다음을 실행하기만 하면 됩니다:</p><div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">$</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div><p>이 명령은 공식 Vue 프로젝트 스캐폴딩 도구인 <a href="https://github.com/vuejs/create-vue" target="_blank" rel="noopener noreferrer">create-vue</a>를 설치하고 실행합니다.</p><ul><li>Vite에 대한 자세한 내용은 <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite 문서</a>를 확인하세요.</li><li>Vite 프로젝트에서 Vue 관련 동작을 구성하려면(예: Vue 컴파일러에 옵션 전달) <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme" target="_blank" rel="noopener noreferrer">@vitejs/plugin-vue</a> 문서를 확인하세요.</li></ul><p>위에서 언급한 두 온라인 연습장는 Vite 프로젝트 파일로 다운로드를 지원합니다.</p><h3 id="vue-cli" tabindex="-1">Vue CLI <a class="header-anchor" href="#vue-cli" aria-hidden="true">#</a></h3><p><a href="https://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue CLI</a>는 웹팩 기반의 Vue 공식 툴체인입니다. 특정 웹팩 전용 기능에 의존하는 유지보수 상태가 아니라면, Vite로 새 프로젝트를 시작하는 것이 좋습니다. Vite는 대부분의 경우 우수한 개발자 경험을 제공합니다.</p><p>Vue CLI에서 Vite로 마이그레이션하는 방법에 대한 정보:</p><ul><li><a href="https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/" target="_blank" rel="noopener noreferrer">VueSchool.io에서 Vue CLI -&gt; Vite 마이그레이션 가이드에 대해 알아보기(영문)</a></li><li><a href="https://github.com/vitejs/awesome-vite#vue-cli" target="_blank" rel="noopener noreferrer">자동 마이그레이션에 도움이 되는 도구/플러그인</a></li></ul><h3 id="note-on-in-browser-template-compilation" tabindex="-1">브라우저 내 템플릿 편집에 대한 참고 사항 <a class="header-anchor" href="#note-on-in-browser-template-compilation" aria-hidden="true">#</a></h3><p>빌드 단계 없이 Vue를 사용할 때, 컴포넌트 템플릿은 페이지의 HTML에 직접 작성되거나 인라인된 JavaScript 문자열로 작성됩니다. 이러한 경우 Vue는 즉시 템플릿 컴파일을 수행하기 위해 템플릿 컴파일러를 브라우저에 제공해야 합니다. 반면에 빌드 단계로 템플릿을 미리 컴파일하면 컴파일러가 필요하지 않습니다. 클라이언트 번들 크기를 줄이기 위해 Vue는 다양한 사용 사례에 최적화된 <a href="https://unpkg.com/browse/vue@3/dist/" target="_blank" rel="noopener noreferrer">다른 &quot;빌드&quot;</a>를 제공합니다.</p><ul><li><p><code>vue.runtime.*</code>으로 시작하는 빌드 파일은 <strong>런타임 전용 빌드</strong>입니다. 컴파일러를 포함하지 않습니다. 이러한 빌드를 사용할 때 모든 템플릿은 빌드 단계를 통해 사전 컴파일되어야 합니다.</p></li><li><p><code>.runtime</code>을 포함하지 않는 빌드 파일은 <strong>전체 빌드</strong>입니다. 컴파일러를 포함하고 브라우저에서 직접 템플릿 컴파일을 지원합니다. 그러나 페이로드가 ~14kb 증가합니다.</p></li></ul><p>SFC의 모든 템플릿이 미리 컴파일되어 있기 때문에 기본 도구 설정은 런타임 전용 빌드를 사용합니다. 어떤 이유로 빌드 단계에서도 브라우저 내 템플릿 컴파일이 필요한 경우, <code>vue</code>의 대신 <code>vue/dist/vue.esm-bundler.js</code>로 지정하여 빌드 도구를 구성하면 됩니다.</p><p>빌드 단계가 없는 사용을 위한 더 가벼운 대안을 찾고 있다면 <a href="https://github.com/vuejs/petite-vue" target="_blank" rel="noopener noreferrer">petite-vue</a>를 확인하십시오.</p><h2 id="ide-support" tabindex="-1">IDE 지원 <a class="header-anchor" href="#ide-support" aria-hidden="true">#</a></h2><ul><li><p>권장 IDE 설정은 <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">VSCode</a> + <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener noreferrer">Volar</a>입니다. Volar는 문법 강조 표시, TypeScript 지원, 템플릿 표현식 및 컴포넌트 props에 대한 인텔리센스를 제공합니다.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Volar는 Vue 2 전용 공식 VSCode 확장인 <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" rel="noopener noreferrer">Vetur</a>를 대체합니다. 현재 Vetur가 설치되어 있는 경우 Vue 3 프로젝트에서 비활성화해야 합니다.</p></div></li><li><p><a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noopener noreferrer">WebStorm</a>은 Vue SFC에 대한 지원을 기본적으로 제공하며 매우 훌륭합니다.</p></li><li><p><a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noopener noreferrer">Language Service Protocol</a>(LSP)을 지원하는 다른 IDE도 LSP를 통해 Volar의 핵심 기능을 활용할 수 있습니다.</p><ul><li><p>서브라임 텍스트(Sublime Text): <a href="https://github.com/sublimelsp/LSP-volar" target="_blank" rel="noopener noreferrer">LSP-Volar</a></p></li><li><p>vim / Neovim: <a href="https://github.com/yaegassy/coc-volar" target="_blank" rel="noopener noreferrer">coc-volar</a></p></li><li><p>emacs: <a href="https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/" target="_blank" rel="noopener noreferrer">lsp-mode</a></p></li></ul></li></ul><h2 id="browser-devtools" tabindex="-1">브라우저 개발자 도구 <a class="header-anchor" href="#browser-devtools" aria-hidden="true">#</a></h2><p>Vue 브라우저 개발자 도구 확장 프로그램을 사용하면, Vue 앱의 컴포넌트 트리를 탐색하고 개별 컴포넌트의 상태를 검사하고 상태 관리 이벤트 및 프로필 성능을 추적할 수 있습니다.</p><p><img src="https://raw.githubusercontent.com/vuejs/devtools/main/media/screenshot-shadow.png" alt=""></p><ul><li><a href="https://devtools.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue 브라우저 개발자 도구 문서</a></li><li><a href="https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd" target="_blank" rel="noopener noreferrer">Chrome 확장 프로그램</a></li><li><a href="https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/" target="_blank" rel="noopener noreferrer">Firefox 애드온</a></li><li><a href="https://devtools.vuejs.org/guide/installation.html#standalone" target="_blank" rel="noopener noreferrer">독립형 Electron 앱</a></li></ul><h2 id="typescript" tabindex="-1">타입스크립트 <a class="header-anchor" href="#typescript" aria-hidden="true">#</a></h2><p>주요 내용: <a href="/guide/typescript/overview.html">TypeScript로 Vue 사용하기</a>.</p><ul><li><p><a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener noreferrer">Volar</a>는 템플릿 표현식 및 교차 컴포넌트 props 유효성 검사를 포함하여 <code>&lt;script lang=&quot;ts&quot;&gt;</code> 블록을 사용하여 SFC에 대한 유형 검사를 제공합니다.</p></li><li><p>명령줄에서 동일한 유형 검사를 수행하거나 SFC용 <code>d.ts</code> 파일을 생성하려면 <a href="https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc" target="_blank" rel="noopener noreferrer"><code>vue-tsc</code></a>를 사용합니다.</p></li></ul><h2 id="testing" tabindex="-1">테스팅 <a class="header-anchor" href="#testing" aria-hidden="true">#</a></h2><p>주요 내용: <a href="/guide/scaling-up/testing.html">테스팅 가이드</a>.</p><ul><li><p><a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer">Cypress</a>는 E2E 테스트에 권장됩니다. <a href="https://docs.cypress.io/guides/component-testing/introduction" target="_blank" rel="noopener noreferrer">Cypress 컴포넌트 테스트 러너</a>를 통해 Vue SFC에 대한 컴포넌트 테스트에도 사용할 수 있습니다.</p></li><li><p><a href="https://vitest.dev/" target="_blank" rel="noopener noreferrer">Vitest</a>는 속도를 중시하는 Vue/Vite 팀원들이 만든 테스트 러너입니다. Vite 기반 앱이 유닛/컴포넌트 테스트를 위해 동일한 즉각적인 피드백 루프를 제공하도록 특별히 설계되었습니다.</p></li><li><p><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">Jest</a>는 <a href="https://github.com/sodatea/vite-jest" target="_blank" rel="noopener noreferrer">vite-jest</a>를 통해 Vite와 함께 작동하도록 만들 수 있습니다. 그러나 이는 Vitest가 훨씬 더 효율적인 통합으로 유사한 기능을 제공하므로, Vite 기반 설정으로 마이그레이션해야 하는 기존 Jest 기반 테스트 제품군이 있는 경우에만 권장됩니다.</p></li></ul><h2 id="linting" tabindex="-1">Linting(코드 유효성 검사) <a class="header-anchor" href="#linting" aria-hidden="true">#</a></h2><p>Vue 팀은 SFC별 린팅 규칙을 지원하는 <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer">ESLint</a> 플러그인인 <a href="https://github.com/vuejs/eslint-plugin-vue" target="_blank" rel="noopener noreferrer">eslint-plugin-vue</a>를 유지 관리합니다.</p><p>이전에 Vue CLI를 사용하던 사용자는 웹팩 로더를 통해 린터를 구성하는 데 익숙할 수 있습니다. 그러나 Vite 기반 빌드 설정을 사용할 때 일반적인 권장 사항은 다음과 같습니다.</p><ol><li><p><code>npm install -D eslint eslint-plugin-vue</code>를 실행한 다음 <code>eslint-plugin-vue</code>의 <a href="https://eslint.vuejs.org/user-guide/#usage" target="_blank" rel="noopener noreferrer">설정 가이드</a>를 따릅니다.</p></li><li><p><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">VSCode용 ESLint</a>와 같은 IDE 확장 ESLint를 설정하면, 개발 중에 편집기에서 바로 린터 피드백을 얻을 수 있습니다. 이것은 개발 서버를 시작할 때 불필요한 Linting 비용을 방지합니다.</p></li><li><p>프로덕션 빌드 명령의 일부로 ESLint를 실행하여 프로덕션으로 빌드 실행하기 전에 전체 린터 피드백을 받습니다.</p></li><li><p>(선택 사항) git commit 시 수정된 파일을 자동으로 린트하도록 <a href="https://github.com/okonet/lint-staged" target="_blank" rel="noopener noreferrer">lint-staged</a>와 같은 도구를 설정합니다.</p></li></ol><h2 id="formatting" tabindex="-1">Formatting <a class="header-anchor" href="#formatting" aria-hidden="true">#</a></h2><ul><li><p>VSCode 확장 <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener noreferrer">Volar</a>는 Vue SFC에 대한 포멧팅을 즉시 제공합니다.</p></li><li><p>또는 <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer">Prettier</a>는 빌트인 Vue SFC 형식 지원을 제공합니다.</p></li></ul><h2 id="sfc-custom-block-integrations" tabindex="-1">SFC의 커스텀 블록 통합하기 <a class="header-anchor" href="#sfc-custom-block-integrations" aria-hidden="true">#</a></h2><p>커스텀 블록은 다른 리퀘스트 쿼리로 가져온 동일한 Vue 파일로 컴파일 됩니다. 이러한 가져오기 요청을 처리하는 것은 기본 빌드 도구에 달려 있습니다.</p><ul><li><p>Vite를 사용하는 경우, 일치하는 커스텀 블록을 실행 가능한 JavaScript로 변환하려면, 커스텀 Vite 플러그인을 사용해야 합니다. <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks" target="_blank" rel="noopener noreferrer">예제</a></p></li><li><p>Vue CLI 또는 일반 웹팩을 사용하는 경우, 일치하는 블록을 변환하도록 웹팩 로더를 구성해야 합니다. <a href="https://vue-loader.vuejs.org/guide/custom-blocks.html" target="_blank" rel="noopener noreferrer">예제</a></p></li></ul><h2 id="lower-level-packages" tabindex="-1">저수준 패키지 <a class="header-anchor" href="#lower-level-packages" aria-hidden="true">#</a></h2><h3 id="vue-compiler-sfc" tabindex="-1"><code>@vue/compiler-sfc</code> <a class="header-anchor" href="#vue-compiler-sfc" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/vuejs/core/tree/main/packages/compiler-sfc" target="_blank" rel="noopener noreferrer">Docs</a></li></ul><p>이 패키지는 Vue 핵심 모노레포의 일부이며 항상 기본 <code>vue</code> 패키지와 동일한 버전으로 게시됩니다. 기본 <code>vue</code> 패키지의 종속성으로 포함되며 <code>vue/compiler-sfc</code> 아래에 프록시되므로 개별적으로 설치할 필요가 없습니다.</p><p>패키지 자체는 Vue SFC 처리를 위한 저수준 유틸리티를 제공하며, 커스텀 툴에서 Vue SFC를 지원해야 하는 툴 개발자를 위한 것입니다.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>이 패키지의 버전이 Vue 런타임과 동기화되도록 하려면 항상 <code>vue/compiler-sfc</code> deep import를 통해 이 패키지를 사용하는 것이 좋습니다.</p></div><h3 id="vitejs-plugin-vue" tabindex="-1"><code>@vitejs/plugin-vue</code> <a class="header-anchor" href="#vitejs-plugin-vue" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/vitejs/vite/tree/main/packages/plugin-vue" target="_blank" rel="noopener noreferrer">Docs</a></li></ul><p>Vite에서 Vue SFC 지원을 제공하는 공식 플러그인입니다.</p><h3 id="vue-loader" tabindex="-1"><code>vue-loader</code> <a class="header-anchor" href="#vue-loader" aria-hidden="true">#</a></h3><ul><li><a href="https://vue-loader.vuejs.org/" target="_blank" rel="noopener noreferrer">Docs</a></li></ul><p>webpack에서 Vue SFC 지원을 제공하는 공식 로더입니다. Vue CLI를 사용하는 경우, <a href="https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader" target="_blank" rel="noopener noreferrer">Vue CLI에서 <code>vue-loader</code> 옵션 수정에 대한 문서</a>를 참조하세요.</p><h2 id="other-online-playgrounds" tabindex="-1">기타 온라인 연습장 <a class="header-anchor" href="#other-online-playgrounds" aria-hidden="true">#</a></h2><ul><li><a href="https://play.vueuse.org" target="_blank" rel="noopener noreferrer">VueUse 연습장</a></li><li><a href="https://replit.com/@templates/VueJS-with-Vite" target="_blank" rel="noopener noreferrer">Repl.it(Vue + Vite)</a></li><li><a href="https://codesandbox.io/s/vue-3" target="_blank" rel="noopener noreferrer">CodeSandbox</a></li><li><a href="https://codepen.io/pen/editor/vue" target="_blank" rel="noopener noreferrer">Codepen</a></li><li><a href="https://components.studio/create/vue3" target="_blank" rel="noopener noreferrer">Components.studio</a></li><li><a href="https://webcomponents.dev/create/cevue" target="_blank" rel="noopener noreferrer">WebComponents.dev</a></li></ul>',57)];var n=e(l,[["render",function(e,a,o,l,n,s){return t(),r("div",null,i)}]]);export{o as __pageData,n as default};
