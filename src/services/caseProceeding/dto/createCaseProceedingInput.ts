export interface CreateCaseProceedingInput {
  previousDate: Date;
  currentDate: Date;
  nexttDate: Date;
  previousNextDate: Date;
  proceedingNotes: string;
  proceedingShortOrder: string;
  caseRunning: boolean;
  caseFinish: boolean;
  caseTransfer: boolean;
  caseGenNo: string;
  caseGaffNo: string;
  branchId: number;
  benchId: number;
  caseId: number;
  proceedingStatusId: number;
}
