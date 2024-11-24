export interface CreateBranchOutputItem {
  id: number;
  creationTime: Date;
  branchName: string;
  branchOwner: string;
  branchCode: string;
  branchContactNo: string;
  branchContactEmail: string;
  branchContactPerson: string;
  branchContactPersonNo: string;
  branchAdress: string;
  isActive: true;
  state: number;
  cityCityName: string;
  cityId: number;
  firmFirmName: string;
  firmId: number;
}

export interface CreateBranchOutput {
  result: CreateBranchOutputItem;
}
