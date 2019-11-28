import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepareOtNITRoutingModule } from './prepare-ot-nit-routing.module';
import { PrepareOtNITComponent } from './prepare-ot-nit.component';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [PrepareOtNITComponent],
  imports: [
    CommonModule,
    PrepareOtNITRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatDatepickerModule
  ]
})
export class PrepareOtNITModule { }
