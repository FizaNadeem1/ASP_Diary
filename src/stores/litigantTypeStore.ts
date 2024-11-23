import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetLitigantTypeOutput } from '../services/litigantType/dto/getLitigantTypeOutput';
import type { CreateOrUpdateLitigantTypeInput } from '../services/litigantType/dto/createOrUpdateLitigantTypeInput';
import LitigantTypeService from '../services/litigantType/LitigantTypeService';
import type { UpdateLitigantTypeInput } from '../services/litigantType/dto/updateLitigantTypeInput';
import type { PagedLitigantTypeResultRequestDto } from '../services/litigantType/dto/PagedLitigantTypeResultRequestDto';

class LitigantTypeStore {
  @observable litigantTypes!: PagedResultDto<GetLitigantTypeOutput>;
  @observable editLitigantType!: CreateOrUpdateLitigantTypeInput;

  @action
  async create(createLitigantTypeInput: CreateOrUpdateLitigantTypeInput) {
    let result = await LitigantTypeService.create(createLitigantTypeInput);
    this.litigantTypes.items.push(result);
  }

  @action
  async update(updateLitigantTypeInput: UpdateLitigantTypeInput) {
    let result = await LitigantTypeService.update(updateLitigantTypeInput);
    this.litigantTypes.items = this.litigantTypes.items.map((x: GetLitigantTypeOutput) => {
      if (x.id === updateLitigantTypeInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await LitigantTypeService.delete(entityDto);
    this.litigantTypes.items = this.litigantTypes.items.filter((x: GetLitigantTypeOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await LitigantTypeService.get(entityDto);
    this.editLitigantType = result;
  }

  @action
  async createLitigantType() {
    this.editLitigantType = {
      litigantTypeName: '',
      litigantTypeDesciption: '',
      status: false,
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedLitigantTypeResultRequestDto) {
    let result = await LitigantTypeService.getAll(pagedFilterAndSortedRequest);
    this.litigantTypes = result;
  }
}

export default LitigantTypeStore;
