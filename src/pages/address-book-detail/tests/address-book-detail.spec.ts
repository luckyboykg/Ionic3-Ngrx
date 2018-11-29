import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AddressBookDetailPage } from '../address-book-detail';
import { NavParams, IonicModule } from 'ionic-angular';
import { NavParamsMock } from '../../../testing/mocks-ionic';
import { Store } from '@ngrx/store';
import { TestingModule, MockStore } from '../../../testing/utils';
import { AddressBookState } from '../../../store/address-book.reducer';
import * as Actions from '../../../store/address-book.actions';
import { AddressBook } from '../../../models/address-book.model';

describe('Page: AddressBookDetailPage', () => {
    let component: AddressBookDetailPage;
    let fixture: ComponentFixture<AddressBookDetailPage>;
    let store: MockStore<AddressBookState>;
    let dispatchSpy: jasmine.Spy;
    let nativeElement: any;

    beforeEach(async(() => {
        NavParamsMock.setParams('7c33442f-4c09-4e61-ab96-de790533b96b');
        TestBed.configureTestingModule({
            declarations: [AddressBookDetailPage],
            imports: [
                IonicModule.forRoot(AddressBookDetailPage),
                TestingModule
            ],
            providers: [
                { provide: Store, useClass: MockStore },
                { provide: NavParams, useClass: NavParamsMock }
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

        fixture = TestBed.createComponent(AddressBookDetailPage);
        nativeElement = fixture.debugElement.nativeElement;
        component = fixture.componentInstance;
        dispatchSpy = spyOn(store, 'dispatch');
    }));

    describe('pre OnInit', () => {
        it('should create the Address Book Detail page', async(() => {
            expect(component).toBeTruthy();
        }));
    });

    describe('post OnInit', () => {
        it('should dispatch Get Address Book Detail action', () => {
            fixture.detectChanges();
            dispatchSpy.calls.reset();

            component.ionViewDidLoad();

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                new Actions.GetAddressBookDetail({ id: '7c33442f-4c09-4e61-ab96-de790533b96b' })
            );
        });

        it('should display address book detail', () => {
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
                    selectedAddressBook: <AddressBook>{
                        company: 'Ejecta',
                        email: 'DeniseDCriss1@teleworm.us',
                        id: '29828b21-4133-41c8-b3d1-71de23f447b7',
                        linkedIn: 'linkedin.com/in/DeniseDCriss1',
                        name: 'Denise D. Criss1',
                        phone: '907-324-58341',
                        position: 'Director1',
                        skype: 'DeniseDCriss1'
                    }
                }
            });

            fixture.detectChanges();

            expect(nativeElement.querySelector('.test_phone').innerText).toBe('907-324-58341');
            expect(nativeElement.querySelector('.test_email').innerText).toBe('DeniseDCriss1@teleworm.us');
            expect(nativeElement.querySelector('.test_linkedIn').innerText).toBe('linkedin.com/in/DeniseDCriss1');
            expect(nativeElement.querySelector('.test_skype').innerText).toBe('DeniseDCriss1');
        });
    });
});
