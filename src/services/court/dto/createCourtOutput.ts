export interface CreateCourtOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  courtCode: string;
  courtDescription: string;
  courtNumber: string;
  courtReader: string;
  courtReaderNumber: string;
  courtReaderEmail: string;
  courtAhlmed: string;
  courtAhlmedNumber: string;
  courtAhlmedEmail: string;
  forumForumName: string;
  forumId: number;
  forumCategoryForumCategoryName: string;
  forumCatId: number;
  provinceProvinceName: string;
  provinceId: string;
  divisionDivisionName: string;
  divisionId: number;
  cityCityName: string;
  cityId: number;
  tehsilTehsilName: string;
  tehsilId: number;
  branchBranchName: string;
  branchId: number;
}

export interface CreateCourtOutput {
  result: CreateCourtOutputItem;
}
