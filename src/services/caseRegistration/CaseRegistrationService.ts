import { EntityDto } from '../dto/entityDto';
import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { CreateCaseBenchInput } from './dto/createCaseBenchInput';
import { CreateCaseLawyerInput } from './dto/createCaseLawyerInput';
import { CreateOrUpdateCaseRegistrationInput } from './dto/createOrUpdateCaseRegistrationut';
import { GetAllCaseRegistrationOutput } from './dto/getAllCaseRegistrationOutput';
import { GetCaseRegistrationByIdOutput } from './dto/getCaseRegistrationByIdOutput';
import { PagedCaseRegistrationResultRequestDto } from './dto/PagedCaseRegistrationResultRequestDto';
import { UpdateCaseRegistrationInput } from './dto/updateCaseRegistrationInput';

class CaseRegistrationService {
  public async create(createCaseRegistrationInput: CreateOrUpdateCaseRegistrationInput) {
    let result = await http.post('api/services/app/CaseMain/Create', createCaseRegistrationInput);
    return result.data.result;
  }

  public async update(updateCaseRegistrationInput: UpdateCaseRegistrationInput) {
    let result = await http.put('api/services/app/CaseMain/Update', updateCaseRegistrationInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/CaseMain/Delete', { params: entityDto });
    return result.data;
  }

  public async getByMainId(entityDto: EntityDto): Promise<GetCaseRegistrationByIdOutput> {
    let result = await http.get('/api/services/app/CaseMain/GetCaseMainById', { params: entityDto });
    return result.data.result;
  }
  public async createCB(createCaseBenchInput: CreateCaseBenchInput) {
    let result = await http.post('/api/services/app/CB/Create', createCaseBenchInput);
    return result.data.result;
  }
  public async createCL(createCaseLawyerInput: CreateCaseLawyerInput) {
    let result = await http.post('/api/services/app/CaseLawyer/Create', createCaseLawyerInput);
    return result.data.result;
  }
  public async getCaseBenchList(keyword: String) {
    let result = await http.get('/api/services/app/CB/GetAllCaseBench',{ params: {keyword:keyword} });
    return result.data.result.items;
  } 
  public async getCaseLawyersList(keyword: String) {
    let result = await http.get('/api/services/app/CaseLawyer/GetAllCaseLawyer',{ params: {keyword:keyword} });
    return result.data.result.items;
  } 
  public async getBranches() {
    let result = await http.get('/api/services/app/Branch/GetBranchComboboxItems');
    return result.data.result.items;
  }  
  public async getBenches() {
    let result = await http.get('/api/services/app/Bench/GetBenchComboboxItem');
    return result.data.result.items;
  }
  public async getSecondParty() {
    let result = await http.get('/api/services/app/LitigantType/GetLitigantTypeDefandantComboBoxItems');
    return result.data.result.items;
  }  public async getFirstParty() {
    let result = await http.get('/api/services/app/LitigantType/GetLitigantTypePlantiffComboBoxItems');
    return result.data.result.items;
  }  public async getLawyers() {
    let result = await http.get('/api/services/app/Lawyer/GetAllLawyersComboboxItem');
    return result.data.result.items;
  }  public async getCaseTypes() {
    let result = await http.get('/api/services/app/CaseType/GetAllCaseTypeComboboxItem');
    return result.data.result.items;
  }  public async getClients() {
    let result = await http.get('/api/services/app/Client/GetClientComboboxItem');
    return result.data.result.items;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateCaseRegistrationInput> {
    let result = await http.get('api/services/app/CaseMain/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedCaseRegistrationResultRequestDto): Promise<PagedResultDto<GetAllCaseRegistrationOutput>> {
    let result = await http.get('api/services/app/CaseMain/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new CaseRegistrationService();
