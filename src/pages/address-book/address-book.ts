import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import { AddressBook } from '../../models/address-book.model';
import { Store } from '@ngrx/store';
import * as Reducer from '../../store/address-book.reducer';
import * as Actions from '../../store/address-book.actions';
import { AddressBookDetailPage } from '../address-book-detail/address-book-detail';
import { of } from 'rxjs/observable/of';
import { AddressBookEditPage } from '../address-book-edit/address-book-edit';
import { AddressBookAddPage } from '../address-book-add/address-book-add';

@Component({
  selector: 'page-address-book',
  templateUrl: 'address-book.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookPage {
  public searchTextChanged = new Subject<string>();
  private ngUnsubscribe: Subject<any> = new Subject<any>();

  public addressBooks: Observable<AddressBook[]> = of([]);
  public loading: Observable<Boolean>;

  public isShowCancel = false;

  constructor(private navCtrl: NavController,
    private store: Store<Reducer.AddressBookState>) {
    this.addressBooks = this.store.select(
      state => state.addressBookState.addressBooks
    );

    this.loading = this.store.select(
      state => state.addressBookState.loading
    );
  }

  ionViewDidLoad() {
    this.searchTextChanged
      .debounceTime(200)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(searchTerms => {
        this.store.dispatch(
          new Actions.Search({ searchTerms: searchTerms })
        );
      });
  }

  ionViewWillUnload() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onInput(searchTerms: string): void {
    this.searchTextChanged.next(searchTerms.toLowerCase().trim());
  }

  public onCancel(): void {

  }

  public goToAddressBookDetail(addressBook: AddressBook) {
    this.navCtrl.push(AddressBookDetailPage, {
      addressBookId: addressBook.id
    });
  }

  public add() {
    this.navCtrl.push(AddressBookAddPage);
  }

  public edit(addressBook: AddressBook) {
    this.navCtrl.push(AddressBookEditPage, {
      addressBookId: addressBook.id
    });
  }

  get runChangeDetection() {
    console.log('Checking the view of AddressBookPage');
    return '';
  }
}
