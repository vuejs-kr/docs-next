import{_ as s,o as n,c as a,a as l}from"./app.07b32141.js";const p='{"title":"컴포지션 API: 의존성 주입","description":"","frontmatter":{},"headers":[{"level":2,"title":"provide()","slug":"provide"},{"level":2,"title":"inject()","slug":"inject"}],"relativePath":"api/composition-api-dependency-injection.md"}',o={},e=[l('<h1 id="composition-api-dependency-injection" tabindex="-1">컴포지션 API: <br>의존성 주입 <a class="header-anchor" href="#composition-api-dependency-injection" aria-hidden="true">#</a></h1><h2 id="provide" tabindex="-1">provide() <a class="header-anchor" href="#provide" aria-hidden="true">#</a></h2><p>하위 컴포넌트에 주입(Inject)할 수 있도록 값을 제공(Provide)합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">provide</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p><code>provide()</code>는 &quot;키가 될 문자열 또는 심볼(symbol)&quot;과 &quot;제공될 값&quot; 두 가지 인자를 가집니다.</p><p>TypeScript를 사용할 때 키는 <code>InjectionKey</code>(Vue에서 제공하는 <code>Symbol</code>을 확장한 다용도 타입)로 캐스팅된 심볼일 수 있으며, 이것은 <code>provide()</code>와 <code>inject()</code> 간 값의 타입을 동기화하는 데 사용할 수 있습니다.</p><p>수명 주기 훅을 등록하는 API와 유사하게 <code>provide()</code>는 컴포넌트의 <code>setup()</code> 단계에서 동기적으로 호출되어야 합니다.</p></li><li><p><strong>예제</strong>:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">provide</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fooSymbol</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./injectionSymbols</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 제공: 정적 값</span></span>\n<span class="line"><span style="color:#82AAFF;">provide</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 제공: 반응형 값</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#82AAFF;">provide</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">count</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> count)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 제공: 심볼(Symbol) 키</span></span>\n<span class="line"><span style="color:#82AAFF;">provide</span><span style="color:#A6ACCD;">(fooSymbol</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> count)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>:</p><ul><li><a href="/guide/components/provide-inject.html">가이드 - Provide/Inject</a></li><li><a href="/guide/typescript/composition-api.html#typing-provide-inject">가이드 - Provide/Inject에 타입 지정하기</a></li></ul></li></ul><h2 id="inject" tabindex="-1">inject() <a class="header-anchor" href="#inject" aria-hidden="true">#</a></h2><p>상위 컴포넌트 또는 <a href="/api/application.html#app-provide"><code>app.provide()</code></a>를 통해 앱에서 제공(Provide)된 값을 주입(Inject)합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">// 기본 값 없음</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 기본 값 정의 있음</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> defaultValue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 팩토리 함수</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InjectionKey</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">defaultValue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  treatDefaultAsFactory</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">true</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>첫 번째 인자는 주입 키입니다. Vue는 키가 일치하는 제공된 값을 찾기 위해 상위 체인을 단계적으로 탐색합니다. 상위 체인의 여러 컴포넌트가 동일한 키를 제공하는 경우, 주입될 컴포넌트에 가장 가까운 컴포넌트의 값이 제공되며, 이보다 멀리있는 상위 체인의 값은 &quot;가려짐(shadow)&quot;이 됩니다. <code>inject()</code>는 일치하는 키가 발견되지 않으면, 기본값이 제공되지 않는 한 <code>undefined</code>를 반환합니다.</p><p>두 번째 인자는 선택 사항으로 일치하는 값을 찾을 수 없을 때 사용될 기본값입니다. 생성하는 데 비용이 많이 드는 값을 반환하는 팩토리 함수일 수도 있습니다. 기본값이 함수인 경우, 팩토리의 반환 값이 아닌 함수 자체가 값으로 사용되어야 하는 경우, <code>false</code>를 세 번째 인자로 전달해야 합니다.</p><p>수명 주기 훅을 등록하는 API와 유사하게 <code>provide()</code>는 컴포넌트의 <code>setup()</code> 단계에서 동기적으로 호출되어야 합니다.</p><p>TypeScript를 사용할 때 키는 <code>InjectionKey</code>(Vue에서 제공하는 <code>Symbol</code>을 확장한 다용도 타입)로 캐스팅된 심볼일 수 있으며, 이것은 <code>provide()</code>와 <code>inject()</code> 간 값의 타입을 동기화하는 데 사용할 수 있습니다.</p></li><li><p><strong>예제</strong>:</p><p>부모 컴포넌트가 이전 <code>provide()</code> 예제에서와 같은 값을 제공했다고 가정:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">inject</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fooSymbol</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./injectionSymbols</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 정적 값</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 반응형 값</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">count</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 심볼 키를 사용하여</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(fooSymbol)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 기본 값 제공을 하며 (제공되는 &#39;foo&#39;가 없는 경우 적용됨)</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">default value</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 기본 값으로 팩토리 함수를 제공</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> baz </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Map</span><span style="color:#A6ACCD;">())</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 주입: 3번째 인자와 함께 기본값으로 함수 제공</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fn </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">function</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">주의</p><p>공식 문서에서 3번째 인자의 기본값은 <code>true</code>라고 설명하고 있으며, 이것을 바탕으로 아래 예제도 작성되어 있습니다. 하지만 실제 기본값은 <code>false</code>로 동작합니다. 한국어 번역본은 원본 내용과 동일합니다.</p><p>현재 <a href="https://github.com/vuejs/core/issues/6194" target="_blank" rel="noopener noreferrer">이슈</a>가 진행중이므로, 이슈 해결 전까지 함수 또는 팩토리를 사용해야 하는 경우, 3번째 인자의 값은 명시하는 것이 좋습니다.</p><p>이 안내문은 이슈 해결시 관련 문서 업데이트와 함께 제거될 예정입니다.</p></div></li><li><p><strong>참고</strong>:</p><ul><li><a href="/guide/components/provide-inject.html">가이드 - Provide/Inject</a></li><li><a href="/guide/typescript/composition-api.html#typing-provide-inject">가이드 - Provide/Inject에 타입 지정하기</a></li></ul></li></ul>',7)];var t=s(o,[["render",function(s,l,p,o,t,c){return n(),a("div",null,e)}]]);export{p as __pageData,t as default};