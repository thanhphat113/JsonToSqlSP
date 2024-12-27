(function(l,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(l=typeof globalThis<"u"?globalThis:l||self,i(l.JsonToSqlSP={}))})(this,function(l){"use strict";const i=(t,s="",c={})=>{for(let e in t){const n=s?`${s}_${e}`:e;if(Array.isArray(t[e])){const o=a(t[e]);o&&(c[n]=o)}else typeof t[e]=="object"&&t[e]!==null?i(t[e],n,c):c[n]=t[e]==="1"?!0:t[e]==="0"?!1:t[e]}return c},a=t=>t.every(s=>typeof s=="string")?t.join("_"):null,p=(t,s,c="",e)=>{const n=b(c),o=i(s),u=Object.keys(o);let d=`CREATE PROCEDURE [dbo].[${t}]
`;if(n){const r=Object.keys(n);r.forEach((f,$)=>{d+=$===r.length-1?`	@${f} ${n[f]}
`:`	@${f} ${n[f]},
`})}return d+=`AS
BEGIN
`,u.forEach(r=>{d+=`	${y(o[r])?"N":""}${typeof o[r]=="boolean"?o[r]:`'${o[r]}'`} ${r}
`}),d+=`END
`,j(d,e),d},y=t=>/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(t),b=t=>t.split(";").map(e=>e.trim()).reduce((e,n)=>{const[o,u]=n.split(":");return e[o]=u,e},{}),j=(t,s)=>{const c=new Blob([t],{type:"text/plain"}),e=document.createElement("a");e.href=URL.createObjectURL(c),e.download=s,e.click()};l.downloadFormattedTxtFile=p,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
