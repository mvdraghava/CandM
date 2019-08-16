import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { OpenBidsComponent } from './open-bids/open-bids.component';
import { CloseBidsComponent } from './close-bids/close-bids.component';
import { ReportComponent } from './report/report.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LteformComponent } from './lteform/lteform.component';
import { OtformComponent } from './otform/otform.component';
@NgModule({
  declarations: [
    AppComponent,
    MainlayoutComponent,
    TopbarComponent,
    NavbarComponent,
    DashboardComponent,
    CreateBidComponent,
    OpenBidsComponent,
    CloseBidsComponent,
    ReportComponent,
    LteformComponent,
    OtformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'open-bids', component: OpenBidsComponent},
      { path: 'close-bids', component: CloseBidsComponent},
      { path: 'create-bid', component: CreateBidComponent},
      { path: 'report', component: ReportComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
