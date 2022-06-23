<script setup lang='ts'>
import { VTSwitch } from '@vue/theme'
import { Ref, ref } from 'vue'

const hasStorage = typeof localStorage !== 'undefined'
const get = (key: string, defaultValue = false): boolean =>
  hasStorage
    ? JSON.parse(localStorage.getItem(key) || String(defaultValue))
    : defaultValue

const preferCompositionKey = 'vue-docs-prefer-composition'
const preferComposition = ref(get(preferCompositionKey))

const toggleCompositionAPI = useToggleFn(
  preferCompositionKey,
  preferComposition,
  'prefer-composition'
)

function useToggleFn(
  storageKey: string,
  state: Ref<boolean>,
  className: string
) {
  if (typeof localStorage === 'undefined') {
    return () => {}
  }
  const classList = document.documentElement.classList
  return (value = !state.value) => {
    if ((state.value = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, String(state.value))
  }
}
</script>
<template>
  <div class='position-hack'>
    <div class="preference-switches">
      <div class="switch-container">
        <label class="options-label" @click="toggleCompositionAPI(false)"
        >옵션</label>
        <VTSwitch
          class="api-switch"
          aria-label="컴포지션 api를 추천합니다"
          :aria-checked="preferComposition"
          @click="toggleCompositionAPI()"
        />
        <label
          class="composition-label"
          @click="toggleCompositionAPI(true)"
        >컴포지션</label>
        <a
          class="switch-link"
          title="API 스타일에 대하여"
          href="/guide/introduction.html#api-스타일"
          @click="closeSideBar"
        >?</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* custom-selector */
.position-hack {
  position: relative;
}

.preference-switches {
  font-size: 11px;
  padding: 8px 12px;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  /* custom-properties */
  position: absolute;
  bottom: -16px;
  right: 0;
}

.switch-container {
  display: flex;
  align-items: center;
}

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vt-switch {
  margin-right: 5px;
  transform: scale(0.8);
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 28px;
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: var(--vt-c-green);
  border: 1px solid var(--vt-c-green);
  border-radius: 50%;
}

/* custom-media */
@media (max-width: 639px) {
  .position-hack {
    margin: 0 -24px;
  }
}
</style>
