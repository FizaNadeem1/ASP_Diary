import { action } from 'mobx';

import subscriptionService from '../services/subscription/subscriptionService';
import type { CreateSignUpInput } from '../services/subscription/dto/createSignUpInput';
import type { CreateTenantInput } from '../services/subscription/dto/createTenantInput';
import type { CreateSignUpForTenantInput } from '../services/subscription/dto/createSignUpForTenantInput';
import type { CreateSignUpRoleInput } from '../services/subscription/dto/createSignUpRoleInput';
import type { CreateBranchRoleInput } from '../services/subscription/dto/createBranchRoleInput';
import type { CreateSignUpUserInput } from '../services/subscription/dto/createSignUpUserInput';
import type { CreateSignUpUserFirmInput } from '../services/subscription/dto/createSignUpUserFirmInput';
import type { CreateSignUpUserBranchInput } from '../services/subscription/dto/createSignUpUserBranchInput';
import type { CreateSubscriptionInput } from '../services/subscription/dto/createSubscriptionInput';

class SubscriptionStore {
  @action
  async createSignup(CreateSignUpInput: CreateSignUpInput) {
    let result = await subscriptionService.createSignup(CreateSignUpInput);
    return result;
  }

  @action
  async tenancyCodeGenerator() {
    let result = await subscriptionService.tenancyCodeGenerator();
    return result;
  }

  @action
  async createTenant(createTenantInput: CreateTenantInput) {
    let result = await subscriptionService.createTenant(createTenantInput);
    return result;
  }

  @action
  async signupForTenant(createSignUpForTenantInput: CreateSignUpForTenantInput) {
    let result = await subscriptionService.signupForTenant(createSignUpForTenantInput);
    return result;
  }

  @action
  async signupRole(createSignUpRoleInput: CreateSignUpRoleInput) {
    let result = await subscriptionService.signupRole(createSignUpRoleInput);
    return result
  }
  @action
  async createBranchRole(createBranchRoleInput: CreateBranchRoleInput) {
    let result = await subscriptionService.createBranchRole(createBranchRoleInput);
    return result
  }
  @action
  async userSignup(createSignUpUserInput: CreateSignUpUserInput) {
    let result = await subscriptionService.userSignup(createSignUpUserInput);
    return result
  }
  @action
  async signupUserFirm(createSignUpUserFirmInput: CreateSignUpUserFirmInput) {
    let result = await subscriptionService.signupUserFirm(createSignUpUserFirmInput);
    return result
  }
  @action
  async branchCodeGenerator() {
    let result = await subscriptionService.branchCodeGenerator();
    return result
  }
 @action
  async signupUserBranch(createSignUpUserBranchInput: CreateSignUpUserBranchInput) {
    let result = await subscriptionService.signupUserBranch(createSignUpUserBranchInput);
    return result
  }
  @action
  async createSubscription(createSubscriptionInput: CreateSubscriptionInput) {
    let result = await subscriptionService.createSubscription(createSubscriptionInput);
    return result
  }
  @action
  async createPaymentSession(createSubscriptionInput: CreateSubscriptionInput) {
    let result = await subscriptionService.createPaymentSession(createSubscriptionInput);
    return result
  }
  @action
  async getTimeZone() {
    let result = await subscriptionService.getTimeZone();
    return result
  }

}

export default SubscriptionStore;
