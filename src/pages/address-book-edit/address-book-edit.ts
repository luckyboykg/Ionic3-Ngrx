import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavParams, NavController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import * as Reducer from '../../store/address-book.reducer';
import * as Actions from '../../store/address-book.actions';
import { AddressBook } from '../../models/address-book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'page-address-book-edit',
    templateUrl: 'address-book-edit.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookEditPage {
    public addressBook: Observable<AddressBook>;
    public addressBookForm: FormGroup;
    public phoneControl: FormControl;
    public emailControl: FormControl;
    public linkedInControl: FormControl;
    public skypeControl: FormControl;

    public editedAddressBook = <AddressBook>{};

    private ngUnsubscribe: Subject<any> = new Subject<any>();

    constructor(private store: Store<Reducer.AddressBookState>,
        private params: NavParams,
        public navCtrl: NavController) {

        this.addressBook = this.store.select(
            state => state.addressBookState.selectedAddressBook
        );

        this.createControls();
        this.createFormWithControls();
    }

    ionViewDidLoad() {
        const addressBookId = this.params.get('addressBookId');
        this.store.dispatch(
            new Actions.GetAddressBookDetail({ id: addressBookId })
        );

        this.addressBook.subscribe(p => {
            if (!p) {
                return;
            }
            this.loadControlValues(p);
        });
    }

    ionViewWillUnload() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public createControls(): void {
        this.phoneControl = new FormControl('', [Validators.required]);
        this.emailControl = new FormControl('', [Validators.required, Validators.email]);
        this.linkedInControl = new FormControl('');
        this.skypeControl = new FormControl('');
    }

    public createFormWithControls(): void {
        this.addressBookForm = new FormGroup({
            phone: this.phoneControl,
            email: this.emailControl,
            linkedIn: this.linkedInControl,
            skype: this.skypeControl
        });
    }

    private loadControlValues(addressBook: AddressBook): void {
        this.phoneControl.setValue(addressBook.phone);
        this.emailControl.setValue(addressBook.email);
        this.linkedInControl.setValue(addressBook.linkedIn);
        this.skypeControl.setValue(addressBook.skype);
    }

    public onSubmit(): void {
        if (!this.isValidForm()) {
            return;
        }

        this.editedAddressBook.phone = this.addressBookForm.controls.phone.value;
        this.editedAddressBook.email = this.addressBookForm.controls.email.value;
        this.editedAddressBook.linkedIn = this.addressBookForm.controls.linkedIn.value;
        this.editedAddressBook.skype = this.addressBookForm.controls.skype.value;

        this.store.dispatch(
            new Actions.EditAddressBook({
                addressBook: this.editedAddressBook
            })
        );

        this.back();
    }

    private back(): void {
        this.navCtrl.pop();
    }

    private isValidForm(): boolean {
        return this.addressBookForm.valid;
    }
}
