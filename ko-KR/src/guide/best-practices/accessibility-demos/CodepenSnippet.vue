<template>
  <iframe
    v-if='able'
    :height="height"
    :title="title"
    :src="`https://codepen.io/niceplugin/embed/${ slug }?default-tab=result`"
    style="width: 100%;"
    scrolling="no"
    frameborder="no"
    loading="lazy"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen <a :href="`https://codepen.io/niceplugin/pen/${ slug }`">
    {{ title }}</a> by NiceHwang (<a href="https://codepen.io/niceplugin">@niceplugin</a>)
    on <a href="https://codepen.io">CodePen</a>.
  </iframe>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  slug: String,
  height: {
    type: Number,
    default: 0
  }
})
const able = computed(() => {
  return props.title && props.slug && props.height
})
</script>

<style scoped>
iframe {
  margin: 28px 0;
}
</style>
