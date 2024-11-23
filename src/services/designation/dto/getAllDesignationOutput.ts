export interface GetAllDesignationOutput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  designationName: string;
  designationNotes: string;
}
