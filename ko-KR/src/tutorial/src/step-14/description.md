# 슬롯

부모 컴포넌트는 자식에게 props를 사용하여 데이터를 전달하는 것 외에도, **슬롯**을 사용하여 템플릿 조각을 전달할 수 있습니다:

<div class="sfc">

```vue-html
<ChildComp>
  이것은 슬롯 콘텐츠입니다!
</ChildComp>
```

</div>
<div class="html">

```vue-html
<child-comp>
  이것은 슬롯 콘텐츠입니다!
</child-comp>
```

</div>

자식 컴포넌트가 `<slot>` 엘리먼트를 "발산 수단(outlet: 가이드에서 '아울렛'으로 표기됨)"으로 사용하면, 부모에게 전달 받은 슬롯 콘텐츠를 렌더링할 수 있습니다:

<div class="sfc">

```vue-html
<!-- 자식 템플릿에서 -->
<slot/>
```

</div>
<div class="html">

```vue-html
<!-- 자식 템플릿에서 -->
<slot></slot>
```

</div>

`<slot>` 아울렛 내부 콘텐츠는 "대체" 콘텐츠로 처리될 수 있는데, 부모가 슬롯 콘텐츠를 전달하지 않은 경우에 표시됩니다:

```vue-html
<slot>대체: 부모로부터 컨텐츠를 못 받았어요! 😢</slot>
```

현재 우리는 슬롯 콘텐츠를 `<ChildComp>`에 전달하지 않았으므로, 대체 콘텐츠가 표시되고 있습니다.
부모의 `msg` 상태를 슬롯 콘텐츠로 하여 자식에게 전달해봅시다.
