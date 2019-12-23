import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareLteNitComponent } from './prepare-lte-nit.component';

const routes: Routes = [{ path: '', component: PrepareLteNitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareLteNitRoutingModule { }
