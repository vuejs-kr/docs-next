import { marked } from 'marked'
import { debounce } from 'lodash-es'
import { ref, computed } from 'vue'

export default {
  setup() {
    const input = ref('# 반가워요!')

    const output = computed(() => marked(input.value))

    const update = debounce((e) => {
      input.value = e.target.value
    }, 100)

    return {
      input,
      output,
      update
    }
  }
}
