import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import BranchService from '../services/branch/BranchService';
import { GetBranchOutput } from '../services/branch/dto/getBranchOutput';
import { GetCities } from '../services/branch/dto/getCityOutput';
import { GetFirms } from '../services/branch/dto/getFirmOutput';
import type { PagedBranchResultRequestDto } from '../services/branch/dto/PagedBranchResultRequestDto';
import type { UpdateBranchInput } from '../services/branch/dto/updateBranchInput';
import type { CreateOrUpdateBranchInput } from '../services/branch/dto/createOrUpdateBranchInput';

class BranchStore {
  @observable branches!: PagedResultDto<GetBranchOutput>;
  @observable editBranch!: CreateOrUpdateBranchInput;
  @observable cities: GetCities[] = [];
  @observable firms: GetFirms[] = [];

  @action
  async create(createBranchInput: CreateOrUpdateBranchInput) {
    let result = await BranchService.create(createBranchInput);
    this.branches.items.push(result);
  }

  @action
  async update(updateBranchInput: UpdateBranchInput) {
    let result = await BranchService.update(updateBranchInput);
    this.branches.items = this.branches.items.map((x: GetBranchOutput) => {
      if (x.id === updateBranchInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await BranchService.delete(entityDto);
    this.branches.items = this.branches.items.filter((x: GetBranchOutput) => x.id !== entityDto.id);
  }

  @action
  async getCities() {
    let result = await BranchService.getCities();
    this.cities = result;
  }

  @action
  async getFirms() {
    let result = await BranchService.getFirms();
    this.firms = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await BranchService.get(entityDto);
    this.editBranch = result;
  }

  @action
  async createBranch() {
    this.editBranch = {
      id: 0,
      creationTime: new Date(0),
      branchName: '',
      branchOwner: '',
      branchCode: '',
      branchContactNo: '',
      branchContactEmail: '',
      branchContactPerson: '',
      branchContactPersonNo: '',
      branchAdress: '',
      isActive: false,
      state: 0,
      cityCityName: '',
      cityId: null,
      firmFirmName: '',
      firmId: null,
    };
    this.cities = [];
    this.firms = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedBranchResultRequestDto) {
    let result = await BranchService.getAll(pagedFilterAndSortedRequest);
    this.branches = result;
  }
}

export default BranchStore;
