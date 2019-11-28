import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareOtNITComponent } from './prepare-ot-nit.component';

const routes: Routes = [{ path: '', component: PrepareOtNITComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareOtNITRoutingModule { }
