import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesComponent } from './entries.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    EntriesComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    NgxDatatableModule
  ],
  exports:[
    EntriesComponent
  ]
})
export class EntriesModule { }
