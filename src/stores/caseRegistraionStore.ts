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
      creationTime: new Date(),
      creatorUserId: 0,
      lastModificationTime: new Date(),
      lastModifierUserId: 0,
      caseNo: '',
      courtCaseNo: '',
      courtCaseGenNo: '',
      courtCaseGaffNo: '',
      caseRegDate: new Date(0),
      caseStartDate: new Date(0),
      caseEndDate: new Date(0),
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
      firDate: new Date(),
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
      bStartDate: new Date(),
      bEndDate: new Date(),
      bNotes: '',
      caseBenchStatus: true,
      caseMain: '',
      caseMainId: null,
      bench: '',
      benchId: null,
      lStartDate: new Date(),
      lEndDate: new Date(),
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
