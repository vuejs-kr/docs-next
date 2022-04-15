<script setup lang="ts">
import NewsLetter from './NewsLetter.vue'
import SponsorsGroup from './SponsorsGroup.vue';
import VueMasteryModal from './VueMasteryModal.vue';
</script>

<template>
  <section id="hero">
    <h1 class="tagline">

      <span class="accent">프로그래시브</span>
      <br />자바스크립트 프레임워크
    </h1>
    <p class="description">
      웹 유저 인터페이스를 구축하기 위한 접근하기 쉽고 성능이 뛰어나며 다재다능한 프레임워크
    </p>
    <p class="actions">
      <vue-mastery-modal />
      <a class="get-started" href="/guide/introduction.html">
        시작하기
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>
      <a class="setup" href="/guide/quick-start.html">설치</a>
    </p>
  </section>

  <!-- TODO make dynamic based on data -->
  <section id="special-sponsor">
    <span>Special Sponsor</span>
    <a href="https://www.dcloud.io/hbuilderx.html?hmsr=vue-en&hmpl=&hmcu=&hmkw=&hmci=">
      <picture>
        <source type="image/avif" srcset="/images/sponsors/hbuilder.avif" />
        <img
          alt="hbuilder logo"
          width="97"
          height="36"
          src="/images/sponsors/hbuilder.png"
        />
      </picture>
    </a>
    <span>Vue를 위한 IDE</span>
  </section>

  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>접근하기 쉬운</h2>
      <p>
        직관적인 API 및 세계적 수준의 문서를 제공하며 표준 HTML, CSS 및 자바스크립트이 기반입니다.
      </p>
    </div>
    <div class="vt-box">
      <h2>성능이 뛰어난</h2>
      <p>
        완전히 반응형이며, 컴파일러를 통해 최적화된 렌더링 시스템은 수동 최적화를 거의 할 필요가 없습니다.
      </p>
    </div>
    <div class="vt-box">
      <h2>다재다능한</h2>
      <p>
        풍부한 기능을 점증적으로 적용할수 있는 생태계를 제공하여 단순히 라이브러리로도 사용할수 있고 모든 기능을 가진 프레임워크로도 사용할수 있습니다.
      </p>
    </div>
  </section>

  <section id="sponsors">
    <h2>플래티넘 스폰서</h2>
    <SponsorsGroup tier="platinum" placement="landing" />
    <h2>골드 스폰서</h2>
    <SponsorsGroup tier="gold" placement="landing" />
  </section>

  <NewsLetter />
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .get-started {
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.actions .get-started,
.actions .setup {
  color: var(--vt-c-text-code);
}

.actions .get-started:hover,
.actions .setup:hover {
  background-color: var(--vt-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover,
.dark .actions .setup:hover {
  background-color: var(--vt-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 24px;
  text-align: center;
}

#special-sponsor span {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 24px;
}

#special-sponsor img {
  display: inline-block;
  vertical-align: middle;
  height: 36px;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

#sponsors {
  max-width: 900px;
  margin: 0px auto;
}

#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

#sponsors .sponsor-container {
  margin-bottom: 3em;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }
  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 64px 32px;
  }
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }
  #highlights h3 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
  .actions a {
    margin: 0.5em 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
