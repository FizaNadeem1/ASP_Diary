import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import ForumStore from './forumStore';
import ForumCategoryStore from './forumCategoryStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    forumStore: new ForumStore(),
    forumCatogoryStore: new ForumCategoryStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
  };
}
