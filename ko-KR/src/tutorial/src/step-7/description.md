# 리스트 렌더링

`v-for` 디렉티브를 사용하여 자료 배열을 엘리먼트 목록으로 렌더링할 수 있습니다:

```vue-html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

여기서 `todo`는 현재 배열 엘리먼트에서 반복되는 지역 변수입니다.
이것은 `v-for` 엘리먼트 또는 그 내부에서만 접근할 수 있습니다.

각 todo 객체에 고유한 `id`를 부여하고, 각 `<li>`에 <a target="_blank" href="/api/built-in-special-attributes.html#key">특별한 속성인 `key`</a>를 바인딩했습니다.
`key`를 사용하면 Vue가 각 `<li>`를 정확하게 이동시켜 배열에서 해당 객체의 위치와 일치하도록 할 수 있습니다.

목록을 업데이트하는 방법에는 두 가지가 있습니다:

1. 자료 배열에서 [변경 메소드(mutating methods)](https://stackoverflow.com/questions/9009879/which-javascript-array-functions-are-mutating)를 호출합니다:

   <div class="composition-api">

   ```js
   todos.value.push(newTodo)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos.push(newTodo)
   ```

   </div>

2. 배열을 새 배열로 교체합니다:

   <div class="composition-api">

   ```js
   todos.value = todos.value.filter(/* ... */)
   ```

     </div>
     <div class="options-api">

   ```js
   this.todos = this.todos.filter(/* ... */)
   ```

   </div>

여기에 간단한 할 일 목록이 있습니다.
`addTodo()` 및 `removeTodo()` 메서드에 대한 로직을 구현하고 작동되도록 해봅시다!

`v-for`에 대한 자세한 내용은 <a target="_blank" href="/guide/essentials/list.html">가이드 - 리스트 렌더링</a>에서 다룹니다.
