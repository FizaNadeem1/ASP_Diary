import { CreateOrUpdateCategoryInput } from './dto/createOrUpdateCategoryInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllCategoryOutput } from './dto/getAllCategoryOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedCategoryResultRequestDto } from "./dto/PagedCategoryResultRequestDto";
import { UpdateCategoryInput } from './dto/updateCategoryInput';
import http from '../httpService';

class ForumCategoryService {
  public async create(createCategoryInput: CreateOrUpdateCategoryInput) {
    let result = await http.post('api/services/app/ForumCategory/Create', createCategoryInput);
    return result.data.result;
  }

  public async update(updateCategoryInput: UpdateCategoryInput) {
    let result = await http.put('api/services/app/ForumCategory/Update', updateCategoryInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/ForumCategory/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCategoryInput> {
    let result = await http.get('api/services/app/ForumCategory/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCategoryResultRequestDto): Promise<PagedResultDto<GetAllCategoryOutput>> {
    let result = await http.get('api/services/app/ForumCategory/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new ForumCategoryService();
