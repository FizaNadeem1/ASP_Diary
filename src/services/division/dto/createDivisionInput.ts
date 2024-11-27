export interface CreateDivisionInput {
"id": number,
  "divisionName": string,
  "divisionDescription": string,
  "provinceName": {
    "id": string,
    "creationTime":Date,
    "creatorUserId": number,
    "lastModificationTime":Date,
    "lastModifierUserId": number,
    "provinceName": string,
    "provinceDescription": string
  },
  "provinceId": string,
  "normalizedName": string,
  "grantedPermissions": string[]
}
