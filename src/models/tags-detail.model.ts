import { Tag } from './tag.model';

export interface TagsDetail {
  addressBookId: string;
  contactName: string;
  tags: Tag[];
}
