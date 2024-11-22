export interface CreateForumOutputItem {
  forumName: string;
  forumDescription: string;
  creatorUserId: number;
  lastModifierUserId: number;
  creationTime: Date;
  lastModificationTime: Date;
  id: number;
}

export interface CreateForumOutput {
  result: CreateForumOutputItem;
}
