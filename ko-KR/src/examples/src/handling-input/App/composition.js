import { ref } from 'vue'

export default {
  setup() {
    const message = ref('안녕 Vue!')

    function reverseMessage() {
      // .value 속성을 통해 ref 값에 접근/변경합니다.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('탐색이 금지되었습니다.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
