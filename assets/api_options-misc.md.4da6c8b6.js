import{C as s}from"./chunks/CustomPreferenceSwitch.2bfbff4f.js";import{o as n,c as a,e as l,j as p,a as o,d as e}from"./app.64b8c0f0.js";const t=o('<h1 id="options-misc" tabindex="-1">옵션: 기타 <a class="header-anchor" href="#options-misc" aria-hidden="true">#</a></h1><h2 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-hidden="true">#</a></h2><p>표시될 컴포넌트 이름을 명시적으로 선언합니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>컴포넌트의 이름은 다음에 사용됩니다:</p><ul><li>컴포넌트 자체 템플릿의 재귀적 참조</li><li>Vue DevTools의 컴포넌트 검사 트리에 표시</li><li>컴포넌트 경고 추적에 표시</li></ul><p>싱글 파일 컴포넌트를 사용할 때, 컴포넌트는 파일 이름으로 고유한 이름을 유추합니다. 예를 들어, <code>MyComponent.vue</code>라는 파일에서 유추된 이름 &quot;MyComponent&quot;입니다.</p><p>또는 컴포넌트를 <a href="/api/application.html#app-component"><code>app.component</code></a>를 사용하여 전역으로 등록하면, 전역 ID가 자동으로 이름으로 설정되는 경우 입니다.</p><p><code>name</code> 옵션을 사용하면, 유추된 이름을 재정의하거나 이름을 유추할 수 없는 경우(예: 빌드 도구를 사용하지 않거나 인라인된 SFC가 아닌 컴포넌트를 사용하는 경우), 이름을 명시적으로 제공할 수 있습니다.</p><p><code>name</code>이 명시적으로 필요한 경우는 단 하나로, <a href="/guide/built-ins/keep-alive.html"><code>&lt;KeepAlive&gt;</code></a>의 <code>include / exclude</code> props를 통해 캐시 가능한 컴포넌트를 정의하는 경우입니다.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>버전 3.2.34부터 <code>&lt;script setup&gt;</code>을 사용하는 단일 파일 컴포넌트는 파일명을 기반으로 <code>name</code> 옵션을 자동으로 추론하므로 <code>&lt;KeepAlive&gt;</code>와 함께 사용할 때도 이름을 수동으로 선언할 필요가 없습니다.</p><p>Since version 3.2.34, a single-file component using <code>&lt;script setup&gt;</code> will automatically infer its <code>name</code> option based on the filename, removing the need to manually declare the name even when used with <code>&lt;KeepAlive&gt;</code>.</p></div></li></ul><h2 id="inheritattrs" tabindex="-1">inheritAttrs <a class="header-anchor" href="#inheritattrs" aria-hidden="true">#</a></h2><p>기본 컴포넌트 속성 폴쓰루 동작을 활성화할지 여부를 제어합니다.</p>',6),c=o('<li><p><strong>타입</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">inheritAttrs</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 기본 값: true</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>세부 사항</strong>:</p><p>기본적으로 props로 인식되지 않는 부모 범위(scope)의 속성 바인딩은 &quot;폴스루(fallthrough)&quot;됩니다. 즉, 싱글 루트 컴포넌트가 있는 경우, 이러한 바인딩이 일반 HTML 속성으로 자식 컴포넌트의 루트 엘리먼트에 적용됩니다. 대상이 되는 엘리먼트 또는 다른 컴포넌트를 래핑하는 컴포넌트를 작성할 때, 이러한 동작을 원치 않을 수 있습니다. <code>inheritAttrs</code>를 <code>false</code>로 설정하면, 이 기본 동작을 비활성화할 수 있습니다. 속성은 <code>$attrs</code> 인스턴스 속성을 통해 사용할 수 있으며, <code>v-bind</code>를 사용하여 루트가 아닌 요소에 명시적으로 바인딩할 수 있습니다.</p></li>',2),r=l("p",null,[l("strong",null,"예제"),e(":")],-1),i=l("div",{class:"composition-api"},[l("p",null,[l("code",null,"<script setup>"),e("을 사용하는 컴포넌트에서 이 옵션을 선언해야 할 경우, 별도의 "),l("code",null,"<script>"),e(" 블록이 필요합니다:")])],-1),D=o('<div class="composition-api"><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">inheritAttrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#82AAFF;">defineProps</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">label</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">])</span></span>\n<span class="line"><span style="color:#82AAFF;">defineEmits</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">])</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    {{ label }}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$attrs</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-bind:value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-on:input</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$emit(&#39;input&#39;, $event.target.value)</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">    /&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div><div class="options-api"><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">inheritAttrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">label</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">emits</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    {{ label }}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$attrs</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-bind:value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-on:input</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$emit(&#39;input&#39;, $event.target.value)</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">    /&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div>',2),F=l("li",null,[l("p",null,[l("strong",null,"참고"),e(": "),l("a",{href:"/guide/components/attrs.html"},"가이드 - 폴스루 속성")])],-1),y=o('<h2 id="components" tabindex="-1">components <a class="header-anchor" href="#components" aria-hidden="true">#</a></h2><p>컴포넌트 인스턴스에서 다른 컴포넌트를 사용할 수 있도록 등록하는 객체입니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> [</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Component</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>예제</strong>:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Foo </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Foo.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Bar </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Bar.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 단축 표기 (객체 리터럴 문법)</span></span>\n<span class="line"><span style="color:#A6ACCD;">    Foo</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 다른 이름으로 등록</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">RenamedBar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Bar</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>참고</strong>: <a href="/guide/components/registration.html">가이드 - 컴포넌트 등록</a></p></li></ul><h2 id="directives" tabindex="-1">directives <a class="header-anchor" href="#directives" aria-hidden="true">#</a></h2><p>컴포넌트 인스턴스에서 사용할 수 있도록 커스텀 디렉티브를 등록하는 객체입니다.</p><ul><li><p><strong>타입</strong>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">directives</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> [</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Directive</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>예제</strong>:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">directives</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 템플릿에서 v-focus 사용 가능</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">focus</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">el</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">focus</span><span style="color:#F07178;">()</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="language-template"><button title="Copy Code" class="copy"></button><span class="lang">template</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-focus</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>번잡해질 수 있는 기능을 정의한 디렉티브로, 간단하게 컴포넌트 인스턴스에서 사용할 수 있습니다.</p></li><li><p><strong>참고</strong>: <a href="/guide/reusability/custom-directives.html">가이드 - 커스텀 디렉티브</a></p></li></ul>',6),C=JSON.parse('{"title":"옵션: 기타","description":"","frontmatter":{},"headers":[{"level":2,"title":"name","slug":"name","link":"#name","children":[]},{"level":2,"title":"inheritAttrs","slug":"inheritattrs","link":"#inheritattrs","children":[]},{"level":2,"title":"components","slug":"components","link":"#components","children":[]},{"level":2,"title":"directives","slug":"directives","link":"#directives","children":[]}],"relativePath":"api/options-misc.md"}'),A=Object.assign({name:"api/options-misc.md"},{setup:o=>(o,e)=>(n(),a("div",null,[t,l("ul",null,[c,l("li",null,[r,i,p(s),D]),F]),y]))});export{C as __pageData,A as default};
