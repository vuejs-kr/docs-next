<script setup>
import ElasticHeader from './demos/ElasticHeader.vue'
import DisabledButton from './demos/DisabledButton.vue'
import Colors from './demos/Colors.vue'
import AnimateWatcher from './demos/AnimateWatcher.vue'
</script>

# 애니메이션 기법

Vue는 진입(enter)/진출(leave) 및 목록 전환 처리를 위해 [`<Transition>`](/guide/built-ins/transition.html) 및 [`<TransitionGroup>`](/guide/built-ins/transition-group.html) 컴포넌트를 제공합니다.
그러나 Vue 앱에서도 웹에서 애니메이션을 사용하는 다른 방법이 많이 있습니다.
여기에서는 몇 가지 추가적인 기법에 대해 설명합니다.

## 클래스 기반 애니메이션

DOM에 진입/진출하지 않는 엘리먼트의 경우, CSS 클래스를 동적으로 추가하여 애니메이션을 트리거할 수 있습니다:

<div class="composition-api">

```js
const disabled = ref(false)

function warnDisabled() {
  disabled.value = true
  setTimeout(() => {
    disabled.value = false
  }, 1500)
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }
  }
}
```

</div>

```vue-html
<div :class="{ shake: disabled }">
  <button @click="warnDisabled">클릭하기</button>
  <span v-if="disabled">이 기능은 비활성화되어 있습니다!</span>
</div>
```

```css
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
```

<DisabledButton />

## 상태 기반 애니메이션

예를 들어 상호 작용이 발생하는 동안 엘리먼트에 스타일을 바인딩하여 값을 보간하여 일부 트렌지션 효과를 적용할 수 있습니다.
예를 들면 다음과 같습니다:

<div class="composition-api">

```js
const x = ref(0)

function onMousemove(e) {
  x.value = e.clientX
}
```

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      x: 0
    }
  },
  methods: {
    onMousemove(e) {
      this.x = e.clientX
    }
  }
}
```

</div>

```vue-html
<div
  @mousemove="onMousemove"
  :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }"
  class="movearea"
>
  <p>이 div에서 마우스를 움직이세요...</p>
  <p>x: {{ x }}</p>
</div>
```

```css
.movearea {
  transition: 0.3s background-color ease;
}
```

<Colors />

색상 외에도 스타일 바인딩을 사용하여 `transform`, `width` 또는 `height`에 애니메이션을 적용할 수도 있습니다.
스프링 물리학을 사용하여 SVG `path`에 애니메이션할 수도 있습니다.
결국 모두 속성 데이터 바인딩입니다:

<ElasticHeader />

## 감시자로 애니메이션 만들기

약간의 창의성으로 우리는 감시자를 사용하여 수치 상태를 기반으로 무엇이든 애니메이션할 수 있습니다.
예를 들어 숫자 자체에 애니메이션을 적용할 수 있습니다:

<div class="composition-api">

```js
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap' // 타사 라이브러리

const number = ref(0)
const tweened = reactive({
  number: 0
})

watch(number, (n) => {
  gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
})
```

</div>
<div class="options-api">

```js
import gsap from 'gsap' // 타사 라이브러리

export default {
  data() {
    return {
      number: 0,
      tweened: 0
    }
  },
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    }
  }
}
```

</div>

```vue-html
숫자 입력: <input v-model.number="number" />
<p>{{ tweened.number.toFixed(0) }}</p>
```

<AnimateWatcher />

<div class="composition-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IGdzYXAgZnJvbSAnZ3NhcCdcblxuY29uc3QgbnVtYmVyID0gcmVmKDApXG5jb25zdCB0d2VlbmVkID0gcmVhY3RpdmUoe1xuICBudW1iZXI6IDBcbn0pXG5cbndhdGNoKFxuICBudW1iZXIsXG4gIChuKSA9PiB7XG4gICAgZ3NhcC50byh0d2VlbmVkLCB7IGR1cmF0aW9uOiAwLjUsIG51bWJlcjogTnVtYmVyKG4pIHx8IDAgfSlcbiAgfVxuKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICDsiKvsnpAg7J6F66ClOiA8aW5wdXQgdi1tb2RlbC5udW1iZXI9XCJudW1iZXJcIiAvPlxuICAgIDxwIGNsYXNzPVwiYmlnLW51bWJlclwiPnt7IHR3ZWVuZWQubnVtYmVyLnRvRml4ZWQoMCkgfX08L3A+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmJpZy1udW1iZXIge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAyZW07XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwiZ3NhcFwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2dzYXA/bW9kdWxlXCIsXG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[온라인 연습장으로 실행하기](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbnVtYmVyOiAwLFxuICAgICAgdHdlZW5lZDogMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBudW1iZXIobikge1xuICAgICAgZ3NhcC50byh0aGlzLCB7IGR1cmF0aW9uOiAwLjUsIHR3ZWVuZWQ6IE51bWJlcihuKSB8fCAwIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHTsiKvsnpAg7J6F66ClOiA8aW5wdXQgdi1tb2RlbC5udW1iZXI9XCJudW1iZXJcIiAvPlxuXHQ8cCBjbGFzcz1cImJpZy1udW1iZXJcIj57eyB0d2VlbmVkLnRvRml4ZWQoMCkgfX08L3A+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYmlnLW51bWJlciB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDJlbTtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwiZ3NhcFwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2dzYXA/bW9kdWxlXCIsXG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
