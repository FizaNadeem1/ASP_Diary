import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedPackageResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
