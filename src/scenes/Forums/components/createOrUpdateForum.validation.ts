import { L } from '../../../lib/abpUtility';

const rules = {
  forumName: [{ required: true, message: L('ThisFieldIsRequired') }],
  forumDescription: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
