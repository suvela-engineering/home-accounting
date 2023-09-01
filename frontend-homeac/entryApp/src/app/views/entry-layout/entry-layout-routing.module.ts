import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryLayoutComponent } from './entry-layout.component';

const routes: Routes = [{ path: '', component: EntryLayoutComponent }, 
{ path: 'entries', loadChildren: () => import('../entries/entries.module').then(m => m.EntriesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryLayoutRoutingModule { }
