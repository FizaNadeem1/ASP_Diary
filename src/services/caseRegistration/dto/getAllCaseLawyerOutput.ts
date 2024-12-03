import { Moment } from 'moment';

export interface GetAllCaseLawyerOutput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  lStartDate: Moment;
  lEndDate: Moment;
  lNotes: string;
  caseLawyerStatus: boolean;
  branchId: number;
  caseMainCaseMainNo: string;
  caseMainId: number;
  lawyerLawyerName: string;
  lawyerId: number;
}
