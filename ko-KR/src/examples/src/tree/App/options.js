import TreeItem from './TreeItem.vue'

const treeData = {
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
}

export default {
  components: {
    TreeItem
  },
  data() {
    return {
      treeData
    }
  }
}
