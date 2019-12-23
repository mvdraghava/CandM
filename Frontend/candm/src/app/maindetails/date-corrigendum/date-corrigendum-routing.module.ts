import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateCorrigendumComponent } from './date-corrigendum.component';

const routes: Routes = [{ path: '', component: DateCorrigendumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateCorrigendumRoutingModule { }
