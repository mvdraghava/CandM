import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepareLteNitRoutingModule } from './prepare-lte-nit-routing.module';
import { PrepareLteNitComponent } from './prepare-lte-nit.component';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [PrepareLteNitComponent],
  imports: [
    CommonModule,
    PrepareLteNitRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCheckboxModule
  ]
})
export class PrepareLteNitModule { }
