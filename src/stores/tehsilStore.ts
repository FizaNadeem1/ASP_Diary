import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import tehsilService from '../services/tehsil/tehsilService';
import { GetCities } from '../services/tehsil/dto/getCityOutput';
import type { GetTehsilOutput } from '../services/tehsil/dto/getTehsilOutput';
import type { UpdateTehsilInput } from '../services/tehsil/dto/updateTehsilInput';
import type { CreateOrUpdateTehsilInput } from '../services/tehsil/dto/createOrUpdateTehsilInput';
import type { PagedTehsilResultRequestDto } from '../services/tehsil/dto/PagedTehsilResultRequestDto';

class TehsilStore {
  @observable tehsils!: PagedResultDto<GetTehsilOutput>;
  @observable editTehsil!: CreateOrUpdateTehsilInput;
  @observable cities: GetCities[] = [];

  @action
  async create(createTehsilInput: CreateOrUpdateTehsilInput) {
    let result = await tehsilService.create(createTehsilInput);
    this.tehsils.items.push(result);
  }

  @action
  async update(updateTehsilInput: UpdateTehsilInput) {
    let result = await tehsilService.update(updateTehsilInput);
    this.tehsils.items = this.tehsils.items.map((x: GetTehsilOutput) => {
      if (x.id === updateTehsilInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await tehsilService.delete(entityDto);
    this.tehsils.items = this.tehsils.items.filter((x: GetTehsilOutput) => x.id !== entityDto.id);
  }

  @action
  async getCities() {
    let result = await tehsilService.getCities();
    this.cities = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await tehsilService.get(entityDto);
    this.editTehsil = result;
  }

  @action
  async createTehsil() {
    this.editTehsil = {
      id: 0,
      creationTime: new Date(),
      creatorUserId: 0,
      lastModificationTime: new Date(),
      lastModifierUserId: 0,
      tehsilName: '',
      cityName: {
        id: 0,
        cityName: '',
        divisionName: {
          id: 0,
          creationTime: new Date(),
          creatorUserId: 0,
          lastModificationTime: new Date(),
          lastModifierUserId: 0,
          divisionName: '',
          divisionDescription: '',
          provinceName: {
            id: '',
            creationTime: new Date(),
            creatorUserId: 0,
            lastModificationTime: new Date(),
            lastModifierUserId: 0,
            provinceName: '',
            provinceDescription: '',
          },
          provinceId: '',
        },
        divisionId: 0,
      },
      cityNameCityName: '',
      cityId: 0,
    
    };
    this.cities = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedTehsilResultRequestDto) {
    let result = await tehsilService.getAll(pagedFilterAndSortedRequest);
    this.tehsils = result;
  }
}

export default TehsilStore;
