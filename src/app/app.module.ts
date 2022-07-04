import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/components/header/header.component';
import {ContentLayoutComponent} from './core/components/content-layout/content-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmModalComponent} from './shared/components/modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentLayoutComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
