export interface UpdateCaseProceedingOutput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
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
  branchId: number|string;
  branchBranchName: string;
  benchId: number;
  benchBenchCode: string;
  caseId: number|string;
  caseCaseNo: string;
  caseCaseTitle: string;
  proceedingStatusId: number|string;
  proceedingStatusProceedingName: string;
}
