import { L } from '../../../lib/abpUtility';

const rules = {
  courtCode: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtDescription:[{ required: true, message: L('ThisFieldIsRequired') }],
  courtNumber: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtReader: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtReaderNumber:[{ required: true, message: L('ThisFieldIsRequired') }],
  cityId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  branchId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  provinceId: [{ required: true, message: L('ThisFieldIsRequired') }],
  divisionId: [{ required: true, message: L('ThisFieldIsRequired') }],
  tehsilId: [{ required: true, message: L('ThisFieldIsRequired') }],
  forumId: [{ required: true, message: L('ThisFieldIsRequired') }],
  forumCatId: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtReaderEmail: [{ required: true, message: L('ThisFieldIsRequired') },{
    type: 'email',
    message: 'The input is not valid E-mail!',
  }],
  courtAhlmed: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtAhlmedNumber: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtAhlmedEmail: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],

};

export default rules;
