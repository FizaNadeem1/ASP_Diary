export interface CreateSignUpUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  password: string;
  tenantId: number;
}
