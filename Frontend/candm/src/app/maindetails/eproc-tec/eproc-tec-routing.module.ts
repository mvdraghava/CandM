import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EprocTecComponent } from './eproc-tec.component';

const routes: Routes = [{ path: '', component: EprocTecComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EprocTecRoutingModule { }
