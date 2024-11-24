import { L } from '../../../lib/abpUtility';

const rules = {
  branchContactPersonNo: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchContactPerson: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchContactEmail: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
  branchContactNo: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchAdress: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchOwner: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchName: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchCode: [{ required: true, message: L('ThisFieldIsRequired') }],
  isActive: [{ required: true, message: L('ThisFieldIsRequired') }],
  cityId: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
