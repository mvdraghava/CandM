import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateLTERoutingModule } from './create-lte-routing.module';
import { CreateLteComponent } from './create-lte.component';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [CreateLteComponent],
  imports: [
    CommonModule,
    CreateLTERoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSelectModule
  ]
})
export class CreateLTEModule { }
