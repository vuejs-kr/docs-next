import{N as s,o as n,c as a,d as l,j as p,w as o,F as e,n as t,t as c,u as r,O as i,r as F,h as D,D as C,E as y,a as g}from"./app.920f80b5.js";import{g as A}from"./chunks/index.31797bf8.js";const d={class:"demo"},I={setup(F){const D=s([1,2,3,4,5]);let C=D.length+1;function y(){D.splice(A(),0,C++)}function g(){D.splice(A(),1)}function A(){return Math.floor(Math.random()*D.length)}return(s,F)=>(n(),a("div",d,[l("button",{onClick:y},"무작위 인덱스에 추가"),l("button",{onClick:g},"무작위 인덱스에서 제거"),p(i,{name:"list",tag:"ul",style:{"margin-top":"20px"}},{default:o((()=>[(n(!0),a(e,null,t(r(D),(s=>(n(),a("li",{key:s},c(s),1)))),128))])),_:1})]))}};const b={class:"demo"},u={setup(s){let r=F([1,2,3,4,5]),D=r.value.length+1;function C(){r.value.splice(g(),0,D++)}function y(){r.value.splice(g(),1)}function g(){return Math.floor(Math.random()*r.value.length)}return(s,F)=>(n(),a("div",b,[l("button",{onClick:C},"추가"),l("button",{onClick:y},"제거"),l("button",{onClick:F[0]||(F[0]=s=>function(s){let n,a=s.length;for(;0!=a;)n=Math.floor(Math.random()*a),a--,[s[a],s[n]]=[s[n],s[a]];return s}(r.value))},"섞기"),p(i,{name:"list2",tag:"ul",style:{"margin-top":"20px"}},{default:o((()=>[(n(!0),a(e,null,t(r.value,(s=>(n(),a("li",{class:"list-item",key:s},c(s),1)))),128))])),_:1})]))}},h={class:"demo",style:{height:"265px"}},X=["data-index"],G={setup(s){const r=[{msg:"Bruce Lee"},{msg:"Jackie Chan"},{msg:"Chuck Norris"},{msg:"Jet Li"},{msg:"Kung Fury"}];let g=F("");const d=D((()=>r.filter((s=>s.msg.toLowerCase().includes(g.value)))));function I(s){s.style.opacity=0,s.style.height=0}function b(s,n){A.to(s,{opacity:1,height:"1.6em",delay:.15*s.dataset.index,onComplete:n})}function u(s,n){A.to(s,{opacity:0,height:0,delay:.15*s.dataset.index,onComplete:n})}return(s,r)=>(n(),a("div",h,[C(l("input",{"onUpdate:modelValue":r[0]||(r[0]=s=>g.value=s),style:{"margin-bottom":"20px"}},null,512),[[y,g.value]]),p(i,{tag:"ul",css:!1,onBeforeEnter:I,onEnter:b,onLeave:u},{default:o((()=>[(n(!0),a(e,null,t(d.value,((s,l)=>(n(),a("li",{key:s.msg,"data-index":l},c(s.msg),9,X)))),128))])),_:1})]))}},m=g("",10),v=g("",4),Z=g("",6),B=g("",5),x='{"title":"트랜지션 그룹","description":"","frontmatter":{},"headers":[{"level":2,"title":"<Transition>과의 차이점","slug":"differences-from-transition"},{"level":2,"title":"진입/진출 트랜지션","slug":"enter-leave-transitions"},{"level":2,"title":"이동 트랜지션","slug":"move-transitions"},{"level":2,"title":"시차가 있는 목록 트랜지션","slug":"staggering-list-transitions"}],"relativePath":"guide/built-ins/transition-group.md"}',V={},f=Object.assign(V,{setup:s=>(s,l)=>(n(),a("div",null,[m,p(I),v,p(u),Z,p(G),B]))});export{x as __pageData,f as default};
