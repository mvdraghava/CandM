import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSqTecRoutingModule } from './create-sq-tec-routing.module';
import { CreateSqTecComponent } from './create-sq-tec.component';
import { MaterialModule } from './../../material.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreateSqTecComponent],
  imports: [
    CommonModule,
    CreateSqTecRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ]
})
export class CreateSqTecModule { }
