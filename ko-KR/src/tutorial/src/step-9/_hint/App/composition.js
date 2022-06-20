import { ref, onMounted } from 'vue'

export default {
  setup() {
    const p = ref(null)

    onMounted(() => {
      p.value.textContent = '마운트 되었어요!'
    })

    return {
      p
    }
  }
}
