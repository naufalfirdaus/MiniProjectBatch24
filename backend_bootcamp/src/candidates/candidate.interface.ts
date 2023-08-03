import { ProgramApply } from 'output/entities/ProgramApply';

export class RoomI {
  data: ProgramApply[];
  page: number;
  limit: number;
  totalCount: number;
}
