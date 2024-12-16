import { Moment } from "moment";

export interface UpdateBenchInput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  branchId: number|string;
  courtId: number|string;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Moment;
  benchEndDate: Moment;
  benchStatus: true;
  presidingOfficerId: number|string;
  officerList: [
    {
      presidingOfficerId: number;
      presidingOfficerName: string;
      branchId: number;
      branchName: string;
      benchMainId: number;
    }
  ];
  courtCourtCode: string;
  branchBranchName: string;
}
