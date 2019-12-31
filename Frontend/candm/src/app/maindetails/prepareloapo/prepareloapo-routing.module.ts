import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareloapoComponent } from './prepareloapo.component';

const routes: Routes = [{ path: '', component: PrepareloapoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareloapoRoutingModule { }
