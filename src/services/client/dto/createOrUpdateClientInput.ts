import { Moment } from "moment";

export interface CreateOrUpdateClientInput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  clientCode: string;
  clientTypeName: string;
  clientName: string;
  clientFatherName: string;
  clientHusbandName: string;
  clientAdress: string;
  clientCNIC: string;
  clientMobile: string;
  clientGender: string;
  clientPhotoPath: string;
  clientDOB: Moment;
  clientRegDate: Moment;
  clientFirmCode: string;
  clientFirmNTN: string;
  clientFirmSTR: string;
  clientFirmContactPer: string;
  clientFirmContactPerNo: string;
  cityCityName: string;
  cityId: number|null;
  branchBranchName: string;
  branchId: number|null;
  clientTypeClientTypeName: string;
  clientTypeId: number|null;
}
