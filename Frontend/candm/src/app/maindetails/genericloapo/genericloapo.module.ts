import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../material.module';
import { FormsReqModule } from './../../formreqmodules.module';

import { GenericloapoRoutingModule } from './genericloapo-routing.module';
import { GenericloapoComponent } from './genericloapo.component';


@NgModule({
  declarations: [GenericloapoComponent],
  imports: [
    CommonModule,
    GenericloapoRoutingModule,
    MaterialModule,
    FormsReqModule
  ]
})
export class GenericloapoModule { }
