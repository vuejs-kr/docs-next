import{r as e,c as s,d as o,j as l,a,L as n,o as t}from"./app.3c904b4a.js";const c=a('<div class="warning custom-block"><p class="custom-block-title">현재 이 문서는 번역 작업이 진행중입니다</p></div><h1 id="conditional-rendering" tabindex="-1">Conditional Rendering <a class="header-anchor" href="#conditional-rendering" aria-hidden="true">#</a></h1><h1 id="조건부-렌더링" tabindex="-1">조건부 렌더링 <a class="header-anchor" href="#조건부-렌더링" aria-hidden="true">#</a></h1>',3),p={class:"options-api"},i={class:"composition-api"},d=a('<h2 id="v-if" tabindex="-1"><code>v-if</code> <a class="header-anchor" href="#v-if" aria-hidden="true">#</a></h2><p>The directive <code>v-if</code> is used to conditionally render a block. The block will only be rendered if the directive&#39;s expression returns a truthy value.</p><p><code>v-if</code> 디렉티브는 조건에 따라 블록을 렌더링할 때 사용합니다. 블록은 디렉티브의 표현식이 true 값을 반환할 때만 렌더링됩니다.</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Vue is awesome!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="v-else" tabindex="-1"><code>v-else</code> <a class="header-anchor" href="#v-else" aria-hidden="true">#</a></h2><p>You can use the <code>v-else</code> directive to indicate an &quot;else block&quot; for <code>v-if</code>:</p><p><code>v-else</code> 디렉티브를 이용해 <code>v-if</code>의 &quot;else 블록&quot;을 표시할수 있습니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;"> = !</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Toggle</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">awesome</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Vue is awesome!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Oh no 😢</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div>',8),r={class:"demo"},v={key:0},D={key:1},F=a('<div class="composition-api"><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXdlc29tZSA9IHJlZih0cnVlKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=" target="_blank" rel="noopener noreferrer">Try it in the Playground</a></p></div><div class="options-api"><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgXHRyZXR1cm4ge1xuXHQgICAgYXdlc29tZTogdHJ1ZVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJhd2Vzb21lID0gIWF3ZXNvbWVcIj50b2dnbGU8L2J1dHRvbj5cblxuXHQ8aDEgdi1pZj1cImF3ZXNvbWVcIj5WdWUgaXMgYXdlc29tZSE8L2gxPlxuXHQ8aDEgdi1lbHNlPk9oIG5vIPCfmKI8L2gxPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=" target="_blank" rel="noopener noreferrer">Try it in the Playground</a></p></div><p>A <code>v-else</code> element must immediately follow a <code>v-if</code> or a <code>v-else-if</code> element - otherwise it will not be recognized.</p><p><code>v-else</code> 엘리먼트는 <code>v-if</code> 나 <code>v-else-if</code> 엘리먼트 바로 다음에 나와야 합니다. 그렇지 않으면 인식되지 않습니다.</p><h2 id="v-else-if" tabindex="-1"><code>v-else-if</code> <a class="header-anchor" href="#v-else-if" aria-hidden="true">#</a></h2><p>The <code>v-else-if</code>, as the name suggests, serves as an &quot;else if block&quot; for <code>v-if</code>. It can also be chained multiple times:</p><p>이름을 보면 알수 있듯이 <code>v-else-if</code>는 <code>v-if</code>의 &quot;else if 블럭&quot; 을 나타냅니다. 여러번 나올수 있습니다.</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  A</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  B</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;"> === </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C</span><span style="color:#89DDFF;">&#39;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  C</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-else</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  Not A/B/C</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Similar to <code>v-else</code>, a <code>v-else-if</code> element must immediately follow a <code>v-if</code> or a <code>v-else-if</code> element. <code>v-else</code> 와 마찬가지로 <code>v-else-if</code> 엘리먼트는 <code>v-if</code> 나 <code>v-else-if</code> 엘리먼트 바로 다음에 나와야 합니다.</p><h2 id="v-if-on-template" tabindex="-1"><code>v-if</code> on <code>&lt;template&gt;</code> <a class="header-anchor" href="#v-if-on-template" aria-hidden="true">#</a></h2><h3 id="template-에-v-if를-갖는-조건부-그룹-만들기" tabindex="-1"><code>&lt;template&gt;</code>에 <code>v-if</code>를 갖는 조건부 그룹 만들기 <a class="header-anchor" href="#template-에-v-if를-갖는-조건부-그룹-만들기" aria-hidden="true">#</a></h3><p>Because <code>v-if</code> is a directive, it has to be attached to a single element. But what if we want to toggle more than one element? In this case we can use <code>v-if</code> on a <code>&lt;template&gt;</code> element, which serves as an invisible wrapper. The final rendered result will not include the <code>&lt;template&gt;</code> element.</p><p><code>v-if</code>는 디렉티브이기 때문에 하나의 엘리먼트에 추가되어야 합니다. 하지만 둘 이상의 엘리먼트를 전환하려면 어떻게 해야 할까요? 이런 경우, <code>v-if</code>를 <code>&lt;template&gt;</code> 엘리먼트에 사용할 수 있습니다. <code>&lt;template&gt;</code> 엘리먼트는 눈에 보이지 않게 내부 엘리먼트를 감싸는 역할(invisible wrapper)을 하며, 최종 렌더링 결과에 포함되지 않습니다.</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">ok</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Title</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Paragraph 1</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Paragraph 2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>v-else</code> and <code>v-else-if</code> can also be used on <code>&lt;template&gt;</code>.</p><p><code>v-else</code> 나 <code>v-else-if</code>도 <code>&lt;template&gt;</code>에 나올수 있습니다.</p><h2 id="v-show" tabindex="-1"><code>v-show</code> <a class="header-anchor" href="#v-show" aria-hidden="true">#</a></h2><p>Another option for conditionally displaying an element is the <code>v-show</code> directive. The usage is largely the same:</p><p>엘리먼트를 조건에 따라 표시하기 위한 또 다른 방법으로 <code>v-show</code> 디렉티브가 있습니다. 사용 방법은 거의 동일합니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-show</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">ok</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Hello!</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>The difference is that an element with <code>v-show</code> will always be rendered and remain in the DOM; <code>v-show</code> only toggles the <code>display</code> CSS property of the element.</p><p>둘의 차이는 <code>v-show</code>를 쓴 엘리먼트의 경우, 항상 렌더링 되어 DOM에 남아있다는 점입니다. <code>v-show</code>는 단순히 엘리먼트의 CSS <code>display</code> 속성만을 전환합니다.</p><p><code>v-show</code> doesn&#39;t support the <code>&lt;template&gt;</code> element, nor does it work with <code>v-else</code>.</p><p><code>v-show</code>는 <code>&lt;template&gt;</code> 엘리먼트를 지원하지 않으며, <code>v-else</code>와 함께 쓸 수 없습니다.</p><h2 id="v-if-vs-v-show" tabindex="-1"><code>v-if</code> vs <code>v-show</code> <a class="header-anchor" href="#v-if-vs-v-show" aria-hidden="true">#</a></h2><h2 id="v-if-대-v-show" tabindex="-1"><code>v-if</code> 대 <code>v-show</code> <a class="header-anchor" href="#v-if-대-v-show" aria-hidden="true">#</a></h2><p><code>v-if</code> is &quot;real&quot; conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.</p><p><code>v-if</code>는 &quot;실제(real)&quot; 조건부 렌더링입니다. 전환 도중 조건부 블록 내부의 이벤트 리스너 및 자식 컴포넌트들이 올바르게 제거되고 다시 생성되기 때문입니다.</p><p><code>v-if</code> is also <strong>lazy</strong>: if the condition is false on initial render, it will not do anything - the conditional block won&#39;t be rendered until the condition becomes true for the first time.</p><p>또한 <code>v-if</code>는 <strong>게으릅니다(lazy)</strong>. 초기 렌더링 시, 조건이 거짓(false)이면 아무 작업도 하지 않습니다. 조건부 블록은 조건이 처음으로 참(true)이 될 때까지 렌더링되지 않습니다.</p><p>In comparison, <code>v-show</code> is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.</p><p>이에 비해 <code>v-show</code>는 훨씬 간단합니다. 엘리먼트는 CSS 기반 전환으로 초기 조건과 관계 없이 항상 렌더링됩니다. (역자 주: v-show는 엘리먼트를 DOM에 우선 렌더링하고 조건에 따라 CSS display:block/display:none 속성을 전환합니다.)</p><p>Generally speaking, <code>v-if</code> has higher toggle costs while <code>v-show</code> has higher initial render costs. So prefer <code>v-show</code> if you need to toggle something very often, and prefer <code>v-if</code> if the condition is unlikely to change at runtime.</p><p>일반적으로 <code>v-if</code>는 전환 비용이 높은 반면, <code>v-show</code>는 초기 렌더링 비용이 높습니다. 그러므로 무언가를 자주 전환해야 한다면 <code>v-show</code>를 사용하는 게 좋고, 런타임 시 조건이 변경되지 않는다면 <code>v-if</code>를 사용하는 게 더 낫습니다.</p><h2 id="v-if-with-v-for" tabindex="-1"><code>v-if</code> with <code>v-for</code> <a class="header-anchor" href="#v-if-with-v-for" aria-hidden="true">#</a></h2><h2 id="v-if-와-v-for" tabindex="-1"><code>v-if</code> 와 <code>v-for</code> <a class="header-anchor" href="#v-if-와-v-for" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">Note</p><p>It&#39;s <strong>not</strong> recommended to use <code>v-if</code> and <code>v-for</code> on the same element due to implicit precedence. Refer to <a href="/style-guide/rules-essential.html#avoid-v-if-with-v-for">style guide</a> for details.</p></div><div class="tip custom-block"><p class="custom-block-title">참고</p><p><code>v-if</code>와 <code>v-for</code>를 함께 쓰는 것은 <strong>권장하지 않습니다</strong>. 자세한 내용은 <a href="/style-guide/rules-essential.html#avoid-v-if-with-v-for">스타일 가이드</a> 를 참고하세요.</p></div><p>When <code>v-if</code> and <code>v-for</code> are both used on the same element, <code>v-if</code> will be evaluated first. See the <a href="./list.html#v-for-with-v-if">list rendering guide</a> for details.</p><p>동일한 엘리먼트에 <code>v-if</code>와 <code>v-for</code>를 함께 사용할 때, <code>v-if</code>가 더 높은 우선순위를 갖습니다. 자세한 내용은 <a href="./list.html#v-for-with-v-if">리스트 렌더링 가이드</a>를 참고하세요.</p>',40),h='{"title":"Conditional Rendering","description":"","frontmatter":{},"headers":[{"level":2,"title":"v-if","slug":"v-if"},{"level":2,"title":"v-else","slug":"v-else"},{"level":2,"title":"v-else-if","slug":"v-else-if"},{"level":2,"title":"v-if on <template>","slug":"v-if-on-template"},{"level":3,"title":"<template>에 v-if를 갖는 조건부 그룹 만들기","slug":"template-에-v-if를-갖는-조건부-그룹-만들기"},{"level":2,"title":"v-show","slug":"v-show"},{"level":2,"title":"v-if vs v-show","slug":"v-if-vs-v-show"},{"level":2,"title":"v-if 대 v-show","slug":"v-if-대-v-show"},{"level":2,"title":"v-if with v-for","slug":"v-if-with-v-for"},{"level":2,"title":"v-if 와 v-for","slug":"v-if-와-v-for"}],"relativePath":"guide/essentials/conditional.md"}',y={},f=Object.assign(y,{setup(a){const h=e(!0);return(e,a)=>{const y=n("VueSchoolLink");return t(),s("div",null,[c,o("div",p,[l(y,{href:"https://vueschool.io/lessons/conditional-rendering-in-vue-3",title:"Free Vue.js Conditional Rendering Lesson"})]),o("div",i,[l(y,{href:"https://vueschool.io/lessons/vue-fundamentals-capi-conditionals-in-vue",title:"Free Vue.js Conditional Rendering Lesson"})]),d,o("div",r,[o("button",{onClick:a[0]||(a[0]=e=>h.value=!h.value)},"Toggle"),h.value?(t(),s("h1",v,"Vue is awesome!")):(t(),s("h1",D,"Oh no 😢"))]),F])}}});export{h as __pageData,f as default};
