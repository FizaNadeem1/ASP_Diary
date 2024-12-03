import { Moment } from 'moment';

export interface GetCaseRegistrationByIdOutput {
  caseMain: {
    id: number;
    creationTime: Moment;
    creatorUserId: number;
    lastModificationTime: Moment;
    lastModifierUserId: number;
    caseNo: string;
    courtCaseNo: string;
    courtCaseGenNo: string;
    courtCaseGaffNo: string;
    caseRegDate: Moment;
    caseStartDate: Moment;
    caseEndDate: Moment;
    caseTitle: string;
    firstLawyerName: string;
    secondLawyerName: string;
    firstPartyName: string;
    secondPartyName: string;
    caseNotes: string;
    casePleadings: string;
    caseStatus: boolean;
    caseShift: boolean;
    caseFinish: boolean;
    firNo: string;
    policeStation: string;
    offence: string;
    firDate: Moment;
    clientId: number;
    caseTypeId: number;
    firstLitigantTypeId: number;
    secLitigantTypeId: number;
    branchId: number;
  };
  caseBench: {
    id: number;
    creationTime: Moment;
    creatorUserId: number;
    lastModificationTime: Moment;
    lastModifierUserId: number;
    bStartDate: Moment;
    bEndDate: Moment;
    bNotes: string;
    caseBenchStatus: boolean;
    branchId: number;
    caseMainId: number;
    benchId: number;
  };
  caseLawyer: {
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
    caseMainId: number;
    lawyerId: number;
  };
}
