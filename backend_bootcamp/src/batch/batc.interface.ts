import { Batch } from 'output/entities/Batch';

export class RoomI {
  data: Batch[];
  page: number;
  limit: number;
  totalCount: number;
}
