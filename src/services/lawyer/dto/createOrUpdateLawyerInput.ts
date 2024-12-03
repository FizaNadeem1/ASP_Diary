import { Moment } from "moment";

export interface CreateOrUpdateLawyerInput {
  id: number;
  creationTime: Moment
  creatorUserId: number;
  lastModificationTime: Moment
  lastModifierUserId: number;
  lawyerName: string;
  lawyerMobile: string;
  lawyerAdress: string;
  lawyerLiscene: string;
  lawyerNotes: string;
  lawyerStatus: boolean;
  lawyerPhotoPath: string;
  lawyerPracticingBar: string;
  lawyerLicRegDate: Moment
  lawyerLicExpDate: Moment
  lawyerFirmRegDate: Moment
  lawyerResigDate: Moment
  provinceId: string;
  provinceProvinceName: string;
  divisionId: number|null;
  cityId: number|null;
  cityCityName: string;
  tehsilId: number|null;
  lawyerSpeacialityId: number|null;
  lawyerSpeacialitySpeacialityName: string;
  branchId: number|null;
  branchBranchName: string;
  profileImage: string;
}
