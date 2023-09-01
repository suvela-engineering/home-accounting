import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries.component';


@NgModule({
  declarations: [
    EntriesComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule
  ],
  exports:[
    EntriesComponent
  ]
})
export class EntriesModule { }
