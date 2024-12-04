export interface CreateOrUpdateBenchInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  branchId: number|string|null;
  courtId: number|string|null;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Date;
  benchEndDate: Date;
  benchStatus: true;
  presidingOfficerId: number|string|null;
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
