import { L } from '../../lib/abpUtility';

const rules = {
  firstName: [{ required: true, message: L('ThisFieldIsRequired')}],
  lastName: [{ required: true, message: L('ThisFieldIsRequired') }],
  userName: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'This field can only contain letters and digits',
    },
  ],
  companyName: [{ required: true, message: L('ThisFieldIsRequired') }],
  barLisenceNo: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'This field can only contain letters and digits',
    },
  ],
  phoneNo: [{ required: true, message: L('ThisFieldIsRequired') },
    {
      pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
      message: 'Phone number must start with a valid country code and be in the correct format!',
    },
  ],
  city: [{ required: true, message: L('ThisFieldIsRequired') }],
  time: [{ required: true, message: L('ThisFieldIsRequired') }],

  email: [
    { required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
};

export default rules;
