const a = (n, s = "", c = {}) => {
  for (let t in n) {
    const e = s ? `${s}_${t}` : t;
    if (Array.isArray(n[t])) {
      const o = p(n[t]);
      o && (c[e] = o);
    } else typeof n[t] == "object" && n[t] !== null ? a(n[t], e, c) : c[e] = n[t] === "1" ? !0 : n[t] === "0" ? !1 : n[t];
  }
  return c;
}, p = (n) => n.every((s) => typeof s == "string") ? n.join("_") : null, b = (n, s, c = "", t) => {
  const e = y(c), o = a(s), i = Object.keys(o);
  let l = `CREATE PROCEDURE [dbo].[${n}]
`;
  if (e) {
    const r = Object.keys(e);
    r.forEach((d, f) => {
      l += f === r.length - 1 ? `	@${d} ${e[d]}
` : `	@${d} ${e[d]},
`;
    });
  }
  return l += `AS
BEGIN
`, i.forEach((r) => {
    l += `	${u(o[r]) ? "N" : ""}${typeof o[r] == "boolean" ? o[r] : `'${o[r]}'`} ${r}
`;
  }), l += `END
`, $(l, t), l;
}, u = (n) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(
  n
), y = (n) => n.split(";").map((t) => t.trim()).reduce((t, e) => {
  const [o, i] = e.split(":");
  return t[o] = i, t;
}, {}), $ = (n, s) => {
  const c = new Blob([n], { type: "text/plain" }), t = document.createElement("a");
  t.href = URL.createObjectURL(c), t.download = s, t.click();
};
export {
  b as downloadFormattedTxtFile
};
