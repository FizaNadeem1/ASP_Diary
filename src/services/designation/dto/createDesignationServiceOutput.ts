export interface CreateDesignationOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  designationName: string;
  designationNotes: string;
}

export interface CreateDesignationOutput {
  result: CreateDesignationOutputItem;
}
