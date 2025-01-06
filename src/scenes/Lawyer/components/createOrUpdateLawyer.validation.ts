import { L } from '../../../lib/abpUtility';

const rules = {
  lawyerName: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerMobile:[{ required: true, message: L('ThisFieldIsRequired') },{
    pattern: /^\+([1-9]{1,4})\s?\(?\d{1,3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, // Regex for phone number with country code
    message: 'Phone number must start with a valid country code and be in the correct format!',
  },],
  lawyerLiscene: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerAdress: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerNotes:[{ required: true, message: L('ThisFieldIsRequired') }],
  cityId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  provinceId:  [{ required: true, message: L('ThisFieldIsRequired') }],
  divisionId: [{ required: true, message: L('ThisFieldIsRequired') }],
  tehsilId: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerSpeacialityId: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchId: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerPracticingBar: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerPhotoPath: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerResigDate: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerFirmRegDate: [{ required: true, message: L('ThisFieldIsRequired') }],

};

export default rules;
