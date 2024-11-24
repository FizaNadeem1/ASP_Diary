import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedBranchResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
