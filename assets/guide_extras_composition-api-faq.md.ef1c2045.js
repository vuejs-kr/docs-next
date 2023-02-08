import{_ as e,o as a,c as s,a as o}from"./app.64b8c0f0.js";const n=JSON.parse('{"title":"컴포지션 API FAQ","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"컴포지션 API란?","slug":"what-is-composition-api","link":"#what-is-composition-api","children":[]},{"level":2,"title":"왜 컴포지션 API인가요?","slug":"why-composition-api","link":"#why-composition-api","children":[{"level":3,"title":"더 나은 로직 재사용성","slug":"better-logic-reuse","link":"#better-logic-reuse","children":[]},{"level":3,"title":"보다 유연한 코드 구성","slug":"more-flexible-code-organization","link":"#more-flexible-code-organization","children":[]},{"level":3,"title":"더 나은 타입 추론","slug":"better-type-inference","link":"#better-type-inference","children":[]},{"level":3,"title":"더 작은 프로덕션 번들 및 더 적은 오버헤드","slug":"smaller-production-bundle-and-less-overhead","link":"#smaller-production-bundle-and-less-overhead","children":[]}]},{"level":2,"title":"옵션 API와의 관계","slug":"relationship-with-options-api","link":"#relationship-with-options-api","children":[{"level":3,"title":"Trade-offs","slug":"trade-offs","link":"#trade-offs","children":[]},{"level":3,"title":"컴포지션 API는 모든 사용 사례를 포괄합니까?","slug":"does-composition-api-cover-all-use-cases","link":"#does-composition-api-cover-all-use-cases","children":[]},{"level":3,"title":"두 API를 함께 사용할 수 있습니까?","slug":"can-i-use-both-apis-together","link":"#can-i-use-both-apis-together","children":[]},{"level":3,"title":"옵션 API가 더 이상 사용되지 않습니까?","slug":"will-options-api-be-deprecated","link":"#will-options-api-be-deprecated","children":[]}]},{"level":2,"title":"클래스 API와의 관계","slug":"relationship-with-class-api","link":"#relationship-with-class-api","children":[]},{"level":2,"title":"React 훅과의 비교","slug":"comparison-with-react-hooks","link":"#comparison-with-react-hooks","children":[]}],"relativePath":"guide/extras/composition-api-faq.md"}'),t={name:"guide/extras/composition-api-faq.md"},l=[o('<div class="warning custom-block"><p class="custom-block-title">현재 이 문서는 번역 작업이 진행중입니다</p></div><h1 id="composition-api-faq" tabindex="-1">컴포지션 API FAQ <a class="header-anchor" href="#composition-api-faq" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>이 FAQ는 Vue 2를 사용해본 경험이 있거나, 주로 옵션 API를 사용하고 있다는 것을 전제로 합니다.</p></div><h2 id="what-is-composition-api" tabindex="-1">컴포지션 API란? <a class="header-anchor" href="#what-is-composition-api" aria-hidden="true">#</a></h2><p>컴포지션(Composition) API는 옵션을 선언하는 대신 <code>import</code>한 함수를 사용하여 Vue 컴포넌트를 작성할 수 있는 API 세트입니다. 이것은 아래 API를 다루는 포괄적인 용어입니다:</p><ul><li><p><a href="/api/reactivity-core.html">반응형(Reactivity) API</a>: 예를 들어 <code>ref()</code> 및 <code>reactive()</code>를 사용하여 반응형 상태, 계산된 상태 및 감시자를 직접 생성할 수 있습니다.</p></li><li><p><a href="/api/composition-api-lifecycle.html">생명주기 훅</a>: 예를 들어 <code>onMounted()</code> 및 <code>onUnmounted()</code>를 사용하여 컴포넌트 생명주기에 프로그래밍 방식으로 연결할 수 있습니다.</p></li><li><p><a href="/api/composition-api-dependency-injection.html">의존성 주입(Dependency Injection)</a>: <code>provide()</code> 및 <code>inject()</code>를 사용하면 반응형 API를 사용하는 동안 Vue의 의존성 주입 시스템을 활용할 수 있습니다.</p></li></ul><p>컴포지션 API는 Vue 3 및 <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank" rel="noreferrer">Vue 2.7</a>에 내장된 기능입니다. 이전 Vue 2 버전의 경우 공식적으로 유지 관리되는 <a href="https://github.com/vuejs/composition-api" target="_blank" rel="noreferrer"><code>@vue/composition-api</code></a> 플러그인을 사용하십시오. Vue 3에서는 주로 단일 파일 컴포넌트에서 <a href="/api/sfc-script-setup.html"><code>&lt;스크립트 설정&gt;</code></a> 구문과 함께 사용되기도 합니다. 다음은 컴포지션 API를 사용하는 컴포넌트의 기본 예시입니다:</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 반응형 상태</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 상태를 변경하고 업데이트를 트리거하는 함수</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">increment</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;font-style:italic;">// 생명주기 훅</span></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">숫자를 세기 위한 초기값은 </span><span style="color:#89DDFF;">${</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> 입니다.</span><span style="color:#89DDFF;">`</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">숫자 세기: {{ count }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>함수 구성에 기반한 API 스타일에도 불구하고 <strong>컴포지션 API는 함수형 프로그래밍이 아닙니다</strong>. 컴포지션 API는 Vue의 변경 가능하고 세분화된 반응성 패러다임을 기반으로 하는 반면 기능적 프로그래밍은 불변성을 강조합니다.</p><p>Vue를 컴포지션 API와 함께 사용하는 방법을 배우고 싶다면 왼쪽 사이드바 상단의 토글을 사용하여 사이트 전체 API 환경 설정을 컴포지션 API로 설정한 다음 처음부터 가이드를 살펴보세요.</p><h2 id="why-composition-api" tabindex="-1">왜 컴포지션 API인가요? <a class="header-anchor" href="#why-composition-api" aria-hidden="true">#</a></h2><h3 id="better-logic-reuse" tabindex="-1">더 나은 로직 재사용성 <a class="header-anchor" href="#better-logic-reuse" aria-hidden="true">#</a></h3><p>컴포지션 API의 가장 큰 장점은 <a href="/guide/reusability/composables.html">컴포저블 함수</a>의 형태로 깔끔하고 효율적인 로직 재사용이 가능하다는 것입니다. 옵션 API의 기본 로직 재사용 메커니즘인 <a href="/guide/reusability/composables.html#vs-mixins">믹스인의 모든 단점</a>을 해결합니다.</p><p>컴포지션 API의 로직 재사용 기능은 컴포저블 유틸리티의 계속 성장하는 컬렉션인 <a href="https://vueuse.org/" target="_blank" rel="noreferrer">VueUse</a>와 같은 인상적인 커뮤니티 프로젝트를 탄생시켰습니다. 또한 상태 저장 타사 서비스 또는 라이브러리를 <a href="/guide/extras/reactivity-in-depth.html#immutable-data">불변 데이터</a>, <a href="/guide/extras/reactivity-in-depth.html#state-machines">상태 머신</a> 및 <a href="https://vueuse.org/rxjs/readme.html#vueuse-rxjs" target="_blank" rel="noreferrer">RxJS</a>와 같은 Vue의 반응형 시스템에 쉽게 통합하기 위한 깔끔한 메커니즘 역할을 합니다.</p><h3 id="more-flexible-code-organization" tabindex="-1">보다 유연한 코드 구성 <a class="header-anchor" href="#more-flexible-code-organization" aria-hidden="true">#</a></h3><p>많은 사용자는 기본적으로 옵션 API를 사용하여 조직화된 코드를 작성하는 것을 좋아합니다. 그러나 옵션 API는 단일 컴포넌트의 논리가 특정 복잡성 임계값을 초과하는 경우 심각한 제한을 가집니다. 이 제한은 여러 프로덕션 Vue 2 앱에서 직접 목격한 여러 <strong>논리적 문제</strong>를 처리해야 하는 컴포넌트에서 특히 두드러집니다.</p><p>Vue CLI의 GUI에서 폴더 탐색기 컴포넌트를 예로 들어 보겠습니다. 이 컴포넌트는 다음과 같은 논리적 문제를 야기합니다:</p><ul><li>현재 폴더 상태 추적 및 내용 표시</li><li>폴더 탐색 처리(열기, 닫기, 새로 고침...)</li><li>새 폴더 생성 처리</li><li>즐겨찾기 폴더만 표시 전환</li><li>숨김 폴더 표시 전환</li><li>현재 작업 디렉터리 변경 처리</li></ul><p>컴포넌트의 <a href="https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404" target="_blank" rel="noreferrer">원본 버전</a>은 옵션 API로 작성되었습니다. 다루는 논리적 문제를 기준으로 코드의 각 라인에 색상을 지정하면 다음과 같이 표시됩니다:</p><img alt="folder component before" src="/assets/options-api.4c42b509.png" width="129" height="500" style="margin:1.2em auto;"><p>동일한 논리적 문제를 처리하는 코드가 파일의 다른 부분에 분할어 있습니다. 수백 줄 길이의 컴포넌트에서 단일 논리적 문제를 이해하고 탐색하려면 파일을 지속적으로 위아래로 스크롤해야 하므로 어렵습니다. 또한 논리적 문제를 재사용 가능한 유틸리티로 추출하려는 경우, 파일의 다른 부분에서 올바른 코드 조각을 찾아 추출하는 데 상당한 노력이 필요합니다.</p><p>다음은 <a href="https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e" target="_blank" rel="noreferrer">Composition API로 리팩터링</a> 전후의 동일한 컴포넌트입니다:</p><p><img src="/assets/composition-api-after.e3f2c350.png" alt="folder component after"></p><p>동일한 논리적 문제와 관련된 코드가 어떻게 그룹화 되었는지 보십시오. 특정 논리적 문제를 해결하는 동안 더 이상 다른 옵션 블록 사이를 이동할 필요가 없습니다. 또한, 추출을 위해 더 이상 코드를 섞을 필요가 없기 때문에 최소한의 노력으로 코드 그룹을 외부 파일로 이동할 수 있습니다. 리팩토링을 위한 소모 시간 감소는 대규모 코드베이스에서 장기적인 유지 관리의 핵심입니다.</p><h3 id="better-type-inference" tabindex="-1">더 나은 타입 추론 <a class="header-anchor" href="#better-type-inference" aria-hidden="true">#</a></h3><p>최근 몇 년 동안 점점 더 많은 프론트엔드 개발자들이 <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a>를 채택하고 있습니다. 이는 우리가 보다 강력한 코드를 작성하고, 보다 자신 있게 변경하고, IDE 지원을 통해 뛰어난 개발 경험을 제공하는 데 도움이 되기 때문입니다. 그러나 원래 2013년에 구상된 옵션 API는 유형 추론을 염두에 두지 않고 설계되었습니다. 유형 추론이 옵션 API와 함께 작동하도록 하기 위해 일부 <a href="https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165" target="_blank" rel="noreferrer">터무니없이 복잡한 유형 구조</a>를 구현해야 했습니다. 이 모든 노력에도 불구하고 옵션 API에 대한 유형 추론은 여전히 믹스인 및 의존성 주입에 대해 분해될 수 있습니다.</p><p>이로 인해 TS와 함께 Vue를 사용하고자 하는 많은 개발자가 <code>vue-class-component</code>로 구동되는 클래스 API에 의존하게 되었습니다. 그러나 클래스 기반 API는 2019년 Vue 3 개발 당시 2단계 제안에 불과했던 언어 기능인 ES 데코레이터에 크게 의존합니다. 저희는 불안정한 제안을 기반으로 공식 API를 만드는 것은 너무 위험하다고 생각했습니다. 그 이후로 데코레이터 제안은 또 한 번의 전면적인 개편을 거쳐 2022년에 마침내 3단계에 도달했습니다. 또한 클래스 기반 API는 옵션 API와 마찬가지로 로직 재사용 및 구성 제한이 있습니다.</p><p>이에 비해 컴포지션 API는 기본적으로 유형 친화적인 일반 변수와 함수를 주로 사용합니다. 컴포지션 API로 작성된 코드는 수동 유형 힌트가 거의 필요 없이 전체 유형 추론을 즐길 수 있습니다. 대부분의 경우 컴포지션 API 코드는 TypeScript와 일반 JavaScript에서 거의 동일하게 보입니다. 이것은 또한 일반 JavaScript 사용자가 부분적인 유형 추론의 이점을 누릴 수 있도록 합니다.</p><h3 id="smaller-production-bundle-and-less-overhead" tabindex="-1">더 작은 프로덕션 번들 및 더 적은 오버헤드 <a class="header-anchor" href="#smaller-production-bundle-and-less-overhead" aria-hidden="true">#</a></h3><p>컴포지션 API와 <code>&lt;script setup&gt;</code>으로 작성된 코드는 옵션 API에 비해 더 효율적이고 축소하기 쉽습니다. 이는 <code>&lt;script setup&gt;</code> 컴포넌트의 템플릿이 <code>&lt;script setup&gt;</code> 코드의 동일한 범위에 인라인된 함수로 컴파일되기 때문입니다. <code>this</code>의 속성 접근과 달리 컴파일된 템플릿 코드는 인스턴스 프락시 없이 <code>&lt;script setup&gt;</code> 내부에 선언된 변수에 직접 접근할 수 있습니다. 이것은 모든 변수 이름을 안전하게 단축할 수 있기 때문에 더 나은 축소로 이어집니다.</p><h2 id="relationship-with-options-api" tabindex="-1">옵션 API와의 관계 <a class="header-anchor" href="#relationship-with-options-api" aria-hidden="true">#</a></h2><h3 id="trade-offs" tabindex="-1">Trade-offs <a class="header-anchor" href="#trade-offs" aria-hidden="true">#</a></h3><p>옵션 API에서 넘어온 일부 사용자들는 그들의 컴포지션 API 코드가 덜 구성적이라 생각하고, 컴포지션 API가 코드 구성 측면에서 &quot;더 나쁘다&quot;고 결론짓습니다. 이러한 의견을 가진 사용자라면 해당 문제를 다른 관점에서 볼 것을 권장합니다.</p><p>컴포지션 API가 더 이상 코드를 해당 버킷에 넣도록 안내하는 &quot;가드 레일&quot;(<code>export default {}</code>)을 제공하지 않는다는 것입니다. 따라서 일반적인 JavaScript를 작성하는 것처럼 컴포넌트 코드를 작성할 수 있습니다. 그러므로 <strong>일반적인 JavaScript를 작성할 때와 마찬가지로 모든 코드 구성 모범 사례를 컴포지션 API 코드에 적용할 수 있고 적용해야 합니다</strong>. 잘 구성된 자바스크립트를 작성할 수 있다면 잘 구성된 컴포지션 API 코드도 작성할 수 있어야 합니다.</p><p>옵션 API를 사용하면 컴포넌트 코드를 작성할 때 &quot;생각을 덜&quot;할 수 있으므로 많은 사용자가 이 API를 좋아합니다. 정신적 피로도는 줄어들지만, 다양성 없이 규정된 코드 구성 패턴에 갇히게 되므로 대규모 프로젝트에서 코드 품질을 리팩토링하거나 개선하기 어려울 수 있습니다. 이와 관련하여 컴포지션 API는 더 나은 장기적인(거시적인) 확장성을 제공합니다.</p><h3 id="does-composition-api-cover-all-use-cases" tabindex="-1">컴포지션 API는 모든 사용 사례를 포괄합니까? <a class="header-anchor" href="#does-composition-api-cover-all-use-cases" aria-hidden="true">#</a></h3><p>상태 저장 로직 측면에서 그렇습니다. 컴포지션 API를 사용할 때 여전히 필요할 수 있는 옵션은 <code>props</code>, <code>emit</code>, <code>name</code> 및 <code>inheritAttrs</code>뿐입니다. <code>&lt;script setup&gt;</code>을 사용하는 경우 일반적으로 <code>inheritAttrs</code>가 별도의 일반 <code>&lt;script&gt;</code> 블록을 필요로 하는 유일한 옵션입니다.</p><p>위에 나열된 옵션과 함께 컴포지션 API를 독점적으로 사용하려는 경우, Vue에서 옵션 API 관련 코드를 삭제하는 <a href="https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags" target="_blank" rel="noreferrer">컴파일 타임 플래그</a>를 통해 프로덕션 번들에서 몇 kb를 줄일 수 있습니다. 이것은 의존성의 Vue 컴포넌트에도 영향을 미칩니다.</p><h3 id="can-i-use-both-apis-together" tabindex="-1">두 API를 함께 사용할 수 있습니까? <a class="header-anchor" href="#can-i-use-both-apis-together" aria-hidden="true">#</a></h3><p>예. 옵션 API 컴포넌트에서 <a href="/api/composition-api-setup.html"><code>setup()</code></a> 옵션을 통해 컴포지션 API를 사용할 수 있습니다.</p><p>그러나 컴포지션 API로 작성된 새 기능 또는 외부 라이브러리와 통합해야 하는 기존 옵션 API 코드베이스가 있는 경우에만 그렇게 하는 것이 좋습니다.</p><h3 id="will-options-api-be-deprecated" tabindex="-1">옵션 API가 더 이상 사용되지 않습니까? <a class="header-anchor" href="#will-options-api-be-deprecated" aria-hidden="true">#</a></h3><p>아니요, 그렇게 할 계획이 없습니다. 옵션 API는 Vue의 필수적인 부분이며 많은 개발자들이 Vue를 좋아하는 이유입니다. 또한 컴포지션 API의 많은 이점은 대규모 프로젝트에서만 나타나고, 옵션 API는 복잡성이 낮은 여러 시나리오에서 여전히 확실한 선택이라는 것을 알고 있습니다.</p><h2 id="relationship-with-class-api" tabindex="-1">클래스 API와의 관계 <a class="header-anchor" href="#relationship-with-class-api" aria-hidden="true">#</a></h2><p>컴포지션 API가 추가 로직 재사용 및 코드 구성 이점과 함께 뛰어난 TypeScript 통합을 제공한다는 점을 감안할 때 Vue 3에서 Class API를 더 이상 사용하지 않는 것이 좋습니다.</p><h2 id="comparison-with-react-hooks" tabindex="-1">React 훅과의 비교 <a class="header-anchor" href="#comparison-with-react-hooks" aria-hidden="true">#</a></h2><p>컴포지션 API는 React 훅과 동일한 수준의 로직 구성 기능을 제공하지만 몇 가지 중요한 차이점이 있습니다.</p><p>React 훅은 컴포넌트가 업데이트될 때마다 반복적으로 호출됩니다. 이것은 노련한 React 개발자도 혼동할 수 있는 여러 가지 주의 사항을 만듭니다. 또한 개발 경험에 심각한 영향을 줄 수 있는 성능 최적화 문제로 이어집니다. 여기 몇 가지 예가 있습니다:</p><ul><li><p>Hooks are call-order sensitive and cannot be conditional.</p></li><li><p>Variables declared in a React component can be captured by a hook closure and become &quot;stale&quot; if the developer fails to pass in the correct dependencies array. This leads to React developers relying on ESLint rules to ensure correct dependencies are passed. However, the rule is often not smart enough and over-compensates for correctness, which leads to unnecessary invalidation and headaches when edge cases are encountered.</p></li><li><p>Expensive computations require the use of <code>useMemo</code>, which again requires manually passing in the correct dependencies array.</p></li><li><p>Event handlers passed to child components cause unnecessary child updates by default, and require explicit <code>useCallback</code> as an optimization. This is almost always needed, and again requires a correct dependencies array. Neglecting this leads to over-rendering apps by default and can cause performance issues without realizing it.</p></li><li><p>The stale closure problem, combined with Concurrent features, makes it difficult to reason about when a piece of hooks code is run, and makes working with mutable state that should persist across renders (via <code>useRef</code>) cumbersome.</p></li></ul><p>이에 비해 Vue 컴포지션 API는 다음과 같습니다:</p><ul><li><p>Invokes <code>setup()</code> or <code>&lt;script setup&gt;</code> code only once. This makes the code align better with the intuitions of idiomatic JavaScript usage as there are no stale closures to worry about. Composition API calls are also not sensitive to call order and can be conditional.</p></li><li><p>Vue&#39;s runtime reactivity system automatically collects reactive dependencies used in computed properties and watchers, so there&#39;s no need to manually declare dependencies.</p></li><li><p>No need to manually cache callback functions to avoid unnecessary child updates. In general, Vue&#39;s fine-grained reactivity system ensures child components only update when they need to. Manual child-update optimizations are rarely a concern for Vue developers.</p></li></ul><p>우리는 React 훅의 창의성을 인정하며 이는 컴포지션 API에 주요 영감의 원천입니다. 그러나 위에서 언급한 문제는 설계에 존재하며, Vue의 반응형 모델이 이러한 문제를 해결할 수 있는 방법을 제공한다는 것을 알게 되었습니다.</p>',52)];const p=e(t,[["render",function(e,o,n,t,p,i){return a(),s("div",null,l)}]]);export{n as __pageData,p as default};
