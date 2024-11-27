export interface CreateClientInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
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
  clientDOB: Date;
  clientRegDate: Date;
  clientFirmCode: string;
  clientFirmNTN: string;
  clientFirmSTR: string;
  clientFirmContactPer: string;
  clientFirmContactPerNo: string;
  cityId: number;
  branchId: number;
  clientTypeId: number;
}
