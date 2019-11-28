import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepareOtBOQRoutingModule } from './prepare-ot-boq-routing.module';
import { PrepareOtBOQComponent } from './prepare-ot-boq.component';


@NgModule({
  declarations: [PrepareOtBOQComponent],
  imports: [
    CommonModule,
    PrepareOtBOQRoutingModule
  ]
})
export class PrepareOtBOQModule { }
