import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateCaseTypeInput } from './dto/createOrUpdateCaseTypeInput';
import { GetAllCaseTypeOutput } from './dto/getAllCaseTypeOutput';
import { PagedCaseTypeResultRequestDto } from './dto/PagedCaseTypeResultRequestDto';
import { UpdateCaseTypeInput } from './dto/updateCaseTypeInput';

class CaseTypeService {
  public async create(createCaseTypeInput: CreateOrUpdateCaseTypeInput) {
    let result = await http.post('api/services/app/CaseType/Create', createCaseTypeInput);
    return result.data.result;
  }

  public async update(updateCaseTypeInput: UpdateCaseTypeInput) {
    let result = await http.put('api/services/app/CaseType/Update', updateCaseTypeInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/CaseType/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCaseTypeInput> {
    let result = await http.get('api/services/app/CaseType/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCaseTypeResultRequestDto): Promise<PagedResultDto<GetAllCaseTypeOutput>> {
    let result = await http.get('api/services/app/CaseType/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new CaseTypeService();
