import { L } from '../../../lib/abpUtility';

const rules = {
  branchId: [{ required: true, message: L('ThisFieldIsRequired') }],
benchCode: [{ required: true, message: L('ThisFieldIsRequired') }],
courtId: [{ required: true, message: L('ThisFieldIsRequired') }],
benchOfficerNo: [{ required: true, message: L('ThisFieldIsRequired') }],
benchStartDate: [{ required: true, message: L('ThisFieldIsRequired') }],
benchEndDate: [{ required: true, message: L('ThisFieldIsRequired') }],
presidingOfficerId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
