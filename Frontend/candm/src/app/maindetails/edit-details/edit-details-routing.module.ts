import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDetailsComponent } from './edit-details.component';

const routes: Routes = [{ path: '', component: EditDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDetailsRoutingModule { }
