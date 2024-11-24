import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdatePresidingOfficerInput } from './dto/createOrUpdatePresidingOfficerput';
import { GetAllPresidingOfficerOutput } from './dto/getAllPresidingOfficerOutput';
import { PagedPresidingOfficerResultRequestDto } from './dto/PagedPresidingOfficerResultRequestDto';
import { UpdatePresidingOfficerInput } from './dto/updatePresidingOfficerInput';

class PresidingOfficerService {
  public async create(createPresidingOfficerInput: CreateOrUpdatePresidingOfficerInput) {
    let result = await http.post('api/services/app/PresidingOfficer/Create', createPresidingOfficerInput);
    return result.data.result;
  }

  public async update(updatePresidingOfficerInput: UpdatePresidingOfficerInput) {
    let result = await http.put('api/services/app/PresidingOfficer/Update', updatePresidingOfficerInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/PresidingOfficer/Delete', { params: entityDto });
    return result.data;
  }

  public async getDesignations() {
    let result = await http.get('/api/services/app/Designation/GetAllDesignationItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdatePresidingOfficerInput> {
    let result = await http.get('api/services/app/PresidingOfficer/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedPresidingOfficerResultRequestDto): Promise<PagedResultDto<GetAllPresidingOfficerOutput>> {
    let result = await http.get('api/services/app/PresidingOfficer/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new PresidingOfficerService();
