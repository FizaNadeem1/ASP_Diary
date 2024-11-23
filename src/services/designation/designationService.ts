import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateDesignationInput } from './dto/createOrUpdateDesignationInput';
import { GetAllDesignationOutput } from './dto/getAllDesignationOutput';
import { PagedDesignationResultRequestDto } from './dto/PagedDesignationResultRequestDto';
import { UpdateDesignationInput } from './dto/updateDesignationInput';

class DesignationService {
  public async create(createDesignationInput: CreateOrUpdateDesignationInput) {
    let result = await http.post('api/services/app/Designation/Create', createDesignationInput);
    return result.data.result;
  }

  public async update(updateDesignationInput: UpdateDesignationInput) {
    let result = await http.put('api/services/app/Designation/Update', updateDesignationInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Designation/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/Designation/GetRoles');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateDesignationInput> {
    let result = await http.get('api/services/app/Designation/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedDesignationResultRequestDto): Promise<PagedResultDto<GetAllDesignationOutput>> {
    let result = await http.get('api/services/app/Designation/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new DesignationService();
