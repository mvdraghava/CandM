import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
  ]
})
export class MaterialModule {}
