export interface CreateLawyerInput {
  lawyerName: string;
  lawyerMobile: string;
  lawyerAdress: string;
  lawyerLiscene: string;
  lawyerNotes: string;
  lawyerStatus: true;
  lawyerPhotoPath: string;
  lawyerPracticingBar: string;
  lawyerLicRegDate: Date;
  lawyerLicExpDate: Date;
  lawyerFirmRegDate: Date;
  lawyerResigDate: Date;
  provinceId: string;
  divisionId: number;
  cityId: number;
  tehsilId: number;
  lawyerSpeacialityId: number;
  branchId: number;
  profileImage: string;
}
