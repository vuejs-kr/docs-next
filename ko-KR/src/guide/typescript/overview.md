---
outline: deep
---

:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::

# 타입스크립트와 함께 Vue 사용하기 {#using-vue-with-typescript}

타입스크립트와 같은 타입 시스템은 빌드 시 정적 분석을 통해 많은 일반에러를 감지할 수 있습니다. 이렇게 하면 프로덕션에서 런타임 에러가 발생할 가능성이 줄어들고 대규모 앱에서 안정적으로 코드를 리팩토링할 수 있습니다. 또한 타입스크립트는 여러 IDE에서 제공하는 타입기반 자동완성 기능을 통해 개발 환경을 개선 할 수 있습니다.

Vue는 타입스크립트로 작성 되었으며 최고 수준의 타입스크립트 지원을 제공합니다. 모든 공식 Vue 패키지에는 타입 선언파일을 기본적으로 포함하여 제공합니다.

## 프로젝트 설정 {#project-setup}

공식 프로젝트 스캐폴딩 도구인 [`create-vue`](https://github.com/vuejs/create-vue) 는 [Vite](https://vitejs.dev/) 기반으로 타입스크립트를 지원하는 Vue 프로젝트를 생성할 수 있습니다.

### 개요 {#overview}

Vite 기반 설정을 사용하면 개발 서버와 번들러가 트랜스파일 만 수행하며, 타입 검사를 하지 않습니다. 이렇게 하면 타입스크립트를 사용하는 경우에도 Vite dev 서버가 빠른 속도로 유지됩니다.

- 개발하는 동안 타입 에러에 대한 즉각적인 피드백을 위해 좋은 [IDE 설정](#ide-support) 에 의존하는 것을 추천합니다.

- SFC를 사용하는 경우 command line 타입 확인 및 타입 선언 생성을 위해 [`vue-tsc`](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) 유틸리티를 사용하십시오. `vue-tsc` 는 타입스크립트의 자체 command line 인터페이스인 `tsc`를 포함하고 있습니다. 타입스크립트 파일 외에도 Vue SFC를 지원한다는 점을 제외하면 `tsc` 와 거의 동일하게 작동합니다.

- `vue-tsc` 는 현재 감시 모드를 지원하지 않지만 로드맵에 있습니다. 그동안, dev 명령으로 타입 검사를 사용하고 싶다면 [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker)를 확인해주세요.

- Vue CLI는 타입스크립트를 지원 하지만 더 이상 권장되지 않습니다. 아래 사항을 [참고](#note-on-vue-cli-and-ts-loader) 하십시오.

### IDE 지원 {#ide-support}

- [Visual Studio Code](https://code.visualstudio.com/) (VSCode)는 기본적으로 타입스크립트를 훌륭하게 지원하고 있기에 강력하게 권장합니다.

    - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 는 다른 많은 훌륭한 기능과 함께 Vue SFC 내에서 타입스크립트를 지원하는 공식 VSCode extension 입니다.

        :::tip 
        Volar는 Vue2용 공식 VSCode extension인 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 를 대체합니다. 현재 Vetur가 설치되어 있는 경우 Vue3 프로젝트에서 비활성화해야 합니다. 
        :::

    - [타입스크립트 Vue 플러그인](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 은 TS 파일에서 `*.vue` 를 가져오기 위해 별도의 타입 지원이 필요합니다.

- [WebStorm](https://www.jetbrains.com/webstorm/) 은 타입스크립트와 Vue 모두 기본적으로 지원합니다. 다른 JetBrains IDE도 [무료 플러그인](https://plugins.jetbrains.com/plugin/9442-vue-js) 설치를 통해 바로 사용 가능합니다.

### `tsconfig.json` 설정 {#configuring-tsconfig-json}

`create-vue` 를 통해 생성된 프로젝트에는 사전 설정된 `tsconfig.json`가 포함됩니다. 기본 설정은 [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) 패키지에서 추상화됩니다. 프로젝트 내에서 [프로젝트 참조](https://www.typescriptlang.org/docs/handbook/project-references.html) 를 사용하여 다른 환경(예: app vs. test)에서 실행되는 코드에 대한 올바른 타입을 확인합니다.

`tsconfig.json` 을 수동으로 구성할 때 몇 가지 알고 있으면 좋은 옵션들은 다음과 같습니다.

- Vite는 타입스크립트를 변환하기 위해 [esbuild](https://www.typescriptlang.org/tsconfig#isolatedModules) 를 사용하고,  단일 파일 변환 제한이 적용되기 때문에 <a><code data-md-type="codespan">compilerOptions.isolatedModules</code></a> 가 <code>true</code> 로 설정됩니다.

- 옵션 API를 사용하는 경우 컴포넌트 옵션에서 <code>this</code> 타입 검사를 사용 하려면 [`compilerOptions.strict`](https://www.typescriptlang.org/tsconfig#strict) 를 <code>true</code> 로 설정해야 합니다(또는 `strict` 플래그의 일부인 [`compilerOptions.noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) 활성화). 그렇지 않으면 `this`는  `any` 로 취급 됩니다.

- 빌드 도구에서 resolver aliases를 설정한 경우(예: `create-vue` 프로젝트에서 기본적으로 설정된 `@/*` ) 타입스크립트 [`compilerOptions.paths`](https://www.typescriptlang.org/tsconfig#paths) 설정도 필요합니다.

참고항목

- [공식 타입스크립트 컴파일러 옵션 문서](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [esbuild 타입스크립트 컴파일 주의 사항](https://esbuild.github.io/content-types/#typescript-caveats)

### Takeover 모드 {#takeover-mode}

> 이 섹션은 VSCode + Volar에만 적용됩니다.

Vue SFC와 타입스크립트가 함께 작동하도록 하기 위해 Volar는 Vue 전용으로 패치된 별도의 TS 언어 서비스 인스턴스를 만들고 Vue SFC에서 사용합니다. 동시에 일반 TS 파일은 VSCode의 내장 TS 언어 서비스에서 처리됩니다. 그러므로 TS 파일에서 Vue SFC를 호출하기 위해 [타입스크립트 Vue 플러그인](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) 이 필요합니다. 이 설정은 기본적으로 작동하지만 각 프로젝트에 대해 Volar에서 하나, VSCode의 기본 제공 서비스에서 하나씩 두 개의 TS 언어 서비스 인스턴스를 실행합니다. 이것은 약간 비효율적이며 대규모 프로젝트에서 성능 문제를 일으킬 수 있습니다.

Volar는 성능 향상을 위해 "Takeover Mode"라는 기능을 제공합니다. Takeover 모드에서 Volar는 단일 TS 언어 서비스 인스턴스를 사용하여 Vue 및 TS 파일 모두 지원합니다.

Takeover 모드를 활성화 하기 위해서, 다음단계를 통해 VSCode에서 기본적으로 제공해주는 TS 언어 서비스를 **&nbsp;당신의 프로젝트 작업공간** 에서 비활성화 시켜야 합니다.

1. 프로젝트 작업 공간에서 `Ctrl + Shift + P` (macOS: `Cmd + Shift + P` )를 사용하여 명령 팔레트를 불러옵니다.
2. `built` 를 입력하고 "확장: 기본 제공 확장 표시(Extensions: Show Built-in Extensions)"를 선택합니다.
3. 확장 검색 상자에 `typescript` 를 입력합니다( `@builtin` 접두사를 제거하지 마십시오).
4. "TypeScript 및 JavaScript 언어 기능"의 작은 톱니바퀴 아이콘을 클릭하고 "사용 안 함(작업 공간)"을 선택합니다.
5. 작업 공간을 다시 로드합니다. Vue 또는 TS 파일을 열면 Takeover 모드가 활성화됩니다.

<img src="./images/takeover-mode.png" width="590" height="426" style="margin:0px auto;border-radius:8px">

### Vue CLI 및 `ts-loader` 에 대한 참고 사항 {#note-on-vue-cli-and-ts-loader}

Vue CLI와 같은 웹팩 기반 설정에서는 `ts-loader` 와 같이 모듈 변환 파이프라인의 일부로 타입 검사를 수행하는 것이 일반적입니다. 그러나 이것은 타입 시스템이 타입 검사를 수행하기 위해 전체 모듈 그래프에 대한 지식을 필요로 하기 때문에 깔끔한 방법이 아닙니다. 개별 모듈의 변환 단계는 단순히 작업에 적합한 위치가 아닙니다. 다음과 같은 문제가 발생합니다.

- `ts-loader` 는 변환 후 코드의 타입만 확인 할 수 있습니다. 이것은 소스 코드에 다시 매핑되는 IDE 또는 `vue-tsc` 에서 볼 수 있는 에러와 일치하지 않습니다.

- 타입 검사가 느릴 수 있습니다. 코드 변환이 있는 동일한 스레드/프로세스에서 수행될 경우 전체 앱의 빌드 속도에 큰 영향을 미칩니다.

- 우리는 이미 별도의 프로세스로 IDE에서 바로 실행 중인 타입 검사가 가능 합니다. 따라서 개발이 느려지는 경험은 좋지는 않습니다.

현재 Vue CLI를 통해 Vue 3 + TypeScript를 사용하는 경우 Vite로 마이그레이션하는 것이 좋습니다. 또한 타입 검사를 위해 `vue-tsc` 로 전환할 수 있도록 변환 전용 TS 지원을 활성화하는 CLI 옵션에 대해 작업하고 있습니다.

## 일반 사용 참고 사항 {#general-usage-notes}

### `defineComponent()` {#definecomponent}

타입스크립트가 컴포넌트 옵션 내에서 타입을 올바르게 추론할 수 있도록 하려면 [`defineComponent()`](/api/general.html#definecomponent) 를 사용하여 컴포넌트를 정의해야 합니다.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // 타입추론 활성화
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // type: string | undefined
    this.msg // type: string
    this.count // type: number
  }
})
```

또한 `defineComponent()` 는 `<script setup>` 없이 Composition API를 사용할 때 `setup()` 에 전달된 props의 추론을 지원합니다.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // 타입추론 활성화
  props: {
    message: String
  },
  setup(props) {
    props.message // type: string | undefined
  }
})
```

참고사항: 
- [웹팩에서 트리쉐이킹](/api/general.html#note-on-webpack-treeshaking)
- [`defineComponent`를 위한 타입 테스트](https://github.com/vuejs/core/blob/main/test-dts/defineComponent.test-d.tsx)

:::tip 
`defineComponent()` 는 일반 JavaScript로 정의된 컴포넌트에 대한 타입 추론을 가능하게 합니다. 
:::

### 싱글 파일 컴포넌트에서 사용법 {#usage-in-single-file-components}

SFC에서 타입스크립트를 사용하려면 `<script>` 태그에 `lang="ts"` 속성을 추가하세요. `lang="ts"` 가 있으면 모든 템플릿 표현식도 더 엄격한 타입 검사를 받게 됩니다.

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})
</script>

<template>
  <!-- 타입 확인 및 자동완성 활성화 -->
  {{ count.toFixed(2) }}
</template>
```

`lang="ts"` 는 `<script setup>` 과 함께 사용할 수도 있습니다.

```vue
<script setup lang="ts">
// 타입스크립트 활성화
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- 타입 확인 및 자동완성 활성화 -->
  {{ count.toFixed(2) }}
</template>
```

### 템플릿에서의 타입스크립트 {#typescript-in-templates}

`<template>` 은 `<script lang="ts">` 또는 `<script setup lang="ts">` 가 사용되는 경우 바인딩 표현식에서 타입스크립트를 지원합니다. 이는 템플릿 표현식에서 타입 캐스팅을 수행해야 하는 경우에 유용합니다.

다음은 부자연스러운 예입니다.

```vue
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  <!-- x가 문자열일 수 있으므로 에러 발생 -->
  {{ x.toFixed(2) }}
</template>
```

인라인 타입 캐스트로 이 문제를 해결할 수 있습니다.

```vue{6}
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

:::tip 
Vue CLI 또는 웹팩 기반 설정을 사용하는 경우 타입스크립트 템플릿 표현식은  `vue-loader@^16.8.0` 이 필요합니다. 
:::

## API-Specific Recipes {#api-specific-recipes}

- [TS와 Composition API](./composition-api)
- [TS와 Options API](./options-api)
