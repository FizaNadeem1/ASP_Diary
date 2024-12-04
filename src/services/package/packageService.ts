import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdatePackageInput } from './dto/createOrUpdatePackageInput';
import { GetAllPackageOutput } from './dto/getAllPackageOutput';
import { PagedPackageResultRequestDto } from './dto/PagedPackageResultRequestDto';
import { UpdatePackageInput } from './dto/updatePackageInput';

class PackageService {
  public async create(createPackageInput: CreateOrUpdatePackageInput) {
    let result = await http.post('api/services/app/Package/Create', createPackageInput);
    return result.data.result;
  }

  public async update(updatePackageInput: UpdatePackageInput) {
    let result = await http.put('api/services/app/Package/Update', updatePackageInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Package/Delete', { params: entityDto });
    return result.data;
  }

  public async getDivisions() {
    let result = await http.get('/api/services/app/Division/GetDivisionComboboxItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdatePackageInput> {
    let result = await http.get('api/services/app/Package/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedPackageResultRequestDto): Promise<PagedResultDto<GetAllPackageOutput>> {
    let result = await http.get('api/services/app/Package/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new PackageService();
