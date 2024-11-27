import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetProvinces } from '../services/division/dto/getProvinceOutput';
import divisionService from '../services/division/divisionService';
import type { PagedDivisionResultRequestDto } from '../services/division/dto/PagedDivisionResultRequestDto';
import type { GetDivisionOutput } from '../services/division/dto/getDivisionOutput';
import type { UpdateDivisionInput } from '../services/division/dto/updateDivisionInput';
import type { CreateOrUpdateDivisionInput } from '../services/division/dto/createOrUpdateDivisionInput';

class DivisionStore {
  @observable divisions!: PagedResultDto<GetDivisionOutput>;
  @observable editDivision!: CreateOrUpdateDivisionInput;
  @observable provinces: GetProvinces[] = [];

  @action
  async create(createDivisionInput: CreateOrUpdateDivisionInput) {
    let result = await divisionService.create(createDivisionInput);
    this.divisions.items.push(result);
  }

  @action
  async update(updateDivisionInput: UpdateDivisionInput) {
    let result = await divisionService.update(updateDivisionInput);
    this.divisions.items = this.divisions.items.map((x: GetDivisionOutput) => {
      if (x.id === updateDivisionInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await divisionService.delete(entityDto);
    this.divisions.items = this.divisions.items.filter((x: GetDivisionOutput) => x.id !== entityDto.id);
  }

  @action
  async getProvinces() {
    let result = await divisionService.getProvinces();
    this.provinces = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await divisionService.get(entityDto);
    this.editDivision = result;
  }

  @action
  async createDivision() {
    this.editDivision = {
      id: 0,
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      divisionName: '',
      divisionDescription: '',
      provinceId: '',
      provinceName: '',
      provinceNameProvinceName: '',
    };
    this.provinces = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedDivisionResultRequestDto) {
    let result = await divisionService.getAll(pagedFilterAndSortedRequest);
    this.divisions = result;
  }
}

export default DivisionStore;
