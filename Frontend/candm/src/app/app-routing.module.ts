import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'main-details', loadChildren: () => import('./maindetails/maindetails.module').then(m => m.MaindetailsModule) },
{ path: 'vendors', loadChildren: () => import('./vendormanagement/vendormanagement.module').then(m => m.VendormanagementModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
