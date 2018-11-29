import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { AddressBookEffects } from '../address-book.effects';
import { AddressBookService } from '../../services/address-book.service';
import { Search, GetAddressBookDetail } from '../address-book.actions';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

describe('Address Book Effects', () => {
    let addressBookService: jasmine.SpyObj<AddressBookService>;

    beforeEach(() => {
        addressBookService = jasmine.createSpyObj('AddressBookService', ['searchAddressBooks', 'getAddressBookDetail']);
        addressBookService.searchAddressBooks.and.callFake(function () {
            return Observable.of(null);
        });
        addressBookService.getAddressBookDetail.and.callFake(function () {
            return Observable.of(null);
        });
    });

    describe('Effects Implementation', () => {
        it('should dispatch action', () => {
            const actions$ = new Actions();
            const effect = new AddressBookEffects(actions$, addressBookService);
            const metadata = getEffectsMetadata(effect);

            expect(metadata.searchAddressBook$).toEqual({ dispatch: true });
            expect(metadata.getAddressBookDetail$).toEqual({ dispatch: true });
        });

        it('should call searchAddressBooks on AddressBookService for Search action', () => {
            const searchTerms = '1';
            const action = new Search({ searchTerms: searchTerms });
            const source = cold('a', { a: action });
            const actions = new Actions(source);

            const effect = new AddressBookEffects(actions, addressBookService);

            effect.searchAddressBook$.subscribe(() => {
                expect(addressBookService.searchAddressBooks).toHaveBeenCalled();
            });
        });

        it('should call getAddressBookDetail on AddressBookService for GetAddressBookDetail action', () => {
            const action = new GetAddressBookDetail({ id: '29828b21-4133-41c8-b3d1-71de23f447b7' });
            const source = cold('a', { a: action });
            const actions = new Actions(source);

            const effect = new AddressBookEffects(actions, addressBookService);

            effect.getAddressBookDetail$.subscribe(() => {
                expect(addressBookService.getAddressBookDetail).toHaveBeenCalled();
            });
        });
    });
});
