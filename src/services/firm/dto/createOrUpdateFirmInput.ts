export interface CreateOrUpdateFirmInput {
  id: number;
  creationTime: Date;
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
  cityNameCityName: string;
  cityId: number|null;
  applicationTimeZonesCountryTimeZone: string;
  timeZone: number|null;
  packageId: number;
}
