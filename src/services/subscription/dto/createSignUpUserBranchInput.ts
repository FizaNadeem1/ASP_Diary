import { Moment } from 'moment';

export interface CreateSignUpUserBranchInput {
  branchName: string;
  branchOwner: string;
  branchCode: string;
  branchContactNo: string;
  branchContactEmail: string;
  branchContactPerson: string;
  branchContactPersonNo: string;
  branchAdress: string;
  creationTime: Moment;
  isActive: true;
  username: string;
  cityName: string;
  cityId: number;
  firmName: string;
  firmId: number;
  tenantId: number;
}
