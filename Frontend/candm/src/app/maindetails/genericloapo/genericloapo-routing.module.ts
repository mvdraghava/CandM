import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericloapoComponent } from './genericloapo.component';

const routes: Routes = [{ path: '', component: GenericloapoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericloapoRoutingModule { }
