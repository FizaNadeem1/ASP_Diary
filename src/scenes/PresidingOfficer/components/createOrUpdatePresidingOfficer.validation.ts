import { L } from '../../../lib/abpUtility';

const rules = {
  presidingOfficerName: [{ required: true, message: L('ThisFieldIsRequired') }],
  presidingOfficerNameNotes: [{ required: true, message: L('ThisFieldIsRequired') }],
  designationId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
