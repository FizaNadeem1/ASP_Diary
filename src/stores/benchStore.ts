import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import benchService from '../services/bench/benchService';
import type { PagedBenchResultRequestDto } from '../services/bench/dto/PagedBenchResultRequestDto';
import type { GetBenchOutput } from '../services/bench/dto/getBenchOutput';
import type { UpdateBenchInput } from '../services/bench/dto/updateBenchInput';
import type { CreateOrUpdateBenchInput } from '../services/bench/dto/createOrUpdateBenchInput';
import { GetBranches } from '../services/bench/dto/getBranchOutput';
import { GetCourts } from '../services/bench/dto/getCourtOutput';
import { GetPresidingOfficers } from '../services/bench/dto/getPresidingOfficerOutput';

class BenchStore {
  @observable benches!: PagedResultDto<GetBenchOutput>;
  @observable editBench!: CreateOrUpdateBenchInput;
  @observable branches: GetBranches[] = [];
  @observable courts: GetCourts[] = [];
  @observable presidingOfficers: GetPresidingOfficers[] = [];


  @action
  async create(createBenchInput: CreateOrUpdateBenchInput) {
    let result = await benchService.create(createBenchInput);
    this.benches.items.push(result);
  }

  @action
  async update(updateBenchInput: UpdateBenchInput) {
    let result = await benchService.update(updateBenchInput);
    this.benches.items = this.benches.items.map((x: GetBenchOutput) => {
      if (x.id === updateBenchInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await benchService.delete(entityDto);
    this.benches.items = this.benches.items.filter((x: GetBenchOutput) => x.id !== entityDto.id);
  }

  @action
  async getBranches() {
    let result = await benchService.getBranches();
    this.branches = result;
  }  @action
  async getCourts() {
    let result = await benchService.getCourts();
    this.courts = result;
  }  @action
  async getPresidingOfficers() {
    let result = await benchService.getPresidingOfficers();
    this.presidingOfficers = result;
  }
  @action
  async get(entityDto: EntityDto) {
    let result = await benchService.get(entityDto);
    this.editBench = result;
  }

  @action
  async createBench() {
    this.editBench = {
      id: 0,
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      branchId: null,
      courtId: null,
      benchCode: '',
      benchOfficerNo: 0,
      benchStartDate: new Date(0),
      benchEndDate: new Date(0),
      benchStatus: true,
      presidingOfficerId: null,
      officerList: [
        {
          presidingOfficerId: 0,
          presidingOfficerName: '',
          branchId: 0,
          branchName: '',
          benchMainId: 0,
        }
      ],
      courtCourtCode: '',
      branchBranchName: '',    
    };
    this.branches = [];
    this.courts = [];
    this.presidingOfficers = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedBenchResultRequestDto) {
    let result = await benchService.getAll(pagedFilterAndSortedRequest);
    this.benches = result;
  }
}

export default BenchStore;
