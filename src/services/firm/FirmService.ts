import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateFirmInput } from './dto/createOrUpdateFirmInput';
import { GetAllFirmOutput } from './dto/getAllFirmOutput';
import { PagedFirmResultRequestDto } from './dto/PagedFirmResultRequestDto';
import { UpdateFirmInput } from './dto/updateFirmInput';

class FirmService {
  public async create(createFirmInput: CreateOrUpdateFirmInput) {
    let result = await http.post('api/services/app/Firm/Create', createFirmInput);
    return result.data.result;
  }

  public async update(updateFirmInput: UpdateFirmInput) {
    let result = await http.put('api/services/app/Firm/Update', updateFirmInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Firm/Delete', { params: entityDto });
    return result.data;
  }

  public async getTimeZone() {
    let result = await http.post('/api/services/app/ApplicationTimeZone/TimeZoneList');
    return result.data.result.items;
  }  
  
  public async getCities() {
    let result = await http.get('/api/services/app/Firm/GetCityComboboxItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateFirmInput> {
    let result = await http.get('api/services/app/Firm/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedFirmResultRequestDto): Promise<PagedResultDto<GetAllFirmOutput>> {
    let result = await http.get('api/services/app/Firm/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new FirmService();
