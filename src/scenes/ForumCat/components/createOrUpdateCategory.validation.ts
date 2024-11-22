import { L } from '../../../lib/abpUtility';

const rules = {
  forumCategoryName: [{ required: true, message: L('ThisFieldIsRequired') }],
  forumId: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
