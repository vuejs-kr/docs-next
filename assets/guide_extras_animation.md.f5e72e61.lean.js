import{_ as s,r as n,h as a,o as t,c as l,d as o,U as e,W as p,A as r,B as c,l as i,X as y,t as u,N as F,Y as D,D as C,E as h,u as f,e as A,j as d,a as g}from"./app.920f80b5.js";import{g as m}from"./chunks/index.31797bf8.js";var b,v="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},I={exports:{}};b=I,function(){var s,n,a,t,l,o,e,p,r,c,i,y,u,F,D,C,h,f,A,d,g,m,v,I,w,G,X,x,Z,V,B,R,W,H,Y,M,S,T,j,k,J,N,z,L,E,P,O,q,_,U,Q,K,$,ss,ns,as,ts,ls,os,es,ps,rs,cs=function(s,n){return function(){return s.apply(n,arguments)}};B=function(){return"visible"===document.visibilityState||null!=x.tests},os=[],"undefined"!=typeof document&&null!==document&&document.addEventListener("visibilitychange",(function(){var s,n,a,t;for(t=[],n=0,a=os.length;n<a;n++)s=os[n],t.push(s(B()));return t})),M=function(s){return os.push(s)},I=function(s){var n,a,t;for(n in a={},s)t=s[n],a[n]=t;return a},m=function(s){var n;return n={},function(){var a,t,l,o;for(a="",l=0,o=arguments.length;l<o;l++)a+=arguments[l].toString()+",";return(t=n[a])||(n[a]=t=s.apply(this,arguments)),t}},Y=function(s){return function(n){var a,t,l;return n instanceof Array||n instanceof NodeList||n instanceof HTMLCollection?(l=function(){var l,o,e;for(e=[],t=l=0,o=n.length;0<=o?l<o:l>o;t=0<=o?++l:--l)(a=Array.prototype.slice.call(arguments,1)).splice(0,0,n[t]),e.push(s.apply(this,a));return e}.apply(this,arguments),l):s.apply(this,arguments)}},f=function(s,n){var a,t,l;for(a in l=[],n)t=n[a],l.push(null!=s[a]?s[a]:s[a]=t);return l},A=function(s,n){var a,t,l;if(null!=s.style)return d(s,n);for(a in l=[],n)t=n[a],l.push(s[a]=t.format());return l},d=function(s,n){var a,t,l,o,e;for(t in n=S(n),o=[],a=R(s),n)e=n[t],as.contains(t)?o.push([t,e]):(null!=e.format&&(e=e.format()),"number"==typeof e&&(e=""+e+ls(t,e)),null!=s.hasAttribute&&s.hasAttribute(t)?s.setAttribute(t,e):null!=s.style&&(s.style[j(t)]=e),t in s&&(s[t]=e));if(o.length>0)return a?((l=new c).applyProperties(o),s.setAttribute("transform",l.decompose().format())):(e=o.map((function(s){return ts(s[0],s[1])})).join(" "),s.style[j("transform")]=e)},R=function(s){var n,a;return"undefined"!=typeof SVGElement&&null!==SVGElement&&"undefined"!=typeof SVGSVGElement&&null!==SVGSVGElement?s instanceof SVGElement&&!(s instanceof SVGSVGElement):null!=(n=null!=(a=x.tests)&&"function"==typeof a.isSVG?a.isSVG(s):void 0)&&n},N=function(s,n){var a;return a=Math.pow(10,n),Math.round(s*a)/a},i=function(){function s(s){var n,a,t;for(this.obj={},a=0,t=s.length;a<t;a++)n=s[a],this.obj[n]=1}return s.prototype.contains=function(s){return 1===this.obj[s]},s}(),ns=function(s){return s.replace(/([A-Z])/g,(function(s){return"-"+s.toLowerCase()}))},k=new i("marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius".split(",")),X=new i("rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ".split(",")),as=new i("translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective".split(",")),Q=new i("accent-height,ascent,azimuth,baseFrequency,baseline-shift,bias,cx,cy,d,diffuseConstant,divisor,dx,dy,elevation,filterRes,fx,fy,gradientTransform,height,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,letter-spacing,limitingConeAngle,markerHeight,markerWidth,numOctaves,order,overline-position,overline-thickness,pathLength,points,pointsAtX,pointsAtY,pointsAtZ,r,radius,rx,ry,seed,specularConstant,specularExponent,stdDeviation,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,surfaceScale,target,targetX,targetY,transform,underline-position,underline-thickness,viewBox,width,x,x1,x2,y,y1,y2,z".split(",")),ls=function(s,n){return"number"!=typeof n?"":k.contains(s)?"px":X.contains(s)?"deg":""},ts=function(s,n){var a,t;return null!=(a=(""+n).match(/^([0-9.-]*)([^0-9]*)$/))?(n=a[1],t=a[2]):n=parseFloat(n),n=N(parseFloat(n),10),null!=t&&""!==t||(t=ls(s,n)),s+"("+n+t+")"},S=function(s){var n,a,t,l,o,e,p,r;for(l in t={},s)if(o=s[l],as.contains(l))if((a=l.match(/(translate|rotateC|rotate|skew|scale|perspective)(X|Y|Z|)/))&&a[2].length>0)t[l]=o;else for(e=0,p=(r=["X","Y","Z"]).length;e<p;e++)n=r[e],t[a[1]+n]=o;else t[l]=o;return t},G=function(s){var n;return""+(n="opacity"===s?1:0)+ls(s,n)},Z=function(s,n){var a,t,l,o,e,p,i,y,u,D,C;if(o={},a=R(s),null!=s.style)for(e=window.getComputedStyle(s,null),i=0,u=n.length;i<u;i++)t=n[i],as.contains(t)?null==o.transform&&(l=a?new c(null!=(C=s.transform.baseVal.consolidate())?C.matrix:void 0):r.fromTransform(e[j("transform")]),o.transform=l.decompose()):(null!=(p=null!=s.hasAttribute&&s.hasAttribute(t)?s.getAttribute(t):t in s?s[t]:e[t])&&"d"!==t||!Q.contains(t)||(p=s.getAttribute(t)),""!==p&&null!=p||(p=G(t)),o[t]=w(p));else for(y=0,D=n.length;y<D;y++)o[t=n[y]]=w(s[t]);return F(s,o),o},F=function(s,n){var a,t;for(t in n)(a=n[t])instanceof o&&null!=s.style&&t in s.style&&(a=new p([a,ls(t,0)])),n[t]=a;return n},w=function(s){var n,a,l,r;for(l=0,r=(a=[t,e,o,p]).length;l<r;l++)if(null!=(n=a[l].create(s)))return n;return null},p=function(){function s(s){this.parts=s,this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this)}return s.prototype.interpolate=function(n,a){var t,l,o,e,p,r;for(e=this.parts,t=n.parts,o=[],l=p=0,r=Math.min(e.length,t.length);0<=r?p<r:p>r;l=0<=r?++p:--p)null!=e[l].interpolate?o.push(e[l].interpolate(t[l],a)):o.push(e[l]);return new s(o)},s.prototype.format=function(){return this.parts.map((function(s){return null!=s.format?s.format():s})).join("")},s.create=function(n){var a,t,e,p,r,c,i,y,u,F,D;for(n=""+n,e=[],y=0,F=(i=[{re:/(#[a-f\d]{3,6})/gi,klass:l,parse:function(s){return s}},{re:/(rgba?\([0-9.]*, ?[0-9.]*, ?[0-9.]*(?:, ?[0-9.]*)?\))/gi,klass:l,parse:function(s){return s}},{re:/([-+]?[\d.]+)/gi,klass:o,parse:parseFloat}]).length;y<F;y++)for(r=(c=i[y]).re;t=r.exec(n);)e.push({index:t.index,length:t[1].length,interpolable:c.klass.create(c.parse(t[1]))});for(p=[],a=0,u=0,D=(e=e.sort((function(s,n){return s.index>n.index?1:-1}))).length;u<D;u++)(t=e[u]).index<a||(t.index>a&&p.push(n.substring(a,t.index)),p.push(t.interpolable),a=t.index+t.length);return a<n.length&&p.push(n.substring(a)),new s(p)},s}(),e=function(){function s(s){this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this),this.obj=s}return s.prototype.interpolate=function(n,a){var t,l,o,e,p;for(l in e=this.obj,t=n.obj,o={},e)null!=(p=e[l]).interpolate?o[l]=p.interpolate(t[l],a):o[l]=p;return new s(o)},s.prototype.format=function(){return this.obj},s.create=function(n){var a,t,l;if(n instanceof Object){for(a in t={},n)l=n[a],t[a]=w(l);return new s(t)}return null},s}(),o=function(){function s(s){this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this),this.value=parseFloat(s)}return s.prototype.interpolate=function(n,a){var t;return t=this.value,new s((n.value-t)*a+t)},s.prototype.format=function(){return N(this.value,5)},s.create=function(n){return"number"==typeof n?new s(n):null},s}(),t=function(){function s(s){this.values=s,this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this)}return s.prototype.interpolate=function(n,a){var t,l,o,e,p,r;for(e=this.values,t=n.values,o=[],l=p=0,r=Math.min(e.length,t.length);0<=r?p<r:p>r;l=0<=r?++p:--p)null!=e[l].interpolate?o.push(e[l].interpolate(t[l],a)):o.push(e[l]);return new s(o)},s.prototype.format=function(){return this.values.map((function(s){return null!=s.format?s.format():s}))},s.createFromArray=function(n){return new s(n.map((function(s){return w(s)||s})).filter((function(s){return null!=s})))},s.create=function(n){return n instanceof Array?s.createFromArray(n):null},s}(),s=function(){function s(s,n){this.rgb=null!=s?s:{},this.format=n,this.toRgba=cs(this.toRgba,this),this.toRgb=cs(this.toRgb,this),this.toHex=cs(this.toHex,this)}return s.fromHex=function(n){var a,t;return null!=(a=n.match(/^#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i))&&(n="#"+a[1]+a[1]+a[2]+a[2]+a[3]+a[3]),null!=(t=n.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i))?new s({r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),a:1},"hex"):null},s.fromRgb=function(n){var a,t;return null!=(a=n.match(/^rgba?\(([0-9.]*), ?([0-9.]*), ?([0-9.]*)(?:, ?([0-9.]*))?\)$/))?new s({r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3]),a:parseFloat(null!=(t=a[4])?t:1)},null!=a[4]?"rgba":"rgb"):null},s.componentToHex=function(s){var n;return 1===(n=s.toString(16)).length?"0"+n:n},s.prototype.toHex=function(){return"#"+s.componentToHex(this.rgb.r)+s.componentToHex(this.rgb.g)+s.componentToHex(this.rgb.b)},s.prototype.toRgb=function(){return"rgb("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+")"},s.prototype.toRgba=function(){return"rgba("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+", "+this.rgb.a+")"},s}(),l=function(){function n(s){this.color=s,this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this)}return n.prototype.interpolate=function(a,t){var l,o,e,p,r,c,i,y;for(p=this.color,l=a.color,e={},c=0,i=(y=["r","g","b"]).length;c<i;c++)o=y[c],r=Math.round((l.rgb[o]-p.rgb[o])*t+p.rgb[o]),e[o]=Math.min(255,Math.max(0,r));return o="a",r=N((l.rgb[o]-p.rgb[o])*t+p.rgb[o],5),e[o]=Math.min(1,Math.max(0,r)),new n(new s(e,l.format))},n.prototype.format=function(){return"hex"===this.color.format?this.color.toHex():"rgb"===this.color.format?this.color.toRgb():"rgba"===this.color.format?this.color.toRgba():void 0},n.create=function(a){var t;if("string"==typeof a)return null!=(t=s.fromHex(a)||s.fromRgb(a))?new n(t):null},n}(),a=function(){function s(s){this.props=s,this.applyRotateCenter=cs(this.applyRotateCenter,this),this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this)}return s.prototype.interpolate=function(n,a){var t,l,o,e,p,r,c,i,y,u,F,D;for(o={},e=0,i=(u=["translate","scale","rotate"]).length;e<i;e++)for(o[l=u[e]]=[],t=p=0,F=this.props[l].length;0<=F?p<F:p>F;t=0<=F?++p:--p)o[l][t]=(n.props[l][t]-this.props[l][t])*a+this.props[l][t];for(t=r=1;r<=2;t=++r)o.rotate[t]=n.props.rotate[t];for(c=0,y=(D=["skew"]).length;c<y;c++)o[l=D[c]]=(n.props[l]-this.props[l])*a+this.props[l];return new s(o)},s.prototype.format=function(){return"translate("+this.props.translate.join(",")+") rotate("+this.props.rotate.join(",")+") skewX("+this.props.skew+") scale("+this.props.scale.join(",")+")"},s.prototype.applyRotateCenter=function(s){var n,a,t,l,o;for(a=(a=(a=(a=g.createSVGMatrix()).translate(s[0],s[1])).rotate(this.props.rotate[0])).translate(-s[0],-s[1]),t=new c(a).decompose().props.translate,o=[],n=l=0;l<=1;n=++l)o.push(this.props.translate[n]-=t[n]);return o},s}(),g="undefined"!=typeof document&&null!==document?document.createElementNS("http://www.w3.org/2000/svg","svg"):void 0,c=function(){function s(s){this.m=s,this.applyProperties=cs(this.applyProperties,this),this.decompose=cs(this.decompose,this),this.m||(this.m=g.createSVGMatrix())}return s.prototype.decompose=function(){var s,n,t,l,o;return l=new y([this.m.a,this.m.b]),o=new y([this.m.c,this.m.d]),s=l.length(),t=l.dot(o),l=l.normalize(),n=o.combine(l,1,-t).length(),new a({translate:[this.m.e,this.m.f],rotate:[180*Math.atan2(this.m.b,this.m.a)/Math.PI,this.rotateCX,this.rotateCY],scale:[s,n],skew:t/n*180/Math.PI})},s.prototype.applyProperties=function(s){var n,a,t,l,o,e,p,r;for(n={},o=0,e=s.length;o<e;o++)n[(t=s[o])[0]]=t[1];for(a in n)l=n[a],"translateX"===a?this.m=this.m.translate(l,0):"translateY"===a?this.m=this.m.translate(0,l):"scaleX"===a?this.m=this.m.scaleNonUniform(l,1):"scaleY"===a?this.m=this.m.scaleNonUniform(1,l):"rotateZ"===a?this.m=this.m.rotate(l):"skewX"===a?this.m=this.m.skewX(l):"skewY"===a&&(this.m=this.m.skewY(l));return this.rotateCX=null!=(p=n.rotateCX)?p:0,this.rotateCY=null!=(r=n.rotateCY)?r:0},s}(),y=function(){function s(s){this.els=s,this.combine=cs(this.combine,this),this.normalize=cs(this.normalize,this),this.length=cs(this.length,this),this.cross=cs(this.cross,this),this.dot=cs(this.dot,this),this.e=cs(this.e,this)}return s.prototype.e=function(s){return s<1||s>this.els.length?null:this.els[s-1]},s.prototype.dot=function(s){var n,a,t;if(n=s.els||s,t=0,(a=this.els.length)!==n.length)return null;for(a+=1;--a;)t+=this.els[a-1]*n[a-1];return t},s.prototype.cross=function(n){var a,t;return t=n.els||n,3!==this.els.length||3!==t.length?null:new s([(a=this.els)[1]*t[2]-a[2]*t[1],a[2]*t[0]-a[0]*t[2],a[0]*t[1]-a[1]*t[0]])},s.prototype.length=function(){var s,n,a,t,l;for(s=0,a=0,t=(l=this.els).length;a<t;a++)n=l[a],s+=Math.pow(n,2);return Math.sqrt(s)},s.prototype.normalize=function(){var n,a,t,l,o;for(a in t=this.length(),l=[],o=this.els)n=o[a],l[a]=n/t;return new s(l)},s.prototype.combine=function(n,a,t){var l,o,e,p;for(o=[],l=e=0,p=this.els.length;0<=p?e<p:e>p;l=0<=p?++e:--e)o[l]=a*this.els[l]+t*n.els[l];return new s(o)},s}(),n=function(){function s(){this.toMatrix=cs(this.toMatrix,this),this.format=cs(this.format,this),this.interpolate=cs(this.interpolate,this)}return s.prototype.interpolate=function(n,a,t){var l,o,e,p,r,c,i,y,u,F,D,C,h,f,A,d,g,m;for(null==t&&(t=null),e=this,o=new s,C=0,d=(g=["translate","scale","skew","perspective"]).length;C<d;C++)for(o[i=g[C]]=[],p=h=0,m=e[i].length-1;0<=m?h<=m:h>=m;p=0<=m?++h:--h)null==t||t.indexOf(i)>-1||t.indexOf(""+i+["x","y","z"][p])>-1?o[i][p]=(n[i][p]-e[i][p])*a+e[i][p]:o[i][p]=e[i][p];if(null==t||-1!==t.indexOf("rotate")){if(y=e.quaternion,u=n.quaternion,(l=y[0]*u[0]+y[1]*u[1]+y[2]*u[2]+y[3]*u[3])<0){for(p=f=0;f<=3;p=++f)y[p]=-y[p];l=-l}for(l+1>.05?1-l>=.05?(D=Math.acos(l),c=1/Math.sin(D),F=Math.sin(D*(1-a))*c,r=Math.sin(D*a)*c):(F=1-a,r=a):(u[0]=-y[1],u[1]=y[0],u[2]=-y[3],u[3]=y[2],F=Math.sin(piDouble*(.5-a)),r=Math.sin(piDouble*a)),o.quaternion=[],p=A=0;A<=3;p=++A)o.quaternion[p]=y[p]*F+u[p]*r}else o.quaternion=e.quaternion;return o},s.prototype.format=function(){return this.toMatrix().toString()},s.prototype.toMatrix=function(){var s,n,a,t,l,o,e,p,c,i,y,u,F,D,C,h;for(s=this,l=r.I(4),n=F=0;F<=3;n=++F)l.els[n][3]=s.perspective[n];for(i=(o=s.quaternion)[0],y=o[1],u=o[2],c=o[3],e=s.skew,t=[[1,0],[2,0],[2,1]],n=D=2;D>=0;n=--D)e[n]&&((p=r.I(4)).els[t[n][0]][t[n][1]]=e[n],l=l.multiply(p));for(l=l.multiply(new r([[1-2*(y*y+u*u),2*(i*y-u*c),2*(i*u+y*c),0],[2*(i*y+u*c),1-2*(i*i+u*u),2*(y*u-i*c),0],[2*(i*u-y*c),2*(y*u+i*c),1-2*(i*i+y*y),0],[0,0,0,1]])),n=C=0;C<=2;n=++C){for(a=h=0;h<=2;a=++h)l.els[n][a]*=s.scale[n];l.els[3][n]=s.translate[n]}return l},s}(),r=function(){function s(s){this.els=s,this.toString=cs(this.toString,this),this.decompose=cs(this.decompose,this),this.inverse=cs(this.inverse,this),this.augment=cs(this.augment,this),this.toRightTriangular=cs(this.toRightTriangular,this),this.transpose=cs(this.transpose,this),this.multiply=cs(this.multiply,this),this.dup=cs(this.dup,this),this.e=cs(this.e,this)}return s.prototype.e=function(s,n){return s<1||s>this.els.length||n<1||n>this.els[0].length?null:this.els[s-1][n-1]},s.prototype.dup=function(){return new s(this.els)},s.prototype.multiply=function(n){var a,t,l,o,e,p,r,c,i,y,u,F,D;for(F=!!n.modulus,void 0===(a=n.els||n)[0][0]&&(a=new s(a).els),r=y=this.els.length,c=a[0].length,l=this.els[0].length,o=[],y+=1;--y;)for(o[e=r-y]=[],u=c,u+=1;--u;){for(p=c-u,D=0,i=l,i+=1;--i;)t=l-i,D+=this.els[e][t]*a[t][p];o[e][p]=D}return a=new s(o),F?a.col(1):a},s.prototype.transpose=function(){var n,a,t,l,o,e,p;for(p=this.els.length,a=[],o=n=this.els[0].length,o+=1;--o;)for(a[t=n-o]=[],e=p,e+=1;--e;)l=p-e,a[t][l]=this.els[l][t];return new s(a)},s.prototype.toRightTriangular=function(){var s,n,a,t,l,o,e,p,r,c,i,y,u,F;for(s=this.dup(),l=p=this.els.length,o=this.els[0].length;--p;){if(a=l-p,0===s.els[a][a])for(t=i=u=a+1;u<=l?i<l:i>l;t=u<=l?++i:--i)if(0!==s.els[t][a]){for(n=[],r=o,r+=1;--r;)c=o-r,n.push(s.els[a][c]+s.els[t][c]);s.els[a]=n;break}if(0!==s.els[a][a])for(t=y=F=a+1;F<=l?y<l:y>l;t=F<=l?++y:--y){for(e=s.els[t][a]/s.els[a][a],n=[],r=o,r+=1;--r;)c=o-r,n.push(c<=a?0:s.els[t][c]-s.els[a][c]*e);s.els[t]=n}}return s},s.prototype.augment=function(n){var a,t,l,o,e,p,r,c,i;if(void 0===(a=n.els||n)[0][0]&&(a=new s(a).els),l=(t=this.dup()).els[0].length,p=c=t.els.length,r=a[0].length,c!==a.length)return null;for(c+=1;--c;)for(o=p-c,i=r,i+=1;--i;)e=r-i,t.els[o][l+e]=a[o][e];return t},s.prototype.inverse=function(){var n,a,t,l,o,e,p,r,c,i,y,u,F;for(p=i=this.els.length,r=(n=this.augment(s.I(i)).toRightTriangular()).els[0].length,o=[],i+=1;--i;){for(t=[],y=r,o[l=i-1]=[],a=n.els[l][l],y+=1;--y;)u=r-y,c=n.els[l][u]/a,t.push(c),u>=p&&o[l].push(c);for(n.els[l]=t,e=F=0;0<=l?F<l:F>l;e=0<=l?++F:--F){for(t=[],y=r,y+=1;--y;)u=r-y,t.push(n.els[e][u]-n.els[l][u]*n.els[e][l]);n.els[e]=t}}return new s(o)},s.I=function(n){var a,t,l,o,e;for(a=[],o=n,n+=1;--n;)for(a[t=o-n]=[],e=o,e+=1;--e;)l=o-e,a[t][l]=t===l?1:0;return new s(a)},s.prototype.decompose=function(){var s,a,t,l,o,e,p,r,c,i,u,F,D,C,h,f,A,d,g,m,b,v,I,w,G,X,x,Z,V,B,R,W,H,Y,M;for(d=[],h=[],f=[],e=[],s=[],a=X=0;X<=3;a=++X)for(s[a]=[],t=x=0;x<=3;t=++x)s[a][t]=this.els[a][t];if(0===s[3][3])return!1;for(a=Z=0;Z<=3;a=++Z)for(t=V=0;V<=3;t=++V)s[a][t]/=s[3][3];for(p=this.dup(),a=B=0;B<=2;a=++B)p.els[a][3]=0;if(p.els[3][3]=1,0!==s[0][3]||0!==s[1][3]||0!==s[2][3]){for(i=new y(s.slice(0,4)[3]),e=p.inverse().transpose().multiply(i).els,a=R=0;R<=2;a=++R)s[a][3]=0;s[3][3]=1}else e=[0,0,0,1];for(a=W=0;W<=2;a=++W)d[a]=s[3][a],s[3][a]=0;for(F=[],a=H=0;H<=2;a=++H)F[a]=new y(s[a].slice(0,3));if(h[0]=F[0].length(),F[0]=F[0].normalize(),f[0]=F[0].dot(F[1]),F[1]=F[1].combine(F[0],1,-f[0]),h[1]=F[1].length(),F[1]=F[1].normalize(),f[0]/=h[1],f[1]=F[0].dot(F[2]),F[2]=F[2].combine(F[0],1,-f[1]),f[2]=F[1].dot(F[2]),F[2]=F[2].combine(F[1],1,-f[2]),h[2]=F[2].length(),F[2]=F[2].normalize(),f[1]/=h[2],f[2]/=h[2],o=F[1].cross(F[2]),F[0].dot(o)<0)for(a=Y=0;Y<=2;a=++Y)for(h[a]*=-1,t=M=0;M<=2;t=++M)F[a].els[t]*=-1;for(m in D=function(s,n){return F[s].els[n]},(u=[])[1]=Math.asin(-D(0,2)),0!==Math.cos(u[1])?(u[0]=Math.atan2(D(1,2),D(2,2)),u[2]=Math.atan2(D(0,1),D(0,0))):(u[0]=Math.atan2(-D(2,0),D(1,1)),u[1]=0),(A=D(0,0)+D(1,1)+D(2,2)+1)>1e-4?(v=.25/(C=.5/Math.sqrt(A)),I=(D(2,1)-D(1,2))*C,w=(D(0,2)-D(2,0))*C,G=(D(1,0)-D(0,1))*C):D(0,0)>D(1,1)&&D(0,0)>D(2,2)?(I=.25*(C=2*Math.sqrt(1+D(0,0)-D(1,1)-D(2,2))),w=(D(0,1)+D(1,0))/C,G=(D(0,2)+D(2,0))/C,v=(D(2,1)-D(1,2))/C):D(1,1)>D(2,2)?(C=2*Math.sqrt(1+D(1,1)-D(0,0)-D(2,2)),I=(D(0,1)+D(1,0))/C,w=.25*C,G=(D(1,2)+D(2,1))/C,v=(D(0,2)-D(2,0))/C):(C=2*Math.sqrt(1+D(2,2)-D(0,0)-D(1,1)),I=(D(0,2)+D(2,0))/C,w=(D(1,2)+D(2,1))/C,G=.25*C,v=(D(1,0)-D(0,1))/C),r=[I,w,G,v],(c=new n).translate=d,c.scale=h,c.skew=f,c.quaternion=r,c.perspective=e,c.rotate=u,c)for(l in g=c[m])b=g[l],isNaN(b)&&(g[l]=0);return c},s.prototype.toString=function(){var s,n,a,t,l;for(a="matrix3d(",s=t=0;t<=3;s=++t)for(n=l=0;l<=3;n=++l)a+=N(this.els[s][n],10),3===s&&3===n||(a+=",");return a+=")"},s.matrixForTransform=m((function(s){var n,a,t,l,o,e;return(n=document.createElement("div")).style.position="absolute",n.style.visibility="hidden",n.style[j("transform")]=s,document.body.appendChild(n),a=null!=(l=null!=(o=(t=window.getComputedStyle(n,null)).transform)?o:t[j("transform")])?l:null!=(e=x.tests)?e.matrixForTransform(s):void 0,document.body.removeChild(n),a})),s.fromTransform=function(n){var a,t,l,o,e,p;for(t=(o=null!=n?n.match(/matrix3?d?\(([-0-9,e \.]*)\)/):void 0)?6===(a=(a=o[1].split(",")).map(parseFloat)).length?[a[0],a[1],0,0,a[2],a[3],0,0,0,0,1,0,a[4],a[5],0,1]:a:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e=[],l=p=0;p<=3;l=++p)e.push(t.slice(4*l,4*l+4));return new s(e)},s}(),T=m((function(s){var n,a,t,l,o,e,p,r,c,i;if(void 0!==document.body.style[s])return"";for(o="",e=0,r=(l=s.split("-")).length;e<r;e++)o+=(t=l[e]).substring(0,1).toUpperCase()+t.substring(1);for(p=0,c=(i=["Webkit","Moz","ms"]).length;p<c;p++)if(n=(a=i[p])+o,void 0!==document.body.style[n])return a;return""})),j=m((function(s){var n;return"Moz"===(n=T(s))?""+n+(s.substring(0,1).toUpperCase()+s.substring(1)):""!==n?"-"+n.toLowerCase()+"-"+ns(s):ns(s)})),J="undefined"!=typeof window&&null!==window?window.requestAnimationFrame:void 0,C=[],h=[],O=!1,q=1,"undefined"!=typeof window&&null!==window&&window.addEventListener("keyup",(function(s){if(68===s.keyCode&&s.shiftKey&&s.ctrlKey)return x.toggleSlow()})),null==J&&(W=0,J=function(s){var n,a,t;return n=Date.now(),t=Math.max(0,16-(n-W)),a=window.setTimeout((function(){return s(n+t)}),t),W=n+t,a}),L=!1,z=!1,U=function(){if(!L)return L=!0,J(E)},E=function(s){var n,a,t,l;if(!z){for(a=[],t=0,l=C.length;t<l;t++)n=C[t],D(s,n)||a.push(n);return 0===(C=C.filter((function(s){return-1===a.indexOf(s)}))).length?L=!1:J(E)}J(E)},D=function(s,n){var a,t,l,o,e,p,r,c;if(null==n.tStart&&(n.tStart=s),o=(s-n.tStart)/n.options.duration,e=n.curve(o),t={},o>=1)t=n.curve.returnsToSelf?n.properties.start:n.properties.end;else for(a in c=n.properties.start)l=c[a],t[a]=V(l,n.properties.end[a],e);return A(n.el,t),"function"==typeof(p=n.options).change&&p.change(n.el,Math.min(1,o)),o>=1&&"function"==typeof(r=n.options).complete&&r.complete(n.el),o<1},V=function(s,n,a){return null!=s&&null!=s.interpolate?s.interpolate(n,a):null},_=function(s,n,a,t){var l,o,e,p,i,y,u;if(null!=t&&(h=h.filter((function(s){return s.id!==t}))),x.stop(s,{timeout:!1}),!a.animated)return x.css(s,n),void("function"==typeof a.complete&&a.complete(this));for(e in i=Z(s,Object.keys(n)),l={},y=[],n=S(n))u=n[e],null!=s.style&&as.contains(e)?y.push([e,u]):l[e]=w(u);return y.length>0&&((o=R(s))?(p=new c).applyProperties(y):(u=y.map((function(s){return ts(s[0],s[1])})).join(" "),p=r.fromTransform(r.matrixForTransform(u))),l.transform=p.decompose(),o&&i.transform.applyRotateCenter([l.transform.props.rotate[1],l.transform.props.rotate[2]])),F(s,l),C.push({el:s,properties:{start:i,end:l},options:a,curve:a.type.call(a.type,a)}),U()},ss=[],$=0,P=function(s){if(B())return J((function(){if(-1!==ss.indexOf(s))return s.realTimeoutId=setTimeout((function(){return s.fn(),v(s.id)}),s.delay)}))},u=function(s,n){var a;return a={id:$+=1,tStart:Date.now(),fn:s,delay:n,originalDelay:n},P(a),ss.push(a),$},v=function(s){return ss=ss.filter((function(n){return n.id===s&&n.realTimeoutId&&clearTimeout(n.realTimeoutId),n.id!==s}))},H=function(s,n){var a;return null!=s?(a=s-n.tStart,n.originalDelay-a):n.originalDelay},"undefined"!=typeof window&&null!==window&&window.addEventListener("unload",(function(){})),K=null,M((function(s){var n,a,t,l,o,e,p,r,c,i;if(z=!s,s){if(L)for(a=Date.now()-K,o=0,r=C.length;o<r;o++)null!=(n=C[o]).tStart&&(n.tStart+=a);for(e=0,c=ss.length;e<c;e++)(t=ss[e]).delay=H(K,t),P(t);return K=null}for(K=Date.now(),i=[],l=0,p=ss.length;l<p;l++)t=ss[l],i.push(clearTimeout(t.realTimeoutId));return i})),(x={}).linear=function(){return function(s){return s}},x.spring=function(s){var n,a,t,l,o;return null==s&&(s={}),f(s,x.spring.defaults),t=Math.max(1,s.frequency/20),l=Math.pow(20,s.friction/100),o=s.anticipationSize/1e3,n=function(n){var a,t;return(.8-(a=((t=o/(1-o))-0)/(t-0)))/t*n*s.anticipationStrength/100+a},a=function(s){return Math.pow(l/10,-s)*(1-s)},function(s){var l,e,p,r,c,i,y,u;return i=s/(1-o)-o/(1-o),s<o?(u=o/(1-o)-o/(1-o),y=0/(1-o)-o/(1-o),c=Math.acos(1/n(u)),p=(Math.acos(1/n(y))-c)/(t*-o),l=n):(l=a,c=0,p=1),e=l(i),r=t*(s-o)*p+c,1-e*Math.cos(r)}},x.bounce=function(s){var n,a,t,l;return null==s&&(s={}),f(s,x.bounce.defaults),t=Math.max(1,s.frequency/20),l=Math.pow(20,s.friction/100),n=function(s){return Math.pow(l/10,-s)*(1-s)},(a=function(s){var a,l;return a=n(s),l=t*s*1-1.57,a*Math.cos(l)}).returnsToSelf=!0,a},x.gravity=function(s){var n,a,t,l,o,e;return null==s&&(s={}),f(s,x.gravity.defaults),a=Math.min(s.bounciness/1250,.8),l=s.elasticity/1e3,t=[],n=function(){var t,l;for(l={a:-(t=Math.sqrt(.02)),b:t,H:1},s.returnsToSelf&&(l.a=0,l.b=2*l.b);l.H>.001;)n=l.b-l.a,l={a:l.b,b:l.b+n*a,H:l.H*a*a};return l.b}(),e=function(a,t,l,o){var e,p;return e=(p=2/(n=t-a)*o-1-2*a/n)*p*l-l+1,s.returnsToSelf&&(e=1-e),e},function(){var o,e,p,r;for(p={a:-(e=Math.sqrt(2/(100*n*n))),b:e,H:1},s.returnsToSelf&&(p.a=0,p.b=2*p.b),t.push(p),o=n,r=[];p.b<1&&p.H>.001;)o=p.b-p.a,p={a:p.b,b:p.b+o*a,H:p.H*l},r.push(t.push(p))}(),(o=function(n){var a,l;for(a=t[l=0];!(n>=a.a&&n<=a.b)&&(a=t[l+=1]););return a?e(a.a,a.b,a.H,n):s.returnsToSelf?0:1}).returnsToSelf=s.returnsToSelf,o},x.forceWithGravity=function(s){return null==s&&(s={}),f(s,x.forceWithGravity.defaults),s.returnsToSelf=!0,x.gravity(s)},x.bezier=(ps=function(s,n,a,t,l){return Math.pow(1-s,3)*n+3*Math.pow(1-s,2)*s*a+3*(1-s)*Math.pow(s,2)*t+Math.pow(s,3)*l},es=function(s,n,a,t,l){return{x:ps(s,n.x,a.x,t.x,l.x),y:ps(s,n.y,a.y,t.y,l.y)}},rs=function(s,n,a){var t,l,o,e,p,r,c,i,y;for(t=null,i=0,y=n.length;i<y&&(s>=(l=n[i])(0).x&&s<=l(1).x&&(t=l),null===t);i++);if(!t)return a?0:1;for(c=t(p=((r=1)+(e=0))/2).x,o=0;Math.abs(s-c)>1e-4&&o<100;)s>c?e=p:r=p,c=t(p=(r+e)/2).x,o+=1;return t(p).y},function(s){var n,a,t;return null==s&&(s={}),t=s.points,n=function(){var s,a,l;for(s in n=[],l=function(s,a){var t;return t=function(n){return es(n,s,s.cp[s.cp.length-1],a.cp[0],a)},n.push(t)},t){if((a=parseInt(s))>=t.length-1)break;l(t[a],t[a+1])}return n}(),(a=function(s){return 0===s?0:1===s?1:rs(s,n,this.returnsToSelf)}).returnsToSelf=0===t[t.length-1].y,a}),x.easeInOut=function(s){var n,a;return null==s&&(s={}),n=null!=(a=s.friction)?a:x.easeInOut.defaults.friction,x.bezier({points:[{x:0,y:0,cp:[{x:.92-n/1e3,y:0}]},{x:1,y:1,cp:[{x:.08+n/1e3,y:1}]}]})},x.easeIn=function(s){var n,a;return null==s&&(s={}),n=null!=(a=s.friction)?a:x.easeIn.defaults.friction,x.bezier({points:[{x:0,y:0,cp:[{x:.92-n/1e3,y:0}]},{x:1,y:1,cp:[{x:1,y:1}]}]})},x.easeOut=function(s){var n,a;return null==s&&(s={}),n=null!=(a=s.friction)?a:x.easeOut.defaults.friction,x.bezier({points:[{x:0,y:0,cp:[{x:0,y:0}]},{x:1,y:1,cp:[{x:.08+n/1e3,y:1}]}]})},x.spring.defaults={frequency:300,friction:200,anticipationSize:0,anticipationStrength:0},x.bounce.defaults={frequency:300,friction:200},x.forceWithGravity.defaults=x.gravity.defaults={bounciness:400,elasticity:200},x.easeInOut.defaults=x.easeIn.defaults=x.easeOut.defaults={friction:500},x.css=Y((function(s,n){return d(s,n,!0)})),x.animate=Y((function(s,n,a){var t;return null==a&&(a={}),a=I(a),f(a,{type:x.easeInOut,duration:1e3,delay:0,animated:!0}),a.duration=Math.max(0,a.duration*q),a.delay=Math.max(0,a.delay),0===a.delay?_(s,n,a):(t=x.setTimeout((function(){return _(s,n,a,t)}),a.delay),h.push({id:t,el:s}))})),x.stop=Y((function(s,n){return null==n&&(n={}),null==n.timeout&&(n.timeout=!0),n.timeout&&(h=h.filter((function(a){return a.el!==s||null!=n.filter&&!n.filter(a)||(x.clearTimeout(a.id),!1)}))),C=C.filter((function(n){return n.el!==s}))})),x.setTimeout=function(s,n){return u(s,n*q)},x.clearTimeout=function(s){return v(s)},x.toggleSlow=function(){return q=(O=!O)?3:1,"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log("dynamics.js: slow animations "+(O?"enabled":"disabled")):void 0},b.exports=x}.call(v);var w=I.exports;const G=s=>(r("data-v-b9a0fef6"),s=s(),c(),s),X=["onTouchstart","onTouchmove","onTouchend"],x={class:"bg",width:"320",height:"560"},Z=["d"],V=G((()=>o("div",{class:"header"},"드레그 해보세요",-1))),B=[G((()=>o("a",{href:"https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBkeW5hbWljcyBmcm9tICdkeW5hbWljcy5qcydcblxuY29uc3QgaGVhZGVySGVpZ2h0ID0gMTIwXG5cbmxldCBpc0RyYWdnaW5nID0gZmFsc2VcbmNvbnN0IHN0YXJ0ID0geyB4OiAwLCB5OiAwIH1cbmxldCBjID0gJHJlZih7IHg6IGhlYWRlckhlaWdodCwgeTogaGVhZGVySGVpZ2h0IH0pXG5cbmNvbnN0IGhlYWRlclBhdGggPSAkY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gYE0wLDAgTDMyMCwwIDMyMCwke2hlYWRlckhlaWdodH1RJHtjLnh9LCR7Yy55fSAwLCR7aGVhZGVySGVpZ2h0fWBcbn0pXG5cbmNvbnN0IGNvbnRlbnRQb3NpdGlvbiA9ICRjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGR5ID0gYy55IC0gaGVhZGVySGVpZ2h0XG4gIGNvbnN0IGRhbXBlbiA9IGR5ID4gMCA/IDIgOiA0XG4gIHJldHVybiB7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKDAsJHtkeSAvIGRhbXBlbn1weClgXG4gIH1cbn0pXG5cbmZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gIGUgPSBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGVcbiAgaXNEcmFnZ2luZyA9IHRydWVcbiAgc3RhcnQueCA9IGUucGFnZVhcbiAgc3RhcnQueSA9IGUucGFnZVlcbn1cblxuZnVuY3Rpb24gb25EcmFnKGUpIHtcbiAgZSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZVxuICBpZiAoaXNEcmFnZ2luZykge1xuICAgIGMueCA9IGhlYWRlckhlaWdodCArIChlLnBhZ2VYIC0gc3RhcnQueClcbiAgICBjb25zdCBkeSA9IGUucGFnZVkgLSBzdGFydC55XG4gICAgY29uc3QgZGFtcGVuID0gZHkgPiAwID8gMS41IDogNFxuICAgIGMueSA9IGhlYWRlckhlaWdodCArIGR5IC8gZGFtcGVuXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcERyYWcoKSB7XG4gIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgaXNEcmFnZ2luZyA9IGZhbHNlXG4gICAgZHluYW1pY3MuYW5pbWF0ZShcbiAgICAgIGMsXG4gICAgICB7IHg6IGhlYWRlckhlaWdodCwgeTogaGVhZGVySGVpZ2h0IH0sXG4gICAgICB7IHR5cGU6IGR5bmFtaWNzLnNwcmluZywgZHVyYXRpb246IDcwMCwgZmlyY3Rpb246IDI4MCB9XG4gICAgKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJkcmFnZ2FibGVcIlxuICAgIEBtb3VzZWRvd249XCJzdGFydERyYWdcIlxuICAgIEB0b3VjaHN0YXJ0PVwic3RhcnREcmFnXCJcbiAgICBAbW91c2Vtb3ZlPVwib25EcmFnXCJcbiAgICBAdG91Y2htb3ZlPVwib25EcmFnXCJcbiAgICBAbW91c2V1cD1cInN0b3BEcmFnXCJcbiAgICBAdG91Y2hlbmQ9XCJzdG9wRHJhZ1wiXG4gICAgQG1vdXNlbGVhdmU9XCJzdG9wRHJhZ1wiXG4gID5cbiAgICA8c3ZnIGNsYXNzPVwiYmdcIiB3aWR0aD1cIjMyMFwiIGhlaWdodD1cIjU2MFwiPlxuICAgICAgPHBhdGggOmQ9XCJoZWFkZXJQYXRoXCIgZmlsbD1cIiMzRjUxQjVcIj48L3BhdGg+XG4gICAgPC9zdmc+XG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPuuTnOugiOq3uCDtlbTrs7TshLjsmpQ8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIDpzdHlsZT1cImNvbnRlbnRQb3NpdGlvblwiPuyViOuFlTwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZHJhZ2dhYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICB3aWR0aDogMzIwcHg7XG4gIGhlaWdodDogMjQwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogMzBweCBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogMzAwO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmJnIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDA7XG59XG4uaGVhZGVyLFxuLmNvbnRlbnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uaGVhZGVyIHtcbiAgY29sb3I6ICNmZmY7XG4gIGhlaWdodDogMTIwcHg7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcImR5bmFtaWNzLmpzXCI6IFwiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvZHluYW1pY3MuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9",target:"_blank"},"소스 코드",-1)))];var R=s({setup(s){const r=120;let c=!1;const i={x:0,y:0};let y=n({x:r,y:r});const u=a((()=>`M0,0 L320,0 320,120Q${y.value.x},${y.value.y} 0,120`)),F=a((()=>{const s=y.value.y-r;return{transform:`translate(0,${s/(s>0?2:4)}px)`}}));function D(s){s=s.changedTouches?s.changedTouches[0]:s,c=!0,i.x=s.pageX,i.y=s.pageY}function C(s){if(s=s.changedTouches?s.changedTouches[0]:s,c){y.value.x=r+(s.pageX-i.x);const n=s.pageY-i.y,a=n>0?1.5:4;y.value.y=r+n/a}}function h(){c&&(c=!1,w.animate(y.value,{x:r,y:r},{type:w.spring,duration:700,firction:280}))}return(s,n)=>(t(),l("div",{class:"draggable",onMousedown:D,onMousemove:C,onMouseup:h,onMouseleave:h,onTouchstart:p(D,["prevent"]),onTouchmove:p(C,["prevent"]),onTouchend:p(h,["prevent"])},[(t(),l("svg",x,[o("path",{d:u.value,fill:"#3F51B5"},null,8,Z)])),V,o("div",{class:"content",style:e(F.value)},B,4)],40,X))}},[["__scopeId","data-v-b9a0fef6"]]);const W={class:"demo"},H={key:0,style:{"margin-left":"20px"}},Y={setup(s){let a=n(!1);function e(){a.value=!0,setTimeout((()=>{a.value=!1}),1500)}return(s,n)=>(t(),l("div",W,[o("div",{class:y({shake:a.value})},[o("button",{onClick:e},"클릭하기"),a.value?(t(),l("span",H,"이 기능은 비활성화되어 있습니다!")):i("",!0)],2)]))}};const M=o("p",null,"이 div에서 마우스를 움직이세요...",-1),S={setup(s){let a=n(0);function p(s){a.value=s.clientX}return(s,n)=>(t(),l("div",{onMousemove:p,style:e({backgroundColor:`hsl(${a.value}, 80%, 50%)`}),class:"demo movearea"},[M,o("p",null,"x: "+u(a.value),1)],36))}};const T={class:"demo"},j=A(" 숫자 입력: "),k={class:"big-number"},J={setup(s){const a=n(0),e=F({number:0});return D(a,(s=>{m.to(e,{duration:.5,number:Number(s)||0})})),(s,n)=>(t(),l("div",T,[j,C(o("input",{"onUpdate:modelValue":n[0]||(n[0]=s=>a.value=s)},null,512),[[h,a.value,void 0,{number:!0}]]),o("p",k,u(f(e).number.toFixed(0)),1)]))}},N=g("",8),z=g("",6),L=o("p",null,[A("색상 외에도 스타일 바인딩을 사용하여 "),o("code",null,"transform"),A(", "),o("code",null,"width"),A(" 또는 "),o("code",null,"height"),A("에 애니메이션을 적용할 수도 있습니다. 스프링 물리학을 사용하여 SVG "),o("code",null,"path"),A("에 애니메이션할 수도 있습니다. 결국 모두 속성 데이터 바인딩입니다:")],-1),E=g("",5),P=o("div",{class:"composition-api"},[o("p",null,[o("a",{href:"https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IGdzYXAgZnJvbSAnZ3NhcCdcblxuY29uc3QgbnVtYmVyID0gcmVmKDApXG5jb25zdCB0d2VlbmVkID0gcmVhY3RpdmUoe1xuICBudW1iZXI6IDBcbn0pXG5cbndhdGNoKFxuICBudW1iZXIsXG4gIChuKSA9PiB7XG4gICAgZ3NhcC50byh0d2VlbmVkLCB7IGR1cmF0aW9uOiAwLjUsIG51bWJlcjogTnVtYmVyKG4pIHx8IDAgfSlcbiAgfVxuKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImRlbW9cIj5cbiAgICDsiKvsnpAg7J6F66ClOiA8aW5wdXQgdi1tb2RlbC5udW1iZXI9XCJudW1iZXJcIiAvPlxuICAgIDxwIGNsYXNzPVwiYmlnLW51bWJlclwiPnt7IHR3ZWVuZWQubnVtYmVyLnRvRml4ZWQoMCkgfX08L3A+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmJpZy1udW1iZXIge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAyZW07XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwiZ3NhcFwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2dzYXA/bW9kdWxlXCIsXG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9",target:"_blank",rel:"noopener noreferrer"},"온라인 연습장으로 실행하기")])],-1),O=o("div",{class:"options-api"},[o("p",null,[o("a",{href:"https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbnVtYmVyOiAwLFxuICAgICAgdHdlZW5lZDogMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBudW1iZXIobikge1xuICAgICAgZ3NhcC50byh0aGlzLCB7IGR1cmF0aW9uOiAwLjUsIHR3ZWVuZWQ6IE51bWJlcihuKSB8fCAwIH0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHTsiKvsnpAg7J6F66ClOiA8aW5wdXQgdi1tb2RlbC5udW1iZXI9XCJudW1iZXJcIiAvPlxuXHQ8cCBjbGFzcz1cImJpZy1udW1iZXJcIj57eyB0d2VlbmVkLnRvRml4ZWQoMCkgfX08L3A+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4uYmlnLW51bWJlciB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDJlbTtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwiZ3NhcFwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2dzYXA/bW9kdWxlXCIsXG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9",target:"_blank",rel:"noopener noreferrer"},"온라인 연습장으로 실행하기")])],-1),q='{"title":"애니메이션 기법","description":"","frontmatter":{},"headers":[{"level":2,"title":"클래스 기반 애니메이션","slug":"클래스-기반-애니메이션"},{"level":2,"title":"상태 기반 애니메이션","slug":"상태-기반-애니메이션"},{"level":2,"title":"감시자로 애니메이션 만들기","slug":"감시자로-애니메이션-만들기"}],"relativePath":"guide/extras/animation.md"}',_={},U=Object.assign(_,{setup:s=>(s,n)=>(t(),l("div",null,[N,d(Y),z,d(S),L,d(R),E,d(J),P,O]))});export{q as __pageData,U as default};
