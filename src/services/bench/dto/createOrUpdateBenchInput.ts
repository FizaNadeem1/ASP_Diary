export interface CreateOrUpdateBenchInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  branchId: number|null;
  courtId: number|null;
  benchCode: string;
  benchOfficerNo: number;
  benchStartDate: Date;
  benchEndDate: Date;
  benchStatus: true;
  presidingOfficerId: number|null;
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
