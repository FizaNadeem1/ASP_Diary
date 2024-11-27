import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import CaseProceedingService from '../services/caseProceeding/CaseProceedingService';
import type { PagedCaseProceedingResultRequestDto } from '../services/caseProceeding/dto/PagedCaseProceedingResultRequestDto';
import { GetCaseProceedingOutput } from '../services/caseProceeding/dto/getCaseProceedingOutput';
import type { UpdateCaseProceedingInput } from '../services/caseProceeding/dto/updateCaseProceedingInput';
import type { CreateOrUpdateCaseProceedingInput } from '../services/caseProceeding/dto/createOrUpdateCaseProceedingInput';
import { GetBranches } from '../services/caseProceeding/dto/getBranchOutput';
import { GetProceedings } from '../services/caseProceeding/dto/getProceedingOutput';

class CaseProceedingStore {
  @observable caseProceedings!: PagedResultDto<GetCaseProceedingOutput>;
  @observable editCaseProceeding!: CreateOrUpdateCaseProceedingInput;
  @observable branches: GetBranches[] = [];
  @observable proceedings: GetProceedings[] = [];

  @action
  async create(createCaseProceedingInput: CreateOrUpdateCaseProceedingInput) {
    let result = await CaseProceedingService.create(createCaseProceedingInput);
    this.caseProceedings.items.push(result);
  }

  @action
  async update(updateCaseProceedingInput: UpdateCaseProceedingInput) {
    let result = await CaseProceedingService.update(updateCaseProceedingInput);
    this.caseProceedings.items = this.caseProceedings.items.map((x: GetCaseProceedingOutput) => {
      if (x.id === updateCaseProceedingInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await CaseProceedingService.delete(entityDto);
    this.caseProceedings.items = this.caseProceedings.items.filter(
      (x: GetCaseProceedingOutput) => x.id !== entityDto.id
    );
  }

  @action
  async getCaseDataByCaseNo(entityDto: EntityDto) {
    let result = await CaseProceedingService.getCaseDataByCaseNo(entityDto);
    return result
  }

  @action
  async getBranches() {
    let result = await CaseProceedingService.getBranches();
    this.branches = result;
  }

  @action
  async getProceedings() {
    let result = await CaseProceedingService.getProceedings();
    this.proceedings = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await CaseProceedingService.get(entityDto);
    this.editCaseProceeding = result;
  }

  @action
  async createCaseProceeding() {
    this.editCaseProceeding = {
      id: 0,
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      previousDate: new Date(0),
      currentDate: new Date(0),
      nexttDate: new Date(0),
      previousNextDate: new Date(0),
      proceedingNotes: '',
      proceedingShortOrder: '',
      caseRunning: true,
      caseFinish: true,
      caseTransfer: true,
      caseGenNo: '',
      caseGaffNo: '',
      branchId: null,
      branchBranchName: '',
      benchId: 0,
      benchBenchCode: '',
      caseId: null,
      caseCaseNo: '',
      caseCaseTitle: '',
      proceedingStatusId: null,
      proceedingStatusProceedingName: '',
    };
    this.branches = [];
    this.proceedings = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCaseProceedingResultRequestDto) {
    let result = await CaseProceedingService.getAll(pagedFilterAndSortedRequest);
    this.caseProceedings = result;
  }
}

export default CaseProceedingStore;