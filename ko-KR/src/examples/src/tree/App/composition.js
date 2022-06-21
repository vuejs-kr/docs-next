import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: '나의 트리',
      children: [
        { name: '안녕' },
        { name: '반가워' },
        {
          name: '하위 폴더',
          children: [
            {
              name: '하위 폴더',
              children: [{ name: '안녕' }, { name: '반가워' }]
            },
            { name: '안녕' },
            { name: '반가워' },
            {
              name: '하위 폴더',
              children: [{ name: '안녕' }, { name: '반가워' }]
            }
          ]
        }
      ]
    })

    return {
      treeData
    }
  }
}
