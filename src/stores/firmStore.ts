import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import FirmService from '../services/firm/FirmService';
import { GetTimeZone } from '../services/firm/dto/getTimeZoneOutput';
import { GetCities } from '../services/firm/dto/getCityOutput';
import type { GetFirmOutput } from '../services/firm/dto/getFirmOutput';
import type { UpdateFirmInput } from '../services/firm/dto/updateFirmInput';
import type { CreateOrUpdateFirmInput } from '../services/firm/dto/createOrUpdateFirmInput';
import type { PagedFirmResultRequestDto } from '../services/firm/dto/PagedFirmResultRequestDto';

class FirmStore {
  @observable firms!: PagedResultDto<GetFirmOutput>;
  @observable editFirm!: CreateOrUpdateFirmInput;
  @observable cities: GetCities[] = [];
  @observable timeZone: GetTimeZone[] = [];

  @action
  async create(createFirmInput: CreateOrUpdateFirmInput) {
    let result = await FirmService.create(createFirmInput);
    this.firms.items.push(result);
  }

  @action
  async update(updateFirmInput: UpdateFirmInput) {
    let result = await FirmService.update(updateFirmInput);
    this.firms.items = this.firms.items.map((x: GetFirmOutput) => {
      if (x.id === updateFirmInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await FirmService.delete(entityDto);
    this.firms.items = this.firms.items.filter((x: GetFirmOutput) => x.id !== entityDto.id);
  }

  @action
  async getCities() {
    let result = await FirmService.getCities();
    this.cities = result;
  }

  @action
  async getTimeZone() {
    let result = await FirmService.getTimeZone();
    this.timeZone = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await FirmService.get(entityDto);
    let sd={...result,cityId: result.cityId?.toString() ?? null,timeZone: result.timeZone?.toString() ?? null}
    this.editFirm = sd;
  }

  @action
  async createFirm() {
    this.editFirm = {
      id: 0,
      creationTime: new Date(0),
      trialEndTime: new Date(0),
      firmName: '',
      firmOwner: '',
      firmCode: '',
      firmContactNo: '',
      firmContactEmail: '',
      firmContactPerson: '',
      firmContactPersonNo: '',
      firmAdress: '',
      firmWesite: '',
      noOfBranches: 0,
      adminPanelAccess: true,
      noOfCases: 0,
      noOfLawyers: 0,
      cityNameCityName: '',
      cityId: null,
      applicationTimeZonesCountryTimeZone: '',
      timeZone: null,
      packageId: 0,
    };
    this.cities = [];
    this.timeZone = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedFirmResultRequestDto) {
    let result = await FirmService.getAll(pagedFilterAndSortedRequest);
    this.firms = result;
  }
}

export default FirmStore;
