import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherCorrigendumComponent } from './other-corrigendum.component';

const routes: Routes = [{ path: '', component: OtherCorrigendumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherCorrigendumRoutingModule { }
