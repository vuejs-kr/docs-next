import{r as s,o as n,c as a,d as l,j as p,w as o,l as e,O as c,C as t,J as r,i,K as F,e as y,P as D,a as C}from"./app.cdc9d116.js";import{g as d}from"./chunks/index.31797bf8.js";const A={class:"demo"},b={key:0,style:{"margin-top":"20px"}},u={setup(t){let r=s(!0);return(s,t)=>(n(),a("div",A,[l("button",{onClick:t[0]||(t[0]=s=>r.value=!r.value)},"토글"),p(c,{name:"fade"},{default:o((()=>[r.value?(n(),a("p",b,"안녕")):e("",!0)])),_:1})]))}};const g={class:"demo"},I={key:0,style:{"margin-top":"20px"}},X={setup(t){let r=s(!0);return(s,t)=>(n(),a("div",g,[l("button",{onClick:t[0]||(t[0]=s=>r.value=!r.value)},"토글: 슬라이드 + 페이드"),p(c,{name:"slide-fade"},{default:o((()=>[r.value?(n(),a("p",I,"안녕")):e("",!0)])),_:1})]))}};const Z={class:"demo"},G={key:0,style:{"margin-top":"20px","text-align":"center"}},v={setup(t){let r=s(!0);return(s,t)=>(n(),a("div",Z,[l("button",{onClick:t[0]||(t[0]=s=>r.value=!r.value)},"토글"),p(c,{name:"bounce"},{default:o((()=>[r.value?(n(),a("p",G," 안녕! 여기에 탄력적인 텍스트가 있어요! ")):e("",!0)])),_:1})]))}};const m={class:"demo"},V={key:0,class:"transition-demo-outer"},B=[l("div",{class:"transition-demo-inner"},"안녕",-1)],h={setup(t){let r=s(!0);return(s,t)=>(n(),a("div",m,[l("button",{onClick:t[0]||(t[0]=s=>r.value=!r.value),style:{"margin-bottom":"20px"}},"토글"),p(c,{duration:"550",name:"nested"},{default:o((()=>[r.value?(n(),a("div",V,B)):e("",!0)])),_:1})]))}};const W={class:"demo"},x={key:0,class:"gsap-box"},J={setup(t){let r=s(!0);function i(s){d.set(s,{scaleX:.25,scaleY:.25,opacity:1})}function F(s,n){d.to(s,{duration:1,scaleX:1,scaleY:1,ease:"elastic.inOut(2.5, 1)",onComplete:n})}function y(s,n){d.to(s,{duration:.7,scaleX:1,scaleY:1,x:300,ease:"elastic.inOut(2.5, 1)"}),d.to(s,{duration:.2,delay:.5,opacity:0,onComplete:n})}return(s,t)=>(n(),a("div",W,[l("button",{onClick:t[0]||(t[0]=s=>r.value=!r.value)},"토글"),p(c,{onBeforeEnter:i,onEnter:F,onLeave:y,css:!1},{default:o((()=>[r.value?(n(),a("div",x)):e("",!0)])),_:1})]))}};const Y={class:"demo transition-demo"},L=l("span",{style:{"margin-right":"20px"}},"클릭 시 상태 변경:",-1),w={class:"btn-container"},f={props:["mode"],setup(t){let r=s("saved");return(s,i)=>(n(),a("div",Y,[L,l("div",w,[p(c,{name:"slide-up",mode:t.mode},{default:o((()=>["saved"===r.value?(n(),a("button",{key:0,onClick:i[0]||(i[0]=s=>r.value="edited")}," 수정 ")):"edited"===r.value?(n(),a("button",{key:1,onClick:i[1]||(i[1]=s=>r.value="editing")}," 저장 ")):"editing"===r.value?(n(),a("button",{key:2,onClick:i[2]||(i[2]=s=>r.value="saved")}," 취소 ")):e("",!0)])),_:1},8,["mode"])])]))}},H={class:"demo"},R=y(" A "),S=y(" B "),z={setup(e){const y=()=>D("div","A 컴포넌트"),C=()=>D("div","B 컴포넌트");let d=s(y);return(s,e)=>(n(),a("div",H,[l("label",null,[t(l("input",{type:"radio","onUpdate:modelValue":e[0]||(e[0]=s=>d.value=s),value:y},null,512),[[r,d.value]]),R]),l("label",null,[t(l("input",{type:"radio","onUpdate:modelValue":e[1]||(e[1]=s=>d.value=s),value:C},null,512),[[r,d.value]]),S]),p(c,{name:"fade",mode:"out-in"},{default:o((()=>[(n(),i(F(d.value)))])),_:1})]))}},N=C("",10),j=C("",21),T=C("",7),P=C("",22),O=C("",17),E=C("",13),q=C("",6),_=C("",4),U=C("",10),k='{"title":"트랜지션","description":"","frontmatter":{},"headers":[{"level":2,"title":"<Transition> 컴포넌트","slug":"the-transition-component"},{"level":2,"title":"CSS 기반 트랜지션","slug":"css-based-transitions"},{"level":3,"title":"트랜지션 클레스","slug":"transition-classes"},{"level":3,"title":"트랜지션 이름 지정하기","slug":"named-transitions"},{"level":3,"title":"CSS 트랜지션","slug":"css-transitions"},{"level":3,"title":"CSS 애니메이션","slug":"css-animations"},{"level":3,"title":"커스텀 트랜지션 클래스","slug":"custom-transition-classes"},{"level":3,"title":"트랜지션과 애니메이션을 같이 사용하기","slug":"using-transitions-and-animations-together"},{"level":3,"title":"중첩된 트랜지션과 지속시간 설정하기","slug":"nested-transitions-and-explicit-transition-durations"},{"level":3,"title":"성능 고려사항","slug":"performance-considerations"},{"level":2,"title":"JavaScript 훅","slug":"javascript-hooks"},{"level":2,"title":"재사용 가능한 트랜지션","slug":"reusable-transitions"},{"level":2,"title":"등장 트랜지션","slug":"transition-on-appear"},{"level":2,"title":"엘리먼트 간 트랜지션","slug":"transition-between-elements"},{"level":2,"title":"트랜지션 모드","slug":"transition-modes"},{"level":2,"title":"컴포넌트 간 트랜지션","slug":"transition-between-components"},{"level":2,"title":"동적 트랜지션","slug":"dynamic-transitions"}],"relativePath":"guide/built-ins/transition.md"}',M={},Q=Object.assign(M,{setup:s=>(s,l)=>(n(),a("div",null,[N,p(u),j,p(X),T,p(v),P,p(h),O,p(J),E,p(f),q,p(f,{mode:"out-in"}),_,p(z),U]))});export{k as __pageData,Q as default};