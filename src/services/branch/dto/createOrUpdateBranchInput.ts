export interface CreateOrUpdateBranchInput {
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
  isActive: boolean;
  state: number;
  cityCityName: string;
  cityId: number|string|null;
  firmFirmName: string;
  firmId: number|string|null;
}
