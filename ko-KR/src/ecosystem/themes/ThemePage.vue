<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>테마</template>
      <template #lead>테마, UI 키트 및 플러그인을 확인해보세요. 파트너가 Vue를 사용하여 실제 애플리케이션을 구축하는 방법을 확인할 수 있습니다.</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      당신이 만든 테마를 알리고 싶은가요? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">문의하세요!</a>
    </ThemeContact>
  </div>
</template>
