import { Moment } from "moment";

export interface GetAllCaseProceedingOutput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  previousDate: Moment;
  currentDate: Moment;
  nexttDate: Moment;
  previousNextDate: Moment;
  proceedingNotes: string;
  proceedingShortOrder: string;
  caseRunning: boolean;
  caseFinish: boolean;
  caseTransfer: boolean;
  caseGenNo: string;
  caseGaffNo: string;
  branchId: number;
  branchBranchName: string;
  benchId: number;
  benchBenchCode: string;
  caseId: number;
  caseCaseNo: string;
  caseCaseTitle: string;
  proceedingStatusId: number;
  proceedingStatusProceedingName: string;
}
