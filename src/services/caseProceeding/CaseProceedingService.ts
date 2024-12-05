import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateOrUpdateCaseProceedingInput } from './dto/createOrUpdateCaseProceedingInput';
import { GetAllCaseProceedingOutput } from './dto/getAllCaseProceedingOutput';
import { PagedCaseProceedingResultRequestDto } from './dto/PagedCaseProceedingResultRequestDto';
import { UpdateCaseProceedingInput } from './dto/updateCaseProceedingInput';

class CaseProceedingService {
  public async create(createCaseProceedingInput: CreateOrUpdateCaseProceedingInput) {
    let result = await http.post('api/services/app/CaseProceeding/Create', createCaseProceedingInput);
    return result.data.result;
  }

  public async update(updateCaseProceedingInput: UpdateCaseProceedingInput) {
    let result = await http.put('api/services/app/CaseProceeding/Update', updateCaseProceedingInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/CaseProceeding/Delete', { params: entityDto });
    return result.data;
  }
  public async getCaseDataByCaseNo(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/CaseProceeding/GetCaseDataByCaseNo', { params: entityDto });
    return result.data.result;
  } 
  public async getCaseProceedingForEdit(entityDto: EntityDto) {
    let result = await http.get('/api/services/app/CaseProceeding/GetCaseProceedingForEdit',{ params: entityDto });
    return result.data.result;
  } 
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }  
  
  public async getProceedings() {
    let result = await http.get('/api/services/app/ProceedingsStatus/GetAllProceedingsStatusItems');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCaseProceedingInput> {
    let result = await http.get('api/services/app/CaseProceeding/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCaseProceedingResultRequestDto): Promise<PagedResultDto<GetAllCaseProceedingOutput>> {
    let result = await http.get('api/services/app/CaseProceeding/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new CaseProceedingService();
