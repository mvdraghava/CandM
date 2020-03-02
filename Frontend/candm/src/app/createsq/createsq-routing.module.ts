import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesqComponent } from './createsq.component';

const routes: Routes = [{ path: '', component: CreatesqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatesqRoutingModule { }
