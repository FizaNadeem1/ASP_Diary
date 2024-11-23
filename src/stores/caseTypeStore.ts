import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import caseTypeService from '../services/caseType/caseTypeService';
import type { CreateOrUpdateCaseTypeInput } from '../services/caseType/dto/createOrUpdateCaseTypeInput';
import { GetCaseTypeOutput } from '../services/caseType/dto/getCaseTypeOutput';
import type { UpdateCaseTypeInput } from '../services/caseType/dto/updateCaseTypeInput';
import type { PagedCaseTypeResultRequestDto } from '../services/caseType/dto/PagedCaseTypeResultRequestDto';

class CaseTypeStore {
  @observable caseTypes!: PagedResultDto<GetCaseTypeOutput>;
  @observable editCaseType!: CreateOrUpdateCaseTypeInput;

  @action
  async create(createCaseTypeInput: CreateOrUpdateCaseTypeInput) {
    let result = await caseTypeService.create(createCaseTypeInput);
    this.caseTypes.items.push(result);
  }

  @action
  async update(updateCaseTypeInput: UpdateCaseTypeInput) {
    let result = await caseTypeService.update(updateCaseTypeInput);
    this.caseTypes.items = this.caseTypes.items.map((x: GetCaseTypeOutput) => {
      if (x.id === updateCaseTypeInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await caseTypeService.delete(entityDto);
    this.caseTypes.items = this.caseTypes.items.filter((x: GetCaseTypeOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await caseTypeService.get(entityDto);
    this.editCaseType = result;
  }

  @action
  async createCaseType() {
    this.editCaseType = {
      caseTypeName: '',
      caseTypeDesciption: '',
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCaseTypeResultRequestDto) {
    let result = await caseTypeService.getAll(pagedFilterAndSortedRequest);
    this.caseTypes = result;
  }
}

export default CaseTypeStore;
