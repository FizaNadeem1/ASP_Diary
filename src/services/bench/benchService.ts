import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateBenchInput } from './dto/createOrUpdateBenchInput';
import { GetAllBenchOutput } from './dto/getAllBenchOutput';
import { PagedBenchResultRequestDto } from './dto/PagedBenchResultRequestDto';
import { UpdateBenchInput } from './dto/updateBenchInput';

class BenchService {
  public async create(createBenchInput: CreateOrUpdateBenchInput) {
    let result = await http.post('api/services/app/Bench/Create', createBenchInput);
    return result.data.result;
  }

  public async update(updateBenchInput: UpdateBenchInput) {
    let result = await http.put('api/services/app/Bench/Update', updateBenchInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Bench/Delete', { params: entityDto });
    return result.data;
  }

  public async getBenchOfficers(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/Bench/GetBenchMasterDetailForEdit',{ params: entityDto });
    return result.data.result;
  }  
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }  
  public async getCourts() {
    let result = await http.get('/api/services/app/Court/GetAllCourtsItems');
    return result.data.result.items;
  }  
  public async getPresidingOfficers() {
    let result = await http.get('/api/services/app/PresidingOfficer/GetAllPresidingOfficerItems');
    return result.data.result.items;
  }  
  public async get(entityDto: EntityDto): Promise<CreateOrUpdateBenchInput> {
    let result = await http.get('api/services/app/Bench/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedBenchResultRequestDto): Promise<PagedResultDto<GetAllBenchOutput>> {
    let result = await http.get('api/services/app/Bench/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new BenchService();
