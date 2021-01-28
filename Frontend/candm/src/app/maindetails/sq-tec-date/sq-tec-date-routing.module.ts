import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SqTecDateComponent } from './sq-tec-date.component';

const routes: Routes = [{ path: '', component: SqTecDateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqTecDateRoutingModule { }
