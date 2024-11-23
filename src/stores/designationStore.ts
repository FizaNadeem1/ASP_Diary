import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import type { PagedDesignationResultRequestDto } from '../services/designation/dto/PagedDesignationResultRequestDto';
import type { GetDesignationOutput } from '../services/designation/dto/getDesignationOutput';
import type { UpdateDesignationInput } from '../services/designation/dto/updateDesignationInput';
import type { CreateOrUpdateDesignationInput } from '../services/designation/dto/createOrUpdateDesignationInput';
import DesignationService from '../services/designation/designationService';

class DesignationStore {
  @observable designations!: PagedResultDto<GetDesignationOutput>;
  @observable editDesignation!: CreateOrUpdateDesignationInput;

  @action
  async create(createDesignationInput: CreateOrUpdateDesignationInput) {
    let result = await DesignationService.create(createDesignationInput);
    this.designations.items.push(result);
  }

  @action
  async update(updateDesignationInput: UpdateDesignationInput) {
    let result = await DesignationService.update(updateDesignationInput);
    this.designations.items = this.designations.items.map((x: GetDesignationOutput) => {
      if (x.id === updateDesignationInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await DesignationService.delete(entityDto);
    this.designations.items = this.designations.items.filter((x: GetDesignationOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await DesignationService.get(entityDto);
    this.editDesignation = result;
  }

  @action
  async createDesignation() {
    this.editDesignation = {
      designationName: '',
      designationNotes: '',
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedDesignationResultRequestDto) {
    let result = await DesignationService.getAll(pagedFilterAndSortedRequest);
    this.designations = result;
  }
}

export default DesignationStore;
