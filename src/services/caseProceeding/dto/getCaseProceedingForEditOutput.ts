import { Moment } from 'moment';

export interface GetCaseProceedingForEditOutput {
  editCaseProceeding: {
    id: number;
    creationTime: Moment;
    creatorUserId: number;
    lastModificationTime: Moment;
    lastModifierUserId: number;
    previousDate: Moment;
    currentDate: Moment;
    nexttDate: Moment;
    proceedingNotes: string;
    proceedingShortOrder: string;
    caseRunning: boolean;
    caseFinish: boolean;
    caseTransfer: boolean;
    caseGenNo: string;
    caseGaffNo: string;
    branchBranchName: string;
    branchId: number;
    benchBenchCode: string;
    benchId: number;
    caseCaseNo: string;
    caseId: number;
    proceedingStatusProceedingName: string;
    proceedingStatusId: number;
  };
  getCaseDataByCaseNo: {
    benchId: number;
    benchBenchCode: string;
    caseMainCaseTypeCaseTypeName: string;
    caseMainId: number;
    caseMainCaseNo: string;
    caseMainCourtCaseNo: string;
    caseMainFirstPartyName: string;
    caseMainSecondPartyName: string;
    caseMainCaseTitle: string;
    previousNextDate: Moment;
    new: boolean;
  };
}
