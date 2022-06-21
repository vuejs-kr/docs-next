import ListItem from './ListItem.vue'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: '채소' },
        { id: 1, text: '치즈' },
        { id: 2, text: '인간이 먹을 수 있는 모든 것' }
      ]
    }
  }
}
