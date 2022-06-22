export default {
  data() {
    return {
      message: '안녕 Vue!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('탐색이 금지되었습니다.')
    }
  }
}
