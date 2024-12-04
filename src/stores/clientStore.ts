import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import clientService from '../services/client/clientService';
import { GetClientOutput } from '../services/client/dto/getClientOutput';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import type { CreateOrUpdateClientInput } from '../services/client/dto/createOrUpdateClientInput';
import type { UpdateClientInput } from '../services/client/dto/updateClientInput';
import type { PagedClientResultRequestDto } from '../services/client/dto/PagedClientResultRequestDto';
import { GetCities } from '../services/client/dto/getCityOutput';
import { GetBranches } from '../services/client/dto/getBranchOutput';
import { GetClientTypes } from '../services/client/dto/getClientTypeOutput';
import { GetGender } from '../services/client/dto/getGenderOutput';
import moment from 'moment';

class ClientStore {
  @observable clients!: PagedResultDto<GetClientOutput>;
  @observable editClient!: CreateOrUpdateClientInput;
  @observable cities: GetCities[] = [];
  @observable branches: GetBranches[] = [];
  @observable clientTypes: GetClientTypes[] = [];
  @observable clientGender: GetGender[] = [];
  @observable clientTypeName:string=''

  @action
  async create(createClientInput: CreateOrUpdateClientInput) {
    console.log("client create values in store",createClientInput)
    let newObj={...createClientInput,clientTypeName:this.clientTypeName}
    let result = await clientService.create(newObj);
    this.clients.items.push(result);
  }

  @action
  async update(updateClientInput: UpdateClientInput) {
    let result = await clientService.update(updateClientInput);
    this.clients.items = this.clients.items.map((x: GetClientOutput) => {
      if (x.id === updateClientInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await clientService.delete(entityDto);
    this.clients.items = this.clients.items.filter((x: GetClientOutput) => x.id !== entityDto.id);
  }

  @action
  async getClientTypes() {
    let result = await clientService.getClientTypes();
    this.clientTypes = result;
  }
  @action
  async getCities() {
    let result = await clientService.getCities();
    this.cities = result;
  }
  @action
  async getBranches() {
    let result = await clientService.getBranches();
    this.branches = result;
  }

  @action
  async getGender(){
    let result=await clientService.getGender()
    this.clientGender=result
  }
  @action
  async get(entityDto: EntityDto) {
    let result = await clientService.get(entityDto);
    let sd={...result,branchId: result.branchId?.toString() ?? null,clientTypeId: result.clientTypeId?.toString() ?? null,cityId: result.cityId?.toString() ?? null}
    this.editClient = sd;
  }

  @action
  async createClient() {
    this.editClient = {
      id: 0,
      creationTime: moment(0),
      creatorUserId: 0,
      lastModificationTime: moment(0),
      lastModifierUserId: 0,
      clientCode: '',
      clientTypeName: '',
      clientName: '',
      clientFatherName: '',
      clientHusbandName: '',
      clientAdress: '',
      clientCNIC: '',
      clientMobile: '',
      clientGender: '',
      clientPhotoPath: '',
      clientDOB: moment(0),
      clientRegDate: moment(0),
      clientFirmCode: '',
      clientFirmNTN: '',
      clientFirmSTR: '',
      clientFirmContactPer: '',
      clientFirmContactPerNo: '',
      cityCityName: '',
      cityId: null,
      branchBranchName: '',
      branchId: null,
      clientTypeClientTypeName: '',
      clientTypeId: null,
    };
    this.branches = [];
    this.cities = [];
    this.clientTypes = [];
    this.clientGender = [];
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedClientResultRequestDto) {
    let result = await clientService.getAll(pagedFilterAndSortedRequest);
    this.clients = result;
  }
}

export default ClientStore;
