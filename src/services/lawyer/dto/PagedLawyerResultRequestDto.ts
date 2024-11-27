import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedLawyerResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
