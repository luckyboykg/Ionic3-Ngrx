import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import * as Reducer from '../../store/address-book.reducer';
import * as Actions from '../../store/address-book.actions';
import { AddressBook } from '../../models/address-book.model';

@Component({
    selector: 'page-address-book-detail',
    templateUrl: 'address-book-detail.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookDetailPage {
    public addressBook: Observable<AddressBook>;
    constructor(private store: Store<Reducer.AddressBookState>,
        private params: NavParams) {

        this.addressBook = this.store.select(
            state => state.addressBookState.selectedAddressBook
        );
    }

    ionViewDidLoad() {
        const addressBookId = this.params.get('addressBookId');
        this.store.dispatch(
            new Actions.GetAddressBookDetail({ id: addressBookId })
        );
    }

    get runChangeDetection() {
        console.log('Checking the view of AddressBookDetailPage');
        return '';
    }
}
