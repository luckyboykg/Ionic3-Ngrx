import { Tag } from './tag.model';

export interface AddressBook {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  linkedIn: string;
  skype: string;
  tags: Tag[];
}
