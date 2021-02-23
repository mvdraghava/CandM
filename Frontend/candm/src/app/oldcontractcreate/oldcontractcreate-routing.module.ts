import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldcontractcreateComponent } from './oldcontractcreate.component';

const routes: Routes = [{ path: '', component: OldcontractcreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OldcontractcreateRoutingModule { }
