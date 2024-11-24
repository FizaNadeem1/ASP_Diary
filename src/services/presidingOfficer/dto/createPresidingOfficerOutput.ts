export interface CreatePresidingOfficerOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  presidingOfficerName: string;
  presidingOfficerNameNotes: string;
  designationDesignationName: string;
  designationId: number;
}

export interface CreatePresidingOfficerOutput {
  result: CreatePresidingOfficerOutputItem;
}
