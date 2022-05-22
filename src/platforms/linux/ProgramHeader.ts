import { hex } from '@utils/hex';
import { half, word } from '@utils/size';

interface ProgramHeaderData {
  type: number;
  flags: number;
  offset: string;
  vAddress: string;
  pAddress: string;
  fileSize: number;
  memSize: number;
  align: string;
}

class ProgramHeader {
  data: ProgramHeaderData;

  constructor(data: ProgramHeaderData) {
    this.data = data;
  }

  toBytes() {
    const h = this.data;

    return Buffer.from(
      hex`${half(hex`${h.type}`)!} ${half(hex`${'000000000401000'}`)!} ${word(
        '00'
      )!} ${word(hex`${h.vAddress}`)!} ${word(hex`${h.pAddress}`)!} ${word(
        hex`90`
      )!} ${word(hex`90`)!} ${word(hex`00`)!}`,
      'hex'
    );
  }
}

export type { ProgramHeaderData };
export default ProgramHeader;
