import { hex } from '@utils/hex';
import { half, quarter, word } from '@utils/size';

interface ELFHeader {
  // identification
  eiClass: IdentClass;
  eiData: IdentEndianess;
  eiVersion?: 1;
  eiOSABI: IdentOSABI;
  eiABIVersion?: 0;

  eType: Type;
  eMachine: number;
  eVersion?: 1;
  eEntry: number;
  ePHOffset: number;
  eSHOffset: number;
  eFlags: number;
  eEhSize: number;
  ePHEntSize: number;
  ePHNum: number;
  eSHEntSize: number;
  eSHNum: number;
  eSHStrNdx: number;
}

// .ELF
const MAGIC = hex`7f 45 4c 46`;
// in characters
const HEADER_SIZE = 16 * 2;

export function createHeader(h: ELFHeader) {
  const ident = hex`${MAGIC} ${h.eiClass} ${h.eiData} ${h.eiVersion || 1} ${
    h.eiOSABI
  } ${h.eiABIVersion || 0}`.padEnd(HEADER_SIZE, '00');

  const row2 = hex`${quarter(hex`${h.eType}`)!} ${quarter(
    hex`${h.eMachine}`
  )!} ${half(hex`${h.eVersion!}`)!} ${word(
    hex`${h.eEntry}`.padStart(8, '0')
  )!} ${word(hex`${h.ePHOffset}`)!}`;

  const row3 = hex`${word(hex`00`)!} ${half('00')!} ${quarter(
    hex`${h.eEhSize}`
  )!} ${quarter(hex`${h.ePHEntSize}`)!} ${quarter(hex`${h.ePHNum}`)!} ${quarter(
    hex`${'00'}`
  )!}`;

  const row4 = hex`${quarter(hex`${h.eSHNum}`)!} ${quarter(
    hex`${h.eSHStrNdx}`
  )!}`;

  const header = hex`${ident}${row2}${row3}${row4}`;
  const buffer = Buffer.from(header, 'hex');

  return buffer;
}

enum IdentClass {
  // X32 = 1,
  X64 = 2,
}

enum IdentEndianess {
  Little = 1,
  Big = 2,
}

enum IdentOSABI {
  SystemV,
  HPUX,
  NetBSD,
  Linux,
  GNUHurd,
  Solaris,
  AIX,
  IRIX,
  FreeBSD,
  Tru64,
  NovellModesto,
  OpenBSD,
  OpenVMS,
  NonStopKernal,
  AROS,
  FenixOS,
  NuxiCloudABI,
  StratusTechnologiesOpenVOS,
}

enum Type {
  ETNone,
  ETRel,
  ETExec,
  ETDyn,
  ETCore,
  // more ...
}

export { ELFHeader, IdentClass, IdentEndianess, IdentOSABI, Type };
