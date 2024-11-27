import { L } from '../../../lib/abpUtility';

const rules = {
  divisionName: [{ required: true, message: L('ThisFieldIsRequired') }],
  divisionDescription: [{ required: true, message: L('ThisFieldIsRequired') }],
  provinceId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
