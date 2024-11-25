import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedFirmResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
