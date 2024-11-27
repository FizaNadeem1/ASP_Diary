import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedClientResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
