# SFC CSS 기능 {#sfc-css-features}

## 범위가 지정된 CSS {#scoped-css}

`<style>` 태그에 `scoped` 속성이 있으면,
해당 CSS는 현재 컴포넌트의 엘리먼트에만 적용됩니다.
이것은 Shadow DOM에서 발견되는 스타일 캡슐화와 유사합니다.
몇 가지 주의 사항이 있지만,
폴리필이 필요하지 않습니다.
PostCSS를 사용하여 다음을 변환함으로써 달성됩니다:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">안녕!</div>
</template>
```

다음으로:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>안녕!</div>
</template>
```

### 자식 컴포넌트 루트 엘리먼트 {#child-component-root-elements}

`scoped`를 사용하면 부모 컴포넌트의 스타일이 자식 컴포넌트로 누출되지 않습니다.
그러나 자식 컴포넌트의 루트 노드는 부모의 범위가 지정된 CSS와 자식의 범위가 지정된 CSS 모두의 영향을 받습니다.
이것은 부모가 레이아웃 목적으로 자식 루트 엘리먼트의 스타일을 지정할 수 있도록 의도적으로 설계된 것입니다:

### 깊은 셀렉터 {#deep-selectors}

`scoped` 스타일의 셀렉터를 "깊게"(즉, 자식 컴포넌트에 영향을 미치게 하려면) `:deep()` 의사 클래스를 사용할 수 있습니다:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

위의 내용은 다음과 같이 컴파일됩니다:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
`v-html`로 만든 DOM 콘텐츠는 범위가 지정된 스타일의 영향을 받지 않지만,
깊은 셀렉터를 사용하여 스타일을 지정할 수 있습니다.
:::

### 슬롯형 셀렉터 {#slotted-selectors}

기본적으로 범위가 지정된 스타일은 `<slot/>`에 의해 렌더링된 콘텐츠에 영향을 미치지 않습니다.
스타일을 전달하는 부모 컴포넌트가 소유한 것으로 간주되기 때문입니다.
슬롯 콘텐츠를 명시적으로 대상으로 지정하려면,
`:slotted` 의사 클래스를 사용해야 합니다:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 전역 셀렉터 {#global-selectors}

하나의 규칙만 전역적으로 적용하려면,
다른 `<style>`을 만드는 대신 `:global` 의사 클래스를 사용할 수 있습니다(아래 참조):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### 로컬 및 전역 스타일 혼합 {#mixing-local-and-global-styles}

동일한 컴포넌트에 범위가 지정된 스타일과 범위가 지정되지 않은 스타일을 모두 포함할 수도 있습니다:

```vue
<style>
/* 전역 스타일 */
</style>

<style scoped>
/* 로컬 스타일 */
</style>
```

### 범위가 지정된 스타일 팁 {#scoped-style-tips}

- **범위가 지정된 스타일은 클래스의 필요성을 제거하지 않습니다**.
  브라우저가 다양한 CSS 셀렉터를 렌더링하는 방식 때문에,
  `p { color: red }`처럼 범위를 지정할 때(즉, 속성 셀렉터와 결합될 때) 속도가 몇 배 느려집니다.
  `.example { color: red }`와 같이 클래스나 ID를 사용하면,
  성능 저하를 거의 제거할 수 있습니다.

- **재귀적 컴포넌트의 자손 셀렉터에 주의해야 합니다!**
  셀렉터가 `.a .b`인 CSS 규칙의 경우,
  `.a`와 일치하는 엘리먼트가 재귀적인 자식 컴포넌트를 포함한다면,
  해당 자식 컴포넌트의 모든 `.b`는 규칙과 일치하게 됩니다.

## CSS 모듈 {#css-modules}

`<style module>` 태그는 [CSS 모듈](https://github.com/css-modules/css-modules)로 컴파일되고,
결과적으로 CSS 클래스를 `$style` 키(key) 내부에 객체로 컴포넌트에 노출합니다:

```vue
<template>
  <p :class="$style.red">이것은 빨간색이어야 합니다.</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

결과적인 클래스는 충돌을 피하기 위해 해시되어,
CSS 범위를 현재 컴포넌트로만 지정하는 것과 동일한 효과를 얻습니다.

[전역 예외](https://github.com/css-modules/css-modules#exceptions), [구성](https://github.com/css-modules/css-modules#composition) 등의 자세한 사항은 [CSS 모듈 스팩](https://github.com/css-modules/css-modules)을 참고하십시오.

### 커스텀 이름 삽입 {#custom-inject-name}

`module` 속성에 값을 지정하여,
주입된 클래스 객체의 속성 키를 커스텀할 수 있습니다:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### 컴포지션 API와 함께 사용 {#usage-with-composition-api}

주입된 클래스는 `useCssModule` API를 통해 `setup()` 및 `<script setup>`에서 접근할 수 있습니다.
커스텀 주입 이름이 있는 `<style module>` 블록의 경우 `useCssModule`은 일치하는 `module` 속성 값을 첫 번째 인자로 받습니다:

```js
import { useCssModule } from 'vue'

// setup() 내부에서...
// 기본값은, <style module>의 클래스 반환
useCssModule()

// 이름을 지정한 경우, <style module="classes">의 클래스 반환
useCssModule('classes')
```

## CSS에서 `v-bind()` {#v-bind-in-css}

SFC `<style>` 태그는 `v-bind` CSS 함수를 사용하여,
CSS 값을 동적 컴포넌트 상태에 연결하는 것을 지원합니다:

```vue
<template>
  <div class="text">안녕!</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

[`<script setup>`](./sfc-script-setup)에서도 문법은 작동하며,
JavaScript 표현식을 지원합니다(따옴표로 묶어야 함):

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>안녕!</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

실제 값은 해시된 CSS 커스텀 속성으로 컴파일되므로,
CSS는 여전히 정적입니다.
커스텀 속성은 컴포넌트의 루트 엘리먼트에 인라인 스타일로 적용되고,
소스 값이 변경되면(소스가 반응형일 경우) 반응적으로 업데이트됩니다.
