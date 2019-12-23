import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherCorrigendumRoutingModule } from './other-corrigendum-routing.module';
import { OtherCorrigendumComponent } from './other-corrigendum.component';


@NgModule({
  declarations: [OtherCorrigendumComponent],
  imports: [
    CommonModule,
    OtherCorrigendumRoutingModule
  ]
})
export class OtherCorrigendumModule { }
