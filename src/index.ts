import ProgramHeader from '@platforms/linux/ProgramHeader';
import { half } from '@utils/size';
import { open, writeFile } from 'fs/promises';
import {
  createHeader,
  IdentClass,
  IdentEndianess,
  IdentOSABI,
  Type,
} from './platforms/linux/elfHeader';

const header = createHeader({
  eiClass: IdentClass.X64,
  eiOSABI: IdentOSABI.SystemV,
  eiData: IdentEndianess.Little,
  eType: Type.ETExec,
  eMachine: 0x03,
  eVersion: 1,
  eEntry: 0x8000060,
  ePHOffset: 0x40,
  eSHOffset: 0xb0,
  eFlags: 0,
  eEhSize: 0x34,
  ePHEntSize: 0x38,
  ePHNum: 1,
  eSHEntSize: 0x40,
  eSHNum: 4,
  eSHStrNdx: 3,
});

const programHeader = new ProgramHeader({
  type: 0x00000001,
  flags: 0,
  offset: '0',
  vAddress: '08000000',
  pAddress: '08000000',
  fileSize: 0x90,
  memSize: 0x90,
  align: '0',
}).toBytes();

async function run() {
  const buffer = Buffer.concat([header, programHeader]);

  writeFile('test.txt', buffer);
}
