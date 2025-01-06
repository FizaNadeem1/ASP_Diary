import { L } from '../../../lib/abpUtility';

const rules = {
  firmName: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmOwner: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmContactEmail: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
  firmCode: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmContactNo: [{ required: true, message: L('ThisFieldIsRequired') },{
    pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
    message: 'Phone number must start with a valid country code and be in the correct format!',
  },],
  firmContactPerson: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmContactPersonNo: [{ required: true, message: L('ThisFieldIsRequired') },{
    pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
    message: 'Phone number must start with a valid country code and be in the correct format!',
  },],
  firmAdress: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmWesite: [{ required: true, message: L('ThisFieldIsRequired') }],
  cityId: [{ required: true, message: L('ThisFieldIsRequired') }],
  adminPanelAccess: [{ required: true, message: L('ThisFieldIsRequired') }],
  timeZone: [{ required: true, message: L('ThisFieldIsRequired') }],
  noOfBranches: [{ required: true, message: L('ThisFieldIsRequired') }],
  noOfCases: [{ required: true, message: L('ThisFieldIsRequired') }],
  noOfLawyers: [{ required: true, message: L('ThisFieldIsRequired') }],
  













};

export default rules;
