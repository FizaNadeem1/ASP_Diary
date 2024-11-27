import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateDivisionInput } from './dto/createOrUpdateDivisionInput';
import { GetAllDivisionOutput } from './dto/getAllDivisionOutput';
import { PagedDivisionResultRequestDto } from './dto/PagedDivisionResultRequestDto';
import { UpdateDivisionInput } from './dto/updateDivisionInput';

class DivisionService {
  public async create(createDivisionInput: CreateOrUpdateDivisionInput) {
    let result = await http.post('api/services/app/Division/Create', createDivisionInput);
    return result.data.result;
  }

  public async update(updateDivisionInput: UpdateDivisionInput) {
    let result = await http.put('api/services/app/Division/Update', updateDivisionInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Division/Delete', { params: entityDto });
    return result.data;
  }

  public async getProvinces() {
    let result = await http.get('/api/services/app/Province/GetProvinceItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateDivisionInput> {
    let result = await http.get('api/services/app/Division/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedDivisionResultRequestDto): Promise<PagedResultDto<GetAllDivisionOutput>> {
    let result = await http.get('api/services/app/Division/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new DivisionService();
