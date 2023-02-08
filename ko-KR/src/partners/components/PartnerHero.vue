<script setup lang="ts">
const { title = 'Vue Partners' } = defineProps<{ title?: string }>()
</script>

<template>
  <div class="PartnerHero">
    <h1 class="title">{{ title }}</h1>
    <p class="lead">
      Vue 파트너는 Vue 팀이 승인한 에이전시로서 최고 수준의
      Vue 컨설팅 및 개발 서비스를 제공합니다. 귀사가
      파트너로 등록하는 데 관심이 있으시면
      <a href="https://airtable.com/shrCQhat57SApJI2l" target="_blank"
        >에서 관심을 등록하세요</a
      >.
    </p>
  </div>
</template>

<style scoped>
.PartnerHero {
  padding: 48px 24px;
  text-align: center;
  margin: 0 auto;
  max-width: 688px;
}

@media (min-width: 768px) {
  .PartnerHero {
    padding: 64px 32px;
  }
}

.title,
.lead,
.PartnerHero :deep(.link) {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 0.3em;
}

@media (min-width: 768px) {
  .title {
    line-height: 40px;
    font-size: 40px;
  }
}

.lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.lead a {
  color: var(--vt-c-brand);
}

.PartnerHero :deep(.link) {
  color: var(--vt-c-brand);
}

.PartnerHero :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}
</style>
