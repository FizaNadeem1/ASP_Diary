import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedCourtResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
