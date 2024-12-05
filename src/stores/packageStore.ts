import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import packageService from '../services/package/packageService';
import type { PagedPackageResultRequestDto } from '../services/package/dto/PagedPackageResultRequestDto';
import { GetPackageOutput } from '../services/package/dto/getPackageOutput';
import type { UpdatePackageInput } from '../services/package/dto/updatePackageInput';
import type { CreateOrUpdatePackageInput } from '../services/package/dto/createOrUpdatePackageInput';

class PackageStore {
  @observable packages!: PagedResultDto<GetPackageOutput>;
  @observable editPackage!: CreateOrUpdatePackageInput;

  @action
  async create(createPackageInput: CreateOrUpdatePackageInput) {
    let result = await packageService.create(createPackageInput);
    this.packages.items.push(result);
  }

  @action
  async update(updatePackageInput: UpdatePackageInput) {
    let result = await packageService.update(updatePackageInput);
    this.packages.items = this.packages.items.map((x: GetPackageOutput) => {
      if (x.id === updatePackageInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await packageService.delete(entityDto);
    this.packages.items = this.packages.items.filter((x: GetPackageOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await packageService.get(entityDto);
    this.editPackage = result;
  }

  @action
  async createPackage() {
    this.editPackage = {
      "id": 0,
      "creationTime":new Date(),
      "creatorUserId": 0,
      "lastModificationTime": new Date(),
      "lastModifierUserId": 0,
      "packageName": '',
      "courtBench": '',
      "clientRegister": '',
      "lawyerRegister": '',
      "caseRegister": '',
      "proceedings": '',
      "causeList": '',
      "reporting": '',
      "adminPanel": '',
      "usersRegistration": '',
      "rolesManage": '',
      "firmRegistration": '',
      "branchRegistration": '',
      "whiteListing": '',
      "price": '',
      "exactPrice": '',
      "isMonthly": true,
      "details": '',
      "sms": '',
      "masking": '',
      "excelPdfData": '',
      "smsServiceCharges": ''

    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedPackageResultRequestDto) {
    let result = await packageService.getAll(pagedFilterAndSortedRequest);
    this.packages = result;
  }
}

export default PackageStore;
