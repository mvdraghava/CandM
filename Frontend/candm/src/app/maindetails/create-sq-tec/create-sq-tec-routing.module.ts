import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSqTecComponent } from './create-sq-tec.component';

const routes: Routes = [{ path: '', component: CreateSqTecComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSqTecRoutingModule { }
