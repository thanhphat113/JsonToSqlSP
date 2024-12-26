(function(r,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(r=typeof globalThis<"u"?globalThis:r||self,l(r.JsonToSqlSP={}))})(this,function(r){"use strict";const l=(t,o="",s={})=>{for(let e in t){const n=o?`${o}_${e}`:e;if(Array.isArray(t[e])){const c=a(t[e]);c&&(s[n]=c)}else typeof t[e]=="object"&&t[e]!==null?l(t[e],n,s):s[n]=t[e]==="1"?!0:t[e]==="0"?!1:t[e]}return s},a=t=>t.every(o=>typeof o=="string")?t.join("_"):null,p=(t,o,s="",e)=>{const n=b(s),c=l(o),u=Object.keys(c);let i=`CREATE PROCEDURE [dbo].[${t}]
`;if(n){const d=Object.keys(n);d.forEach((f,$)=>{i+=$===d.length-1?`	@${f} ${n[f]}
`:`	@${f} ${n[f]},
`})}return i+=`AS
BEGIN
`,u.forEach(d=>{i+=`	${y(c[d])?"N":""}'${c[d]}' ${d}
`}),i+=`END
`,j(i,e),i},y=t=>/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(t),b=t=>t.split(";").map(e=>e.trim()).reduce((e,n)=>{const[c,u]=n.split(":");return e[c]=u,e},{}),j=(t,o)=>{const s=new Blob([t],{type:"text/plain"}),e=document.createElement("a");e.href=URL.createObjectURL(s),e.download=o,e.click()};r.downloadFormattedTxtFile=p,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
