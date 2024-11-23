export interface CreateLitigantTypeOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  litigantTypeName: string;
  litigantTypeDesciption: string;
  status: boolean;
}

export interface CreateUserOutput {
  result: CreateLitigantTypeOutputItem;
}
