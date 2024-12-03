import { Moment } from "moment";

export interface CreateCaseRegistrationOutputItem {
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
  caseEndDate:Moment;
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
  clientClientName: string;
  clientId: number;
  caseTypeCaseTypeName: string;
  caseTypeId: number;
  litigantType1LitigantTypeName: string;
  firstLitigantTypeId: number;
  litigantType2LitigantTypeName: string;
  secLitigantTypeId: number;
  branchBranchName: string;
  branchId: number;
  bStartDate: Moment;
  bEndDate: Moment;
  bNotes: string;
  caseBenchStatus: boolean;
  caseMain: string;
  caseMainId: number;
  bench: string;
  benchId: number;
  lStartDate: Moment;
  lEndDate: Moment;
  lNotes: string;
  caseLawyerStatus: boolean;
  lawyer: string;
  lawyerId: number;
}

export interface CreateCaseRegistrationOutput {
  result: CreateCaseRegistrationOutputItem;
}
