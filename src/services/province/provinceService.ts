import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateProvinceInput } from './dto/createOrUpdateProvinceInput';
import { GetAllProvinceOutput } from './dto/getAllProvinceOutput';
import { PagedProvinceResultRequestDto } from './dto/PagedProvinceResultRequestDto';
import { UpdateProvinceInput } from './dto/updateProvinceInput';

class ProvinceService {
  public async create(createProvinceInput: CreateOrUpdateProvinceInput) {
    let result = await http.post('api/services/app/Province/Create', createProvinceInput);
    return result.data.result;
  }

  public async update(updateProvinceInput: UpdateProvinceInput) {
    let result = await http.put('api/services/app/Province/Update', updateProvinceInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Province/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateProvinceInput> {
    let result = await http.get('api/services/app/Province/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedProvinceResultRequestDto): Promise<PagedResultDto<GetAllProvinceOutput>> {
    let result = await http.get('api/services/app/Province/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new ProvinceService();
