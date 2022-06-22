import { ref } from 'vue'

export default {
  setup() {
    // "ref"는 값을 저장하는 반응형 데이터 소스입니다.
    // 기술적으로 문자열을 표시하기 위해
    // ref()로 문자열을 래핑할 필요는 없지만,
    // 값을 변경하려는 경우, 왜 래핑이 필요한지
    // 다음 예제에서 알게 됩니다.
    const message = ref('안녕 Vue!')

    return {
      message
    }
  }
}
