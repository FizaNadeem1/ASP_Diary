import { action, observable } from 'mobx';

import { EntityDto } from '../services/dto/entityDto';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetForumOutput } from '../services/forum/dto/getForumOutput';
import type { CreateOrUpdateForumInput } from '../services/forum/dto/createOrUpdateforumInput';
import forumService from '../services/forum/forumService';
import type { UpdateForumInput } from '../services/forum/dto/updateForumInput';
import type { PagedForumResultRequestDto } from '../services/forum/dto/PagedForumResultRequestDto';

class ForumStore {
  @observable forums!: PagedResultDto<GetForumOutput>;
  @observable editForum!: CreateOrUpdateForumInput;

  @action
  async create(createForumInput: CreateOrUpdateForumInput) {
    let result = await forumService.create(createForumInput);
    this.forums.items.push(result);
  }

  @action
  async update(updateForumInput: UpdateForumInput) {
    let result = await forumService.update(updateForumInput);
    this.forums.items = this.forums.items.map((x: GetForumOutput) => {
      if (x.id === updateForumInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await forumService.delete(entityDto);
    this.forums.items = this.forums.items.filter((x: GetForumOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await forumService.get(entityDto);
    this.editForum = result;
  }

  @action
  async createForum() {
    this.editForum = {
      forumName: '',
      forumDescription: '',
      id: 0
    };
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedForumResultRequestDto) {
    let result = await forumService.getAll(pagedFilterAndSortedRequest);
    this.forums = result;
  }
}

export default ForumStore;
