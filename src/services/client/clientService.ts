import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateClientInput } from './dto/createOrUpdateClientInput';
import { GetAllClientOutput } from './dto/getAllClientOutput';
import { PagedClientResultRequestDto } from './dto/PagedClientResultRequestDto';
import { UpdateClientInput } from './dto/updateClientInput';

class ClientService {
  public async create(createClientInput: CreateOrUpdateClientInput) {
    let result = await http.post('api/services/app/Client/Create', createClientInput);
    return result.data.result;
  }

  public async update(updateClientInput: UpdateClientInput) {
    let result = await http.put('api/services/app/Client/Update', updateClientInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Client/Delete', { params: entityDto });
    return result.data;
  }

  public async getCities() {
    let result = await http.get('/api/services/app/Tehsil/GetCityItems');
    return result.data.result.items;
  }
  public async getClientTypes() {
    let result = await http.get('/api/services/app/ClientType/GetAllClientTypeComboBoxItem');
    return result.data.result.items;
  }
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }
  public async getGender(){
    let result=[{
      value: '1',
      displayText: 'MALE',
      isSelected: false
    },{
      value: '2',
      displayText: 'FEMALE',
      isSelected: false
    },{
      value: '3',
      displayText: 'TRANSGENDER',
      isSelected: false
    },{
      value: '4',
      displayText: 'OTHER',
      isSelected: false
    }]
    return result
  }
  public async get(entityDto: EntityDto): Promise<CreateOrUpdateClientInput> {
    let result = await http.get('api/services/app/Client/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedClientResultRequestDto): Promise<PagedResultDto<GetAllClientOutput>> {
    let result = await http.get('api/services/app/Client/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new ClientService();
