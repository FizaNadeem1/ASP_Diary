import { Moment } from 'moment';

export interface CreateSignUpUserFirmInput {
  trialEndTime: Moment;
  firmName: string;
  firmOwner: string;
  firmCode: string;
  firmContactNo: string;
  firmContactEmail: string;
  firmContactPerson: string|null;
  firmContactPersonNo: string|null;
  firmAdress: string;
  firmWesite: string;
  noOfBranches: number;
  adminPanelAccess: boolean;
  noOfCases: number;
  noOfLawyers: number;
  username: string;
  cityName: string|null;
  cityId: number|null;
  userId: number;
  packageId: number;
  timeZone: number;
  tenantId: number;
}
