import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import cityService from '../services/city/cityService';
import { GetDivisions } from '../services/city/dto/getDivisionOutput';
import { GetCityOutput } from '../services/city/dto/getCityOutput';
import type { CreateOrUpdateCityInput } from '../services/city/dto/createOrUpdateCityInput';
import type { UpdateCityInput } from '../services/city/dto/updateCityInput';
import type { PagedCityResultRequestDto } from '../services/city/dto/PagedCityResultRequestDto';

class CityStore {
  @observable cities!: PagedResultDto<GetCityOutput>;
  @observable editCity!: CreateOrUpdateCityInput;
  @observable divisions: GetDivisions[] = [];

  @action
  async create(createCityInput: CreateOrUpdateCityInput) {
    let result = await cityService.create(createCityInput);
    this.cities.items.push(result);
  }

  @action
  async update(updateCityInput: UpdateCityInput) {
    let result = await cityService.update(updateCityInput);
    this.cities.items = this.cities.items.map((x: GetCityOutput) => {
      if (x.id === updateCityInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await cityService.delete(entityDto);
    this.cities.items = this.cities.items.filter((x: GetCityOutput) => x.id !== entityDto.id);
  }

  @action
  async getDivisions() {
    let result = await cityService.getDivisions();
    this.divisions = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await cityService.get(entityDto);
    let sd={...result,divisionId: result.divisionId?.toString() ?? null}
    this.editCity = sd;
  }

  @action
  async createCity() {
    this.editCity = {
      id: 0,
      cityName: '',
      divisionName: '',
      divisionNameDivisionName: '',
      provinceName: '',
      divisionId: null,
    };
    this.divisions = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCityResultRequestDto) {
    let result = await cityService.getAll(pagedFilterAndSortedRequest);
    this.cities = result;
  }
}

export default CityStore;
