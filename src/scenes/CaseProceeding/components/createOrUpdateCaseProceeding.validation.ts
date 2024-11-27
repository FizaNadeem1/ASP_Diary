import { L } from '../../../lib/abpUtility';

const rules = {
  previousDate: [{ required: true, message: L('ThisFieldIsRequired') }],
  currentDate: [{ required: true, message: L('ThisFieldIsRequired') }],
  nexttDate: [{ required: true, message: L('ThisFieldIsRequired') }],
  proceedingNotes: [{ required: true, message: L('ThisFieldIsRequired') }],
  proceedingShortOrder: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseGenNo: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseGaffNo: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchId: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseId: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseno: [{ required: true, message: L('ThisFieldIsRequired') }],
  proceedingStatusId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
