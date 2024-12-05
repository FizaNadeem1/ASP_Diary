import { Moment } from "moment";

export interface UpdateCaseProceedingOutput {
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
  branchId: number|string;
  branchBranchName: string;
  benchId: number|string;
  benchBenchCode: string;
  caseId: number|string;
  caseCaseNo: string;
  caseCaseTitle: string;
  proceedingStatusId: number|string;
  proceedingStatusProceedingName: string;
}
