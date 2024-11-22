export interface CreateOrUpdateCategoryInput {
  id: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  forumCategoryName: string;
  forumId: number;
  normalizedName: string;
  grantedPermissions: string[];
  forumName?: string;
  forumNameForumName?: string;
}
