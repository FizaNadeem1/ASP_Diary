export interface UpdateBenchInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  branchId: number|string;
  courtId: number|string;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Date;
  benchEndDate: Date;
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
