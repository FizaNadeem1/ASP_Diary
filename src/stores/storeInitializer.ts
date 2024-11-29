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
import PresidingOfficerStore from './presidingOfficerStore';
import BranchStore from './branchStore';
import FirmStore from './firmStore';
import CityStore from './cityStore';
import CourtStore from './courtStore';
import ProvinceStore from './provinceStore';
import DivisionStore from './divisionStore';
import ClientStore from './clientStore';
import LawyerStore from './lawyerStore';
import CaseProceedingStore from './CaseProceedingStore';
import CaseRegistraionStore from './caseRegistraionStore';
import TehsilStore from './tehsilStore';
import BenchStore from './benchStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    forumStore: new ForumStore(),
    litigantTypeStore: new LitigantTypeStore(),
    branchStore: new BranchStore(),
    firmStore: new FirmStore(),
    cityStore: new CityStore(),
    clientStore: new ClientStore(),
    tehsilStore: new TehsilStore(),
    benchStore: new BenchStore(),
    caseRegistrationStore: new CaseRegistraionStore(),
    divisionStore: new DivisionStore(),
    provinceStore: new ProvinceStore(),
    lawyerStore: new LawyerStore(),
    caseProceedingStore: new CaseProceedingStore(),
    courtStore: new CourtStore(),
    designationStore: new DesignationStore(),
    presidingOfficerStore: new PresidingOfficerStore(),
    caseTypeStore: new CaseTypeStore(),
    forumCategoryStore: new ForumCategoryStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
  };
}
