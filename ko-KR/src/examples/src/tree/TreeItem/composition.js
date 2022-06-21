import { ref, computed } from 'vue'

export default {
  name: 'TreeItem', // 자기 참조에 필요함
  props: {
    model: Object
  },
  setup(props) {
    const isOpen = ref(false)
    const isFolder = computed(() => {
      return props.model.children && props.model.children.length
    })

    function toggle() {
      isOpen.value = !isOpen.value
    }

    function changeType() {
      if (!isFolder.value) {
        props.model.children = []
        addChild()
        isOpen.value = true
      }
    }

    function addChild() {
      props.model.children.push({ name: '새로운 것' })
    }

    return {
      isOpen,
      isFolder,
      toggle,
      changeType,
      addChild
    }
  }
}
