import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLteEprocComponent } from './create-lte-eproc.component';

const routes: Routes = [{ path: '', component: CreateLteEprocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLteEprocRoutingModule { }
