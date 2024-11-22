import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedForumResultRequestDto extends PagedFilterAndSortedRequest  {
    keyword: string
}
