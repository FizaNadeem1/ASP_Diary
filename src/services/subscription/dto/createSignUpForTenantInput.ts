import { Moment } from 'moment';

export interface CreateSignUpForTenantInput {
  firstName: string;
  surName: string;
  firmName: string;
  licsenceNo: string;
  phone: string;
  email: string;
  city: string;
  userName: string;
  password: string;
  isAdreed: true;
  creationTime: Moment;
  packageId: number;
  tenantId: number;
}
