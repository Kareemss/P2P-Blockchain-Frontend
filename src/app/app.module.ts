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

import { MarketPageComponent } from './marketPage/marketPage.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilePageComponent } from './profilePage/profilePage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import {MatCardModule} from '@angular/material/card'
import {MatTabsModule} from '@angular/material/tabs'
import {MatInputModule} from '@angular/material/input'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TransactionComponent } from './dialogs/transaction/transaction.component';
import { DialogService } from './services/dialog.service';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    DisplayBlockchainComponent,
    routingComponents,
    UserProfileComponent,
    MainPageComponent,
    LoginComponent,
    MarketPageComponent,
    AdminComponent,
    ProfilePageComponent,
    ButtonComponent,
    NavbarComponent,
    ConfirmComponent,
    TransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [HttpService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
