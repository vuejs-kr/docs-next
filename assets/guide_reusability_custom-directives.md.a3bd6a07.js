import{c as s,d as n,C as a,a as l,o as p}from"./app.0932d007.js";const o=l('<h1 id="custom-directives" tabindex="-1">커스텀 디렉티브 <a class="header-anchor" href="#custom-directives" aria-hidden="true">#</a></h1><h2 id="introduction" tabindex="-1">소개 <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><p>코어에 포함된 기본 디렉티브 세트(예: <code>v-model</code> 또는 <code>v-show</code>) 외에도 Vue를 사용하면 커스텀 디렉티브를 정의할 수 있습니다.</p><p>우리는 Vue에서 <a href="/guide/essentials/component-basics.html">컴포넌트 기초</a>와 <a href="./composables.html">구성화</a>라는 두 가지 형태의 코드 재사용을 도입했습니다. 컴포넌트는 주요 구성-요소(building-block)이고, 구성화는 상태 저장 로직을 재사용하는 데 중점을 둡니다. 반면에 커스텀 디렉티브는 주로 일반 엘리먼트에 대한 저수준(low-level) DOM 접근과 관련된 로직을 재사용하기 위한 것입니다.</p><p>커스텀 디렉티브는 컴포넌트의 수명주기 훅을 포함하는 객체처럼 정의됩니다. 훅은 디렉티브가 바인딩된 엘리먼트를 수신합니다. 다음은 엘리먼트가 Vue에 의해 DOM에 삽입될 때, <code>&lt;input&gt;</code>에 포커스 되는 커스텀 디렉티브 구현의 예제입니다:</p><div class="composition-api"><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 템플릿에서 v-focus로 활성화 가능</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> vFocus </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">mounted</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> el</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">focus</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-focus</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div><div class="options-api"><div class="language-js"><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> focus </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">mounted</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> el</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">focus</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">directives</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 템플릿에서 v-focus로 활성화 가능</span></span>\n<span class="line"><span style="color:#A6ACCD;">    focus</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-focus</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div></div>',7),e={class:"demo"},c={placeholder:"포커스 되어야 함"},t=l('<p>페이지의 다른 곳을 클릭하지 않았다고 가정하면, 위의 인풋은 자동으로 포커스 되어야 합니다. 이 디렉티브는 페이지 로드 시 뿐만 아니라, Vue에서 동적으로 엘리먼트를 삽입할 때도 작동하기 때문에 <code>autofocus</code> 속성보다 더 유용합니다.</p><div class="composition-api"><p><code>&lt;script setup&gt;</code>에서 <code>v</code> 접두사로 시작하는 모든 camelCase 변수를 커스텀 디렉티브로 사용할 수 있습니다. 위의 예에서 <code>vFocus</code>는 템플릿에서 <code>v-focus</code>로 사용할 수 있습니다.</p><p><code>&lt;script setup&gt;</code>을 사용하지 않는 경우, <code>directives</code> 옵션을 사용하여 커스텀 디렉티브를 등록할 수 있습니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setup</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/*...*/</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">directives</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 템플릿에서 v-focus로 활성화 가능</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">focus</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">/* ... */</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></div><div class="options-api"><p>컴포넌트와 마찬가지로 커스텀 디렉티브는 템플릿에서 사용할 수 있도록 등록해야 합니다. 위의 예에서는 <code>directives</code> 옵션을 통해 로컬 등록을 사용하고 있습니다.</p></div><p>앱 수준에서 커스텀 디렉티브를 전역적으로 등록하는 것도 일반적입니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 모든 컴포넌트에서 v-focus를 사용할 수 있도록 합니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">directive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">focus</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/* ... */</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>커스텀 디렉티브는 원하는 기능을 직접 DOM 조작을 통해서만 달성할 수 있는 경우에만 사용해야 합니다. 가능하면 <code>v-bind</code>와 같은 내장 디렉티브를 사용하여 선언적 템플릿을 사용하는 것이 더 효율적이고 서버 렌더링에 친숙하기 때문입니다.</p></div><h2 id="directive-hooks" tabindex="-1">디렉티브 훅 <a class="header-anchor" href="#directive-hooks" aria-hidden="true">#</a></h2><p>디렉티브를 정의하는 객체는 다음과 같은 여러 훅 기능을 제공할 수 있습니다(모두 선택 사항):</p><div class="language-js"><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> myDirective </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 바인딩된 엘리먼트의 속성 또는</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 이벤트 리스너가 적용되기 전에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> binding</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> vnode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> prevVnode</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 인자에 대한 자세한 내용은 아래를 참조.</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 엘리먼트가 DOM에 삽입되기 직전에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeMount</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 바인딩된 엘리먼트의 부모 컴포넌트 및</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 모든 자식 컴포넌트의 mounted 이후에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 부모 컴포넌트의 updated 전에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeUpdate</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 바인딩된 엘리먼트의 부모 컴포넌트 및</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 모든 자식 컴포넌트의 updated 이후에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">updated</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 부모 컴포넌트의 beforeUnmount 이후에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeUnmount</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 부모 컴포넌트의 unmounted 전에 호출됩니다.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">unmounted</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><h3 id="훅-인자" tabindex="-1">훅 인자 <a class="header-anchor" href="#훅-인자" aria-hidden="true">#</a></h3><p>디렉티브 훅에는 다음 인자가 전달됩니다:</p><ul><li><p><code>el</code>: 디렉티브가 바인딩된 엘리먼트입니다. DOM을 직접 조작하는 데 사용할 수 있습니다.</p></li><li><p><code>binding</code>: 다음 속성을 포함하는 객체입니다.</p><ul><li><code>value</code>: 디렉티브에 전달된 값입니다. 예를 들어 <code>v-my-directive=&quot;1 + 1&quot;</code>에서 value는 <code>2</code>입니다.</li><li><code>oldValue</code>: 이것은 <code>beforeUpdate</code> 및 <code>updated</code>에서만 사용할 수 있습니다. 값이 변경되었는지 여부에 관계없이 사용 가능합니다.</li><li><code>arg</code>: 디렉티브에 전달된 인자(있는 경우). 예를 들어 <code>v-my-directive:foo</code>에서 인자는 <code>&quot;foo&quot;</code>입니다.</li><li><code>modifiers</code>: 수식어가 있는 경우 수식어를 포함하는 객체입니다. 예를 들어 <code>v-my-directive.foo.bar</code>에서 수식어 객체는 <code>{ foo: true, bar: true }</code>입니다.</li><li><code>instance</code>: 디렉티브가 사용되는 컴포넌트의 인스턴스입니다.</li><li><code>dir</code>: 디렉티브를 정의하는 객체</li></ul></li><li><p><code>vnode</code>: 바인딩된 엘리먼트를 나타내는 기본 VNode.</p></li><li><p><code>prevNode</code>: 이전 렌더링에서 바인딩된 엘리먼트를 나타내는 VNode입니다. <code>beforeUpdate</code> 및 <code>updated</code> 훅에서만 사용할 수 있습니다.</p></li></ul><p>다음과 같은 디렉티브를 사용한다고 가정한 예제를 살펴봅시다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-example</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#C792EA;">bar</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">baz</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>binding</code> 인자는 다음과 같은 형태의 객체입니다:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">arg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">modifiers</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">/* `baz`의 값 */</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">oldValue</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">/* 업데이트 전 `baz`의 값 */</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>내장 디렉티브와 유사하게 커스텀 디렉티브 인수는 동적일 수 있습니다. 예를 들어:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-example:</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">arg</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>여기서 디렉티브 인자는 컴포넌트 상태의 <code>arg</code> 속성을 기반으로 반응형으로 업데이트됩니다.</p><div class="tip custom-block"><p class="custom-block-title">참고</p><p><code>el</code>을 제외하고 이러한 인수들은 읽기 전용으로 처리하고 절대 수정해서는 안 됩니다. 훅 간에 정보를 공유해야 하는 경우 엘리먼트의 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" target="_blank" rel="noopener noreferrer">dataset</a>을 통해 공유하는 것이 좋습니다.</p></div><h2 id="function-shorthand" tabindex="-1">간단하게 함수로 사용하기 <a class="header-anchor" href="#function-shorthand" aria-hidden="true">#</a></h2><p>커스텀 디렉티브가 <code>mounted</code> 및 <code>updated</code>에 대해 동일한 동작을 갖는 것이 일반적이며, 다른 훅은 필요하지 않습니다. 이러한 경우 디렉티브를 객체가 아닌 함수로 정의할 수 있습니다:</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-color</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">color</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-js"><pre><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">directive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">color</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> binding</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 이 함수가 호출되는 시점은 `mounted`와 `updated`입니다.</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">binding</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><h2 id="object-literals" tabindex="-1">객체를 값으로 전달하기 <a class="header-anchor" href="#object-literals" aria-hidden="true">#</a></h2><p>디렉티브에 여러 값이 필요한 경우, JavaScript 객체 리터럴을 전달할 수도 있습니다. 디렉티브는 모든 유효한 JavaScript 표현식을 사용할 수 있음을 기억하십시오.</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-demo</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">{ </span><span style="color:#F07178;">color</span><span style="color:#89DDFF;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">white</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">, </span><span style="color:#F07178;">text</span><span style="color:#89DDFF;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">안녕!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-js"><pre><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">directive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> binding</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">binding</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// =&gt; &quot;white&quot;</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">binding</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">text</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// =&gt; &quot;안녕!&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><h2 id="usage-on-components" tabindex="-1">컴포넌트에서 사용 <a class="header-anchor" href="#usage-on-components" aria-hidden="true">#</a></h2><p>컴포넌트에 사용될 때 커스텀 디렉티브는 <a href="/guide/components/attrs.html">폴스루 속성</a>과 유사하게 항상 컴포넌트의 루트 노드에 적용됩니다.</p><div class="language-vue-html"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-demo</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-vue-html"><pre><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- MyComponent 템플릿에서 --&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">&lt;!-- 여기에 v-demo 디렉티브가 적용됩니다. --&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">컴포넌트 컨텐츠...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>컴포넌트에는 잠재적으로 둘 이상의 루트 노드가 있을 수 있습니다. 다중 루트 컴포넌트에 적용하려고 하면 디렉티브가 무시되고 애러가 발생합니다. 속성과 달리 디렉티브는 <code>v-bind=&quot;$attrs&quot;</code>를 사용하여 다른 엘리먼트에 전달할 수 없습니다. 일반적으로 컴포넌트에 커스텀 디렉티브를 사용하는 것은 <strong>권장되지 않습니다</strong>.</p>',33),r='{"title":"커스텀 디렉티브","description":"","frontmatter":{},"headers":[{"level":2,"title":"소개","slug":"introduction"},{"level":2,"title":"디렉티브 훅","slug":"directive-hooks"},{"level":3,"title":"훅 인자","slug":"훅-인자"},{"level":2,"title":"간단하게 함수로 사용하기","slug":"function-shorthand"},{"level":2,"title":"객체를 값으로 전달하기","slug":"object-literals"},{"level":2,"title":"컴포넌트에서 사용","slug":"usage-on-components"}],"relativePath":"guide/reusability/custom-directives.md"}',D={},F=Object.assign(D,{setup(l){const r={mounted:s=>{s.focus()}};return(l,D)=>(p(),s("div",null,[o,n("div",e,[a(n("input",c,null,512),[[r]])]),t]))}});export{r as __pageData,F as default};
