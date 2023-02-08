import{r as s,o as l,c as a,e,a as o}from"./app.64b8c0f0.js";const n=o('<h1 id="conditional-rendering" tabindex="-1">조건부 렌더링 <a class="header-anchor" href="#conditional-rendering" aria-hidden="true">#</a></h1><h2 id="v-if" tabindex="-1"><code>v-if</code> <a class="header-anchor" href="#v-if" aria-hidden="true">#</a></h2><p><code>v-if</code> 디렉티브는 조건부로 블록을 렌더링하는 데 사용됩니다. 블록은 디렉티브 표현식이 truthy 값을 반환하는 경우에만 렌더링됩니다.</p><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Vue는 정말 멋지죠!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="v-else" tabindex="-1"><code>v-else</code> <a class="header-anchor" href="#v-else" aria-hidden="true">#</a></h2><p><code>v-else</code> 디렉티브를 사용하여 <code>v-if</code>에 대한 &quot;else 블록&quot;을 나타낼 수 있습니다:</p><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;"> = !</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">전환</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Vue는 정말 멋지죠!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">아닌가요? 😢</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div>',7),p={class:"demo"},t={key:0},c={key:1},i=o('<div class="composition-api"><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj7soITtmZg8L2J1dHRvbj5cbiAgXG4gIDxoMSB2LWlmPVwiYXdlc29tZVwiPlZ1ZeuKlCDsoJXrp5Ag66mL7KeA7KOgITwvaDE+XG4gIDxoMSB2LWVsc2U+7JWE64uM6rCA7JqUPyDwn5iiPC9oMT5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==" target="_blank" rel="noreferrer">온라인 연습장으로 실행하기</a></p></div><div class="options-api"><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj7soITtmZg8L2J1dHRvbj5cbiAgXG4gIDxoMSB2LWlmPVwiYXdlc29tZVwiPlZ1ZeuKlCDsoJXrp5Ag66mL7KeA7KOgITwvaDE+XG4gIDxoMSB2LWVsc2U+7JWE64uM6rCA7JqUPyDwn5iiPC9oMT5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ2dWUvc2VydmVyLXJlbmRlcmVyXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3NlcnZlci1yZW5kZXJlci5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==" target="_blank" rel="noreferrer">온라인 연습장으로 실행하기</a></p></div><p><code>v-else</code> 엘리먼트는 <code>v-if</code> 또는 <code>v-else-if</code> 엘리먼트 바로 다음에 와야 합니다. 그렇지 않으면 인식되지 않습니다.</p><h2 id="v-else-if" tabindex="-1"><code>v-else-if</code> <a class="header-anchor" href="#v-else-if" aria-hidden="true">#</a></h2><p><code>v-else-if</code>는 이름에서 알 수 있듯이 <code>v-if</code>에 대한 &quot;else if 블록&quot; 역할을 합니다. 여러 번 연결될 수도 있습니다:</p><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  A</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  B</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  C</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  A/B/C 아님</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>v-else</code>와 마찬가지로 <code>v-else-if</code> 엘리먼트는 <code>v-if</code> 또는 <code>v-else-if</code> 엘리먼트 바로 다음에 와야 합니다.</p><h2 id="v-if-on-template" tabindex="-1"><code>&lt;template&gt;</code>에서 <code>v-if</code> <a class="header-anchor" href="#v-if-on-template" aria-hidden="true">#</a></h2><p><code>v-if</code>는 디렉티브이므로 단일 엘리먼트에 연결해야 합니다. 하지만 둘 이상의 엘리먼트를 전환하려면 어떻게 해야 할까요? 이 경우 보이지 않는 래퍼 역할을 하는 <code>&lt;template&gt;</code> 엘리먼트에 <code>v-if</code>를 사용할 수 있습니다. 최종 렌더링된 결과에는 <code>&lt;template&gt;</code> 엘리먼트가 포함되지 않습니다.</p><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">ok</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">제목</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">단락 1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">단락 2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>v-else</code> 및 <code>v-else-if</code>는 <code>&lt;template&gt;</code>에서도 사용할 수 있습니다.</p><h2 id="v-show" tabindex="-1"><code>v-show</code> <a class="header-anchor" href="#v-show" aria-hidden="true">#</a></h2><p>엘리먼트를 조건부로 표시하는 다른 옵션은 <code>v-show</code> 디렉티브입니다. 사용법은 대체로 동일합니다:</p><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-show</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">ok</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">안녕!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>차이점은 <code>v-show</code>가 있는 엘리먼트는 항상 렌더링되고 DOM에 남아 있다는 것입니다. <code>v-show</code>는 엘리먼트의 <code>display</code> CSS 속성만 전환합니다.</p><p><code>v-show</code>는 <code>&lt;template&gt;</code> 엘리먼트를 지원하지 않으며 <code>v-else</code>와 상호작용하지 않습니다.</p><h2 id="v-if-vs-v-show" tabindex="-1"><code>v-if</code> vs <code>v-show</code> <a class="header-anchor" href="#v-if-vs-v-show" aria-hidden="true">#</a></h2><p><code>v-if</code>는 &quot;실제&quot; 조건부 렌더링입니다. 왜냐하면 조건부 블록이 전환될 경우, 블록 내 이벤트 리스너와 자식 컴포넌트가 제대로 제거되거나 재생성되기 때문입니다.</p><p>또한 <code>v-if</code>는 <strong>게으르므로</strong>(lazy), 초기 조건이 false면 아무 작업도 수행하지 않습니다. 조건부 블록은 조건이 true가 될 때까지 렌더링되지 않습니다.</p><p>이에 비해 <code>v-show</code>는 훨씬 간단합니다. 엘리먼트는 CSS 기반으로 전환 되므로, 초기 조건과 관계없이 항상 렌더링 됩니다.</p><p>일반적으로 <code>v-if</code>는 전환 비용이 더 높고, <code>v-show</code>는 초기 렌더링 비용이 더 높습니다. 따라서 매우 자주 전환해야 하는 경우 <code>v-show</code>를, 실행 중에 조건이 변경되지 않는 경우 <code>v-if</code>를 사용하는 것이 좋습니다.</p><h2 id="v-if-with-v-for" tabindex="-1"><code>v-if</code> with <code>v-for</code> <a class="header-anchor" href="#v-if-with-v-for" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">참고</p><p><code>v-if</code>와 <code>v-for</code>를 함께 사용하는 것은 <strong>권장되지 않습니다</strong>.</p><p>자세한 내용은 <a href="/style-guide/rules-essential.html#avoid-v-if-with-v-for">스타일 가이드</a> 를 참조하세요.</p></div><p>엘리먼트에 <code>v-if</code>와 <code>v-for</code>를 함께 사용하면 <code>v-if</code>가 먼저 평가됩니다. 자세한 내용은 <a href="./list.html#v-for-with-v-if">리스트 렌더링 가이드</a>를 참조하세요.</p>',24),r=JSON.parse('{"title":"조건부 렌더링","description":"","frontmatter":{},"headers":[{"level":2,"title":"v-if","slug":"v-if","link":"#v-if","children":[]},{"level":2,"title":"v-else","slug":"v-else","link":"#v-else","children":[]},{"level":2,"title":"v-else-if","slug":"v-else-if","link":"#v-else-if","children":[]},{"level":2,"title":"<template>에서 v-if","slug":"v-if-on-template","link":"#v-if-on-template","children":[]},{"level":2,"title":"v-show","slug":"v-show","link":"#v-show","children":[]},{"level":2,"title":"v-if vs v-show","slug":"v-if-vs-v-show","link":"#v-if-vs-v-show","children":[]},{"level":2,"title":"v-if with v-for","slug":"v-if-with-v-for","link":"#v-if-with-v-for","children":[]}],"relativePath":"guide/essentials/conditional.md"}'),d=Object.assign({name:"guide/essentials/conditional.md"},{setup(o){const r=s(!0);return(s,o)=>(l(),a("div",null,[n,e("div",p,[e("button",{onClick:o[0]||(o[0]=s=>r.value=!r.value)},"전환"),r.value?(l(),a("h1",t,"Vue는 정말 멋지죠!")):(l(),a("h1",c,"아닌가요? 😢"))]),i]))}});export{r as __pageData,d as default};
