import{d as a,n as r,P as s}from"./PartnerCard.e4363646.js";import{_ as e,g as n,o as t,c as i,d as l,j as o,u as c,a3 as p,t as d,F as h,n as u,l as f,e as g}from"../app.ea8bebef.js";const b={class:"partner-page"},m={class:"back"},v={href:"/partners/all.html"},_=g("Back to all partners"),k={class:"description"},P=["innerHTML"],j={class:"actions"},L=["href"],C=["href"],H={key:0,class:"hiring"},M=["href"];var T=e(n({__name:"PartnerPage",props:{partner:null},setup(e){const n=a.find((a=>r(a.name)===e.partner));return(a,r)=>{return t(),i("div",b,[l("div",m,[l("a",v,[o(c(p),{class:"icon"}),_])]),o(s,{hero:"",page:"",data:c(n)},null,8,["data"]),l("div",k,[l("h2",null,"About "+d(c(n).name),1),(t(!0),i(h,null,u(c(n).description,(a=>(t(),i("p",{innerHTML:a},null,8,P)))),256))]),l("div",j,[l("a",{href:c(n).website.url,target:"_blank"},"Visit Website",8,L),l("a",{class:"contact",href:(e=c(n).contact,`mailto:${e}?subject=Looking for a Vue.js Partner`),target:"_blank"},"Contact",8,C)]),c(n).hiring?(t(),i("div",H,[l("a",{href:c(n).hiring},d(c(n).name)+" is hiring!",9,M)])):f("",!0)]);var e}}}),[["__scopeId","data-v-13025b7a"]]);export{T as P};
