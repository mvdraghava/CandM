import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatestRoutingModule } from './createst-routing.module';
import { CreatestComponent } from './createst.component';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormcomponentsModuleModule } from './../formcomponents-module/formcomponents-module.module';



@NgModule({
  declarations: [CreatestComponent],
  imports: [
    CommonModule,
    CreatestRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormcomponentsModuleModule
  ]
})
export class CreatestModule { }
