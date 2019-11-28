import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditqrComponent } from './editqr.component';

const routes: Routes = [{ path: '', component: EditqrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditqrRoutingModule { }
