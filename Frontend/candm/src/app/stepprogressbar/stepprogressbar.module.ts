import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpbCompntComponent } from './spb-compnt/spb-compnt.component';
import { MaterialModule } from './../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [SpbCompntComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [SpbCompntComponent]
})
export class StepprogressbarModule { }
