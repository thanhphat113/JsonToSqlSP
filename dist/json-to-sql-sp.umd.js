(function(r,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(r=typeof globalThis<"u"?globalThis:r||self,i(r.JsonToSqlSP={}))})(this,function(r){"use strict";const i=(n,o="",s={})=>{for(let e in n){const t=o?`${o}_${e}`:e;if(Array.isArray(n[e])){const c=a(n[e]);c&&(s[t]=c)}else typeof n[e]=="object"&&n[e]!==null?i(n[e],t,s):s[t]=n[e]==="1"?!0:n[e]==="0"?!1:n[e]}return s},a=n=>n.every(o=>typeof o=="string")?n.join("_"):null,p=(n,o,s="",e)=>{const t=b(s),c=i(o),u=Object.keys(c);let d=`CREATE PROCEDURE [dbo].[${n}]
`;if(t){const l=Object.keys(t);l.forEach((f,$)=>{d+=$===l.length-1?`	@${f} ${t[f]}
`:`	@${f} ${t[f]},
`})}return d+=`AS
BEGIN
`,u.forEach(l=>{d+=`	${y(c[l])?"N":""}${typeof c[l]=="boolean"?c[l]:"json[value]"} ${l}
`}),d+=`END
`,j(d,e),d},y=n=>/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(n),b=n=>n.split(";").map(e=>e.trim()).reduce((e,t)=>{const[c,u]=t.split(":");return e[c]=u,e},{}),j=(n,o)=>{const s=new Blob([n],{type:"text/plain"}),e=document.createElement("a");e.href=URL.createObjectURL(s),e.download=o,e.click()};r.downloadFormattedTxtFile=p,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
