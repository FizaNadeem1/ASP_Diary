import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import presidingOfficerService from '../services/presidingOfficer/presidingOfficerService';
import { GetPresidingOfficerOutput } from '../services/presidingOfficer/dto/getPresidingOfficerOutput';
import type { CreateOrUpdatePresidingOfficerInput } from '../services/presidingOfficer/dto/createOrUpdatePresidingOfficerput';
import type { UpdatePresidingOfficerInput } from '../services/presidingOfficer/dto/updatePresidingOfficerInput';
import type { PagedPresidingOfficerResultRequestDto } from '../services/presidingOfficer/dto/PagedPresidingOfficerResultRequestDto';
import { GetDesignations } from '../services/presidingOfficer/dto/getDesignationOutput';

class PresidingOfficerStore {
  @observable presidingOfficers!: PagedResultDto<GetPresidingOfficerOutput>;
  @observable editPresidingOfficer!: CreateOrUpdatePresidingOfficerInput;
  @observable designations: GetDesignations[] = [];

  @action
  async create(createPresidingOfficerInput: CreateOrUpdatePresidingOfficerInput) {
    let result = await presidingOfficerService.create(createPresidingOfficerInput);
    this.presidingOfficers.items.push(result);
  }

  @action
  async update(updatePresidingOfficerInput: UpdatePresidingOfficerInput) {
    let result = await presidingOfficerService.update(updatePresidingOfficerInput);
    this.presidingOfficers.items = this.presidingOfficers.items.map(
      (x: GetPresidingOfficerOutput) => {
        if (x.id === updatePresidingOfficerInput.id) x = result;
        return x;
      }
    );
  }

  @action
  async delete(entityDto: EntityDto) {
    await presidingOfficerService.delete(entityDto);
    this.presidingOfficers.items = this.presidingOfficers.items.filter(
      (x: GetPresidingOfficerOutput) => x.id !== entityDto.id
    );
  }

  @action
  async getDesignations() {
    let result = await presidingOfficerService.getDesignations();
    this.designations = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await presidingOfficerService.get(entityDto);
    let sd={...result,designationId: result.designationId?.toString() ?? null}
    this.editPresidingOfficer = sd;
  }

  @action
  async createPresidingOfficer() {
    this.editPresidingOfficer = {
      id: 0,
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      presidingOfficerName: '',
      presidingOfficerNameNotes: '',
      designationDesignationName: '',
      designationId: null,
    };
    this.designations=[]
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedPresidingOfficerResultRequestDto) {
    let result = await presidingOfficerService.getAll(pagedFilterAndSortedRequest);
    this.presidingOfficers = result;
  }
}

export default PresidingOfficerStore;
