import { CreateOrUpdateLitigantTypeInput } from './dto/createOrUpdateLitigantTypeInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllLitigantTypeOutput } from './dto/getAllLitigantTypeOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { UpdateLitigantTypeInput } from './dto/updateLitigantTypeInput';
import http from '../httpService';
import { PagedLitigantTypeResultRequestDto } from './dto/PagedLitigantTypeResultRequestDto';

class LitigantTypeService {
  public async create(createLitigantTypeInput: CreateOrUpdateLitigantTypeInput) {
    let result = await http.post('api/services/app/LitigantTypeUpdated/Create', createLitigantTypeInput);
    return result.data.result;
  }

  public async update(updateLitigantTypeInput: UpdateLitigantTypeInput) {
    let result = await http.put('api/services/app/LitigantTypeUpdated/Update', updateLitigantTypeInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/LitigantTypeUpdated/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('api/services/app/LitigantTypeUpdated/GetRoles');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateLitigantTypeInput> {
    let result = await http.get('api/services/app/LitigantTypeUpdated/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedLitigantTypeResultRequestDto): Promise<PagedResultDto<GetAllLitigantTypeOutput>> {
    let result = await http.get('api/services/app/LitigantTypeUpdated/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new LitigantTypeService();
