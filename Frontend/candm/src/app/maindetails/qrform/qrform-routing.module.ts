import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrformComponent } from './qrform.component';

const routes: Routes = [{ path: '', component: QrformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrformRoutingModule { }
