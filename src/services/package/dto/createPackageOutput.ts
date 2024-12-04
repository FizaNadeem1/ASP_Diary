export interface CreatePackageOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  packageName: string;
  courtBench: string;
  clientRegister: string;
  lawyerRegister: string;
  caseRegister: string;
  proceedings: string;
  causeList: string;
  reporting: string;
  adminPanel: string;
  usersRegistration: string;
  rolesManage: string;
  firmRegistration: string;
  branchRegistration: string;
  whiteListing: string;
  price: string;
  exactPrice: string;
  isMonthly: boolean;
  details: string;
  sms: string;
  masking: string;
  excelPdfData: string;
  smsServiceCharges: string;
}

export interface CreatePackageOutput {
  result: CreatePackageOutputItem;
}
