import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AddressBookEditPage } from '../address-book-edit';
import { NavParams, IonicModule, NavController } from 'ionic-angular';
import { NavParamsMock, NavControllerMock } from '../../../testing/mocks-ionic';
import { Store } from '@ngrx/store';
import { TestingModule, MockStore } from '../../../testing/utils';
import { AddressBookState } from '../../../store/address-book.reducer';
import * as Actions from '../../../store/address-book.actions';
import { AddressBook } from '../../../models/address-book.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('Page: AddressBookEditPage', () => {
    let component: AddressBookEditPage;
    let fixture: ComponentFixture<AddressBookEditPage>;
    let store: MockStore<AddressBookState>;
    let dispatchSpy: jasmine.Spy;
    let navCtrlSpy: jasmine.Spy;

    beforeEach(async(() => {
        NavParamsMock.setParams('7c33442f-4c09-4e61-ab96-de790533b96b');
        TestBed.configureTestingModule({
            declarations: [AddressBookEditPage],
            imports: [
                IonicModule.forRoot(AddressBookEditPage),
                TestingModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: Store, useClass: MockStore },
                { provide: NavParams, useClass: NavParamsMock },
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

        fixture = TestBed.createComponent(AddressBookEditPage);
        component = fixture.componentInstance;
        dispatchSpy = spyOn(store, 'dispatch');
        navCtrlSpy = spyOn(component.navCtrl, 'pop');
    }));

    describe('pre OnInit', () => {
        it('should create the Address Book Edit page', async(() => {
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

        it('form invalid when empty', () => {
            component.ionViewDidLoad();

            expect(component.addressBookForm.valid).toBeFalsy();
        });

        it('email field validity - check required', () => {
            component.ionViewDidLoad();

            const errors = component.emailControl.errors || {};
            expect(errors['required']).toBeTruthy();
        });

        it('email field validity - check email valid', () => {
            component.ionViewDidLoad();

            component.emailControl.setValue('test');
            const errors = component.emailControl.errors || {};
            expect(errors['email']).toBeTruthy();
        });

        it('should be submit sucess', () => {
            component.ionViewDidLoad();

            component.emailControl.setValue('test@test.com');
            component.linkedInControl.setValue('aaaaaa');
            component.phoneControl.setValue('45454545');
            component.skypeControl.setValue('aaaaaabbbbb');

            expect(component.addressBookForm.valid).toBeTruthy();
        });

        it('should dispatch to add Address Book action', () => {
            component.ionViewDidLoad();
            dispatchSpy.calls.reset();

            const editedAddressBook = <AddressBook>{
                email: 'test@test.com',
                phone: '45454545',
                skype: 'aaaaaabbbbb',
                linkedIn: 'aaaaaa'
            };

            component.emailControl.setValue(editedAddressBook.email);
            component.linkedInControl.setValue(editedAddressBook.linkedIn);
            component.phoneControl.setValue(editedAddressBook.phone);
            component.skypeControl.setValue(editedAddressBook.skype);

            component.onSubmit();

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                new Actions.EditAddressBook({ addressBook: editedAddressBook })
            );

            expect(navCtrlSpy).toHaveBeenCalled();
        });
    });
});
