import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueLteNitComponent } from './issue-lte-nit.component';

const routes: Routes = [{ path: '', component: IssueLteNitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueLteNitRoutingModule { }
