const a = (e, o = "", s = {}) => {
  for (let t in e) {
    const n = o ? `${o}_${t}` : t;
    if (Array.isArray(e[t])) {
      const c = f(e[t]);
      c && (s[n] = c);
    } else typeof e[t] == "object" && e[t] !== null ? a(e[t], n, s) : s[n] = e[t] === "1" ? !0 : e[t] === "0" ? !1 : e[t];
  }
  return s;
}, f = (e) => e.every((o) => typeof o == "string") ? e.join("_") : null, b = (e, o, s = "", t) => {
  const n = y(s), c = a(o), i = Object.keys(c);
  let r = `CREATE PROCEDURE [dbo].[${e}]
`;
  if (n) {
    const l = Object.keys(n);
    l.forEach((d, u) => {
      r += u === l.length - 1 ? `	@${d} ${n[d]}
` : `	@${d} ${n[d]},
`;
    });
  }
  return r += `AS
BEGIN
`, i.forEach((l) => {
    r += `	${p(c[l]) ? "N" : ""}'${c[l]}' ${l}
`;
  }), r += `END
`, $(r, t), r;
}, p = (e) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(
  e
), y = (e) => e.split(";").map((t) => t.trim()).reduce((t, n) => {
  const [c, i] = n.split(":");
  return t[c] = i, t;
}, {}), $ = (e, o) => {
  const s = new Blob([e], { type: "text/plain" }), t = document.createElement("a");
  t.href = URL.createObjectURL(s), t.download = o, t.click();
};
export {
  b as downloadFormattedTxtFile
};
