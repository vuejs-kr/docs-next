import{d as a,n as s,P as r}from"./PartnerCard.72c8454a.js";import{_ as n,g as t,o as e,c as i,d as c,j as l,u as o,$ as p,t as d,F as h,n as u,l as f,e as g}from"../app.11ccd54c.js";const m={class:"partner-page"},b={class:"back"},v={href:"/partners/all.html"},k=g("Back to all partners"),j={class:"description"},_=["innerHTML"],P={class:"actions"},L=["href"],C=["href"],H={key:0,class:"hiring"},M=["href"];var T=n(t({props:{partner:null},setup(n){const t=a.find((a=>s(a.name)===n.partner));return(a,s)=>{return e(),i("div",m,[c("div",b,[c("a",v,[l(o(p),{class:"icon"}),k])]),l(r,{hero:"",page:"",data:o(t)},null,8,["data"]),c("div",j,[c("h2",null,"About "+d(o(t).name),1),(e(!0),i(h,null,u(o(t).description,(a=>(e(),i("p",{innerHTML:a},null,8,_)))),256))]),c("div",P,[c("a",{href:o(t).website.url,target:"_blank"},"Visit Website",8,L),c("a",{class:"contact",href:(n=o(t).contact,`mailto:${n}?subject=Looking for a Vue.js Partner`),target:"_blank"},"Contact",8,C)]),o(t).hiring?(e(),i("div",H,[c("a",{href:o(t).hiring},d(o(t).name)+" is hiring!",9,M)])):f("",!0)]);var n}}}),[["__scopeId","data-v-13025b7a"]]);export{T as P};
