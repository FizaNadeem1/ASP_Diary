export interface CreateBranchRoleInput {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
  tenantId: number;
  packageId: number;
}
