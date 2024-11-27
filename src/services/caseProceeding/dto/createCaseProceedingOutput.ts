export interface CreateCaseProceedingOutputItem {
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

export interface CreateCaseProceedingOutput {
  result: CreateCaseProceedingOutputItem;
}
