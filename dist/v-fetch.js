!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("v-fetch",[],t):"object"==typeof exports?exports["v-fetch"]=t():e["v-fetch"]=t()}(self,(function(){return(()=>{"use strict";var e={85:(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});const n={getEventType:(e,t)=>"eventType"in t.value?t.value.eventType:"FORM"===e.nodeName?"submit":"click",getUrl:(e,t)=>"url"in t.value?t.value.url:"FORM"===e.nodeName&&e.getAttribute("action")?e.getAttribute("action"):"A"===e.nodeName&&e.getAttribute("href")?e.getAttribute("href"):void 0,getMethod:(e,t)=>~["get","post","put","patch","delete"].indexOf(t.arg)?t.arg:"method"in t.value?t.value.method:e.getAttribute("method")?e.getAttribute("method"):void 0,getModel(e){if("model"in e.value)return e.value.model}},r=function(e={}){return{bind(e,t,o){let r=n.getModel(t),i=n.getUrl(e,t),u=n.getMethod(e,t),d=n.getEventType(e,t);!function(){let t={model:r,url:i,method:u,eventType:d};o.context.$emit("v-fetch:start",t),e.addEventListener(d,(function(e){fetch(i,{method:u}).then((e=>e.json())).then((function(e){r&&(o.context[r]=e),o.context.$emit("v-fetch:complete",t)})).catch((e=>{throw e}))}))}()}}},i={install(e,t={}){e.directive("fetch",r(t))},directive:r(),helpers:n}}},t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}return o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(85)})()}));