import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatesqRoutingModule } from './createsq-routing.module';
import { CreatesqComponent } from './createsq.component';


@NgModule({
  declarations: [CreatesqComponent],
  imports: [
    CommonModule,
    CreatesqRoutingModule
  ]
})
export class CreatesqModule { }
