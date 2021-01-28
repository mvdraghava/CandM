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
  { path: 'prepareotboq', loadChildren: () => import('./prepare-ot-boq/prepare-ot-boq.module').then(m => m.PrepareOtBOQModule) },
  { path: 'prepareltenit', loadChildren: () => import('./prepare-lte-nit/prepare-lte-nit.module').then(m => m.PrepareLteNitModule) },
  { path: 'edit-lte-committee', loadChildren: () => import('./edit-lte-committee/edit-lte-committee.module').then(m => m.EditLteCommitteeModule) },
  { path: 'issue-lte-nit', loadChildren: () => import('./issue-lte-nit/issue-lte-nit.module').then(m => m.IssueLteNitModule) },
  { path: 'datecorrigendum', loadChildren: () => import('./date-corrigendum/date-corrigendum.module').then(m => m.DateCorrigendumModule) },
  { path: 'othercorrigendum', loadChildren: () => import('./other-corrigendum/other-corrigendum.module').then(m => m.OtherCorrigendumModule) },
  { path: 'ltetecreport', loadChildren: () => import('./lte-tec-report/lte-tec-report.module').then(m => m.LteTecReportModule) },
  { path: 'prepareloapo', loadChildren: () => import('./prepareloapo/prepareloapo.module').then(m => m.PrepareloapoModule) },
  { path: 'preparelteeprocnit', loadChildren: () => import('./prepare-lte-eproc-nit/prepare-lte-eproc-nit.module').then(m => m.PrepareLteEprocNitModule) },
  { path: 'lte-eproc-bid-open', loadChildren: () => import('./lte-eproc-bid-opening/lte-eproc-bid-opening.module').then(m => m.LteEprocBidOpeningModule) },
  { path: 'prepare-eproc-tec', loadChildren: () => import('./eproc-tec/eproc-tec.module').then(m => m.EprocTecModule) },
  { path: 'create-sqenquiry', loadChildren: () => import('./create-sq-enquiry/create-sq-enquiry.module').then(m => m.CreateSqEnquiryModule) },
  { path: 'create-sq-tecreport', loadChildren: () => import('./create-sq-tec/create-sq-tec.module').then(m => m.CreateSqTecModule) },
  { path: 'vendorClarrifications', loadChildren: () => import('./vendor-clarrifications/vendor-clarrifications.module').then(m => m.VendorClarrificationsModule) },
  { path: 'edit-details', loadChildren: () => import('./edit-details/edit-details.module').then(m => m.EditDetailsModule) },
  { path: 'sq-tec-date', loadChildren: () => import('./sq-tec-date/sq-tec-date.module').then(m => m.SqTecDateModule) },
  { path: 'genericloapo', loadChildren: () => import('./genericloapo/genericloapo.module').then(m => m.GenericloapoModule) },
]},

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindetailsRoutingModule { }
