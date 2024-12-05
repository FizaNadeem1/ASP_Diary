import { L } from '../../../lib/abpUtility';

const rules = {
  packageName: [{ required: true, message: L('ThisFieldIsRequired') }],
  courtBench: [{ required: true, message: L('ThisFieldIsRequired') }],
  clientRegister: [{ required: true, message: L('ThisFieldIsRequired') }],
  lawyerRegister: [{ required: true, message: L('ThisFieldIsRequired') }],
  caseRegister: [{ required: true, message: L('ThisFieldIsRequired') }],
  proceedings: [{ required: true, message: L('ThisFieldIsRequired') }],
  causeList: [{ required: true, message: L('ThisFieldIsRequired') }],
  reporting: [{ required: true, message: L('ThisFieldIsRequired') }],
  details: [{ required: true, message: L('ThisFieldIsRequired') }],
  adminPanel: [{ required: true, message: L('ThisFieldIsRequired') }],
  usersRegistration: [{ required: true, message: L('ThisFieldIsRequired') }],
  rolesManage: [{ required: true, message: L('ThisFieldIsRequired') }],
  firmRegistration: [{ required: true, message: L('ThisFieldIsRequired') }],
  branchRegistration: [{ required: true, message: L('ThisFieldIsRequired') }],
  whiteListing: [{ required: true, message: L('ThisFieldIsRequired') }],
  price: [{ required: true, message: L('ThisFieldIsRequired') }],
  exactPrice: [{ required: true, message: L('ThisFieldIsRequired') }],
  sms: [{ required: true, message: L('ThisFieldIsRequired') }],
  masking: [{ required: true, message: L('ThisFieldIsRequired') }],
  excelPdfData: [{ required: true, message: L('ThisFieldIsRequired') }],
  isMonthly: [{ required: true, message: L('ThisFieldIsRequired') }],
  smsServiceCharges: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
