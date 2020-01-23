import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LteEprocBidOpeningComponent } from './lte-eproc-bid-opening.component';

const routes: Routes = [{ path: '', component: LteEprocBidOpeningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LteEprocBidOpeningRoutingModule { }
