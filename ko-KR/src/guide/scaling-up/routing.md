# 라우팅 {#routing}
## 클라이언트 측 라우팅과 서버 측 라우팅 비교 {#client-side-vs-server-side-routing}

서버 측에서의 라우팅은 서버가 사용자가 방문한 URL 경로를 기반으로 응답을 전송하는 것을 의미합니다. 기존 서버 렌더링 웹 앱에서 링크를 클릭하면 브라우저는 서버로부터 HTML 응답을 수신하고 새 HTML로 전체 페이지를 다시 로드합니다.

그러나 [싱글 페이지 애플리케이션](https://developer.mozilla.org/en-US/docs/Glossary/SPA)(SPA)에서는 클라이언트 측 자바스크립트가 탐색을 가로채고 새 데이터를 동적으로 가져와 전체 페이지를 다시 로드하지 않고 현재 페이지를 업데이트할 수 있습니다. 이는 일반적으로 사용자가 오랜 시간 동안 많은 상호 작용을 수행해야 하는 실제 "애플리케이션"과 유사한 사용 사례에서 보다 빠른 사용자 경험을 제공합니다.

이러한 SPA에서 '라우팅'은 브라우저의 클라이언트 측에서 수행됩니다. 클라이언트 측 라우터는 [히스토리 API](https://developer.mozilla.org/en-US/docs/Web/API/History) 또는 [`hashchange` 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)와 같은 브라우저 API를 사용하여 애플리케이션의 렌더링된 View를 관리할 책임이 있습니다.

## 공식 라우터 {#official-router}

대부분의 싱글 페이지 앱(SPA)의 경우 공식적으로 지원되는 [vue-router 라이브러리](https://github.com/vuejs/router)를 사용하는 것이 좋습니다.
자세한 내용은 vue-router의 [문서](https://router.vuejs.kr/)를 참조하십시오.

## 간단한 라우팅 구성하기 {#simple-routing-from-scratch}

매우 간단한 라우팅만 필요하여 모든 기능을 갖춘 라우터 라이브러리를 포함하지 않으려면 [동적인 컴포넌트](/guide/essentials/component-basics.html#dynamic-components)를 사용하고,
브라우저 [`hashchange` 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)를 수신하거나 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)를 사용하여 현재 컴포넌트 상태를 업데이트할 수 있습니다.

다음은 기본적인 예입니다:

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">잘못된 링크</a>
  <component :is="currentView" />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgSG9tZSBmcm9tICcuL0hvbWUudnVlJ1xuaW1wb3J0IEFib3V0IGZyb20gJy4vQWJvdXQudnVlJ1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4vTm90Rm91bmQudnVlJ1xuXG5jb25zdCByb3V0ZXMgPSB7XG4gICcvJzogSG9tZSxcbiAgJy9hYm91dCc6IEFib3V0XG59XG5cbmNvbnN0IGN1cnJlbnRQYXRoID0gcmVmKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcbiAgY3VycmVudFBhdGgudmFsdWUgPSB3aW5kb3cubG9jYXRpb24uaGFzaFxufSlcblxuY29uc3QgY3VycmVudFZpZXcgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiByb3V0ZXNbY3VycmVudFBhdGgudmFsdWUuc2xpY2UoMSkgfHwgJy8nXSB8fCBOb3RGb3VuZFxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxhIGhyZWY9XCIjL1wiPkhvbWU8L2E+IHxcbiAgPGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT4gfFxuICA8YSBocmVmPVwiIy9ub24tZXhpc3RlbnQtcGF0aFwiPuyemOuqu+uQnCDrp4Htgaw8L2E+XG4gIDxjb21wb25lbnQgOmlzPVwiY3VycmVudFZpZXdcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+SG9tZTwvaDE+XG48L3RlbXBsYXRlPiIsIkFib3V0LnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGgxPkFib3V0PC9oMT5cbjwvdGVtcGxhdGU+IiwiTm90Rm91bmQudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+NDA0PC9oMT5cbiAgPHA+7Y6Y7J207KeA66W8IOywvuydhCDsiJgg7JeG7Iq164uI64ukLiDimLk8L3A+XG48L3RlbXBsYXRlPiJ9)

</div>

<div class="options-api">

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">잘못된 링크</a>
  <component :is="currentView" />
</template>
```

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBIb21lIGZyb20gJy4vSG9tZS52dWUnXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi9BYm91dC52dWUnXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi9Ob3RGb3VuZC52dWUnXG5cbmNvbnN0IHJvdXRlcyA9IHtcbiAgJy8nOiBIb21lLFxuICAnL2Fib3V0JzogQWJvdXRcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGF0aDogd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgY3VycmVudFZpZXcoKSB7XG4gICAgICByZXR1cm4gcm91dGVzW3RoaXMuY3VycmVudFBhdGguc2xpY2UoMSkgfHwgJy8nXSB8fCBOb3RGb3VuZFxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcblx0XHQgIHRoaXMuY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaFxuXHRcdH0pXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxhIGhyZWY9XCIjL1wiPkhvbWU8L2E+IHxcbiAgPGEgaHJlZj1cIiMvYWJvdXRcIj5BYm91dDwvYT4gfFxuICA8YSBocmVmPVwiIy9ub24tZXhpc3RlbnQtcGF0aFwiPuyemOuqu+uQnCDrp4Htgaw8L2E+XG4gIDxjb21wb25lbnQgOmlzPVwiY3VycmVudFZpZXdcIiAvPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkhvbWUudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+SG9tZTwvaDE+XG48L3RlbXBsYXRlPiIsIkFib3V0LnZ1ZSI6Ijx0ZW1wbGF0ZT5cbiAgPGgxPkFib3V0PC9oMT5cbjwvdGVtcGxhdGU+IiwiTm90Rm91bmQudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+NDA0PC9oMT5cbiAgPHA+7Y6Y7J207KeA66W8IOywvuydhCDsiJgg7JeG7Iq164uI64ukLiDimLk8L3A+XG48L3RlbXBsYXRlPiJ9)

</div>
