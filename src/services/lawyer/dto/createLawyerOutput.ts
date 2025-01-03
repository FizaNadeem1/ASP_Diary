export interface CreateLawyerOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
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
  provinceProvinceName: string;
  divisionId: number;
  cityId: number;
  cityCityName: string;
  tehsilId: number;
  lawyerSpeacialityId: number;
  lawyerSpeacialitySpeacialityName: string;
  branchId: number;
  branchBranchName: string;
  profileImage: string;
}

export interface CreateLawyerOutput {
  result: CreateLawyerOutputItem;
}
