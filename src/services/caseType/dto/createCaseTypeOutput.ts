export interface CreateCaseTypeOutputItem {
  caseTypeName: string;
  caseTypeDesciption: string;
  creatorUserId: number;
  lastModifierUserId: number;
  creationTime: Date;
  lastModificationTime: Date;
  id: number;
}

export interface CreateCaseTypeOutput {
  result: CreateCaseTypeOutputItem;
}
