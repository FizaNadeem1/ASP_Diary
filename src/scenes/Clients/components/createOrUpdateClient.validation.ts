import { L } from '../../../lib/abpUtility';

const rules = {
  clientName:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientFatherName: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientHusbandName:[{ required: true, message: L('ThisFieldIsRequired') }],
  clientMobile:[{ required: true, message: L('ThisFieldIsRequired') },
    {
      pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
      message: 'Phone number must start with a valid country code and be in the correct format!',
    },
  ],
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
  clientFirmContactPerNo: [{ required: true, message: L('ThisFieldIsRequired') },{
    pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
    message: 'Phone number must start with a valid country code and be in the correct format!',
  },],
  clientFirmNTN:[{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
