import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import * as Reducer from '../../store/address-book.reducer';
import * as Actions from '../../store/address-book.actions';
import { AddressBook } from '../../models/address-book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'page-address-book-add',
    templateUrl: 'address-book-add.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookAddPage {
    public addressBookForm: FormGroup;

    public nameControl: FormControl;
    public phoneControl: FormControl;
    public emailControl: FormControl;
    public linkedInControl: FormControl;
    public skypeControl: FormControl;

    public addedAddressBook = <AddressBook>{};

    constructor(private store: Store<Reducer.AddressBookState>,
        public navCtrl: NavController) {
        this.createControls();
        this.createFormWithControls();
    }

    private createControls(): void {
        this.nameControl = new FormControl('', [Validators.required]);
        this.phoneControl = new FormControl('', [Validators.required]);
        this.emailControl = new FormControl('', [Validators.required, Validators.email]);
        this.linkedInControl = new FormControl('');
        this.skypeControl = new FormControl('');
    }

    private createFormWithControls(): void {
        this.addressBookForm = new FormGroup({
            name: this.nameControl,
            phone: this.phoneControl,
            email: this.emailControl,
            linkedIn: this.linkedInControl,
            skype: this.skypeControl
        });
    }

    public onSubmit(): void {
        if (!this.isValidForm()) {
            return;
        }

        this.addedAddressBook.name = this.addressBookForm.controls.name.value;
        this.addedAddressBook.phone = this.addressBookForm.controls.phone.value;
        this.addedAddressBook.email = this.addressBookForm.controls.email.value;
        this.addedAddressBook.linkedIn = this.addressBookForm.controls.linkedIn.value;
        this.addedAddressBook.skype = this.addressBookForm.controls.skype.value;

        this.store.dispatch(
            new Actions.AddAddressBook({
                addressBook: this.addedAddressBook
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
