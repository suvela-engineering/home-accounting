import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntryLayoutComponent } from './views/entry-layout/entry-layout.component';
import { EntryLayoutModule } from './views/entry-layout/entry-layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    EntryLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
