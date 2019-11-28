import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareOtBOQComponent } from './prepare-ot-boq.component';

const routes: Routes = [{ path: '', component: PrepareOtBOQComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareOtBOQRoutingModule { }
