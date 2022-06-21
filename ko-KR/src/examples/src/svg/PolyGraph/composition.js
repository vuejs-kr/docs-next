import AxisLabel from './AxisLabel.vue'
import { computed } from 'vue'
import { valueToPoint } from './util.js'

export default {
  components: {
    AxisLabel
  },
  props: {
    stats: Array
  },
  setup(props) {
    // polygon 태그의 points 속성에 적용할 계산된 속성
    const points = computed(() => {
      const total = props.stats.length
      return props.stats
        .map((stat, i) => {
          const { x, y } = valueToPoint(stat.value, i, total)
          return `${x},${y}`
        })
        .join(' ')
    })

    return {
      points
    }
  }
}
