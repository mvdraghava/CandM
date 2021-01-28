import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../material.module';
import { CreatesqRoutingModule } from './createsq-routing.module';
import { CreatesqComponent } from './createsq.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormcomponentsModuleModule } from './../formcomponents-module/formcomponents-module.module';

@NgModule({
  declarations: [CreatesqComponent],
  imports: [
    CommonModule,
    CreatesqRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormcomponentsModuleModule
  ]
})
export class CreatesqModule { }
