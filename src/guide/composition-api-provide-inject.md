# Provide / Inject

> 이 가이드는 [Provide / Inject](component-provide-inject.html), [Composition API Introduction](composition-api-introduction.html) 와 [Reactivity Fundamentals](reactivity-fundamentals.html) 를 이미 읽었다고 가정합니다.

Composition API와 함께 [provide / inject](component-provide-inject.html)를 사용할 수 있습니다. provide / inject는 현재 활성화된 인스턴스의 [`setup()`](composition-api-setup.html) 중에 호출 될 수 있습니다.

## 시나리오 배경

Composition API를 사용하여, `MyMarker` 컴포넌트에 사용자의 위치를 provide하는 `MyMap`컴포넌트가 포함된 다음과 같은 코드를 재작성한다고 가정하겠습니다.

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  provide: {
    location: 'North Pole',
    geolocation: {
      longitude: 90,
      latitude: 135
    }
  }
}
</script>
```

```vue
<!-- src/components/MyMarker.vue -->
<script>
export default {
  inject: ['location', 'geolocation']
}
</script>
```

## Provide 사용하기

`setup()` 안에서 `provide`를 사용할 때, `vue`에서 메소드를 명시적으로 import함으로서 시작합니다. 이를 통해 고유한 `provide` 호출로 각 속성을 정의할 수 있습니다.

`provide` 함수는 2개의 파라미터를 통해 속성을 정의할 수 있습니다:

1. 속성명 (`<String>` 타입)
2. 속성값

`MyMap` 컴포넌트를 사용하여, provide 된 값들을 다음과 같이 리팩토링할 수 있습니다

```vue{7,14-20}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide } from 'vue'
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```

## Inject 사용하기

`setup()` 에서 `inject` 를 사용할 경우에도 `vue` 에서 명시적으로 import 해야 합니다. 이렇게 하면 이를 호출하여 컴포넌트에 노출할 방법을 정의할 수 있습니다.

`inject` 함수는 두개의 파라미터를 가집니다:

1. inject할 속성명
2. 기본값 (**선택사항**)

`MyMarker` 컴포넌트를 사용하여, 다음과 같은 코드로 리팩토링할 수 있습니다:

```vue{3,6-14}
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```

## 반응성

### 반응성 추가

provide된 값과 inject된 값 사이에 반응성을 추가하기 위해, 값을 provide할 때 [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) 나 [reactive](reactivity-fundamentals.html#declaring-reactive-state) 를 사용할 수 있습니다.

`MyMap` 컴포넌트를 사용하여 아래와 같이 코드를 업데이트할 수 있습니다:

```vue{7,15-22}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
}
</script>
```

이제, 두 속성 중 하나가 변경되면, `MyMarker` 컴포넌트는 자동으로 업데이트됩니다!

### 반응성 속성 변경하기

반응성있는 provide / inject값을 사용하는 경우, **가능하면 *provider* 내부에서만 반응성 속성에 대한 변이가 발생하도록 유지하는 것이 좋습니다**.

예를들면, 사용자의 위치를 변경해야하는 경우, 이상적으로 `MyMap` 컴포넌트 내에 이 작업을 수행합니다.

```vue{28-32}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)

    return {
      location
    }
  },
  methods: {
    updateLocation() {
      this.location = 'South Pole'
    }
  }
}
</script>
```

그러나, 데이터가 inject된 컴포넌트 내부에서 데이터를 업데이트해야하는 경우가 있습니다. 이 시나리오에서는, 반응성 속성을 변형시키는 메소드를 provide 하는 것을 추천합니다.

```vue{21-23,27}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)
  }
}
</script>
```

```vue{9,14}
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  }
}
</script>
```

마지막으로, `provide`를 통해 전달된 데이터가 inject된 컴포넌트에 의해 변경되지 않도록 하려면, provide 속성에 `readonly`를 사용하는 것이 좋습니다.

```vue{7,25-26}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, readonly, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', readonly(location))
    provide('geolocation', readonly(geolocation))
    provide('updateLocation', updateLocation)
  }
}
</script>
```
