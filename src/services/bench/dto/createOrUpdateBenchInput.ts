import { Moment } from "moment";

export interface CreateOrUpdateBenchInput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  branchId: number|string|null;
  courtId: number|string|null;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Moment;
  benchEndDate: Moment;
  benchStatus: boolean;
  presidingOfficerId: number|string|null;
  officerList: [
    {
      presidingOfficerId: number|string|null;
      presidingOfficerName: string;
      branchId: number;
      branchName: string;
      benchMainId: number;
    }
  ];
  courtCourtCode: string;
  branchBranchName: string;
}
