import { writeFile } from 'fs/promises';
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
  ePHEntSize: 0x20,
  ePHNum: 1,
  eSHEntSize: 0x28,
  eSHNum: 4,
  eSHStrNdx: 3,
});

writeFile('test.txt', header);
