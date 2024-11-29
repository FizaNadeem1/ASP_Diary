export interface CreateCaseRegistrationOutputItem {
  id: number;
  creationTime: '2number24-11-27Tnumber7:number5:43.133Z';
  creatorUserId: number;
  lastModificationTime: '2number24-11-27Tnumber7:number5:43.133Z';
  lastModifierUserId: number;
  caseNo: string;
  courtCaseNo: string;
  courtCaseGenNo: string;
  courtCaseGaffNo: string;
  caseRegDate: Date;
  caseStartDate: Date;
  caseEndDate: Date;
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
  firDate: Date;
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
  bStartDate: Date;
  bEndDate: Date;
  bNotes: string;
  caseBenchStatus: boolean;
  caseMain: string;
  caseMainId: number;
  bench: string;
  benchId: number;
  lStartDate: Date;
  lEndDate: Date;
  lNotes: string;
  caseLawyerStatus: boolean;
  lawyer: string;
  lawyerId: number;
}

export interface CreateCaseRegistrationOutput {
  result: CreateCaseRegistrationOutputItem;
}
