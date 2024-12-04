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
  branchId: number|string|null;
  branchBranchName: string;
  benchId: number;
  benchBenchCode: string;
  caseId: number|string|null;
  caseCaseNo: string;
  caseCaseTitle: string;
  proceedingStatusId: number|string|null;
  proceedingStatusProceedingName: string;
}
