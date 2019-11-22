import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendormanagementComponent } from './vendormanagement.component';
import { CreatevendorComponent } from './createvendor/createvendor.component';

const routes: Routes = [{ path: '', component: VendormanagementComponent },
{ path: 'add-vendor', component: CreatevendorComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendormanagementRoutingModule { }
