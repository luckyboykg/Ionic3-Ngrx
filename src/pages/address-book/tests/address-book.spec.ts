import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { NavControllerMock } from '../../../testing/mocks-ionic';
import { Store } from '@ngrx/store';
import { TestingModule, MockStore } from '../../../testing/utils';
import { AddressBookState } from '../../../store/address-book.reducer';
import { AddressBookPage } from '../address-book';
import { AddressBook } from '../../../models/address-book.model';
import * as Actions from '../../../store/address-book.actions';

describe('Page: AddressBookPage', () => {
    let component: AddressBookPage;
    let fixture: ComponentFixture<AddressBookPage>;
    let store: MockStore<AddressBookState>;
    let nativeElement: any;
    let dispatchSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressBookPage],
            imports: [
                IonicModule.forRoot(AddressBookPage),
                TestingModule
            ],
            providers: [
                { provide: Store, useClass: MockStore },
                { provide: NavController, useClass: NavControllerMock }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Store], (testStore: MockStore<AddressBookState>) => {
        store = testStore;
        store.setState({
            addressBookState: {
                loading: false,
                searchTerms: '',
                addressBooks: [],
                tagsDetail: null,
                selectedAddressBook: null
            }
        });

        fixture = TestBed.createComponent(AddressBookPage);
        component = fixture.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;
        dispatchSpy = spyOn(store, 'dispatch');
    }));

    describe('pre OnInit', () => {
        it('should create the Address Book page', async(() => {
            expect(component).toBeTruthy();
        }));
    });

    describe('post OnInit', () => {

        it('should not display address books', () => {
            fixture.detectChanges();
            expect(nativeElement.querySelectorAll('.test-addressBook').length).toBe(0);
        });

        it('should display address books', () => {
            store.setState({
                addressBookState: {
                    loading: false,
                    searchTerms: '1',
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
            });

            fixture.detectChanges();

            expect(nativeElement.querySelectorAll('.test_addressBookItem').length).toBe(2);
            expect(nativeElement.querySelectorAll('.test_loading').length).toBe(0);
        });

        it('should dispatch search action', async () => {
            fixture.detectChanges();
            dispatchSpy.calls.reset();

            spyOn(component.searchTextChanged, 'next').and.callFake(function () {
                store.dispatch(new Actions.Search({ searchTerms: '1' }));
            });

            component.onInput('1');

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(new Actions.Search({ searchTerms: '1' }));
        });
    });
});
