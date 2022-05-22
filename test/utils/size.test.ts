import { half, quarter, word } from '../../src/utils/size';

test('pads shorter bytes into words', () => {
  expect(word('0a')).toBe('0a00000000000000');
  expect(half('0a')).toBe('0a000000');
  expect(quarter('0a')).toBe('0a00');

  expect(quarter('cd')).toBe('cd00');
});
