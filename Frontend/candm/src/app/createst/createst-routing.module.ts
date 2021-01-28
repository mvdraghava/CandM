import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatestComponent } from './createst.component';

const routes: Routes = [{ path: '', component: CreatestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatestRoutingModule { }
