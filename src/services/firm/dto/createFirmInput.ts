export interface CreateFirmInput {
  trialEndTime: Date;
  firmName: string;
  firmOwner: string;
  firmCode: string;
  firmContactNo: string;
  firmContactEmail: string;
  firmContactPerson: string;
  firmContactPersonNo: string;
  firmAdress: string;
  firmWesite: string;
  noOfBranches: number;
  adminPanelAccess: true;
  noOfCases: number;
  noOfLawyers: number;
  username: string;
  cityName: string;
  cityId: number;
  userId: number;
  packageId: number;
  timeZone: number;
  tenantId: number;
}
