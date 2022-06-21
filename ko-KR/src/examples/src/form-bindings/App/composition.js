import { ref } from 'vue'

export default {
  setup() {
    const text = ref('수정해보세요')
    const checked = ref(true)
    const checkedNames = ref(['철수'])
    const picked = ref('서울')
    const selected = ref('가')
    const multiSelected = ref(['무궁화'])

    return {
      text,
      checked,
      checkedNames,
      picked,
      selected,
      multiSelected
    }
  }
}
