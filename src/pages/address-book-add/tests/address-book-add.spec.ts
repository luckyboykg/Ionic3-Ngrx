import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AddressBookAddPage } from '../address-book-add';
import { IonicModule, NavController } from 'ionic-angular';
import { NavControllerMock } from '../../../testing/mocks-ionic';
import { Store } from '@ngrx/store';
import { TestingModule, MockStore } from '../../../testing/utils';
import { AddressBookState } from '../../../store/address-book.reducer';
import * as Actions from '../../../store/address-book.actions';
import { AddressBook } from '../../../models/address-book.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('Page: AddressBookAddPage', () => {
    let component: AddressBookAddPage;
    let fixture: ComponentFixture<AddressBookAddPage>;
    let store: MockStore<AddressBookState>;
    let dispatchSpy: jasmine.Spy;
    let navCtrlSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressBookAddPage],
            imports: [
                IonicModule.forRoot(AddressBookAddPage),
                TestingModule,
                ReactiveFormsModule
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

        fixture = TestBed.createComponent(AddressBookAddPage);
        component = fixture.componentInstance;
        dispatchSpy = spyOn(store, 'dispatch');
        navCtrlSpy = spyOn(component.navCtrl, 'pop');
    }));

    describe('pre OnInit', () => {
        it('should create the Address Book Add page', async(() => {
            expect(component).toBeTruthy();
        }));
    });

    describe('post OnInit', () => {
        it('form invalid when empty', () => {
            expect(component.addressBookForm.valid).toBeFalsy();
        });

        it('email field validity - check required', () => {
            const errors = component.emailControl.errors || {};
            expect(errors['required']).toBeTruthy();
        });

        it('email field validity - check email valid', () => {
            component.emailControl.setValue('test');
            const errors = component.emailControl.errors || {};
            expect(errors['email']).toBeTruthy();
        });

        it('should be submit sucess', () => {
            component.nameControl.setValue('123');
            component.emailControl.setValue('test@test.com');
            component.linkedInControl.setValue('aaaaaa');
            component.phoneControl.setValue('45454545');
            component.skypeControl.setValue('aaaaaabbbbb');

            expect(component.addressBookForm.valid).toBeTruthy();
        });

        it('should dispatch to add Address Book action', () => {
            dispatchSpy.calls.reset();

            const addedAddressBook = <AddressBook>{
                name: '123',
                email: 'test@test.com',
                phone: '45454545',
                skype: 'aaaaaabbbbb',
                linkedIn: 'aaaaaa'
            };

            component.nameControl.setValue(addedAddressBook.name);
            component.emailControl.setValue(addedAddressBook.email);
            component.linkedInControl.setValue(addedAddressBook.linkedIn);
            component.phoneControl.setValue(addedAddressBook.phone);
            component.skypeControl.setValue(addedAddressBook.skype);

            component.onSubmit();

            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith(
                new Actions.AddAddressBook({ addressBook: addedAddressBook })
            );

            expect(navCtrlSpy).toHaveBeenCalled();
        });
    });
});
