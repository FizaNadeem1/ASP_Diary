import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateLawyerInput } from './dto/createOrUpdateLawyerInput';
import { GetAllLawyerOutput } from './dto/getAllLawyerOutput';
import { PagedLawyerResultRequestDto } from './dto/PagedLawyerResultRequestDto';
import { UpdateLawyerInput } from './dto/updateLawyerInput';

class LawyerService {
  public async create(createLawyerInput: CreateOrUpdateLawyerInput) {
    let result = await http.post('api/services/app/Lawyer/Create', createLawyerInput);
    return result.data.result;
  }

  public async update(updateLawyerInput: UpdateLawyerInput) {
    let result = await http.put('api/services/app/Lawyer/Update', updateLawyerInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Lawyer/Delete', { params: entityDto });
    return result.data;
  }

  public async getSpecialities() {
    let result = await http.get('/api/services/app/Lawyer/GetLawyerSpeacialityListItems');
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
  public async getTehsils() {
    let result = await http.get('/api/services/app/Tehsil/GetTehsilComboboxItems');
    return result.data.result.items;
  }
  public async getCities() {
    let result = await http.get('/api/services/app/Tehsil/GetCityItems');
    return result.data.result.items;
  }
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }
  public async get(entityDto: EntityDto): Promise<CreateOrUpdateLawyerInput> {
    let result = await http.get('api/services/app/Lawyer/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedLawyerResultRequestDto
  ): Promise<PagedResultDto<GetAllLawyerOutput>> {
    let result = await http.get('api/services/app/Lawyer/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }
}

export default new LawyerService();
