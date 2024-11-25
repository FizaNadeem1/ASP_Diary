import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateCityInput } from './dto/createOrUpdateCityInput';
import { GetAllCityOutput } from './dto/getAllCityOutput';
import { PagedCityResultRequestDto } from './dto/PagedCityResultRequestDto';
import { UpdateCityInput } from './dto/updateCityInput';

class CityService {
  public async create(createCityInput: CreateOrUpdateCityInput) {
    let result = await http.post('api/services/app/City/Create', createCityInput);
    return result.data.result;
  }

  public async update(updateCityInput: UpdateCityInput) {
    let result = await http.put('api/services/app/City/Update', updateCityInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/City/Delete', { params: entityDto });
    return result.data;
  }

  public async getDivisions() {
    let result = await http.get('/api/services/app/Division/GetDivisionComboboxItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCityInput> {
    let result = await http.get('api/services/app/City/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCityResultRequestDto): Promise<PagedResultDto<GetAllCityOutput>> {
    let result = await http.get('api/services/app/City/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new CityService();
