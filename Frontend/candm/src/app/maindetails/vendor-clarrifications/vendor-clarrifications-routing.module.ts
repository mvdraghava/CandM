import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorClarrificationsComponent } from './vendor-clarrifications.component';

const routes: Routes = [{ path: '', component: VendorClarrificationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorClarrificationsRoutingModule { }
