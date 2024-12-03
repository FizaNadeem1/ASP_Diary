import { Moment } from 'moment';

export interface GetAllCaseBenchOutput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  bStartDate: Moment;
  bEndDate: Moment;
  bNotes: string;
  caseBenchStatus: boolean;
  branchId: number;
  caseMainCaseMainNo: string;
  caseMainId: number;
  benchBenchCode: string;
  benchId: number;
}
