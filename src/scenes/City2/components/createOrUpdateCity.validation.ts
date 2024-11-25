import { L } from '../../../lib/abpUtility';

const rules = {
  cityName: [{ required: true, message: L('ThisFieldIsRequired') }],
  divisionId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
