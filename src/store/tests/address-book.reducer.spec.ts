import { AddressBookState, reducer, initialState } from '../address-book.reducer';
import { Search, GetAddressBookDetail, SearchDone, GetAddressBookDetailDone } from '../address-book.actions';
import { AddressBook } from '../../models/address-book.model';

function getDummyState(): AddressBookState {
    return {
        addressBookState: {
            loading: false,
            searchTerms: '',
            addressBooks: [
                <AddressBook>{
                    company: 'Ejecta',
                    email: 'DeniseDCriss1@teleworm.us',
                    id: '29828b21-4133-41c8-b3d1-71de23f447b7',
                    linkedIn: 'linkedin.com/in/DeniseDCriss1',
                    name: 'Denise D. Criss1',
                    phone: '907-324-58341',
                    position: 'Director1',
                    skype: 'DeniseDCriss1'
                },
                <AddressBook>{
                    company: 'Ejecta10',
                    email: 'DeniseDCriss10@teleworm.us',
                    id: '8c4db8ff-f6b3-4ec2-a4fa-baee4ac1b323',
                    linkedIn: 'linkedin.com/in/DeniseDCriss10',
                    name: 'Denise D. Criss10',
                    phone: '907-324-583410',
                    position: 'Director10',
                    skype: 'DeniseDCriss10'
                }
            ],
            tagsDetail: null,
            selectedAddressBook: null
        }
    };
}

describe('Address Book Reducer', () => {
    it('should return the default state', () => {
        const action = {} as any;
        const state = reducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it('should be search address books', () => {
        const defaultState = getDummyState();
        const action = new Search({ searchTerms: '1' });
        const state = reducer(defaultState.addressBookState, action);

        expect(state.addressBooks.length).toBe(2);
        expect(state.loading).toBeTruthy();
    });

    it('should be search done address books', () => {
        const defaultState = getDummyState();
        const action = new SearchDone({ addressBooks: defaultState.addressBookState.addressBooks });
        const state = reducer(defaultState.addressBookState, action);

        expect(state.addressBooks.length).toBe(2);
        expect(state.loading).toBeFalsy();
        expect(state.selectedAddressBook).toBeNull();
    });

    it('should be get address book detail', () => {
        const defaultState = getDummyState();
        const action = new GetAddressBookDetail({ id: '29828b21-4133-41c8-b3d1-71de23f447b7' });
        const state = reducer(defaultState.addressBookState, action);

        expect(state.loading).toBeTruthy();
        expect(state.selectedAddressBook).toBeNull();
    });

    it('should be get address book detail done', () => {
        const defaultState = getDummyState();
        const action = new GetAddressBookDetailDone({ addressBook: defaultState.addressBookState.addressBooks[0] });
        const state = reducer(defaultState.addressBookState, action);

        expect(state.loading).toBeFalsy();
        expect(state.selectedAddressBook).not.toBeNull();
    });
});
