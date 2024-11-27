export interface CreateOrUpdateProvinceInput {
  id: string;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  provinceName: string;
  provinceDescription: string;
}
