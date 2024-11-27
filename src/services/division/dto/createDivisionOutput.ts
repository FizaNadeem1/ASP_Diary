export interface CreateDivisionOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  divisionName: string;
  divisionDescription: string;
  provinceId: string;
  provinceName: string;
  provinceNameProvinceName: string;
}

export interface CreateDivisionOutput {
  result: CreateDivisionOutputItem;
}
