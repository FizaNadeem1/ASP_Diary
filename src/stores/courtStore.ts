import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetCourtOutput } from '../services/court/dto/getCourtOutput';
import type { CreateOrUpdateCourtInput } from '../services/court/dto/createOrUpdateCoutInput';
import { GetDivisions } from '../services/court/dto/getDivisionOutput';
import { GetTehsils } from '../services/court/dto/getTehsilOutput';
import { GetProvinces } from '../services/court/dto/getProvinceOutput';
import { GetForums } from '../services/court/dto/getForumOutput';
import { GetForumCategories } from '../services/court/dto/getForumCategoryOutput';
import { GetBranches } from '../services/court/dto/getBranchOutput';
import courtService from '../services/court/courtService';
import type { UpdateCourtInput } from '../services/court/dto/updateCourtInput';
import type { PagedCourtResultRequestDto } from '../services/court/dto/PagedCourtResultRequestDto';
import { GetCities } from '../services/court/dto/getCityOutput';

class CourtStore {
  @observable courts!: PagedResultDto<GetCourtOutput>;
  @observable editCourt!: CreateOrUpdateCourtInput;
  @observable divisions: GetDivisions[] = [];
  @observable cities: GetCities[] = [];
  @observable tehsils: GetTehsils[] = [];
  @observable provinces: GetProvinces[] = [];
  @observable forums: GetForums[] = [];
  @observable forumCats: GetForumCategories[] = [];
  @observable branches: GetBranches[] = [];
  @observable selectedProvince :string=''
  @observable selectedDivision :string=''
  @observable selectedCity :string=''

  @action
  async create(createCourtInput: CreateOrUpdateCourtInput) {
    let result = await courtService.create(createCourtInput);
    this.courts.items.push(result);
  }

  @action
  async update(updateCourtInput: UpdateCourtInput) {
    let result = await courtService.update(updateCourtInput);
    this.courts.items = this.courts.items.map((x: GetCourtOutput) => {
      if (x.id === updateCourtInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await courtService.delete(entityDto);
    this.courts.items = this.courts.items.filter((x: GetCourtOutput) => x.id !== entityDto.id);
  }
  @action
  async getDivisionsByProvinceId(entityDto: EntityDto) {
    let result = await courtService.getDivisionsByProvinceId(entityDto);
    this.divisions = result;
    this.cities=[]
  }
  @action
  async getCityByDivisionId(entityDto: EntityDto) {
    let result = await courtService.getCityByDivisionId(entityDto);
    this.cities = result;
    this.tehsils=[]
  }
  @action
  async getTehsilByCityId(entityDto: EntityDto) {
    let result = await courtService.getTehsilByCityId(entityDto);
    this.tehsils = result;
  }

  @action
  async getDivisions() {
    let result = await courtService.getDivisions();
    this.divisions = result;
  }
  @action
  async getCities() {
    let result = await courtService.getCities();
    this.cities = result;
  }
  @action
  async getProvinces() {
    let result = await courtService.getProvinces();
    this.provinces = result;
  }
  @action
  async getTehsils() {
    let result = await courtService.getTehsils();
    this.tehsils = result;
  }
  @action
  async getForums() {
    let result = await courtService.getForums();
    this.forums = result;
  }
  @action
  async getForumCats() {
    let result = await courtService.getForumCats();
    this.forumCats = result;
  }
  @action
  async getBranches() {
    let result = await courtService.getBranches();
    this.branches = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await courtService.get(entityDto);
    let sd={...result,branchId: result.branchId?.toString() ?? null,forumCatId: result.forumCatId?.toString() ?? null,cityId: result.cityId?.toString() ?? null,divisionId: result.divisionId?.toString() ?? null,forumId: result.forumId?.toString() ?? null,tehsilId: result.tehsilId?.toString() ?? null}
    this.editCourt = sd;
  }

  @action
  async createCourt() {
    this.editCourt = {
      id: 0,
      creationTime: new Date(0),
      creatorUserId: 0,
      lastModificationTime: new Date(0),
      lastModifierUserId: 0,
      courtCode: ' ',
      courtDescription: ' ',
      courtNumber: ' ',
      courtReader: ' ',
      courtReaderNumber: ' ',
      courtReaderEmail: '',
      courtAhlmed: ' ',
      courtAhlmedNumber: ' ',
      courtAhlmedEmail: '',
      forumForumName: ' ',
      forumId: null,
      forumCategoryForumCategoryName: ' ',
      forumCatId: null,
      provinceProvinceName: ' ',
      provinceId: '',
      divisionDivisionName: ' ',
      divisionId: null,
      cityCityName: ' ',
      cityId: null,
      tehsilTehsilName: ' ',
      tehsilId: null,
      branchBranchName: ' ',
      branchId: null,
    };
    this.divisions = [];
    this.cities = [];
    this.tehsils = [];
    this.provinces = [];
    this.forums = [];
    this.forumCats = [];
    this.branches = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCourtResultRequestDto) {
    let result = await courtService.getAll(pagedFilterAndSortedRequest);
    this.courts = result;
  }
}

export default CourtStore;
