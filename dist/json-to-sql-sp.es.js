const i = (n, o = "", s = {}) => {
  for (let e in n) {
    const t = o ? `${o}_${e}` : e;
    if (Array.isArray(n[e])) {
      const c = f(n[e]);
      c && (s[t] = c);
    } else typeof n[e] == "object" && n[e] !== null ? i(n[e], t, s) : s[t] = n[e] === "1" ? !0 : n[e] === "0" ? !1 : n[e];
  }
  return s;
}, f = (n) => n.every((o) => typeof o == "string") ? n.join("_") : null, j = (n, o, s = "", e) => {
  const t = y(s), c = i(o), d = Object.keys(c);
  let l = `CREATE PROCEDURE [dbo].[${n}]
`;
  if (t) {
    const r = Object.keys(t);
    r.forEach((a, u) => {
      l += u === r.length - 1 ? `	@${a} ${t[a]}
` : `	@${a} ${t[a]},
`;
    });
  }
  return l += `AS
BEGIN
`, d.forEach((r) => {
    l += `	${p(c[r]) ? "N" : ""}${typeof c[r] == "boolean" ? c[r] : "json[value]"} ${r}
`;
  }), l += `END
`, b(l, e), l;
}, p = (n) => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(
  n
), y = (n) => n.split(";").map((e) => e.trim()).reduce((e, t) => {
  const [c, d] = t.split(":");
  return e[c] = d, e;
}, {}), b = (n, o) => {
  const s = new Blob([n], { type: "text/plain" }), e = document.createElement("a");
  e.href = URL.createObjectURL(s), e.download = o, e.click();
};
export {
  j as downloadFormattedTxtFile
};
