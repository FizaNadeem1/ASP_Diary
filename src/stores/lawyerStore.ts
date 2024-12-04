import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import lawyerService from '../services/lawyer/lawyerService';
import type { CreateOrUpdateLawyerInput } from '../services/lawyer/dto/createOrUpdateLawyerInput';
import type { UpdateLawyerInput } from '../services/lawyer/dto/updateLawyerInput';
import type { PagedLawyerResultRequestDto } from '../services/lawyer/dto/PagedLawyerResultRequestDto';
import { GetLawyerOutput } from '../services/lawyer/dto/getLawyerOutput';
import { GetCities } from '../services/lawyer/dto/getCityOutput';
import { GetBranches } from '../services/lawyer/dto/getBranchOutput';
import { GetDivisions } from '../services/lawyer/dto/getDivisionOutput';
import { GetTehsils } from '../services/lawyer/dto/getTehsilOutput';
import { GetProvinces } from '../services/lawyer/dto/getProvinceOutput';
import { GetSpecialities } from '../services/lawyer/dto/getSpecialityOutput';
import moment from 'moment';

class LawyerStore {
  @observable lawyers!: PagedResultDto<GetLawyerOutput>;
  @observable editLawyer!: CreateOrUpdateLawyerInput;
  @observable cities: GetCities[] = [];
  @observable branches: GetBranches[] = [];
  @observable speciality: GetSpecialities[] = [];
  @observable divisions: GetDivisions[] = [];
  @observable tehsils: GetTehsils[] = [];
  @observable provinces: GetProvinces[] = [];
  @observable selectedProvince :string=''
  @observable selectedDivision :string=''
  @observable selectedCity :string=''


  @action
  async create(createLawyerInput: CreateOrUpdateLawyerInput) {
    console.log("lawyer create values in store",createLawyerInput)
    let result = await lawyerService.create(createLawyerInput);
    this.lawyers.items.push(result);
  }

  @action
  async update(updateLawyerInput: UpdateLawyerInput) {
    let result = await lawyerService.update(updateLawyerInput);
    this.lawyers.items = this.lawyers.items.map((x: GetLawyerOutput) => {
      if (x.id === updateLawyerInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await lawyerService.delete(entityDto);
    this.lawyers.items = this.lawyers.items.filter((x: GetLawyerOutput) => x.id !== entityDto.id);
  }
  @action
  async getDivisionsByProvinceId(entityDto: EntityDto) {
    let result = await lawyerService.getDivisionsByProvinceId(entityDto);
    this.divisions = result;
    this.cities=[]
  }
  @action
  async getCityByDivisionId(entityDto: EntityDto) {
    let result = await lawyerService.getCityByDivisionId(entityDto);
    this.cities = result;
    this.tehsils=[]
  }
  @action
  async getTehsilByCityId(entityDto: EntityDto) {
    let result = await lawyerService.getTehsilByCityId(entityDto);
    this.tehsils = result;
  }
  @action
  async getSpecialities() {
    let result = await lawyerService.getSpecialities();
    this.speciality = result;
  }
  @action
  async getDivisions() {
    let result = await lawyerService.getDivisions();
    this.divisions = result;
  }
  @action
  async getCities() {
    let result = await lawyerService.getCities();
    this.cities = result;
  }
  @action
  async getProvinces() {
    let result = await lawyerService.getProvinces();
    this.provinces = result;
  }
  @action
  async getTehsils() {
    let result = await lawyerService.getTehsils();
    this.tehsils = result;
  }
  @action
  async getBranches() {
    let result = await lawyerService.getBranches();
    this.branches = result;
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await lawyerService.get(entityDto);
    let sd={...result,branchId: result.branchId?.toString() ?? null,cityId: result.cityId?.toString() ?? null,divisionId: result.divisionId?.toString() ?? null,lawyerSpeacialityId: result.lawyerSpeacialityId?.toString() ?? null,tehsilId: result.tehsilId?.toString() ?? null}
    this.editLawyer = sd;
  }

  @action
  async createLawyer() {
    this.editLawyer = {
      id: 0,
      creationTime: moment(0),
      creatorUserId: 0,
      lastModificationTime: moment(0),
      lastModifierUserId: 0,
      lawyerName: '',
      lawyerMobile: '',
      lawyerAdress: '',
      lawyerLiscene: '',
      lawyerNotes: '',
      lawyerStatus: true,
      lawyerPhotoPath: '',
      lawyerPracticingBar: '',
      lawyerLicRegDate: moment(0),
      lawyerLicExpDate: moment(0),
      lawyerFirmRegDate: moment(0),
      lawyerResigDate: moment(0),
      provinceId: '',
      provinceProvinceName: '',
      divisionId: null,
      cityId: null,
      cityCityName: '',
      tehsilId: null,
      lawyerSpeacialityId: null,
      lawyerSpeacialitySpeacialityName: '',
      branchId: null,
      branchBranchName: '',
      profileImage: '',
    
    };
    this.branches = [];
    this.cities = [];
    this.speciality = [];
    this.divisions = [];
    this.provinces = [];
    this.tehsils = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedLawyerResultRequestDto) {
    let result = await lawyerService.getAll(pagedFilterAndSortedRequest);
    this.lawyers = result;
  }
}

export default LawyerStore;
