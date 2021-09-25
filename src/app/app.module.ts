import { HttpService } from './http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayBlockchainComponent } from './display-blockchain/display-blockchain.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { MarketPageComponent } from './marketPage/marketPage.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilePageComponent } from './profilePage/ProfilePage.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayBlockchainComponent,
    routingComponents,
    UserProfileComponent,
    MainPageComponent,
    LoginComponent,
    LandingPageComponent,
    MarketPageComponent,
    AdminComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
