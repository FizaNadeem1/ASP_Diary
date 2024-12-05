import { Moment } from "moment";

export interface CreateCaseProceedingInput {
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
  benchId: number|string;
  caseId: number|string;
  proceedingStatusId: number|string;
}
