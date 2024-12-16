import { Moment } from "moment";

export interface UpdateBenchOutput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  branchId: number;
  courtId: number;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Moment;
  benchEndDate: Moment;
  benchStatus: boolean;
  presidingOfficerId: number;
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
