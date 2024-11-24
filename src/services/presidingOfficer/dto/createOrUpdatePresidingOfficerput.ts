export interface CreateOrUpdatePresidingOfficerInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  presidingOfficerName: string;
  presidingOfficerNameNotes: string;
  designationDesignationName: string;
  designationId: number|null;
}
