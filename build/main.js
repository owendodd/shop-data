var u=Object.defineProperty,G=Object.defineProperties,V=Object.getOwnPropertyDescriptor,W=Object.getOwnPropertyDescriptors,X=Object.getOwnPropertyNames,N=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var h=(e,o,t)=>o in e?u(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,C=(e,o)=>{for(var t in o||(o={}))A.call(o,t)&&h(e,t,o[t]);if(N)for(var t of N(o))K.call(o,t)&&h(e,t,o[t]);return e},b=(e,o)=>G(e,W(o));var a=(e,o)=>()=>(e&&(o=e(e=0)),o);var z=(e,o)=>{for(var t in o)u(e,t,{get:o[t],enumerable:!0})},q=(e,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of X(o))!A.call(e,n)&&n!==t&&u(e,n,{get:()=>o[n],enumerable:!(r=V(o,n))||r.enumerable});return e};var J=e=>q(u({},"__esModule",{value:!0}),e);function d(e,o){let t=`${P}`;return P+=1,m[t]={handler:o,name:e},function(){delete m[t]}}function x(e,o){let t=!1;return d(e,function(...r){t!==!0&&(t=!0,o(...r))})}function I(e,o){for(let t in m)m[t].name===e&&m[t].handler.apply(null,o)}var m,P,S=a(()=>{m={},P=0;typeof window=="undefined"?figma.ui.onmessage=function([e,...o]){I(e,o)}:window.onmessage=function(e){if(typeof e.data.pluginMessage=="undefined")return;let[o,...t]=e.data.pluginMessage;I(o,t)}});function l(e){return{x:e.absoluteTransform[0][2],y:e.absoluteTransform[1][2]}}var _=a(()=>{});function c(e,o,t){if(e.removed!==!0){if("children"in e&&(typeof t!="function"||t(e)===!1))for(let r of e.children)c(r,o,t);o(e)}}var T=a(()=>{});async function g(e){let o={};for(let t of e)switch(t.type){case"CONNECTOR":case"SHAPE_WITH_TEXT":case"STICKY":{E(t.text,o);break}case"TEXT":{E(t,o);break}}await Promise.all(Object.values(o).map(function(t){return figma.loadFontAsync(t)}))}function E(e,o){let t=e.characters.length;if(t===0){let n=e.fontName,s=w(n);if(s in o)return;o[s]=n;return}let r=-1;for(;++r<t;){let n=e.getRangeFontName(r,r+1),s=w(n);s in o||(o[s]=n)}}function w(e){return`${e.family}-${e.style}`}var M=a(()=>{});function y(e,o){if(typeof __html__=="undefined")throw new Error("No UI defined");let t=`<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command=="undefined"?"":figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof o=="undefined"?{}:o)};${__html__}</script>`;figma.showUI(t,b(C({},e),{themeColors:typeof e.themeColors=="undefined"?!0:e.themeColors}))}var v=a(()=>{});var i=a(()=>{S();_();M();T();v()});async function B(e,o,t){let r=[];return c(e,async n=>{if(n.type==="TEXT"){await g([n]);let s=o.product[t][n.name];n.characters=s,r.push(n)}}),r}var U=a(()=>{"use strict";i()});function D(e,o){if(e[0].parent===null)throw new Error("Node has no parent");let r=o==="x"?"y":"x";return e.slice().sort(function(s,$){let p=l(s),f=l($);return p[o]!==f[o]?p[o]-f[o]:p[r]!==f[r]?p[r]-f[r]:0})}var O=a(()=>{"use strict";i()});function F(){let e=[],o=figma.currentPage.selection.slice();for(let t of o)c(t,function(r){r.name&&r.name==="product"&&e.push(r)});return e.length===0?[]:D(e,"y")}var H=a(()=>{"use strict";i();O()});var j,L=a(()=>{"use strict";j={product:[{productName:"iPhone 13 Pro Max",merchantName:"Apple",productPrice:"1099",productImage:"https://cdn.pixabay.com/photo/2021/09/15/09/27/iphone-13-6627666_1280.jpg"},{productName:"Samsung Galaxy S21 Ultra",merchantName:"Samsung",productPrice:"1199",productImage:"https://cdn.pixabay.com/photo/2021/02/01/20/09/samsung-galaxy-s21-ultra-5977682_1280.jpg"},{productName:"Sony PlayStation 5",merchantName:"Best Buy",productPrice:"499",productImage:"https://cdn.pixabay.com/photo/2021/01/22/16/31/playstation-5-5949772_1280.jpg"},{productName:"Bose QuietComfort 35 II",merchantName:"Amazon",productPrice:"299",productImage:"https://cdn.pixabay.com/photo/2018/05/31/16/06/bose-3445097_1280.jpg"},{productName:"Nintendo Switch",merchantName:"Walmart",productPrice:"299",productImage:"https://cdn.pixabay.com/photo/2020/04/08/18/51/nintendo-switch-5027586_1280.jpg"},{productName:"LG OLED TV",merchantName:"Costco",productPrice:"1499",productImage:"https://cdn.pixabay.com/photo/2021/06/08/18/17/lg-oled-tv-6323071_1280.jpg"}]}});var R={};z(R,{default:()=>Q});function Q(){d("CREATE_POPULATE_DATA",async function(){F().forEach(async(o,t)=>{await B(o,j,t)}),figma.closePlugin()}),x("CLOSE",function(){figma.closePlugin()}),y({height:165,width:240})}var k=a(()=>{"use strict";i();U();H();L()});var Y={"src/main.ts--default":(k(),J(R)).default},Z="src/main.ts--default";Y[Z]();
