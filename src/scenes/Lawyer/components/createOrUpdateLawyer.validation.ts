import { L } from '../../../lib/abpUtility';

const rules = {
  lawyerName: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerMobile:[{ required: true, message: L('ThisFieldIsRequired') }],
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
