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
import moment from 'moment';

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
  async getCaseProceedingForEdit(entityDto: EntityDto) {
    let data = await CaseProceedingService.getCaseProceedingForEdit(entityDto);
    console.log('data get by id vala', data);
    let result = {
      id: data.editCaseProceeding.id,
      creationTime: data.editCaseProceeding.creationTime,
      creatorUserId: data.editCaseProceeding.creatorUserId,
      lastModificationTime: data.editCaseProceeding.lastModificationTime,
      lastModifierUserId: data.editCaseProceeding.lastModifierUserId,
      previousDate: moment(data.editCaseProceeding.previousDate),
      currentDate: moment(data.editCaseProceeding.currentDate),
      nexttDate: moment(data.editCaseProceeding.nexttDate),
      previousNextDate: data.editCaseProceeding.previousDate,
      proceedingNotes: data.editCaseProceeding.proceedingNotes,
      proceedingShortOrder: data.editCaseProceeding.proceedingShortOrder,
      caseRunning: data.editCaseProceeding.caseRunning,
      caseFinish: data.editCaseProceeding.caseFinish,
      caseTransfer: data.editCaseProceeding.caseTransfer,
      caseGenNo: data.editCaseProceeding.caseGenNo,
      caseGaffNo: data.editCaseProceeding.caseGaffNo,
      branchId: data.editCaseProceeding.branchId,
      branchBranchName: data.editCaseProceeding.branchBranchName,
      benchId: data.editCaseProceeding.benchId,
      benchBenchCode: data.getCaseDataByCaseNo.benchBenchCode,
      caseId: data.editCaseProceeding.caseId,
      caseCaseNo: data.getCaseDataByCaseNo.caseMainCaseNo,
      caseCaseTitle: data.getCaseDataByCaseNo.caseMainCaseTitle,
      proceedingStatusId: data.editCaseProceeding.proceedingStatusId.toString() ?? null,
      proceedingStatusProceedingName: data.editCaseProceeding.proceedingStatusProceedingName,
      caseMainCourtCaseNo: data.getCaseDataByCaseNo.caseMainCourtCaseNo,
      caseMainFirstPartyName: data.getCaseDataByCaseNo.caseMainFirstPartyName,
      caseMainSecondPartyName: data.getCaseDataByCaseNo.caseMainSecondPartyName,
      caseMainCaseTypeCaseTypeName: data.getCaseDataByCaseNo.caseMainCaseTypeCaseTypeName,
      new: data.getCaseDataByCaseNo.new,
    };
    this.editCaseProceeding = result;
    return result;
  }
  @action
  async getCaseDataByCaseNo(entityDto: EntityDto) {
    let result = await CaseProceedingService.getCaseDataByCaseNo(entityDto);
    let sd = {
      ...result,
      previousDate: moment(result.previousNextDate),
      nexttDate: moment(result.previousNextDate).add(1, 'day'),
    };
    return sd;
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
    let sd = {
      ...result,
      branchId: result.branchId?.toString() ?? null,
      caseId: result.caseId?.toString() ?? null,
      proceedingStatusId: result.proceedingStatusId?.toString() ?? null,
      previousDate: moment(result.previousDate),
      currentDate: moment(result.currentDate),
      nexttDate: moment(result.nexttDate),
      previousNextDate: moment(result.previousNextDate),
    };
    this.editCaseProceeding = sd;
  }

  @action
  async createCaseProceeding() {
    this.editCaseProceeding = {
      id: 0,
      creationTime: moment(),
      creatorUserId: 0,
      lastModificationTime: moment(),
      lastModifierUserId: 0,
      previousDate: moment(),
      currentDate: moment(),
      nexttDate: moment(),
      previousNextDate: moment(),
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
