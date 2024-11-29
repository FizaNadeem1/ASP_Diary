import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateTehsilInput } from './dto/createOrUpdateTehsilInput';
import { GetAllTehsilOutput } from './dto/getAllTehsilOutput';
import { PagedTehsilResultRequestDto } from './dto/PagedTehsilResultRequestDto';
import { UpdateTehsilInput } from './dto/updateTehsilInput';

class TehsilService {
  public async create(createTehsilInput: CreateOrUpdateTehsilInput) {
    let result = await http.post('api/services/app/Tehsil/Create', createTehsilInput);
    return result.data.result;
  }

  public async update(updateTehsilInput: UpdateTehsilInput) {
    let result = await http.put('api/services/app/Tehsil/Update', updateTehsilInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Tehsil/Delete', { params: entityDto });
    return result.data;
  }

  public async getCities() {
    let result = await http.get('/api/services/app/City/GetCityItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateTehsilInput> {
    let result = await http.get('api/services/app/Tehsil/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedTehsilResultRequestDto): Promise<PagedResultDto<GetAllTehsilOutput>> {
    let result = await http.get('api/services/app/Tehsil/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new TehsilService();
