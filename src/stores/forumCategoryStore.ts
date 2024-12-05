import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetCategoryOutput } from '../services/forumCat/dto/getCategoryOutput';
import type { CreateOrUpdateCategoryInput } from '../services/forumCat/dto/createOrUpdateCategoryInput';
import type { UpdateCategoryInput } from '../services/forumCat/dto/updateCategoryInput';
import type { PagedCategoryResultRequestDto } from '../services/forumCat/dto/PagedCategoryResultRequestDto';
import ForumCategoryService from '../services/forumCat/forumCategoryService';
import { GetForums } from '../services/forumCat/dto/getForumOutput';

class ForumCategoryStore {
  @observable categories!: PagedResultDto<GetCategoryOutput>;
  @observable editCategory!: CreateOrUpdateCategoryInput;
  @observable forums: GetForums[] = [];

  @action
  async create(createCategoryInput: CreateOrUpdateCategoryInput) {
    let result = await ForumCategoryService.create(createCategoryInput);
    this.categories.items.push(result);
  }

  @action
  async update(updateCategoryInput: UpdateCategoryInput) {
    let result = await ForumCategoryService.update(updateCategoryInput);
    this.categories.items = this.categories.items.map((x: GetCategoryOutput) => {
      if (x.id === updateCategoryInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await ForumCategoryService.delete(entityDto);
    this.categories.items = this.categories.items.filter((x: GetCategoryOutput) => x.id !== entityDto.id);
  }

  @action
  async getForums() {
    let result = await ForumCategoryService.getForums();
    this.forums = result;
  }
  @action
  async get(entityDto: EntityDto) {
    let result = await ForumCategoryService.get(entityDto);
    let sd={...result,forumId:result.forumId?.toString()??null}
    this.editCategory = sd;
  }

  @action
  async createCategory() {
    this.editCategory = {
      forumCategoryName: '',
      forumName: '',
      forumNameForumName: '',
      forumId: null,
      lastModifierUserId: 0,
      lastModificationTime:  new Date(),
      creationTime:  new Date(),
      creatorUserId: 0,
      id: 0,
      normalizedName: '',
      grantedPermissions: []
    
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCategoryResultRequestDto) {
    let result = await ForumCategoryService.getAll(pagedFilterAndSortedRequest);
    this.categories = result;
  }

}

export default ForumCategoryStore;
