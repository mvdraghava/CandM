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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LteformComponent } from './lteform/lteform.component';
import { OtformComponent } from './otform/otform.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { CreateLteComponent } from './create-lte/create-lte.component';
import { CreateOtComponent } from './create-ot/create-ot.component';
import { CreateLteEprocComponent } from './create-lte-eproc/create-lte-eproc.component';
import { CreateAmmendmentComponent } from './create-ammendment/create-ammendment.component';
import { CreateSqComponent } from './create-sq/create-sq.component';
import { CreateStComponent } from './create-st/create-st.component';
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
    OtformComponent,
    CreateTenderComponent,
    CreateLteComponent,
    CreateOtComponent,
    CreateLteEprocComponent,
    CreateAmmendmentComponent,
    CreateSqComponent,
    CreateStComponent
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
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatSidenavModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'open-bids', component: OpenBidsComponent},
      { path: 'close-bids', component: CloseBidsComponent},
      { path: 'create-bid', component: CreateBidComponent},
      { path: 'report', component: ReportComponent},
      { path: 'create-tender', component: CreateTenderComponent},
      { path: 'create-LTE', component: CreateLteComponent},
      { path: 'create-OpenTender', component: CreateOtComponent},
      { path: 'create-LTE_Eprocurement', component: CreateLteEprocComponent},
      { path: 'create-Ammendment', component: CreateAmmendmentComponent},
      { path: 'create-SpotQuotation', component: CreateSqComponent},
      { path: 'create-SingleTender', component: CreateStComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
