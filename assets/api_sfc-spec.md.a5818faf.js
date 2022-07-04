import{_ as s,c as a,o as l,a as e}from"./app.60b648c0.js";const n='{"title":"SFC 문법 설명서","description":"","frontmatter":{},"headers":[{"level":2,"title":"개요","slug":"overview"},{"level":2,"title":"언어 블럭","slug":"language-blocks"},{"level":3,"title":"<template>","slug":"template"},{"level":3,"title":"<script>","slug":"script"},{"level":3,"title":"<script setup>","slug":"script-setup"},{"level":3,"title":"<style>","slug":"style"},{"level":3,"title":"커스텀 블럭","slug":"custom-blocks"},{"level":2,"title":"자동으로 이름 추론","slug":"automatic-name-inference"},{"level":2,"title":"전처리기","slug":"pre-processors"},{"level":2,"title":"Src 가져오기","slug":"src-imports"},{"level":2,"title":"주석","slug":"comments"}],"relativePath":"api/sfc-spec.md"}',p={},o=[e('<h1 id="sfc-syntax-specification" tabindex="-1">SFC 문법 설명서 <a class="header-anchor" href="#sfc-syntax-specification" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">개요 <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>일반적으로 <code>*.vue</code> 파일 확장자를 사용하는 Vue 싱글 파일 컴포넌트(SFC)는 HTML과 유사한 문법을 사용하여 Vue 컴포넌트를 설명하는 커스텀 파일 형식입니다. Vue SFC는 HTML과 문법적으로 호환됩니다.</p><p>각 <code>*.vue</code> 파일은 세 가지 유형의 최상위 언어 블록(<code>&lt;template&gt;</code>, <code>&lt;script&gt;</code>, <code>&lt;style&gt;</code>)과 선택적으로 추가 커스텀 블록으로 구성됩니다:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">안녕 Vue!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">example</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;custom1&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">예를 들어 컴포넌트 설명서가 될 수 있습니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;/custom1&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="language-blocks" tabindex="-1">언어 블럭 <a class="header-anchor" href="#language-blocks" aria-hidden="true">#</a></h2><h3 id="template" tabindex="-1"><code>&lt;template&gt;</code> <a class="header-anchor" href="#template" aria-hidden="true">#</a></h3><ul><li><p><code>*.vue</code> 파일은 최상위 <code>&lt;template&gt;</code> 블록은 하나만 포함할 수 있습니다.</p></li><li><p>콘텐츠는 추출되어 <code>@vue/compiler-dom</code>으로 전달되고, JavaScript 렌더 함수로 사전 컴파일되며, 내보낸 컴포넌트에 <code>render</code> 옵션으로 첨부됩니다.</p></li></ul><h3 id="script" tabindex="-1"><code>&lt;script&gt;</code> <a class="header-anchor" href="#script" aria-hidden="true">#</a></h3><ul><li><p><code>*.vue</code> 파일은 하나의 <code>&lt;script&gt;</code> 블록만 포함할 수 있습니다(<a href="/api/sfc-script-setup.html"><code>&lt;script setup&gt;</code></a> 제외).</p></li><li><p>스크립트는 ES 모듈로 실행됩니다.</p></li><li><p><strong>기본 내보내기</strong>는 일반 객체 또는 <a href="/api/general.html#definecomponent">defineComponent</a>의 반환 값으로 Vue 컴포넌트 옵션 객체여야 합니다.</p></li></ul><h3 id="script-setup" tabindex="-1"><code>&lt;script setup&gt;</code> <a class="header-anchor" href="#script-setup" aria-hidden="true">#</a></h3><ul><li><p><code>*.vue</code> 파일은 하나의 <code>&lt;script setup&gt;</code> 블록만 포함할 수 있습니다(일반 <code>&lt;script&gt;</code> 제외).</p></li><li><p>스크립트는 전처리되어 컴포넌트의 <code>setup()</code> 함수로 사용됩니다. 즉, <strong>컴포넌트의 각 인스턴스</strong>에 대해 실행됩니다. <code>&lt;script setup&gt;</code> 내에 최상위 바인딩은 템플릿에 자동으로 노출됩니다. 자세한 내용은 <a href="/api/sfc-script-setup.html"><code>&lt;script setup&gt;</code> 전용 문서</a>를 참조하십시오.</p></li></ul><h3 id="style" tabindex="-1"><code>&lt;style&gt;</code> <a class="header-anchor" href="#style" aria-hidden="true">#</a></h3><ul><li><p><code>*.vue</code> 파일에는 여러 <code>&lt;style&gt;</code> 태그가 포함될 수 있습니다.</p></li><li><p><code>&lt;style&gt;</code> 태그는 현재 컴포넌트에 스타일을 캡슐화하는 데 도움이 되도록, <code>scoped</code> 또는 <code>module</code> 속성(자세한 내용은 <a href="/api/sfc-css-features.html">SFC 스타일 특징</a> 참고)을 가질 수 있습니다. 캡슐화 모드가 다른 여러 <code>&lt;style&gt;</code> 태그를 동일한 컴포넌트에 혼합할 수 있습니다.</p></li></ul><h3 id="custom-blocks" tabindex="-1">커스텀 블럭 <a class="header-anchor" href="#custom-blocks" aria-hidden="true">#</a></h3><p>프로젝트별 요구 사항에 따라 <code>*.vue</code> 파일에 추가 커스텀 블록을 포함할 수 있습니다(예: <code>&lt;docs&gt;</code> 블록). 커스텀 블록의 실제 예는 다음과 같습니다:</p><ul><li><a href="https://gridsome.org/docs/querying-data/" target="_blank" rel="noopener noreferrer">Gridsome: <code>&lt;page-query&gt;</code></a></li><li><a href="https://github.com/wheatjs/vite-plugin-vue-gql" target="_blank" rel="noopener noreferrer">vite-plugin-vue-gql: <code>&lt;gql&gt;</code></a></li><li><a href="https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block" target="_blank" rel="noopener noreferrer">vue-i18n: <code>&lt;i18n&gt;</code></a></li></ul><p>커스텀 블록 처리는 도구에 따라 다릅니다. 자체 커스텀 블록 통합을 구축하려는 경우 자세한 내용은 <a href="/guide/scaling-up/tooling.html#sfc-custom-block-integrations">도구 섹션</a>을 참고하십시오.</p><h2 id="automatic-name-inference" tabindex="-1">자동으로 이름 추론 <a class="header-anchor" href="#automatic-name-inference" aria-hidden="true">#</a></h2><p>다음과 같은 경우, SFC <strong>파일 이름</strong>에서 컴포넌트의 이름을 자동으로 유추합니다:</p><ul><li>개발 경고 포멧팅</li><li>DevTools 검사</li><li>재귀적 자기 참조. 예를 들어 <code>FooBar.vue</code>라는 파일은 템플릿에서 <code>&lt;FooBar/&gt;</code>로 자신을 참조할 수 있음. 명시적으로 등록/가져온 컴포넌트보다 우선 순위가 낮음.</li></ul><h2 id="pre-processors" tabindex="-1">전처리기 <a class="header-anchor" href="#pre-processors" aria-hidden="true">#</a></h2><p>블록은 <code>lang</code> 속성을 사용하여 전처리기 언어를 선언할 수 있습니다. 가장 일반적인 경우는 <code>&lt;script&gt;</code> 블록에 TypeScript를 사용하는 것입니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  // TypeScript 사용</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>lang</code>은 모든 블록에 적용할 수 있습니다. 예를 들어 <code>&lt;style&gt;</code>에서는 <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">SASS</a>를, <code>&lt;template&gt;</code>에서는 <a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noopener noreferrer">Pug</a>를 사용할 수 있습니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pug</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">p </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  $primary-color: #333;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  body {</span></span>\n<span class="line"><span style="color:#A6ACCD;">    color: $primary-color;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  }</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>다양한 전처리기와의 통합은 툴체인에 따라 다를 수 있습니다. 예제를 보려면 해당 문서를 확인하십시오:</p><ul><li><a href="https://vitejs.dev/guide/features.html#css-pre-processors" target="_blank" rel="noopener noreferrer">Vite</a></li><li><a href="https://cli.vuejs.org/guide/css.html#pre-processors" target="_blank" rel="noopener noreferrer">Vue CLI</a></li><li><a href="https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors" target="_blank" rel="noopener noreferrer">webpack + vue-loader</a></li></ul><h2 id="src-imports" tabindex="-1">Src 가져오기 <a class="header-anchor" href="#src-imports" aria-hidden="true">#</a></h2><p><code>*.vue</code> 컴포넌트를 여러 파일로 분할하는 것을 선호하는 경우, <code>src</code> 속성을 사용하여 언어 블록에서 외부 파일을 가져올 수 있습니다:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./template.html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./style.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./script.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>src</code> 가져오기는 웹팩 모듈 요청과 동일한 경로 확인 규칙을 따릅니다. 즉, 다음을 의미합니다:</p><ul><li>상대 경로는 <code>./</code>로 시작해야 함.</li><li>npm 종속성에서 리소스를 가져올 수 있음.</li></ul><div class="language-vue"><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 설치된 &quot;todomvc-app-css&quot; npm 패키지에서 파일 가져오기 --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">todomvc-app-css/index.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> /</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>src</code> 가져오기는 커스텀 블록에서도 작동합니다. 예를들어:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#A6ACCD;">&lt;unit-test src=&quot;./unit-test.js&quot;&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;/unit-test&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="comments" tabindex="-1">주석 <a class="header-anchor" href="#comments" aria-hidden="true">#</a></h2><p>각 블록 내에서 사용 중인 언어(HTML, CSS, JavaScript, Pug 등)의 주석 문법을 사용해야 합니다. 최상위 주석의 경우 HTML 주석 문법을 사용하십시오: <code>&lt;!-- 컴포넌트 주석 --&gt;</code></p>',38)];var t=s(p,[["render",function(s,e,n,p,t,c){return l(),a("div",null,o)}]]);export{n as __pageData,t as default};
