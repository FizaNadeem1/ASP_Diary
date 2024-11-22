import { CreateOrUpdateForumInput } from './dto/createOrUpdateforumInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllForumOutput } from './dto/getAllForumOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedForumResultRequestDto } from "./dto/PagedForumResultRequestDto";
import { UpdateForumInput } from './dto/updateForumInput';
import http from '../httpService';

class ForumService {
  public async create(createforumInput: CreateOrUpdateForumInput) {
    let result = await http.post('api/services/app/Forum/Create', createforumInput);
    return result.data.result;
  }

  public async update(updateForumInput: UpdateForumInput) {
    let result = await http.put('api/services/app/Forum/Update', updateForumInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Forum/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateForumInput> {
    let result = await http.get('api/services/app/Forum/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedForumResultRequestDto): Promise<PagedResultDto<GetAllForumOutput>> {
    let result = await http.get('api/services/app/Forum/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new ForumService();
