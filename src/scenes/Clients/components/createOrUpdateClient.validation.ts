import { L } from '../../../lib/abpUtility';

const rules = {
  clientName:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientFatherName: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientHusbandName:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientMobile:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientCNIC: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientAdress:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientFirmContactPer:[{ required: true, message: L('ThisFieldIsRequired') }],
  cityId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  clientGender: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientTypeId:[{ required: true, message: L('ThisFieldIsRequired') }],
  branchId: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientFirmSTR: [{ required: true, message: L('ThisFieldIsRequired') }],
  // clientPhotoPath: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientRegDate: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientFirmCode: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientFirmContactPerNo: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientFirmNTN:[{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
