import http from '../httpService';
import { CreateBranchRoleInput } from './dto/createBranchRoleInput';
import { CreateSignUpRoleInput } from './dto/createSignUpRoleInput';
import { CreateSignUpUserFirmInput } from './dto/createSignUpUserFirmInput';
import { CreateSignUpUserInput } from './dto/createSignUpUserInput';
import { CreateTenantInput } from './dto/createTenantInput';
import { CreateSignUpUserBranchInput } from './dto/createSignUpUserBranchInput';
import { CreateSubscriptionInput } from './dto/createSubscriptionInput';
import { CreateSignUpInput } from './dto/createSignUpInput';
import { CreateSignUpForTenantInput } from './dto/createSignUpForTenantInput';

class SubscriptionService {
  public async createSignup(createSignUpInput: CreateSignUpInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUp', createSignUpInput);
    return result;
  }

  public async tenancyCodeGenerator() {
    let result = await http.post('/api/services/app/RandomCode/CodeGeneratorForTenancy');
    return result;
  }

  public async createTenant(createTenantInput: CreateTenantInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateTenant', createTenantInput);
    return result;
  }

  public async signupForTenant(createSignUpForTenantInput: CreateSignUpForTenantInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUpForTenant', createSignUpForTenantInput);
    return result;
  }
  public async signupRole(createSignUpRoleInput: CreateSignUpRoleInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUpRole', createSignUpRoleInput);
    return result;
  }
  public async createBranchRole(createBranchRoleInput: CreateBranchRoleInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateBranchRole', createBranchRoleInput);
    return result;
  }
  public async userSignup(createSignUpUserInput: CreateSignUpUserInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUpUser', createSignUpUserInput);
    return result;
  }
  public async signupUserFirm(createSignUpUserFirmInput: CreateSignUpUserFirmInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUpUserFirm', createSignUpUserFirmInput);
    return result;
  }
  public async branchCodeGenerator() {
    let result = await http.post('/api/services/app/RandomCode/CodeGeneratorForBranch', );
    return result;
  }
  public async signupUserBranch(createSignUpUserBranchInput: CreateSignUpUserBranchInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSignUpUserBranch', createSignUpUserBranchInput);
    return result;
  }
  public async createSubscription(createSubscriptionInput: CreateSubscriptionInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSubscription', createSubscriptionInput);
    return result;
  }
  public async createPaymentSession(createPaymentSessionInput: CreateSubscriptionInput) {
    let result = await http.post('/api/services/app/SignUpBaseManagement/CreateSubscriptionSignUp', createPaymentSessionInput);
    return result;
  }

  public async getTimeZone() {
    let result = await http.post('/api/services/app/ApplicationTimeZone/TimeZoneList');
    return result.data.result.items;
  }

}

export default new SubscriptionService();
