import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressBook } from '../models/address-book.model';
import { HttpService } from './http.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AddressBookService {
    constructor(private httpService: HttpService) { }
    public getAddressBooks(): Observable<any> {
        return this.httpService.get('./assets/addressBooks.json');
    }

    public searchAddressBooks(query: string): Observable<AddressBook[]> {
        return this.getAddressBooks().pipe(
            map(p => p as AddressBook[]),
            map(res =>
                res.filter(
                    ab =>
                        query !== '' &&
                        (query === '#' ||
                            ab.name.toLowerCase().indexOf(query) !== -1)
                )
            )
        );
    }

    public getAddressBookDetail(id: string): Observable<AddressBook> {
        return this.getAddressBooks().pipe(
            map(p => p as AddressBook[]),
            map(res => res.find(p => p.id === id))
        );
    }

    public addAddressBook(addressBook: AddressBook): Observable<boolean> {
        console.log('Added : ' + JSON.stringify(addressBook));
        return of(true);
    }

    public editAddressBook(addressBook: AddressBook): Observable<boolean> {
        console.log('Edited : ' + JSON.stringify(addressBook));
        return of(true);
    }
}
