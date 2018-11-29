import { Search, SEARCH } from '../address-book.actions';


describe('Address Book Actions', () => {
    describe('Search', () => {
        it('should create an action', () => {
            const action = new Search({ searchTerms: '1' });
            expect(action.payload).toEqual(
                jasmine.objectContaining({
                    searchTerms: '1'
                })
            );
            expect(action.type).toEqual(SEARCH);
            expect(action.payload.searchTerms).toBeDefined();
        });
    });
});
