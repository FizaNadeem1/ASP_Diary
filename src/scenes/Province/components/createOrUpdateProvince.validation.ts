import { L } from '../../../lib/abpUtility';

const rules = {
  provinceName: [{ required: true, message: L('ThisFieldIsRequired') }],
  provinceDescription: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
