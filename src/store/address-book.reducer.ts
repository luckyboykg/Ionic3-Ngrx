import * as UserActions from './address-book.actions';
import { TagsDetail } from '../models/tags-detail.model';
import { AddressBook } from '../models/address-book.model';

export interface AddressBookState {
  addressBookState: State;
}

export interface State {
  loading: boolean;
  searchTerms: string;
  addressBooks: AddressBook[];
  tagsDetail: TagsDetail;
  selectedAddressBook: AddressBook;
}

export const initialState: State = {
  loading: false,
  searchTerms: '',
  addressBooks: [],
  tagsDetail: null,
  selectedAddressBook: null
};

export function reducer(state = initialState, action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.SEARCH: {
      return {
        ...state,
        loading: true,
        searchTerms: action.payload.searchTerms
      };
    }
    case UserActions.SEARCH_DONE: {
      return {
        ...state,
        loading: false,
        addressBooks: action.payload.addressBooks,
        selectedAddressBook: null
      };
    }
    case UserActions.GET_ADDRESS_BOOK_DETAIL: {
      return {
        ...state,
        loading: true
      };
    }
    case UserActions.GET_ADDRESS_BOOK_DETAIL_DONE: {
      return {
        ...state,
        loading: false,
        selectedAddressBook: action.payload.addressBook
      };
    }

    case UserActions.ADD_ADDRESS_BOOK: {
      return {
        ...state,
        loading: true
      };
    }

    case UserActions.ADD_ADDRESS_BOOK_DONE: {
      return {
        ...state,
        loading: false
      };
    }

    case UserActions.EDIT_ADDRESS_BOOK: {
      return {
        ...state,
        loading: false,
        editedAddressBook: action.payload
      };
    }

    case UserActions.EDIT_ADDRESS_BOOK_DONE: {
      return {
        ...state,
        loading: false,
        editedAddressBook: null
      };
    }

    default: {
      return state;
    }
  }
}
