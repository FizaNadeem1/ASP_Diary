import { L } from '../../../lib/abpUtility';

const rules = {
  caseTypeName: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseTypeDesciption: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
