import { AddressBookService } from '../services/address-book.service';
import { HttpService } from '../services/http.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from '../handler/global-error.handler';

@NgModule({
    providers: [AddressBookService, HttpService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }]
})
export class AppServiceModule { }
