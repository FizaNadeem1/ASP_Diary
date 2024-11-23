import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import ForumStore from './forumStore';
import ForumCategoryStore from './forumCategoryStore';
import CaseTypeStore from './caseTypeStore';
import LitigantTypeStore from './litigantTypeStore';
import DesignationStore from './designationStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    forumStore: new ForumStore(),
    litigantTypeStore: new LitigantTypeStore(),
    designationStore: new DesignationStore(),
    caseTypeStore: new CaseTypeStore(),
    forumCatogoryStore: new ForumCategoryStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
  };
}
