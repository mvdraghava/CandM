import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaindetailsComponent } from './maindetails.component';
import { ShowfilesComponent } from './showfiles/showfiles.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CandmmsgComponent } from './candmmsg/candmmsg.component';

const routes: Routes = [{ path: ':indentno/:tendersubject', component: MaindetailsComponent , children: [
  {path: '', component: CandmmsgComponent},
  {path: 'candmmsg', component: CandmmsgComponent},
  {path: 'showfiles', component: ShowfilesComponent},
  {path: 'uploadfiles', component: UploadfilesComponent},
  { path: 'qr', loadChildren: () => import('./qrform/qrform.module').then(m => m.QrformModule) },
  { path: 'editqr', loadChildren: () => import('./editqr/editqr.module').then(m => m.EditqrModule) },
  { path: 'prepareotnit', loadChildren: () => import('./prepare-ot-nit/prepare-ot-nit.module').then(m => m.PrepareOtNITModule) },
  { path: 'prepareotboq', loadChildren: () => import('./prepare-ot-boq/prepare-ot-boq.module').then(m => m.PrepareOtBOQModule) }
]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindetailsRoutingModule { }
