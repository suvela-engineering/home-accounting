import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryLayoutComponent } from './entry-layout.component';

const routes: Routes = [{ path: '', component: EntryLayoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryLayoutRoutingModule { }
