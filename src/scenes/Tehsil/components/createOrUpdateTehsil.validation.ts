import { L } from '../../../lib/abpUtility';

const rules = {
  tehsilName: [{ required: true, message: L('ThisFieldIsRequired') }],
  cityId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
