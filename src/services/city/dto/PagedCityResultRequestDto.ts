import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedCityResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
