:::warning 현재 이 문서는 번역 작업이 진행중입니다
:::


# Creating a Vue Application
# Vue 애플리케이션 생성하기

## The application instance
## 애플리케이션 인스턴스

Every Vue application starts by creating a new **application instance** with the [`createApp`](/api/application#createapp) function:

모든 Vue 애플리케이션은 [`createApp`](/api/application#createapp) 함수를 사용하여 새로운 **애플리케이션 인스턴스** 를 생성하여 시작합니다.

```js
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})
```

## The Root Component
## 최상위(Root) 컴포넌트

The object we are passing into `createApp` is in fact a component. Every app requires a "root component" that can contain other components as its children.

`createApp` 에 전달된 객체는 사실 컴포넌트 입니다. 모든 앱은  다른 컴포넌트를 자식으로 포함할 수 있는 "루트 컴포넌트"가 필요합니다.


If you are using Single-File Components, we typically import the root component from another file:

싱글 파일 컴포넌트를 사용하는 경우 일반적으로 루트 컴포넌트를 다른 파일에서 가져옵니다:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
// 싱글 파일 컴포넌트에서 루트 컴포넌트 App을 가져옵니다.
import App from './App.vue'

const app = createApp(App)
```

While many examples in this guide only need a single component, most real applications are organized into a tree of nested, reusable components. For example, a Todo application's component tree might look like this:

이 가이드 문서의 많은 예제에서는 단일 컴포넌트만 사용하지만, 실제 애플리케이션의 대부분은 중첩되고 재사용 가능한 컴포넌트 트리로 구성됩니다. 예를 들어 Todo 애플리케이션의 컴포넌트 트리는 다음과 같습니다.

```
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

We will discuss how to define and compose multiple components together in later sections of the guide. Before that, we will focus on what happens inside a single component.

가이드의 뒷 부분에서 여러 컴포넌트를 함께 정의하고 구성하는 방법에 대해 설명합니다. 지금은 단일 컴포넌트 내부에서 어떤 일이 일어나는지에 대해 집중하겠습니다.

## Mounting the App
## 애플리케이션 마운트하기

An application instance won't render anything until its `.mount()` method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string:

애플리케이션 인스턴스는 `.mount()` 메소드가 호출될 때까지 아무 것도 렌더링되지 않습니다. 실제 DOM 엘리먼트 또는 선택자(selector) 문자열이 될 수 있는 "컨테이너" 전달인자가 필요합니다.

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

The content of the app's root component will be rendered inside the container element. The container element itself is not considered part of the app.

애플리케이션의 루트 컴포넌트의 내용은 컨테이너 엘리먼트 내에서 렌더링됩니다. 컨테이너 엘리먼트 자체는 애플리케이션의 일부로 간주되지 않습니다.


The `.mount()` method should always be called after all app configurations and asset registrations are done. Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance.

`.mount()` 메서드는 모든 애플리케이션 구성 및 자산 등록이 완료된 후에 항상 호출되어야 합니다. 또한 자산 등록 방법과 달리 반환 값은 응용 프로그램 인스턴스가 아닌 루트 구성 엘리먼트 인스턴스입니다.

### In-DOM Root Component Template
### DOM 내부에 루트 컴퍼넌트 템플릿 사용하기

When using Vue without a build step, we can write our root component's template directly inside the mount container:

빌드 도구 없이 Vue를 사용한다면, 루트 컴포넌트의 템플릿을 마운트할 컨테이너 내부에 작성할수 있습니다. 

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

Vue will automatically use the container's `innerHTML` as the template if the root component does not already have a `template` option.

Vue는 루트컴포넌트에 `tempalte` 옵션을 지정하지 않으면, 자동으로 컨테이너의 `innerHTML`의 내용을 템플릿으로 사용합니다. 

## App Configurations

## 애플리케이션 설정

The application instance exposes a `.config` object that allows us to configure a few app-level options, for example defining an app-level error handler that captures errors from all descendent components:

애플리케이션 인스턴스는 `.config` 속성을 어플리케이션 레벨의 설정을 하기 위해 제공합니다. 예를 들자면 모든 하위 컴포넌트들에서 발생하는 모든 에러를 잡을수 있는 애플리케이션 레벨 에러 핸들러를 정의할수 있습니다: 

```js
app.config.errorHandler = (err) => {
  /* handle error */
}
```

The application instance also provides a few methods for registering app-scoped assets. For example, registering a component:

애플리케이션 인스턴스는 또 애플리케이션 범위의 자원(asset)을 등록하기 위한 메소드를 제공합니다. 예) 컴포넌트 등록하기: 


```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

This makes the `TodoDeleteButton` available for use anywhere in our app. We will discuss registration for components and other types of assets in later sections of the guide. You can also browse the full list of application instance APIs in its [API reference](/api/application).

컴포넌트를 앱에 등록하면 전역 범위로 앱 내의 어디에서나 사용할수 있게 됩니다. 컴포넌트 와 기타 자원 등록에 대해서는 가이드 후반에 다루도록 하겠습니다. 애플리케이션 인스턴스의 모른 API를 보고 싶으시면 [API reference](/api/application) 를 확인해보세요.

Make sure to apply all app configurations before mounting the app!

Make sure to apply all app configurations before mounting the app!

앱을 마운트하기 전에 모든 앱 설정을 적용했는지 확인하세요!


## Multiple application instances

## 다중 애플리케이션 인스턴스

You are not limited to a single application instance on the same page. The `createApp` API allows multiple Vue applications to co-exist on the same page, each with its own scope for configuration and global assets:

한페이지에 하나의 애플리케이션 인스턴스만 만들수 있는건 아닙니다.  `createApp` API를 사용하면 여러 Vue 애플리케이션이 동일한 페이지에 동시에 존재 할 수 있으며 각각은 설정 및 전역 자원(asset) 대해 서로 독립된 고유한 범위를 갖습니다.


```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

If you are using Vue to enhance server-rendered HTML and only need Vue to control specific parts of a large page, avoid mounting a single Vue application instance on the entire page. Instead, create multiple small application instances and mount them on the elements they are responsible for.

일반적인 서버 렌더링 HTML 환경에서 vue를 이용해 개선을 하고 싶을때, 큰 페이지 안에서 특정 부분만 vue로 개선하고 싶을때 단일 vue 인스턴스로 전체 페이지를 마운트하지 마십시오. 대신 각각의 애플리케이션을 인스턴스를 만들고 담담해야 하는 엘리먼트에 마운트 하세요. 
