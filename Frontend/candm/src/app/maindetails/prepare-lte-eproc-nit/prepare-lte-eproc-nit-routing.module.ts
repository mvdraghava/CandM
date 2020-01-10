import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareLteEprocNitComponent } from './prepare-lte-eproc-nit.component';

const routes: Routes = [{ path: '', component: PrepareLteEprocNitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareLteEprocNitRoutingModule { }
