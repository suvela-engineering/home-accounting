import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryLayoutRoutingModule } from './entry-layout-routing.module';
import { EntryControllerComponent } from '../../controllers/entry-controller/entry-controller.component';
// import { EntryMainComponent } from './entry-main.component';


@NgModule({
  declarations: [
    // EntryMainComponent
    EntryControllerComponent
  ],
  imports: [
    CommonModule,
    EntryLayoutRoutingModule
  ]
})
export class EntryLayoutModule { }
