import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddressBookEffects } from '../store/address-book.effects';
import { reducer } from '../store/address-book.reducer';
import { AppServiceModule } from './app.service.module';
import { HttpClientModule } from '@angular/common/http';
import { AddressBookDetailPage } from '../pages/address-book-detail/address-book-detail';
import { AddressBookPage } from '../pages/address-book/address-book';
import { AddressBookEditPage } from '../pages/address-book-edit/address-book-edit';
import { AddressBookAddPage } from '../pages/address-book-add/address-book-add';

@NgModule({
  declarations: [
    MyApp,
    AddressBookPage,
    AddressBookDetailPage,
    AddressBookEditPage,
    AddressBookAddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AppServiceModule,
    StoreModule.forRoot({
      addressBookState: reducer
    }),
    EffectsModule.forRoot([AddressBookEffects]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddressBookPage,
    AddressBookDetailPage,
    AddressBookEditPage,
    AddressBookAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
