export interface UpdateLitigantTypeInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  litigantTypeName: string;
  litigantTypeDesciption: string;
  status: boolean;
}
