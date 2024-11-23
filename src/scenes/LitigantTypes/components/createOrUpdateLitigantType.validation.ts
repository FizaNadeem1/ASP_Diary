import { L } from '../../../lib/abpUtility';

const rules = {
  litigantTypeName: [{ required: true, message: L('ThisFieldIsRequired') }],
  litigantTypeDesciption: [{ required: true, message: L('ThisFieldIsRequired') }],
  status: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
