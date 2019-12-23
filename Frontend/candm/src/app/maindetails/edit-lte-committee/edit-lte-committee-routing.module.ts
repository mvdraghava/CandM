import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLteCommitteeComponent } from './edit-lte-committee.component';

const routes: Routes = [{ path: '', component: EditLteCommitteeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditLteCommitteeRoutingModule { }
