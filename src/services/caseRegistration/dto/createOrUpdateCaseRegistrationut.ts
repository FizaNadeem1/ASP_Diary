import { Moment } from "moment";

export interface CreateOrUpdateCaseRegistrationInput {
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
  clientClientName: string;
  clientId: number|string|null;
  caseTypeCaseTypeName: string;
  caseTypeId: number|string|null;
  litigantType1LitigantTypeName: string;
  firstLitigantTypeId: number|string|null;
  litigantType2LitigantTypeName: string;
  secLitigantTypeId: number|string|null;
  branchBranchName: string;
  branchId: number|string|null;
  bStartDate: Moment;
  bEndDate: Moment;
  bNotes: string;
  caseBenchStatus: boolean;
  caseMain: string;
  caseMainId: number|string|null;
  bench: string;
  benchId: number|string|null;
  lStartDate: Moment;
  lEndDate: Moment;
  lNotes: string;
  caseLawyerStatus: boolean;
  lawyer: string;
  lawyerId: number|string|null;
}
