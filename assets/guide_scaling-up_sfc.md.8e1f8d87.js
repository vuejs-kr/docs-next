import{_ as e,c as s,o as a,a as n}from"./app.a19aada9.js";const o='{"title":"Single-File Components","description":"","frontmatter":{},"headers":[{"level":2,"title":"Introduction","slug":"introduction"},{"level":2,"title":"Why SFC","slug":"why-sfc"},{"level":2,"title":"How It Works","slug":"how-it-works"},{"level":2,"title":"What About Separation of Concerns?","slug":"what-about-separation-of-concerns"}],"relativePath":"guide/scaling-up/sfc.md"}',t={},l=[n('<div class="warning custom-block"><p class="custom-block-title">현재 이 문서는 번역 작업이 진행중입니다</p></div><h1 id="single-file-components" tabindex="-1">Single-File Components <a class="header-anchor" href="#single-file-components" aria-hidden="true">#</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><p>Vue Single-File Components (a.k.a. <code>*.vue</code> files, abbreviated as <strong>SFC</strong>) is a special file format that allows us to encapsulate the template, logic, <strong>and</strong> styling of a Vue component in a single file. Here&#39;s an example SFC:</p><div class="language-vue"><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      greeting</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello World!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">greeting</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;"> greeting </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">greeting</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">font-weight</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> bold</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>As we can see, Vue SFC is a natural extension of the classic trio of HTML, CSS and JavaScript. The <code>&lt;template&gt;</code>, <code>&lt;script&gt;</code>, and <code>&lt;style&gt;</code> blocks encapsulate and colocate the view, logic and styling of a component in the same file. The full syntax is defined in the <a href="/api/sfc-spec.html">SFC Syntax Specification</a>.</p><h2 id="why-sfc" tabindex="-1">Why SFC <a class="header-anchor" href="#why-sfc" aria-hidden="true">#</a></h2><p>While SFCs require a build step, there are numerous benefits in return:</p><ul><li>Author modularized components using familiar HTML, CSS and JavaScript syntax</li><li><a href="#what-about-separation-of-concerns">Colocation of inherently coupled concerns</a></li><li>Pre-compiled templates</li><li><a href="/api/sfc-css-features.html">Component-scoped CSS</a></li><li><a href="/api/sfc-script-setup.html">More ergonomic syntax when working with Composition API</a></li><li>More compile-time optimizations by cross-analyzing template and script</li><li><a href="/guide/scaling-up/tooling.html#ide-support">IDE support</a> with auto-completion and type-checking for template expressions</li><li>Out-of-the-box Hot-Module Replacement (HMR) support</li></ul><p>SFC is a defining feature of Vue as a framework, and is the recommended approach for using Vue in the following scenarios:</p><ul><li>Single-Page Applications (SPA)</li><li>Static Site Generation (SSG)</li><li>Any non-trivial frontend where a build step can be justified for better development experience (DX).</li></ul><p>That said, we do realize there are scenarios where SFCs can feel like overkill. This is why Vue can still be used via plain JavaScript without a build step. If you are just looking for enhancing largely static HTML with light interactions, you can also check out <a href="https://github.com/vuejs/petite-vue" target="_blank" rel="noopener noreferrer">petite-vue</a>, a 6 kB subset of Vue optimized for progressive enhancement.</p><h2 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-hidden="true">#</a></h2><p>Vue SFC is a framework-specific file format and must be pre-compiled by <a href="https://github.com/vuejs/core/tree/main/packages/compiler-sfc" target="_blank" rel="noopener noreferrer">@vue/compiler-sfc</a> into standard JavaScript and CSS. A compiled SFC is a standard JavaScript (ES) module - which means with proper build setup you can import an SFC like a module:</p><div class="language-js"><pre><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> MyComponent </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./MyComponent.vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    MyComponent</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p><code>&lt;style&gt;</code> tags inside SFCs are typically injected as native <code>&lt;style&gt;</code> tags during development to support hot updates. For production they can be extracted and merged into a single CSS file.</p><p>You can play with SFCs and explore how they are compiled in the <a href="https://sfc.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue SFC Playground</a>.</p><p>In actual projects, we typically integrate the SFC compiler with a build tool such as <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite</a> or <a href="http://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue CLI</a> (which is based on <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer">webpack</a>), and Vue provides official scaffolding tools to get you started with SFCs as fast as possible. Check out more details in the <a href="/guide/scaling-up/tooling.html">SFC Tooling</a> section.</p><h2 id="what-about-separation-of-concerns" tabindex="-1">What About Separation of Concerns? <a class="header-anchor" href="#what-about-separation-of-concerns" aria-hidden="true">#</a></h2><p>Some users coming from a traditional web development background may have the concern that SFCs are mixing different concerns in the same place - which HTML/CSS/JS were supposed to separate!</p><p>To answer this question, it is important for us to agree that <strong>separation of concerns is not equal to the separation of file types</strong>. The ultimate goal of engineering principles is to improve the maintainability of codebases. Separation of concerns, when applied dogmatically as separation of file types, does not help us reach that goal in the context of increasingly complex frontend applications.</p><p>In modern UI development, we have found that instead of dividing the codebase into three huge layers that interweave with one another, it makes much more sense to divide them into loosely-coupled components and compose them. Inside a component, its template, logic, and styles are inherently coupled, and colocating them actually makes the component more cohesive and maintainable.</p><p>Note even if you don&#39;t like the idea of Single-File Components, you can still leverage its hot-reloading and pre-compilation features by separating your JavaScript and CSS into separate files using <a href="/api/sfc-spec.html#src-imports">Src Imports</a>.</p>',23)];var p=e(t,[["render",function(e,n,o,t,p,i){return a(),s("div",null,l)}]]);export{o as __pageData,p as default};
