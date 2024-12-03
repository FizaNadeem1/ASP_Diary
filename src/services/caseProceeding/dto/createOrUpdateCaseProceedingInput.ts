import { Moment } from "moment";

export interface CreateOrUpdateCaseProceedingInput {
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
  branchId: number|null;
  branchBranchName: string;
  benchId: number;
  benchBenchCode: string;
  caseId: number|null;
  caseCaseNo: string;
  caseCaseTitle: string;
  proceedingStatusId: number|null;
  proceedingStatusProceedingName: string;
}
