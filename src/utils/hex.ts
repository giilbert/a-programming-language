export function hex(
  strings: TemplateStringsArray,
  ...expressions: (string | number)[]
) {
  return strings
    .reduce((prev, curr, i) => {
      const e = expressions[i] || '';
      const q = typeof e === 'string' ? e : e.toString(16).padStart(2, '0');
      return prev + curr + q;
    }, '')
    .replace(/ /g, '');
}
