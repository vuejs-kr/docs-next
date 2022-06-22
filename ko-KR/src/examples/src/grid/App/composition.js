import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['name', 'power']
    const gridData = [
      { name: '손오공', power: Infinity },
      { name: '이소룡', power: 9000 },
      { name: '성룡', power: 7000 },
      { name: '이연걸', power: 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
