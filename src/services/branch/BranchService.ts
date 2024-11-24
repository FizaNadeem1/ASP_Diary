import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateBranchInput } from './dto/createOrUpdateBranchInput';
import { GetAllBranchOutput } from './dto/getAllBranchOutput';
import { PagedBranchResultRequestDto } from './dto/PagedBranchResultRequestDto';
import { UpdateBranchInput } from './dto/updateBranchInput';

class BranchService {
  public async create(createBranchInput: CreateOrUpdateBranchInput) {
    let result = await http.post('api/services/app/Branch/Create', createBranchInput);
    return result.data.result;
  }

  public async update(updateBranchInput: UpdateBranchInput) {
    let result = await http.put('api/services/app/Branch/Update', updateBranchInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Branch/Delete', { params: entityDto });
    return result.data;
  }

  public async getFirms() {
    let result = await http.get('/api/services/app/Branch/GetAllFirms');
    return result.data.result.items;
  }  
  
  public async getCities() {
    let result = await http.get('/api/services/app/City/GetCityItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateBranchInput> {
    let result = await http.get('api/services/app/Branch/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedBranchResultRequestDto): Promise<PagedResultDto<GetAllBranchOutput>> {
    let result = await http.get('api/services/app/Branch/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new BranchService();
