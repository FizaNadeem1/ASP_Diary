import { L } from '../../../lib/abpUtility';

const rules = {
  designationName: [{ required: true, message: L('ThisFieldIsRequired') }],
  designationNotes: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
