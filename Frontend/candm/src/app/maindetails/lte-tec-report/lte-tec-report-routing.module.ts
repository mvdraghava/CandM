import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LteTecReportComponent } from './lte-tec-report.component';

const routes: Routes = [{ path: '', component: LteTecReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LteTecReportRoutingModule { }
