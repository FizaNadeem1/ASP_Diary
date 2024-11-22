export interface CreateCategoryOutputItem {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  forumCategoryName: string;
  forumName: string;
  forumNameForumName: string;
  forumId: 0;
}

export interface CreateCategoryOutput {
  result: CreateCategoryOutputItem;
}
