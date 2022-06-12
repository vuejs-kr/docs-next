<script setup>
import TestingApiSwitcher from './TestingApiSwitcher.vue'
</script>

# 테스트

## 왜 테스트 해야 할까요?

자동화된 테스트는 여러 의미에서 퇴보될 수 있는 코드를 사전에 방지하고,
앱을 테스트 가능한 함수, 모듈, 클래스 및 컴포넌트로 분할하도록 권장하여,
귀하와 귀하의 팀이 복잡한 Vue 앱을 빠르고 자신 있게 빌드하는 데 도움이 됩니다.
다른 앱과 마찬가지로 새 Vue 앱은 여러 가지 방법으로 중단될 수 있으며,
릴리스 전에 이러한 문제를 파악하고 수정할 수 있는 것이 중요합니다.

이 가이드에서는 기본 용어를 다루고 Vue 3 앱에 어떤 도구를 선택해야 하는지에 대한 권장 사항을 제공합니다.

구성화를 다루는 Vue 특정 섹션이 있습니다.
자세한 내용은 아래의 [구성화 테스트](#구성화-테스트)를 참조하세요.

## 테스트 시기

어서 테스트을 시작하세요!!
가능한 한 빨리 테스트 작성을 시작하는 것이 좋습니다.
앱에 테스트 추가를 미룰수록 앱에 더 많은 종속성이 생기고 시작하기가 더 어려워집니다.

## 테스트 유형

Vue 앱의 테스트 전략을 설계할 때는 다음 테스트 유형을 활용해야 합니다:

- **단위**:
  주어진 함수, 클래스 또는 구성화에 제공된 입력 정보가 의도하는 출력 또는 사이드 이팩트를 생성하는지 확인합니다.
- **컴포넌트**:
  컴포넌트가 마운트, 렌더링, 상호 작용이 의도대로 작동하는지 확인합니다.
  이러한 테스트는 단위 테스트보다 더 많은 코드를 가져오고 더 복잡하며 실행하는 데 더 많은 시간이 필요합니다.
- **End-to-end**:
  여러 페이지에 걸쳐 있는 기능을 확인하고, 프로덕션으로 빌드되는 Vue 앱처럼 실제 네트워크 요청을 합니다.
  이러한 테스트에는 종종 데이터베이스 또는 기타 백엔드를 구축하는 작업이 포함됩니다.

테스트 전략에서 각 테스트 유형은 앱의 각기 다른 유형의 문제로부터 사용자를 보호하는 역할을 합니다.

## 개요

각 기능에 대해 간략한 설명과 Vue 앱에 이러한 기능을 구현하는 방법 및 몇 가지 일반적인 권장 사항에 대해 알아보겠습니다.

:::info 용어 설명
이 가이드 문서에서는 수차례 "모의"(영문에서: mock)라는 단어가 나옵니다.
사전적 의미와 유사지만 원활한 맥락 파악을 위해서

> "테스트 대상과 상호작용 하는 환경 또는 구성품들이, 이미 의도대로 구성되어 있다고 가정"

하는 것이라고 인지하고 있는 것이 좋습니다.
:::

## 단위 테스트

단위 테스트는 작고 독립된 코드 단위가 예상대로 작동하는지 확인하기 위해 작성됩니다.
단위 테스트는 일반적으로 단일 함수, 클래스, 구성화 또는 모듈을 다룹니다.
단위 테스트는 논리적 정확성에 초점을 맞추고 앱의 전체 기능 중 작은 부분에만 관심을 둡니다.
앱 환경의 많은 부분(예: 초기 상태, 복잡한 클래스, 타사 모듈 및 네트워크 요청)을 모의할 수 있습니다.

일반적으로 단위 테스트는 함수가 해야 할 일에 대한 논리 및 논리적 정확성 문제를 포착합니다.

예를 들어 다음 `increment` 함수를 살펴봅시다:

```js
// helpers.js
export function increment (current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

매우 독립적이기 때문에 이 함수를 호출하고 의도하는 결과 값을 반환한다는 검증이 쉬워보이므로, 단위 테스트를 작성해 보겠습니다.

이러한 검증 중 하나라도 실패하면 문제가 `increment` 함수에 있음이 분명합니다.

```js{4-16}
// helpers.spec.js
import { increment } from './helpers'

describe('increment', () => {
  test('현재 숫자를 1씩 증가', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('현재 숫자를 최대값 이상으로 증가시키지 않습니다.', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('기본 최대값은 10입니다.', () => {
    expect(increment(10)).toBe(10)
  })
})
```

앞서 언급했듯이 단위 테스트는 일반적으로 UI 렌더링, 네트워크 요청 또는 기타 환경 문제를 포함하지 않는 자체적으로 해야 할 일에 대한 논리, 컴포넌트, 클래스, 모듈 또는 함수에 적용됩니다.

이들은 일반적으로 Vue와 관련이 없는 일반 JavaScript/TypeScript 모듈입니다.
일반적으로 Vue 앱에서 비즈니스 로직에 대한 단위 테스트를 작성하는 것은 다른 프레임워크를 사용하는 앱과 크게 다르지 않습니다.

Vue 관련 기능을 단위 테스트하는 두 가지 경우가 있습니다.

1. 구성화
2. 컴포넌트

### 구성화

Vue 앱에 특별한 함수의 한 범주인 [구성화](/guide/reusability/composables.html)는 테스트 중에 특별한 처리가 필요할 수 있습니다.
자세한 내용은 아래의 [구성화 테스트](#구성화-테스트)를 참조하세요.

### 컴포넌트 단위 테스트

컴포넌트는 두 가지 방법으로 테스트할 수 있습니다:

1. Whitebox: 단위 테스트

   "화이트박스 테스트"는 컴포넌트의 구현 세부 정보 및 종속성을 인식합니다.
   테스트 중인 컴포넌트를 **격리**하는 데 중점을 둡니다.
   이러한 테스트에는 일반적으로 컴포넌트의 모든 자식은 아닐지라도 일부를 모의하고 플러그인 상태 및 종속성(예: Vuex)을 설정하는 작업이 포함됩니다.

2. Blackbox: 컴포넌트 테스트

   "블랙박스 테스트"는 컴포넌트의 구현 세부 정보를 인식하지 못합니다.
   이러한 테스트는 컴포넌트와 전체 시스템의 통합을 테스트하기 위해 가능한 한 적게 모의합니다.
   일반적으로 모든 자식 컴포넌트를 렌더링하며 "통합 테스트"에 가깝습니다.
   아래의 [컴포넌트 테스트 권장 사항](#컴포넌트-테스트)을 참조하세요.

### 추천

- [Vitest](https://vitest.dev/)

  `create-vue`로 생성된 공식 설정은 [Vite](https://vitejs.dev/)를 기반으로 하므로 동일한 구성을 활용하고 Vite에서 직접 파이프라인을 변환할 수 있는 단위 테스트 프레임워크를 사용하는 것이 좋습니다.
  [Vitest](https://vitest.dev/)는 이러한 목적을 위해 특별히 설계된 단위 테스트 프레임워크로 Vue/Vite 팀이 만들고 유지 관리합니다.
  최소한의 노력으로 Vite 기반 프로젝트와 통합되며, 매우 빠릅니다.

:::warning 현재 개발 중
Vitest는 비교적 새롭고 여전히 빠른 개발을 진행 중입니다. 아직 안정적인 것으로 간주되지는 않지만 팀은 프로덕션 준비 상태로 만들기 위해 열심히 노력하고 있습니다.
Vitest는 비교적 새로운 것이고 여전히 빠르게 발전하고 있습니다.
아직 안정적이지 않다고 여겨지지만, 프로덕션 준비 상태로 만들기 위해 열심히 노력하고 있습니다.
:::

### 다른 선택지

- [Peeky](https://peeky.dev/)는 최고의 Vite 통합 기능을 갖춘 또 다른 빠른 단위 테스트 러너입니다.
  또한 Vue 핵심 팀 구성원이 만들고 GUI 기반 테스트 인터페이스를 제공합니다.

- [Jest](https://jestjs.io/)는 인기 있는 단위 테스트 프레임워크이며, [vite-jest](https://github.com/sodatea/vite-jest) 패키지를 통해 Vite와 함께 작동하도록 만들 수 있습니다.
  그러나 Vitest가 보다 원활한 통합과 더 나은 성능을 제공하므로 Vite 기반 프로젝트로 마이그레이션해야 하는 기존 Jest 테스트 제품군이 있는 경우에만 Jest를 권장합니다.

## 컴포넌트 테스트

Vue 앱에서 컴포넌트는 UI 구성의 주요 요소입니다.
따라서 컴포넌트는 앱의 동작을 검증할 때 자연스럽게 독립된 단위입니다.
컴포넌트 테스트는 단위 테스트의 상위 개념이며, 통합 테스트의 한 형태로 간주될 수 있습니다.
Vue 앱의 대부분은 컴포넌트 테스트로 다루어야 하며, 각 Vue 컴포넌트에는 자체 스팩 파일이 있는 것이 좋습니다.

컴포넌트 테스트는 컴포넌트의 props, 이벤트, 제공하는 슬롯, 스타일, 클래스, 수명 주기 훅 등과 관련된 문제를 포착해야 합니다.

컴포넌트 테스트는 자식 컴포넌트를 모의해서는 안 되며, 사용자가 하는 것처럼 컴포넌트와 상호 작용하여 컴포넌트와 해당 자식 간의 상호 작용을 테스트해야 합니다.
예를 들어, 컴포넌트 테스트는 프로그래밍 방식으로 컴포넌트와 상호 작용하는 대신 사용자가 엘리먼트를 클릭하는 것과 같아야 합니다.

컴포넌트 테스트는 내부 구현 세부 사항보다는 컴포넌트의 공개 인터페이스에 중점을 두어야 합니다.
대부분의 컴포넌트에서 공개 인터페이스는 이벤트 발생, props 및 슬롯정도 입니다.
"**컴포넌트가 어떻게 작동하는지가 아니라, 어떤 작동을 하는지**"를 테스트해야 합니다.

**해야 할 것**

- **시각적** 로직의 경우: 입력된 props 및 슬롯을 기반으로 올바른 렌더링 출력을 검증합니다.

- **작동** 로직의 경우: 사용자 입력 이벤트에 대한 응답으로 올바른 렌더링 업데이트 또는 발송(emit)된 이벤트를 검증합니다.

  아래 예에서는 "increment"라는 레이블이 지정된 DOM 엘리먼트가 있고,
  클릭할 수 있는 스테퍼 컴포넌트를 보여줍니다.
  스테퍼가 `2`를 초과하여 계속 증가하지 않도록 하는 `max`라는 prop을 전달하므로,
  버튼을 3번 클릭해도 UI는 여전히 `2`를 표시해야 합니다.

  우리는 스테퍼의 구현에 대해 아는 것이 없고,
  단지 "입력"이 `max`라는 prop이고,
  "출력"이 사용자가 보게 될 DOM의 상태라는 것 뿐입니다.

<TestingApiSwitcher>

<div class="testing-library-api">

```js
render(Stepper, {
  props: {
    max: 1
  }
})

const { getByText } = render(Component)

getByText('0') // "0"이 컴포넌트 내에 있어야 함

const button = getByText('increment')

// 클릭 이벤트 발송
await fireEvent.click(button)

getByText('1')

await fireEvent.click(button)
```

</div>

<div class="vtu-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1
  }
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

</div>

<div class="cypress-api">

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector).should('be.visible').and('contain.text', '0')
  .get(buttonSelector).click()
  .get(valueSelector).should('contain.text', '1')
```

</div>

</TestingApiSwitcher>

- **하지 말아야 할 것**

  컴포넌트 인스턴스의 개인 상태를 검증하거나 컴포넌트의 개인 메서드를 테스트하지 마십시오.
  구현 세부 정보를 테스트하면 테스트가 중단될 가능성이 높고 구현이 변경될 때 업데이트가 필요하기 때문에 테스트가 취약해집니다.

  컴포넌트의 궁극적인 역할은 올바른 DOM 출력을 렌더링하는 것이므로,
  DOM 출력에 초점을 맞춘 테스트는 변경사항에도 강력하고 탄력적이면서 동일한 수준의 정확성 보장을 제공합니다.

  스냅샷 테스트에만 의존하지 마십시오.
  HTML 문자열을 검증하는 것이 정확성을 의미하지 않으므로 명확한 목적이 있는 테스트를 작성하십시오.

  메소드를 철저히 테스트해야 하는 경우, 독립 실행형 유틸리티 기능으로 추출하는 것을 고려하고, 전용 단위 테스트를 작성하십시오.
  깔끔하게 추출할 수 없는 경우, 컴포넌트나 통합 또는 이를 포괄하는 E2E 테스트의 일부로 테스트할 수 있습니다.

### 추천

- 헤드리스로 렌더링되는 컴포넌트 또는 컴포넌트의 [Vitest](https://vitest.dev/)(예: VueUse의 [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) 함수).
  컴포넌트와 DOM은 [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro)를 사용하여 테스트할 수 있습니다.

- 예상 동작이 스타일을 올바르게 렌더링하거나 기본 DOM 이벤트를 트리거하는 데 의존하는 컴포넌트에 대한 [Cypress 컴포넌트 테스트](https://on.cypress.io/component).
  [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro) 테스팅 라이브러리로 사용할 수 있습니다.

Vitest와 브라우저 기반 러너의 주요 차이점은 속도와 실행 컨텍스트입니다.
간단히 말해서, Cypress와 같은 브라우저 기반 러너는 Vitest와 같은 노드 기반 러너가 포착할 수 없는 문제(예: 스타일 문제, 실제 네이티브 DOM 이벤트, 쿠키, 로컬 스토리지 및 네트워크 오류)를 포착할 수 있지만,
브라우저 기반 러너는 브라우저를 열고 스타일시트를 컴파일하는 등의 작업을 수행하기 때문에 *Vitest보다 훨씬 느립니다*.
Cypress는 컴포넌트 테스트를 지원하는 브라우저 기반 러너입니다.
Vitest와 Cypress를 비교한 최신 정보는 [비교 페이지](https://vitest.dev/guide/comparisons.html#cypress)를 참조하십시오.

### 라이브러리 도입

컴포넌트 테스트에는 테스트 중인 컴포넌트를 격리하여 탑재하고,
시뮬레이션된 사용자 입력 이벤트를 트리거하고,
렌더링된 DOM 출력에 대한 검증이 포함되는 경우가 많습니다.
이러한 작업을 더 간단하게 만드는 전용 유틸리티 라이브러리가 있습니다.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library)는 구현 세부 사항에 의존하지 않고 컴포넌트를 테스트하는 데 중점을 둔 Vue 테스트 라이브러리입니다.
  접근성을 염두에 두고 구축된 이 접근 방식은 리팩토링도 수월하게 해줍니다.
  그 기본 원칙은 테스트가 소프트웨어 사용 방법과 더 많이 유사할수록 더 많은 신뢰를 제공할 수 있다는 것이다.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils)는 사용자에게 Vue 특정 API에 대한 접근을 제공하기 위해 작성된 공식 저수준 컴포넌트 테스트 라이브러리입니다.
  또한 저수준 라이브러리 `@testing-library/vue`가 그 위에 구축됩니다.

앱의 테스트 우선 순위와 초점이 더 잘 맞기 때문에 앱의 컴포넌트를 테스트할 때 `@testing-library/vue`를 사용하는 것이 좋습니다.
Vue 전용 내부 테스트가 필요한 고급 컴포넌트를 빌드하는 경우에만 `@vue/test-utils`를 사용하세요.

### 다른 선택지

- [Nightwatch](https://v2.nightwatchjs.org/)는 Vue 컴포넌트 테스트를 지원하는 E2E 테스트 러너입니다.
  (Nightwatch v2의 [예시 프로젝트](https://github.com/nightwatchjs-community/todo-vue))

## E2E 테스트

단위 테스트는 개발자에게 어느 정도의 확신을 제공하지만,
단위 및 컴포넌트 테스트는 프로덕션에 배포할 때 앱에 대한 전체적인 범위를 제공하는 능력이 제한적입니다.
결과적으로 E2E(end-to-end) 테스트는 앱의 가장 중요한 측면인 사용자가 실제로 앱을 사용할 때 어떤 일이 발생하는지에 대한 범위를 제공합니다.

E2E 테스트는 프로덕션으로 빌드된 Vue 앱에 대해 네트워크 요청을 필요로하는 다중 페이지 앱 동작에 중점을 둡니다.
이것들은 종종 데이터베이스 또는 기타 백엔드를 유지하는 것과 관련되며 라이브 스테이징 환경에 대해 실행될 수도 있습니다.

E2E 테스트는 종종 라우터, 상태 관리 라이브러리, 최상위 컴포넌트(예: 앱 또는 레이아웃), 퍼블릭 애셋 또는 요청 처리와 관련된 문제를 확인합니다.
위에서 언급했듯이 단위 테스트 또는 컴포넌트 테스트로 포착할 수 없는 중요한 문제를 포착합니다.

E2E 테스트는 Vue 앱의 코드를 가져오지 않지만, 대신 실제 브라우저에서 전체 페이지를 탐색하여 앱을 테스트하는데 전적으로 의존합니다.

E2E 테스트는 앱의 많은 계층을 검증합니다.
로컬로 구축된 앱 또는 라이브 스테이징 환경을 대상으로 할 수 있습니다.
스테이징 환경에 대한 테스트에는 프론트엔드 코드와 정적 서버뿐만 아니라 관련된 모든 백엔드 서비스 및 인프라가 포함됩니다.

> 테스트가 소프트웨어 사용 방식과 유사할수록 더 많은 자신감을 얻을 수 있습니다. - [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106) - 테스트 라이브러리의 저자

사용자 작업이 앱에 미치는 영향을 테스트함으로써,
E2E 테스트는 종종 앱이 제대로 작동하는지 여부에 대한 신뢰도를 높입니다.

### E2E 테스트 솔루션 선택

웹에서의 E2E 테스트는 신뢰할 수 없는 테스트 및 개발 프로세스 속도 저하로 부정적인 평판을 얻었지만,
최신 E2E 도구는 보다 안정적이고 대화식이며 유용한 테스트를 만들기 위해 발전했습니다.
다음 섹션에서는 E2E 테스트 프레임워크를 선택할 때,
앱에 대한 테스트 프레임워크를 선택할 때 염두에 두어야 할 사항에 대한 몇 가지 지침을 제공합니다.

#### 브라우저 간 테스트

E2E 테스트의 주요 이점 중 하나는 여러 브라우저에서 앱을 테스트할 수 있다는 것입니다.
100% 크로스 브라우저 적용 범위를 갖는 것이 바람직해 보일 수 있지만,
크로스 브라우저 테스트는 팀 리소스를 일관되게 실행하는 데 필요한 추가 시간과 시스템 성능으로 인해 팀 리소스에 대한 효율성이 감소한다는 점에 유의해야 합니다.
결과적으로 앱에 필요한 크로스 브라우저 테스트의 양을 선택할 때 이 절충점을 염두에 두는 것이 중요합니다.

#### 더 빠른 피드백 루프

E2E 테스트 및 개발의 주요 문제 중 하나는, 제품군 전체를 실행하는 데 오랜 시간이 걸린다는 것입니다.
일반적으로 이는 CI/CD 파이프라인에서만 수행됩니다.
최신 E2E 테스트 프레임워크는 병렬화와 같은 기능을 추가하여 이 문제를 해결하는 데 도움이 되었습니다.
또한 로컬에서 개발할 때, 작업 중인 페이지에 대해 단일 테스트를 선택적으로 실행하는 동시에 테스트의 핫 리로딩을 제공하는 기능은 개발자의 워크플로와 생산성을 높이는 데 도움이 될 수 있습니다.

#### 최고의 디버깅 경험

개발자는 전통적으로 테스트에서 무엇이 잘못되었는지 확인하기 위해 터미널 창에서 로그를 스캔하는 데 의존해 왔지만,
최신 E2E 테스트 프레임워크는 개발자들이 이미 익숙한 도구들, 예를 들어 브라우저 개발자 도구들을 활용할 수 있게 합니다.

#### 헤드리스 모드의 가시성

E2E 테스트가 지속적인 CI/CD 파이프라인에서 실행될 때, 종종 헤드리스 브라우저에서 실행됩니다.
최신 E2E 테스트 프레임워크의 중요한 기능은 테스트 중에 앱의 스냅샷 또는 비디오를 보고 오류가 발생하는 이유를 파악할 수 있는 기능입니다.
역사적으로 이러한 통합을 유지하는 것은 지루했습니다.

### 추천

- [Cypress](https://www.cypress.io/)

  전반적으로 우리는 Cypress가 유익한 UI, 뛰어난 디버깅 가능성, 빌트인 검증 및 stubs, 내결함성, 병렬화 및 스냅샷과 같은 기능을 갖춘 가장 완벽한 E2E 솔루션을 제공한다고 믿습니다.
  위에서 언급했듯이 [컴포넌트 테스트](https://docs.cypress.io/guides/component-testing/introduction)도 지원합니다.
  그러나 Chromium 기반 브라우저와 Firefox만 지원합니다.

### 다른 선택지

- [Playwright](https://playwright.dev/)는 광범위한 브라우저 지원(주로 WebKit)을 갖춘 훌륭한 E2E 테스트 솔루션입니다.
  자세한 내용은 [Why Playwright](https://playwright.dev/docs/why-playwright)를 참조하십시오.

- [Nightwatch v2](https://v2.nightwatchjs.org/)는 [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver) 기반의 E2E 테스트 솔루션입니다.
  이것은 가장 광범위한 브라우저 지원 범위를 제공합니다.


## 레시피

### 프로젝트에 Vitest 추가

Vite 기반 Vue 프로젝트에서 다음을 실행:

```sh
> npm install -D vitest happy-dom @testing-library/vue@next
```

다음으로 `test` 옵션 블록을 추가하도록 Vite 구성을 업데이트:

```js{6-12}
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // jest와 같은 글로벌 테스트 API 사용
    globals: true,
    // happy-dom으로 DOM 시뮬레이션
    // (피어 종속성으로 happy-dom을 설치해야 함)
    environment: 'happy-dom'
  }
})
```

:::tip
TypeScript를 사용하는 경우 `tsconfig.json`의 `types` 필드에 `vtest/globals`를 추가합니다.

```json
// tsconfig.json

{
  "compileroptions": {
    "types": ["vitest/globals"]
  }
}
```
:::

그런 다음 프로젝트에서 `*.test.js`로 끝나는 파일을 만듭니다.
모든 테스트 파일은 프로젝트 루트의 테스트 디렉토리 또는 소스(원본) 파일 옆의 테스트 디렉토리에 배치할 수 있습니다.
Vitest는 명명 규칙을 사용하여 자동으로 검색합니다.

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // 검증 통과를 위한 출력 값
  getByText('...')
})
```

마지막으로 `package.json`을 업데이트하여 테스트 스크립트를 추가하고 실행:

```json{4}
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### 구성화 테스트

> 이 섹션은 [구성화](/guide/reusability/composables.html) 섹션을 읽었다고 가정합니다.

구성화를 테스트할 때, 호스트 컴포넌트 인스턴스에 의존하는 경우와 그렇지 않은 경우 두 가지 범주로 나눌 수 있습니다.

구성화는 아래 API를 사용할 때 호스트 컴포넌트 인스턴스에 따라 달라집니다.

- 수명 주기 훅
- Provide(제공) / Inject(주입)

구성화가 반응형 API만 사용하는 경우 직접 호출하고, 반환된 상태/메소드를 검증하여 테스트할 수 있습니다:

```js
// counter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js
// counter.test.js
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

수명 주기 훅 또는 Provide/Inject에 의존하는 구성화는 테스트할 호스트 컴포넌트에 래핑되어야 합니다.
다음과 같은 핼퍼를 만들 수 있습니다:

```js
// test-utils.js
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // 누락된 템플릿 경고 억제
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // 결과를 반환하고
  // provide/unmount 테스트를 위한 앱 인스턴스 
  return [result, app]
}
```
```js
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // 테스트 inject(주입)를 위한 모의 제공
  app.provide(...)
  // 검증 실행
  expect(result.foo.value).toBe(1)
  // 필요한 경우 onUnmounted 훅 실행
  app.unmount()
})
```

더 복잡한 구성화의 경우,
[컴포넌트 테스트](#컴포넌트-테스트) 기술을 사용하여 래퍼 컴포넌트에 대한 테스트를 작성하여 테스트하는 것이 더 쉬울 수도 있습니다.

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
