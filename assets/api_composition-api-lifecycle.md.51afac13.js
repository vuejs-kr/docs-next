import{_ as s,c as n,o as a,a as l}from"./app.cb32ff60.js";const p='{"title":"컴포지션 API: 수명주기 훅","description":"","frontmatter":{},"headers":[{"level":2,"title":"onMounted()","slug":"onmounted"},{"level":2,"title":"onUpdated()","slug":"onupdated"},{"level":2,"title":"onUnmounted()","slug":"onunmounted"},{"level":2,"title":"onBeforeMount()","slug":"onbeforemount"},{"level":2,"title":"onBeforeUpdate()","slug":"onbeforeupdate"},{"level":2,"title":"onBeforeUnmount()","slug":"onbeforeunmount"},{"level":2,"title":"onErrorCaptured()","slug":"onerrorcaptured"},{"level":2,"title":"onRenderTracked()","slug":"onrendertracked"},{"level":2,"title":"onRenderTriggered()","slug":"onrendertriggered"},{"level":2,"title":"onActivated()","slug":"onactivated"},{"level":2,"title":"onDeactivated()","slug":"ondeactivated"},{"level":2,"title":"onServerPrefetch()","slug":"onserverprefetch"}],"relativePath":"api/composition-api-lifecycle.md"}',o={},e=[l('<h1 id="composition-api-lifecycle-hooks" tabindex="-1">컴포지션 API: 수명주기 훅 <a class="header-anchor" href="#composition-api-lifecycle-hooks" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">사용 참고 사항</p><p>이 페이지에 나열된 모든 API는 컴포넌트의 <code>setup()</code> 단계에서 동기적으로 호출되어야 합니다. 자세한 내용은 <a href="/guide/essentials/lifecycle.html">가이드 - 수명주기 훅</a>을 참고하세요.</p></div><h2 id="onmounted" tabindex="-1">onMounted() <a class="header-anchor" href="#onmounted" aria-hidden="true">#</a></h2><p>컴포넌트가 마운트된 후 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onMounted</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>컴포넌트가 마운트 되었다고 간주하는 조건은 다음과 같습니다:</p><ul><li><p>동기식 자식 컴포넌트가 모두 마운트됨(<code>&lt;Suspense&gt;</code> 트리 내부의 비동기 컴포넌트 또는 컴포넌트는 포함하지 않음).</p></li><li><p>자체 DOM 트리가 생성되어 상위 컨테이너에 삽입됨. 앱의 루트 컨테이너가 Document 내에 있는 경우에만 컴포넌트의 DOM 트리가 문서 내에 있음을 보장함.</p></li></ul><p>일반적으로 이 훅은 컴포넌트의 렌더링된 DOM에 접근해야 하는 사이드 이펙트를 실행하거나, <a href="/guide/scaling-up/ssr.html">서버에서 렌더링 된 앱</a>에서 DOM과 관련 코드를 클라이언트에서만 실행하도록 제한하는 데 사용됩니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p></li><li><p><strong>예제</strong>:</p><p>템플릿 ref를 통해 엘리먼트에 접근:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> el </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// &lt;div&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">el</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="onupdated" tabindex="-1">onUpdated() <a class="header-anchor" href="#onupdated" aria-hidden="true">#</a></h2><p>반응형 상태 변경으로 컴포넌트의 DOM 트리가 업데이트된 후 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onUpdated</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>부모 컴포넌트의 updated 훅은 자식 컴포넌트의 훅 이후에 호출됩니다.</p><p>이 훅은 상태 변경에 영향을 받을 컴포넌트의 DOM 업데이트 후에 호출됩니다. 특정 상태 변경 후 업데이트된 DOM에 접근해야 하는 경우, <a href="/api/general.html#nexttick">nextTick()</a>을 사용해야 합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p><div class="warning custom-block"><p class="custom-block-title">주의</p><p>updated 훅에서 컴포넌트 상태를 변경하면 안되는데, 무한 업데이트 루프가 발생할 수 있기 때문입니다!</p></div></li><li><p><strong>예제</strong>:</p><p>업데이트된 DOM에 접근:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onUpdated</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">onUpdated</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 텍스트 내용은 현재 `count.value`와 같아야 함</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">count</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#F78C6C;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">count</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="onunmounted" tabindex="-1">onUnmounted() <a class="header-anchor" href="#onunmounted" aria-hidden="true">#</a></h2><p>컴포넌트가 마운트 해제된 후 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onUnmounted</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>컴포넌트가 마운트 해제되었다고 간주하는 조건은 다음과 같습니다:</p><ul><li><p>모든 자식 컴포넌트가 마운트 해제됨.</p></li><li><p>관련된 모든 반응형 이펙트(<code>setup()</code>에서 생성된 렌더 이펙트, 계산된 속성, 감시자)가 중지됨.</p></li></ul><p>이 훅을 사용하여 타이머, DOM 이벤트 리스너 또는 서버 연결처럼 수동으로 생성된 사이드 이펙트를 정리합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p></li><li><p><strong>예제</strong>:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onUnmounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> intervalId</span></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">intervalId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">setInterval</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">onUnmounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">clearInterval</span><span style="color:#A6ACCD;">(intervalId))</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="onbeforemount" tabindex="-1">onBeforeMount() <a class="header-anchor" href="#onbeforemount" aria-hidden="true">#</a></h2><p>컴포넌트가 마운트되기 직전에 호출될 훅을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onBeforeMount</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>이 훅은 컴포넌트의 반응형 상태 설정이 완료된 후 호출되지만, 아직 DOM 노드가 생성되지 않은 단계입니다. 첫 DOM 렌더 이펙트를 실행하려고 합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p></li></ul><h2 id="onbeforeupdate" tabindex="-1">onBeforeUpdate() <a class="header-anchor" href="#onbeforeupdate" aria-hidden="true">#</a></h2><p>반응형 상태 변경으로 컴포넌트의 DOM 트리를 업데이트하기 직전에 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onBeforeUpdate</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>이 훅은 Vue가 DOM을 업데이트하기 전에 DOM 상태에 접근하는 데 사용할 수 있습니다. 이 훅 내부에서 컴포넌트 상태를 수정하는 것도 안전합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p></li></ul><h2 id="onbeforeunmount" tabindex="-1">onBeforeUnmount() <a class="header-anchor" href="#onbeforeunmount" aria-hidden="true">#</a></h2><p>컴포넌트 인스턴스가 마운트 해제되기 직전에 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onBeforeUnmount</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>이 훅이 호출될 때, 여전히 컴포넌트 인스턴스는 완전히 동작하는 상태입니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p></li></ul><h2 id="onerrorcaptured" tabindex="-1">onErrorCaptured() <a class="header-anchor" href="#onerrorcaptured" aria-hidden="true">#</a></h2><p>자식 컴포넌트에서 전파된 에러가 캡쳐되었을 때 호출될 콜백을 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onErrorCaptured</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ErrorCapturedHook</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ErrorCapturedHook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span></span>\n<span class="line"><span style="color:#A6ACCD;">  err</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  instance</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  info</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>다음과 같은 출처의 에러를 캡처할 수 있습니다:</p><ul><li>컴포넌트 렌더</li><li>이벤트 핸들러</li><li>수명주기 훅</li><li><code>setup()</code> 함수</li><li>감시자</li><li>커스텀 디렉티브 훅</li><li>트랜지션 훅</li></ul><p>훅은 &#39;에러&#39;, &#39;에러를 트리거한 컴포넌트 인스턴스&#39;, &#39;에러 소스 유형을 지정하는 정보 문자열&#39; 세 개의 인자를 받습니다.</p><p><code>errorCaptured</code> 훅에서 컴포넌트 상태를 수정하여 사용자에게 에러 상태를 표시할 수 있습니다. 그러나 애러가 난 컴포넌트에서 에러 상태를 렌더링해서는 안됩니다. 그렇지 않으면 컴포넌트가 무한 렌더링 루프에 빠집니다.</p><p>훅은 <code>false</code>를 반환하여 에러가 더 이상 전파되지 않도록 할 수 있습니다. 아래의 에러 전파 세부 사항을 참조하십시오.</p><p><strong>에러 전파 규칙</strong></p><ul><li><p>기본적으로 모든 에러는 단계적으로 전파되며, <a href="/api/application.html#app-config-errorhandler"><code>app.config.errorHandler</code></a>가 정의된 경우, 최종적으로 이곳으로 전파되므로 한 곳에서 서비스 분석 및 보고 작업을 할 수 있습니다.</p></li><li><p>컴포넌트의 상속 또는 부모 체인에 <code>errorCaptured</code> 훅이 여러 개 있는 경우, 모두 동일한 에러를 호출합니다.</p></li><li><p><code>errorCaptured</code> 훅 자체에서 에러가 발생하면, 이 에러와 원래 캡처된 에러가 모두 <code>app.config.errorHandler</code>로 전송됩니다.</p></li><li><p><code>errorCaptured</code> 훅에서 <code>false</code>를 반환하면 더 이상 에러가 전파되지 않습니다. 이것은 본질적으로 &quot;이 에러는 처리되었으므로 무시되어야 합니다.&quot;를 의미합니다. 따라서 이후 단계적으로 전파되어야 할 <code>errorCaptured</code> 훅 또는 <code>app.config.errorHandler</code>에 이 에러로 인한 호출 동작은 없습니다.</p></li></ul></li></ul><h2 id="onrendertracked" tabindex="-1">onRenderTracked() <sup class="vt-badge dev-only"></sup> <a class="header-anchor" href="#onrendertracked" aria-hidden="true">#</a></h2><p>컴포넌트의 렌더 이펙트에 의해 반응형 종속성이 추적됐을 때, 호출될 디버그 콜백을 등록합니다.</p><p><strong>이 훅은 개발 모드 전용이며, 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onRenderTracked</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerHook</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerHook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">effect</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactiveEffect</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TrackOpTypes</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/* &#39;get&#39; | &#39;has&#39; | &#39;iterate&#39; */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/extras/reactivity-in-depth.html">반응형 심화</a></p></li></ul><h2 id="onrendertriggered" tabindex="-1">onRenderTriggered() <sup class="vt-badge dev-only"></sup> <a class="header-anchor" href="#onrendertriggered" aria-hidden="true">#</a></h2><p>컴포넌트의 렌더 이펙트가 반응형 종속성에 의해 다시 실행되도록 트리거된 경우, 호출될 디버그 콜백을 등록합니다.</p><p><strong>이 훅은 개발 모드 전용이며, 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onRenderTriggered</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerHook</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerHook</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">effect</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactiveEffect</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TriggerOpTypes</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/* &#39;set&#39; | &#39;add&#39; | &#39;delete&#39; | &#39;clear&#39; */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">newValue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">oldValue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">oldTarget</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Set</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/extras/reactivity-in-depth.html">반응형 심화</a></p></li></ul><h2 id="onactivated" tabindex="-1">onActivated() <a class="header-anchor" href="#onactivated" aria-hidden="true">#</a></h2><p><a href="/api/built-in-components.html#keepalive"><code>&lt;KeepAlive&gt;</code></a>로 캐시된 컴포넌트 인스턴스가 DOM 트리의 일부로 삽입된 후 호출될 콜백을 등록합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onActivated</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance">가이드 - 캐시된 인스턴스의 수명 주기</a></p></li></ul><h2 id="ondeactivated" tabindex="-1">onDeactivated() <a class="header-anchor" href="#ondeactivated" aria-hidden="true">#</a></h2><p><a href="/api/built-in-components.html#keepalive"><code>&lt;KeepAlive&gt;</code></a>로 캐시된 컴포넌트 인스턴스가 DOM 트리에서 제거된 후 호출될 콜백을 등록합니다.</p><p><strong>이 훅은 서버 사이드 렌더링 중에 호출되지 않습니다</strong>.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onDeactivated</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance">가이드 - 캐시된 인스턴스의 수명 주기</a></p></li></ul><h2 id="onserverprefetch" tabindex="-1">onServerPrefetch() <sup class="vt-badge" data-text="SSR 전용"></sup> <a class="header-anchor" href="#onserverprefetch" aria-hidden="true">#</a></h2><p>컴포넌트 인스턴스가 서버에서 렌더링 되기 전에 완료(resolve)되어야 하는 비동기 함수를 등록합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onServerPrefetch</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>콜백이 Promise를 반환하면, 서버 렌더러는 컴포넌트를 렌더링하기 전 Promise가 해결될 때까지 기다립니다.</p><p>이 훅은 SSR(서버 사이드 렌더링) 중에만 호출되므로, 서버 전용 데이터 가져오기를 실행하는 데 사용할 수 있습니다.</p></li><li><p><strong>예제</strong>:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onServerPrefetch</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">null</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">onServerPrefetch</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 서버에서 미리 데이터를 가져오는 것은</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 클라이언트에서 데이터를 요청하는 것보다 빠름.</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 최초 데이터 요청 결과로 컴포넌트의 일부가 렌더링 됨.</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchOnServer</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/* ... */</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 마운트 시 데이터가 null일 경우,</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 컴포넌트가 클라이언트에서 동적으로 렌더링되도록</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 클라이언트 측에서 가져오기를 실행해야 함.</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchOnClient</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/* ... */</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/scaling-up/ssr.html">서버 사이드 렌더링</a></p></li></ul>',42)];var t=s(o,[["render",function(s,l,p,o,t,r){return a(),n("div",null,e)}]]);export{p as __pageData,t as default};
