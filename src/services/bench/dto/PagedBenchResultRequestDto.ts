import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedBenchResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
