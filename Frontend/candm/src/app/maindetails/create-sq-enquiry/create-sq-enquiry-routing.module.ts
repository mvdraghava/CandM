import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSqEnquiryComponent } from './create-sq-enquiry.component';

const routes: Routes = [{ path: '', component: CreateSqEnquiryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSqEnquiryRoutingModule { }
