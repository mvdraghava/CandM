import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'main-details', loadChildren: () => import('./maindetails/maindetails.module').then(m => m.MaindetailsModule) },
{ path: 'vendors', loadChildren: () => import('./vendormanagement/vendormanagement.module').then(m => m.VendormanagementModule) },
{ path: 'create-LTE', loadChildren: () => import('./create-lte/create-lte.module').then(m => m.CreateLTEModule) },
{ path: 'create-LTE_Eprocurement', loadChildren: () => import('./create-lte-eproc/create-lte-eproc.module').then(m => m.CreateLteEprocModule) },
{ path: 'create-SpotQuotation', loadChildren: () => import('./createsq/createsq.module').then(m => m.CreatesqModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
