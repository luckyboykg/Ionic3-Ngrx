import { AddressBook } from '../models/address-book.model';
import { Action } from '@ngrx/store';

export const LOADING = 'Address Book Load';

export const SEARCH = 'Address Book Search';
export const SEARCH_DONE = 'Address Book Search Done';

export const GET_ADDRESS_BOOK_DETAIL = 'Get Address Book';
export const GET_ADDRESS_BOOK_DETAIL_DONE = 'Get Address Book Done';

export const ADD_ADDRESS_BOOK = 'Add Address Book';
export const ADD_ADDRESS_BOOK_DONE = 'Add Address Book Done';
export const EDIT_ADDRESS_BOOK = 'Edit Address Book';
export const EDIT_ADDRESS_BOOK_DONE = 'Edit Address Book Done';

export const EFFECT_ERROR = 'Effect Error';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: { searchTerms: string }) { }
}

export class SearchDone implements Action {
  readonly type = SEARCH_DONE;
  constructor(public payload: { addressBooks: AddressBook[] }) { }
}

export class GetAddressBookDetail implements Action {
  readonly type = GET_ADDRESS_BOOK_DETAIL;
  constructor(public payload: { id: string }) { }
}

export class GetAddressBookDetailDone implements Action {
  readonly type = GET_ADDRESS_BOOK_DETAIL_DONE;
  constructor(public payload: { addressBook: AddressBook }) { }
}

export class AddAddressBook implements Action {
  readonly type = ADD_ADDRESS_BOOK;
  constructor(public payload: { addressBook: AddressBook }) { }
}

export class AddAddressBookDone implements Action {
  readonly type = ADD_ADDRESS_BOOK_DONE;
  constructor() { }
}

export class EditAddressBook implements Action {
  readonly type = EDIT_ADDRESS_BOOK;
  constructor(public payload: { addressBook: AddressBook }) { }
}

export class EditAddressBookDone implements Action {
  readonly type = EDIT_ADDRESS_BOOK_DONE;
  constructor() { }
}


export class EffectError implements Action {
  readonly type = EFFECT_ERROR;
  constructor(public payload: { error: any }) { }
}

export type Actions =
  | Search
  | SearchDone
  | GetAddressBookDetail
  | GetAddressBookDetailDone
  | AddAddressBook
  | AddAddressBookDone
  | EditAddressBook
  | EditAddressBookDone;
