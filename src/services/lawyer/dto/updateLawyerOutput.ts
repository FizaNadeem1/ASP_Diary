import { Moment } from "moment";

export interface UpdateLawyerOutput {
  id: number;
  creationTime: Moment;
  creatorUserId: number;
  lastModificationTime: Moment;
  lastModifierUserId: number;
  lawyerName: string;
  lawyerMobile: string;
  lawyerAdress: string;
  lawyerLiscene: string;
  lawyerNotes: string;
  lawyerStatus: boolean;
  lawyerPhotoPath: string;
  lawyerPracticingBar: string;
  lawyerLicRegDate: Moment;
  lawyerLicExpDate: Moment;
  lawyerFirmRegDate: Moment;
  lawyerResigDate: Moment;
  provinceId: string;
  provinceProvinceName: string;
  divisionId: number|string;
  cityId: number|string;
  cityCityName: string;
  tehsilId: number|string;
  lawyerSpeacialityId: number|string;
  lawyerSpeacialitySpeacialityName: string;
  branchId: number|string;
  branchBranchName: string;
  profileImage: string;
}
