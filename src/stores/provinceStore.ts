import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import provinceService from '../services/province/provinceService';
import type { PagedProvinceResultRequestDto } from '../services/province/dto/PagedProvinceResultRequestDto';
import type { GetProvinceOutput } from '../services/province/dto/getProvinceOutput';
import type { UpdateProvinceInput } from '../services/province/dto/updateProvinceInput';
import type { CreateOrUpdateProvinceInput } from '../services/province/dto/createOrUpdateProvinceInput';

class ProvinceStore {
  @observable provinces!: PagedResultDto<GetProvinceOutput>;
  @observable editProvince!: CreateOrUpdateProvinceInput;

  @action
  async create(createProvinceInput: CreateOrUpdateProvinceInput) {
    let result = await provinceService.create(createProvinceInput);
    this.provinces.items.push(result);
  }

  @action
  async update(updateProvinceInput: UpdateProvinceInput) {
    let result = await provinceService.update(updateProvinceInput);
    this.provinces.items = this.provinces.items.map((x: GetProvinceOutput) => {
      if (x.id === updateProvinceInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await provinceService.delete(entityDto);
    this.provinces.items = this.provinces.items.filter((x: GetProvinceOutput) => Number(x.id )!== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await provinceService.get(entityDto);
    this.editProvince = result;
  }

  @action
  async createProvince() {
    this.editProvince = {
      id: '',
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      provinceName: '',
      provinceDescription: '',
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedProvinceResultRequestDto) {
    let result = await provinceService.getAll(pagedFilterAndSortedRequest);
    this.provinces = result;
  }
}

export default ProvinceStore;
