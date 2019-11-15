import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaindetailsComponent } from './maindetails.component';
import { ShowfilesComponent } from './showfiles/showfiles.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CandmmsgComponent } from './candmmsg/candmmsg.component';

const routes: Routes = [{ path: ':indentno', component: MaindetailsComponent , children: [
  {path: '', component: CandmmsgComponent},
  {path: 'candmmsg', component: CandmmsgComponent},
  {path: 'showfiles', component: ShowfilesComponent},
  {path: 'uploadfiles', component: UploadfilesComponent},

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindetailsRoutingModule { }
