import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLteComponent } from './create-lte.component';


const routes: Routes = [{ path: '', component: CreateLteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLTERoutingModule { }
