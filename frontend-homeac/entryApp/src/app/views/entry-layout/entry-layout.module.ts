import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryLayoutRoutingModule } from './entry-layout-routing.module';
import { EntryControllerComponent } from '../../controllers/entry-controller/entry-controller.component';
import { EntryLayoutComponent } from './entry-layout.component';
import { EntriesModule } from '../entries/entries.module';

@NgModule({
  declarations: [
    EntryControllerComponent,
    EntryLayoutComponent],
  imports: [
    CommonModule,
    EntryLayoutRoutingModule,
    EntriesModule
  ],
  exports: [
    EntryControllerComponent,
    EntryLayoutComponent
  ]
})
export class EntryLayoutModule { }
