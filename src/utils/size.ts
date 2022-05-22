const twoLettersRegex = /.{2}/g;

// 2 hex letters
const BYTES = 2;

// 8 bytes on x64
function word(hex: string) {
  return hex
    .match(twoLettersRegex)
    ?.reverse()
    .join('')
    .padEnd(8 * BYTES, '00');
}

// 4 bytes on x64
function half(hex: string) {
  return hex
    .match(twoLettersRegex)
    ?.reverse()
    .join('')
    .padEnd(4 * BYTES, '00');
}

// 2 bytes
function quarter(hex: string) {
  return hex
    .match(twoLettersRegex)
    ?.reverse()
    .join('')
    .padEnd(2 * BYTES, '00');
}

export { word, half, quarter };
