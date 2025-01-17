export interface CreateTehsilInput {
  id: number;
  tehsilName: string;
  cityName: {
    id: number;
    cityName: string;
    divisionName: {
      id: number;
      creationTime: Date;
      creatorUserId: number;
      lastModificationTime: Date;
      lastModifierUserId: number;
      divisionName: string;
      divisionDescription: string;
      provinceName: {
        id: string;
        creationTime: Date;
        creatorUserId: number;
        lastModificationTime: Date;
        lastModifierUserId: number;
        provinceName: string;
        provinceDescription: string;
      };
      provinceId: string;
    };
    divisionId: number;
  };
  cityId: number;
  grantedPermissions: string[];
}
