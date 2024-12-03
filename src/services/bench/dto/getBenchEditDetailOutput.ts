import { Moment } from 'moment';

export interface GetBenchEditDetailOutput {
  benchMainDetailEdit: {
    id: number;
    creationTime: Moment;
    creatorUserId: number;
    lastModificationTime: Moment;
    lastModifierUserId: number;
    benchCode: string;
    benchOfficerNo: number;
    benchStatus: boolean;
    benchStartDate: Moment;
    benchEndDate: Moment;
    courtCourtCode: string;
    courtId: number;
    branchBranchCode: string;
    branchId: number;
  };
  listOfBenchDetailsDto: [
    {
      id: number;
      creationTime: Moment;
      creatorUserId: number;
      lastModificationTime: Moment;
      lastModifierUserId: number;
      presidingOfficerId: number;
      presidingOfficerName: string;
      branchId: number;
      branchName: string;
      benchMainId: string;
    }
  ];
}
