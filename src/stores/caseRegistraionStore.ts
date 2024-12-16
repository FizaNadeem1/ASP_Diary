import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import CaseRegistrationService from '../services/caseRegistration/CaseRegistrationService';
import type { PagedCaseRegistrationResultRequestDto } from '../services/caseRegistration/dto/PagedCaseRegistrationResultRequestDto';
import type { UpdateCaseRegistrationInput } from '../services/caseRegistration/dto/updateCaseRegistrationInput';
import type { GetCaseRegistrationOutput } from '../services/caseRegistration/dto/getCaseRegistrationOutput';
import type { CreateOrUpdateCaseRegistrationInput } from '../services/caseRegistration/dto/createOrUpdateCaseRegistrationut';
import { GetBranches } from '../services/caseRegistration/dto/getBranchOutput';
import { GetBenches } from '../services/caseRegistration/dto/getBenchOutput';
import { GetFirstLitigantTypes } from '../services/caseRegistration/dto/getFirstLitigantTypeOutput';
import { GetSecondLitigantTypes } from '../services/caseRegistration/dto/getSecondLitigantTypeOutput';
import { GetLawyers } from '../services/caseRegistration/dto/getLawyerOutput';
import { GetClients } from '../services/caseRegistration/dto/getClientOutput';
import { GetCaseTypes } from '../services/caseRegistration/dto/getCaseTypeOutput';
import type { CreateCaseBenchInput } from '../services/caseRegistration/dto/createCaseBenchInput';
import type { CreateCaseLawyerInput } from '../services/caseRegistration/dto/createCaseLawyerInput';
import moment from 'moment';
import { GetAllCaseLawyerOutput } from '../services/caseRegistration/dto/getAllCaseLawyerOutput';
import { GetAllCaseBenchOutput } from '../services/caseRegistration/dto/getAllCaseBenchOutput';

class CaseRegistraionStore {
  @observable caseRegistrations!: PagedResultDto<GetCaseRegistrationOutput>;
  @observable editCaseRegistration!: CreateOrUpdateCaseRegistrationInput;
  @observable branches: GetBranches[] = [];
  @observable benches: GetBenches[] = [];
  @observable firstParty: GetFirstLitigantTypes[] = [];
  @observable secondParty: GetSecondLitigantTypes[] = [];
  @observable lawyers: GetLawyers[] = [];
  @observable clients: GetClients[] = [];
  @observable caseTypes: GetCaseTypes[] = [];
  @observable clList: GetAllCaseLawyerOutput[] = [];
  @observable cbList: GetAllCaseBenchOutput[] = [];

  @action
  async create(createCaseRegistrationInput: CreateOrUpdateCaseRegistrationInput) {
    let result = await CaseRegistrationService.create(createCaseRegistrationInput);
    this.caseRegistrations.items.push(result);
  }

  @action
  async update(updateCaseRegistrationInput: UpdateCaseRegistrationInput) {
    let result = await CaseRegistrationService.update(updateCaseRegistrationInput);
    this.caseRegistrations.items = this.caseRegistrations.items.map((x: GetCaseRegistrationOutput) => {
      if (x.id === updateCaseRegistrationInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await CaseRegistrationService.delete(entityDto);
    this.caseRegistrations.items = this.caseRegistrations.items.filter((x: GetCaseRegistrationOutput) => x.id !== entityDto.id);
  }

  @action
  async getByMainId(entityDto: EntityDto) {
    let data = await CaseRegistrationService.getByMainId(entityDto);
    let result={
      id: data.caseMain.id,
      creationTime: moment(data.caseMain.creationTime),
      creatorUserId: data.caseMain.creatorUserId,
      lastModificationTime: moment(data.caseMain.lastModificationTime),
      lastModifierUserId: data.caseMain.lastModifierUserId,
      caseNo: data.caseMain.caseNo,
      courtCaseNo: data.caseMain.courtCaseNo,
      courtCaseGenNo: data.caseMain.courtCaseGenNo,
      courtCaseGaffNo: data.caseMain.courtCaseGaffNo,
      caseRegDate: moment(data.caseMain.caseRegDate),
      caseStartDate: moment(data.caseMain.caseStartDate),
      caseEndDate: moment(data.caseMain.caseEndDate),
      caseTitle: data.caseMain.caseTitle,
      firstLawyerName: data.caseMain.firstLawyerName,
      secondLawyerName: data.caseMain.secondLawyerName,
      firstPartyName: data.caseMain.firstPartyName,
      secondPartyName: data.caseMain.secondPartyName,
      caseNotes: data.caseMain.caseNotes,
      casePleadings: data.caseMain.casePleadings,
      caseStatus: data.caseMain.caseStatus,
      caseShift: data.caseMain.caseShift,
      caseFinish: data.caseMain.caseFinish,
      firNo: data.caseMain.firNo,
      policeStation: data.caseMain.policeStation,
      offence: data.caseMain.offence,
      firDate: moment(data.caseMain.firDate),
      clientClientName: "",
      clientId: data.caseMain.clientId.toString() ?? null,
      caseTypeCaseTypeName: "",
      caseTypeId: data.caseMain.caseTypeId.toString() ?? null,
      litigantType1LitigantTypeName: "",
      firstLitigantTypeId: data.caseMain.firstLitigantTypeId.toString() ?? null,
      litigantType2LitigantTypeName: "",
      secLitigantTypeId: data.caseMain.secLitigantTypeId.toString() ?? null,
      branchBranchName: "",
      branchId: data.caseMain.branchId.toString() ?? null,
      bStartDate: moment(data.caseBench.bStartDate),
      bEndDate: moment(data.caseBench.bEndDate),
      bNotes: data.caseBench.bNotes,
      caseBenchStatus: data.caseBench.caseBenchStatus,
      caseMain: "",
      caseMainId: data.caseBench.caseMainId.toString() ?? null,
      bench: "",
      benchId: data.caseBench.benchId.toString() ?? null,
      lStartDate: moment(data.caseLawyer.lStartDate),
      lEndDate: moment(data.caseLawyer.lEndDate),
      lNotes: data.caseLawyer.lNotes,
      caseLawyerStatus: data.caseLawyer.caseLawyerStatus,
      lawyer: "",
      lawyerId: data.caseLawyer.lawyerId.toString() ?? null,
    }
    console.log("data get by id vala",result)
    this.editCaseRegistration = result;
  }
  @action
  async createCB(createCaseBenchInput: CreateCaseBenchInput) {
    let result = await CaseRegistrationService.createCB(createCaseBenchInput);
    await this.getCaseBenchList(result?.caseMainId);
  }
  @action
  async createCL(createCaseLawyerInput: CreateCaseLawyerInput) {
    let result = await CaseRegistrationService.createCL(createCaseLawyerInput);
    await this.getCaseLawyersList(result.caseMainId);
  }
  @action
  async getCaseBenchList(keyword: String) {
    let result = await CaseRegistrationService.getCaseBenchList(keyword);
    this.cbList=result
    return result
  }
  @action
  async getCaseLawyersList(keyword: String) {
    let result = await CaseRegistrationService.getCaseLawyersList(keyword);
    this.clList=result
    return result
  }
  @action
  async getBenches() {
    let result = await CaseRegistrationService.getBenches();
    this.benches = result;
  }
  @action
  async getBranches() {
    let result = await CaseRegistrationService.getBranches();
    this.branches = result;
  }  @action
  async getCaseTypes() {
    let result = await CaseRegistrationService.getCaseTypes();
    this.caseTypes = result;
  }  @action
  async getClients() {
    let result = await CaseRegistrationService.getClients();
    this.clients = result;
  }  @action
  async getFirstParty() {
    let result = await CaseRegistrationService.getFirstParty();
    this.firstParty = result;
  }  @action
  async getSecondParty() {
    let result = await CaseRegistrationService.getSecondParty();
    this.secondParty = result;
  }
  @action
  async getLawyers() {
    let result = await CaseRegistrationService.getLawyers();
    this.lawyers = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await CaseRegistrationService.get(entityDto);
    this.editCaseRegistration = result;
  }

  @action
  async createCaseRegistration() {
    this.editCaseRegistration = {
      id: 0,
      creationTime: moment(),
      creatorUserId: 0,
      lastModificationTime: moment(),
      lastModifierUserId: 0,
      caseNo: 'Diary-Has-Automated-Case-Code-Generator',
      courtCaseNo: '',
      courtCaseGenNo: '',
      courtCaseGaffNo: '',
      caseRegDate: moment(),
      caseStartDate: moment(),
      caseEndDate: moment().add(1,'day'),
      caseTitle: '',
      firstLawyerName: '',
      secondLawyerName: '',
      firstPartyName: '',
      secondPartyName: '',
      caseNotes: '',
      casePleadings: '',
      caseStatus: true,
      caseShift: true,
      caseFinish: true,
      firNo: '',
      policeStation: '',
      offence: '',
      firDate: moment(),
      clientClientName: '',
      clientId: null,
      caseTypeCaseTypeName: '',
      caseTypeId: null,
      litigantType1LitigantTypeName: '',
      firstLitigantTypeId: null,
      litigantType2LitigantTypeName: '',
      secLitigantTypeId: null,
      branchBranchName: '',
      branchId: null,
      bStartDate: moment(),
      bEndDate: moment(),
      bNotes: '',
      caseBenchStatus: true,
      caseMain: '',
      caseMainId: null,
      bench: '',
      benchId: null,
      lStartDate:moment(),
      lEndDate:moment(),
      lNotes: '',
      caseLawyerStatus: true,
      lawyer: '',
      lawyerId: null,
    
    };
    this.benches = [];
    this.branches = [];
    this.lawyers = [];
    this.caseTypes = [];
    this.clients = [];
    this.firstParty = [];
    this.secondParty = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCaseRegistrationResultRequestDto) {
    let result = await CaseRegistrationService.getAll(pagedFilterAndSortedRequest);
    this.caseRegistrations = result;
  }
}

export default CaseRegistraionStore;
