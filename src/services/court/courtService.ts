import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateCourtInput } from './dto/createOrUpdateCoutInput';
import { GetAllCourtOutput } from './dto/getAllCourtOutput';
import { PagedCourtResultRequestDto } from './dto/PagedCourtResultRequestDto';
import { UpdateCourtInput } from './dto/updateCourtInput';

class courtService {
  public async create(createCourtInput: CreateOrUpdateCourtInput) {
    let result = await http.post('api/services/app/Court/Create', createCourtInput);
    return result.data.result;
  }

  public async update(updateCourtInput: UpdateCourtInput) {
    let result = await http.put('api/services/app/Court/Update', updateCourtInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Court/Delete', { params: entityDto });
    return result.data;
  }

  public async getForums() {
    let result = await http.get('/api/services/app/Forum/GetForumComboboxItems');
    return result.data.result.items;
  }
  public async getProvinces() {
    let result = await http.get('/api/services/app/Division/GetProvinceItems');
    return result.data.result.items;
  }
  public async getDivisions() {
    let result = await http.get('/api/services/app/Division/GetDivisionComboboxItems');
    return result.data.result.items;
  }
  public async getForumCats() {
    let result = await http.get('/api/services/app/ForumCategory/GetForumCatComboBoxItems');
    return result.data.result.items;
  }
  public async getTehsils() {
    let result = await http.get('/api/services/app/Tehsil/GetTehsilComboboxItems');
    return result.data.result.items;
  }
  public async getCities() {
    let result = await http.get('/api/services/app/Tehsil/GetCityItems');
    return result.data.result.items;
  }
  public async getDivisionsByProvinceId(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/Division/GetDivisionComboboxItemsById', {params: entityDto});
    console.log('call hova ye by id vala',`/api/services/app/Division/GetDivisionComboboxItemsById'${result.data}`);
    return result.data.result.items;
  }
  public async getCityByDivisionId(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/City/GetCityComboboxItemsById', {params: entityDto});
    return result.data.result.items;
  }
  public async getTehsilByCityId(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/Tehsil/GetTehsilComboboxItemsById', {params: entityDto});
    return result.data.result.items;
  }
  public async getCategoryByForumId(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/ForumCategory/GetForumCatComboBoxItemsById', {params: entityDto});
    return result.data.result.items;
  }
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }
  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCourtInput> {
    let result = await http.get('api/services/app/Court/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedCourtResultRequestDto): Promise<PagedResultDto<GetAllCourtOutput>> {
    let result = await http.get('api/services/app/Court/GetAll', {params: pagedFilterAndSortedRequest});
    return result.data.result;
  }
}

export default new courtService();
