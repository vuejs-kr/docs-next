import{_ as e,g as a,r as s,o,c,d as i,u as l,j as t,C as n}from"../app.920f80b5.js";const r={class:"position-hack"},d={class:"preference-switches"},p={class:"switch-container"};var u=e(a({setup(e){const a="undefined"!=typeof localStorage,u="vue-docs-prefer-composition",f=s(((e,s=!1)=>a?JSON.parse(localStorage.getItem(e)||String(s)):s)(u)),m=function(e,a,s){if("undefined"==typeof localStorage)return()=>{};const o=document.documentElement.classList;return(c=!a.value)=>{(a.value=c)?o.add(s):o.remove(s),localStorage.setItem(e,String(a.value))}}(u,f,"prefer-composition");return(e,a)=>(o(),c("div",r,[i("div",d,[i("div",p,[i("label",{class:"options-label",onClick:a[0]||(a[0]=e=>l(m)(!1))},"옵션"),t(l(n),{class:"api-switch","aria-label":"컴포지션 api를 추천합니다","aria-checked":f.value,onClick:a[1]||(a[1]=e=>l(m)())},null,8,["aria-checked"]),i("label",{class:"composition-label",onClick:a[2]||(a[2]=e=>l(m)(!0))},"컴포지션"),i("a",{class:"switch-link",title:"API 스타일에 대하여",href:"/guide/introduction.html#api-스타일",onClick:a[3]||(a[3]=(...a)=>e.closeSideBar&&e.closeSideBar(...a))},"?")])])]))}}),[["__scopeId","data-v-23b2b368"]]);export{u as C};
