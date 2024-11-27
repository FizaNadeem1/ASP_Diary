export interface CreateProvinceOutputItem {
  id: string;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  provinceName: string;
  provinceDescription: string;
}

export interface CreateProvinceOutput {
  result: CreateProvinceOutputItem;
}
