import{_ as s,c as n,o as a,a as p}from"./app.a19aada9.js";const l='{"title":"컴포넌트 등록","description":"","frontmatter":{},"headers":[{"level":2,"title":"글로벌 등록","slug":"글로벌-등록"},{"level":2,"title":"로컬 등록","slug":"로컬-등록"},{"level":2,"title":"컴포넌트 이름 표기법","slug":"컴포넌트-이름-표기법"}],"relativePath":"guide/components/registration.md"}',o={},e=[p('<h1 id="컴포넌트-등록" tabindex="-1">컴포넌트 등록 <a class="header-anchor" href="#컴포넌트-등록" aria-hidden="true">#</a></h1><blockquote><p>이 페이지에서는 <a href="/guide/essentials/component-basics.html">컴포넌트 기초</a>를 이미 읽었다고 가정합니다. 컴포넌트를 처음 사용하는 경우, 그 문서를 먼저 읽으십시오.</p></blockquote><p>Vue 컴포넌트는 템플릿을 발견할 때, Vue가 구현 할 수 있도록 위치를 &quot;등록&quot;해야 합니다. 컴포넌트를 등록하는 방법에는 글로벌 및 로컬의 두 가지가 있습니다.</p><h2 id="글로벌-등록" tabindex="-1">글로벌 등록 <a class="header-anchor" href="#글로벌-등록" aria-hidden="true">#</a></h2><p><code>app.component()</code> 메소드를 사용하여 현재 <a href="/guide/essentials/application.html">Vue 애플리케이션</a>에서 컴포넌트를 글로벌로 사용할 수 있도록 할 수 있습니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 등록될 이름</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">MyComponent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 구현체</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">/* ... */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p>SFC를 사용하는 경우, 가져온 <code>.vue</code> 파일을 등록합니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> MyComponent </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">MyComponent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> MyComponent)</span></span>\n<span class="line"></span></code></pre></div><p><code>app.component()</code> 메소드는 다음과 같이 연결할 수 있습니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#A6ACCD;">app</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ComponentA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ComponentA)</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ComponentB</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ComponentB)</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ComponentC</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ComponentC)</span></span>\n<span class="line"></span></code></pre></div><p>글로벌로 등록된 컴포넌트는 앱 내의 모든 컴포넌트 템플릿에서 사용할 수 있습니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 이것은 앱 내부의 모든 컴포넌트 내에서 작동합니다. --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ComponentA</span><span style="color:#89DDFF;">/&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ComponentB</span><span style="color:#89DDFF;">/&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ComponentC</span><span style="color:#89DDFF;">/&gt;</span></span>\n<span class="line"></span></code></pre></div><p>이는 모든 하위 컴포넌트에도 적용됩니다. 즉, 이 세 컴포넌트 모두 서로 내부에서도 사용할 수 있습니다.</p><h2 id="로컬-등록" tabindex="-1">로컬 등록 <a class="header-anchor" href="#로컬-등록" aria-hidden="true">#</a></h2><p>편리하지만 글로벌 등록에는 몇 가지 단점이 있습니다:</p><ol><li><p>글로벌 등록은 빌드 시스템이 사용하지 않는 컴포넌트를 제거하는 것(일명 &quot;tree-shaking&quot;)을 방지합니다. 컴포넌트를 글로벌적으로 등록했지만 결국 앱의 어느 곳에서도 사용하지 않으면 최종 번들에 계속 포함됩니다.</p></li><li><p>글로벌 등록은 대규모 앱에서 종속 관계를 덜 명확하게 만듭니다. 그것을 사용하는 상위 컴포넌트에서 하위 컴포넌트의 구현을 찾기가 어렵습니다. 이것은 너무 많은 글로벌 변수를 사용하는 것과 유사하므로 장기적인 유지 관리 측면에 영향을 줄 수 있습니다.</p></li></ol><p>로컬 등록은 등록된 컴포넌트의 가용성 범위를 현재 컴포넌트로만 제한합니다. 종속 관계를 더 명시적으로 만들고 트리-쉐이킹에 더 친숙합니다.</p><div class="composition-api"><p>SFC를 사용할 때, <code>&lt;script setup&gt;</code>로 가져온 컴포넌트는 등록절차 없이 로컬로 사용할 수 있습니다:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ComponentA </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./ComponentA.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ComponentA</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>&lt;script setup&gt;</code>이 아닌 경우 <code>components</code> 옵션을 사용해야 합니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ComponentA </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./ComponentA.js</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    ComponentA</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setup</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></div><div class="options-api"><p>로컬 등록은 <code>components</code> 옵션을 사용하여 구현합니다:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ComponentA </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./ComponentA.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    ComponentA</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ComponentA</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div><p><code>components</code> 객체의 각 속성에 대한 키는 컴포넌트의 이름으로 등록되고, 값은 컴포넌트의 구현이 포함됩니다. 위의 예는 ES2015 속성 약칭을 사용하고 있으며 다음과 동일합니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">ComponentA</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> ComponentA</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p><strong>로컬로 등록된 컴포넌트는 하위 컴포넌트에서 <em>사용할 수 없습니다</em></strong>. 이 경우 <code>ComponentA</code>는 현재 컴포넌트에서만 사용할 수 있으며, 하위 컴포넌트에서 사용할 수 없습니다.</p><h2 id="컴포넌트-이름-표기법" tabindex="-1">컴포넌트 이름 표기법 <a class="header-anchor" href="#컴포넌트-이름-표기법" aria-hidden="true">#</a></h2><p>가이드 문서에서는 컴포넌트를 등록할 때 PascalCase 이름을 사용합니다. 이유는 이렇습니다:</p><ol><li><p>PascalCase 이름은 유효한 JavaScript 식별자입니다. 이렇게 하면 JavaScript에서 컴포넌트를 더 쉽게 가져오고 등록할 수 있습니다. IDE의 자동 완성 기능도 지원합니다.</p></li><li><p><code>&lt;PascalCase /&gt;</code>는 기본 HTML의 템플릿 엘리먼트가 아닌 Vue 컴포넌트임을 더 명확하게 합니다. 또한 Vue 컴포넌트를 사용자 정의 엘리먼트(웹 컴포넌트)와 구별합니다.</p></li></ol><p>이것은 SFC 또는 문자열 템플릿으로 작업할 때 권장되는 스타일입니다. 그러나 <a href="/guide/essentials/component-basics.html#dom-템플릿-파싱-주의-사항">DOM 템플릿 구문 분석 주의 사항</a>에서 설명한 것처럼 PascalCase 태그는 DOM 템플릿에서 사용할 수 없습니다.</p><p>운 좋게도 Vue는 PascalCase를 사용하여 등록된 컴포넌트에 대한 kebab-case 태그 해석을 지원합니다. 이것은 <code>MyComponent</code>로 등록된 컴포넌트가 <code>&lt;MyComponent&gt;</code> 또는 <code>&lt;my-component&gt;</code>를 통해 템플릿에서 참조될 수 있음을 의미합니다. 이를 통해 템플릿 소스에 관계없이 동일한 JavaScript 컴포넌트 등록 코드를 사용할 수 있습니다.</p>',27)];var t=s(o,[["render",function(s,p,l,o,t,c){return a(),n("div",null,e)}]]);export{l as __pageData,t as default};