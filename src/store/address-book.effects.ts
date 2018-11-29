import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as AddressBookActions from './address-book.actions';
import { AddressBookService } from '../services/address-book.service';

@Injectable()
export class AddressBookEffects {
  constructor(
    private actions$: Actions,
    private addressBookService: AddressBookService
  ) { }

  @Effect()
  searchAddressBook$: Observable<Action> = this.actions$.pipe(
    ofType(AddressBookActions.SEARCH),
    map((action: AddressBookActions.Search) => action.payload),
    switchMap(payload => {
      return this.addressBookService
        .searchAddressBooks(payload.searchTerms)
        .pipe(
          map(
            results =>
              new AddressBookActions.SearchDone({ addressBooks: results })
          ),
          catchError(error => Observable.of(new AddressBookActions.EffectError(error)))
        );
    })
  );

  @Effect()
  getAddressBookDetail$: Observable<Action> = this.actions$.pipe(
    ofType(AddressBookActions.GET_ADDRESS_BOOK_DETAIL),
    map((action: AddressBookActions.GetAddressBookDetail) => action.payload),
    switchMap(payload => {
      return this.addressBookService.getAddressBookDetail(payload.id)
        .pipe(
          map(
            result =>
              new AddressBookActions.GetAddressBookDetailDone({
                addressBook: result
              })
          ),
          catchError(error => Observable.of(new AddressBookActions.EffectError(error)))
        );
    })
  );

  @Effect()
  addAddressBook$: Observable<Action> = this.actions$.pipe(
    ofType(AddressBookActions.ADD_ADDRESS_BOOK),
    map((action: AddressBookActions.AddAddressBook) => action.payload),
    switchMap(payload => {
      return this.addressBookService.addAddressBook(payload.addressBook)
        .pipe(
          map(() => new AddressBookActions.AddAddressBookDone()),
          catchError(error => Observable.of(new AddressBookActions.EffectError(error)))
        );
    })
  );

  @Effect()
  editAddressBook$: Observable<Action> = this.actions$.pipe(
    ofType(AddressBookActions.EDIT_ADDRESS_BOOK),
    map((action: AddressBookActions.EditAddressBook) => action.payload),
    switchMap(payload => {
      return this.addressBookService.editAddressBook(payload.addressBook)
        .pipe(
          map(() => new AddressBookActions.EditAddressBookDone()),
          catchError(error => Observable.of(new AddressBookActions.EffectError(error)))
        );
    })
  );
}
